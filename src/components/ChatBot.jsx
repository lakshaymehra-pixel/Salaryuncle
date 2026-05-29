import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BOT_NAME = 'SalaryUncle AI';
const BOT_AVATAR = '💰';

const FLOWS = {
  welcome: {
    msg: "👋 Hi! I'm your SalaryUncle assistant. I can help you with instant salary loans. What would you like to know?",
    chips: ['Apply for Loan', 'Check Eligibility', 'EMI Calculator', 'Loan Status', 'Talk to Agent'],
  },
  apply: {
    msg: "Great! Applying is super easy 🚀\n\n✅ 100% Online\n✅ No Collateral\n✅ Approval in 24 hrs\n\nReady to apply?",
    chips: ['Apply Now', 'Know More', 'Back to Menu'],
    action: { label: 'Apply Now', link: '/apply' },
  },
  eligibility: {
    msg: "Let me check your eligibility! You need:\n\n👤 Age: 21–58 years\n💰 Salary: ₹20,000+/month\n🏢 Employment: Salaried (Private/Govt)\n📄 Documents: PAN + Aadhaar\n\nDo you meet these criteria?",
    chips: ['Yes, I\'m Eligible', 'Not Sure', 'Back to Menu'],
  },
  eligible_yes: {
    msg: "🎉 Awesome! You're eligible for a loan up to ₹5 Lakhs!\n\nLet's get started with your application right away.",
    chips: ['Apply Now', 'Calculate EMI First', 'Back to Menu'],
    action: { label: 'Apply Now', link: '/apply' },
  },
  eligible_maybe: {
    msg: "No worries! Our team can help you understand your options.\n\n📞 Call: +91 87960 41166\n📧 Email: support@salaryuncle.com\n\nOr apply and we'll assess your profile.",
    chips: ['Apply Anyway', 'Call Support', 'Back to Menu'],
  },
  emi: {
    msg: "Sure! Here's a quick estimate 📊\n\n💵 Loan: ₹2,00,000\n📅 Tenure: 24 months\n📈 Rate: 10.5% p.a.\n💳 EMI: ~₹9,300/month\n\nWant to calculate for your amount?",
    chips: ['Open EMI Calculator', 'Apply for Loan', 'Back to Menu'],
    action: { label: 'Open EMI Calculator', link: '/emi-calculator' },
  },
  status: {
    msg: "To check your loan status, please log in to your dashboard. 📋\n\nYou can track:\n• Application progress\n• Document status\n• Disbursement updates",
    chips: ['Go to Dashboard', 'Contact Support', 'Back to Menu'],
    action: { label: 'Go to Dashboard', link: '/dashboard' },
  },
  agent: {
    msg: "Connecting you to our support team! 🙋‍♂️\n\n📞 +91 87960 41166\n⏰ Mon–Sat: 9 AM – 6 PM\n\nOr chat with us on WhatsApp for instant help.",
    chips: ['WhatsApp Chat', 'Back to Menu'],
    action: { label: 'WhatsApp', link: 'https://wa.me/918796041166' },
  },
  apply_now: {
    msg: "Redirecting you to the application page! 🚀\n\nIt takes less than 5 minutes to apply.",
    chips: ['Back to Menu'],
    action: { label: 'Start Application', link: '/apply' },
  },
};

