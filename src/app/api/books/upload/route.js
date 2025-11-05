import { auth } from "@/auth.js";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const userId = session.user.id;

  const formData = await request.formData();
  const title = formData.get("title");
  const bookFile = formData.get("book");

  let book_url = null;

  if (bookFile && bookFile instanceof File) {
    // process avatarFile (save to storage, S3 etc), then set avatarUrl
    const buffer = Buffer.from(await bookFile.arrayBuffer());
    const filename = `${Date.now()}-${bookFile.name.replace(/\s+/g, "_")}`;
    const fs = await import("fs/promises");
    const path = await import("path");
    const uploadsDir = path.join(process.cwd(), "public", "books");
    await fs.writeFile(path.join(uploadsDir, filename), buffer);
    book_url = `/books/${filename}`;
  }

  //   await sql`
  //       INSERT books
  //       SET
  //         name = ${typeof name === "string" ? name : sql`name`},
  //         profile_picture_url = ${profile_picture_url ?? sql`profile_picture_url`}
  //       WHERE id = ${userId}
  //     `;

  //   const updated = await sql`
  //       SELECT id, email, name, profile_picture_url
  //       FROM users
  //       WHERE id = ${userId}
  //     `;
  const [book] =
    await sql`INSERT INTO public.books (uploader_id,title,  file_url)
VALUES (${userId},${title}, ${book_url}) RETURNING *;`;
  //   const books = await sql`SELECT * FROM books WHERE `;

  //   const user = updated[0];
  //   const { data, error } = await supabase.from("books").insert([
  //     {
  //       uploader_id: userId,
  //       title: title,
  //       //   author: author || null,
  //       auther: null,
  //       description: null,
  //       //   format: file.name.endsWith('.pdf') ? 'pdf' : 'epub',
  //       file_url: `/books/${uniqueName}`,
  //     },
  //   ]);

  //   if (error) {
  //     return res.status(500).json({ error: error.message });
  //   }

  //   return res.status(200).json({ book: data[0] });
  // }

  return new Response(JSON.stringify({ book }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
