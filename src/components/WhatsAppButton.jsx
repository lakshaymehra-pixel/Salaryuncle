import { useState } from 'react';
import { FiX, FiMessageCircle } from 'react-icons/fi';

const quickMessages = [
  'I want to apply for a salary advance loan',
  'What is the maximum loan amount I can get?',
  'How long does approval take?',
  'I need an emergency loan urgently',
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const sendMessage = (msg) => {
    window.open(`https://wa.me/918800123456?text=${encodeURIComponent(msg)}`, '_blank');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat popup */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="bg-green-600 px-4 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">👨‍💼</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">SalaryUncle Support</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 bg-green-300 rounded-full inline-block animate-pulse" />
                <span className="text-green-100 text-xs">Online — Typically replies in 5 min</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <FiX size={18} />
            </button>
          </div>

          {/* Chat bubble */}
          <div className="bg-gray-50 p-4">
            <div className="bg-white rounded-2xl rounded-tl-none shadow-sm p-3 max-w-xs">
              <p className="text-gray-800 text-sm leading-relaxed">
                👋 Hi! I'm here to help you get your loan approved fast. What can I help you with?
              </p>
              <p className="text-gray-400 text-xs mt-1 text-right">Just now</p>
            </div>
          </div>

          {/* Quick replies */}
          <div className="p-4 space-y-2 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-medium mb-3">Quick Questions:</p>
            {quickMessages.map((msg) => (
              <button key={msg} onClick={() => sendMessage(msg)}
                className="w-full text-left text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5 hover:bg-green-100 transition-colors leading-snug">
                {msg}
              </button>
            ))}
            <button onClick={() => sendMessage('Hi, I need help with a loan')}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-green-700 transition-colors mt-2">
              <span>💬</span> Open WhatsApp Chat
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          open ? 'bg-gray-700 rotate-180' : 'bg-green-600 hover:bg-green-700 hover:scale-110'
        }`}>
        {open
          ? <FiX size={22} className="text-white" />
          : <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
        }
      </button>

      {/* Pulse ring when closed */}
      {!open && (
        <span className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-green-500 opacity-30 animate-ping pointer-events-none" />
      )}
    </div>
  );
}
