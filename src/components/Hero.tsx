import Link from "next/link";
import styles from "./Hero.module.css";
import KittyLogo from "./KittyLogo";

export default function Hero() {
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
                    <span>Hello Kitty Approved</span>
                </div>
                <h1 className={styles.title}>
                    How Fast Are
                    <span className={styles.titleHighlight}> Your Paws?</span>
                </h1>
                <p className={styles.subtitle}>
                    The cutest typing speed test in the universe. Measure your WPM,
                    beat your record, and share your results with friends!
                </p>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <strong>12,000+</strong>
                        <span>Tests Taken</span>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.stat}>
                        <strong>250 WPM</strong>
                        <span>Top Record</span>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.stat}>
                        <strong>99.8%</strong>
                        <span>Best Accuracy</span>
                    </div>
                </div>
                <div className={styles.ctas}>
                    <Link href="#test" className="btn-primary">
                        Start Typing
                    </Link>
                    <Link href="#leaderboard" className="btn-secondary">
                        View Leaderboard
                    </Link>
                </div>
                <div className={styles.kittyWrapper}>
                    <div className={styles.kittyBubble}>
                        <KittyLogo size={120} />
                        <div className={styles.speechBubble}>
                            Type fast, little kitty!
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
