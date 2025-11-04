// import "../globals.css";
import styles from "./page.module.css";
import List from "./components/List";

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    //   <body>
    <div className={styles.mainBox}>
      <List />
      {children}
    </div>
    //   </body>
    // </html>
  );
}
