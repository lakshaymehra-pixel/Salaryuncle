import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ── Right side graphic ────────────────────────────────────
function RightGraphic() {
  const nodes = [
    { cx: 130, cy: 100, label: 'SHOPPING',    emoji: '🛍️',  lx: 255, ly: 248 },
    { cx: 440, cy: 85,  label: 'TRAVEL',       emoji: '✈️',  lx: 315, ly: 240 },
    { cx: 62,  cy: 260, label: 'MEDICAL',      emoji: '🏥',  lx: 238, ly: 278 },
    { cx: 512, cy: 255, label: 'CLUB & PARTY', emoji: '🎉',  lx: 342, ly: 272 },
    { cx: 98,  cy: 420, label: 'GIFTS',        emoji: '🎁',  lx: 248, ly: 358 },
    { cx: 476, cy: 420, label: 'OBLIGATIONS',  emoji: '📋',  lx: 332, ly: 358 },
  ];

  return (
    <div className="relative w-full flex items-center justify-center select-none" style={{minHeight:'520px'}}>
      <svg viewBox="0 0 580 530" className="w-full max-w-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glowBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dd3d3" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#7dd3d3" stopOpacity="0"/>
          </radialGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0f4c81" floodOpacity="0.12"/>
          </filter>
        </defs>

        {/* Background glow */}
        <ellipse cx="290" cy="300" rx="160" ry="160" fill="url(#glowBg)"/>

        {/* Connecting dashed lines */}
        {nodes.map((n, i) => (
          <line key={i} x1={n.lx} y1={n.ly} x2={n.cx} y2={n.cy}
            stroke="#2563eb" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.35"/>
        ))}

        {/* ── PERSON ── */}
        {/* Floor shadow */}
        <ellipse cx="290" cy="468" rx="72" ry="10" fill="#93c5c5" opacity="0.45"/>

        {/* Legs */}
        <path d="M268 342 Q262 390 255 430 L278 432 Q285 390 290 362Z" fill="#1e3a5f"/>
        <path d="M312 342 Q318 390 325 430 L302 432 Q295 390 290 362Z" fill="#1e3a5f"/>
        {/* Shoes */}
        <path d="M248 428 Q238 430 235 436 Q240 442 260 440 Q272 437 275 432Z" fill="#1a1a2e"/>
        <path d="M332 428 Q342 430 345 436 Q340 442 320 440 Q308 437 305 432Z" fill="#1a1a2e"/>

        {/* Torso — teal top */}
        <path d="M256 268 Q248 308 246 342 L334 342 Q332 308 324 268 Q307 254 290 252 Q273 254 256 268Z" fill="#0d9488"/>
        {/* V-neck */}
        <path d="M276 270 L290 258 L304 270 L300 295 L280 295Z" fill="#0f766e"/>
        {/* White collar detail */}
        <path d="M276 270 Q283 263 290 261 Q297 263 304 270" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6"/>

        {/* Left arm */}
        <path d="M256 272 Q236 292 226 318 L240 320 Q246 300 258 280Z" fill="#d4956a"/>
        <ellipse cx="226" cy="322" rx="11" ry="10" fill="#d4956a"/>

        {/* Right arm — raised toward laptop */}
        <path d="M324 270 Q344 256 358 240 L348 234 Q334 248 322 264Z" fill="#d4956a"/>
        <ellipse cx="360" cy="234" rx="11" ry="10" fill="#d4956a"/>

        {/* Neck */}
        <rect x="283" y="242" width="14" height="16" rx="6" fill="#d4956a"/>

        {/* Head */}
        <circle cx="290" cy="220" r="34" fill="#d4956a"/>

        {/* Hair top */}
        <path d="M258 216 Q260 184 290 178 Q320 184 322 216 Q308 196 290 198 Q272 196 258 216Z" fill="#1a0a00"/>
        <ellipse cx="290" cy="178" rx="18" ry="12" fill="#1a0a00"/>
        {/* Hair bun */}
        <circle cx="304" cy="172" r="10" fill="#2d1500"/>
        <circle cx="304" cy="172" r="6" fill="#1a0a00"/>
        {/* Side strand */}
        <path d="M322 212 Q332 224 328 240 Q320 232 316 220Z" fill="#1a0a00"/>

        {/* Eyes */}
        <ellipse cx="279" cy="218" rx="4" ry="4.5" fill="white"/>
        <ellipse cx="301" cy="218" rx="4" ry="4.5" fill="white"/>
        <circle cx="280" cy="219" r="2.8" fill="#1a0a00"/>
        <circle cx="302" cy="219" r="2.8" fill="#1a0a00"/>
        <circle cx="281" cy="217.5" r="1" fill="white"/>
        <circle cx="303" cy="217.5" r="1" fill="white"/>
        {/* Eyebrows */}
        <path d="M273 210 Q279 207 285 210" stroke="#1a0a00" strokeWidth="2" strokeLinecap="round"/>
        <path d="M295 210 Q301 207 307 210" stroke="#1a0a00" strokeWidth="2" strokeLinecap="round"/>
        {/* Nose */}
        <path d="M288 226 Q290 231 292 226" stroke="#b8714a" strokeWidth="1.3" strokeLinecap="round"/>
        {/* Smile */}
        <path d="M281 236 Q290 244 299 236" stroke="#b8714a" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Blush */}
        <ellipse cx="271" cy="230" rx="7" ry="4.5" fill="#f87171" opacity="0.28"/>
        <ellipse cx="309" cy="230" rx="7" ry="4.5" fill="#f87171" opacity="0.28"/>

        {/* ── LAPTOP on lap ── */}
        <rect x="220" y="330" width="140" height="14" rx="6" fill="#94a3b8"/>
        <rect x="228" y="268" width="124" height="68" rx="6" fill="#cbd5e1"/>
        <rect x="234" y="274" width="112" height="58" rx="4" fill="#0f172a"/>
        <rect x="240" y="280" width="55" height="5" rx="2.5" fill="#38bdf8" opacity="0.9"/>
        <rect x="240" y="289" width="40" height="4" rx="2" fill="#7dd3fc" opacity="0.7"/>
        <rect x="240" y="297" width="68" height="4" rx="2" fill="#38bdf8" opacity="0.5"/>
        <rect x="240" y="305" width="32" height="4" rx="2" fill="#7dd3fc" opacity="0.4"/>
        {/* Green chart bar on screen */}
        <rect x="302" y="298" width="10" height="14" rx="2" fill="#4ade80" opacity="0.8"/>
        <rect x="315" y="290" width="10" height="22" rx="2" fill="#22c55e" opacity="0.8"/>
        <rect x="328" y="283" width="10" height="29" rx="2" fill="#16a34a" opacity="0.8"/>

        {/* ── CATEGORY NODES ── */}
        {nodes.map((n, i) => (
          <g key={i} filter="url(#shadow)">
            {/* White card circle */}
            <circle cx={n.cx} cy={n.cy} r="42" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
            <circle cx={n.cx} cy={n.cy} r="34" fill="#f0fdf9" stroke="#0d9488" strokeWidth="1.5" opacity="0.6"/>
            {/* Emoji */}
            <text x={n.cx} y={n.cy + 7} textAnchor="middle" fontSize="22">{n.emoji}</text>
            {/* Label pill */}
            <rect x={n.cx - 44} y={n.cy + 48} width="88" height="22" rx="11" fill="#0f172a"/>
            <text x={n.cx} y={n.cy + 63} textAnchor="middle" fill="white"
              fontSize={n.label.length > 8 ? "7.5" : "8.5"} fontWeight="700"
              letterSpacing="0.8" fontFamily="Inter,sans-serif">{n.label}</text>
          </g>
        ))}

        {/* ── Floating ₹ rupee badge ── */}
        <circle cx="376" cy="175" r="22" fill="#fbbf24" filter="url(#shadow)"/>
        <text x="376" y="182" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="Inter,sans-serif">₹</text>

        {/* ── Approval badge (top ribbon) ── */}
        <rect x="162" y="34" width="136" height="32" rx="16" fill="#0d9488" filter="url(#shadow)"/>
        <text x="230" y="54" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" letterSpacing="0.5" fontFamily="Inter,sans-serif">✓ Instant Approval</text>

      </svg>
    </div>
  );
}

