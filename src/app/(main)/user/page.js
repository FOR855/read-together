import "@/app/globals.css";
import styles from "./page.module.css";
import Information from "./components/Information";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div>
      <div className={styles.list}>
        <div className={styles.profile}>
          <img
            src="/icons/yonghu.svg"
            alt="User profile picture"
            className={styles.profilePicture}
          />
          <p className={styles.bio}>bio</p>
          <Information />
        </div>
      </div>
    </div>
  );
}
