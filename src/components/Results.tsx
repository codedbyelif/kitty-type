"use client";

import styles from "./Results.module.css";
import KittyLogo from "./KittyLogo";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

interface ResultsProps {
    wpm: number;
    accuracy: number;
    correctChars: number;
    totalChars: number;
    time: number;
    onRetry: () => void;
}

export default function Results({ wpm, accuracy, correctChars, totalChars, time, onRetry }: ResultsProps) {
    const { t } = useLanguage();
    const errorCount = totalChars - correctChars;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (wpm >= 85 && canvasRef.current) {
            const end = Date.now() + 3 * 1000;
            const colors = ['#ff99d0', '#ffb8df', '#ffffff'];
            const myConfetti = confetti.create(canvasRef.current, {
                resize: true,
                useWorker: true
            });

            (function frame() {
                myConfetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.8 },
                    colors: colors
                });
                myConfetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.8 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }, [wpm]);

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                <canvas ref={canvasRef} className={styles.confettiCanvas} />
                {/* Decorative dots */}
                <div className={styles.confetti}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className={styles.confettiPiece} style={{ "--i": i } as React.CSSProperties} />
                    ))}
                </div>
                {/* Rain effect for wpm < 85 */}
                {wpm < 85 && (
                    <div className={styles.rainContainer}>
                        {Array.from({ length: 50 }).map((_, i) => (
                            <span key={`rain-${i}`} className={styles.rainDrop} style={{ "--i": i, "--x": Math.random() } as React.CSSProperties} />
                        ))}
                    </div>
                )}

                <div className={styles.kittyTop}>
                    {wpm >= 85 ? (
                        <Image
                            src="/iiiiii.jpeg"
                            alt="Pro Typer Kitty"
                            width={220}
                            height={220}
                            style={{ objectFit: "contain", borderRadius: "12px" }}
                        />
                    ) : (
                        <Image
                            src="/askım.jpg"
                            alt="Cute Try Kitty"
                            width={220}
                            height={220}
                            style={{ objectFit: "contain", borderRadius: "12px" }}
                        />
                    )}
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{wpm}</div>
                        <div className={styles.statLabel}>{t("results_wpm")}</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{accuracy}%</div>
                        <div className={styles.statLabel}>{t("results_accuracy")}</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{correctChars}</div>
                        <div className={styles.statLabel}>{t("results_correct")} {t("results_chars").toLowerCase()}</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue} style={{ color: errorCount > 0 ? "#e84040" : undefined }}>
                            {errorCount}
                        </div>
                        <div className={styles.statLabel}>{t("results_incorrect")}</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{time}s</div>
                        <div className={styles.statLabel}>{t("results_time_taken")}</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{Math.round(wpm * (accuracy / 100))}</div>
                        <div className={styles.statLabel}>WPM ({t("results_accuracy")})</div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className="btn-primary" onClick={onRetry}>
                        {t("results_try_again")}
                    </button>
                </div>
            </div>
        </div>
    );
}
