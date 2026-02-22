import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

export async function POST(request: Request) {
    // 1. Dış İzinler (CORS) - Sadece kendi sitenden gelen istekleri kabul et
    const origin = request.headers.get("origin") || "";
    // Vercel üzerindeki production linkini ve localhost'u güvenli kabul et
    const allowedOrigins = [
        "https://kitty-finger.vercel.app", // kendi gerçek domainini buraya da ekleyebilirsin
        "http://localhost:3000"
    ];

    if (!allowedOrigins.includes(origin)) {
        return NextResponse.json({ error: "Forbidden: Invalid Origin" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { wpm, accuracy, correct_chars, total_chars, difficulty, duration } = body;

        // 2. Gizli Sunucu Tarafı Güvenlik Kontrolleri
        if (wpm >= 200) {
            return NextResponse.json({ error: "Score rejected: WPM too high" }, { status: 400 });
        }

        const expectedWpm = Math.round((correct_chars / 5) / (duration / 60));
        if (Math.abs(wpm - expectedWpm) > 2) {
            return NextResponse.json({ error: "Score rejected: Math validation failed" }, { status: 400 });
        }

        if (correct_chars === 0 && accuracy > 0) {
            return NextResponse.json({ error: "Score rejected: Invalid accuracy" }, { status: 400 });
        }

        if (accuracy > 100 || accuracy < 0) {
            return NextResponse.json({ error: "Score rejected: Invalid accuracy range" }, { status: 400 });
        }

        if (correct_chars > total_chars) {
            return NextResponse.json({ error: "Score rejected: Correct chars cannot exceed total" }, { status: 400 });
        }

        // 3. Supabase Bağlantısı (Sunucu Tarafı)
        const cookieStore = await cookies();
        const supabase = createServerClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            )
                        } catch {
                            // The `setAll` method was called from a Server Component.
                            // This can be ignored if you have middleware refreshing
                            // user sessions.
                        }
                    },
                },
            }
        );

        // Kimlik doğrulama kontrolü
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Veritabanına kaydet
        const { error } = await supabase.from("test_results").insert({
            wpm,
            accuracy,
            correct_chars,
            total_chars,
            difficulty,
            duration,
            user_id: user.id
        });

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error("Save score API error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
