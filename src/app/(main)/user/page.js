// "use client";

// import { useEffect, useState } from "react";
import "@/app/globals.css";
import styles from "./page.module.css";
// import Information from "./components/Information";
// import { supabase } from "../../lib/database/utils/supabaseClient";

// import { getServerSession } from "next-auth"; // or "next-auth/next" depending on version
// import { authConfig } from "src/auth.config.js";
// import { authConfig } from "@/auth.config";
import { auth } from "@/auth.js";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

export default async function ProfilePage() {
  // const session = await getServerSession(authConfig);
  const session = await auth();
  if (!session || !session.user.email) {
    // Not signed in — redirect or show login link
    return <p>You must sign in to view profile.</p>;
  }

  // session.user.email should be populated if you forwarded it via callbacks
  const email = session.user.email;
  console.log("Fetching profile for email:", email);

  // const { userData, error } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("user_id", user_id);
  const userList = await sql`SELECT * FROM users WHERE email=${email}`;
  const user = userList[0];

  const created_at = new Date(user.created_at);
  const time = created_at.toLocaleString();
  // if (error) console.error(error);
  // else setNotes(data);
  return (
    <div>
      <div className={styles.list}>
        {/* {user.map(() => ( */}
        {/* <div key={user.user_id} className={styles.profile}> */}
        <img
          src={user.profile_picture_url}
          alt="User profile picture"
          className={styles.profilePicture}
        />
        {/* </div> */}
        <div className={styles.name}>{user.name}</div>
        <div className={styles.bio}>{user.bio}</div>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>账户ID/ID</div>
          <div className={styles.info}>{user.id}</div>
        </div>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>邮箱/email</div>
          <div className={styles.info}>{user.email}</div>
        </div>
        {/* <div className={styles.info}>{user.profile_picture_url}</div> */}
        <div className={styles.infoList}>
          <div className={styles.infoItem}>创建时间/created_at</div>
          <div className={styles.info}>{time}</div>
        </div>
        {/* ))} */}

        {/* <Information /> */}
      </div>
    </div>
  );
}
