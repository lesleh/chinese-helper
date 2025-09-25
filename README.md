# English to Chinese Translator

A Next.js application that translates English text to Chinese using the OpenAI API. Features include:

- **Multiple translations**: Shows all possible Chinese translations with context
- **Pinyin romanization**: Provides pinyin for pronunciation reference  
- **Pronunciation guide**: Simple English pronunciation guide for non-Chinese speakers
- **Context and usage**: Explains when each translation would be used (formal/informal, specific situations)

## Features

- Clean, responsive UI built with Tailwind CSS
- Real-time translation using OpenAI's GPT-4
- Comprehensive language analysis including:
  - Multiple possible Chinese translations
  - Pinyin romanization
  - English pronunciation guide
  - Context and usage information for each translation
- Error handling and loading states

## Setup

1. **Clone and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up OpenAI API key:**
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Add your OpenAI API key to `.env.local`:
     ```
     OPENAI_API_KEY=your_actual_api_key_here
     ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Enter any English text in the input field
2. Press Enter or click "Translate" 
3. View the comprehensive translation results including:
   - Original English text
   - Chinese translations (simplified characters)
   - Pinyin romanization
   - English pronunciation guide
   - Context and usage information for each translation

## Example

**Input:** Hello
**Output:**
- **Chinese Translations:**
  - **你好** - Common greeting, used in most casual and formal situations
  - **您好** - Polite/formal greeting, used when addressing elders or in professional settings
- **Pinyin:** nǐ hǎo / nín hǎo
- **Pronunciation:** "nee how / neen how"

## Technology Stack

- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS 4
- **AI:** OpenAI API (GPT-4)
- **Package Manager:** pnpm

## API Endpoint

The app includes a `/api/translate` endpoint that accepts POST requests:

```typescript
{
  "text": "Hello world"
}
```

Response format:
```typescript
{
  "originalText": "Hello world",
  "pinyin": "nǐ hǎo shì jiè", 
  "pronunciation": "nee how shir jee-eh",
  "translations": [
    {
      "chinese": "你好世界",
      "context": "Common greeting phrase",
      "usage": "Used as a standard greeting, often in programming contexts"
    }
  ]
}
```
