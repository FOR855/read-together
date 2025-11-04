import { Suspense } from "react";
import "../globals.css";
import styles from "./page.module.css";
import Logo from "./components/Logo";
import SignupForm from "./components/SignupForm";

export default function Page() {
  return (
    <main>
      <div className={styles.content}>
        <Logo />
        <Suspense>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}
