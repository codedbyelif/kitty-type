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
        if (error) { setError(error.message); setLoading(false); }
        else { router.push("/"); router.refresh(); }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.cardBar} />

                <div className={styles.logoArea}>
                    <KittyLogo size={56} />
                    <h1 className={styles.title}>Welcome Back!</h1>
                    <p className={styles.sub}>Login to track your typing progress</p>
                </div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input
                            id="email" type="email" required value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="kitty@example.com"
                            className={styles.input} autoComplete="email"
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input
                            id="password" type="password" required value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={styles.input} autoComplete="current-password"
                        />
                    </div>

                    {error && <div className={styles.errorBox}>{error}</div>}

                    <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className={styles.divider}><span>or</span></div>

                <button
                    className={`btn-secondary ${styles.oauthBtn}`}
                    onClick={async () => {
                        await supabase.auth.signInWithOAuth({
                            provider: "google",
                            options: { redirectTo: `${location.origin}/auth/callback` },
                        });
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <p className={styles.switchText}>
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/signup" className={styles.switchLink}>Sign up for free</Link>
                </p>
            </div>
        </div>
    );
}
