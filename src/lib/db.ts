import { createClient } from "./supabase/client";
import type { Database } from "./database.types";

type TestResultInsert = Database["public"]["Tables"]["test_results"]["Insert"];

// ── Save a test result (client-side, user must be logged in) ──
export async function saveTestResult(data: Omit<TestResultInsert, "user_id">) {
    try {
        const response = await fetch('/api/save-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            return { error: result.error || "Failed to save score" };
        }

        return { error: null };
    } catch (err) {
        console.error("Fetch error:", err);
        return { error: "Network error occurred while saving" };
    }
}

// ── Get leaderboard (top N by WPM for a given difficulty) ──
export async function getLeaderboard(
    difficulty: "easy" | "medium" | "hard" | "all" = "all",
    limit = 10
) {
    const supabase = createClient();

    let query = supabase
        .from("leaderboard_alltime")
        .select("*")
        .order("wpm", { ascending: false })
        .limit(limit);

    if (difficulty !== "all") {
        query = query.eq("difficulty", difficulty);
    }

    const { data, error } = await query;
    return { data, error: error?.message ?? null };
}

// ── Get a user's personal best results ──
export async function getPersonalBests(userId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("test_results")
        .select("wpm, accuracy, difficulty, duration, played_at")
        .eq("user_id", userId)
        .order("wpm", { ascending: false })
        .limit(20);

    return { data, error: error?.message ?? null };
}

// ── Get a user's recent results ──
export async function getRecentResults(userId: string, limit = 10) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("test_results")
        .select("wpm, accuracy, difficulty, duration, played_at")
        .eq("user_id", userId)
        .order("played_at", { ascending: false })
        .limit(limit);

    return { data, error: error?.message ?? null };
}

// ── Get a user's profile ──
export async function getProfile(userId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    return { data, error: error?.message ?? null };
}

// ── Update a user's username ──
export async function updateUsername(userId: string, username: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from("profiles")
        .update({ username, updated_at: new Date().toISOString() })
        .eq("id", userId);

    return { error: error?.message ?? null };
}
