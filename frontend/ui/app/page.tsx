import styles from "./(home)/home.module.css";
import HeroSection from "./(home)/HeroSection";

export default function Home() {
  return (
    <main className={styles.home}>
      <HeroSection />
      <h1>Landing Page</h1>
    </main>
  );
}
