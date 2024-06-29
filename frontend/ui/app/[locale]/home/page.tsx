import styles from "./home.module.css";
import HeroSection from "./HeroSection";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <main className={styles.home}>
      <HeroSection />
      <h1>{t("Index.title")}</h1>
    </main>
  );
}
