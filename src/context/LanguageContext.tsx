"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationKey, Language } from "@/data/translations";

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>("en");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLang = localStorage.getItem("kittytype-lang") as Language;
        if (savedLang === "en" || savedLang === "tr") {
            setLangState(savedLang);
        }
    }, []);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem("kittytype-lang", newLang);
    };

    const t = (key: TranslationKey): string => {
        // If translations are somehow missing, fallback gracefully
        if (!translations[lang] || !translations[lang][key]) {
            // Fallback to English, then to Key string
            return translations["en"]?.[key] || key;
        }
        return translations[lang][key];
    };

    // Prevent harsh hydration mismatches by returning children directly inside a div if needed, 
    // but wait for mount to avoid flash of wrong language. 
    // For SEO and initial render we just default to English on the server.
    // Actually, standard Nextjs allows rendering immediately, it might just flash on client.
    // We'll render immediately. The mismatch is usually fine for text content.

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
