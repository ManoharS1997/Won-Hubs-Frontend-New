import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Select from 'react-dropdown-select';

const docCategories = [
  {
    id: 'getting-started',
    title: ' Getting Started',
    description: 'Learn how to set up your WonHubs workspace.',
  },
  {
    id: 'crm',
    title: ' CRM Module',
    description: 'Manage leads, pipelines, and customers.',
  },
  {
    id: 'ticketing',
    title: ' Ticketing System',
    description: 'Automate support and internal requests.',
  },
  {
    id: 'communication',
    title: ' Communication',
    description: 'WhatsApp, Email, SMS, and Calls.',
  },
  {
    id: 'reports',
    title: ' Reports & Analytics',
    description: 'Insights on sales, support, and performance.',
  },
  {
    id: 'integrations',
    title: ' Integrations',
    description: 'Connect WhatsApp API, Gmail, Stripe, and more.',
  },
  {
    id: 'faq',
    title: ' FAQ',
    description: 'Common questions and answers.',
  },
];

export default function CommunityHome() {
  const allOption = { label: 'All', value: 'all' };

  const [selectedCategory, setSelectedCategory] = useState([allOption]);
  const [search, setSearch] = useState('');

  const options = useMemo(() => [
    allOption,
    ...docCategories.map(item => ({ label: item.title, value: item.id }))
  ], []);

  return (
    <div className="bg-white text-gray-800">
      <section className="bg-gradient-to-r from-[#14213d] to-[#1f2d4a] text-white text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-2">
          <img
            alt='Logo'
            className='h-10 w-fit'
            src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/olnxfrhzkj0czc5fsvxt'
          /> WonHubs Community</h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Ask questions, share ideas, and connect with other users.
        </p>
      </section>

      <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
        <div className="w-full md:w-100 self-start flex gap-2">
          <Select
            className='!w-[220px] py-2 px-2 text-nowrap border'
            options={options}
            values={selectedCategory}
            onChange={setSelectedCategory}
            // style={customStyles}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documentation..."
            className="!min-w-[500px] px-2 py-[0.5rem] border focus:outline-none focus:ring focus:border-[#fca311]"
          />
        </div>
        <section>
          <h2 className="!text-3xl font-bold mb-6"> Featured Discussions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/community/posts/123" className="block bg-white border rounded-lg shadow hover:shadow-lg transition p-6">
              <h3 className="text-xl font-semibold mb-2">How to automate lead follow-up</h3>
              <p className="text-gray-600">Started by JaneDoe • 12 replies</p>
            </Link>
            <Link to="/community/posts/124" className="block bg-white border rounded-lg shadow hover:shadow-lg transition p-6">
              <h3 className="text-xl font-semibold mb-2">Tips for using the Ticketing System</h3>
              <p className="text-gray-600">Started by SupportGuru • 8 replies</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="!text-3xl font-bold mb-6"> Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Support & Help', description: 'Ask questions and get answers.', link: '/community/categories/support' },
              { name: 'Product Ideas', description: 'Share and vote on feature requests.', link: '/community/categories/ideas' },
              { name: 'General Discussion', description: 'Talk about anything Won Hubs.', link: '/community/categories/general' },
            ].map((cat, i) => (
              <Link key={i} to={cat.link} className="block border rounded-lg p-5 hover:shadow-lg transition">
                <h3 className="font-bold !text-xl mb-2">{cat.name}</h3>
                <p className="text-gray-600">{cat.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Contact Us */}
      <section className="w-full bg-[#042154] text-white py-6 md:py-20 px-4 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4"> Contact Us</h2>

        <div className="w-full mx-auto text-gray-50  flex items-center justify-center flex-wrap ">
          <p className="border-r-2 px-2 m-0">📞 Phone: +91-7893536373</p>
          <p className="border-r-2 px-2 m-0">📧 Email: support@wonhubs.com</p>
          <p className="border-r-2 px-2 m-0">📍 Location: Kanuru, Vijayawada, Andhra Pradesh India</p>
          <a href="https://www.wonhubs.com" className=" px-2 m-0">🌐 Website: www.wonhubs.com</a>
        </div>
        <p className="mt-2">Or fill out our contact form and we’ll get back to you within 24 hours.</p>
      </section>

      <footer className="text-center py-2 text-xs  bg-[#042154] text-white">
        © {new Date().getFullYear()} Won Hubs. All rights reserved.
      </footer>
    </div>
  );
}
