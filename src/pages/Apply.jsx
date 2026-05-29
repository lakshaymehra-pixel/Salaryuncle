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
        <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
          Salary Advance Loan<br/>
          <span style={{color:'#0d9488'}}>Made Simple & Fast</span>
        </h2>
        <p className="text-gray-500 text-sm mt-1">Get funds in your account quickly</p>
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
      <div className="rounded-2xl p-5 border border-teal-100 shadow-sm"
        style={{background:'linear-gradient(135deg,#f0fdf9,#e6faf7)'}}>
        <p className="text-sm font-bold text-gray-700 mb-3">Why Choose SalaryUncle?</p>
        <div className="grid grid-cols-2 gap-y-2.5">
          {features.map((f) => (
            <div key={f.text} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span className="text-xs text-gray-700 font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white shadow-sm border border-gray-100">
        {[
          { val: '50K+', lbl: 'Happy Customers' },
          { val: '₹200Cr+', lbl: 'Loans Disbursed' },
          { val: '4.8★', lbl: 'App Rating' },
        ].map((t, i) => (
          <div key={i} className="text-center flex-1">
            <p className="text-base font-extrabold text-gray-900">{t.val}</p>
            <p className="text-xs text-gray-400">{t.lbl}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

// ── MOBILE SCREEN ─────────────────────────────────────────
const FAKE_OTP = '1234';

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
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setInterval(() => setTimer(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  const handleVerify = async () => {
    if (otp.length < 4) return;
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    if (otp !== FAKE_OTP) {
      setError('Invalid OTP. Please try again.');
      toast.error('Wrong OTP!');
      return;
    }
    toast.success('OTP verified!');
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

      {/* Error */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

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
    <div style={{background:'linear-gradient(135deg, #b2e0e0 0%, #e0f4f4 50%, #b2e8e8 100%)'}}>
      {/* Main content — 2 column */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-140px)]">

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
