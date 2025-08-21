"use client";

import React from "react";
import styles from "./New.module.css";

function New() {
  function uploading() {
    return;
  }

  return (
    <div>
      <button className={styles.linkbox} onClick={uploading}>
        <img
          src="/icons/jia.svg"
          alt="Uploading a new book."
          className={styles.icon}
        />
      </button>
    </div>
  );
}

export default New;