const CHIP_MAP = {
  'Apply for Loan':       'apply',
  'Check Eligibility':    'eligibility',
  'EMI Calculator':       'emi',
  'Loan Status':          'status',
  'Talk to Agent':        'agent',
  'Apply Now':            'apply_now',
  'Apply Anyway':         'apply_now',
  'Start Application':    'apply_now',
  "Yes, I'm Eligible":    'eligible_yes',
  'Not Sure':             'eligible_maybe',
  'Know More':            'apply',
  'Calculate EMI First':  'emi',
  'Open EMI Calculator':  'emi',
  'Go to Dashboard':      'status',
  'Contact Support':      'agent',
  'Call Support':         'agent',
  'WhatsApp Chat':        'agent',
  'Back to Menu':         'welcome',
};

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-sm flex-shrink-0">
        {BOT_AVATAR}
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
        <div className="flex gap-1 items-center h-4">
          {[0,1,2].map(i => (
            <span key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{animationDelay:`${i*0.15}s`}}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chips, setChips] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Init welcome message
  useEffect(() => {
    if (open && messages.length === 0) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([{ from: 'bot', text: FLOWS.welcome.msg, time: now() }]);
        setChips(FLOWS.welcome.chips);
        setUnread(0);
      }, 900);
    }
    if (open) { setUnread(0); inputRef.current?.focus(); }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, chips]);

  const now = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const botReply = (flowKey) => {
    const flow = FLOWS[flowKey] || FLOWS.welcome;
    setChips([]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: flow.msg, time: now(), action: flow.action }]);
      setChips(flow.chips || []);
    }, 1000 + Math.random() * 500);
  };

  const handleChip = (chip) => {
    setMessages(prev => [...prev, { from: 'user', text: chip, time: now() }]);
    setChips([]);
    const flowKey = CHIP_MAP[chip] || 'welcome';
    botReply(flowKey);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text, time: now() }]);
    setChips([]);
    // Simple keyword matching
    const lower = text.toLowerCase();
    let flowKey = 'welcome';
    if (lower.includes('apply') || lower.includes('loan'))       flowKey = 'apply';
    else if (lower.includes('eligib') || lower.includes('eligible')) flowKey = 'eligibility';
    else if (lower.includes('emi') || lower.includes('calculat'))  flowKey = 'emi';
    else if (lower.includes('status') || lower.includes('dashboard')) flowKey = 'status';
    else if (lower.includes('agent') || lower.includes('human') || lower.includes('support')) flowKey = 'agent';
    botReply(flowKey);
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-3xl shadow-2xl overflow-hidden"
          style={{height:'520px', background:'#f5f7fa'}}>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
            style={{background:'linear-gradient(135deg,#0d9488,#0f766e)'}}>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              {BOT_AVATAR}
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">{BOT_NAME}</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"/>
                <span className="text-teal-100 text-xs">Online · Typically replies instantly</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.from === 'bot' ? (
                  <div className="flex items-end gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-xs flex-shrink-0">
                      {BOT_AVATAR}
                    </div>
                    <div className="max-w-[78%]">
                      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100 text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </div>
                      {msg.action && (
                        msg.action.link?.startsWith('http') ? (
                          <a href={msg.action.link} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2 px-4 py-2 rounded-full text-xs font-semibold text-white shadow-sm"
                            style={{background:'linear-gradient(135deg,#0d9488,#0f766e)'}}>
                            {msg.action.label} →
                          </a>
                        ) : (
                          <Link to={msg.action.link}
                            className="inline-flex items-center gap-1.5 mt-2 px-4 py-2 rounded-full text-xs font-semibold text-white shadow-sm"
                            style={{background:'linear-gradient(135deg,#0d9488,#0f766e)'}}>
                            {msg.action.label} →
                          </Link>
                        )
                      )}
                      <p className="text-xs text-gray-400 mt-1 ml-1">{msg.time}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end mb-2">
                    <div className="max-w-[78%]">
                      <div className="px-4 py-3 rounded-2xl rounded-br-sm text-sm text-white leading-relaxed"
                        style={{background:'linear-gradient(135deg,#0d9488,#0f766e)'}}>
                        {msg.text}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 text-right mr-1">{msg.time}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {typing && <TypingIndicator />}

            {/* Quick reply chips */}
            {!typing && chips.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 mb-1">
                {chips.map(chip => (
                  <button key={chip} onClick={() => handleChip(chip)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border-2 border-teal-500 text-teal-700 bg-white hover:bg-teal-50 transition-all active:scale-95">
                    {chip}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-200 focus-within:border-teal-400 transition-colors">
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"/>
              <button onClick={handleSend} disabled={!input.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all"
                style={{background:'linear-gradient(135deg,#0d9488,#0f766e)'}}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-1.5">Powered by SalaryUncle AI</p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-24 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{background: open ? '#374151' : 'linear-gradient(135deg,#0d9488,#0f766e)'}}>
        {open ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Pulse ring */}
      {!open && (
        <span className="fixed bottom-6 right-24 z-40 w-14 h-14 rounded-full opacity-30 animate-ping pointer-events-none"
          style={{background:'#0d9488'}}/>
      )}
    </>
  );
}
