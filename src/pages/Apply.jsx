import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// ── Right side graphic ────────────────────────────────────
function RightGraphic() {
  const stats = [
    { value: '₹5 Lakh', label: 'Max Loan Amount', color: '#0d9488', bg: '#f0fdf4', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#0d9488" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
    )},
    { value: 'Quick ⚡', label: 'Quick Approval', color: '#2563eb', bg: '#eff6ff', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#2563eb" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    )},
    { value: '1.5%', label: 'Interest Per Month', color: '#7c3aed', bg: '#f5f3ff', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#7c3aed" strokeWidth="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
    )},
    { value: '60 Mo.', label: 'Flexible Tenure', color: '#ea580c', bg: '#fff7ed', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#ea580c" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    )},
  ];

  const features = [
    { icon: '✓', text: 'No Collateral Required' },
    { icon: '✓', text: 'Minimal Documentation' },
    { icon: '✓', text: '100% Online Process' },
    { icon: '✓', text: 'Trusted by 50,000+ Users' },
  ];

  return (
    <div className="w-full select-none space-y-5">

      {/* Top badge */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg"
          style={{background:'linear-gradient(135deg,#0d9488,#0f766e)'}}>
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Instant Approval — Apply Now!
        </span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-extrabold text-white leading-tight">
          Salary Advance Loan<br/>
          <span className="text-transparent bg-clip-text" style={{backgroundImage:'linear-gradient(90deg,#34d399,#60a5fa)'}}>Made Simple & Fast</span>
        </h2>
        <p className="text-white/50 text-sm mt-1">Get funds in your account quickly</p>
      </div>

      {/* 4 stat cards */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-white/80"
            style={{background: s.bg}}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white shadow-sm flex-shrink-0">
              {s.icon}
            </div>
            <div>
              <p className="text-xl font-extrabold leading-tight" style={{color: s.color}}>{s.value}</p>
              <p className="text-xs text-gray-500 font-medium leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Feature checklist */}
      <div className="rounded-2xl p-5 border border-white/10 backdrop-blur-sm"
        style={{background:'rgba(255,255,255,0.05)'}}>
        <p className="text-sm font-bold text-white mb-3">Why Choose SalaryUncle?</p>
        <div className="grid grid-cols-2 gap-y-2.5">
          {features.map((f) => (
            <div key={f.text} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span className="text-xs text-white/70 font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl border border-white/10"
        style={{background:'rgba(255,255,255,0.05)'}}>
        {[
          { val: '50K+', lbl: 'Happy Customers' },
          { val: '₹200Cr+', lbl: 'Loans Disbursed' },
          { val: '4.8★', lbl: 'App Rating' },
        ].map((t, i) => (
          <div key={i} className="text-center flex-1">
            <p className="text-base font-extrabold text-white">{t.val}</p>
            <p className="text-xs text-white/40">{t.lbl}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

const FAKE_OTP = '1234';

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
    toast.success(`OTP sent! Use ${FAKE_OTP} to verify`, { duration: 6000, icon: '📱' });
    onOtpSent(phone);
  };

  const ready = phone.length === 10 && consent;

  return (
    <div>
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 rounded-full px-3 py-1 mb-5">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
        <span className="text-green-300 text-xs font-semibold tracking-wide">Quick Approval · 100% Online</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
        Get Instant<br/>
        <span className="text-transparent bg-clip-text" style={{backgroundImage:'linear-gradient(90deg,#34d399,#60a5fa)'}}>
          Salary Loan
        </span>
      </h1>
      <p className="text-white/60 text-sm mb-7">Enter your mobile number to get started in 60 seconds</p>

      {/* Phone input */}
      <div className="mb-2">
        <label className="block text-white/70 text-xs font-semibold mb-2 tracking-wide uppercase">Mobile Number</label>
        <div className="flex items-center rounded-2xl overflow-hidden border border-white/20 focus-within:border-green-400/60 transition-all"
          style={{background:'rgba(255,255,255,0.08)'}}>
          <div className="px-4 py-4 flex items-center gap-2 border-r border-white/10">
            <span className="text-white/60 text-sm font-semibold">🇮🇳</span>
            <span className="text-white/60 text-sm font-semibold">+91</span>
          </div>
          <input type="tel" maxLength={10} value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g,''))}
            placeholder="98XXXXXXXX"
            className="flex-1 px-4 py-4 text-base text-white font-semibold placeholder-white/30 bg-transparent outline-none tracking-widest"
          />
          {phone.length === 10 && (
            <div className="pr-4">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mb-5">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-200 ${i < phone.length ? 'bg-green-400' : 'bg-white/15'}`}/>
        ))}
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3 mb-6 cursor-pointer" onClick={() => setConsent(!consent)}>
        <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${
          consent ? 'border-green-400 bg-green-400' : 'border-white/30 bg-white/5'
        }`}>
          {consent && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
        <span className="text-white/50 text-xs leading-relaxed">
          I authorise SalaryUncle to contact me via call/SMS/WhatsApp for loan-related communication.
          <span className="text-green-400 ml-1 cursor-pointer hover:underline">Read more</span>
        </span>
      </div>

      {/* Get OTP button */}
      <button onClick={handleSend} disabled={!ready || loading}
        className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 relative overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
        style={{background: ready ? 'linear-gradient(135deg,#10b981,#059669)' : 'rgba(255,255,255,0.1)', color:'white', boxShadow: ready ? '0 8px 32px rgba(16,185,129,0.4)' : 'none'}}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/></svg>
            Sending OTP...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Get OTP
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        )}
      </button>

      {/* Trust line */}
      <div className="flex items-center justify-center gap-4 mt-5">
        {['🔒 Secure', '⚡ Instant', '✅ Trusted'].map(t => (
          <span key={t} className="text-white/40 text-xs">{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── OTP SCREEN ────────────────────────────────────────────
function OtpScreen({ phone, onVerified }) {
  const [otpDigits, setOtpDigits] = useState(['','','','']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const refs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    refs[0].current?.focus();
    const t = setInterval(() => setTimer(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  const handleDigit = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otpDigits];
    next[idx] = val;
    setOtpDigits(next);
    setError('');
    if (val && idx < 3) refs[idx + 1].current?.focus();
  };

  const handleKey = (e, idx) => {
    if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) refs[idx - 1].current?.focus();
  };

  const otp = otpDigits.join('');
  const maskedPhone = '+91 ••••••' + phone.slice(-4);

  const handleVerify = async () => {
    if (otp.length < 4) return;
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    if (otp !== FAKE_OTP) {
      setError('Incorrect OTP. Please try again.');
      setOtpDigits(['','','','']);
      refs[0].current?.focus();
      return;
    }
    toast.success('✅ Verified! Welcome aboard.');
    onVerified();
  };

  return (
    <div>
      {/* Back arrow */}
      <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-5 cursor-pointer hover:bg-white/15 transition-all">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        <span className="text-white/60 text-xs font-medium">Back</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">OTP Verification</h1>
      <p className="text-white/50 text-sm mb-1">We sent a 4-digit code to</p>
      <p className="text-green-400 font-bold text-base mb-7">{maskedPhone}</p>

      {/* 4 OTP boxes */}
      <div className="flex gap-3 mb-3">
        {otpDigits.map((d, i) => (
          <input key={i} ref={refs[i]} type="tel" maxLength={1} value={d}
            onChange={e => handleDigit(e.target.value, i)}
            onKeyDown={e => handleKey(e, i)}
            className={`flex-1 h-16 text-center text-2xl font-bold rounded-2xl border-2 outline-none transition-all ${
              d ? 'border-green-400 text-white' : 'border-white/20 text-white/40'
            }`}
            style={{background: d ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.07)'}}
          />
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-xl px-3 py-2 mb-4">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-red-400 text-xs font-medium">{error}</p>
        </div>
      )}

      {/* Verify button */}
      <button onClick={handleVerify} disabled={otp.length < 4 || loading}
        className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide mb-5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{background:'linear-gradient(135deg,#10b981,#059669)', color:'white', boxShadow: otp.length===4 ? '0 8px 32px rgba(16,185,129,0.4)':'none'}}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/></svg>
            Verifying...
          </span>
        ) : 'Confirm & Proceed →'}
      </button>

      {/* Resend */}
      <div className="text-center">
        {timer > 0 ? (
          <p className="text-white/40 text-sm">
            Resend OTP in <span className="text-green-400 font-bold">{String(timer).padStart(2,'0')}s</span>
          </p>
        ) : (
          <button onClick={() => { setTimer(30); setOtpDigits(['','','','']); refs[0].current?.focus(); }}
            className="text-green-400 text-sm font-semibold hover:text-green-300 transition-colors underline underline-offset-2">
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}

// ── APPLY PAGE ────────────────────────────────────────────
export default function Apply() {
  const [screen, setScreen] = useState('mobile');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{background:'linear-gradient(135deg,#0a0f1e 0%,#0d1f1a 50%,#0a1628 100%)'}}>

      {/* Animated background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{background:'radial-gradient(circle,#10b981,transparent)'}}/>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{background:'radial-gradient(circle,#3b82f6,transparent)'}}/>
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{background:'radial-gradient(circle,#8b5cf6,transparent)'}}/>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-80px)]">

        {/* LEFT — Form card */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="rounded-3xl p-8 border border-white/10 shadow-2xl backdrop-blur-sm"
            style={{background:'rgba(255,255,255,0.05)'}}>
            {screen === 'mobile' && <MobileScreen onOtpSent={ph => { setPhone(ph); setScreen('otp'); }} />}
            {screen === 'otp'    && <OtpScreen phone={phone} onVerified={() => {
              sessionStorage.setItem('su_auth','true');
              sessionStorage.setItem('su_phone', phone);
              navigate('/dashboard');
            }} />}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block">
          <RightGraphic />
        </div>
      </div>
    </div>
  );
}
