"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "../auth.module.css";
import KittyLogo from "@/components/KittyLogo";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
    const { t } = useLanguage();
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
                    <h1 className={styles.title}>{t("auth_welcome_back")}</h1>
                    <p className={styles.sub}>{t("auth_login_sub")}</p>
                </div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">{t("auth_email")}</label>
                        <input
                            id="email" type="email" required value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="kitty@example.com"
                            className={styles.input} autoComplete="email"
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">{t("auth_password")}</label>
                        <input
                            id="password" type="password" required value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={styles.input} autoComplete="current-password"
                        />
                    </div>

                    {error && <div className={styles.errorBox}>{error}</div>}

                    <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
                        {loading ? t("auth_signing_in") : t("auth_signin_btn")}
                    </button>
                </form>



                <p className={styles.switchText}>
                    {t("auth_no_account")}{" "}
                    <Link href="/auth/signup" className={styles.switchLink}>{t("auth_signup_btn")}</Link>
                </p>
            </div>
        </div>
    );
}
