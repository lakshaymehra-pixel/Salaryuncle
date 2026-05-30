import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiArrowRight } from 'react-icons/fi';

export default function EligibilityChecker() {
  const [form, setForm] = useState({ salary: '', age: '', empType: '', experience: '' });
  const [result, setResult] = useState(null);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const check = (e) => {
    e.preventDefault();
    const sal = parseInt(form.salary);
    const age = parseInt(form.age);
    const exp = parseFloat(form.experience);

    const issues = [];
    if (sal < 20000) issues.push('Salary must be ≥ ₹20,000/month');
    if (age < 21 || age > 58) issues.push('Age must be between 21 and 58 years');
    if (exp < 0.5) issues.push('Minimum 6 months work experience needed');

    if (issues.length === 0) {
      const maxLoan = Math.min(sal * 3, 500000);
      setResult({ eligible: true, maxLoan, issues: [] });
    } else {
      setResult({ eligible: false, maxLoan: 0, issues });
    }
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Instant Check</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2 mb-4">
              Am I Eligible for a Loan?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Check your loan eligibility in 30 seconds. No credit score impact, no obligation.
            </p>

            <div className="space-y-4">
              {[
                { icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>, text: 'No hard credit check — 100% safe' },
                { icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: 'Instant result in under 1 minute' },
                { icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: 'Zero data stored for this check' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-primary flex-shrink-0">{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Checker form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            {!result ? (
              <form onSubmit={check} className="space-y-5">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Quick Eligibility Check</h3>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Net Monthly Salary (₹)</label>
                  <input type="number" name="salary" value={form.salary} onChange={update} required
                    placeholder="e.g. 45000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Your Age (Years)</label>
                  <input type="number" name="age" value={form.age} onChange={update} required
                    placeholder="e.g. 28" min="18" max="65"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Employment Type</label>
                  <select name="empType" value={form.empType} onChange={update} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-white transition-all">
                    <option value="">-- Select --</option>
                    <option value="private">Private Sector</option>
                    <option value="government">Government</option>
                    <option value="psu">PSU / Public Sector</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Work Experience (Years)</label>
                  <select name="experience" value={form.experience} onChange={update} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-white transition-all">
                    <option value="">-- Select --</option>
                    <option value="0.25">Less than 6 months</option>
                    <option value="0.5">6 months – 1 year</option>
                    <option value="1">1 – 2 years</option>
                    <option value="3">2 – 5 years</option>
                    <option value="7">5+ years</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                  Check My Eligibility <FiArrowRight />
                </button>

                <p className="text-xs text-gray-400 text-center">No credit impact • Result in seconds</p>
              </form>
            ) : (
              <div className="text-center">
                {result.eligible ? (
                  <>
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <FiCheckCircle className="text-green-600" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">You're Eligible!</h3>
                    <p className="text-gray-500 text-sm mb-5">Based on your profile, you qualify for a loan up to:</p>
                    <div className="bg-primary rounded-2xl p-5 mb-6">
                      <p className="text-white/70 text-sm mb-1">Maximum Loan Amount</p>
                      <p className="text-4xl font-bold text-white font-heading">
                        ₹{result.maxLoan.toLocaleString('en-IN')}
                      </p>
                      <p className="text-white/60 text-xs mt-1">At 10.5% p.a. | Subject to final verification</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500">Interest Rate</p>
                        <p className="font-bold text-gray-900 text-sm">From 10.5% p.a.</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500">Disbursal Time</p>
                        <p className="font-bold text-gray-900 text-sm">2–4 Hours</p>
                      </div>
                    </div>
                    <Link to="/apply" className="btn-primary w-full justify-center py-4 text-base mb-3">
                      Apply Now — Get Money Today <FiArrowRight className="ml-1" size={14}/>
                    </Link>
                    <button onClick={() => setResult(null)} className="text-gray-400 text-sm hover:text-gray-600 transition-colors flex items-center gap-1 mx-auto">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg> Check again
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <FiXCircle className="text-red-500" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">Not Eligible Yet</h3>
                    <p className="text-gray-500 text-sm mb-5">We found the following issues with your profile:</p>
                    <div className="space-y-3 mb-6 text-left">
                      {result.issues.map((issue) => (
                        <div key={issue} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-3">
                          <FiXCircle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
                          <p className="text-red-700 text-sm">{issue}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 text-left">
                      <p className="text-blue-700 text-sm font-semibold mb-1 flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        Tip
                      </p>
                      <p className="text-blue-600 text-xs">Call us at +91 87960 41166 — our team can help find alternative solutions for your situation.</p>
                    </div>
                    <button onClick={() => setResult(null)} className="btn-outline w-full justify-center">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg> Try Again
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
