"use client";

import { useEffect, useState } from "react";
import styles from "./Leaderboard.module.css";
import { createClient } from "@/lib/supabase/client";
import type { LeaderboardEntry } from "@/lib/database.types";

type Difficulty = "easy" | "medium" | "hard" | "all";



function getRankBadge(rank: number) {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
}

function formatDate(s: string) {
    return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Leaderboard() {
    const [difficulty, setDifficulty] = useState<Difficulty>("all");
    const [scores, setScores] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const supabase = createClient();
                let query = supabase
                    .from("leaderboard_alltime")
                    .select("*")
                    .order("wpm", { ascending: false })
                    .limit(10);

                if (difficulty !== "all") query = query.eq("difficulty", difficulty);

                const { data, error } = await query;

                if (error || !data) {
                    setScores([]);
                } else {
                    setScores(data as LeaderboardEntry[]);
                }
            } catch {
                setScores([]);
            }
            setLoading(false);
        }
        load();
    }, [difficulty]);



    return (
        <section className={styles.section} id="leaderboard">
            <div className="container">
                <div className={styles.header}>
                    <div className={styles.badge}>🏆 Top Typers</div>
                    <h2 className={styles.heading}>Global Leaderboard</h2>
                    <p className={styles.sub}>The fastest paws in the world — can you beat them? 🐾</p>
                </div>

                {/* Difficulty filter */}
                <div className={styles.filters}>
                    {(["all", "easy", "medium", "hard"] as Difficulty[]).map((d) => (
                        <button
                            key={d}
                            className={`${styles.filterPill} ${difficulty === d ? styles.filterActive : ""}`}
                            onClick={() => setDifficulty(d)}
                        >
                            {d === "all" ? "All" : d === "easy" ? "Easy" : d === "medium" ? "Medium" : "Hard"}
                        </button>
                    ))}
                </div>

                <div className={styles.tableWrapper}>
                    {loading ? (
                        <div className={styles.loadingBox}>
                            <span className={styles.spinner} />
                            <p>Loading leaderboard… 🐱</p>
                        </div>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Player</th>
                                    <th>WPM</th>
                                    <th>Accuracy</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>No scores found for this difficulty yet. 🎀</td>
                                    </tr>
                                ) : (
                                    scores.map((entry, i) => (
                                        <tr key={entry.id} className={i < 3 ? styles.top3 : ""}>
                                            <td className={styles.rankCell}><span className={styles.rankVal}>{getRankBadge(i + 1)}</span></td>
                                            <td className={styles.nameCell}>{entry.username}</td>
                                            <td className={styles.wpmCell}>{entry.wpm}</td>
                                            <td className={styles.accCell}>{entry.accuracy}%</td>
                                            <td className={styles.dateCell}>{formatDate(entry.played_at)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>


                <div className={styles.footer}>
                    <p>🎀 Scores refresh daily · Login to appear on the leaderboard</p>
                </div>
            </div>
        </section>
    );
}
