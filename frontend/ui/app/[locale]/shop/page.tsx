import { useTranslations } from "next-intl";
import React from "react";

export default function ShopPage() {
  const t = useTranslations();
  return (
    <main>
      <h1>{t("Shop.title")}</h1>
      <p>{t("Shop.description")}</p>
    </main>
  );
}
