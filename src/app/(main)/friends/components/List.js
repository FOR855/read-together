import React from "react";
import styles from "../page.module.css";
import { auth } from "@/auth.js";
import postgres from "postgres";
import Link from "next/link";
import Friend from "./Friend";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

async function List() {
  const session = await auth();
  if (!session || !session.user.email) {
    // Not signed in — redirect or show login link
    return <p>You must sign in to view the list.</p>;
  }

  // session.user.email should be populated if you forwarded it via callbacks
  const email = session.user.email;
  console.log("Fetching freinds list for email:", email);
  const userList = await sql`SELECT * FROM users WHERE email=${email}`;
  const user = userList[0];

  const friendsList = await sql`SELECT users.*
FROM friends
JOIN users
  ON users.id = CASE 
                  WHEN friends.user_id_1 = ${user.id} THEN friends.user_id_2
                  ELSE friends.user_id_1
                END
WHERE ${user.id} IN (friends.user_id_1, friends.user_id_2)
  AND friends.status = 'accepted';`;
  // const onlineFriends = friendsList.filter((f) => f.online);
  // const offlineFriends = friendsList.filter((f) => !f.online);

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>My Friends</div>
      {friendsList.map((Fr) => (
        <div key={Fr.id}>
          <Friend Fr={Fr} />
        </div>
      ))}
    </div>
  );
}

export default List;
