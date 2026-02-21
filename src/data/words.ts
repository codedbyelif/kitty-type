export const wordSets = {
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
        "kitty", "hello", "pretty", "ribbon", "flower", "butterfly", "sparkle",
        "sweet", "heart", "dream", "magic", "fairy", "glitter", "rainbow"
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
};

export function generateWordList(difficulty: keyof typeof wordSets, count: number = 60): string[] {
    const words = wordSets[difficulty];
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
        result.push(words[Math.floor(Math.random() * words.length)]);
    }
    return result;
}
