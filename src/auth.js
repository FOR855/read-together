import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

async function getUser(email) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch)
            return { id: user.id, email: user.email, name: user.name };
        }

        console.log("Invalid credentials");

        return null;
      },
    }),
  ],

  callbacks: {
    // 🔹 1. 当 JWT 被创建或更新时触发
    async jwt({ token, user }) {
      if (user) {
        // 登录时可在这里添加自定义字段
        token.id = user.id;
        token.name = user.name; // 假设数据库中有 role
        token.email = user.email;
      }
      return token;
    },

    // 🔹 2. 每次 session 被调用时触发（客户端可访问的 session 对象）
    async session({ session, token }) {
      // 将 token 中的字段注入到 session
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
});
