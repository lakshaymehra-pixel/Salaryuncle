import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QUICK_REPLIES = [
  'How to apply for a loan?',
  'Check my eligibility',
  'Calculate EMI',
  'What documents do I need?',
  'Interest rates?',
];

// Business person SVG avatar — suit, tie, briefcase
function MyraAvatar({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="32" cy="32" r="32" fill="url(#avatarGrad)"/>
      <defs>
        <linearGradient id="avatarGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#0d9488"/>
          <stop offset="100%" stopColor="#065f46"/>
        </linearGradient>
      </defs>

      {/* Head */}
      <circle cx="32" cy="18" r="9" fill="#FBBF7C"/>
      {/* Hair */}
      <path d="M23 16 Q24 9 32 9 Q40 9 41 16 Q38 12 32 13 Q26 12 23 16Z" fill="#1a0a00"/>

      {/* Neck */}
      <rect x="29" y="26" width="6" height="5" rx="2" fill="#FBBF7C"/>

      {/* Suit body */}
      <path d="M18 50 Q18 38 22 36 L29 33 L32 38 L35 33 L42 36 Q46 38 46 50Z" fill="#1e3a5f"/>
      {/* White shirt */}
      <path d="M29 33 L32 38 L35 33 L34 50 L30 50Z" fill="white"/>
      {/* Tie */}
      <path d="M32 34 L30.5 38 L32 42 L33.5 38Z" fill="#dc2626"/>
      <path d="M30.5 38 L31.5 36 L32.5 36 L33.5 38Z" fill="#b91c1c"/>
      {/* Suit lapels */}
      <path d="M29 33 L22 36 L26 38 L29 34Z" fill="#152d4a"/>
      <path d="M35 33 L42 36 L38 38 L35 34Z" fill="#152d4a"/>

      {/* Left arm — straight down */}
      <path d="M18 37 Q14 40 13 46 L17 47 Q18 42 21 40Z" fill="#1e3a5f"/>
      {/* Left hand */}
      <ellipse cx="15" cy="48" rx="3" ry="2.5" fill="#FBBF7C"/>

      {/* Right arm — holding briefcase */}
      <path d="M46 37 Q50 40 51 46 L47 47 Q46 42 43 40Z" fill="#1e3a5f"/>
      {/* Right hand */}
      <ellipse cx="49" cy="48" rx="3" ry="2.5" fill="#FBBF7C"/>

      {/* Briefcase */}
      <rect x="44" y="47" width="12" height="9" rx="2" fill="#92400e"/>
      <rect x="44" y="47" width="12" height="9" rx="2" stroke="#78350f" strokeWidth="0.8"/>
      {/* Briefcase handle */}
      <path d="M47 47 Q47 44 50 44 Q53 44 53 47" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Briefcase latch */}
      <rect x="49" y="50" width="4" height="2.5" rx="1" fill="#fbbf24"/>
      {/* Briefcase line */}
      <line x1="44" y1="51.5" x2="56" y2="51.5" stroke="#78350f" strokeWidth="0.8"/>

      {/* Legs */}
      <path d="M24 50 Q23 56 23 62 L27 62 Q28 57 29 52Z" fill="#1e3a5f"/>
      <path d="M40 50 Q41 56 41 62 L37 62 Q36 57 35 52Z" fill="#1e3a5f"/>
      {/* Shoes */}
      <ellipse cx="25" cy="62" rx="4" ry="2" fill="#111827"/>
      <ellipse cx="39" cy="62" rx="4" ry="2" fill="#111827"/>

      {/* Face details */}
      <circle cx="29" cy="18" r="1.5" fill="#1a0a00"/>
      <circle cx="35" cy="18" r="1.5" fill="#1a0a00"/>
      <circle cx="29.5" cy="17.3" r="0.6" fill="white"/>
      <circle cx="35.5" cy="17.3" r="0.6" fill="white"/>
      <path d="M28 22 Q32 25 36 22" stroke="#c2855a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M26.5 15 Q29 13 31.5 15" stroke="#1a0a00" strokeWidth="1.2" fill="none"/>
      <path d="M32.5 15 Q35 13 37.5 15" stroke="#1a0a00" strokeWidth="1.2" fill="none"/>
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
