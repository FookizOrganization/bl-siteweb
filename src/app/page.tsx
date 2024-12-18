
import styles from "./page.module.css";
import Header from "@/components/header/header";
import HomeContent from "@/components/home-content/homeContent";

export default function Home() {
  return (
    <div className={styles.page}>
        <Header />
        <HomeContent />
    </div>
  );
}
