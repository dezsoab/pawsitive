import React from "react";

import styles from "./home.module.css";
import CTAButton from "../components/cta/CTAButton";

const HeroContent = () => {
  return (
    <div className={styles.heroContent}>
      <div>
        <h1>
          Hand Crafted Pet Accessories <br />{" "}
        </h1>
        <p>with attached NFC technology</p>
      </div>
      <p>
        Discover unique pet accessories meticulously crafted with embedded NFC
        technology, combining style with advanced functionality.
      </p>
      <CTAButton
        toPath="/shop"
        title="Explore Shop"
        style={{
          backgroundColor: "var(--color-pink-light)",
          color: "var(--color-white)",
        }}
      />
    </div>
  );
};

export default HeroContent;
