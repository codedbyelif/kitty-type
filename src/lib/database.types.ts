export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    username: string
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    username: string
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    username?: string
                    avatar_url?: string | null
                    updated_at?: string
                }
                Relationships: []
            }
            test_results: {
                Row: {
                    id: string
                    user_id: string
                    wpm: number
                    accuracy: number
                    correct_chars: number
                    total_chars: number
                    errors: number
                    difficulty: "easy" | "medium" | "hard"
                    duration: 15 | 30 | 60
                    played_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    wpm: number
                    accuracy: number
                    correct_chars: number
                    total_chars: number
                    difficulty: "easy" | "medium" | "hard"
                    duration: 15 | 30 | 60
                    played_at?: string
                }
                Update: {
                    wpm?: number
                    accuracy?: number
                    correct_chars?: number
                    total_chars?: number
                    difficulty?: "easy" | "medium" | "hard"
                    duration?: 15 | 30 | 60
                    played_at?: string
                }
                Relationships: []
            }
        }
        Views: {
            leaderboard_alltime: {
                Row: {
                    id: string
                    user_id: string
                    username: string
                    avatar_url: string | null
                    wpm: number
                    accuracy: number
                    difficulty: string
                    played_at: string
                }
                Relationships: []
            }
            leaderboard_daily: {
                Row: {
                    id: string
                    user_id: string
                    username: string
                    avatar_url: string | null
                    wpm: number
                    accuracy: number
                    difficulty: string
                    played_at: string
                }
                Relationships: []
            }
        }
        Functions: Record<string, never>
        Enums: Record<string, never>
        CompositeTypes: Record<string, never>
    }
}

// Convenience type aliases
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type TestResult = Database["public"]["Tables"]["test_results"]["Row"]
export type LeaderboardEntry = Database["public"]["Views"]["leaderboard_alltime"]["Row"]
