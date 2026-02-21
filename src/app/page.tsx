"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TypingTest from "@/components/TypingTest";
import Results from "@/components/Results";
import Leaderboard from "@/components/Leaderboard";
import About from "@/components/About";
import Footer from "@/components/Footer";

interface TestResults {
  wpm: number;
  accuracy: number;
  correctChars: number;
  totalChars: number;
  time: number;
}

export default function Home() {
  const [results, setResults] = useState<TestResults | null>(null);
  const [testKey, setTestKey] = useState(0);

  const handleFinish = (r: TestResults) => {
    setResults(r);
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
