import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QUICK_REPLIES = [
  'How to apply for a loan?',
  'Check my eligibility',
  'Calculate EMI',
  'What documents do I need?',
  'Interest rates?',
];

// Business person SVG avatar — suit, tie, briefcase (fully inside circle)
function MyraAvatar({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="avatarGrad" x1="0" y1="0" x2="80" y2="80">
          <stop offset="0%" stopColor="#0d9488"/>
          <stop offset="100%" stopColor="#065f46"/>
        </linearGradient>
        <clipPath id="circleClip">
          <circle cx="40" cy="40" r="40"/>
        </clipPath>
      </defs>

      {/* Background */}
      <circle cx="40" cy="40" r="40" fill="url(#avatarGrad)"/>

      <g clipPath="url(#circleClip)">
        {/* HEAD */}
        <circle cx="40" cy="22" r="10" fill="#f5c07a"/>
        {/* Hair */}
        <path d="M30 20 Q31 11 40 11 Q49 11 50 20 Q47 15 40 16 Q33 15 30 20Z" fill="#2d1b00"/>
        {/* Ears */}
        <ellipse cx="30" cy="22" rx="2" ry="2.5" fill="#f5c07a"/>
        <ellipse cx="50" cy="22" rx="2" ry="2.5" fill="#f5c07a"/>
        {/* Eyes */}
        <circle cx="36.5" cy="21" r="1.8" fill="#1a0a00"/>
        <circle cx="43.5" cy="21" r="1.8" fill="#1a0a00"/>
        <circle cx="37" cy="20.3" r="0.7" fill="white"/>
        <circle cx="44" cy="20.3" r="0.7" fill="white"/>
        {/* Eyebrows */}
        <path d="M34 18 Q36.5 16.5 39 18" stroke="#2d1b00" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M41 18 Q43.5 16.5 46 18" stroke="#2d1b00" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        {/* Nose */}
        <path d="M39 24 Q40 26 41 24" stroke="#c8884a" strokeWidth="1" fill="none"/>
        {/* Smile */}
        <path d="M36 27 Q40 30 44 27" stroke="#c8884a" strokeWidth="1.3" fill="none" strokeLinecap="round"/>

        {/* NECK */}
        <rect x="37" y="31" width="6" height="5" rx="2" fill="#f5c07a"/>

        {/* SUIT BODY */}
        <path d="M22 72 Q22 48 27 44 L36 40 L40 46 L44 40 L53 44 Q58 48 58 72Z" fill="#1e3a5f"/>
        {/* White shirt center */}
        <path d="M36 40 L40 46 L44 40 L43 72 L37 72Z" fill="white"/>
        {/* Tie */}
        <path d="M40 42 L38.5 47 L40 52 L41.5 47Z" fill="#dc2626"/>
        <path d="M38.5 47 L39.5 44 L40.5 44 L41.5 47Z" fill="#b91c1c"/>
        {/* Left lapel */}
        <path d="M36 40 L27 44 L32 46 L36 41Z" fill="#152d4a"/>
        {/* Right lapel */}
        <path d="M44 40 L53 44 L48 46 L44 41Z" fill="#152d4a"/>

        {/* LEFT ARM — down */}
        <path d="M22 50 Q17 54 16 62 L21 63 Q22 56 26 52Z" fill="#1e3a5f"/>
        <ellipse cx="18" cy="64" rx="3.5" ry="3" fill="#f5c07a"/>

        {/* RIGHT ARM — bent, holding briefcase */}
        <path d="M58 50 Q62 53 63 58 L58 60 Q57 55 53 52Z" fill="#1e3a5f"/>
        <ellipse cx="61" cy="61" rx="3.5" ry="3" fill="#f5c07a"/>

        {/* BRIEFCASE — fully inside */}
        <rect x="54" y="60" width="14" height="11" rx="2.5" fill="#92400e"/>
        <rect x="54" y="60" width="14" height="11" rx="2.5" stroke="#78350f" strokeWidth="1"/>
        {/* Handle */}
        <path d="M57.5 60 Q57.5 56 61 56 Q64.5 56 64.5 60" stroke="#78350f" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Latch */}
        <rect x="59.5" y="64" width="5" height="3" rx="1" fill="#fbbf24"/>
        {/* Middle line */}
        <line x1="54" y1="65.5" x2="68" y2="65.5" stroke="#78350f" strokeWidth="0.8"/>

        {/* LEGS */}
        <path d="M30 72 L28 82 L34 82 L36 72Z" fill="#152d4a"/>
        <path d="M50 72 L52 82 L46 82 L44 72Z" fill="#152d4a"/>
        {/* Shoes */}
        <ellipse cx="31" cy="82" rx="5" ry="2.5" fill="#111827"/>
        <ellipse cx="49" cy="82" rx="5" ry="2.5" fill="#111827"/>
      </g>
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
        <MyraAvatar size={32}/>
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
        <div className="flex gap-1 items-center h-4">
          {[0,1,2].map(i => (
            <span key={i} className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
              style={{animationDelay:`${i*0.18}s`}}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function BotAvatar() {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm flex-shrink-0">
      <MyraAvatar size={32}/>
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(1);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const now = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          role: 'assistant',
          text: "Namaste! 🙏 I'm **Myra**, your SalaryUncle AI assistant.\n\nI can help you with loans, eligibility, EMI calculations, and more. Kya main aapki madad kar sakti hoon? 😊",
          time: now(),
        }]);
        setUnread(0);
      }, 600);
    }
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 300); }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setInput('');
    setShowQuick(false);

    const userMsg = { role: 'user', text: text.trim(), time: now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // Build message history for API (only role + content)
      const history = [...messages, userMsg]
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role, content: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't process that. Please try again!";

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: reply,
        time: now(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "Oops! Network issue. Please check your connection and try again. 🙏",
        time: now(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Render text with **bold** support
  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith('**') ? <strong key={i}>{p.slice(2,-2)}</strong> : p
    );
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 left-6 z-50 flex flex-col rounded-3xl shadow-2xl overflow-hidden"
          style={{width:'370px', maxWidth:'calc(100vw - 24px)', height:'560px', background:'#f0fdf9'}}>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
            style={{background:'linear-gradient(135deg,#0d9488,#065f46)'}}>
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/40 flex-shrink-0 shadow-md">
              <MyraAvatar size={44}/>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-base">Hi, I am Myra</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"/>
                <span className="text-teal-100 text-xs">SalaryUncle AI · Always Online</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="w-8 h-8 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4">

            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex items-end gap-2 mb-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && <BotAvatar />}
                  <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                      msg.role === 'user'
                        ? 'rounded-br-sm text-white'
                        : 'rounded-bl-sm bg-white text-gray-800 border border-gray-100'
                    }`}
                      style={msg.role === 'user' ? {background:'linear-gradient(135deg,#0d9488,#065f46)'} : {}}>
                      {renderText(msg.text)}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 mx-1">{msg.time}</p>
                  </div>
                </div>

                {/* Quick replies inline — horizontal chips */}
                {i === 0 && msg.role === 'assistant' && showQuick && !loading && (
                  <div className="ml-10 mb-3">
                    <div className="flex flex-wrap gap-2">
                      {QUICK_REPLIES.map(q => (
                        <button key={q} onClick={() => sendMessage(q)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold border border-teal-400 text-teal-700 bg-white hover:bg-teal-50 active:scale-95 transition-all shadow-sm whitespace-nowrap">
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && <TypingIndicator />}

            {/* Apply CTA after few messages */}
            {messages.length >= 3 && !loading && (
              <div className="mt-4 ml-10">
                <Link to="/apply"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:shadow-lg transition-all active:scale-95"
                  style={{background:'linear-gradient(135deg,#0d9488,#065f46)'}}>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Apply for Loan Now →
                </Link>
              </div>
            )}

            <div ref={bottomRef}/>
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-200 focus-within:border-teal-400 transition-colors">
              <input ref={inputRef} value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                placeholder="Ask Myra anything..."
                disabled={loading}
                className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400 disabled:opacity-50"/>
              <button onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all active:scale-95"
                style={{background:'linear-gradient(135deg,#0d9488,#065f46)'}}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-1.5">Powered by Claude AI · SalaryUncle</p>
          </div>
        </div>
      )}

      {/* Floating Pill Button — MMT style, LEFT side */}
      <button onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3 shadow-2xl transition-all duration-300 hover:shadow-teal-200 hover:-translate-y-0.5 active:scale-95"
        style={{
          background: 'white',
          borderRadius: '50px',
          padding: open ? '10px' : '8px 20px 8px 8px',
          border: '1.5px solid #e2e8f0',
        }}>
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 shadow-sm"
          style={{borderColor:'#0d9488'}}>
          <MyraAvatar size={40}/>
        </div>
        {/* Text — hide when open */}
        {!open && (
          <span className="text-sm font-bold whitespace-nowrap" style={{color:'#7c3aed'}}>
            Hi, <span style={{color:'#7c3aed'}}>I am Myra</span>
          </span>
        )}
        {/* Close icon when open */}
        {open && (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        )}
        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Pulse ring */}
      {!open && (
        <span className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full opacity-20 animate-ping pointer-events-none"
          style={{background:'#0d9488'}}/>
      )}
    </>
  );
}
