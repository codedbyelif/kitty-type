import Link from "next/link";
import styles from "./Hero.module.css";
import KittyLogo from "./KittyLogo";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();
    return (
        <section className={styles.hero}>
            {/* Floating decorative elements — kept as pure CSS shapes, no emoji */}
            <span className={`${styles.deco} ${styles.deco1}`} />
            <span className={`${styles.deco} ${styles.deco2}`} />
            <span className={`${styles.deco} ${styles.deco3}`} />
            <span className={`${styles.deco} ${styles.deco4}`} />
            <span className={`${styles.deco} ${styles.deco5}`} />

            <div className={`container ${styles.content}`}>
                <div className={styles.badge}>
                    <span>{t("hero_badge")}</span>
                </div>
                <h1 className={styles.title}>
                    {t("hero_title")}
                    <span className={styles.titleHighlight}>{t("hero_title_highlight")}</span>
                </h1>
                <p className={styles.subtitle}>
                    {t("hero_subtitle")}
                </p>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <strong>12,000+</strong>
                        <span>{t("hero_tests_taken")}</span>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.stat}>
                        <strong>250 WPM</strong>
                        <span>{t("hero_top_record")}</span>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.stat}>
                        <strong>99.8%</strong>
                        <span>{t("hero_best_accuracy")}</span>
                    </div>
                </div>
                <div className={styles.ctas}>
                    <a href="#test" className="btn-primary">
                        {t("hero_start_typing")}
                    </a>
                    <a href="#leaderboard" className="btn-secondary">
                        {t("hero_view_leaderboard")}
                    </a>
                </div>
                <div className={styles.kittyWrapper}>
                    <div className={styles.kittyBubble}>
                        <KittyLogo size={120} />
                        <div className={styles.speechBubble}>
                            {t("hero_kitty_bubble")}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
