import Link from "next/link";
import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.box}>
      <Link href="/about-us" className={styles.link}>
        About us
      </Link>
    </div>
  );
}

export default Footer;
