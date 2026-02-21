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



                <p className={styles.switchText}>
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/signup" className={styles.switchLink}>Sign up for free</Link>
                </p>
            </div>
        </div>
    );
}
