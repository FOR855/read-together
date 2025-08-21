import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { 
    // invoices, 
    // customers, 
    // revenue, 
    users 
} from '../utils/placeholder-data';

if (!process.env.POSTGRES_URL) {
    throw new Error("Missing POSTGRES_URL environment variable");
  }

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (name, email, password)
        VALUES (${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (email) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function createBooksTable() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
    await sql`
      CREATE TABLE IF NOT EXISTS books (
        book_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        uploader_id UUID NOT NULL,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255),
        description TEXT,
        file_url VARCHAR(255),
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_books_uploader FOREIGN KEY (uploader_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `;
  }
  
  async function createFriendsTable() {
    await sql`
      CREATE TABLE IF NOT EXISTS friends (
        user_id_1 UUID NOT NULL,
        user_id_2 UUID NOT NULL,
        status VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id_1, user_id_2),
        CONSTRAINT fk_friends_user1 FOREIGN KEY (user_id_1)
          REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_friends_user2 FOREIGN KEY (user_id_2)
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `;
  }
  
  async function createChatsTable() {
    await sql`
      CREATE TABLE IF NOT EXISTS chats (
        chat_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        type VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  }
  
  async function createChatParticipantsTable() {
    await sql`
      CREATE TABLE IF NOT EXISTS chat_participants (
        chat_id UUID NOT NULL,
        user_id UUID NOT NULL,
        PRIMARY KEY (chat_id, user_id),
        CONSTRAINT fk_chat_participants_chat FOREIGN KEY (chat_id)
          REFERENCES chats(chat_id)
          ON DELETE CASCADE,
        CONSTRAINT fk_chat_participants_user FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `;
  }
  
  async function createMessagesTable() {
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        message_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        chat_id UUID NOT NULL,
        sender_id UUID NOT NULL,
        message_text TEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_messages_chat FOREIGN KEY (chat_id)
          REFERENCES chats(chat_id)
          ON DELETE CASCADE,
        CONSTRAINT fk_messages_sender FOREIGN KEY (sender_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `;
  }
  
  async function createUserBooksTable() {
    await sql`
      CREATE TABLE IF NOT EXISTS user_books (
        user_id UUID NOT NULL,
        book_id UUID NOT NULL,
        status VARCHAR(50) NOT NULL,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, book_id),
        CONSTRAINT fk_user_books_user FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_user_books_book FOREIGN KEY (book_id)
          REFERENCES books(book_id)
          ON DELETE CASCADE
      );
    `;
  }



export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      createBooksTable(),
      createFriendsTable(),
      createChatsTable(),
      createChatParticipantsTable(),
      createMessagesTable(),
      createUserBooksTable(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
