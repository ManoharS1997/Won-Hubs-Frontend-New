import React, { useState, useMemo } from 'react';
import Select from 'react-dropdown-select';
import { useNavigate } from 'react-router-dom';

const mockPartners = [
  {
    id: 1,
    name: 'Acme Corp',
    description: 'Leading provider of widgets and industrial solutions.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRANwg2jNbOFiFvf_MP5LC2WaZBk9S2GEVEZw&s'
  },
  {
    id: 2,
    name: 'Globex Inc.',
    description: 'Global solutions with cutting-edge technology.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAiMZ-rbqSe6tOFjUDQk2n8UJZ4l8vXvwkc0mqPgV_iiDDld3Z3XoRYwOcgBtz8hoeypc&usqp=CAU'
  },
  {
    id: 3,
    name: 'Soylent Ltd.',
    description: 'Innovative food products for a modern world.',
    image: 'https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1491259444/qj6sqzkuyjpzjpscutm5.png'
  },
  {
    id: 4,
    name: 'Initech',
    description: 'Streamlining enterprise workflows.',
    image: 'https://ih1.redbubble.net/image.783044635.7484/st,small,507x507-pad,600x600,f8f8f8.u6.webp'
  },
  {
    id: 5,
    name: 'Umbrella Corp',
    description: 'Advanced pharmaceutical research.',
    image: 'https://i.pinimg.com/736x/84/1a/21/841a219baddc581b4a590a37ef52f6b0.jpg'
  },
  {
    id: 6,
    name: 'Stark Industries',
    description: 'Innovating the future of tech.',
    image: 'https://i.pinimg.com/736x/c9/cc/5a/c9cc5a80a0e49138d0fbbc718bb7283d.jpg'
  },
];

const PartnersHome = () => {
  const allOption = { label: 'All', value: 'all' };

  const [selectedCategory, setSelectedCategory] = useState([allOption]);
  const [search, setSearch] = useState('');
  const Navigation = useNavigate()

  const options = useMemo(() => [
    allOption,
    ...mockPartners.map(item => ({ label: item.name, value: item.id }))
  ], []);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Partners Home</h1>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Your one-stop dashboard for managing and growing your partnerships. View details, add new partners, and keep your network strong and up-to-date.
        </p>
        <button
          type='button'
          onClick={() => Navigation('/become-a-partner')}
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Become Our Partner
        </button>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
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
        <h2 className="text-3xl font-bold text-center mb-8">Why Use Partners Home?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Centralized Management</h3>
            <p className="text-gray-600">
              Keep all partner information in one place for easy access and updates.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Easy Collaboration</h3>
            <p className="text-gray-600">
              Share partner details with your team and streamline workflows.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Growth Insights</h3>
            <p className="text-gray-600">
              Analyze your partner network to identify opportunities for growth.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockPartners.map((partner) => (
            <div
              key={partner.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                <p className="text-gray-700">{partner.description}</p>
                <button className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  View Details
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

export default PartnersHome;
