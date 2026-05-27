import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiMessageCircle, FiCheckCircle, FiClock } from 'react-icons/fi';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Contact Us</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mt-3 mb-6">We're Here to Help</h1>
          <p className="text-gray-400 text-lg">
            Have questions about your loan? Need help with your application? Our experts are available 7 days a week.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: FiPhone,
                title: 'Call Us',
                desc: '+91 88001 23456',
                subdesc: 'Mon–Sat: 9 AM – 7 PM',
                link: 'tel:+918800123456',
                cta: 'Call Now',
                color: 'bg-primary',
              },
              {
                icon: FiMail,
                title: 'Email Us',
                desc: 'support@salaryuncle.com',
                subdesc: 'Response within 24 hours',
                link: 'mailto:support@salaryuncle.com',
                cta: 'Send Email',
                color: 'bg-gray-900',
              },
              {
                icon: FiMessageCircle,
                title: 'WhatsApp',
                desc: '+91 88001 23456',
                subdesc: 'Chat 24/7 for instant support',
                link: 'https://wa.me/918800123456',
                cta: 'Chat Now',
                color: 'bg-green-600',
              },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${c.color} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  <c.icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold font-heading text-gray-900 text-lg mb-2">{c.title}</h3>
                <p className="text-primary font-semibold mb-1">{c.desc}</p>
                <p className="text-gray-500 text-sm mb-5">{c.subdesc}</p>
                <a href={c.link} target={c.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer"
                  className="btn-outline w-full justify-center">
                  {c.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="text-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { label: 'Your Name', name: 'name', type: 'text' },
                        { label: 'Email Address', name: 'email', type: 'email' },
                        { label: 'Mobile Number', name: 'phone', type: 'tel' },
                      ].map((f) => (
                        <div key={f.name} className={f.name === 'name' ? '' : ''}>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">{f.label}</label>
                          <input type={f.type} name={f.name} value={form[f.name]} onChange={update} required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                        </div>
                      ))}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
                        <select name="subject" value={form.subject} onChange={update}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
                          <option value="">Select Subject</option>
                          <option>Loan Application Query</option>
                          <option>EMI Payment Issue</option>
                          <option>Document Upload Help</option>
                          <option>Loan Foreclosure</option>
                          <option>Interest Rate Query</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                      <textarea name="message" value={form.message} onChange={update} rows={5} required
                        placeholder="Describe your query in detail..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary resize-none transition-colors" />
                    </div>
                    <button type="submit" className="btn-primary py-4 px-8 text-base">
                      Send Message →
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Office */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FiMapPin className="text-primary" size={20} />
                  <h3 className="font-bold text-gray-900">Our Office</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Level 3, Tower B<br />
                  DLF Cyber City, Sector 25<br />
                  Gurugram, Haryana 122002<br />
                  India
                </p>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FiClock className="text-primary" size={20} />
                  <h3 className="font-bold text-gray-900">Support Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
                    { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
                    { day: 'Sunday', hours: 'Emergency only via WhatsApp' },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between">
                      <span className="text-gray-600">{h.day}</span>
                      <span className="font-medium text-gray-900">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ link */}
              <div className="bg-primary rounded-3xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Quick Answers</h3>
                <p className="text-primary-100 text-sm mb-4">Check our FAQ for instant answers to common questions.</p>
                <a href="/#faq" className="bg-white text-primary font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-block">
                  View FAQ →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
