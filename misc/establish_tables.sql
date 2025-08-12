-- 1. 用户表
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    profile_picture_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 书籍表
CREATE TABLE books (
    book_id UUID PRIMARY KEY,
    uploader_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    description TEXT,
    file_url VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_books_uploader FOREIGN KEY (uploader_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- 3. 好友关系表
CREATE TABLE friends (
    user_id_1 UUID NOT NULL,
    user_id_2 UUID NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id_1, user_id_2),
    CONSTRAINT fk_friends_user1 FOREIGN KEY (user_id_1)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_friends_user2 FOREIGN KEY (user_id_2)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- 4. 聊天会话表
CREATE TABLE chats (
    chat_id UUID PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. 聊天参与者表
CREATE TABLE chat_participants (
    chat_id UUID NOT NULL,
    user_id UUID NOT NULL,
    PRIMARY KEY (chat_id, user_id),
    CONSTRAINT fk_chat_participants_chat FOREIGN KEY (chat_id)
        REFERENCES chats(chat_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_chat_participants_user FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- 6. 聊天消息表
CREATE TABLE messages (
    message_id UUID PRIMARY KEY,
    chat_id UUID NOT NULL,
    sender_id UUID NOT NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_messages_chat FOREIGN KEY (chat_id)
        REFERENCES chats(chat_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_messages_sender FOREIGN KEY (sender_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- 7. 用户书架表
CREATE TABLE user_books (
    user_id UUID NOT NULL,
    book_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, book_id),
    CONSTRAINT fk_user_books_user FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_books_book FOREIGN KEY (book_id)
        REFERENCES books(book_id)
        ON DELETE CASCADE
);
