import { createClient } from "./supabase/client";
import type { Database } from "./database.types";

type TestResultInsert = Database["public"]["Tables"]["test_results"]["Insert"];

// ── Save a test result (client-side, user must be logged in) ──
export async function saveTestResult(data: Omit<TestResultInsert, "user_id">) {
    // Advanced bot prevention:
    // 1. Hard cap at 200 WPM
    if (data.wpm >= 200) {
        return { error: "Score rejected: WPM too high (bot protection)" };
    }

    // 2. Mathematical validation: Is the WPM even physically possible based on the duration and chars?
    // Formula for WPM standard is: (total_correct_chars / 5) / (duration_in_seconds / 60)
    const expectedWpm = Math.round((data.correct_chars / 5) / (data.duration / 60));

    // Allow a small margin of error (e.g. +/- 2 WPM) for floating point/rounding differences
    if (Math.abs(data.wpm - expectedWpm) > 2) {
        return { error: "Score rejected: Math validation failed (bot protection)" };
    }

    // 3. Perfect accuracy with 0 correct chars (submitting an empty test as 100% accuracy)
    if (data.correct_chars === 0 && data.accuracy > 0) {
        return { error: "Score rejected: Invalid accuracy (bot protection)" };
    }

    // 4. Over 100% accuracy
    if (data.accuracy > 100 || data.accuracy < 0) {
        return { error: "Score rejected: Invalid accuracy range (bot protection)" };
    }

    // 5. Total chars mismatch
    if (data.correct_chars > data.total_chars) {
        return { error: "Score rejected: Correct chars cannot exceed total chars (bot protection)" };
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase.from("test_results").insert({
        ...data,
        user_id: user.id,
    });

    return { error: error?.message ?? null };
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
