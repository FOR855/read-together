"use client";

import { useEffect, useState } from "react";
import "@/app/globals.css";
import styles from "./page.module.css";
import Information from "./components/Information";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Page() {
  // const [users, setUsers] = useState([]);
  const supabase = createClientComponentClient();
  // useEffect(async () => {
  const { data, error } = await supabase.from("users").select("*");

  // if (error) console.error(error);
  // else setUsers(data);
  // }, [book_id, supabase]);

  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div>
      <div className={styles.list}>
        <div className={styles.profile}>
          <img
            src="/icons/yonghu.svg"
            alt="User profile picture"
            className={styles.profilePicture}
          />
          <p className={styles.bio}>{data}</p>
          {/*fetched data*/}
          {/* {users.map((user) => (
            <p>{user.user_id}</p>
          ))} */}
        </div>
        <Information />
      </div>
    </div>
  );
}
