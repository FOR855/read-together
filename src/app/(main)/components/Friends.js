import React from "react";
import styles from "../page.module.css";
import { auth } from "@/auth.js";
import postgres from "postgres";
import Link from "next/link";
const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

async function Friends() {
  const session = await auth();
  if (!session || !session.user.id) {
    // Not signed in — redirect or show login link
    return <p>You must sign in to view the list.</p>;
  }
  const id = session.user.id;
  const friendsList = await sql`SELECT users.*
FROM friends
JOIN users
  ON users.id = CASE 
                  WHEN friends.user_id_1 = ${id} THEN friends.user_id_2
                  ELSE friends.user_id_1
                END
WHERE ${id} IN (friends.user_id_1, friends.user_id_2)
  AND friends.status = 'accepted';`;
  return (
    <div>
      <div className={styles.blockHead}>我的好友/My Friends</div>
      <div className={styles.FrList}>
        {friendsList.map((user) => (
          <Link key={user.id} href={"/friends/" + user.id} title={user.name}>
            <img
              src={user.profile_picture_url}
              alt="User profile picture"
              className={styles.friendsPicture}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Friends;
