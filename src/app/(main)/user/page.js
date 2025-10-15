"use client";

import { useEffect, useState } from "react";
import "@/app/globals.css";
import styles from "./page.module.css";
import Information from "./components/Information";
import { supabase } from "../../lib/database/utils/supabaseClient";

export default function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []); // <-- add empty dependency array so it runs once on mount

  return (
    <div>
      <div className={styles.list}>
        {users.map((user) => (
          <div key={user.id} className={styles.profile}>
            <img
              src="/icons/yonghu.svg"
              alt="User profile picture"
              className={styles.profilePicture}
            />
            <p className={styles.bio}>{user.name}</p>
          </div>
        ))}

        <Information />
      </div>
    </div>
  );
}
