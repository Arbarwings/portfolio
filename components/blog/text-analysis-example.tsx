"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalysisResult {
  id: string;
  timestamp: string;
  analysis: {
    wordCount: number;
    charCount: number;
    mostFrequentWord: string;
    sentimentScore: number;
  };
}

function getSentimentText(score: number): string {
  if (score === 0) return "Neutral 😐";
  return score > 0 ? "Positive 🙂" : "Negative ☹️";
}

export const TextAnalysisExample = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating API call
    const analysisResult: AnalysisResult = {
      id: "xyz123",
      timestamp: new Date().toISOString(),
      analysis: {
        wordCount: text.split(/\s+/).filter((word) => word.length > 0).length,
        charCount: text.length,
        mostFrequentWord: "simple", // This would typically be calculated
        sentimentScore: 1, // This would typically be calculated
      },
    };
    setResult(analysisResult);
  };

  return (
    <div className="not-prose container mx-auto max-w-2xl p-1">
      <h1 className="pb-6 text-center text-2xl font-bold">Text Analysis App</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="min-h-[100px]"
        />
        <Button type="submit">Analyze Text</Button>
      </form>

      {result && (
        <Card className="mt-8 border border-primary p-6">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-semibold">Word Count:</dt>
                <dd>{result.analysis.wordCount}</dd>
              </div>
              <div>
                <dt className="font-semibold">Character Count:</dt>
                <dd>{result.analysis.charCount}</dd>
              </div>
              <div>
                <dt className="font-semibold">Most Frequent Word:</dt>
                <dd>{result.analysis.mostFrequentWord}</dd>
              </div>
              <div>
                <dt className="font-semibold">Sentiment Score:</dt>
                <dd>{getSentimentText(result.analysis.sentimentScore)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-semibold">Timestamp:</dt>
                <dd>{new Date(result.timestamp).toLocaleString()}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
