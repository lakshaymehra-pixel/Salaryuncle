import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// ── Sidebar ───────────────────────────────────────────────
function Sidebar({ active, onNav, onLogout }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    )},
    { id: 'account', label: 'My Account', icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
    )},
    { id: 'support', label: 'Support', icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    )},
    { id: 'loans', label: 'Loan History', icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
    )},
    { id: 'terms', label: 'Terms and Condition', icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
    )},
    { id: 'privacy', label: 'Privacy Policy', icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    )},
  ];

  return (
    <aside className="w-52 flex-shrink-0 flex flex-col">
      <div className="space-y-1.5">
        {items.map(item => (
          <button key={item.id} onClick={() => onNav(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              active === item.id
                ? 'text-white shadow-md'
                : 'text-white/90 hover:bg-white/10'
            }`}
            style={active === item.id ? {background:'linear-gradient(135deg,#1565c0,#1976d2)'} : {background:'linear-gradient(135deg,#1976d2,#1565c0)'}}>
            {item.icon}
            {item.label}
          </button>
        ))}
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-white/90 hover:bg-white/10 transition-all"
          style={{background:'linear-gradient(135deg,#1976d2,#1565c0)'}}>
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

// ── Profile Registration Dashboard ───────────────────────
function ProfileRegistration({ onCardClick, completedSteps }) {
  const steps = [
    {
      id: 'pan', num: 1, title: 'PAN Authentication',
      desc: 'Please enter your PAN Card number. Your identity is secure with us.',
      icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
    },
    {
      id: 'personal', num: 2, title: 'Personal Information',
      desc: 'Share with us a bit about yourself.',
      icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
    },
    {
      id: 'address', num: 3, title: 'Current Residence Address',
      desc: 'Ensure to provide correct residence address. No Surprise Visits, We Promise.',
      icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
    },
    {
      id: 'income', num: 4, title: 'Income Details',
      desc: 'Share your Income Details.',
      icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
    },
    {
      id: 'selfie', num: 5, title: 'Selfie Upload',
      desc: 'Share your selfie and complete the registration.',
      icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
    },
  ];

  // Mobile OTP verified = 30% base, each of 5 steps adds 14% (30 + 5×14 = 100)
  const progress = Math.min(100, 30 + Math.round((completedSteps.length / steps.length) * 70));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900">Profile Registration</h2>
        <div className="flex items-center gap-2">
          <div className="w-28 h-5 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-500 rounded"
              style={{width:`${progress}%`}} />
          </div>
          <span className="text-sm font-semibold text-gray-600">{progress}%</span>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-6 text-sm text-gray-700">
        Register now to explore a range of tailored services just for you. Once registered, our loan service will be available to meet your financial needs.
      </div>

      {/* 5 Step cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {steps.slice(0, 3).map(step => {
          const done = completedSteps.includes(step.id);
          const isActive = !done && (step.num === 1 || completedSteps.includes(steps[step.num - 2]?.id));
          return (
            <button key={step.id} onClick={() => onCardClick(step.id)}
              className={`text-left p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                done ? 'border-green-400 bg-green-50' :
                isActive ? 'border-transparent text-white shadow-lg' :
                'border-gray-200 bg-white'
              }`}
              style={isActive && !done ? {background:'linear-gradient(135deg,#29b6d4,#1976d2)'} : {}}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  done ? 'bg-green-100 text-green-600' :
                  isActive ? 'bg-white/20 text-white' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {done ? <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> : step.icon}
                </div>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                  done ? 'bg-green-500 text-white' :
                  isActive ? 'bg-white text-primary' :
                  'bg-gray-200 text-gray-500'
                }`}>{step.num}</span>
              </div>
              <h3 className={`font-bold text-sm mb-1 ${isActive && !done ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
              <p className={`text-xs leading-relaxed ${isActive && !done ? 'text-white/80' : 'text-gray-500'}`}>{step.desc}</p>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.slice(3).map(step => {
          const done = completedSteps.includes(step.id);
          return (
            <button key={step.id} onClick={() => onCardClick(step.id)}
              className={`text-left p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                done ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white'
              }`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {done ? <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> : step.icon}
                </div>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{step.num}</span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">{step.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── File Upload Box ───────────────────────────────────────
function FileUpload({ label, hint, file, onFile, accept = 'image/*,.pdf' }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label} *</label>
      {file ? (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {file.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(file)} alt="" className="w-8 h-8 rounded-lg object-cover"/>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-700 truncate">{file.name}</p>
            <p className="text-xs text-green-500">{(file.size/1024).toFixed(0)} KB — Uploaded ✓</p>
          </div>
          <button type="button" onClick={() => onFile(null)}
            className="w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 hover:bg-red-200">✕</button>
        </div>
      ) : (
        <label className="cursor-pointer block">
          <div className="border-2 border-dashed border-gray-200 rounded-xl px-4 py-5 text-center hover:border-primary hover:bg-primary/5 transition-all">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <p className="text-sm font-semibold text-gray-500">Click to upload</p>
            <p className="text-xs text-gray-400 mt-1">{hint}</p>
          </div>
          <input type="file" accept={accept} className="hidden" onChange={e => onFile(e.target.files[0] || null)} />
        </label>
      )}
    </div>
  );
}

// ── Step Modals / Forms ───────────────────────────────────
function StepModal({ stepId, onClose, onComplete }) {
  const [form, setForm] = useState({});
  const [panVerifying, setPanVerifying] = useState(false);
  const [panVerified, setPanVerified] = useState(false);
  const [panError, setPanError] = useState('');
  const [aadhaarVerifying, setAadhaarVerifying] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [aadhaarError, setAadhaarError] = useState('');
  const [panDoc, setPanDoc]         = useState(null);
  const [aadhaarF, setAadhaarF]     = useState(null);
  const [aadhaarB, setAadhaarB]     = useState(null);
  const [salarySlip, setSalarySlip] = useState(null);
  const [bankStmt, setBankStmt]     = useState(null);
  const [selfie, setSelfie]         = useState(null);

  const set = (k, v) => setForm(p => ({...p, [k]: v}));
  const update = e => set(e.target.name, e.target.value);

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';
  const sel = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-white';

  // PAN format: 5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)
  const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  // Aadhaar: 12 digits, first digit non-zero
  const AADHAAR_REGEX = /^[1-9][0-9]{11}$/;

  const verifyPAN = async () => {
    setPanError('');
    const pan = (form.pan || '').toUpperCase().trim();
    if (!PAN_REGEX.test(pan)) {
      setPanError('Invalid PAN format. Must be like ABCDE1234F.');
      return;
    }
    if (!form.panName || !form.panName.trim()) {
      setPanError('Please enter your full name as per PAN card.');
      return;
    }
    setPanVerifying(true);
    await new Promise(r => setTimeout(r, 1500));
    const name = form.panName.trim().toUpperCase();
    set('panName', name);
    set('fullName', name);
    setPanVerified(true);
    setPanVerifying(false);
  };

  const verifyAadhaar = async () => {
    setAadhaarError('');
    const aadhaar = (form.aadhaar || '').replace(/\s/g,'');
    if (!AADHAAR_REGEX.test(aadhaar)) {
      setAadhaarError('Invalid Aadhaar number. Must be 12 digits, starting with non-zero.');
      return;
    }
    if (!form.fullName || !form.fullName.trim()) {
      setAadhaarError('Please enter your full name as per Aadhaar card.');
      return;
    }
    setAadhaarVerifying(true);
    await new Promise(r => setTimeout(r, 1500));
    set('fullName', form.fullName.trim().toUpperCase());
    setAadhaarVerified(true);
    setAadhaarVerifying(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onComplete(stepId, form);
    onClose();
  };

  const titles = {
    pan: 'PAN Authentication',
    personal: 'Personal Information',
    address: 'Current Residence Address',
    income: 'Income Details',
    selfie: 'Selfie Upload',
  };

  const content = {
    pan: (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Upload PAN image */}
        <FileUpload label="Upload PAN Card" hint="JPG, PNG or PDF • Max 5MB"
          file={panDoc} onFile={setPanDoc} />

        {/* PAN number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">PAN Card Number *</label>
          <div className="flex gap-2">
            <input name="pan" value={form.pan||''} onChange={e => { update(e); setPanVerified(false); setPanError(''); }}
              placeholder="ABCDE1234F" maxLength={10}
              style={{textTransform:'uppercase'}}
              className={inp + ' flex-1'} />
            <button type="button" onClick={verifyPAN}
              disabled={!form.pan || form.pan.length!==10 || !form.panName?.trim() || panVerifying || panVerified}
              className="px-4 py-3 rounded-xl text-white text-sm font-semibold flex-shrink-0 disabled:opacity-40 transition-all"
              style={{background: panVerified ? '#16a34a' : 'linear-gradient(135deg,#29b6d4,#1976d2)'}}>
              {panVerifying ? (
                <span className="flex items-center gap-1.5">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/></svg>
                  Verifying
                </span>
              ) : panVerified ? '✓ Done' : 'Verify'}
            </button>
          </div>
          {panError && <p className="text-xs text-red-500 mt-1 font-medium">⚠ {panError}</p>}
          {!panError && <p className="text-xs text-gray-400 mt-1">Enter valid PAN (e.g. ABCDE1234F) &amp; your name below, then Verify.</p>}
        </div>

        {/* Auto-fetched name */}
        {panVerified && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <p className="text-xs text-green-600 font-semibold">Name fetched from PAN ✓</p>
              <p className="text-base font-bold text-green-800">{form.panName}</p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Full Name (as per PAN) *
          </label>
          <input name="panName" value={form.panName||''} onChange={update}
            placeholder="Enter or verify PAN to auto-fill" required
            className={inp + (panVerified ? ' border-green-300 bg-green-50/50 text-green-900 font-semibold' : '')} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth *</label>
          <input name="dob" type="date" value={form.dob||''} onChange={update} required className={inp}/>
        </div>

        <button type="submit" disabled={!panVerified || !form.dob}
          className="w-full py-3.5 rounded-xl text-white font-semibold disabled:opacity-50"
          style={{background:'linear-gradient(135deg,#29b6d4,#1976d2)'}}>
          Save & Continue
        </button>
      </form>
    ),

    personal: (
      <form onSubmit={handleSubmit} className="space-y-4">
        <FileUpload label="Aadhaar Card — Front" hint="JPG, PNG or PDF • Max 5MB"
          file={aadhaarF} onFile={setAadhaarF} />
        <FileUpload label="Aadhaar Card — Back" hint="JPG, PNG or PDF • Max 5MB"
          file={aadhaarB} onFile={setAadhaarB} />

        {/* Aadhaar number + verify */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Aadhaar Number *</label>
          <div className="flex gap-2">
            <input name="aadhaar" value={form.aadhaar||''}
              onChange={e => { set('aadhaar', e.target.value.replace(/\D/g,'').slice(0,12)); setAadhaarVerified(false); setAadhaarError(''); }}
              placeholder="1234 5678 9012" maxLength={12}
              className={inp + ' flex-1'} />
            <button type="button" onClick={verifyAadhaar}
              disabled={!form.aadhaar || form.aadhaar.length!==12 || !form.fullName?.trim() || aadhaarVerifying || aadhaarVerified}
              className="px-4 py-3 rounded-xl text-white text-sm font-semibold flex-shrink-0 disabled:opacity-40 transition-all"
              style={{background: aadhaarVerified ? '#16a34a' : 'linear-gradient(135deg,#29b6d4,#1976d2)'}}>
              {aadhaarVerifying ? (
                <span className="flex items-center gap-1.5">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/></svg>
                  Verifying
                </span>
              ) : aadhaarVerified ? '✓ Done' : 'Verify'}
            </button>
          </div>
          {aadhaarError && <p className="text-xs text-red-500 mt-1 font-medium">⚠ {aadhaarError}</p>}
          {!aadhaarError && <p className="text-xs text-gray-400 mt-1">Enter 12-digit Aadhaar &amp; your name below, then Verify.</p>}
        </div>

        {/* Auto-fetched name */}
        {aadhaarVerified && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <p className="text-xs text-green-600 font-semibold">Name fetched from Aadhaar ✓</p>
              <p className="text-base font-bold text-green-800">{form.fullName}</p>
            </div>
          </div>
        )}

        {[
          {name:'fullName', label:'Full Name', ph:'Rajesh Kumar'},
          {name:'email',    label:'Email Address', ph:'rajesh@gmail.com', type:'email'},
          {name:'gender',   label:'Gender',    select:['Male','Female','Other']},
          {name:'marital',  label:'Marital Status', select:['Single','Married','Divorced']},
          {name:'education',label:'Education', select:['10th/12th','Graduate','Post Graduate','Others']},
        ].map(f => {
          const autoFilled = aadhaarVerified && f.name === 'fullName';
          const greenCls = autoFilled ? ' border-green-300 bg-green-50/60 text-green-900 font-semibold' : '';
          return (
            <div key={f.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {f.label} *
                {autoFilled && <span className="ml-2 text-xs font-normal text-green-600">✓ Fetched from Aadhaar</span>}
              </label>
              {f.select
                ? <select name={f.name} value={form[f.name]||''} onChange={update} required className={sel + greenCls}>
                    <option value="">Select</option>
                    {f.select.map(o=><option key={o}>{o}</option>)}
                  </select>
                : <input name={f.name} type={f.type||'text'} value={form[f.name]||''} placeholder={f.ph} onChange={update} required className={inp + greenCls}/>
              }
            </div>
          );
        })}
        <button type="submit" disabled={!aadhaarF || !aadhaarB || !aadhaarVerified}
          className="w-full py-3.5 rounded-xl text-white font-semibold disabled:opacity-50"
          style={{background:'linear-gradient(135deg,#29b6d4,#1976d2)'}}>
          Save & Continue
        </button>
      </form>
    ),

    address: (
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          {name:'addr1',   label:'Address Line 1', ph:'House No., Building Name'},
          {name:'addr2',   label:'Address Line 2', ph:'Street, Area'},
          {name:'city',    label:'City', ph:'New Delhi'},
          {name:'state',   label:'State', select:['Delhi','Maharashtra','Karnataka','Tamil Nadu','Uttar Pradesh','Gujarat','Rajasthan','Others']},
          {name:'pincode', label:'PIN Code', ph:'110001'},
          {name:'addrType',label:'Residence Type', select:['Owned','Rented']},
        ].map(f => (
          <div key={f.name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label} *</label>
            {f.select
              ? <select name={f.name} value={form[f.name]||''} onChange={update} required className={sel}><option value="">Select</option>{f.select.map(o=><option key={o}>{o}</option>)}</select>
              : <input name={f.name} value={form[f.name]||''} placeholder={f.ph} onChange={update} required className={inp}/>
            }
          </div>
        ))}
        <button type="submit"
          className="w-full py-3.5 rounded-xl text-white font-semibold"
          style={{background:'linear-gradient(135deg,#29b6d4,#1976d2)'}}>
          Save & Continue
        </button>
      </form>
    ),

    income: (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 font-medium">
          📂 Upload salary slip & bank statement for income verification
        </div>
        <FileUpload label="Latest Salary Slip (Last 3 months)" hint="JPG, PNG or PDF • Max 5MB"
          file={salarySlip} onFile={setSalarySlip} accept="image/*,.pdf" />
        <FileUpload label="Bank Statement (Last 6 months)" hint="PDF preferred • Max 10MB"
          file={bankStmt} onFile={setBankStmt} accept="image/*,.pdf" />
        {[
          {name:'empType',    label:'Employment Type',  select:['Salaried - Private','Salaried - Government','Salaried - PSU']},
          {name:'company',    label:'Company Name',     ph:'Tata Consultancy Services'},
          {name:'companyEmail',label:'Company Email ID', ph:'rajesh@company.com', type:'email'},
          {name:'designation',label:'Designation',      ph:'Software Engineer'},
          {name:'salary',     label:'Net Monthly Salary (₹)', ph:'50000', type:'number'},
          {name:'bankName',   label:'Bank Name',        select:['SBI','HDFC Bank','ICICI Bank','Axis Bank','Kotak Bank','Other']},
          {name:'accountNo',  label:'Account Number',   ph:'XXXXXXXXXX'},
          {name:'ifsc',       label:'IFSC Code',        ph:'HDFC0001234'},
        ].map(f => (
          <div key={f.name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label} *</label>
            {f.select
              ? <select name={f.name} value={form[f.name]||''} onChange={update} required className={sel}><option value="">Select</option>{f.select.map(o=><option key={o}>{o}</option>)}</select>
              : <input name={f.name} type={f.type||'text'} value={form[f.name]||''} placeholder={f.ph} onChange={update} required className={inp}/>
            }
          </div>
        ))}
        <button type="submit" disabled={!salarySlip || !bankStmt}
          className="w-full py-3.5 rounded-xl text-white font-semibold disabled:opacity-50"
          style={{background:'linear-gradient(135deg,#29b6d4,#1976d2)'}}>
          Save & Continue
        </button>
      </form>
    ),

    selfie: (
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-center">
          {selfie ? (
            <div className="relative inline-block">
              <img src={URL.createObjectURL(selfie)} alt="Selfie" className="w-40 h-40 rounded-full object-cover border-4 border-primary mx-auto" />
              <button type="button" onClick={() => setSelfie(null)} className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full text-xs font-bold">✕</button>
            </div>
          ) : (
            <label className="cursor-pointer block">
              <div className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center mx-auto hover:border-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <span className="text-xs text-gray-400">Upload Selfie</span>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={e => setSelfie(e.target.files[0]||null)} />
            </label>
          )}
          <p className="text-xs text-gray-500 mt-3">Clear, front-facing photo in good lighting.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
          <span className="flex items-center gap-1.5"><svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Your selfie is used for live face verification only. Encrypted &amp; stored securely.</span>
        </div>
        <button type="submit" disabled={!selfie}
          className="w-full py-3.5 rounded-xl text-white font-semibold disabled:opacity-50"
          style={{background:'linear-gradient(135deg,#29b6d4,#1976d2)'}}>
          Complete Registration
        </button>
      </form>
    ),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="px-6 pt-6 pb-2 flex items-center justify-between border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{titles[stepId]}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">✕</button>
        </div>
        <div className="p-6">{content[stepId]}</div>
      </div>
    </div>
  );
}

// ── My Account ───────────────────────────────────────────
function MyAccount({ phone, profileData, completedSteps, onCardClick }) {
  const steps = ['pan','personal','address','income','selfie'];
  const progress = Math.min(100, 30 + Math.round((completedSteps.length / steps.length) * 70));

  const d = profileData;
  const na = 'NA';

  const basicRows = [
    { label: 'Your Name',      value: d.fullName || d.panName || na },
    { label: 'Gender',         value: d.gender   || na },
    { label: 'DOB',            value: d.dob      || na },
    { label: 'Marital Status', value: d.marital  || na },
    { label: 'Personal Email', value: d.email    || na },
  ];
  const addressRows = [
    { label: 'Address 1',      value: d.addr1    || na },
    { label: 'Address 2',      value: d.addr2    || na },
    { label: 'Residence Type', value: d.addrType || na },
    { label: 'Landmark',       value: d.city     || na },
    { label: 'Pincode',        value: d.pincode  || na },
  ];
  const incomeRows = [
    { label: 'Employment Type',     value: d.empType    || na },
    { label: 'Salary Date',         value: na },
    { label: 'Monthly Income',      value: d.salary ? `₹${d.salary}` : na },
    { label: 'Mode Income Received', value: d.bankName  || na },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Check Eligibility for Further Process</h2>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-semibold text-gray-700">Profile Registration</span>
        <div className="flex-1 max-w-xs h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{width:`${progress}%`, background:'linear-gradient(90deg,#22c55e,#16a34a)'}} />
        </div>
        <span className="text-sm font-bold text-gray-600">{progress}%</span>
      </div>

      {/* Info banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-xs text-gray-600 mb-5">
        Register now to explore a range of tailored services just for you. Once registered, our loan service will be available to meet your financial needs.
      </div>

      {/* Profile card */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 flex items-start justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex gap-2">
              <span className="text-blue-600 font-semibold w-20 flex-shrink-0">Name:</span>
              <span className="text-gray-800 font-semibold">{d.fullName || d.panName || na}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-600 font-semibold w-20 flex-shrink-0">PAN Card:</span>
              <span className="text-gray-800">{d.pan ? d.pan.toUpperCase() : na}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-600 font-semibold w-20 flex-shrink-0">Mobile:</span>
              <span className="text-gray-800">{phone}</span>
            </div>
          </div>
        </div>
        <button onClick={() => onCardClick('pan')}
          className="flex-shrink-0 px-5 py-2 rounded-full text-white text-sm font-semibold"
          style={{background:'linear-gradient(135deg,#29b6d4,#1976d2)'}}>
          Check Eligibility
        </button>
      </div>

      {/* Italic quote */}
      <p className="text-xs text-gray-500 italic mb-5 px-1">
        Don't let uncertainty hold you back. It's time to explore the possibilities.
      </p>

      {/* 3 detail sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Basic Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">Basic Details</h3>
          <div className="space-y-2">
            {basicRows.map(r => (
              <div key={r.label} className="flex justify-between gap-2 text-xs">
                <span className="text-gray-500 flex-shrink-0">{r.label}</span>
                <span className={`font-semibold text-right ${r.value === na ? 'text-gray-400' : 'text-gray-800'}`}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Residence Address */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">Residence Address</h3>
          <div className="space-y-2">
            {addressRows.map(r => (
              <div key={r.label} className="flex justify-between gap-2 text-xs">
                <span className="text-gray-500 flex-shrink-0">{r.label}</span>
                <span className={`font-semibold text-right ${r.value === na ? 'text-gray-400' : 'text-gray-800'}`}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Income Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">Income Details</h3>
          <div className="space-y-2">
            {incomeRows.map(r => (
              <div key={r.label} className="flex justify-between gap-2 text-xs">
                <span className="text-gray-500 flex-shrink-0">{r.label}</span>
                <span className={`font-semibold text-right ${r.value === na ? 'text-gray-400' : 'text-gray-800'}`}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Loan History ──────────────────────────────────────────
function LoanHistory({ phone, profileData }) {
  const d = profileData || {};
  return (
    <div>
      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          <div className="space-y-1 text-sm">
            <div className="flex gap-3"><span className="text-blue-600 font-semibold w-20">Name:</span><span className="text-gray-700">{d.fullName || d.panName || 'NA'}</span></div>
            <div className="flex gap-3"><span className="text-blue-600 font-semibold w-20">PAN Card:</span><span className="text-gray-700">{d.pan ? d.pan.toUpperCase() : 'NA'}</span></div>
            <div className="flex gap-3"><span className="text-blue-600 font-semibold w-20">Mobile:</span><span className="text-gray-700">{phone}</span></div>
          </div>
        </div>
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-sm text-gray-600 italic">
          Don't let uncertainty hold you back. It's time to explore the possibilities.
        </div>
      </div>
      <div className="text-center py-16 text-gray-400">
        <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" strokeWidth="1"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        <p className="font-medium">No loan history found.</p>
        <p className="text-sm mt-1">Complete your profile registration to apply for a loan.</p>
      </div>
    </div>
  );
}

// ── Support ───────────────────────────────────────────────
function Support() {
  const [form, setForm] = useState({name:'',email:'',phone:'',type:'',msg:''});
  const [sent, setSent] = useState(false);
  const update = e => setForm({...form,[e.target.name]:e.target.value});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left — contact info */}
      <div className="rounded-2xl text-white p-8" style={{background:'linear-gradient(135deg,#1565c0,#1976d2)'}}>
        <h2 className="text-xl font-bold mb-1">Contact <span style={{color:'#ffc107'}}>Salary</span></h2>
        <h2 className="text-xl font-bold mb-1" style={{color:'#ffc107'}}>Uncle</h2>
        <p className="text-blue-100 text-sm mb-8">Need help? We're here for you.</p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <p className="font-semibold text-sm mb-0.5">Our Address</p>
              <p className="text-blue-100 text-xs leading-relaxed">Office No-118, First Floor, NN Mall, Mangolpuri, Delhi-110085</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.25a16 16 0 006.29 6.29l.75-.75a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div>
              <p className="font-semibold text-sm mb-0.5">Customer Support</p>
              <p className="text-blue-100 text-xs">+91 93557 53533</p>
              <p className="text-blue-100 text-xs">Monday – Saturday, 9 AM to 6 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <p className="font-semibold text-sm mb-0.5">Email Support</p>
              <p className="text-blue-100 text-xs">support@salaryuncle.com</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold mb-3">Get in Touch</p>
          <div className="flex gap-3">
            {['F','T','I','in'].map(s => (
              <div key={s} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-white/30 transition-colors">{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">We're Here</h3>
        <p className="text-gray-500 text-sm mb-6">We'd love to hear from you – send us a message.</p>

        {sent ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="font-bold text-gray-900">Message Sent!</p>
            <p className="text-gray-500 text-sm mt-1">We'll get back within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                <input name="name" value={form.name} onChange={update} placeholder="Enter your full name" required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
                <input name="email" type="email" value={form.email} onChange={update} placeholder="Enter your email" required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number *</label>
                <input name="phone" type="tel" value={form.phone} onChange={update} placeholder="Enter your Phone No." required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Inquiry Type *</label>
                <select name="type" value={form.type} onChange={update} required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-white">
                  <option value="">Select Inquiry Type</option>
                  <option>Loan Application</option><option>EMI Issue</option><option>Document Upload</option><option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Your Message *</label>
              <textarea name="msg" value={form.msg} onChange={update} rows={4} placeholder="Type your message here..." required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
            </div>
            <button type="submit" className="w-full py-3 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-2"
              style={{background:'#ffc107',color:'#000'}}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Terms ─────────────────────────────────────────────────
function Terms() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Terms and Conditions</h2>
      <p className="text-center text-sm text-gray-500 mb-6">Powered by Baid Stock Broking Services Private Limited.</p>
      <p className="text-sm text-gray-600 mb-6">If you visit our website and use our services, you agree to be bound by the following terms and conditions.</p>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Please Read Carefully All Terms & Conditions</h3>
      {[
        {
          title: '1. Eligibility Criteria',
          items: [
            '<b>Age Requirement:</b> You must be at least 18 years of age to apply for a loan.',
            '<b>Residency Requirement:</b> You must be a legal resident of the country.',
            '<b>Bank Account Requirement:</b> You must have a bank account in your name in the country where you live.',
          ]
        },
        {
          title: '2. Loan Application Process',
          items: [
            '<b>How to Apply:</b> To apply for a loan, visit the website, click on "Apply Now," and complete the online application process.',
            '<b>Required Documentation:</b> You may need to provide the following: Latest 3-month salary slip & latest 6-month bank statement, Aadhaar card (front and back) and PAN card, Electricity bill (of own house or rented) and rent agreement.',
          ]
        },
        {
          title: '3. Loan Approval and Disbursement',
          items: [
            '<b>Approval Process:</b> Once we evaluate your application and documentation; if approved, you will receive a loan offer.',
            '<b>Disbursement Timeline:</b> Upon approval, the loan will be processed and disbursed. Approval and disbursement times may vary based on completeness and accuracy of your application.',
          ]
        },
        {
          title: '4. Repayment & Interest Rate Terms',
          items: [
            '<b>Repayment Schedule:</b> Repayments will be made based on the agreed schedule. Failure to repay on time may result in penalties.',
            '<b>Interest Rates:</b> Loan interest rates will be disclosed in the loan agreement, which is 1% per day.',
            '<b>Late Payments and Penalties:</b> Late payments may incur additional fees.',
            '<b>No Hidden Fees:</b> We are committed to transparency. All fees and charges will be clearly disclosed before you accept any loan offer.',
          ]
        },
        {
          title: '5. Prohibited Activities',
          items: [
            '<b>Fraudulent Activities:</b> You agree not to engage in any fraudulent activities or misrepresent your identity during the loan process.',
            '<b>Legal Compliance:</b> You must comply with all local laws and regulations while using our services.',
          ]
        },
        {
          title: '6. Privacy Policy',
          items: [
            '<b>Data Collection:</b> We collect personal and financial information during the loan application process to evaluate eligibility.',
            '<b>Data Usage:</b> Your data will only be used for processing your loan application and providing customer support.',
            '<b>Data Protection:</b> We take data security seriously and protect your personal information from unauthorized access.',
          ]
        },
        {
          title: '7. Termination of Services',
          items: [
            '<b>Grounds for Termination:</b> We reserve the right to terminate services for violation of these terms, non-payment of loan, or any other breach.',
            '<b>Process of Termination:</b> If services are terminated, you will be notified and all outstanding obligations must be fulfilled.',
          ]
        },
        {
          title: '8. Limitation of Liability',
          items: [
            '<b>Scope of Liability:</b> Our liability is limited to the maximum extent permitted by law.',
            '<b>Exclusion of Indirect Damages:</b> We are not responsible for damages resulting from delays, loss of profits, or other consequences.',
            '<b>Maximum Liability:</b> The maximum liability we are responsible for is limited to the total amount of the loan you applied for.',
          ]
        },
      ].map(section => (
        <div key={section.title} className="mb-6">
          <h4 className="font-bold text-gray-900 mb-2">{section.title}</h4>
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{__html: item}} />
            ))}
          </ul>
        </div>
      ))}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-bold text-gray-900 mb-2">Contact Us</h4>
        <p className="text-sm text-gray-600">Email: <a href="mailto:support@salaryuncle.com" className="text-primary">support@salaryuncle.com</a></p>
        <p className="text-sm text-gray-600">Phone: <a href="tel:+919355753533" className="text-primary">+91 93557 53533</a></p>
      </div>
      <p className="text-xs text-gray-500 mt-6 leading-relaxed">By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. Failure to do so may result in you being held accountable for any losses.</p>
    </div>
  );
}

// ── Privacy Policy ────────────────────────────────────────
function Privacy() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Privacy Policy</h2>
      {[
        { title: '1. Information We Collect', body: 'We collect personal information including your name, mobile number, email address, PAN, Aadhaar, employment details, bank account information, and financial data necessary to process your loan application.' },
        { title: '2. How We Use Your Information', body: 'Your information is used to process loan applications, verify your identity, assess creditworthiness, communicate with you about your loan, and comply with legal and regulatory requirements.' },
        { title: '3. Data Security', body: 'All data transmitted between your device and our servers is protected with 256-bit SSL encryption. We follow RBI data protection guidelines and employ bank-grade security measures.' },
        { title: '4. Data Sharing', body: 'We do not sell your personal data to third parties. We may share your information with credit bureaus, banking partners, and regulatory authorities as required by law.' },
        { title: '5. Data Retention', body: 'We retain your data for as long as your account is active or as required by law. You may request deletion of your account and associated data by contacting our support team.' },
        { title: '6. Your Rights', body: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by contacting us.' },
        { title: '7. Cookies', body: 'We use cookies to improve your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.' },
        { title: '8. Contact Us', body: 'For privacy-related queries, contact us at support@salaryuncle.com or call +91 93557 53533.' },
      ].map(s => (
        <div key={s.title} className="mb-5">
          <h4 className="font-bold text-gray-900 mb-1.5">{s.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
        </div>
      ))}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard');
  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [profileData, setProfileData] = useState({});
  const phone = sessionStorage.getItem('su_phone') || '9999999999';

  useEffect(() => {
    if (!sessionStorage.getItem('su_auth')) navigate('/apply');
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('su_auth');
    sessionStorage.removeItem('su_phone');
    navigate('/');
  };

  const handleComplete = (stepId, formData) => {
    setCompletedSteps(prev => prev.includes(stepId) ? prev : [...prev, stepId]);
    setProfileData(prev => ({ ...prev, ...formData }));
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <ProfileRegistration onCardClick={setActiveStep} completedSteps={completedSteps} />;
      case 'account':   return <MyAccount phone={phone} profileData={profileData} completedSteps={completedSteps} onCardClick={setActiveStep} />;
      case 'loans':     return <LoanHistory phone={phone} profileData={profileData} />;
      case 'support':   return <Support />;
      case 'terms':     return <Terms />;
      case 'privacy':   return <Privacy />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navbar */}
      <header className="text-white px-6 py-3 flex items-center justify-between shadow-md"
        style={{background:'linear-gradient(135deg,#1565c0 0%,#1976d2 50%,#1e88e5 100%)'}}>
        <button className="text-white">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Diagonal logo lines */}
        <div className="flex-1 flex justify-center">
          <div className="flex gap-0.5 opacity-40">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="w-1 bg-white rounded" style={{height:`${14+i*4}px`,transform:'skewX(-15deg)'}} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
          <span className="text-white text-sm font-semibold">
            Hi, {profileData.fullName || profileData.panName || phone.slice(-4)}
          </span>
          <div className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="p-4 flex-shrink-0" style={{background:'#f0f4ff'}}>
          <Sidebar active={activePage} onNav={setActivePage} onLogout={handleLogout} />
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Modal */}
      {activeStep && (
        <StepModal stepId={activeStep} onClose={() => setActiveStep(null)} onComplete={handleComplete} />
      )}

      {/* WhatsApp */}
      <a href="https://wa.me/918796041166" target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-colors z-40">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>
    </div>
  );
}
