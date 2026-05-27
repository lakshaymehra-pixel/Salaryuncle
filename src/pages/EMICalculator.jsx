import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiInfo } from 'react-icons/fi';

function calculateEMI(principal, ratePercent, months) {
  const r = ratePercent / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function EMICalculator() {
  const [amount, setAmount] = useState(200000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(24);

  const emi = useMemo(() => calculateEMI(amount, rate, tenure), [amount, rate, tenure]);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - amount;
  const principalPercent = Math.round((amount / totalPayment) * 100);

  const amortization = useMemo(() => {
    const rows = [];
    let balance = amount;
    const r = rate / 100 / 12;
    for (let i = 1; i <= tenure; i++) {
      const interestPaid = balance * r;
      const principalPaid = emi - interestPaid;
      balance = Math.max(0, balance - principalPaid);
      rows.push({
        month: i,
        emi: emi.toFixed(0),
        principal: principalPaid.toFixed(0),
        interest: interestPaid.toFixed(0),
        balance: balance.toFixed(0),
      });
    }
    return rows;
  }, [amount, rate, tenure, emi]);

  const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Tools</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mt-3 mb-6">EMI Calculator</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Calculate your exact monthly EMI before applying. Fully transparent — no hidden charges.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Inputs */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">Loan Details</h2>

              <div className="space-y-8">
                {/* Amount */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                    <span className="text-primary font-bold">{fmt(amount)}</span>
                  </div>
                  <input
                    type="range" min="10000" max="500000" step="5000"
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>₹10K</span><span>₹5 Lakh</span>
                  </div>
                </div>

                {/* Rate */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Interest Rate (per annum)</label>
                    <span className="text-primary font-bold">{rate}%</span>
                  </div>
                  <input
                    type="range" min="8" max="36" step="0.5"
                    value={rate}
                    onChange={(e) => setRate(+e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>8%</span><span>36%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Loan Tenure</label>
                    <span className="text-primary font-bold">{tenure} Months</span>
                  </div>
                  <input
                    type="range" min="3" max="60" step="3"
                    value={tenure}
                    onChange={(e) => setTenure(+e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>3 Mo</span><span>60 Mo</span>
                  </div>
                </div>
              </div>

              <Link to="/apply" className="btn-primary w-full justify-center mt-8 py-4 text-base">
                Apply for This Loan <FiArrowRight />
              </Link>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* EMI Card */}
              <div className="bg-primary rounded-3xl p-8 text-white">
                <p className="text-primary-100 text-sm mb-2">Monthly EMI</p>
                <p className="text-5xl font-bold font-heading">{fmt(emi)}</p>
                <p className="text-primary-100 text-sm mt-1">per month for {tenure} months</p>
              </div>

              {/* Breakdown */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="font-bold font-heading text-gray-900 mb-6">Loan Breakdown</h3>

                {/* Visual bar */}
                <div className="flex rounded-full overflow-hidden h-4 mb-4">
                  <div className="bg-primary h-full" style={{ width: `${principalPercent}%` }} />
                  <div className="bg-primary/30 h-full flex-1" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-6">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary rounded-full inline-block" /> Principal ({principalPercent}%)</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary/30 rounded-full inline-block" /> Interest ({100 - principalPercent}%)</span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Principal Amount', value: fmt(amount), highlight: false },
                    { label: 'Total Interest', value: fmt(totalInterest), highlight: false },
                    { label: 'Total Payment', value: fmt(totalPayment), highlight: true },
                  ].map((item) => (
                    <div key={item.label} className={`flex justify-between py-3 border-b last:border-0 border-gray-100 ${item.highlight ? 'font-bold' : ''}`}>
                      <span className="text-gray-600 text-sm">{item.label}</span>
                      <span className={item.highlight ? 'text-primary font-bold text-base' : 'text-gray-900 font-semibold text-sm'}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                  <FiInfo className="text-primary flex-shrink-0 mt-0.5" size={14} />
                  <p className="text-xs text-gray-500">Interest rates are indicative. Final rate depends on your profile and eligibility.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Table */}
          <div className="mt-12 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold font-heading text-gray-900 mb-6">Repayment Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 rounded-xl">
                    {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700 first:rounded-l-xl last:rounded-r-xl">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {amortization.slice(0, 12).map((row) => (
                    <tr key={row.month} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-700">{row.month}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₹{Number(row.emi).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-primary">₹{Number(row.principal).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-gray-600">₹{Number(row.interest).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-gray-700">₹{Number(row.balance).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {tenure > 12 && (
                <p className="text-xs text-gray-400 text-center mt-4">Showing first 12 months. Full schedule visible after applying.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
