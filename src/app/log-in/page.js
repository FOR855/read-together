import { Suspense } from "react";
import "../globals.css";
import styles from "./page.module.css";
import Logo from "./components/Logo";
import LoginForm from "./components/LoginForm";

export default function Page() {
  return (
    <main>
      <div className={styles.content}>
        <Logo />
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
