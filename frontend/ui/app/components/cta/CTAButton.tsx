"use client";

import Link from "next/link";
import React from "react";

import styles from "./CTAButton.module.css";

type CTAButtonProps = {
  title: string;
  toPath: string;
};

const CTAButton = ({ title, toPath }: CTAButtonProps) => {
  return (
    <Link href={toPath}>
      <button className={styles.ctaBtn}>{title}</button>
    </Link>
  );
};

export default CTAButton;
