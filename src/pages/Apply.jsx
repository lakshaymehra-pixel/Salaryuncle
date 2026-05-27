import { useState } from 'react';
import { FiCheckCircle, FiArrowRight, FiUser, FiBriefcase, FiDollarSign, FiUpload } from 'react-icons/fi';

const steps = ['Personal Info', 'Employment', 'Loan Details', 'Documents'];

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', dob: '', pan: '', aadhaar: '',
    employer: '', designation: '', experience: '', empType: 'private',
    salary: '', bankAccount: '', ifsc: '',
    loanType: 'salary-advance', loanAmount: '', tenure: '12', purpose: '',
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-12 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-primary" size={40} />
          </div>
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-2">
            Your loan application has been received successfully. Our team will review and contact you within <strong className="text-primary">2 hours</strong>.
          </p>
          <p className="text-gray-500 text-sm mb-8">Application ID: <strong className="text-gray-900">SU-{Date.now().toString().slice(-8)}</strong></p>
          <div className="bg-gray-50 rounded-2xl p-5 text-left mb-8 space-y-2 border border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-3 text-sm">What happens next?</h4>
            {[
              'Document verification (15-30 minutes)',
              'Credit assessment and approval',
              'Loan agreement sent via email and WhatsApp',
              'Money credited to your bank account',
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-5 h-5 bg-primary rounded-full text-white text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <a href="tel:+918800123456" className="btn-primary w-full justify-center py-4 text-base">
            Call Us: +91 88001 23456
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Apply Online</span>
          <h1 className="text-4xl font-bold font-heading text-white mt-3 mb-4">Quick Loan Application</h1>
          <p className="text-gray-400">Complete in 5 minutes. Get approval within 2 hours.</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          {/* Steps */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                    i < currentStep ? 'bg-primary border-primary text-white' :
                    i === currentStep ? 'bg-white border-primary text-primary' :
                    'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {i < currentStep ? <FiCheckCircle size={18} /> : i + 1}
                  </div>
                  <span className={`text-xs mt-2 font-medium hidden sm:block ${i === currentStep ? 'text-primary' : 'text-gray-400'}`}>{step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all ${i < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            {/* Step 0 - Personal */}
            {currentStep === 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FiUser className="text-primary" size={20} />
                  </div>
                  <h2 className="text-xl font-bold font-heading text-gray-900">Personal Information</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name (as per Aadhaar)', name: 'fullName', type: 'text', required: true },
                    { label: 'Email Address', name: 'email', type: 'email', required: true },
                    { label: 'Mobile Number', name: 'phone', type: 'tel', required: true },
                    { label: 'Date of Birth', name: 'dob', type: 'date', required: true },
                    { label: 'PAN Number', name: 'pan', type: 'text', required: true },
                    { label: 'Aadhaar Number', name: 'aadhaar', type: 'text', required: true },
                  ].map((f) => (
                    <div key={f.name} className={f.name === 'fullName' ? 'sm:col-span-2' : ''}>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">{f.label}</label>
                      <input
                        type={f.type} name={f.name} value={form[f.name]}
                        onChange={update} required={f.required}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1 - Employment */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FiBriefcase className="text-primary" size={20} />
                  </div>
                  <h2 className="text-xl font-bold font-heading text-gray-900">Employment Details</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Employment Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'private', label: 'Private Sector' },
                        { value: 'government', label: 'Government' },
                        { value: 'psu', label: 'PSU' },
                      ].map((opt) => (
                        <label key={opt.value} className={`border-2 rounded-xl p-3 text-center cursor-pointer transition-all ${
                          form.empType === opt.value ? 'border-primary bg-primary/5 text-primary font-semibold' : 'border-gray-200 text-gray-600'
                        }`}>
                          <input type="radio" name="empType" value={opt.value} onChange={update} className="hidden" />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  {[
                    { label: 'Company / Employer Name', name: 'employer' },
                    { label: 'Current Designation', name: 'designation' },
                    { label: 'Work Experience (years)', name: 'experience' },
                    { label: 'Net Monthly Salary (₹)', name: 'salary' },
                    { label: 'Bank Account Number', name: 'bankAccount' },
                    { label: 'IFSC Code', name: 'ifsc' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">{f.label}</label>
                      <input
                        type="text" name={f.name} value={form[f.name]}
                        onChange={update} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 - Loan */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FiDollarSign className="text-primary" size={20} />
                  </div>
                  <h2 className="text-xl font-bold font-heading text-gray-900">Loan Details</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Loan Type</label>
                    <select name="loanType" value={form.loanType} onChange={update}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary">
                      <option value="salary-advance">Salary Advance Loan</option>
                      <option value="medical">Medical Emergency Loan</option>
                      <option value="education">Education Loan</option>
                      <option value="home-renovation">Home Renovation Loan</option>
                      <option value="travel">Travel Loan</option>
                      <option value="wedding">Wedding Loan</option>
                      <option value="two-wheeler">Two-Wheeler Loan</option>
                      <option value="gadget">Gadget & Electronics Loan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Loan Amount (₹)</label>
                    <input type="number" name="loanAmount" value={form.loanAmount} onChange={update} required
                      placeholder="e.g., 200000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Repayment Tenure</label>
                    <select name="tenure" value={form.tenure} onChange={update}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary">
                      {[3, 6, 12, 18, 24, 36, 48].map((m) => (
                        <option key={m} value={m}>{m} Months</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Purpose of Loan</label>
                    <textarea name="purpose" value={form.purpose} onChange={update} rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary resize-none"
                      placeholder="Briefly describe why you need this loan..." />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Documents */}
            {currentStep === 3 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FiUpload className="text-primary" size={20} />
                  </div>
                  <h2 className="text-xl font-bold font-heading text-gray-900">Upload Documents</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Aadhaar Card (Front & Back)', note: 'PDF or JPG, max 5MB' },
                    { label: 'PAN Card', note: 'PDF or JPG, max 5MB' },
                    { label: 'Latest 3 Salary Slips', note: 'PDF only, max 10MB' },
                    { label: '3 Months Bank Statement', note: 'PDF only, max 10MB' },
                    { label: 'Employment ID Card', note: 'PDF or JPG, max 5MB' },
                  ].map((doc) => (
                    <div key={doc.label} className="border-2 border-dashed border-gray-200 rounded-2xl p-5 hover:border-primary transition-colors cursor-pointer">
                      <label className="cursor-pointer flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FiUpload className="text-gray-400" size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{doc.label}</p>
                          <p className="text-gray-400 text-xs">{doc.note}</p>
                        </div>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                        <span className="text-primary text-sm font-medium">Upload</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 flex items-start gap-2">
                    <span>🔒</span>
                    Your documents are encrypted with 256-bit SSL and stored securely. We never share them without your consent.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {currentStep > 0 ? (
                <button type="button" onClick={() => setCurrentStep(currentStep - 1)}
                  className="btn-outline py-3 px-6">
                  ← Back
                </button>
              ) : <div />}

              <button type="submit" className="btn-primary py-3 px-8">
                {currentStep === 3 ? 'Submit Application' : 'Continue'} <FiArrowRight />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
