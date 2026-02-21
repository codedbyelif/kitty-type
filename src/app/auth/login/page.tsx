"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "../auth.module.css";
import KittyLogo from "@/components/KittyLogo";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className={styles.page}>
            {/* Floating decorations */}
            <span className={`${styles.deco} ${styles.d1}`}>🐾</span>
            <span className={`${styles.deco} ${styles.d2}`}>🎀</span>
            <span className={`${styles.deco} ${styles.d3}`}>🌸</span>
            <span className={`${styles.deco} ${styles.d4}`}>⭐</span>

            <div className={styles.card}>
                {/* Card top bar */}
                <div className={styles.cardBar} />

                <div className={styles.logoArea}>
                    <KittyLogo size={64} />
                    <h1 className={styles.title}>Welcome Back! 🎀</h1>
                    <p className={styles.sub}>Login to track your typing progress</p>
                </div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="kitty@example.com"
                            className={styles.input}
                            autoComplete="email"
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={styles.input}
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className={styles.errorBox}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`btn-primary ${styles.submitBtn}`}
                        disabled={loading}
                    >
                        {loading ? "Logging in… 🐱" : "Login 🐾"}
                    </button>
                </form>

                <div className={styles.divider}><span>or</span></div>

                <button
                    className={`btn-secondary ${styles.oauthBtn}`}
                    onClick={async () => {
                        await supabase.auth.signInWithOAuth({
                            provider: "github",
                            options: { redirectTo: `${location.origin}/auth/callback` },
                        });
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                    </svg>
                    Continue with GitHub
                </button>

                <p className={styles.switchText}>
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/signup" className={styles.switchLink}>
                        Sign up for free 🌸
                    </Link>
                </p>
            </div>
        </div>
    );
}
