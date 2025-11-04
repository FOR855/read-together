"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "../page.module.css";

function Friend({ Fr }) {
  const id = useParams().friends_id;
  return (
    <div>
      <Link
        key={Fr.id}
        href={"/friends/" + Fr.id}
        title={Fr.name}
        className={styles.friend + (id == Fr.id ? " " + styles.current : "")}
      >
        <img
          src={Fr.profile_picture_url}
          alt="Picture of my friend"
          className={styles.friendPicture}
        />
        <div className={styles.friendInformation}>
          <div className={styles.nameAndStatus}>
            <div className={styles.friendName}>{Fr.name}</div>
            {/* <div className={styles.status}>{Fr.status}</div> */}
          </div>
          <div className={styles.friendBio}>{Fr.bio}</div>
        </div>
      </Link>
    </div>
  );
}

export default Friend;
