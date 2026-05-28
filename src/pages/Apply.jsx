import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight, FiPhone, FiShield, FiClock, FiChevronRight } from 'react-icons/fi';

// ── helpers ──────────────────────────────────────────────
function calcEMI(p, r, n) {
  const mr = r / 100 / 12;
  if (mr === 0) return p / n;
  return (p * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
}
const fmt = (n) => '₹' + Number(Math.round(n)).toLocaleString('en-IN');

// ── Step components ───────────────────────────────────────

/* STEP 1 — Mobile + OTP */
function StepMobile({ data, setData, onNext }) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(0);

  const sendOTP = () => {
    if (data.phone.length !== 10) return;
    setOtpSent(true);
    setTimer(30);
    const interval = setInterval(() => setTimer(t => { if (t <= 1) { clearInterval(interval); return 0; } return t - 1; }), 1000);
  };

  const handleOtpChange = (val, i) => {
    const newOtp = [...otp];
    newOtp[i] = val.slice(-1);
    setOtp(newOtp);
    if (val && i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
    if (newOtp.every(v => v !== '') && i === 3) {
      setData({ ...data, otp: newOtp.join('') });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
        <div className="flex gap-2">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 text-gray-500 font-medium text-sm">+91</div>
          <input
            type="tel" maxLength={10} value={data.phone}
            onChange={e => setData({ ...data, phone: e.target.value.replace(/\D/g, '') })}
            placeholder="Enter 10-digit mobile number"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">OTP will be sent to this number via SMS & WhatsApp</p>
      </div>

      {!otpSent ? (
        <button onClick={sendOTP} disabled={data.phone.length !== 10}
          className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">
          Send OTP <FiArrowRight />
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Enter OTP sent to +91 {data.phone}</label>
            <div className="flex gap-3 justify-center">
              {otp.map((v, i) => (
                <input key={i} id={`otp-${i}`} type="tel" maxLength={1} value={v}
                  onChange={e => handleOtpChange(e.target.value, i)}
                  onKeyDown={e => { if (e.key === 'Backspace' && !v && i > 0) document.getElementById(`otp-${i - 1}`)?.focus(); }}
                  className="w-14 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:border-primary transition-all text-gray-900"
                  style={{ borderColor: v ? '#608D4B' : '#e5e7eb' }}
                />
              ))}
            </div>
            <div className="text-center mt-3">
              {timer > 0
                ? <span className="text-gray-400 text-sm">Resend OTP in {timer}s</span>
                : <button onClick={sendOTP} className="text-primary text-sm font-semibold hover:underline">Resend OTP</button>
              }
            </div>
          </div>
          <button onClick={onNext}
            disabled={otp.some(v => !v)}
            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">
            Verify & Continue <FiArrowRight />
          </button>
          <p className="text-center text-xs text-gray-400">
            For demo: any 4-digit OTP works
          </p>
        </div>
      )}
    </div>
  );
}

/* STEP 2 — Personal Details */
function StepPersonal({ data, setData, onNext, onBack }) {
  const update = e => setData({ ...data, [e.target.name]: e.target.value });
  const valid = data.fullName && data.email && data.pan && data.dob && data.gender && data.pincode;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
        <input name="fullName" value={data.fullName} onChange={update} placeholder="As per Aadhaar Card"
          className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
        <input name="email" type="email" value={data.email} onChange={update} placeholder="yourname@gmail.com"
          className="input-field" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth <span className="text-red-500">*</span></label>
          <input name="dob" type="date" value={data.dob} onChange={update} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender <span className="text-red-500">*</span></label>
          <select name="gender" value={data.gender} onChange={update} className="input-field bg-white">
            <option value="">Select</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">PAN Number <span className="text-red-500">*</span></label>
        <input name="pan" value={data.pan} onChange={update} placeholder="ABCDE1234F"
          maxLength={10} style={{ textTransform: 'uppercase' }}
          className="input-field" />
        <p className="text-xs text-gray-400 mt-1">Required for KYC & credit assessment</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">PIN Code <span className="text-red-500">*</span></label>
        <input name="pincode" type="tel" maxLength={6} value={data.pincode} onChange={update} placeholder="110001"
          className="input-field" />
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl hover:border-gray-300 transition-all">← Back</button>
        <button onClick={onNext} disabled={!valid} className="flex-2 btn-primary py-3.5 px-8 disabled:opacity-50 disabled:cursor-not-allowed">Continue <FiArrowRight /></button>
      </div>
    </div>
  );
}

/* STEP 3 — Employment */
function StepEmployment({ data, setData, onNext, onBack }) {
  const update = e => setData({ ...data, [e.target.name]: e.target.value });
  const sal = parseInt(data.salary) || 0;
  const valid = data.employer && data.designation && data.salary && data.empType && data.workExp;
  const maxLoan = Math.min(sal * 3, 500000);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Type <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-3 gap-2">
          {[{ v: 'Salaried - Private', l: '🏢', s: 'Private' }, { v: 'Salaried - Govt', l: '🏛️', s: 'Govt' }, { v: 'Salaried - PSU', l: '🏭', s: 'PSU' }].map(o => (
            <label key={o.v} className={`border-2 rounded-xl p-3 text-center cursor-pointer transition-all ${data.empType === o.v ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
              <input type="radio" name="empType" value={o.v} onChange={update} className="hidden" />
              <div className="text-xl mb-1">{o.l}</div>
              <div className={`text-xs font-bold ${data.empType === o.v ? 'text-primary' : 'text-gray-600'}`}>{o.s}</div>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name <span className="text-red-500">*</span></label>
        <input name="employer" value={data.employer} onChange={update} placeholder="e.g. Tata Motors, HDFC Bank"
          className="input-field" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Designation <span className="text-red-500">*</span></label>
          <input name="designation" value={data.designation} onChange={update} placeholder="Software Engineer"
            className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Experience <span className="text-red-500">*</span></label>
          <select name="workExp" value={data.workExp} onChange={update} className="input-field bg-white">
            <option value="">Select</option>
            <option value="0.5">6–12 Months</option>
            <option value="1">1–2 Years</option>
            <option value="3">2–5 Years</option>
            <option value="7">5+ Years</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Net Monthly Salary (₹) <span className="text-red-500">*</span></label>
        <input name="salary" type="number" value={data.salary} onChange={update} placeholder="e.g. 50000"
          className="input-field" />
        {sal > 0 && sal < 20000 && (
          <div className="mt-2 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs">
            ⚠️ Minimum salary required is ₹20,000/month
          </div>
        )}
        {sal >= 20000 && (
          <div className="mt-2 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs">
            ✅ You may qualify for up to <strong>{fmt(maxLoan)}</strong>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Official Email (optional)</label>
        <input name="offEmail" type="email" value={data.offEmail || ''} onChange={update} placeholder="you@company.com"
          className="input-field" />
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl hover:border-gray-300 transition-all">← Back</button>
        <button onClick={onNext} disabled={!valid || sal < 20000} className="flex-2 btn-primary py-3.5 px-8 disabled:opacity-50 disabled:cursor-not-allowed">Continue <FiArrowRight /></button>
      </div>
    </div>
  );
}

/* STEP 4 — Loan Amount & Type */
function StepLoan({ data, setData, onNext, onBack }) {
  const update = e => setData({ ...data, [e.target.name]: e.target.value });
  const sal = parseInt(data.salary) || 0;
  const maxLoan = Math.min(sal * 3, 500000);
  const amt = parseInt(data.loanAmount) || 0;
  const ten = parseInt(data.tenure) || 12;
  const emi = amt > 0 ? calcEMI(amt, 10.5, ten) : 0;
  const totalPay = emi * ten;
  const totalInt = totalPay - amt;

  const loanTypes = [
    { v: 'Salary Advance', icon: '💰' },
    { v: 'Personal Loan', icon: '👤' },
    { v: 'Medical Loan', icon: '🏥' },
    { v: 'Education Loan', icon: '🎓' },
    { v: 'Home Renovation', icon: '🏠' },
    { v: 'Travel Loan', icon: '✈️' },
    { v: 'Wedding Loan', icon: '💍' },
    { v: 'Emergency Loan', icon: '🚨' },
  ];

  const valid = data.loanType && amt >= 10000 && amt <= maxLoan;

  return (
    <div className="space-y-5">
      {/* Loan Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Loan Type <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-4 gap-2">
          {loanTypes.map(lt => (
            <label key={lt.v} className={`border-2 rounded-xl p-2.5 text-center cursor-pointer transition-all ${data.loanType === lt.v ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="loanType" value={lt.v} onChange={update} className="hidden" />
              <div className="text-2xl mb-1">{lt.icon}</div>
              <div className={`text-xs font-semibold leading-tight ${data.loanType === lt.v ? 'text-primary' : 'text-gray-600'}`}>{lt.v}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Loan Amount Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-700">Loan Amount <span className="text-red-500">*</span></label>
          <span className="text-primary font-bold text-lg font-heading">{amt > 0 ? fmt(amt) : '₹0'}</span>
        </div>
        <input type="range" name="loanAmount" min={10000} max={maxLoan > 0 ? maxLoan : 500000} step={5000}
          value={data.loanAmount || 0} onChange={update}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary bg-gray-200" />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹10,000</span><span>{fmt(maxLoan > 0 ? maxLoan : 500000)}</span>
        </div>
        <div className="mt-2">
          <input type="number" name="loanAmount" value={data.loanAmount} onChange={update}
            placeholder="Or type amount"
            className="input-field text-sm" />
        </div>
      </div>

      {/* Tenure */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-700">Repayment Tenure</label>
          <span className="text-primary font-bold">{ten} Months</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[3, 6, 12, 24, 36].map(m => (
            <button key={m} type="button"
              onClick={() => setData({ ...data, tenure: m })}
              className={`py-2 rounded-xl text-sm font-semibold border-2 transition-all ${ten === m ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}>
              {m}M
            </button>
          ))}
        </div>
      </div>

      {/* EMI Card */}
      {amt >= 10000 && (
        <div className="bg-gray-900 rounded-2xl p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-xs mb-1">Monthly EMI</p>
              <p className="text-white font-bold text-lg font-heading">{fmt(emi)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Total Interest</p>
              <p className="text-primary-light font-bold text-lg font-heading">{fmt(totalInt)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Total Payable</p>
              <p className="text-white font-bold text-lg font-heading">{fmt(totalPay)}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-4 pt-3 text-center">
            <p className="text-gray-400 text-xs">Interest Rate: <span className="text-white font-semibold">10.5% p.a.</span> • No hidden charges</p>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl hover:border-gray-300 transition-all">← Back</button>
        <button onClick={onNext} disabled={!valid} className="flex-2 btn-primary py-3.5 px-8 disabled:opacity-50 disabled:cursor-not-allowed">Continue <FiArrowRight /></button>
      </div>
    </div>
  );
}

/* STEP 5 — Bank Details */
function StepBank({ data, setData, onNext, onBack }) {
  const update = e => setData({ ...data, [e.target.name]: e.target.value });
  const valid = data.bankName && data.accountNo && data.ifsc;

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700 flex gap-3">
        <span>ℹ️</span>
        <p>Loan amount will be directly credited to this bank account. Please enter your <strong>salary account</strong> details.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bank Name <span className="text-red-500">*</span></label>
        <select name="bankName" value={data.bankName || ''} onChange={update} className="input-field bg-white">
          <option value="">Select Your Bank</option>
          {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank', 'Yes Bank', 'IndusInd Bank', 'Federal Bank', 'Other'].map(b => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Account Number <span className="text-red-500">*</span></label>
        <input name="accountNo" type="tel" value={data.accountNo || ''} onChange={update}
          placeholder="Enter your account number" className="input-field" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Account Number <span className="text-red-500">*</span></label>
        <input name="accountNoConfirm" type="tel" value={data.accountNoConfirm || ''} onChange={update}
          placeholder="Re-enter account number" className="input-field" />
        {data.accountNo && data.accountNoConfirm && data.accountNo !== data.accountNoConfirm && (
          <p className="text-red-500 text-xs mt-1">Account numbers don't match</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">IFSC Code <span className="text-red-500">*</span></label>
        <input name="ifsc" value={data.ifsc || ''} onChange={update}
          placeholder="e.g. HDFC0001234" maxLength={11} style={{ textTransform: 'uppercase' }}
          className="input-field" />
        <p className="text-xs text-gray-400 mt-1">Find on your cheque book or bank's website</p>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl hover:border-gray-300 transition-all">← Back</button>
        <button onClick={onNext}
          disabled={!valid || data.accountNo !== data.accountNoConfirm}
          className="flex-2 btn-primary py-3.5 px-8 disabled:opacity-50 disabled:cursor-not-allowed">
          Continue <FiArrowRight />
        </button>
      </div>
    </div>
  );
}

/* STEP 6 — Documents */
function StepDocs({ data, setData, onNext, onBack, submitting }) {
  const [files, setFiles] = useState({});

  const handleFile = (name, file) => {
    setFiles(prev => ({ ...prev, [name]: file }));
    setData(prev => ({ ...prev, [name]: file }));
  };

  const docs = [
    { name: 'aadhaarFile', label: 'Aadhaar Card', note: 'Front & back in 1 file', required: true, icon: '🪪' },
    { name: 'panFile', label: 'PAN Card', note: 'Clear photo/scan', required: true, icon: '💳' },
    { name: 'salarySlip', label: 'Last 3 Salary Slips', note: 'PDF preferred', required: true, icon: '📄' },
    { name: 'bankStatement', label: 'Bank Statement (3 Months)', note: 'Salary account', required: true, icon: '🏦' },
  ];

  const allUploaded = docs.filter(d => d.required).every(d => files[d.name]);

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex gap-2 text-xs text-green-700">
        🔒 <span>All documents are <strong>256-bit SSL encrypted</strong>. We follow RBI data protection norms.</span>
      </div>

      {docs.map(doc => (
        <label key={doc.name} className={`block border-2 border-dashed rounded-2xl p-4 cursor-pointer transition-all ${files[doc.name] ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 bg-gray-50'}`}>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
            onChange={e => handleFile(doc.name, e.target.files[0])} />
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${files[doc.name] ? 'bg-primary/10' : 'bg-white border border-gray-200'}`}>
              {files[doc.name] ? '✅' : doc.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{doc.label} {doc.required && <span className="text-red-400">*</span>}</p>
              {files[doc.name]
                ? <p className="text-primary text-xs truncate mt-0.5">✓ {files[doc.name].name}</p>
                : <p className="text-gray-400 text-xs mt-0.5">{doc.note} • Max 5MB</p>
              }
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 ${files[doc.name] ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
              {files[doc.name] ? 'Change' : 'Upload'}
            </span>
          </div>
        </label>
      ))}

      <label className="flex items-start gap-3 cursor-pointer pt-2">
        <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0" id="consent" />
        <span className="text-xs text-gray-500 leading-relaxed">
          I agree to SalaryUncle's <a href="#" className="text-primary underline">Terms of Service</a> & <a href="#" className="text-primary underline">Privacy Policy</a>. I consent to KYC verification and confirm all details provided are accurate and true.
        </span>
      </label>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl hover:border-gray-300 transition-all">← Back</button>
        <button onClick={onNext} disabled={!allUploaded || submitting}
          className="flex-2 btn-primary py-3.5 px-6 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
          {submitting
            ? <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Submitting...</span>
            : <span>Submit Application 🚀</span>
          }
        </button>
      </div>
    </div>
  );
}

/* SUCCESS */
function SuccessScreen({ data, appId }) {
  const waMsg = encodeURIComponent(
    `*New Loan Application — SalaryUncle*\n\n*App ID:* ${appId}\n*Name:* ${data.fullName}\n*Phone:* +91 ${data.phone}\n*Loan Type:* ${data.loanType}\n*Amount:* ₹${parseInt(data.loanAmount || 0).toLocaleString('en-IN')}\n*Tenure:* ${data.tenure} Months\n*Employer:* ${data.employer}\n*Salary:* ₹${parseInt(data.salary || 0).toLocaleString('en-IN')}\n\n_Via SalaryUncle Website_`
  );

  return (
    <div className="text-center py-4">
      {/* Animated check */}
      <div className="relative mb-6 flex justify-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-bounce">
            <FiCheckCircle className="text-white" size={34} />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">Application Submitted! 🎉</h2>
      <p className="text-gray-500 text-sm mb-4">Our team will call you within 30 minutes</p>

      {/* App ID */}
      <div className="bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4 mb-6 inline-block w-full">
        <p className="text-xs text-gray-500 mb-1">Your Application ID</p>
        <p className="text-2xl font-bold text-primary font-heading tracking-wider">{appId}</p>
        <p className="text-xs text-gray-400 mt-1">Screenshot this for your records</p>
      </div>

      {/* Timeline */}
      <div className="space-y-2 mb-7 text-left">
        {[
          { t: 'Now', l: 'Application received & processing started', done: true },
          { t: '30 min', l: 'Loan expert will call you on +91 ' + data.phone, done: true },
          { t: '1–2 hrs', l: 'Document verification & credit assessment', done: false },
          { t: '2–4 hrs', l: 'Loan approval & agreement signing', done: false },
          { t: 'Same Day', l: 'Money credited to your bank account', done: false },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl ${item.done ? 'bg-primary/5 border border-primary/20' : 'bg-gray-50 border border-gray-100'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${item.done ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>{i + 1}</div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${item.done ? 'text-primary' : 'text-gray-600'}`}>{item.l}</p>
            </div>
            <span className={`text-xs font-semibold ${item.done ? 'text-primary' : 'text-gray-400'}`}>{item.t}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <a href="tel:+918800123456"
          className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3.5 text-sm font-semibold hover:bg-primary-dark transition-colors">
          <FiPhone size={16} /> Call Us Now
        </a>
        <a href={`https://wa.me/918800123456?text=${waMsg}`} target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white rounded-xl py-3.5 text-sm font-semibold hover:bg-green-700 transition-colors">
          <span className="text-base">📱</span> WhatsApp
        </a>
      </div>
      <Link to="/" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">← Back to Home</Link>
    </div>
  );
}

// ── Main Apply Page ───────────────────────────────────────
const STEPS = [
  { id: 0, label: 'Mobile', short: '📱' },
  { id: 1, label: 'Personal', short: '👤' },
  { id: 2, label: 'Employment', short: '🏢' },
  { id: 3, label: 'Loan', short: '💰' },
  { id: 4, label: 'Bank', short: '🏦' },
  { id: 5, label: 'Documents', short: '📁' },
];

export default function Apply() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [appId] = useState('SU' + Date.now().toString().slice(-8));

  const [data, setData] = useState({
    phone: '', fullName: '', email: '', dob: '', gender: '', pan: '', pincode: '',
    empType: '', employer: '', designation: '', workExp: '', salary: '', offEmail: '',
    loanType: '', loanAmount: '', tenure: 12,
    bankName: '', accountNo: '', accountNoConfirm: '', ifsc: '',
  });

  const next = () => { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const back = () => { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const submit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setSubmitting(false);
    setDone(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepTitles = [
    'Verify Your Mobile',
    'Personal Details',
    'Employment Details',
    'Loan Details',
    'Bank Account',
    'Upload Documents',
  ];

  const stepSubs = [
    'Enter your mobile number to get started',
    'Basic KYC information as per Aadhaar',
    'Your employment & salary information',
    'Choose loan type, amount & tenure',
    'Account where loan will be credited',
    'Upload required documents for verification',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-heading">SU</span>
            </div>
            <span className="font-bold text-gray-900 font-heading text-sm">Salary<span className="text-primary">Uncle</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FiShield size={12} className="text-primary" /> Secure
            </div>
            <a href="tel:+918800123456" className="flex items-center gap-1.5 text-primary text-xs font-semibold">
              <FiPhone size={12} /> Help
            </a>
          </div>
        </div>

        {/* Progress bar */}
        {!done && (
          <div className="w-full bg-gray-100 h-1">
            <div className="bg-primary h-1 transition-all duration-500"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        )}
      </div>

      <div className="pt-16 pb-10">
        <div className="max-w-lg mx-auto px-4">

          {!done && (
            <>
              {/* Step bubbles */}
              <div className="flex items-center justify-center gap-1 py-6 overflow-x-auto">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center">
                    <div className={`flex flex-col items-center ${i <= step ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                        i < step ? 'bg-primary text-white' :
                        i === step ? 'bg-primary text-white ring-4 ring-primary/20' :
                        'bg-gray-200 text-gray-400'
                      }`}>
                        {i < step ? '✓' : s.short}
                      </div>
                      <span className={`text-xs mt-1 font-medium hidden sm:block ${i === step ? 'text-primary' : 'text-gray-400'}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`w-6 sm:w-8 h-0.5 mx-1 flex-shrink-0 transition-all ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step header */}
              <div className="text-center mb-6">
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Step {step + 1} of {STEPS.length}</p>
                <h1 className="text-xl font-bold font-heading text-gray-900">{stepTitles[step]}</h1>
                <p className="text-gray-500 text-sm mt-1">{stepSubs[step]}</p>
              </div>
            </>
          )}

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
            {/* Inline CSS for input-field */}
            <style>{`.input-field { width:100%; border:1px solid #e5e7eb; border-radius:12px; padding:12px 16px; font-size:14px; color:#111827; transition:all 0.2s; outline:none; } .input-field:focus { border-color:#608D4B; box-shadow: 0 0 0 3px rgba(96,141,75,0.1); }`}</style>

            {done ? <SuccessScreen data={data} appId={appId} /> : (
              <>
                {step === 0 && <StepMobile data={data} setData={setData} onNext={next} />}
                {step === 1 && <StepPersonal data={data} setData={setData} onNext={next} onBack={back} />}
                {step === 2 && <StepEmployment data={data} setData={setData} onNext={next} onBack={back} />}
                {step === 3 && <StepLoan data={data} setData={setData} onNext={next} onBack={back} />}
                {step === 4 && <StepBank data={data} setData={setData} onNext={next} onBack={back} />}
                {step === 5 && <StepDocs data={data} setData={setData} onNext={submit} onBack={back} submitting={submitting} />}
              </>
            )}
          </div>

          {/* Trust bar */}
          {!done && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><FiShield size={12} className="text-primary" /> 256-bit SSL</span>
              <span>•</span>
              <span className="flex items-center gap-1">✅ RBI Registered</span>
              <span>•</span>
              <span className="flex items-center gap-1"><FiClock size={12} className="text-primary" /> 4-hr Disbursal</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
