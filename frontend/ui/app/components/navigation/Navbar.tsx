import React from "react";
import Link from "next/link";
import Image from "next/image";
import CTAButton from "../cta/CTAButton";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navBar}>
      <Link href="/">
        <Image
          src="/assets/logo.png"
          width={100}
          height={100}
          alt="Pawsitivecollar logo"
        />
      </Link>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <CTAButton
        title="Shop Now"
        toPath="/shop"
        style={{
          backgroundColor: "var(--color-pink-light)",
          color: "var(--color-white)",
        }}
      />
    </nav>
  );
};

export default Navbar;
