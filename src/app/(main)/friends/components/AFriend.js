import React from "react";
import styles from "../page.module.css";

function AFriend() {
  const FrId = "1";
  const FrName = "F1";
  const FrStatus = "1";
  const FrUrl = "/icons/yonghu.svg";
  const FrBio = "Read?";

  return (
    <div className={styles.friend}>
      <img
        src={FrUrl}
        alt="Picture of my friend"
        className={styles.friendPicture}
      />
      <div className={styles.friendInformation}>
        <div className={styles.nameAndStatus}>
          <div className={styles.friendName}>{FrName}</div>
          <div className={styles.status}>{FrStatus}</div>
        </div>
        <div className={styles.friendBio}>{FrBio}</div>
      </div>
    </div>
  );
}

export default AFriend;
