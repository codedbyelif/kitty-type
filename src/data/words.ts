export const wordSets = {
    en: {
        easy: [
            "the", "and", "for", "are", "but", "not", "you", "all", "any", "can",
            "had", "her", "was", "one", "our", "out", "day", "get", "has", "him",
            "his", "how", "man", "new", "now", "old", "see", "two", "way", "who",
            "did", "its", "let", "put", "say", "she", "too", "use", "cat", "bow",
            "pink", "cute", "love", "star", "moon", "rose", "kiss", "hug", "joy", "fun"
        ],
        medium: [
            "about", "again", "after", "every", "first", "found", "great", "house",
            "large", "never", "place", "plant", "point", "right", "small", "sound",
            "spell", "still", "study", "their", "there", "these", "think", "three",
            "water", "where", "which", "while", "world", "would", "write", "years",
            "kitty", "hello", "pretty", "ribbon", "flower", "sweet", "heart",
            "dream", "magic", "fairy", "glitter", "rainbow", "sparkle", "lovely"
        ],
        hard: [
            "beautiful", "carefully", "different", "excellent", "important",
            "knowledge", "language", "necessary", "obviously", "perfectly",
            "question", "remember", "schedule", "sentence", "singular",
            "strength", "together", "tomorrow", "training", "umbrella",
            "whatever", "wherever", "wonderful", "yesterday", "adventure",
            "challenge", "character", "community", "completed", "confident",
            "sparkling", "princess", "strawberry", "blossoming", "heartwarming"
        ]
    },
    tr: {
        easy: [
            "bir", "ve", "bu", "da", "de", "ile", "ki", "mi", "ne", "o",
            "ben", "sen", "biz", "siz", "ama", "ya", "hem", "kez", "her", "tüm",
            "iyi", "kötü", "büyük", "küçük", "yeni", "eski", "hızlı", "yavaş",
            "gün", "gece", "ev", "yol", "el", "göz", "su", "ışık", "renk",
            "pembe", "güzel", "tatlı", "sevgi", "kedi", "yıldız", "ay", "çiçek"
        ],
        medium: [
            "olmak", "gelmek", "gitmek", "yapmak", "almak", "vermek", "bilmek",
            "görmek", "demek", "bulmak", "açmak", "düşmek", "geçmek", "çıkmak",
            "zaman", "insan", "hayat", "dünya", "ülke", "şehir", "sokak", "sabah",
            "akşam", "hafta", "yıl", "güneş", "bulut", "haber", "kitap", "okul",
            "kelime", "cümle", "bilgi", "sevgi", "arkadaş", "mutlu", "üzgün",
            "renkli", "yumuşak", "sıcak", "soğuk", "parlak", "güçlü", "sessiz"
        ],
        hard: [
            "anlayamadım", "konuşamıyorum", "düşünemiyorum", "yürüyemiyorum",
            "söyleyemiyorum", "bilemiyorum", "göremiyorum", "yapabiliyorum",
            "gelebilirsiniz", "anlaşılabilir", "gerçekleştirmek", "başarabilmek",
            "karşılaştırmak", "değerlendirmek", "oluşturabilmek", "ayrıştırmak",
            "birleştirilebilir", "güvenilirlik", "sorumlu", "gereklilik",
            "sürdürülebilir", "farklılaştırma", "bütünleştirmek", "paylaşabilmek",
            "teknoloji", "yazılım", "bilgisayar", "klavye", "internet", "dijital"
        ]
    }
};

export type Language = "en" | "tr";
export type Difficulty = "easy" | "medium" | "hard";

export function generateWordList(
    difficulty: Difficulty,
    lang: Language = "en",
    count: number = 80
): string[] {
    const words = wordSets[lang][difficulty];
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
        result.push(words[Math.floor(Math.random() * words.length)]);
    }
    return result;
}
