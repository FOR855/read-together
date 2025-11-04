"use client";

import React, {useEffect} from "react";
import styles from "../page.module.css";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams, useRouter } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  // 2025/11/05 yanghuoshan
  const router = useRouter();
  const handleSignUp = () => {
    router.push("/sign-up");
  };

  useEffect(() => {
      if (errorMessage) {
        alert(errorMessage); // 简单弹窗提示
      }
    }, [errorMessage]);
  // 2025/11/05 yanghuoshan

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.text}>
        <p>请先登录后继续</p>
        <p>Please log in to continue...</p>
      </div>

      <div className={styles.inputBox}>
        <img src="/icons/youxiang.svg" className={styles.icon} />
        <input
          id="email"
          type="email"
          name="email"
          placeholder="请输入邮箱 Enter your email address"
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputBox}>
        <img src="/icons/yaoshi.svg" className={styles.icon} />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="请输入密码 Enter your password"
          className={styles.input}
          required
          minLength={6}
        />
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button className={styles.button} aria-disabled={isPending}>
        登录/Log in
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={handleSignUp}
        aria-disabled={isPending}
      >
        注册/Sign out
      </button>
    </form>
  );
}

export default LoginForm;
