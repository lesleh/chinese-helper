# Chinese Translation Helper

A Next.js application that translates Chinese text to English using the OpenAI API. Features include:

- **Multiple translations**: Shows all possible English translations with context
- **Pinyin romanization**: Provides pinyin for pronunciation reference  
- **Pronunciation guide**: Simple English pronunciation guide for non-Chinese speakers
- **Context and usage**: Explains when each translation would be used (formal/informal, specific situations)

## Features

- Clean, responsive UI built with Tailwind CSS
- Real-time translation using OpenAI's GPT-4
- Comprehensive language analysis including:
  - Multiple possible English translations
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

1. Enter any Chinese text in the input field
2. Press Enter or click "Translate" 
3. View the comprehensive translation results including:
   - Original Chinese text
   - Pinyin romanization
   - English pronunciation guide
   - All possible English translations with context

## Example

**Input:** 你好
**Output:**
- **Pinyin:** nǐ hǎo  
- **Pronunciation:** "nee how"
- **Translations:**
  - **Hello** - Common greeting, used in most casual and formal situations
  - **Hi** - Informal greeting, used among friends or in informal settings

## Technology Stack

- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS 4
- **AI:** OpenAI API (GPT-4)
- **Package Manager:** pnpm

## API Endpoint

The app includes a `/api/translate` endpoint that accepts POST requests:

```typescript
{
  "text": "你好世界"
}
```

Response format:
```typescript
{
  "originalText": "你好世界",
  "pinyin": "nǐ hǎo shì jiè", 
  "pronunciation": "nee how shir jee-eh",
  "translations": [
    {
      "english": "Hello world",
      "context": "Common greeting phrase",
      "usage": "Used as a standard greeting, often in programming contexts"
    }
  ]
}
```
