"use client";

import React, { useEffect } from "react";
import styles from "../page.module.css";
import { useActionState } from "react";
import { signup } from "@/app/lib/actions";
import { useSearchParams, useRouter } from "next/navigation";

function SignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [message, formAction, isPending] = useActionState(
    signup,
    undefined
  );

  const router = useRouter();
  const handleLogin = () => {
    router.push("/log-in");
  };

  useEffect(() => {
    if (message) {
      alert(message); // 简单弹窗提示
    }
  }, [message]);

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.text}>
        <p>注册后继续…</p>
        <p>Signup to continue...</p>
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
        <img src="/icons/youxiang.svg" className={styles.icon} />
        <input
          id="name"
          type="name"
          name="name"
          placeholder="请输入名称 Enter your name"
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
      <div className={styles.inputBox}>
        <img src="/icons/yaoshi.svg" className={styles.icon} />
        <input
          id="repassword"
          type="repassword"
          name="repassword"
          placeholder="请重复密码 Enter your password again"
          className={styles.input}
          required
          minLength={6}
        />
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button className={styles.button} aria-disabled={isPending}>
        确认/Confirm
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={handleLogin}
        aria-disabled={isPending}
      >
        去登录/Log in
      </button>
    </form>
  );
}

export default SignupForm;
