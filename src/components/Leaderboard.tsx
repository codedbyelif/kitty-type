"use client";

import { useEffect, useState } from "react";
import styles from "./Leaderboard.module.css";
import { createClient } from "@/lib/supabase/client";
import type { LeaderboardEntry } from "@/lib/database.types";
import { useLanguage } from "@/context/LanguageContext";

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
    const { t } = useLanguage();
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
                    .limit(difficulty === "all" ? 100 : 10);

                if (difficulty !== "all") query = query.eq("difficulty", difficulty);

                const { data, error } = await query;

                if (error || !data) {
                    setScores([]);
                } else {
                    let finalData = data as LeaderboardEntry[];
                    if (difficulty === "all") {
                        const seen = new Set();
                        finalData = finalData.filter((entry) => {
                            if (seen.has(entry.user_id)) return false;
                            seen.add(entry.user_id);
                            return true;
                        }).slice(0, 10);
                    }
                    setScores(finalData);
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
                    <div className={styles.badge}>{t("lb_title")}</div>
                    <h2 className={styles.heading}>{t("nav_leaderboard")}</h2>
                    <p className={styles.sub}>{t("lb_subtitle")}</p>
                </div>

                {/* Difficulty filter */}
                <div className={styles.filters}>
                    {(["all", "easy", "medium", "hard"] as Difficulty[]).map((d) => (
                        <button
                            key={d}
                            className={`${styles.filterPill} ${difficulty === d ? styles.filterActive : ""}`}
                            onClick={() => setDifficulty(d)}
                        >
                            {d === "all" ? "All" : d === "easy" ? t("test_easy") : d === "medium" ? t("test_medium") : t("test_hard")}
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
                                    <th>{t("lb_rank")}</th>
                                    <th>{t("lb_typist")}</th>
                                    <th>{t("lb_wpm")}</th>
                                    <th>{t("lb_acc")}</th>
                                    <th>{t("lb_date")}</th>
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
                    <p>🎀 {t("lb_log_in_to_appear")}</p>
                </div>
            </div>
        </section>
    );
}
