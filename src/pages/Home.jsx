import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCheckCircle, FiClock, FiShield, FiTrendingUp, FiUsers,
  FiStar, FiArrowRight, FiChevronDown, FiZap, FiAward,
  FiFileText, FiDollarSign, FiPhone, FiCreditCard
} from 'react-icons/fi';
import EligibilityChecker from '../components/EligibilityChecker';

// ---------- TICKER ----------
function Ticker() {
  const items = [
    '✅ Rajesh from Delhi got ₹2L in 3 hrs',
    '🚀 Priya from Mumbai approved in 45 mins',
    '💰 Amit from Bangalore received ₹5L today',
    '⚡ Sunita from Hyderabad — loan disbursed!',
    '🎉 Vikram from Chandigarh got instant approval',
    '💸 Meena from Pune — ₹1L in 2 hours',
    '✅ Rohit from Chennai — salary advance approved',
  ];
  return (
    <div className="bg-primary/10 border-y border-primary/20 py-2.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-12" style={{animation:'marquee 25s linear infinite'}}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm text-primary font-medium flex-shrink-0">{item}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

// ---------- QUICK LOAN CARD (dynamic) ----------
function QuickLoanCard() {
  const [amount, setAmount] = useState(200000);
  const [tenure, setTenure] = useState(12);
  const rate = 10.5;

  const r = rate / 100 / 12;
  const emi = Math.round((amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1));
  const total = emi * tenure;
  const interest = total - amount;
  const principalPct = Math.round((amount / total) * 100);

  const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-sm">
      <style>{`
        .qlc-range { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:9999px; outline:none; cursor:pointer; }
        .qlc-range::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:18px; height:18px; border-radius:50%; background:#608D4B; border:2px solid white; box-shadow:0 1px 4px rgba(0,0,0,0.2); cursor:pointer; }
        .qlc-range::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:#608D4B; border:2px solid white; cursor:pointer; }
      `}</style>
      <h3 className="font-heading font-bold text-gray-900 text-xl mb-5">Quick Loan Check</h3>

      {/* Amount slider */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Loan Amount</label>
          <div className="flex items-center gap-1 bg-primary/10 rounded-lg px-2 py-1">
            <span className="text-primary text-xs font-bold">₹</span>
            <input
              type="number" min="10000" max="500000" step="5000"
              value={amount}
              onChange={e => setAmount(Math.min(500000, Math.max(10000, +e.target.value || 10000)))}
              className="w-20 text-primary font-bold text-sm bg-transparent outline-none text-right"
            />
          </div>
        </div>
        <input type="range" min="10000" max="500000" step="5000" value={amount}
          onChange={e => setAmount(+e.target.value)}
          className="qlc-range"
          style={{background:`linear-gradient(to right, #608D4B ${((amount-10000)/(500000-10000))*100}%, #e5e7eb ${((amount-10000)/(500000-10000))*100}%)`}}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹10,000</span><span>₹5,00,000</span>
        </div>
      </div>

      {/* Tenure slider */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Tenure</label>
          <div className="flex items-center gap-1 bg-primary/10 rounded-lg px-2 py-1">
            <input
              type="number" min="3" max="60" step="3"
              value={tenure}
              onChange={e => setTenure(Math.min(60, Math.max(3, +e.target.value || 3)))}
              className="w-8 text-primary font-bold text-sm bg-transparent outline-none text-right"
            />
            <span className="text-primary text-xs font-bold">Mo</span>
          </div>
        </div>
        <input type="range" min="3" max="60" step="3" value={tenure}
          onChange={e => setTenure(+e.target.value)}
          className="qlc-range"
          style={{background:`linear-gradient(to right, #608D4B ${((tenure-3)/(60-3))*100}%, #e5e7eb ${((tenure-3)/(60-3))*100}%)`}}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>3 Months</span><span>60 Months</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex rounded-full overflow-hidden h-2.5 mb-1">
        <div className="bg-primary h-full transition-all duration-300" style={{width:`${principalPct}%`}}/>
        <div className="bg-primary/25 h-full flex-1"/>
      </div>
      <div className="flex justify-between text-xs text-gray-400 mb-4">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block"/>Principal</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/25 inline-block"/>Interest</span>
      </div>

      {/* Results */}
      <div className="bg-primary-50 rounded-2xl p-4 mb-5 border border-primary/20 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Monthly EMI</span>
          <span className="font-bold text-primary text-lg">{fmt(emi)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Interest</span>
          <span className="font-semibold text-gray-800 text-sm">{fmt(interest)}</span>
        </div>
        <div className="flex justify-between items-center border-t border-primary/10 pt-2">
          <span className="text-sm font-semibold text-gray-700">Total Payment</span>
          <span className="font-bold text-gray-900 text-sm">{fmt(total)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Interest Rate</span>
          <span className="font-semibold text-gray-800 text-sm">{rate}% p.a.</span>
        </div>
      </div>

      <Link to="/apply" className="btn-primary w-full justify-center py-3.5 text-base">
        Get This Loan Now →
      </Link>
      <p className="text-xs text-center text-gray-400 mt-2">*Indicative rates. Final rate based on profile.</p>
    </div>
  );
}

// ---------- HERO ----------
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24">
      {/* Green accent blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light border border-primary/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <FiZap size={14} /> India's #1 Salary Loan Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight mb-6">
              Your Trusted
              <span className="block text-primary"> Salary Uncle</span>
              <span className="text-3xl md:text-4xl text-gray-300 font-medium">For Every Financial Need</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Get instant salary loans up to ₹5 Lakhs in 4 hours. No collateral, no hassle. Just fast, transparent, and fair lending designed for salaried professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/apply" className="btn-primary text-base py-4 px-8 justify-center">
                Apply Now — It's Free <FiArrowRight />
              </Link>
              <Link to="/emi-calculator" className="btn-outline text-base py-4 px-8 justify-center border-gray-600 text-gray-300 hover:border-primary hover:text-primary hover:bg-transparent">
                Check EMI <FiTrendingUp />
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              {['No Credit Score Required', 'Same Day Disbursal', '100% Digital Process'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <FiCheckCircle className="text-primary" size={16} /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Loan Card */}
          <div className="flex justify-center lg:justify-end">
            <QuickLoanCard />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        <FiChevronDown size={24} />
      </div>
    </section>
  );
}

// ---------- STATS ----------
function Stats() {
  const stats = [
    { value: '50,000+', label: 'Happy Customers', icon: FiUsers },
    { value: '₹500 Cr+', label: 'Loans Disbursed', icon: FiDollarSign },
    { value: '4 Hours', label: 'Avg. Disbursement', icon: FiClock },
    { value: '4.8 / 5', label: 'Customer Rating', icon: FiStar },
  ];

  return (
    <section className="bg-primary py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="text-white/70 mx-auto mb-3" size={28} />
              <div className="text-3xl md:text-4xl font-bold text-white font-heading mb-1">{s.value}</div>
              <div className="text-primary-100 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- SERVICES ----------
function Services() {
  const services = [
    {
      icon: '💰',
      title: 'Salary Advance',
      desc: 'Get up to 3x your monthly salary as advance with zero waiting. Perfect for month-end cash crunches.',
      amount: 'Up to ₹3 Lakhs',
      time: '2 Hours',
    },
    {
      icon: '🏥',
      title: 'Medical Emergency',
      desc: 'Handle unexpected hospital bills instantly. No document delay during health emergencies.',
      amount: 'Up to ₹5 Lakhs',
      time: '4 Hours',
    },
    {
      icon: '🎓',
      title: 'Education Loan',
      desc: "Fund your child's education or your own upskilling course without breaking savings.",
      amount: 'Up to ₹5 Lakhs',
      time: '24 Hours',
    },
    {
      icon: '✈️',
      title: 'Travel Loan',
      desc: 'Plan your dream vacation without worrying about upfront costs. Travel now, pay easy EMIs.',
      amount: 'Up to ₹2 Lakhs',
      time: '6 Hours',
    },
    {
      icon: '🏠',
      title: 'Home Renovation',
      desc: 'Transform your home without dipping into long-term savings. Flexible EMI options.',
      amount: 'Up to ₹5 Lakhs',
      time: '24 Hours',
    },
    {
      icon: '💍',
      title: 'Wedding Loan',
      desc: 'Make your special day perfect without financial stress. Easy repayment plans.',
      amount: 'Up to ₹5 Lakhs',
      time: '24 Hours',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="section-title mt-2">Loans for Every Life Moment</h2>
          <p className="section-subtitle">
            From emergencies to celebrations — Salary Uncle has a loan product tailored for every need of a salaried professional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="card p-6 group">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">{s.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-500 block">Loan Amount</span>
                  <span className="font-semibold text-primary text-sm">{s.amount}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Disbursal</span>
                  <span className="font-semibold text-gray-700 text-sm">{s.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="btn-outline">
            View All Services <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------- HOW IT WORKS ----------
function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: FiFileText,
      title: 'Fill Application',
      desc: 'Complete our simple 5-minute online application form with basic personal and employment details.',
    },
    {
      step: '02',
      icon: FiCheckCircle,
      title: 'Instant Verification',
      desc: 'Our AI system verifies your documents and salary details automatically in real-time.',
    },
    {
      step: '03',
      icon: FiAward,
      title: 'Instant Approval',
      desc: 'Get approval notification on WhatsApp and email within minutes of applying.',
    },
    {
      step: '04',
      icon: FiCreditCard,
      title: 'Money in Account',
      desc: 'Approved loan amount gets directly transferred to your bank account same day.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Process</span>
          <h2 className="section-title mt-2">Get Loan in 4 Simple Steps</h2>
          <p className="section-subtitle">
            No branch visits, no lengthy paperwork. Our fully digital process gets money in your account faster than you expect.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="text-center relative">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary/30 relative z-10">
                    <s.icon size={28} className="text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white rounded-full text-xs font-bold flex items-center justify-center z-20">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-heading text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 bg-gray-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white font-heading mb-2">Ready to Get Started?</h3>
            <p className="text-gray-400">Apply in 5 minutes. Get money in hours.</p>
          </div>
          <Link to="/apply" className="btn-primary whitespace-nowrap text-base py-4 px-10">
            Apply Now — Free <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------- WHY US ----------
function WhyUs() {
  const features = [
    { icon: FiZap, title: 'Instant Approval', desc: 'AI-powered instant loan approvals in under 60 seconds.' },
    { icon: FiShield, title: 'Bank-Grade Security', desc: '256-bit SSL encryption protects all your data.' },
    { icon: FiTrendingUp, title: 'Lowest Interest Rates', desc: 'Starting at just 10.5% per annum — no hidden charges.' },
    { icon: FiClock, title: 'Same Day Disbursement', desc: 'Loan credited to your account within 4 hours of approval.' },
    { icon: FiUsers, title: 'Dedicated Support', desc: '24/7 customer support via phone, chat, and WhatsApp.' },
    { icon: FiAward, title: 'RBI Registered NBFC', desc: 'Fully regulated and compliant lending operations.' },
    { icon: FiCheckCircle, title: 'No Collateral', desc: '100% unsecured loans — no assets required as security.' },
    { icon: FiFileText, title: 'Minimal Documents', desc: 'Just salary slip + Aadhaar + PAN. That is all we need.' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="section-title mt-2">The Salary Uncle Advantage</h2>
          <p className="section-subtitle">
            We built SalaryUncle from the ground up with salaried professionals in mind — faster, fairer, and friendlier than banks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="text-primary" size={22} />
              </div>
              <h3 className="font-semibold font-heading text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- ELIGIBILITY ----------
function Eligibility() {
  const criteria = [
    { icon: '🏢', title: 'Employment', desc: 'Salaried employee in a private or government organization' },
    { icon: '💼', title: 'Experience', desc: 'Minimum 6 months in current job' },
    { icon: '💰', title: 'Salary', desc: 'Monthly net salary of at least ₹20,000' },
    { icon: '🎂', title: 'Age', desc: 'Between 21 years and 58 years of age' },
    { icon: '📍', title: 'Location', desc: 'Resident of India with valid address proof' },
    { icon: '🏦', title: 'Bank Account', desc: 'Active bank account with salary credited monthly' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Eligibility</span>
            <h2 className="section-title mt-2 text-left">Who Can Apply?</h2>
            <p className="text-gray-600 mb-8">
              Simple eligibility criteria designed to help the maximum number of salaried individuals access credit when they need it most.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {criteria.map((c) => (
                <div key={c.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{c.title}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/apply" className="btn-primary mt-8 inline-flex">
              Check My Eligibility <FiArrowRight />
            </Link>
          </div>

          {/* Documents */}
          <div className="bg-gray-900 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold font-heading mb-6">Documents Required</h3>
            <div className="space-y-4">
              {[
                { doc: 'Aadhaar Card', note: 'For identity and address verification' },
                { doc: 'PAN Card', note: 'Mandatory for all financial transactions' },
                { doc: 'Latest 3 Salary Slips', note: 'To verify income and employment' },
                { doc: 'Bank Statement (3 months)', note: 'To verify salary credit history' },
                { doc: 'Employment ID Card', note: 'To confirm current employment' },
              ].map((d, i) => (
                <div key={d.doc} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-sm">{d.doc}</p>
                    <p className="text-gray-400 text-xs">{d.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/20 rounded-xl border border-primary/30">
              <p className="text-primary-light text-sm text-center font-medium">
                ✓ All documents can be uploaded digitally. No physical submission needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- TESTIMONIALS ----------
function Testimonials() {
  const reviews = [
    {
      name: 'Rajesh Kumar',
      role: 'Software Engineer, Bangalore',
      rating: 5,
      text: 'Got ₹2 lakhs in just 3 hours for my mother\'s surgery. Salary Uncle was a lifesaver. The process was completely online and team was very supportive.',
      amount: '₹2 Lakhs',
    },
    {
      name: 'Priya Sharma',
      role: 'Marketing Manager, Delhi',
      rating: 5,
      text: 'Best loan experience ever! Unlike banks, there were no endless paperwork or multiple visits. Just uploaded my documents and money was in account next morning.',
      amount: '₹1.5 Lakhs',
    },
    {
      name: 'Amit Patel',
      role: 'CA, Mumbai',
      rating: 5,
      text: 'Transparent fees, no hidden charges, and the interest rate was competitive. I have recommended Salary Uncle to at least 20 of my colleagues.',
      amount: '₹3 Lakhs',
    },
    {
      name: 'Sunita Rao',
      role: 'Teacher, Hyderabad',
      rating: 4,
      text: 'Needed urgent funds for my daughter\'s engineering college fees. Applied at 10 PM, approval by midnight, and money credited by 9 AM next day. Amazing!',
      amount: '₹5 Lakhs',
    },
    {
      name: 'Vikram Singh',
      role: 'Bank Officer, Chandigarh',
      rating: 5,
      text: 'I work in banking but still chose Salary Uncle for personal loan because their digital process is far superior and approval time is unmatched.',
      amount: '₹2.5 Lakhs',
    },
    {
      name: 'Meena Joshi',
      role: 'HR Executive, Pune',
      rating: 5,
      text: 'Used travel loan for my honeymoon trip. Minimal documentation, fast disbursal, and the EMI was very manageable. Highly recommend!',
      amount: '₹1 Lakh',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="section-title mt-2">What Our Customers Say</h2>
          <p className="section-subtitle">Real stories from real people whose financial emergencies we solved.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-bold text-base">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-gray-500 text-xs">{r.role}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-primary bg-primary-50 px-2 py-1 rounded-lg border border-primary/20">
                  {r.amount}
                </span>
              </div>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: 'What is the maximum loan amount I can get?',
      a: 'You can get a loan of up to ₹5 Lakhs depending on your monthly salary, credit history, and employment type. Our system calculates the best offer for you instantly.',
    },
    {
      q: 'How quickly will the money be disbursed?',
      a: 'For salary advance loans, disbursement happens within 2-4 hours of approval. For other loan types, it takes 4-24 hours depending on document verification.',
    },
    {
      q: 'What is the minimum salary required to apply?',
      a: 'You need a minimum net monthly salary of ₹20,000 to be eligible for a loan from SalaryUncle.',
    },
    {
      q: 'Is my data safe with SalaryUncle?',
      a: 'Absolutely. We use 256-bit SSL encryption and follow RBI guidelines for data privacy. Your information is never sold or shared with third parties without consent.',
    },
    {
      q: 'Can I prepay or foreclose my loan?',
      a: 'Yes! You can prepay after 3 EMIs. Foreclosure charges are minimal (0-2%) and are clearly disclosed before you sign the loan agreement.',
    },
    {
      q: 'What happens if I miss an EMI?',
      a: 'We charge a small late payment fee and report to credit bureaus. We recommend setting up auto-debit (NACH) to avoid any missed payments. Contact us immediately if you face difficulty.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="section-title mt-2">Frequently Asked Questions</h2>
          <p className="section-subtitle">Got questions? We have answers.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                open === i ? 'border-primary shadow-md' : 'border-gray-200'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-semibold text-base ${open === i ? 'text-primary' : 'text-gray-900'}`}>
                  {faq.q}
                </span>
                <FiChevronDown
                  className={`flex-shrink-0 ml-4 text-gray-400 transition-transform duration-200 ${
                    open === i ? 'rotate-180 text-primary' : ''
                  }`}
                  size={20}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <Link to="/contact" className="btn-primary">
            <FiPhone size={16} /> Talk to an Expert
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------- CTA BANNER ----------
function CTABanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-dark via-primary to-primary-light relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
          Need Money Today? We Can Help.
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Join 50,000+ salaried professionals who trust SalaryUncle for their financial needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/apply"
            className="bg-white text-primary font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-xl"
          >
            Apply for a Loan — Free
          </Link>
          <a
            href="tel:+918796041166"
            className="border-2 border-white text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 justify-center"
          >
            <FiPhone size={18} /> Call: +91 87960 41166
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- PAGE EXPORT ----------
export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Stats />
      <Services />
      <HowItWorks />
      <EligibilityChecker />
      <WhyUs />
      <Eligibility />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
