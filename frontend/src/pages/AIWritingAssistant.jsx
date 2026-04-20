import { useState } from "react";
import FadeIn from "../components/FadeIn";
import services from "../services";

const MODES = [
  { value: "paraphrase", label: "Paraphrase" },
  { value: "summarize", label: "Summarize" },
  { value: "formal", label: "Make it more formal" },
  { value: "concise", label: "Make it more concise" },
  { value: "translate_en", label: "Translate to English" },
];

const MAX_TEXT_LENGTH = 3000;

export default function AIWritingAssistant() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("paraphrase");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) {
      setError("Please enter text before generating.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await services.ai.rewrite({ text, mode });
      setResult(response.result);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to generate rewritten text.");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(result);
    } catch {
      setError("Copy failed. Please copy manually.");
    }
  }

  return (
    <div className="page-wrapper">
      <section>
        <FadeIn>
          <h2>AI Writing Assistant</h2>
          <p className="ai-helper-text">Paste your text, choose a mode, and get a clean rewrite.</p>

          <form className="ai-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="ai-text">Your text</label>
              <textarea
                id="ai-text"
                className="msg-textarea"
                value={text}
                onChange={(event) => setText(event.target.value)}
                rows={7}
                maxLength={MAX_TEXT_LENGTH}
                placeholder="Type or paste text here..."
              />
              <div className="char-count">{text.length} / {MAX_TEXT_LENGTH}</div>
            </div>

            <div className="form-group">
              <label htmlFor="ai-mode">Rewrite mode</label>
              <select
                id="ai-mode"
                className="ai-select"
                value={mode}
                onChange={(event) => setMode(event.target.value)}
              >
                {MODES.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>

            {error ? <div className="form-message error">{error}</div> : null}

            <div className="form-actions">
              <button type="submit" className="btn btn-filled" disabled={loading || !text.trim()}>
                {loading ? "Generating…" : "Generate"}
              </button>
            </div>
          </form>

          <div className="ai-result-panel">
            <div className="ai-result-header">
              <h3>Result</h3>
              <button type="button" className="btn" onClick={copyResult} disabled={!result}>Copy</button>
            </div>
            <pre className="ai-result-content">{result || "Your rewritten text will appear here."}</pre>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