// ── MOBILE SCREEN ─────────────────────────────────────────
function MobileScreen({ onOtpSent }) {
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (phone.length !== 10 || !consent) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    onOtpSent(phone);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Apply for a Personal Loan</h1>
      <p className="text-gray-600 text-sm mb-6">Enter your 10 digit mobile number to get started</p>

      {/* Phone input */}
      <div className="flex items-center border border-gray-200 rounded-lg bg-white mb-5 overflow-hidden shadow-sm">
        <div className="bg-primary/10 px-4 py-4 flex items-center justify-center border-r border-gray-200">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="currentColor">
            <path d="M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zm-5 17a1 1 0 110-2 1 1 0 010 2zm5-4H7V5h10v10z"/>
          </svg>
        </div>
        <input
          type="tel" maxLength={10} value={phone}
          onChange={e => setPhone(e.target.value.replace(/\D/g,''))}
          placeholder="Enter mobile number"
          className="flex-1 px-4 py-4 text-base outline-none bg-transparent text-gray-800"
        />
      </div>

      {/* Consent */}
      <label className="flex items-start gap-3 cursor-pointer mb-6">
        <div onClick={() => setConsent(!consent)}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all cursor-pointer ${consent ? 'border-primary bg-primary' : 'border-gray-400'}`}>
          {consent && <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
        <span className="text-sm text-gray-600 leading-relaxed">
          I give my consent for SalaryUncle to reach out to me through phone calls..
          <span className="text-blue-500 cursor-pointer"> read more</span>
        </span>
      </label>

      {/* Get OTP button */}
      <button onClick={handleSend} disabled={phone.length !== 10 || !consent || loading}
        className="w-full py-4 rounded-full text-white font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{background: phone.length === 10 && consent ? 'linear-gradient(135deg, #29b6d4, #1976d2)' : '#9ca3af'}}>
        {loading ? 'Sending OTP...' : 'Get OTP'}
      </button>
    </div>
  );
}

// ── OTP SCREEN ────────────────────────────────────────────
function OtpScreen({ phone, onVerified }) {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimer(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  const handleVerify = async () => {
    if (otp.length < 4) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    onVerified();
  };

  const maskedPhone = '******' + phone.slice(-4);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Apply for a Personal Loan</h1>
      <p className="text-gray-800 text-sm font-medium mb-1">Mobile number : {maskedPhone}</p>
      <p className="text-gray-500 text-sm mb-6">Please enter the OTP to unlock your next step.</p>

      {/* OTP input */}
      <div className="flex items-center border border-gray-200 rounded-lg bg-white mb-5 overflow-hidden shadow-sm">
        <div className="bg-primary/10 px-4 py-4 flex items-center justify-center border-r border-gray-200">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="currentColor">
            <path d="M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zm-5 17a1 1 0 110-2 1 1 0 010 2zm5-4H7V5h10v10z"/>
          </svg>
        </div>
        <input
          type="tel" maxLength={6} value={otp}
          onChange={e => setOtp(e.target.value.replace(/\D/g,''))}
          placeholder="Enter OTP"
          className="flex-1 px-4 py-4 text-base outline-none bg-transparent text-gray-800"
        />
      </div>

      {/* Verify button */}
      <button onClick={handleVerify} disabled={otp.length < 4 || loading}
        className="w-full py-4 rounded-full text-white font-semibold text-base mb-4 transition-all disabled:opacity-50"
        style={{background:'linear-gradient(135deg, #29b6d4, #1976d2)'}}>
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>

      {/* Timer */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Didn't receive the OTP?</span>
        {timer > 0 ? (
          <span className="flex items-center gap-1 font-semibold text-red-500">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 5h2v6l4.28 2.54-.72 1.21L11 14V7z"/></svg>
            {String(Math.floor(timer/60)).padStart(2,'0')}:{String(timer%60).padStart(2,'0')}s
          </span>
        ) : (
          <button onClick={() => setTimer(30)} className="text-blue-500 font-semibold hover:underline">Resend OTP</button>
        )}
      </div>
    </div>
  );
}

// ── APPLY PAGE ────────────────────────────────────────────
export default function Apply() {
  const [screen, setScreen] = useState('mobile'); // mobile | otp
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleOtpSent = (ph) => {
    setPhone(ph);
    setScreen('otp');
  };

  const handleVerified = () => {
    // Save auth state and go to dashboard
    sessionStorage.setItem('su_auth', 'true');
    sessionStorage.setItem('su_phone', phone);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen" style={{background:'linear-gradient(135deg, #b2e0e0 0%, #e0f4f4 50%, #b2e8e8 100%)'}}>
      {/* Minimal top nav */}
      <div className="px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold font-heading text-sm">SU</span>
          </div>
          <span className="font-bold text-gray-900 font-heading">Salary<span className="text-primary">Uncle</span></span>
        </Link>
        <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">← Back to Home</Link>
      </div>

      {/* Main content — 2 column */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">

        {/* LEFT — Form */}
        <div className="max-w-md">
          {screen === 'mobile' && <MobileScreen onOtpSent={handleOtpSent} />}
          {screen === 'otp' && <OtpScreen phone={phone} onVerified={handleVerified} />}
        </div>

        {/* RIGHT — Graphic */}
        <div className="hidden lg:block">
          <RightGraphic />
        </div>
      </div>
    </div>
  );
}
