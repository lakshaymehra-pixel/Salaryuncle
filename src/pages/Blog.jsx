import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';

const posts = [
  {
    title: 'How to Get an Instant Personal Loan Without Credit History',
    excerpt: 'Many salaried professionals worry that a thin credit file will disqualify them from loans. Here\'s what actually matters to modern lenders.',
    category: 'Tips & Guides',
    date: '20 May 2026',
    readTime: '5 min read',
    color: 'bg-primary',
  },
  {
    title: '5 Smart Ways to Use a Salary Advance Loan',
    excerpt: 'A salary advance isn\'t just for emergencies. Here are five strategic ways to use it to improve your financial health.',
    category: 'Financial Literacy',
    date: '15 May 2026',
    readTime: '4 min read',
    color: 'bg-gray-900',
  },
  {
    title: 'Understanding EMI: A Complete Guide for First-Time Borrowers',
    excerpt: 'What is EMI, how is it calculated, and how can you minimize the total interest you pay? Everything explained in simple terms.',
    category: 'Education',
    date: '10 May 2026',
    readTime: '7 min read',
    color: 'bg-primary-dark',
  },
  {
    title: 'Medical Loans vs Health Insurance: What Should You Have?',
    excerpt: 'When a health emergency strikes, which is faster and more reliable — a medical loan or insurance claim? We break down the differences.',
    category: 'Finance vs Insurance',
    date: '5 May 2026',
    readTime: '6 min read',
    color: 'bg-primary',
  },
  {
    title: "How to Improve Your CIBIL Score While Repaying a Loan",
    excerpt: "Borrowing responsibly can actually boost your credit score. Here's exactly how to manage your loan repayment to maximise your CIBIL rating.",
    category: 'Credit Score',
    date: '28 Apr 2026',
    readTime: '5 min read',
    color: 'bg-gray-900',
  },
  {
    title: 'Debt Consolidation Using Personal Loans: Is It Worth It?',
    excerpt: 'If you have multiple loans and credit cards, consolidating into one personal loan can reduce your total monthly burden significantly.',
    category: 'Debt Management',
    date: '22 Apr 2026',
    readTime: '6 min read',
    color: 'bg-primary-dark',
  },
];

const categories = ['All', 'Tips & Guides', 'Financial Literacy', 'Education', 'Credit Score', 'Debt Management'];

export default function Blog() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Knowledge Center</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mt-3 mb-6">Financial Wisdom for the Salaried Professional</h1>
          <p className="text-gray-400 text-lg">Practical guides, tips, and insights to help you make smarter financial decisions.</p>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <button key={cat} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                cat === 'All' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="bg-gray-900 rounded-3xl overflow-hidden mb-10 group cursor-pointer hover:shadow-2xl transition-shadow">
            <div className="p-10 md:p-14">
              <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-5">Featured Article</span>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4 group-hover:text-primary transition-colors">
                {posts[0].title}
              </h2>
              <p className="text-gray-400 text-base mb-6 max-w-2xl">{posts[0].excerpt}</p>
              <div className="flex items-center gap-6 text-gray-500 text-sm">
                <span className="flex items-center gap-2"><FiCalendar size={14} />{posts[0].date}</span>
                <span className="flex items-center gap-2"><FiClock size={14} />{posts[0].readTime}</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <div key={post.title} className="card overflow-hidden group cursor-pointer">
                <div className={`h-2 ${post.color}`} />
                <div className="p-6">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    {post.category}
                  </span>
                  <h3 className="font-bold font-heading text-gray-900 text-base mb-3 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-gray-400 text-xs border-t border-gray-100 pt-4">
                    <span className="flex items-center gap-1"><FiCalendar size={12} />{post.date}</span>
                    <span className="flex items-center gap-1"><FiClock size={12} />{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline py-3 px-8">
              Load More Articles <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-3">Get Financial Tips in Your Inbox</h2>
          <p className="text-gray-600 mb-8">Weekly insights on loans, savings, and financial wellness for salaried professionals.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
          <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
