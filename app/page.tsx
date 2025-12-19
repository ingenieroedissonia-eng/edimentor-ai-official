'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown'; // 👈 El motor visual que acabamos de instalar

type ChatMessage = {
  role: 'user' | 'ai';
  text: string;
};

export default function EdiMentorPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll inteligente
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
    // 🔥 CORRECCIÓN MÓVIL APLICADA: h-[100dvh] en lugar de h-screen
    <main className="flex flex-col h-[100dvh] bg-[#050505] text-zinc-100 font-sans selection:bg-blue-500/30">
      {/* Estilos Globales para Scrollbar */}
      <style jsx global>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>

      {/* Header */}
      <header className="p-5 border-b border-zinc-800/60 bg-black/20 backdrop-blur-xl z-10 sticky top-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              EdiMentor AI
            </h1>
            <p className="text-zinc-500 text-[10px] tracking-[0.2em] font-mono mt-0.5">
              GROUNDING ENGINE v6.0 | M.A.I.I.E. ARCHITECTURE
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 px-3 py-1 bg-zinc-900/50 rounded-full border border-zinc-800/50">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="text-[10px] text-zinc-400 font-mono">
              NODE_GCP: CONNECTED
            </span>
          </div>
        </div>
      </header>

      {/* Área de Chat */}
      <section className="flex-1 overflow-y-auto px-4 py-10 space-y-8 max-w-5xl mx-auto w-full flex flex-col scroll-smooth">
        {chatHistory.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
            <div className="w-20 h-20 rounded-3xl bg-blue-600/5 flex items-center justify-center border border-blue-500/10 mb-6 shadow-inner ring-1 ring-blue-500/20">
              <span className="text-3xl">🧩</span>
            </div>
            <h2 className="text-zinc-300 text-xl font-semibold mb-2">
              Sistema M.A.I.I.E. Operativo
            </h2>
            <p className="text-zinc-600 text-sm max-w-sm leading-relaxed">
              Consulta sobre el perfil del Arquitecto, visión estratégica o análisis técnico.
            </p>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.role === 'user' ? 'justify-end' : 'justify-start'
              } animate-in slide-in-from-bottom-3 duration-300`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-xl ${
                  chat.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-none'
                }`}
              >
                {/* RENDERIZADO MARKDOWN */}
                {chat.role === 'ai' ? (
                  <ReactMarkdown
                    components={{
                      strong: ({ ...props }) => <span className="font-bold text-blue-300" {...props} />,
                      ul: ({ ...props }) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
                      ol: ({ ...props }) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
                      li: ({ ...props }) => <li className="pl-1" {...props} />,
                      p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                      code: ({ ...props }) => (
                        <code className="bg-zinc-800 px-1 py-0.5 rounded text-xs font-mono text-blue-200 border border-zinc-700" {...props} />
                      )
                    }}
                  >
                    {chat.text}
                  </ReactMarkdown>
                ) : (
                  chat.text
                )}
              </div>
            </div>
          ))
        )}

        {/* Indicador de Carga */}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
             <div className="bg-zinc-900/50 border border-zinc-800/50 px-5 py-3 rounded-3xl rounded-tl-none flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
              </div>
              <span className="text-[11px] text-zinc-500 font-mono tracking-widest uppercase">
                EdiMentor Analizando...
              </span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </section>

      {/* Input */}
      <footer className="p-6 bg-gradient-to-t from-[#050505] to-transparent">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSendMessage}
            className="flex gap-3 p-2.5 bg-zinc-900/80 border border-zinc-800 rounded-3xl backdrop-blur-2xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/40 transition-all shadow-2xl"
          >
            <input
              autoFocus
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Pregúntale al Arquitecto..."
              className="flex-1 bg-transparent outline-none px-5 py-3 text-[15px] text-zinc-100 placeholder:text-zinc-600"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-8 py-3 rounded-2xl font-bold text-sm transition-all disabled:opacity-30 disabled:grayscale hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              {isLoading ? (
                <span className="animate-spin inline-block">↻</span>
              ) : (
                'Enviar'
              )}
            </button>
          </form>
          <p className="text-center text-[9px] text-zinc-700 mt-4 uppercase tracking-[0.3em] font-medium">
            Desarrollado | por Edisson A.G.C. Ingeniería IA Aplicada al Comercio
          </p>
        </div>
      </footer>
    </main>
  );
}