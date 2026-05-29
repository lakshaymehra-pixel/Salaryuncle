import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const FAKE_OTP = '1234';
const PRIMARY = '#608D4B';
const PRIMARY_DARK = '#4a6e39';
const PRIMARY_LIGHT = '#f0f7eb';

// ── Floating benefit pill ─────────────────────────────────
function Pill({ icon, text, style }) {
  return (
    <div className="absolute flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-100 text-xs font-semibold text-gray-700 whitespace-nowrap" style={style}>
      <span className="text-base">{icon}</span>{text}
    </div>
  );
}

// ── Right panel ───────────────────────────────────────────
function RightPanel() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full py-10 select-none">

      {/* Big circle bg */}
      <div className="absolute w-80 h-80 rounded-full opacity-20"
        style={{background:`radial-gradient(circle,${PRIMARY},transparent)`}}/>

      {/* Center illustration */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Shield icon */}
        <div className="w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl mb-6"
          style={{background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`}}>
          <svg viewBox="0 0 24 24" className="w-14 h-14 text-white" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10" strokeWidth="2"/>
          </svg>
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2">
          Your Loan,<br/>
          <span style={{color: PRIMARY}}>Your Terms</span>
        </h2>
        <p className="text-gray-500 text-sm text-center max-w-xs">
          Fast, transparent salary loans designed for working professionals like you.
        </p>
      </div>

      {/* Floating pills */}
      <Pill icon="⚡" text="Quick Approval" style={{top:'12%', left:'5%'}}/>
      <Pill icon="🔒" text="100% Secure" style={{top:'18%', right:'2%'}}/>
      <Pill icon="💰" text="Up to ₹5 Lakhs" style={{bottom:'30%', left:'2%'}}/>
      <Pill icon="📄" text="Minimal Docs" style={{bottom:'22%', right:'4%'}}/>

      {/* Stats row */}
      <div className="relative z-10 mt-10 grid grid-cols-3 gap-4 w-full max-w-sm">
        {[
          { val: '50K+', lbl: 'Customers' },
          { val: '₹200Cr+', lbl: 'Disbursed' },
          { val: '4.8★', lbl: 'Rating' },
        ].map((s, i) => (
          <div key={i} className="text-center bg-white rounded-2xl py-3 px-2 shadow-md border border-gray-100">
            <p className="text-lg font-extrabold" style={{color: PRIMARY}}>{s.val}</p>
            <p className="text-xs text-gray-400 font-medium">{s.lbl}</p>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="relative z-10 mt-6 w-full max-w-sm space-y-2">
        {[
          { step: '01', text: 'Enter mobile & verify OTP' },
          { step: '02', text: 'Complete profile registration' },
          { step: '03', text: 'Get loan in your account' },
        ].map(s => (
          <div key={s.step} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-100">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`}}>{s.step}</span>
            <span className="text-sm text-gray-600 font-medium">{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mobile screen ─────────────────────────────────────────
function MobileScreen({ onOtpSent }) {
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

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
      {/* Header */}
      <div className="mb-7">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-4"
          style={{background: PRIMARY_LIGHT, color: PRIMARY}}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background: PRIMARY}}/>
          Instant Salary Loan
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">
          Apply in<br/>
          <span style={{color: PRIMARY}}>60 Seconds</span> 🚀
        </h1>
        <p className="text-gray-500 text-sm">Enter your mobile to get started</p>
      </div>

      {/* Phone input — unique design */}
      <div className="mb-2">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Mobile Number</label>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 flex items-center px-4 gap-2 border-r border-gray-200 z-10">
            <span className="text-lg">🇮🇳</span>
            <span className="text-sm font-bold text-gray-600">+91</span>
          </div>
          <input type="tel" maxLength={10} value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 10-digit number"
            className="w-full pl-24 pr-12 py-4 rounded-2xl border-2 text-gray-900 font-bold text-base outline-none transition-all"
            style={{
              borderColor: phone.length === 10 ? PRIMARY : phone.length > 0 ? '#d1fae5' : '#e5e7eb',
              background: phone.length > 0 ? PRIMARY_LIGHT : 'white',
            }}
          />
          {phone.length === 10 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{background: PRIMARY}}>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          )}
        </div>
      </div>

      {/* 10-dot progress */}
      <div className="flex gap-1 mb-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-200"
            style={{background: i < phone.length ? PRIMARY : '#e5e7eb'}}/>
        ))}
      </div>

      {/* Consent */}
      <div className="mb-6 p-4 rounded-2xl border-2 cursor-pointer transition-all"
        style={{borderColor: consent ? PRIMARY : '#e5e7eb', background: consent ? PRIMARY_LIGHT : '#fafafa'}}
        onClick={() => setConsent(!consent)}>
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all`}
            style={{borderColor: consent ? PRIMARY : '#d1d5db', background: consent ? PRIMARY : 'white'}}>
            {consent && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
          </div>
          <div>
            <p className="text-sm text-gray-700 leading-relaxed">
              I authorise SalaryUncle to contact me via call/SMS/WhatsApp for loan-related communication.
            </p>
            <button type="button"
              className="text-xs font-bold mt-1 hover:underline"
              style={{color: PRIMARY}}
              onClick={e => { e.stopPropagation(); setShowConsent(v => !v); }}>
              {showConsent ? '▲ Read less' : '▼ Read more'}
            </button>
            {showConsent && (
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                I give my consent for SalaryUncle to reach out to me through phone calls, text messages, WhatsApp, email, or the SalaryUncle mobile application, using the contact details I have shared. I confirm that I have carefully read and agree to the{' '}
                <Link to="/terms" className="font-semibold hover:underline" style={{color: PRIMARY}} onClick={e => e.stopPropagation()}>Terms &amp; Conditions</Link>
                {' '}and{' '}
                <Link to="/privacy" className="font-semibold hover:underline" style={{color: PRIMARY}} onClick={e => e.stopPropagation()}>Privacy Policy</Link>
                {' '}of SalaryUncle.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button onClick={handleSend} disabled={!ready || loading}
        className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        style={{
          background: ready ? `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})` : '#e5e7eb',
          color: ready ? 'white' : '#9ca3af',
          boxShadow: ready ? `0 8px 24px ${PRIMARY}55` : 'none',
        }}>
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/></svg>
            Sending OTP...
          </>
        ) : (
          <>
            Get OTP
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </>
        )}
      </button>

      {/* Bottom trust */}
      <div className="flex items-center justify-center gap-5 mt-5">
        {['🔒 SSL Secured', '✅ RBI Compliant', '🏦 Safe & Trusted'].map(t => (
          <span key={t} className="text-xs text-gray-400">{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── OTP Screen ────────────────────────────────────────────
function OtpScreen({ phone, onVerified, onBack }) {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
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
      setError('Incorrect OTP. Please check and try again.');
      setOtpDigits(['', '', '', '']);
      refs[0].current?.focus();
      return;
    }
    toast.success('✅ Verified! Setting up your account...');
    onVerified();
  };

  const filled = otpDigits.filter(Boolean).length;

  return (
    <div>
      {/* Back */}
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-semibold mb-7 hover:opacity-70 transition-opacity"
        style={{color: PRIMARY}}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        Change Number
      </button>

      {/* Header */}
      <div className="mb-7">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
          style={{background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`}}>
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="white" strokeWidth="1.8">
            <rect x="5" y="2" width="14" height="20" rx="2"/>
            <line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Enter OTP</h1>
        <p className="text-gray-500 text-sm">4-digit code sent to</p>
        <p className="font-bold text-gray-800 text-base mt-0.5">{maskedPhone}</p>
      </div>

      {/* 4 OTP Boxes */}
      <div className="flex gap-3 mb-4">
        {otpDigits.map((d, i) => (
          <input key={i} ref={refs[i]} type="tel" maxLength={1} value={d}
            onChange={e => handleDigit(e.target.value, i)}
            onKeyDown={e => handleKey(e, i)}
            className="flex-1 h-16 text-center text-2xl font-extrabold rounded-2xl border-2 outline-none transition-all"
            style={{
              borderColor: d ? PRIMARY : error ? '#fca5a5' : '#e5e7eb',
              background: d ? PRIMARY_LIGHT : error ? '#fef2f2' : '#fafafa',
              color: d ? PRIMARY_DARK : '#374151',
              boxShadow: d ? `0 4px 12px ${PRIMARY}33` : 'none',
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{background: i < filled ? PRIMARY : '#e5e7eb'}}/>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 mb-4">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-red-600 text-xs font-semibold">{error}</p>
        </div>
      )}

      {/* Verify Button */}
      <button onClick={handleVerify} disabled={otp.length < 4 || loading}
        className="w-full py-4 rounded-2xl text-white font-bold text-base mb-5 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          background: otp.length === 4 ? `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})` : '#e5e7eb',
          color: otp.length === 4 ? 'white' : '#9ca3af',
          boxShadow: otp.length === 4 ? `0 8px 24px ${PRIMARY}55` : 'none',
        }}>
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/></svg>
            Verifying...
          </>
        ) : (
          <>
            Confirm & Continue
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </>
        )}
      </button>

      {/* Resend */}
      <div className="text-center">
        {timer > 0 ? (
          <p className="text-sm text-gray-500">
            Resend OTP in{' '}
            <span className="font-bold" style={{color: PRIMARY}}>{String(timer).padStart(2, '0')}s</span>
          </p>
        ) : (
          <button onClick={() => { setTimer(30); setOtpDigits(['', '', '', '']); refs[0].current?.focus(); }}
            className="text-sm font-bold hover:opacity-75 transition-opacity underline underline-offset-2"
            style={{color: PRIMARY}}>
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Apply page ───────────────────────────────────────
export default function Apply() {
  const [screen, setScreen] = useState('mobile');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{background:'linear-gradient(135deg,#f0f7eb 0%,#ffffff 40%,#f0f7eb 100%)'}}>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{backgroundImage:`radial-gradient(${PRIMARY}22 1px,transparent 1px)`, backgroundSize:'24px 24px'}}/>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">

        {/* LEFT — Form */}
        <div className="flex items-center justify-center py-8 lg:py-16 lg:pr-12">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            style={{boxShadow:`0 20px 60px ${PRIMARY}20`}}>
            {screen === 'mobile' && (
              <MobileScreen onOtpSent={ph => { setPhone(ph); setScreen('otp'); }} />
            )}
            {screen === 'otp' && (
              <OtpScreen phone={phone} onBack={() => setScreen('mobile')} onVerified={() => {
                sessionStorage.setItem('su_auth', 'true');
                sessionStorage.setItem('su_phone', phone);
                navigate('/dashboard');
              }} />
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="hidden lg:block absolute left-1/2 top-16 bottom-16 w-px -translate-x-1/2"
          style={{background:`linear-gradient(to bottom,transparent,${PRIMARY}40,transparent)`}}/>

        {/* RIGHT — Info */}
        <div className="hidden lg:flex items-center justify-center py-8 lg:py-16 lg:pl-12">
          <div className="w-full max-w-md">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
