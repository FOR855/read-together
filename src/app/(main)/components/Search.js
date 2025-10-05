import React from "react";
import styles from "./Search.module.css";

function Search() {
  return (
    <div className={styles.searchContainer}>
      <input id="searchInput" type="search" className={styles.searchInput} />
      <div className={styles.searchButton}>
        <img
          src="/icons/sousuo.svg"
          alt="Search"
          className={styles.searchIcon}
        />
      </div>
    </div>
  );
}

export default Search;
