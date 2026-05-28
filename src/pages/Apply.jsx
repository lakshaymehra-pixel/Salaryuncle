import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ── Right side graphic (loan categories around girl) ──────
function RightGraphic() {
  const categories = [
    { label: 'SHOPPING', x: '20%', y: '4%' },
    { label: 'TRAVEL', x: '68%', y: '2%' },
    { label: 'MEDICAL', x: '2%', y: '22%' },
    { label: 'CLUB & PARTY', x: '72%', y: '20%' },
    { label: 'GIFTS', x: '2%', y: '60%' },
    { label: 'OBLIGATIONS', x: '68%', y: '60%' },
  ];

  const icons = {
    SHOPPING: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
    TRAVEL: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    MEDICAL: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
    'CLUB & PARTY': (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    GIFTS: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    OBLIGATIONS: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4"/><path d="M12 14c-6 0-8 2-8 4v1h16v-1c0-2-2-4-8-4z"/>
        <path d="M16 8s1 1 1 3-1 3-1 3"/>
      </svg>
    ),
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      {/* SVG lines connecting to center */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet">
        {/* Lines from categories to center girl */}
        <line x1="160" y1="50" x2="300" y2="220" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
        <line x1="430" y1="30" x2="350" y2="200" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
        <line x1="80" y1="140" x2="260" y2="240" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
        <line x1="470" y1="130" x2="360" y2="230" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
        <line x1="80" y1="340" x2="270" y2="300" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
        <line x1="460" y1="340" x2="360" y2="290" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
      </svg>

      {/* Category bubbles */}
      {/* SHOPPING */}
      <div className="absolute flex flex-col items-center gap-1" style={{top:'4%', left:'18%'}}>
        <div className="w-16 h-16 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center">{icons['SHOPPING']}</div>
        <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">SHOPPING</div>
      </div>

      {/* TRAVEL */}
      <div className="absolute flex flex-col items-center gap-1" style={{top:'4%', right:'8%'}}>
        <div className="w-16 h-16 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center">{icons['TRAVEL']}</div>
        <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">TRAVEL</div>
      </div>

      {/* MEDICAL */}
      <div className="absolute flex flex-col items-center gap-1" style={{top:'25%', left:'2%'}}>
        <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider mb-1">MEDICAL</div>
        <div className="w-16 h-16 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center">{icons['MEDICAL']}</div>
      </div>

      {/* CLUB & PARTY */}
      <div className="absolute flex flex-col items-center gap-1" style={{top:'22%', right:'2%'}}>
        <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider mb-1">CLUB & PARTY</div>
        <div className="w-16 h-16 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center">{icons['CLUB & PARTY']}</div>
      </div>

      {/* GIFTS */}
      <div className="absolute flex flex-col items-center gap-1" style={{bottom:'20%', left:'2%'}}>
        <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider mb-1">GIFTS</div>
        <div className="w-16 h-16 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center">{icons['GIFTS']}</div>
      </div>

      {/* OBLIGATIONS */}
      <div className="absolute flex flex-col items-center gap-1" style={{bottom:'20%', right:'2%'}}>
        <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider mb-1">OBLIGATIONS</div>
        <div className="w-16 h-16 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center">{icons['OBLIGATIONS']}</div>
      </div>

      {/* Center girl illustration */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="w-52 h-64 bg-gradient-to-b from-teal-200/30 to-transparent rounded-full flex items-end justify-center overflow-hidden">
          {/* SVG girl placeholder — professional sitting with laptop */}
          <svg viewBox="0 0 200 260" className="w-full h-full" fill="none">
            {/* Body */}
            <ellipse cx="100" cy="200" rx="55" ry="20" fill="#b2d8d8" opacity="0.3"/>
            {/* Legs crossed */}
            <path d="M70 180 Q60 210 50 220 Q80 215 100 210 Q120 215 150 220 Q140 210 130 180Z" fill="#4a6fa5"/>
            {/* Jacket/body */}
            <path d="M65 120 Q55 150 60 180 L140 180 Q145 150 135 120 Q120 110 100 108 Q80 110 65 120Z" fill="#1e3a5f"/>
            {/* Inner shirt */}
            <path d="M85 120 L100 108 L115 120 L112 160 L88 160Z" fill="#c0392b"/>
            {/* Head */}
            <circle cx="100" cy="88" r="28" fill="#c8a882"/>
            {/* Hair */}
            <path d="M72 82 Q75 55 100 58 Q125 55 128 82 Q120 70 100 72 Q80 70 72 82Z" fill="#2c1810"/>
            <path d="M128 82 Q135 90 130 105 Q122 95 118 88Z" fill="#2c1810"/>
            {/* Face features */}
            <circle cx="91" cy="88" r="3" fill="#8b6854"/>
            <circle cx="109" cy="88" r="3" fill="#8b6854"/>
            <path d="M93 97 Q100 102 107 97" stroke="#8b6854" strokeWidth="1.5" fill="none"/>
            {/* Arms */}
            <path d="M65 125 Q45 140 50 160 Q55 155 65 145 Q60 135 70 130Z" fill="#c8a882"/>
            <path d="M135 125 Q155 140 150 160 Q145 155 135 145 Q140 135 130 130Z" fill="#c8a882"/>
            {/* Laptop */}
            <rect x="55" y="155" width="90" height="55" rx="4" fill="#e0e0e0"/>
            <rect x="58" y="158" width="84" height="48" rx="3" fill="#2c3e50"/>
            <rect x="50" y="208" width="100" height="6" rx="3" fill="#bdbdbd"/>
            {/* Watch */}
            <rect x="48" y="153" width="8" height="5" rx="1" fill="#888"/>
            {/* Fist raised */}
            <circle cx="150" cy="152" r="10" fill="#c8a882"/>
            <path d="M144 148 L156 148 L158 158 L142 158Z" fill="#c8a882"/>
          </svg>
        </div>
      </div>
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
