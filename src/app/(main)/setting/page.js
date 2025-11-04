import React from "react";
import styles from "./page.module.css";
import { signOut } from '@/auth';

function page() {
  return (
    <div>
      <form
        action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
        }}
      >
        <button className={styles.button}>退出/Sign Out</button>
      </form>
    </div>
  );
}

export default page;
