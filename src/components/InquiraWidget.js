import React, { useEffect, useRef, useState } from 'react';

const CHAT_ENDPOINT = 'https://personalrag-production-eb99.up.railway.app/v1/chat';
// For dev only: const CHAT_ENDPOINT = 'http://localhost:8000/v1/chat';

const INITIAL_PROMPT = 'Hi, this is Inquira. What would you like to learn about Srihari? You can ask about projects, roles, skills, etc.';
const APPEAR_DELAY_MS = 2000;

function InquiraWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'assistant-initial', role: 'assistant', content: INITIAL_PROMPT }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), APPEAR_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isVisible]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: trimmed,
          // history: nextMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const assistantReply =
        data.answer ||
        data.response ||
        data.message ||
        data.result ||
        "I'm not able to fetch that right now, please try asking another way.";

      setMessages((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, role: 'assistant', content: assistantReply }
      ]);
    } catch (err) {
      console.error('Inquira request error', err);
      setError('Something went wrong reaching Inquira. Try again in a moment.');
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          content: "I'm having trouble connecting right now, but feel free to try again soon."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isMinimized ? (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-cream shadow-glow transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
        >
          Open Inquira
        </button>
      ) : (
        <div className="w-[min(26rem,90vw)] overflow-hidden rounded-3xl border border-brand/25 bg-brand-cream shadow-2xl">
          <header className="flex items-center justify-between bg-gradient-to-r from-brand-deep via-brand to-brand-deep px-4 py-3 text-brand-cream">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">Inquira</p>
              <p className="text-sm font-semibold">Ask about Srihari</p>
            </div>
            <div className="flex items-center gap-2">
              {isLoading && (
                <span
                  className="h-2 w-2 animate-pulse rounded-full bg-brand-cream"
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="rounded-full border border-brand-cream/40 p-1 text-brand-cream transition hover:bg-brand-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream/30"
                aria-label="Minimize Inquira"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
            </div>
          </header>

          <div className="flex max-h-[26rem] flex-col bg-brand-cream/90">
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm text-brand-ink">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === 'user'
                      ? 'ml-auto max-w-[85%] rounded-2xl bg-white px-4 py-2 text-brand-ink shadow'
                      : 'mr-auto max-w-[90%] rounded-2xl bg-brand-sand px-4 py-2 text-brand-deep shadow-inner'
                  }
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto flex items-center gap-2 rounded-2xl bg-brand-sand px-3 py-2 text-brand-deep">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand" style={{ animationDelay: '120ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand" style={{ animationDelay: '240ms' }} />
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-brand/15 bg-white/90 px-4 py-3">
              <label htmlFor="inquira-input" className="sr-only">
                Ask Inquira about Srihari
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="inquira-input"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about projects, roles, skills..."
                  className="flex-1 rounded-full border border-brand/20 bg-brand-cream px-4 py-2 text-sm text-brand-ink placeholder:text-brand-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-light"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-cream transition hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isLoading}
                >
                  Send
                </button>
              </div>
              {error && <p className="mt-2 text-xs text-brand">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InquiraWidget;
