"use client";

import { CharacterTooltip } from "./CharacterTooltip";

interface BreakdownItem {
  chinese: string;
  pinyin: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  role: string;
}

interface InteractiveChineseTextProps {
  chineseText: string;
  breakdown: BreakdownItem[];
  className?: string;
}

export function InteractiveChineseText({
  chineseText,
  breakdown,
  className = "",
}: InteractiveChineseTextProps) {
  // Create a map of characters to their breakdown info
  const characterMap = new Map<string, BreakdownItem>();
  breakdown.forEach((item) => {
    // Handle both single characters and multi-character words
    characterMap.set(item.chinese, item);
  });

  // Split the text into individual characters for tooltip mapping
  const characters = Array.from(chineseText);

  // Render characters with tooltips, handling multi-character words
  const renderCharacters = () => {
    const elements: React.ReactElement[] = [];
    let i = 0;

    while (i < characters.length) {
      let matchedInfo: BreakdownItem | null = null;
      let matchLength = 1;

      // Try to find the longest matching word starting at this position
      for (let len = 4; len >= 1; len--) {
        const substr = characters.slice(i, i + len).join("");
        const info = characterMap.get(substr);
        if (info) {
          matchedInfo = info;
          matchLength = len;
          break;
        }
      }

      const text = characters.slice(i, i + matchLength).join("");

      if (matchedInfo) {
        elements.push(
          <CharacterTooltip key={i} info={matchedInfo}>
            {text}
          </CharacterTooltip>,
        );
      } else {
        // Fallback for characters without breakdown info
        elements.push(
          <span key={i} className="cursor-default">
            {text}
          </span>,
        );
      }

      i += matchLength;
    }

    return elements;
  };

  return (
    <div className={`font-medium leading-relaxed ${className}`}>
      {renderCharacters()}
    </div>
  );
}
