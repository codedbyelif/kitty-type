"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "../auth.module.css";
import KittyLogo from "@/components/KittyLogo";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirm) {
            setError("Passwords don't match!");
            return;
        }
        if (username.length < 3) {
            setError("Username must be at least 3 characters");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username },
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
        }
    };

    if (success) {
        return (
            <div className={styles.page}>
                <div className={styles.card}>
                    <div className={styles.cardBar} />
                    <div className={styles.successBox}>
                        <KittyLogo size={80} />
                        <h2 className={styles.successTitle}>Check your email!</h2>
                        <p className={styles.successText}>
                            We sent a confirmation link to <strong>{email}</strong>.
                            Click it to activate your account and start typing!
                        </p>
                        <Link href="/" className="btn-primary" style={{ marginTop: "16px" }}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.cardBar} />

                <div className={styles.logoArea}>
                    <KittyLogo size={56} />
                    <h1 className={styles.title}>Join KittyType!</h1>
                    <p className={styles.sub}>Create an account to save your scores</p>
                </div>

                <form onSubmit={handleSignup} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="KittyTyper"
                            className={styles.input}
                            minLength={3}
                        />
                    </div>

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
                            placeholder="At least 6 characters"
                            className={styles.input}
                            minLength={6}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="confirm">Confirm Password</label>
                        <input
                            id="confirm"
                            type="password"
                            required
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="Repeat your password"
                            className={`${styles.input} ${confirm && confirm !== password ? styles.inputError : ""}`}
                        />
                        {confirm && confirm !== password && (
                            <span className={styles.fieldError}>Passwords do not match</span>
                        )}
                    </div>

                    {error && (
                        <div className={styles.errorBox}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`btn-primary ${styles.submitBtn}`}
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <div className={styles.divider}>or</div>

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
                    Already have an account?{" "}
                    <Link href="/auth/login" className={styles.switchLink}>
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
