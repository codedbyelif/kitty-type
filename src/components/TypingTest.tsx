"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { generateWordList, type Language as WordListLanguage } from "@/data/words";
import styles from "./TypingTest.module.css";
import KittyLogo from "./KittyLogo";
import { useLanguage } from "@/context/LanguageContext";

type Difficulty = "easy" | "medium" | "hard";
type GameState = "idle" | "running" | "finished";

interface Results {
    wpm: number;
    accuracy: number;
    correctChars: number;
    totalChars: number;
    time: 15 | 30 | 60;
    difficulty: Difficulty;
}

const DURATIONS = [15, 30, 60] as const;

export default function TypingTest({ onFinish }: { onFinish: (r: Results) => void }) {
    const { t, lang: uiLang } = useLanguage();
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");
    const [duration, setDuration] = useState<15 | 30 | 60>(30);
    const [lang, setLang] = useState<WordListLanguage>("en");
    const [words, setWords] = useState<string[]>([]);
    const [typed, setTyped] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [wordStatuses, setWordStatuses] = useState<("correct" | "wrong" | "pending")[]>([]);
    const [gameState, setGameState] = useState<GameState>("idle");
    const [timeLeft, setTimeLeft] = useState(30);
    const [charErrors, setCharErrors] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [capsWarning, setCapsWarning] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const initGame = useCallback(() => {
        const newWords = generateWordList(difficulty, lang, 80);
        setWords(newWords);
        setWordStatuses(new Array(80).fill("pending"));
        setTyped("");
        setCurrentWordIndex(0);
        setTimeLeft(duration);
        setCharErrors(0);
        setCorrectChars(0);
        setGameState("idle");
        if (timerRef.current) clearInterval(timerRef.current);
    }, [difficulty, lang, duration]);

    useEffect(() => {
        initGame();
    }, [initGame]);

    const startTimer = useCallback(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(timerRef.current!);
                    setGameState("finished");
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
    }, []);

    useEffect(() => {
        if (gameState === "finished") {
            const wpm = Math.round((correctChars / 5) / (duration / 60));
            const totalTyped = correctChars + charErrors;
            const accuracy = totalTyped ? Math.round((correctChars / totalTyped) * 100) : 0;
            onFinish({ wpm, accuracy, correctChars, totalChars: totalTyped, time: duration, difficulty });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState]);

    useEffect(() => {
        const el = wordRefs.current[currentWordIndex];
        if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, [currentWordIndex]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (gameState === "idle") { setGameState("running"); startTimer(); }
        if (gameState === "finished") return;

        if (value.endsWith(" ")) {
            const trimmed = value.trim();
            const isCorrect = trimmed === words[currentWordIndex];

            setWordStatuses((prev) => {
                const copy = [...prev];
                copy[currentWordIndex] = isCorrect ? "correct" : "wrong";
                return copy;
            });

            if (isCorrect) {
                setCorrectChars((c) => c + words[currentWordIndex].length + 1);
            } else {
                setCharErrors((c) => c + 1);
            }

            setCurrentWordIndex((i) => i + 1);
            setTyped("");
        } else {
            setTyped(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.getModifierState) {
            setCapsWarning(e.getModifierState("CapsLock"));
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.getModifierState) {
            setCapsWarning(e.getModifierState("CapsLock"));
        }
    };

    const timerPercent = ((duration - timeLeft) / duration) * 100;
    const urgentTime = timeLeft <= 5;

    return (
        <section className={styles.section} id="test">
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.heading}>{t("test_title")}</h2>
                    <p className={styles.sub}>{t("test_subtitle")}</p>
                </div>

                {capsWarning && (
                    <div className={styles.capsWarningBox}>
                        {t("test_caps_warning")}
                    </div>
                )}

                {/* Controls */}
                <div className={styles.controls}>
                    {/* Language toggle */}
                    <div className={styles.controlGroup}>
                        <label className={styles.controlLabel}>{t("test_lang_label")}</label>
                        <div className={styles.pills}>
                            {(["en", "tr"] as WordListLanguage[]).map((l) => (
                                <button
                                    key={l}
                                    className={`${styles.pill} ${lang === l ? styles.pillActive : ""}`}
                                    onClick={() => setLang(l)}
                                    disabled={gameState === "running"}
                                >
                                    {l === "en" ? "EN" : "TR"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty */}
                    <div className={styles.controlGroup}>
                        <label className={styles.controlLabel}>{t("test_diff_label")}</label>
                        <div className={styles.pills}>
                            {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                                <button
                                    key={d}
                                    className={`${styles.pill} ${difficulty === d ? styles.pillActive : ""}`}
                                    onClick={() => setDifficulty(d)}
                                    disabled={gameState === "running"}
                                >
                                    {d === "easy" ? t("test_easy") : d === "medium" ? t("test_medium") : t("test_hard")}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Duration */}
                    <div className={styles.controlGroup}>
                        <label className={styles.controlLabel}>{t("test_time_label")}</label>
                        <div className={styles.pills}>
                            {DURATIONS.map((d) => (
                                <button
                                    key={d}
                                    className={`${styles.pill} ${duration === d ? styles.pillActive : ""}`}
                                    onClick={() => setDuration(d)}
                                    disabled={gameState === "running"}
                                >
                                    {d}s
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Word display */}
                <div className={styles.wordBox} onClick={() => inputRef.current?.focus()}>
                    <div className={styles.words}>
                        {words.map((word, i) => {
                            const isActive = i === currentWordIndex;
                            const status = wordStatuses[i];
                            return (
                                <span
                                    key={i}
                                    ref={(el) => { wordRefs.current[i] = el; }}
                                    className={`${styles.word} ${status === "correct" ? styles.correct : ""} ${status === "wrong" ? styles.wrong : ""} ${isActive ? styles.activeWord : ""}`}
                                >
                                    {word.split("").map((char, ci) => {
                                        let charClass = "";
                                        if (isActive && ci < typed.length) {
                                            charClass = typed[ci] === char ? styles.charCorrect : styles.charWrong;
                                        }
                                        return <span key={ci} className={charClass}>{char}</span>;
                                    })}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Input Bar */}
                <div className={styles.inputBar}>
                    <input
                        ref={inputRef}
                        className={styles.visibleInput}
                        value={typed}
                        onChange={handleInput}
                        disabled={gameState === "finished"}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        dir="ltr"
                    />

                    <div className={`${styles.timerBoxInline} ${urgentTime ? styles.timerUrgent : ""}`}>
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>

                    <button className={styles.restartBtn} onClick={initGame} aria-label="Restart">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
