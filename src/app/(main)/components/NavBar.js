"use client";

import styles from "./NavBar.module.css";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  const linkList = [
    { label: "books", href: "/books", icon: "/icons/shudan.svg" },
    { label: "firends", href: "/friends", icon: "/icons/wodehaoyou.svg" },
    { label: "setting", href: "/setting", icon: "/icons/shezhi.svg" },
    {
      label: "themes",
      href: "/themes",
      icon: "/icons/zhuti.svg",
    },
  ];

  return (
    <div>
      <nav className={styles.NavBar}>
        <Link href="/about-us" className={styles.link}>
          <img
            src="read-together.svg"
            alt="about read-together"
            className={styles.linkIcon + " " + styles.linkLogo}
          />
        </Link>

        <div className={styles.linkList}>
          {linkList.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={pathname == link.href ? styles.current : styles.link}
            >
              <img
                src={link.icon}
                alt={link.label}
                className={styles.linkIcon}
              />
            </Link>
          ))}
        </div>
        <Link href="/help" className={styles.link}>
          <img
            src="/icons/bangzhu.svg"
            alt="help"
            className={styles.linkIcon}
          />
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
