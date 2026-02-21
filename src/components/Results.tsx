"use client";

import styles from "./Results.module.css";
import KittyLogo from "./KittyLogo";

interface ResultsProps {
    wpm: number;
    accuracy: number;
    correctChars: number;
    totalChars: number;
    time: number;
    onRetry: () => void;
}

function getRank(wpm: number): { label: string; icon: string; desc: string } {
    if (wpm >= 120) return { label: "Kitty Legend", icon: "◆", desc: "You type faster than a kitty's heartbeat!" };
    if (wpm >= 80) return { label: "Super Paws", icon: "★", desc: "Incredible speed — you're a typing superstar!" };
    if (wpm >= 50) return { label: "Pretty Fast", icon: "♦", desc: "You're getting there, keep going!" };
    if (wpm >= 30) return { label: "Kitten Level", icon: "♥", desc: "Keep practicing, little kitty!" };
    return { label: "Baby Paws", icon: "♣", desc: "Every expert was once a beginner!" };
}

export default function Results({ wpm, accuracy, correctChars, totalChars, time, onRetry }: ResultsProps) {
    const rank = getRank(wpm);
    const errorCount = totalChars - correctChars;

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                {/* Decorative dots */}
                <div className={styles.confetti}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className={styles.confettiPiece} style={{ "--i": i } as React.CSSProperties} />
                    ))}
                </div>

                <div className={styles.kittyTop}>
                    <KittyLogo size={80} />
                </div>

                <div className={styles.rankBadge}>
                    <span className={styles.rankEmoji}>{rank.icon}</span>
                    <div>
                        <div className={styles.rankLabel}>{rank.label}</div>
                        <div className={styles.rankDesc}>{rank.desc}</div>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{wpm}</div>
                        <div className={styles.statLabel}>WPM</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{accuracy}%</div>
                        <div className={styles.statLabel}>Accuracy</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{correctChars}</div>
                        <div className={styles.statLabel}>Correct Chars</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue} style={{ color: errorCount > 0 ? "#e84040" : undefined }}>
                            {errorCount}
                        </div>
                        <div className={styles.statLabel}>Errors</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{time}s</div>
                        <div className={styles.statLabel}>Time</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{Math.round(wpm * (accuracy / 100))}</div>
                        <div className={styles.statLabel}>Adjusted WPM</div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className="btn-primary" onClick={onRetry}>
                        Try Again
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => {
                            const text = `I just got ${wpm} WPM with ${accuracy}% accuracy on KittyType!`;
                            navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard! Share your result."));
                        }}
                    >
                        Share Result
                    </button>
                </div>
            </div>
        </div>
    );
}
