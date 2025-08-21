import "../globals.css";
import styles from "./page.module.css";
import Continue from "./components/Continue";
import Friends from "./components/Friends";
import Books from "./components/Books";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className={styles.grid}>
      <div className={styles.block1 + " " + styles.block}>
        <Continue />
      </div>
      <div className={styles.block + " " + styles.block2}>
        <Friends />
      </div>
      <div className={styles.block + " " + styles.block3}>
        <Books />
      </div>
    </div>
  );
}
