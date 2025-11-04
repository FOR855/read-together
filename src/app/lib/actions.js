'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import postgres from "postgres";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

 
const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });
 
export async function authenticate(
  prevState,
  formData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signup(prevState, formData) {
  try {

    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");
    const repassword = formData.get("repassword");
    const redirectTo = formData.get("redirectTo") || "/";

    if (!email || !name || !password) {
      return "请填写所有必填项 / Please fill all required fields.";
    }
    if (password !== repassword) {
      return "两次密码不一致 / Passwords do not match.";
    }
    if (password.length < 6) {
      return "密码至少需要6位 / Password must be at least 6 characters.";
    }

    const [existingUser] = await sql`
      SELECT id FROM "users" WHERE email = ${email}
    `;
    if (existingUser) {
      return "该邮箱已注册 / This email is already registered.";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO "users" (email, name, password)
      VALUES (${email}, ${name}, ${hashedPassword})
    `;

    return "注册成功！请前往登录页 / Signup successful! You may now log in.";
  } catch (error) {
    console.error("Signup error:", error);
    return "注册过程中出现错误 / An error occurred during signup.";
  }
}