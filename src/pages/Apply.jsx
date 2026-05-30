import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const FAKE_OTP = '1234';

// ── Floating benefit card ─────────────────────────────────
function FloatingCard({ icon, title, subtitle, style }) {
  return (
    <div
      className="absolute flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-2xl border border-white/60 whitespace-nowrap"
      style={style}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: 'linear-gradient(135deg,#e8f5e0,#d0ead8)' }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-800 leading-tight">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 leading-tight">{subtitle}</p>}
      </div>
    </div>
  );
}

// ── Right Info Panel ─────────────────────────────────────
function RightPanel() {
  const stats = [
    { val: '50K+', lbl: 'Happy Customers' },
    { val: '₹200Cr+', lbl: 'Loans Disbursed' },
    { val: '4.8★', lbl: 'App Rating' },
    { val: '< 24h', lbl: 'Approval Time' },
  ];
  const steps = [
    { n: '01', title: 'Verify Mobile', desc: 'Enter number & confirm OTP' },
    { n: '02', title: 'Complete Profile', desc: 'Basic details & documents' },
    { n: '03', title: 'Get Disbursed', desc: 'Funds directly in your account' },
  ];

  return (
    <div className="relative h-full flex flex-col justify-center py-10 select-none">

      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle,#608D4B,transparent)' }} />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle,#4a6e39,transparent)' }} />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-4"
          style={{ background: '#e8f5e0', color: '#608D4B' }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#608D4B' }} />
          Trusted by professionals across India
        </span>
        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Your Financial<br />
          <span style={{ color: '#608D4B' }}>Partner,</span> Not Just<br />
          a Lender.
        </h2>
        <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xs">
          Fast salary loans with zero hidden charges. Designed for salaried employees who need funds quickly.
        </p>
      </div>

      {/* Stats grid */}
      <div className="relative z-10 grid grid-cols-2 gap-3 mb-8">
        {stats.map((s, i) => (
          <div key={i}
            className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <p className="text-xl font-extrabold leading-tight" style={{ color: '#608D4B' }}>{s.val}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">{s.lbl}</p>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="relative z-10 space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">How it works</p>
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 hover:border-green-200 transition-all">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#608D4B,#4a6e39)' }}>
              {s.n}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{s.title}</p>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </div>
            <div className="ml-auto w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#f0f7eb' }}>
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#608D4B" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="relative z-10 flex items-center gap-4 mt-8 flex-wrap">
        {['🔒 SSL Secured', '✅ RBI Compliant', '🏦 Safe & Trusted'].map(t => (
          <span key={t} className="text-xs font-semibold text-gray-400 flex items-center gap-1">{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── Mobile Number Screen ──────────────────────────────────
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
      {/* Badge */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
          style={{ background: 'linear-gradient(135deg,#608D4B,#4a6e39)' }}>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" strokeWidth="2.5" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-800">SalaryUncle</p>
          <p className="text-xs text-gray-400">Instant Salary Loans</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: '#e8f5e0', color: '#608D4B' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#608D4B' }} />
          Live
        </div>
      </div>

      {/* Heading */}
      <div className="mb-7">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">
          Apply in{' '}
          <span className="relative inline-block">
            <span style={{ color: '#608D4B' }}>60 Seconds</span>
            <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
              <path d="M0 3 Q50 0 100 3" stroke="#608D4B" strokeWidth="2" fill="none" strokeOpacity="0.4" />
            </svg>
          </span>
        </h1>
        <p className="text-gray-400 text-sm">No paperwork. No branch visits. 100% online.</p>
      </div>

      {/* Loan amount chips */}
      <div className="flex gap-2 mb-6">
        {['₹10,000', '₹50,000', '₹1 Lakh', '₹5 Lakhs'].map((amt, i) => (
          <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{ background: i === 2 ? '#608D4B' : '#f9fafb', color: i === 2 ? 'white' : '#6b7280', borderColor: i === 2 ? '#608D4B' : '#e5e7eb' }}>
            {amt}
          </span>
        ))}
      </div>

      {/* Phone input */}
      <div className="mb-2">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
          Mobile Number
        </label>
        <div className="relative flex items-stretch rounded-2xl border-2 overflow-hidden transition-all"
          style={{
            borderColor: phone.length === 10 ? '#608D4B' : phone.length > 0 ? '#d1fae5' : '#e5e7eb',
            boxShadow: phone.length === 10 ? '0 0 0 4px #608D4B20' : 'none',
          }}>
          <div className="flex items-center gap-2 px-4 bg-gray-50 border-r border-gray-200">
            <span className="text-lg">🇮🇳</span>
            <span className="text-sm font-bold text-gray-700">+91</span>
          </div>
          <input
            type="tel" maxLength={10} value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 10-digit number"
            className="flex-1 px-4 py-4 text-gray-900 font-bold text-base outline-none bg-white"
          />
          {phone.length === 10 && (
            <div className="flex items-center pr-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: '#608D4B' }}>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-200"
            style={{ background: i < phone.length ? '#608D4B' : '#e5e7eb' }} />
        ))}
      </div>

      {/* Consent */}
      <div
        className="mb-6 p-4 rounded-2xl border-2 cursor-pointer transition-all"
        style={{
          borderColor: consent ? '#608D4B' : '#e5e7eb',
          background: consent ? '#f0f7eb' : '#fafafa',
        }}
        onClick={() => setConsent(!consent)}
      >
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all"
            style={{
              borderColor: consent ? '#608D4B' : '#d1d5db',
              background: consent ? '#608D4B' : 'white',
            }}
          >
            {consent && (
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-700 leading-relaxed">
              I authorise SalaryUncle to contact me via call/SMS/WhatsApp for loan-related communication.
            </p>
            <button
              type="button"
              className="text-xs font-bold mt-1 hover:underline"
              style={{ color: '#608D4B' }}
              onClick={e => { e.stopPropagation(); setShowConsent(v => !v); }}
            >
              {showConsent ? '▲ Read less' : '▼ Read more'}
            </button>
            {showConsent && (
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                I give my consent for SalaryUncle to reach out to me through phone calls, text messages,
                WhatsApp, email, or the SalaryUncle mobile application. I confirm I have read and agree to the{' '}
                <Link to="/terms" className="font-semibold hover:underline" style={{ color: '#608D4B' }} onClick={e => e.stopPropagation()}>
                  Terms &amp; Conditions
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="font-semibold hover:underline" style={{ color: '#608D4B' }} onClick={e => e.stopPropagation()}>
                  Privacy Policy
                </Link>.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleSend}
        disabled={!ready || loading}
        className="w-full py-4 rounded-2xl font-bold text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          background: ready ? 'linear-gradient(135deg,#608D4B,#4a6e39)' : '#e5e7eb',
          color: ready ? 'white' : '#9ca3af',
          boxShadow: ready ? '0 8px 30px #608D4B44' : 'none',
        }}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
            </svg>
            Sending OTP...
          </>
        ) : (
          <>
            Get OTP &amp; Continue
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400 mt-4">
        By continuing, you agree to our{' '}
        <Link to="/terms" className="underline hover:text-gray-600" style={{ color: '#608D4B' }}>Terms</Link>
        {' '}&amp;{' '}
        <Link to="/privacy" className="underline hover:text-gray-600" style={{ color: '#608D4B' }}>Privacy Policy</Link>
      </p>
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
    const t = setInterval(() => setTimer(s => (s > 0 ? s - 1 : 0)), 1000);
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
  const filled = otpDigits.filter(Boolean).length;

  const handleVerify = async () => {
    if (otp.length < 4) return;
    setLoading(true);
    setError('');
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

  return (
    <div>
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-semibold mb-7 hover:opacity-70 transition-opacity"
        style={{ color: '#608D4B' }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Change Number
      </button>

      {/* Phone sent to */}
      <div className="mb-8">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg,#608D4B,#4a6e39)' }}>
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="1.8">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Verify OTP</h1>
        <p className="text-sm text-gray-400">4-digit code sent to</p>
        <p className="text-base font-bold text-gray-800 mt-0.5">{maskedPhone}</p>
      </div>

      {/* OTP Boxes */}
      <div className="flex gap-3 mb-3">
        {otpDigits.map((d, i) => (
          <input
            key={i} ref={refs[i]} type="tel" maxLength={1} value={d}
            onChange={e => handleDigit(e.target.value, i)}
            onKeyDown={e => handleKey(e, i)}
            className="flex-1 h-16 text-center text-2xl font-extrabold rounded-2xl border-2 outline-none transition-all"
            style={{
              borderColor: d ? '#608D4B' : error ? '#fca5a5' : '#e5e7eb',
              background: d ? '#f0f7eb' : error ? '#fef2f2' : '#fafafa',
              color: d ? '#4a6e39' : '#374151',
              boxShadow: d ? '0 4px 12px #608D4B33' : 'none',
            }}
          />
        ))}
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < filled ? '#608D4B' : '#e5e7eb' }} />
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-red-600 text-xs font-semibold">{error}</p>
        </div>
      )}

      {/* Verify CTA */}
      <button
        onClick={handleVerify}
        disabled={otp.length < 4 || loading}
        className="w-full py-4 rounded-2xl font-bold text-base mb-5 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          background: otp.length === 4 ? 'linear-gradient(135deg,#608D4B,#4a6e39)' : '#e5e7eb',
          color: otp.length === 4 ? 'white' : '#9ca3af',
          boxShadow: otp.length === 4 ? '0 8px 30px #608D4B44' : 'none',
        }}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
            </svg>
            Verifying...
          </>
        ) : (
          <>
            Confirm &amp; Continue
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </>
        )}
      </button>

      {/* Resend */}
      <div className="text-center">
        {timer > 0 ? (
          <p className="text-sm text-gray-500">
            Resend OTP in{' '}
            <span className="font-bold" style={{ color: '#608D4B' }}>{String(timer).padStart(2, '0')}s</span>
          </p>
        ) : (
          <button
            onClick={() => { setTimer(30); setOtpDigits(['', '', '', '']); refs[0].current?.focus(); }}
            className="text-sm font-bold hover:opacity-75 transition-opacity underline underline-offset-2"
            style={{ color: '#608D4B' }}
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Apply Page ───────────────────────────────────────
export default function Apply() {
  const [screen, setScreen] = useState('mobile');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#f8faf6' }}>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2"
        style={{ background: 'radial-gradient(circle,#608D4B,transparent)' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-5 translate-y-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle,#608D4B,transparent)' }} />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#608D4B22 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

        {/* LEFT — Form */}
        <div className="flex items-center justify-center py-8 lg:py-16 lg:pr-16">
          <div className="w-full max-w-md">
            <div
              className="bg-white rounded-3xl p-8 border border-gray-100"
              style={{ boxShadow: '0 24px 80px #608D4B18, 0 4px 24px #00000008' }}
            >
              {screen === 'mobile' && (
                <MobileScreen onOtpSent={ph => { setPhone(ph); setScreen('otp'); }} />
              )}
              {screen === 'otp' && (
                <OtpScreen
                  phone={phone}
                  onBack={() => setScreen('mobile')}
                  onVerified={() => {
                    sessionStorage.setItem('su_auth', 'true');
                    sessionStorage.setItem('su_phone', phone);
                    navigate('/dashboard');
                  }}
                />
              )}
            </div>

            {/* Below card */}
            <div className="flex items-center justify-center gap-6 mt-5">
              {[
                { icon: '🔒', text: 'SSL Secured' },
                { icon: '✅', text: 'RBI Compliant' },
                { icon: '🏦', text: 'Safe & Trusted' },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block absolute left-1/2 top-20 bottom-20 w-px -translate-x-1/2"
          style={{ background: 'linear-gradient(to bottom,transparent,#608D4B30,transparent)' }} />

        {/* RIGHT — Info */}
        <div className="hidden lg:flex items-center justify-center py-8 lg:py-16 lg:pl-16">
          <div className="w-full max-w-md">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
