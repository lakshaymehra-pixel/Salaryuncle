import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const SvgIcon = ({ path, viewBox = "0 0 24 24" }) => (
  <svg viewBox={viewBox} className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">{path}</svg>
);

const services = [
  {
    icon: <SvgIcon path={<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>} />,
    title: 'Salary Advance Loan',
    tagline: 'Get your salary early — before payday.',
    desc: 'Running short before the month ends? Get up to 3x your monthly salary as an advance. Repay from your next salary with zero stress.',
    amount: '₹10,000 – ₹3,00,000',
    tenure: '1 – 12 Months',
    rate: 'From 1.5% per month',
    time: '2 Hours',
    features: ['No credit score needed', 'Auto-debit repayment', 'Instant approval', 'Same day disbursal'],
    tag: 'Most Popular',
  },
  {
    icon: <SvgIcon path={<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>} />,
    title: 'Medical Emergency Loan',
    tagline: 'When health can\'t wait, neither should your loan.',
    desc: 'Unexpected hospitalisation or medical procedure? We disburse medical loans within 4 hours so your treatment never gets delayed.',
    amount: '₹50,000 – ₹5,00,000',
    tenure: '3 – 36 Months',
    rate: 'From 10.5% per annum',
    time: '4 Hours',
    features: ['Hospital direct payment option', 'Treatment not delayed', 'Compassionate processing', 'Flexible EMI'],
    tag: 'Urgent',
  },
  {
    icon: <SvgIcon path={<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>} />,
    title: 'Home Renovation Loan',
    tagline: 'Make your home your dream home.',
    desc: 'Whether it\'s a fresh coat of paint, new furniture, or a complete interior overhaul — fund your home improvement without touching savings.',
    amount: '₹1,00,000 – ₹5,00,000',
    tenure: '12 – 48 Months',
    rate: 'From 10.5% per annum',
    time: 'Quick',
    features: ['No collateral required', 'Long repayment tenure', 'Multiple end-use', 'Tax benefit eligible'],
    tag: null,
  },
  {
    icon: <SvgIcon path={<><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>} />,
    title: 'Education Loan',
    tagline: "Invest in education, don't compromise.",
    desc: "For your child's school fees, coaching classes, higher education, or your own professional upskilling — we fund dreams without delays.",
    amount: '₹50,000 – ₹5,00,000',
    tenure: '6 – 48 Months',
    rate: 'From 10.5% per annum',
    time: 'Quick',
    features: ['Covers all education expenses', 'Tax deduction under 80E', 'Moratorium period option', 'Top-up available'],
    tag: null,
  },
  {
    icon: <SvgIcon path={<><path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/></>} />,
    title: 'Travel Loan',
    tagline: 'Explore the world now, pay comfortably later.',
    desc: 'Book that long-awaited holiday — domestic or international. Our travel loan covers flights, hotels, and packages with easy EMIs.',
    amount: '₹20,000 – ₹2,00,000',
    tenure: '3 – 24 Months',
    rate: 'From 1.5% per month',
    time: '6 Hours',
    features: ['Covers flights & hotels', 'Travel insurance add-on', 'Forex support', 'Instant approval'],
    tag: null,
  },
  {
    icon: <SvgIcon path={<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>} />,
    title: 'Wedding Loan',
    tagline: 'Your dream wedding, your budget, our support.',
    desc: 'Plan your perfect wedding without compromising on any detail. Fund venue, catering, decor, and honeymoon with a single loan.',
    amount: '₹1,00,000 – ₹5,00,000',
    tenure: '12 – 48 Months',
    rate: 'From 10.5% per annum',
    time: 'Quick',
    features: ['Single loan for all expenses', 'Flexible disbursement schedule', 'Pre-closure option', 'No hidden fees'],
    tag: null,
  },
  {
    icon: <SvgIcon path={<><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>} />,
    title: 'Two-Wheeler Loan',
    tagline: 'Ride to work without draining savings.',
    desc: 'Buy your new bike or scooter for easy commuting. We cover up to 90% of on-road price with minimal documentation.',
    amount: '₹50,000 – ₹2,00,000',
    tenure: '12 – 36 Months',
    rate: 'From 10.5% per annum',
    time: 'Quick',
    features: ['90% on-road price funded', 'All brands covered', 'Quick RC registration support', 'Insurance bundling'],
    tag: null,
  },
  {
    icon: <SvgIcon path={<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>} />,
    title: 'Gadget & Electronics Loan',
    tagline: 'Get the tech you need, on easy EMI.',
    desc: 'Laptop, smartphone, smart TV, or home appliances — upgrade your life with our gadget loan at competitive interest rates.',
    amount: '₹10,000 – ₹1,50,000',
    tenure: '3 – 24 Months',
    rate: 'From 1% per month',
    time: '4 Hours',
    features: ['All electronics covered', '0% EMI on select brands', 'Same-day disbursal', 'Doorstep delivery option'],
    tag: 'New',
  },
];

export default function Services() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Services</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mt-3 mb-6">
            A Loan for Every Need
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From emergencies to milestones — SalaryUncle has a customised loan product built for every moment of a salaried professional's life.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">{s.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold font-heading text-gray-900">{s.title}</h3>
                        <p className="text-primary text-sm font-medium">{s.tagline}</p>
                      </div>
                    </div>
                    {s.tag && (
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        s.tag === 'Most Popular' ? 'bg-primary text-white' :
                        s.tag === 'Urgent' ? 'bg-red-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {s.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{s.desc}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-gray-50 rounded-2xl p-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Amount</p>
                      <p className="font-semibold text-gray-900 text-sm">{s.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tenure</p>
                      <p className="font-semibold text-gray-900 text-sm">{s.tenure}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                      <p className="font-semibold text-primary text-sm">{s.rate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Disbursal</p>
                      <p className="font-semibold text-gray-900 text-sm">{s.time}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCheckCircle className="text-primary flex-shrink-0" size={14} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <Link to="/apply" className="btn-primary w-full justify-center">
                    Apply for {s.title.split(' ')[0]} Loan <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white font-heading mb-4">Can't Decide? Let Us Help.</h2>
          <p className="text-gray-400 mb-8">Talk to our loan expert for a personalised recommendation.</p>
          <Link to="/contact" className="btn-primary mr-4">Talk to an Expert</Link>
          <Link to="/emi-calculator" className="btn-outline border-gray-600 text-gray-300 hover:border-primary hover:text-primary hover:bg-transparent">
            Calculate EMI
          </Link>
        </div>
      </section>
    </div>
  );
}
