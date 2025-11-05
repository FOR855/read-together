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
  const name = formData.get("name");
  const bio = formData.get("bio");
  const avatarFile = formData.get("avatar");

  let profile_picture_url = null;

  if (avatarFile && avatarFile instanceof File) {
    // process avatarFile (save to storage, S3 etc), then set avatarUrl
    const buffer = Buffer.from(await avatarFile.arrayBuffer());
    const filename = `${Date.now()}-${avatarFile.name.replace(/\s+/g, "_")}`;
    const fs = await import("fs/promises");
    const path = await import("path");
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.writeFile(path.join(uploadsDir, filename), buffer);
    profile_picture_url = `/uploads/${filename}`;
  }

  await sql`
    UPDATE users
    SET
      name = ${typeof name === "string" ? name : sql`name`},
      bio = ${typeof bio === "string" ? bio : sql`bio`},
      profile_picture_url = ${profile_picture_url ?? sql`profile_picture_url`}
    WHERE id = ${userId}
  `;

  const updated = await sql`
    SELECT id, email, name, bio, profile_picture_url
    FROM users
    WHERE id = ${userId}
  `;
  const user = updated[0];

  return new Response(JSON.stringify({ user }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
