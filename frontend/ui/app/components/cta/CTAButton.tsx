"use client";

import Link from "next/link";
import React from "react";

import styles from "./CTAButton.module.css";

type CTAButtonProps = {
  title: string;
  toPath: string;
  style: {};
};

const CTAButton = ({ title, toPath, style }: CTAButtonProps) => {
  return (
    <Link href={toPath}>
      <button className={styles.ctaBtn} style={style}>
        {title}
      </button>
    </Link>
  );
};

export default CTAButton;
