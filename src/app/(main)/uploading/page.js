import React from "react";
// import EditForm from "./components/EditForm";
import { auth } from "@/auth";
import postgres from "postgres";
import New from "./components/New";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

async function page() {
  const session = await auth();
  if (!session || !session.user.id) {
    // Not signed in — redirect or show login link
    return <div>You must sign in to view profile.</div>;
  }
  const id = session.user.id;
  console.log("Fetching profile for id:", id);

  // const { userData, error } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("user_id", user_id);
  const userList = await sql`SELECT * FROM users WHERE id=${id}`;
  const user = userList[0];

  return (
    <div>
      <New user={user} />
    </div>
  );
}

export default page;
