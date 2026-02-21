"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";
import KittyLogo from "./KittyLogo";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <li><Link href="#test" className={styles.link} onClick={() => setMenuOpen(false)}>Type Test</Link></li>
                    <li><Link href="#leaderboard" className={styles.link} onClick={() => setMenuOpen(false)}>Leaderboard</Link></li>
                    <li><Link href="#about" className={styles.link} onClick={() => setMenuOpen(false)}>About</Link></li>
                    <li>
                        <Link href="#test" className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
                            Start Typing 🐱
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
