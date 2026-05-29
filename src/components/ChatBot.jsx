import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QUICK_REPLIES = [
  'How to apply for a loan?',
  'Check my eligibility',
  'Calculate EMI',
  'What documents do I need?',
  'Interest rates?',
];

function MyraAvatar({ size = 32 }) {
  // Using a reliable CDN character illustration
  return (
    <div style={{width: size, height: size, borderRadius: '50%', overflow: 'hidden', background: '#e0f2fe', flexShrink: 0}}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
        alt="Myra"
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
        onError={e => {
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0d9488,#065f46);color:white;font-weight:bold;font-size:' + Math.round(size*0.4) + 'px">M</div>';
        }}
      />
    </div>
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
