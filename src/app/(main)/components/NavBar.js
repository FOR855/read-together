"use client";

import styles from "./NavBar.module.css";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  const linkList = [
    {
      label: "books",
      href: "/books",
      title: "Book Shelf",
      icon: "/icons/shudan.svg",
    },
    {
      label: "firends",
      href: "/friends",
      title: "My Friends",
      icon: "/icons/wodehaoyou.svg",
    },
    {
      label: "setting",
      href: "/setting",
      title: "Settings",
      icon: "/icons/shezhi.svg",
    },
    {
      label: "themes",
      href: "/themes",
      title: "Themes",
      icon: "/icons/zhuti.svg",
    },
  ];

  return (
    <div>
      <nav className={styles.NavBar}>
        <Link href="/" title="Home" className={styles.link}>
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
              title={link.title}
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
        <Link href="/help" title="Help" className={styles.link}>
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
