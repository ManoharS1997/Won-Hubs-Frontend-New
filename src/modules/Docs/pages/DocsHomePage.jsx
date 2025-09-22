import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaRocket, FaCogs, FaEnvelope, FaChartBar, FaPlug, FaQuestionCircle } from 'react-icons/fa';
import { useState, useMemo } from 'react';
import Select from 'react-dropdown-select';

const docCategories = [
  {
    id: 'getting-started',
    title: ' Getting Started',
    description: 'Learn how to set up your WonHubs workspace.',
    icon: <FaRocket className="text-[#0476d3] text-3xl" />,
  },
  {
    id: 'crm',
    title: ' CRM Module',
    description: 'Manage leads, pipelines, and customers.',
    icon: <FaBookOpen className="text-[#0476d3] text-3xl" />,
  },
  {
    id: 'ticketing',
    title: ' Ticketing System',
    description: 'Automate support and internal requests.',
    icon: <FaCogs className="text-[#0476d3] text-3xl" />,
  },
  {
    id: 'communication',
    title: ' Communication',
    description: 'WhatsApp, Email, SMS, and Calls.',
    icon: <FaEnvelope className="text-[#0476d3] text-3xl" />,
  },
  {
    id: 'reports',
    title: ' Reports & Analytics',
    description: 'Insights on sales, support, and performance.',
    icon: <FaChartBar className="text-[#0476d3] text-3xl" />,
  },
  {
    id: 'integrations',
    title: ' Integrations',
    description: 'Connect WhatsApp API, Gmail, Stripe, and more.',
    icon: <FaPlug className="text-[#0476d3] text-3xl" />,
  },
  {
    id: 'faq',
    title: ' FAQ',
    description: 'Common questions and answers.',
    icon: <FaQuestionCircle className="text-[#0476d3] text-3xl" />,
  },
];

const customStyles = {
  // unchanged
  container: (base, state) => ({
    ...base,
    width: '100%'
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
    borderColor: state.isFocused ? "#007bff" : "#ddd",
    boxShadow: state.isFocused ? "0 0 5px rgba(0, 123, 255, 0.5) !important" : "none",
    "&:hover": {
      borderColor: "#007bff",
    },
    padding: "0px",
    borderRadius: "0px !important",
    width: "100% !important",
    height: "100%",
    display: "flex",
    alignItems: "center",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "5px",
    width: "100%",
  }),
  option: (base, { isSelected, isFocused }) => ({
    ...base,
    backgroundColor: isSelected ? "#007bff" : isFocused ? "#f0f0f0" : "white",
    color: isSelected ? "white" : "black",
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#007bff",
      color: "white",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#333",
    fontWeight: "bold",
    borderRadius: '0px'
  }),
  placeholder: (base) => ({
    ...base,
    color: "#aaa",
    fontStyle: "italic",
    textWrap: 'no-wrap'
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#007bff",
    "&:hover": {
      color: "#0056b3",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "#ff4d4d",
    "&:hover": {
      color: "#ff0000",
    },
  }),
};

export default function DocsHomePage() {
  const allOption = { label: 'All', value: 'all' };

  const [selectedCategory, setSelectedCategory] = useState([allOption]);
  const [search, setSearch] = useState('');
  const Navigation = useNavigate()

  const options = useMemo(() => [
    allOption,
    ...docCategories.map(item => ({ label: item.title, value: item.id }))
  ], []);

  const filteredCategories = docCategories.filter((cat) => {
    const matchesSearch = search.trim() === '' ||
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory[0]?.value === 'all' || selectedCategory[0]?.value === cat.id;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-screen h-screen bg-white text-gray-800 overflow-y-scroll">
      {/* Hero header */}
      <section
        className="h-[50vh] bg-gradient-to-r from-[#14213d] to-[#1f2d4a] py-12 !px-4 md:!px-[5%]
         text-white text-left flex flex-col justify-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/1_ixkotj')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <h1 className="!text-4xl md:!text-5xl font-bold mb-4 flex items-center gap-2">
          <img
            alt='Logo'
            className='h-10 w-fit'
            src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/olnxfrhzkj0czc5fsvxt'
          />
          WonHubs Docs
        </h1>
        <p className="max-w-3xl !text-lg md:!text-xl">
          Everything you need to learn, set up, and master WonHubs.
        </p>
      </section>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col gap-4 ">
        <div className="w-full md:w-100 self-start flex gap-2">
          <Select
            className='!w-[220px] py-2 px-2 text-nowrap border'
            options={options}
            values={selectedCategory}
            onChange={setSelectedCategory}
            style={customStyles}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documentation..."
            className="!min-w-[500px] px-2 py-[0.5rem] border focus:outline-none focus:ring focus:border-[#fca311]"
          />
        </div>

        <h2 className="!text-3xl font-bold mb-8 text-[#14213d] text-center"> Browse by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/docs/${cat.id}`}
              className="block border rounded-lg p-6 shadow-sm hover:shadow-lg transition bg-white"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className='bg-[#0476d3]/13 p-2 rounded-full'>{cat.icon}</span>
                <h3 className="!text-xl font-bold text-[#0476d3]">{cat.title}</h3>
              </div>
              <p className="text-gray-600">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Us */}
      <section className="w-full bg-[#042154] text-white py-12 md:py-20 px-4 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4"> Ready to Take Control of Your Business?</h2>
        <p className="w-full mx-auto mb-8 text-lg">
          Let WonHubs be your digital partner in growth.
        </p>
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <button
            type="button"
            onClick={() => Navigation('/request/demo')}
            className="!bg-[#0476d3] !text-white !px-5 !py-3 !rounded-full hover:!bg-white hover:!text-black hover:!shadow transition duration-500"
          >
            Request a Free Demo
          </button>
          <button
            type="button"
            onClick={() => Navigation('/external/register')}
            className="border border-black !px-5 !py-3 text-black !rounded-full hover:!bg-black hover:!text-white transition duration-500"
          >
            Start Your Free Trial
          </button>
        </div>
        <div className="w-full mx-auto text-gray-50  flex items-center justify-center flex-wrap ">
          <p className="border-r-2 px-2 m-0">📞 Phone: +91-7893536373</p>
          <p className="border-r-2 px-2 m-0">📧 Email: support@wonhubs.com</p>
          <p className="border-r-2 px-2 m-0">📍 Location: Kanuru, Vijayawada, Andhra Pradesh India</p>
          <a href="https://wonhubs.com" className=" px-2 m-0">🌐 Website: wonhubs.com</a>
        </div>
        <p className="mt-2">Or fill out our contact form and we’ll get back to you within 24 hours.</p>
      </section>

      <footer className="text-center py-2 text-xs  bg-[#042154] text-white">
        © {new Date().getFullYear()} WonHubs. All rights reserved.
      </footer>
    </div>
  );
}
