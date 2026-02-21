"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TypingTest from "@/components/TypingTest";
import Results from "@/components/Results";
import Leaderboard from "@/components/Leaderboard";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { saveTestResult } from "@/lib/db";

interface TestResults {
  wpm: number;
  accuracy: number;
  correctChars: number;
  totalChars: number;
  time: 15 | 30 | 60;
  difficulty: "easy" | "medium" | "hard";
}

export default function Home() {
  const [results, setResults] = useState<TestResults | null>(null);
  const [testKey, setTestKey] = useState(0);

  const handleFinish = async (r: TestResults) => {
    setResults(r);

    try {
      await saveTestResult({
        wpm: r.wpm,
        accuracy: r.accuracy,
        correct_chars: r.correctChars,
        total_chars: r.totalChars,
        difficulty: r.difficulty,
        duration: r.time,
      });
    } catch (err) {
      console.error("Failed to save result:", err);
    }
  };

  const handleRetry = () => {
    setResults(null);
    setTestKey((k) => k + 1);
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TypingTest key={testKey} onFinish={handleFinish} />
        <Leaderboard />
        <About />
      </main>
      <Footer />

      {results && (
        <Results
          wpm={results.wpm}
          accuracy={results.accuracy}
          correctChars={results.correctChars}
          totalChars={results.totalChars}
          time={results.time}
          onRetry={handleRetry}
        />
      )}
    </>
  );
}
