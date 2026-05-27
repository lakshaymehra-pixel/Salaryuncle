import { useState } from 'react';
import { FiCheckCircle, FiArrowRight, FiUser, FiBriefcase, FiDollarSign, FiUpload, FiPhone, FiMail, FiAlertCircle, FiClock } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const steps = [
  { label: 'Personal Info', icon: FiUser },
  { label: 'Employment', icon: FiBriefcase },
  { label: 'Loan Details', icon: FiDollarSign },
  { label: 'Documents', icon: FiUpload },
];

function InputField({ label, name, type = 'text', placeholder, value, onChange, required = true, note }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
      />
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required = true }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select name={name} value={value} onChange={onChange} required={required}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white">
        <option value="">-- Select --</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export default function Apply() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appId] = useState('SU' + Date.now().toString().slice(-8));

  const [form, setForm] = useState({
    // Personal
    fullName: '', email: '', phone: '', dob: '', gender: '',
    pan: '', aadhaar: '', address: '', city: '', pincode: '',
    // Employment
    empType: 'private', employer: '', designation: '', workExp: '',
    officialEmail: '', officeAddress: '', salary: '', bankName: '', accountNo: '', ifsc: '',
    // Loan
    loanType: '', loanAmount: '', tenure: '12', purpose: '', existingLoan: 'no',
    // Docs
    aadhaarFile: null, panFile: null, salarySlip: null, bankStatement: null, empId: null,
  });

  const update = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  // Eligibility check
  const eligibilityCheck = () => {
    const sal = parseInt(form.salary);
    if (sal && sal < 20000) {
      toast.error('Minimum salary required is ₹20,000/month', { duration: 4000 });
      return false;
    }
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && !eligibilityCheck()) return;
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call / WhatsApp message build
    await new Promise(r => setTimeout(r, 2000));

    // Build WhatsApp message for instant notification
    const msg = encodeURIComponent(
      `*New Loan Application — SalaryUncle*\n\n` +
      `*App ID:* ${appId}\n` +
      `*Name:* ${form.fullName}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email}\n` +
      `*Loan Type:* ${form.loanType}\n` +
      `*Amount:* ₹${parseInt(form.loanAmount).toLocaleString('en-IN')}\n` +
      `*Tenure:* ${form.tenure} Months\n` +
      `*Employer:* ${form.employer}\n` +
      `*Salary:* ₹${parseInt(form.salary).toLocaleString('en-IN')}\n` +
      `*City:* ${form.city}\n\n` +
      `_Submitted via SalaryUncle website_`
    );

    // Send to WhatsApp business number
    window.open(`https://wa.me/918800123456?text=${msg}`, '_blank');

    setLoading(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center px-4 py-16">
        <Toaster position="top-center" />
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center border border-gray-100">
          {/* Success animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <FiCheckCircle className="text-primary" size={48} />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto" style={{left:'50%', marginLeft:'20px'}}>
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-3">Application Submitted!</h2>
          <p className="text-gray-500 text-sm mb-2">Your Application ID</p>
          <div className="bg-primary/10 border border-primary/20 rounded-xl px-6 py-3 mb-6 inline-block">
            <span className="text-primary font-bold text-xl font-heading">{appId}</span>
          </div>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Our loan expert will call you on <strong className="text-gray-900">{form.phone}</strong> within <strong className="text-primary">30 minutes</strong> to complete your application.
          </p>

          {/* Timeline */}
          <div className="text-left space-y-3 mb-8">
            {[
              { time: '0–30 min', label: 'Loan expert will call you', done: true },
              { time: '30–60 min', label: 'Document verification', done: false },
              { time: '1–2 hrs', label: 'Loan approval decision', done: false },
              { time: '2–4 hrs', label: 'Money in your bank account', done: false },
            ].map((t, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${t.done ? 'bg-primary/5 border border-primary/20' : 'bg-gray-50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${t.done ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${t.done ? 'text-primary' : 'text-gray-700'}`}>{t.label}</p>
                </div>
                <span className="text-xs text-gray-400">{t.time}</span>
              </div>
            ))}
          </div>

          {/* Contact options */}
          <div className="grid grid-cols-2 gap-3">
            <a href="tel:+918800123456"
              className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3 text-sm font-semibold hover:bg-primary-dark transition-colors">
              <FiPhone size={16} /> Call Us
            </a>
            <a href={`https://wa.me/918800123456?text=Hi, my application ID is ${appId}`}
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-green-700 transition-colors">
              <span>📱</span> WhatsApp
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-5">
            Screenshot this page for your records. App ID: <strong>{appId}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Toaster position="top-center" />

      {/* Top banner */}
      <div className="bg-primary text-white text-center py-2.5 text-sm font-medium">
        <FiClock className="inline mr-2" size={14} />
        Average approval time: <strong>2 hours</strong> — Apply now, get money today!
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-heading text-gray-900 mb-2">Apply for Instant Loan</h1>
          <p className="text-gray-500 text-sm">100% Online • No Branch Visit • Safe & Secure</p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['🔒 256-bit Encrypted', '✅ RBI Registered', '⚡ 4-Hour Disbursal', '📱 WhatsApp Updates'].map(b => (
            <span key={b} className="bg-white border border-gray-100 shadow-sm rounded-full px-4 py-1.5 text-xs font-medium text-gray-600">{b}</span>
          ))}
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div onClick={() => i < step && setStep(i)} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                  i < step ? 'bg-primary border-primary text-white' :
                  i === step ? 'bg-white border-primary text-primary shadow-md' :
                  'bg-gray-50 border-gray-200 text-gray-400'
                }`}>
                  {i < step ? <FiCheckCircle size={18} /> : <s.icon size={18} />}
                </div>
                <span className={`text-xs mt-1.5 font-medium hidden sm:block ${i === step ? 'text-primary' : i < step ? 'text-gray-600' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
          <div className="bg-primary h-1.5 rounded-full transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <p className="text-xs text-gray-400 text-center mb-6">Step {step + 1} of {steps.length}</p>

        {/* Form Card */}
        <form onSubmit={handleNext} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-dark px-8 py-5">
            <h2 className="text-white font-bold font-heading text-lg flex items-center gap-3">
              {(() => { const S = steps[step].icon; return <S size={20} />; })()}
              {steps[step].label}
            </h2>
            <p className="text-white/70 text-sm mt-0.5">
              {step === 0 && 'Basic personal details for KYC verification'}
              {step === 1 && 'Your employment and salary information'}
              {step === 2 && 'Choose loan amount and type'}
              {step === 3 && 'Upload KYC and income documents'}
            </p>
          </div>

          <div className="p-8">

            {/* ---- STEP 0: PERSONAL ---- */}
            {step === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <InputField label="Full Name (as per Aadhaar)" name="fullName" value={form.fullName} onChange={update} placeholder="Rajesh Kumar" />
                </div>
                <InputField label="Mobile Number" name="phone" type="tel" value={form.phone} onChange={update} placeholder="9876543210" note="OTP will be sent to this number" />
                <InputField label="Email Address" name="email" type="email" value={form.email} onChange={update} placeholder="rajesh@gmail.com" />
                <InputField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={update} />
                <SelectField label="Gender" name="gender" value={form.gender} onChange={update} options={[
                  {value:'male',label:'Male'},{value:'female',label:'Female'},{value:'other',label:'Other'}
                ]} />
                <InputField label="PAN Number" name="pan" value={form.pan} onChange={update} placeholder="ABCDE1234F" note="Required for credit check" />
                <InputField label="Aadhaar Number" name="aadhaar" value={form.aadhaar} onChange={update} placeholder="XXXX XXXX XXXX" />
                <div className="sm:col-span-2">
                  <InputField label="Current Residential Address" name="address" value={form.address} onChange={update} placeholder="House No., Street, Area" />
                </div>
                <InputField label="City" name="city" value={form.city} onChange={update} placeholder="Delhi" />
                <InputField label="PIN Code" name="pincode" value={form.pincode} onChange={update} placeholder="110001" />
              </div>
            )}

            {/* ---- STEP 1: EMPLOYMENT ---- */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'private', label: '🏢 Private', sub: 'MNC / Startup' },
                      { value: 'government', label: '🏛️ Government', sub: 'Central / State' },
                      { value: 'psu', label: '🏭 PSU', sub: 'Public Sector' },
                    ].map(opt => (
                      <label key={opt.value} className={`border-2 rounded-xl p-3 text-center cursor-pointer transition-all ${
                        form.empType === opt.value ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input type="radio" name="empType" value={opt.value} onChange={update} className="hidden" />
                        <div className="text-base mb-1">{opt.label.split(' ')[0]}</div>
                        <div className={`text-xs font-semibold ${form.empType === opt.value ? 'text-primary' : 'text-gray-700'}`}>{opt.label.split(' ').slice(1).join(' ')}</div>
                        <div className="text-xs text-gray-400">{opt.sub}</div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <InputField label="Company / Employer Name" name="employer" value={form.employer} onChange={update} placeholder="e.g. Tata Consultancy Services" />
                </div>
                <InputField label="Your Designation" name="designation" value={form.designation} onChange={update} placeholder="Software Engineer" />
                <SelectField label="Work Experience" name="workExp" value={form.workExp} onChange={update} options={[
                  {value:'0-1',label:'0–1 Year'},{value:'1-2',label:'1–2 Years'},
                  {value:'2-5',label:'2–5 Years'},{value:'5-10',label:'5–10 Years'},{value:'10+',label:'10+ Years'},
                ]} />
                <InputField label="Official Work Email" name="officialEmail" type="email" value={form.officialEmail} onChange={update} placeholder="rajesh@tcs.com" note="For employment verification" />
                <InputField label="Net Monthly Salary (₹)" name="salary" type="number" value={form.salary} onChange={update} placeholder="50000" note="Minimum ₹20,000 required" />
                <div className="sm:col-span-2">
                  <InputField label="Bank Name (Salary Account)" name="bankName" value={form.bankName} onChange={update} placeholder="HDFC Bank / SBI / ICICI..." />
                </div>
                <InputField label="Account Number" name="accountNo" value={form.accountNo} onChange={update} placeholder="XXXXXXXXXX" />
                <InputField label="IFSC Code" name="ifsc" value={form.ifsc} onChange={update} placeholder="HDFC0001234" />

                {/* Salary checker */}
                {form.salary && parseInt(form.salary) < 20000 && (
                  <div className="sm:col-span-2 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <FiAlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-red-700 font-semibold text-sm">Salary Too Low</p>
                      <p className="text-red-600 text-xs">Minimum net monthly salary of ₹20,000 is required. Your entered salary (₹{parseInt(form.salary).toLocaleString('en-IN')}) is below the threshold.</p>
                    </div>
                  </div>
                )}
                {form.salary && parseInt(form.salary) >= 20000 && (
                  <div className="sm:col-span-2 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                    <FiCheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-green-700 font-semibold text-sm">Great! You're Eligible</p>
                      <p className="text-green-600 text-xs">Based on your salary, you may qualify for a loan up to ₹{Math.min(parseInt(form.salary) * 3, 500000).toLocaleString('en-IN')}.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ---- STEP 2: LOAN DETAILS ---- */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: 'Salary Advance', icon: '💰', sub: 'Up to ₹3L' },
                      { value: 'Personal Loan', icon: '👤', sub: 'Up to ₹5L' },
                      { value: 'Medical Loan', icon: '🏥', sub: 'Up to ₹5L' },
                      { value: 'Education Loan', icon: '🎓', sub: 'Up to ₹5L' },
                      { value: 'Home Renovation', icon: '🏠', sub: 'Up to ₹5L' },
                      { value: 'Travel Loan', icon: '✈️', sub: 'Up to ₹2L' },
                      { value: 'Wedding Loan', icon: '💍', sub: 'Up to ₹5L' },
                      { value: 'Emergency Loan', icon: '🚨', sub: 'Up to ₹1L' },
                    ].map(lt => (
                      <label key={lt.value} className={`border-2 rounded-xl p-3 text-center cursor-pointer transition-all ${
                        form.loanType === lt.value ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input type="radio" name="loanType" value={lt.value} onChange={update} className="hidden" required />
                        <div className="text-2xl mb-1">{lt.icon}</div>
                        <div className={`text-xs font-semibold ${form.loanType === lt.value ? 'text-primary' : 'text-gray-700'}`}>{lt.value}</div>
                        <div className="text-xs text-gray-400">{lt.sub}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Loan Amount (₹) <span className="text-red-500">*</span></label>
                    <input type="number" name="loanAmount" value={form.loanAmount} onChange={update} required
                      min="10000" max="500000" step="5000" placeholder="200000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Min: ₹10,000</span><span>Max: ₹5,00,000</span>
                    </div>
                    {form.loanAmount && (
                      <p className="text-primary text-xs font-medium mt-1">
                        ≈ EMI from ₹{Math.round((parseInt(form.loanAmount) * 0.00875 * Math.pow(1.00875, parseInt(form.tenure))) / (Math.pow(1.00875, parseInt(form.tenure)) - 1)).toLocaleString('en-IN')}/month
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Repayment Tenure <span className="text-red-500">*</span></label>
                    <select name="tenure" value={form.tenure} onChange={update}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-white transition-all">
                      {[3,6,12,18,24,36,48].map(m => <option key={m} value={m}>{m} Months</option>)}
                    </select>
                  </div>

                  <SelectField label="Do you have existing loans?" name="existingLoan" value={form.existingLoan} onChange={update} required={false} options={[
                    {value:'no',label:'No existing loans'},{value:'yes-1',label:'Yes — 1 loan'},
                    {value:'yes-2',label:'Yes — 2 loans'},{value:'yes-3+',label:'Yes — 3+ loans'},
                  ]} />

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Purpose of Loan <span className="text-red-500">*</span></label>
                    <textarea name="purpose" value={form.purpose} onChange={update} required rows={3}
                      placeholder="Briefly describe your reason for the loan..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none transition-all" />
                  </div>
                </div>

                {/* Loan Summary box */}
                {form.loanAmount && form.loanType && (
                  <div className="bg-gray-900 rounded-2xl p-6 text-white">
                    <h4 className="font-bold font-heading mb-4 text-sm uppercase tracking-wider text-gray-400">Loan Summary</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: 'Loan Type', value: form.loanType },
                        { label: 'Amount', value: `₹${parseInt(form.loanAmount).toLocaleString('en-IN')}` },
                        { label: 'Tenure', value: `${form.tenure} Months` },
                        { label: 'Est. Rate', value: '10.5% p.a.' },
                      ].map(s => (
                        <div key={s.label}>
                          <p className="text-gray-400 text-xs mb-1">{s.label}</p>
                          <p className="text-white font-semibold text-sm">{s.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-700 mt-4 pt-4 flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Estimated Monthly EMI</span>
                      <span className="text-primary-light font-bold text-xl font-heading">
                        ₹{Math.round((parseInt(form.loanAmount) * 0.00875 * Math.pow(1.00875, parseInt(form.tenure))) / (Math.pow(1.00875, parseInt(form.tenure)) - 1)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ---- STEP 3: DOCUMENTS ---- */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-2">
                  <span>ℹ️</span>
                  <p className="text-blue-700 text-sm">Upload clear, readable copies. Max file size: 5MB each. Accepted formats: PDF, JPG, PNG.</p>
                </div>

                {[
                  { label: 'Aadhaar Card (Front & Back)', name: 'aadhaarFile', required: true, note: 'Both sides in a single file preferred' },
                  { label: 'PAN Card', name: 'panFile', required: true, note: 'Clear photo or scan' },
                  { label: 'Latest 3 Salary Slips', name: 'salarySlip', required: true, note: 'Last 3 months — PDF preferred' },
                  { label: 'Bank Statement (Last 3 Months)', name: 'bankStatement', required: true, note: 'Salary account statement with bank letterhead' },
                  { label: 'Employee ID Card', name: 'empId', required: false, note: 'Optional but speeds up verification' },
                ].map((doc) => (
                  <div key={doc.name} className={`border-2 border-dashed rounded-2xl p-5 hover:border-primary transition-colors ${
                    form[doc.name] ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <label className="cursor-pointer flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        form[doc.name] ? 'bg-primary' : 'bg-white border border-gray-200'
                      }`}>
                        {form[doc.name]
                          ? <FiCheckCircle className="text-white" size={22} />
                          : <FiUpload className="text-gray-400" size={20} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm">
                          {doc.label} {doc.required && <span className="text-red-500">*</span>}
                        </p>
                        {form[doc.name]
                          ? <p className="text-primary text-xs font-medium mt-0.5 truncate">✓ {form[doc.name].name}</p>
                          : <p className="text-gray-400 text-xs mt-0.5">{doc.note}</p>
                        }
                      </div>
                      <input type="file" name={doc.name} onChange={update}
                        accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                        required={doc.required} />
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 ${
                        form[doc.name] ? 'bg-primary/10 text-primary' : 'bg-white border border-gray-200 text-gray-600'
                      }`}>
                        {form[doc.name] ? 'Change' : 'Upload'}
                      </span>
                    </label>
                  </div>
                ))}

                {/* Consent */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 accent-primary w-4 h-4 flex-shrink-0" />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      I hereby consent to SalaryUncle verifying my identity, employment, and financial information. I confirm all details provided are accurate and I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a>.
                    </span>
                  </label>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-green-600 text-lg">🔒</span>
                  <p className="text-green-700 text-xs leading-relaxed">
                    <strong>Your data is 100% safe.</strong> All documents are encrypted with 256-bit SSL. We never share your information with third parties without your consent. RBI data protection guidelines are strictly followed.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Form Footer */}
          <div className="px-8 pb-8 flex items-center justify-between">
            {step > 0 ? (
              <button type="button" onClick={() => { setStep(step - 1); window.scrollTo({top:0,behavior:'smooth'}); }}
                className="flex items-center gap-2 text-gray-600 font-medium text-sm hover:text-gray-900 transition-colors px-4 py-2 rounded-xl hover:bg-gray-100">
                ← Back
              </button>
            ) : <div />}

            <button type="submit" disabled={loading}
              className="btn-primary py-3.5 px-8 text-base disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Submitting...
                </span>
              ) : step === 3 ? (
                <span className="flex items-center gap-2">Submit Application 🚀</span>
              ) : (
                <span className="flex items-center gap-2">Continue <FiArrowRight /></span>
              )}
            </button>
          </div>
        </form>

        {/* Help strip */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <span>Need help filling the form?</span>
          <div className="flex gap-3">
            <a href="tel:+918800123456" className="flex items-center gap-1.5 text-primary font-semibold hover:underline">
              <FiPhone size={14} /> +91 88001 23456
            </a>
            <span>|</span>
            <a href="https://wa.me/918800123456" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-green-600 font-semibold hover:underline">
              📱 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
