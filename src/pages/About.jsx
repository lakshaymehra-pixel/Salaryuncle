import { Link } from 'react-router-dom';
import { FiArrowRight, FiTarget, FiEye, FiHeart, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';

export default function About() {
  const team = [
    { name: 'Arjun Mehta', role: 'CEO & Co-Founder', exp: '15 years in fintech', avatar: 'AM' },
    { name: 'Divya Kapoor', role: 'CTO & Co-Founder', exp: '12 years in technology', avatar: 'DK' },
    { name: 'Rohit Bansal', role: 'Chief Credit Officer', exp: '18 years in banking', avatar: 'RB' },
    { name: 'Sneha Gupta', role: 'Head of Operations', exp: '10 years in NBFC', avatar: 'SG' },
  ];

  const milestones = [
    { year: '2019', event: 'SalaryUncle founded in Gurugram by fintech veterans' },
    { year: '2020', event: 'Received RBI NBFC license, launched first loan product' },
    { year: '2021', event: 'Crossed ₹100 Cr loan disbursement milestone' },
    { year: '2022', event: 'Expanded to 50+ cities, launched mobile app' },
    { year: '2023', event: 'Raised Series A funding, crossed 25,000 customers' },
    { year: '2024', event: '50,000+ customers served, ₹500 Cr+ total disbursement' },
  ];

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mt-3 mb-6">
            Your Uncle in the World of Finance
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            SalaryUncle was born from a simple belief: every hardworking salaried professional deserves quick, fair, and dignified access to credit. We're not just a lending platform — we're your financial family.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiTarget,
                title: 'Our Mission',
                desc: 'To provide instant, transparent, and affordable loans to every salaried Indian who needs financial support — without the bureaucratic delays of traditional banking.',
                color: 'bg-primary',
              },
              {
                icon: FiEye,
                title: 'Our Vision',
                desc: 'To become India\'s most trusted fintech brand for salaried professionals, enabling financial wellness through responsible lending and digital innovation.',
                color: 'bg-gray-900',
              },
              {
                icon: FiHeart,
                title: 'Our Values',
                desc: 'Transparency in pricing, dignity in every customer interaction, speed in delivery, and accountability in every promise we make to our borrowers.',
                color: 'bg-primary-dark',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <item.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="section-title mt-2 text-left">Why We Built SalaryUncle</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  In 2019, our founders Arjun and Divya watched a colleague struggle to get a ₹50,000 loan from a bank for a medical emergency — it took 3 weeks and was ultimately rejected due to insufficient credit history.
                </p>
                <p>
                  That experience sparked a question: why should a person with a steady salary, stable employment, and responsible spending habits face such barriers in a financial emergency?
                </p>
                <p>
                  SalaryUncle was built to answer that question. Using technology, data intelligence, and a deeply customer-centric approach, we created a lending platform that treats salary as the credit signal it truly is.
                </p>
                <p className="text-gray-900 font-semibold">
                  Today, we've helped over 50,000 salaried professionals across India access over ₹500 Crore in loans — and we're just getting started.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: FiUsers, value: '50,000+', label: 'Customers Served' },
                { icon: FiTrendingUp, value: '₹500 Cr+', label: 'Loans Disbursed' },
                { icon: FiAward, value: '4.8/5', label: 'Google Rating' },
                { icon: FiTarget, value: '50+', label: 'Cities Covered' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                  <s.icon className="text-primary mx-auto mb-3" size={28} />
                  <div className="text-3xl font-bold font-heading text-gray-900 mb-1">{s.value}</div>
                  <div className="text-gray-500 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Journey</span>
            <h2 className="section-title mt-2">Our Milestones</h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 inline-block">
                      <span className="text-primary font-bold text-lg font-heading block mb-1">{m.year}</span>
                      <p className="text-gray-700 text-sm">{m.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-8 h-8 bg-primary rounded-full items-center justify-center flex-shrink-0 relative z-10 border-4 border-white shadow-md">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="section-title mt-2">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card p-6 text-center">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl font-heading">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-gray-900 font-heading">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                <p className="text-gray-500 text-xs">{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white font-heading mb-4">Join the SalaryUncle Family</h2>
          <p className="text-white/80 mb-8">Experience the future of salary-backed lending today.</p>
          <Link to="/apply" className="bg-white text-primary font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
            Apply Now <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
