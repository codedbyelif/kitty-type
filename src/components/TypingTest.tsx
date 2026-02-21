"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { generateWordList } from "@/data/words";
import styles from "./TypingTest.module.css";
import KittyLogo from "./KittyLogo";

type Difficulty = "easy" | "medium" | "hard";
type GameState = "idle" | "running" | "finished";

interface Results {
    wpm: number;
    accuracy: number;
    correctChars: number;
    totalChars: number;
    time: number;
}

const DURATIONS = [15, 30, 60];

export default function TypingTest({ onFinish }: { onFinish: (r: Results) => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");
    const [duration, setDuration] = useState(30);
    const [words, setWords] = useState<string[]>([]);
    const [typed, setTyped] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [wordStatuses, setWordStatuses] = useState<("correct" | "wrong" | "pending")[]>([]);
    const [gameState, setGameState] = useState<GameState>("idle");
    const [timeLeft, setTimeLeft] = useState(30);
    const [charErrors, setCharErrors] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const initGame = useCallback(() => {
        const newWords = generateWordList(difficulty, 80);
        setWords(newWords);
        setWordStatuses(new Array(80).fill("pending"));
        setTyped("");
        setCurrentWordIndex(0);
        setTimeLeft(duration);
        setCharErrors(0);
        setCorrectChars(0);
        setGameState("idle");
        if (timerRef.current) clearInterval(timerRef.current);
    }, [difficulty, duration]);

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
            onFinish({ wpm, accuracy, correctChars, totalChars: totalTyped, time: duration });
        }
    }, [gameState]);

    // Auto-scroll active word into view
    useEffect(() => {
        const el = wordRefs.current[currentWordIndex];
        if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, [currentWordIndex]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (gameState === "idle") {
            setGameState("running");
            startTimer();
        }
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
                setCharErrors((c) => c + Math.abs(trimmed.length - words[currentWordIndex].length) + 1);
            }
            setCurrentWordIndex((i) => i + 1);
            setTyped("");
        } else {
            setTyped(value);
        }
    };

    const timerPercent = ((duration - timeLeft) / duration) * 100;
    const urgentTime = timeLeft <= 5;

    return (
        <section className={styles.section} id="test">
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.heading}>🐾 Typing Test</h2>
                    <p className={styles.sub}>Start typing to begin the test — space bar submits each word</p>
                </div>

                {/* Controls */}
                <div className={styles.controls}>
                    <div className={styles.controlGroup}>
                        <label className={styles.controlLabel}>Difficulty</label>
                        <div className={styles.pills}>
                            {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                                <button
                                    key={d}
                                    className={`${styles.pill} ${difficulty === d ? styles.pillActive : ""}`}
                                    onClick={() => { setDifficulty(d); }}
                                    disabled={gameState === "running"}
                                >
                                    {d === "easy" ? "🌸 Easy" : d === "medium" ? "🎀 Medium" : "⭐ Hard"}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.controlGroup}>
                        <label className={styles.controlLabel}>Time</label>
                        <div className={styles.pills}>
                            {DURATIONS.map((d) => (
                                <button
                                    key={d}
                                    className={`${styles.pill} ${duration === d ? styles.pillActive : ""}`}
                                    onClick={() => { setDuration(d); }}
                                    disabled={gameState === "running"}
                                >
                                    {d}s
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Timer */}
                <div className={styles.timerBox}>
                    <div className={styles.timerTrack}>
                        <div
                            className={`${styles.timerFill} ${urgentTime ? styles.timerUrgent : ""}`}
                            style={{ width: `${timerPercent}%` }}
                        />
                    </div>
                    <div className={`${styles.timerNum} ${urgentTime ? styles.timerNumUrgent : ""}`}>
                        {timeLeft}s
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
                                        if (isActive) {
                                            if (ci < typed.length) {
                                                charClass = typed[ci] === char ? styles.charCorrect : styles.charWrong;
                                            }
                                            if (ci === typed.length) charClass = styles.charCursor;
                                        }
                                        return (
                                            <span key={ci} className={charClass}>{char}</span>
                                        );
                                    })}
                                    {isActive && typed.length === word.length && (
                                        <span className={styles.charCursor} />
                                    )}
                                </span>
                            );
                        })}
                    </div>
                    {gameState === "idle" && (
                        <div className={styles.clickHint}>
                            <KittyLogo size={28} />
                            <span>Click here and start typing! 🎀</span>
                        </div>
                    )}
                </div>

                {/* Hidden input */}
                <input
                    ref={inputRef}
                    className={styles.hiddenInput}
                    value={typed}
                    onChange={handleInput}
                    disabled={gameState === "finished"}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                />

                <div className={styles.actions}>
                    <button className="btn-secondary" onClick={initGame}>
                        🔄 Restart
                    </button>
                    {gameState === "idle" && (
                        <div className={styles.idleTip}>Press any key to start!</div>
                    )}
                </div>
            </div>
        </section>
    );
}
