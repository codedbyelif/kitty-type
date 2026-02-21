"use client";

import styles from "./Leaderboard.module.css";

const MOCK_SCORES = [
    { rank: 1, name: "KittyQueen", wpm: 147, accuracy: 99, badge: "👑" },
    { rank: 2, name: "PinkPaws", wpm: 131, accuracy: 97, badge: "🌸" },
    { rank: 3, name: "TypeKitty", wpm: 118, accuracy: 98, badge: "⭐" },
    { rank: 4, name: "BowTyper", wpm: 105, accuracy: 96, badge: "🎀" },
    { rank: 5, name: "HiMeow", wpm: 98, accuracy: 95, badge: "🐱" },
    { rank: 6, name: "FluffyKeys", wpm: 91, accuracy: 94, badge: "🐾" },
    { rank: 7, name: "MilkySpeed", wpm: 88, accuracy: 93, badge: "💕" },
    { rank: 8, name: "PurrType", wpm: 82, accuracy: 91, badge: "✨" },
    { rank: 9, name: "CreamPaws", wpm: 76, accuracy: 92, badge: "🌟" },
    { rank: 10, name: "CutiePaws", wpm: 70, accuracy: 90, badge: "🍓" },
];

export default function Leaderboard() {
    return (
        <section className={styles.section} id="leaderboard">
            <div className="container">
                <div className={styles.header}>
                    <div className={styles.badge}>🏆 Top Typers</div>
                    <h2 className={styles.heading}>Global Leaderboard</h2>
                    <p className={styles.sub}>The fastest paws in the world — can you beat them? 🐾</p>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Player</th>
                                <th>WPM</th>
                                <th>Accuracy</th>
                                <th>Badge</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_SCORES.map((entry) => (
                                <tr key={entry.rank} className={entry.rank <= 3 ? styles.top3 : ""}>
                                    <td className={styles.rankCell}>
                                        {entry.rank <= 3
                                            ? <span className={styles.medalEmoji}>{entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}</span>
                                            : <span className={styles.rankNum}>#{entry.rank}</span>
                                        }
                                    </td>
                                    <td className={styles.nameCell}>{entry.name}</td>
                                    <td className={styles.wpmCell}>{entry.wpm}</td>
                                    <td className={styles.accCell}>{entry.accuracy}%</td>
                                    <td className={styles.badgeCell}>{entry.badge}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.footer}>
                    <p>🎀 Scores refresh daily · Your best score is automatically saved</p>
                </div>
            </div>
        </section>
    );
}
