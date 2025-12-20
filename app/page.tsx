'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

type ChatMessage = {
  role: 'user' | 'ai';
  text: string;
};

export default function EdiMentorPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userText = message.trim();
    setMessage('');
    setIsLoading(true);
    setChatHistory((prev) => [...prev, { role: 'user', text: userText }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error || 'Error');

      setChatHistory((prev) => [...prev, { role: 'ai', text: data.response }]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: 'ai', text: '⚠️ Error: No se pudo conectar con Vertex AI.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-[100dvh] bg-[#050505] text-zinc-100 font-sans overflow-hidden">
      <style jsx global>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
      `}</style>

      {/* Header */}
      <header className="p-4 border-b border-zinc-800/60 bg-black/30 backdrop-blur-xl shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              EdiMentor AI
            </h1>
            <p className="text-[10px] text-zinc-500 tracking-[0.2em] font-mono uppercase">
              Grounding Engine v6.0 | M.A.I.I.E.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-white transition"
            >
              ← Volver
            </Link>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full border border-zinc-800">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-zinc-400 font-mono">
                NODE_GCP: CONNECTED
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat */}
      <section className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-5xl mx-auto w-full flex flex-col">
        {chatHistory.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-3xl bg-blue-600/5 flex items-center justify-center border border-blue-500/10 mb-6">
              🧩
            </div>
            <h2 className="text-zinc-300 text-lg font-semibold">
              Sistema M.A.I.I.E. Operativo
            </h2>
            <p className="text-zinc-600 text-sm max-w-xs">
              Consulta sobre arquitectura, estrategia o análisis técnico.
            </p>
          </div>
        ) : (
          chatHistory.map((chat, i) => (
            <div
              key={i}
              className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-5 py-3 rounded-3xl text-sm shadow-xl ${
                  chat.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-zinc-900 border border-zinc-800 rounded-tl-none'
                }`}
              >
                {chat.role === 'ai' ? (
                  <ReactMarkdown>{chat.text}</ReactMarkdown>
                ) : (
                  chat.text
                )}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-3xl">
              <span className="text-xs text-zinc-500 font-mono">
                Analizando…
              </span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </section>

      {/* Input */}
      <footer className="p-4 bg-black/40 shrink-0">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex gap-2 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-2"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Consultar al Arquitecto…"
            className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="bg-blue-600 px-6 py-2 rounded-2xl text-sm font-bold disabled:opacity-40"
          >
            Enviar
          </button>
        </form>

        <p className="text-center text-[9px] text-zinc-700 mt-3 tracking-widest uppercase">
          Desarrollado | por Edisson A.G.C.
        </p>
      </footer>
    </main>
  );
}
