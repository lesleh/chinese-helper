"use client";

import { useState } from "react";

interface BreakdownItem {
  chinese: string;
  pinyin: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  role: string;
}

interface Translation {
  chinese: string;
  pinyin: string;
  pronunciation: string;
  context: string;
  usage: string;
  breakdown: BreakdownItem[];
}

interface TranslationResult {
  translations: Translation[];
  originalText: string;
}

export function TranslationApp() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Please enter some English text to translate");
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
            English to Chinese Translator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter English text to get Chinese translations with pinyin and
            pronunciation guide
          </p>

          <div className="mb-6">
            <label
              htmlFor="englishInput"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              English Text
            </label>
            <textarea
              id="englishInput"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter English text here... (Press Enter to translate)"
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
              Translation Results
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

              {/* Translations - Each with its own breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Chinese Translations
                </h3>
                <div className="space-y-6">
                  {result.translations.map((translation, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500"
                    >
                      {/* Chinese Text */}
                      <div className="mb-4">
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">
                          {translation.chinese}
                        </h4>
                      </div>

                      {/* Pinyin and Pronunciation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Pinyin
                          </p>
                          <p className="text-lg text-blue-600 font-medium">
                            {translation.pinyin}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Pronunciation
                          </p>
                          <p className="text-lg text-gray-700 italic">
                            &ldquo;{translation.pronunciation}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Character/Word Breakdown */}
                      <div className="mb-4 border-t pt-4">
                        <h5 className="text-sm font-semibold text-gray-800 mb-3">
                          Character Breakdown
                        </h5>
                        <div className="space-y-2">
                          {translation.breakdown.map((item, breakdownIndex) => (
                            <div
                              key={breakdownIndex}
                              className="bg-blue-50 rounded-lg p-3 border-l-2 border-blue-400"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                                <div>
                                  <p className="font-medium text-gray-700 mb-1">
                                    Character
                                  </p>
                                  <p className="text-lg font-bold text-gray-900">
                                    {item.chinese}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-700 mb-1">
                                    Pinyin
                                  </p>
                                  <p className="text-blue-600 font-medium">
                                    {item.pinyin}
                                  </p>
                                  <p className="text-xs text-gray-500 italic">
                                    &ldquo;{item.pronunciation}&rdquo;
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-700 mb-1">
                                    Meaning
                                  </p>
                                  <p className="text-gray-900">
                                    {item.meaning}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-700 mb-1">
                                    Grammar
                                  </p>
                                  <p className="text-gray-600 capitalize">
                                    {item.partOfSpeech}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {item.role}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Context and Usage */}
                      <div className="space-y-2 border-t pt-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Context:{" "}
                          </span>
                          <span className="text-sm text-gray-600">
                            {translation.context}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Usage:{" "}
                          </span>
                          <span className="text-sm text-gray-600">
                            {translation.usage}
                          </span>
                        </div>
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
