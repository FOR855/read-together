import React from "react";
import styles from "./Continue.module.css";
import LastBook from "./LastBook";
import New from "../uploading/components/New";
import Link from "next/link";

function Continue() {
  return (
    <div className={styles.block}>
      继续阅读
      <div className={styles.itemList}>
        <LastBook />
        <Link href={"/uploading"} className={styles.linkbox}>
          {/* <button className={styles.linkbox} onClick={uploading}> */}
          <img
            src="/icons/jia.svg"
            alt="Uploading a new book."
            className={styles.icon}
          />
          {/* </button> */}
        </Link>
      </div>
    </div>
  );
}

export default Continue;
