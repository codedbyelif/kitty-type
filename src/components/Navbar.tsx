"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import KittyLogo from "./KittyLogo";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, profile, signOut } = useAuth();
    const { t, lang, setLang } = useLanguage();
    const dropdownRef = useRef<HTMLLIElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const initials = profile?.username?.slice(0, 2).toUpperCase() ?? "KT";

    return (
        <nav className={styles.nav}>
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.logo}>
                    <KittyLogo size={36} />
                    <span className={styles.logoText}>KittyType</span>
                </Link>

                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={menuOpen ? styles.barOpen : styles.bar} />
                    <span className={menuOpen ? styles.barOpen : styles.bar} />
                    <span className={menuOpen ? styles.barOpen : styles.bar} />
                </button>

                <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
                    <li><Link href="#test" className={styles.link} onClick={() => setMenuOpen(false)}>{t("nav_type_test")}</Link></li>
                    <li><Link href="#leaderboard" className={styles.link} onClick={() => setMenuOpen(false)}>{t("nav_leaderboard")}</Link></li>
                    <li className={styles.aboutGroup}>
                        <Link href="#about" className={styles.link} onClick={() => setMenuOpen(false)}>{t("nav_about")}</Link>
                        <button className={styles.langToggle} onClick={() => setLang(lang === 'en' ? 'tr' : 'en')} aria-label="Toggle Language" title="Switch Language">
                            {lang === "en" ? "🇹🇷 TR" : "🇬🇧 EN"}
                        </button>
                    </li>

                    {user ? (
                        <li ref={dropdownRef} className={styles.userMenu}>
                            <button className={styles.avatarBtn} onClick={() => setDropdownOpen((o) => !o)}>
                                <span className={styles.avatar}>{initials}</span>
                                <span className={styles.username}>{profile?.username ?? "..."}</span>
                                <svg className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div className={styles.dropdown}>
                                    <div className={styles.dropdownHeader}>
                                        <span className={styles.dropdownAvatar}>{initials}</span>
                                        <div>
                                            <div className={styles.dropdownName}>{profile?.username}</div>
                                            <div className={styles.dropdownEmail}>{user.email}</div>
                                        </div>
                                    </div>
                                    <hr className={styles.dropdownDivider} />
                                    <button
                                        className={`${styles.dropdownItem} ${styles.dropdownSignout}`}
                                        onClick={() => { signOut(); setDropdownOpen(false); }}
                                    >
                                        {t("nav_sign_out")}
                                    </button>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li className={styles.authGroup}>
                            <Link href="/auth/login" className="btn-secondary" style={{ padding: "10px 20px", fontSize: "0.9rem" }}>
                                {t("nav_login")}
                            </Link>
                            <Link href="/auth/signup" className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.9rem" }}>
                                {t("nav_signup")}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
