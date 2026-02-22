import styles from "./About.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    const FEATURES = [
        { icon: "⚡", title: t("about_feat1_title"), desc: t("about_feat1_desc") },
        { icon: "🎯", title: t("about_feat2_title"), desc: t("about_feat2_desc") },
        { icon: "🏆", title: t("about_feat3_title"), desc: t("about_feat3_desc") },
        { icon: "🌸", title: t("about_feat4_title"), desc: t("about_feat4_desc") },
        { icon: "⏱️", title: t("about_feat5_title"), desc: t("about_feat5_desc") },
        { icon: "🎀", title: t("about_feat6_title"), desc: t("about_feat6_desc") },
    ];

    return (
        <section className={styles.section} id="about">
            <div className="container">
                <div className={styles.header}>
                    <div className={styles.badge}>{t("about_badge")}</div>
                    <h2 className={styles.heading}>{t("about_title")}</h2>
                    <p className={styles.sub}>{t("about_subtitle")}</p>
                </div>

                <div className={styles.grid}>
                    {FEATURES.map((f) => (
                        <div key={f.title} className={styles.card}>
                            <div className={styles.icon}>{f.icon}</div>
                            <h3 className={styles.cardTitle}>{f.title}</h3>
                            <p className={styles.cardDesc}>{f.desc}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <div className={styles.ctaInner}>
                        <h3 className={styles.ctaTitle}>{t("about_cta_title")}</h3>
                        <p className={styles.ctaDesc}>{t("about_cta_desc")}</p>
                        <a href="#test" className="btn-primary">{t("about_cta_btn")}</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
