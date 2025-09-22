import Select from 'react-dropdown-select';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const industries = [
  {
    id: 1,
    name: 'Healthcare',
    description: 'Innovative solutions for healthcare providers, improving patient outcomes and operational efficiency.',
    image: 'https://cdn1.vectorstock.com/i/1000x1000/67/45/health-care-logo-concept-vector-41606745.jpg'
  },
  {
    id: 2,
    name: 'Finance',
    description: 'Secure and scalable financial services tailored for modern markets.',
    image: 'https://static.vecteezy.com/system/resources/previews/016/463/533/non_2x/accounting-with-cash-money-for-finance-professional-business-logo-design-modern-template-vector.jpg'
  },
  {
    id: 3,
    name: 'Education',
    description: 'Empowering learning through technology, making education accessible for all.',
    image: 'https://png.pngtree.com/png-clipart/20250120/original/pngtree-education-logo-vector-image-png-image_4092978.png'
  },
  {
    id: 4,
    name: 'Retail',
    description: 'Enhancing customer experiences with cutting-edge retail solutions.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/011/401/535/small/online-shopping-trolley-click-and-collect-order-logo-design-template-vector.jpg'
  },
  {
    id: 5,
    name: 'Manufacturing',
    description: 'Streamlining production processes with smart automation.',
    image: 'https://static.vecteezy.com/system/resources/previews/015/158/746/non_2x/factory-icon-logo-design-template-vector.jpg'
  },
  {
    id: 6,
    name: 'Transportation',
    description: 'Innovative solutions for efficient and sustainable transportation.',
    image: 'https://img.freepik.com/premium-vector/minimalist-logistics-transportation-logo-vector-modern-stylish-design-high-resolution_1273060-16.jpg?semt=ais_hybrid&w=740'
  },
];

const IndustriesHome = () => {
  const allOption = { label: 'All', value: 'all' };

  const [selectedCategory, setSelectedCategory] = useState([allOption]);
  const [search, setSearch] = useState('');
  const Navigation = useNavigate()

  const options = useMemo(() => [
    allOption,
    ...industries.map(item => ({ label: item.name, value: item.id }))
  ], []);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Industries We Serve</h1>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Discover how our tailored solutions empower industries to innovate and excel.
        </p>
        <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition">
          Contact Us
        </button>
      </section>

      {/* Industries Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
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
        <h2 className="text-3xl font-bold text-center mb-8">Our Focus Industries</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
              <img
                src={industry.image}
                alt={industry.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                <p className="text-gray-700 flex-grow">{industry.description}</p>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

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
};

export default IndustriesHome;
