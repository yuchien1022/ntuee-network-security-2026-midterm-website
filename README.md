# Personal Website (NTUEE Network Security Lab 05)

## AI Bonus Feature: AI Writing Assistant

This project now includes an **AI Writing Assistant** page for logged-in users.

### What it does
- Lets users input text and choose a rewrite mode:
  - Paraphrase
  - Summarize
  - Make it more formal
  - Make it more concise
  - Translate to English
- Calls a backend API (`POST /api/v1/ai/rewrite`)
- Uses OpenAI on the server side to generate the rewritten text
- Shows loading state, validation/errors, and copy-to-clipboard

### Environment variables
Set these in `backend/.env`:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_REWRITE_MODEL=gpt-4.1-mini
```

`OPENAI_REWRITE_MODEL` is optional.

### How to use
1. Log in.
2. Open **AI Assistant** from the navbar.
3. Paste text, choose mode, click **Generate**.
4. Copy result if needed.

### Run commands
From repository root:

```bash
npm run build
```

From backend:

```bash
cd backend
npm run dev
```
