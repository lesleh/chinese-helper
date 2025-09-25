import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface TranslationResult {
  translations: Array<{
    chinese: string;
    context: string;
    usage: string;
  }>;
  pinyin: string;
  pronunciation: string;
  originalText: string;
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required and must be a string" },
        { status: 400 },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 },
      );
    }

    const prompt = `You are a Chinese language expert. Translate the following English text to Chinese and provide comprehensive information.

English text: "${text}"

Please respond with a JSON object that includes:
1. "translations" - An array of possible Chinese translations with context and usage information
2. "pinyin" - The pinyin romanization of the Chinese translations (combine all if multiple)
3. "pronunciation" - A simple English pronunciation guide (how an English speaker might pronounce the pinyin)
4. "originalText" - The original English text

For each translation, include:
- "chinese": The Chinese translation (simplified characters)
- "context": The grammatical or contextual information
- "usage": When this translation would be used (formal/informal, specific situations, etc.)

If there are multiple possible meanings or translations, include all of them.

Format your response as valid JSON only, no additional text or formatting.

Example response format:
{
  "originalText": "Hello",
  "pinyin": "nǐ hǎo",
  "pronunciation": "nee how",
  "translations": [
    {
      "chinese": "你好",
      "context": "Common greeting",
      "usage": "Used in most casual and formal situations when meeting someone"
    },
    {
      "chinese": "您好",
      "context": "Polite/formal greeting",
      "usage": "More formal, used when addressing elders, strangers, or in professional settings"
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful Chinese language expert. Always respond with valid JSON only. When translating to Chinese, use simplified characters.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error("No response from OpenAI");
    }

    try {
      const result: TranslationResult = JSON.parse(responseText);
      return NextResponse.json(result);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      return NextResponse.json(
        { error: "Failed to parse translation response" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Failed to translate text" },
      { status: 500 },
    );
  }
}
