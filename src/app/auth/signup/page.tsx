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
            router.push("/");
            router.refresh();
        }
    };

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
