import styles from "./About.module.css";

const FEATURES = [
    { icon: "⚡", title: "Real-Time WPM", desc: "See your words-per-minute update live as you type." },
    { icon: "🎯", title: "Accuracy Tracking", desc: "Every character counts — track your precision score." },
    { icon: "🏆", title: "Global Leaderboard", desc: "Compete with typists worldwide and claim the top spot." },
    { icon: "🌸", title: "Multiple Modes", desc: "Easy, Medium, Hard word sets for every skill level." },
    { icon: "⏱️", title: "Flexible Timer", desc: "15, 30, or 60 second sessions to suit your schedule." },
    { icon: "🎀", title: "Hello Kitty Vibes", desc: "The cutest typing experience you'll ever have, guaranteed." },
];

export default function About() {
    return (
        <section className={styles.section} id="about">
            <div className="container">
                <div className={styles.header}>
                    <div className={styles.badge}>✨ Why KittyType?</div>
                    <h2 className={styles.heading}>Everything you need to level up your typing</h2>
                    <p className={styles.sub}>Built with love and lots of pink 💕</p>
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
                        <h3 className={styles.ctaTitle}>Ready to become a typing legend? 👑</h3>
                        <p className={styles.ctaDesc}>Join thousands of cute typists already using KittyType</p>
                        <a href="#test" className="btn-primary">Start Your Test</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
