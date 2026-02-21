import styles from "./Footer.module.css";
import KittyLogo from "./KittyLogo";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brand}>
                    <KittyLogo size={40} />
                    <p className={styles.tagline}>The cutest typing speed test on the internet 🎀</p>
                </div>
                <div className={styles.links}>
                    <a href="#test">Type Test</a>
                    <a href="#leaderboard">Leaderboard</a>
                    <a href="#about">About</a>
                </div>
                <p className={styles.copy}>
                    Made with 💕 by <strong>codedbyelif</strong> · {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
}
