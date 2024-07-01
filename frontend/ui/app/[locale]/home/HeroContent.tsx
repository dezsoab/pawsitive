import React from "react";

import styles from "./home.module.css";
import CTAButton from "../../../components/cta/CTAButton";
import { useLocale, useTranslations } from "next-intl";

const HeroContent = () => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <div className={styles.heroContent}>
      <div>
        <h1>
          {t("Index.title")} <br />{" "}
        </h1>
        <p>{t("Index.title_extension")}</p>
      </div>
      <p>{t("Index.description")}</p>
      <CTAButton
        toPath="shop"
        title={t("Shop.title_secondary")}
        style={{
          backgroundColor: "var(--color-pink-light)",
          color: "var(--color-white)",
        }}
        locale={locale}
      />
    </div>
  );
};

export default HeroContent;
