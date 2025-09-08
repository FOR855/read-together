import React from "react";
import Link from "next/link";
import styles from "./UserProfile.module.css";

function UserProfile() {
  return (
    <div className={styles.box}>
      <Link href="/user" title="My Profile" className={styles.link}>
        <img
          src="/icons/yonghu.svg"
          alt="about read-together"
          className={styles.linkIcon}
        />
      </Link>
    </div>
  );
}

export default UserProfile;
