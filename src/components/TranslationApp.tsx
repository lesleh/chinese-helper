"use client";

import { useState } from "react";

interface Translation {
  english: string;
  context: string;
  usage: string;
}

interface TranslationResult {
  translations: Translation[];
  pinyin: string;
  pronunciation: string;
  originalText: string;
}

export function TranslationApp() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Please enter some Chinese text to translate");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Translation failed");
      }

      const translationResult: TranslationResult = await response.json();
      setResult(translationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Chinese Translation Helper
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter Chinese text to get English translations with pinyin and
            pronunciation guide
          </p>

          <div className="mb-6">
            <label
              htmlFor="chineseInput"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Chinese Text
            </label>
            <textarea
              id="chineseInput"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter Chinese text here... (Press Enter to translate)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
              rows={3}
            />
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading || !inputText.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition duration-200 text-lg"
          >
            {loading ? "Translating..." : "Translate"}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">Error</p>
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Translation Result
            </h2>

            <div className="space-y-6">
              {/* Original Text */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Original Text
                </h3>
                <p className="text-2xl text-gray-900 font-medium">
                  {result.originalText}
                </p>
              </div>

              {/* Pinyin */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Pinyin
                </h3>
                <p className="text-xl text-blue-600 font-medium">
                  {result.pinyin}
                </p>
              </div>

              {/* Pronunciation */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Pronunciation Guide
                </h3>
                <p className="text-lg text-gray-700 italic">
                  &ldquo;{result.pronunciation}&rdquo;
                </p>
              </div>

              {/* Translations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  English Translations
                </h3>
                <div className="space-y-4">
                  {result.translations.map((translation, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500"
                    >
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {translation.english}
                      </h4>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Context:</span>{" "}
                          {translation.context}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Usage:</span>{" "}
                          {translation.usage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
