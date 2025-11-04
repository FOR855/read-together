import React from "react";
import styles from "../page.module.css";

function Logo() {
  return (
    <div className={styles.logoBox}>
      <img src="/read-together.svg" className={styles.logo} />
    </div>
  );
}

export default Logo;
