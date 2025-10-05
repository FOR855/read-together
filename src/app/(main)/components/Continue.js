import React from "react";
import styles from "./Continue.module.css";
import LastBook from "./LastBook";
import New from "./New";

function Continue() {
  return (
    <div className={styles.block}>
      继续阅读
      <div className={styles.itemList}>
        <LastBook />
        <New />
      </div>
    </div>
  );
}

export default Continue;
