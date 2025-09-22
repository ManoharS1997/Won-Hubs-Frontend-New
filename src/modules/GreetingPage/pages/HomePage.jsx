import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
// import Select from 'react-dropdown-select'

import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { HeroCarousel } from "../components/HeroCarousel";
import GradientSlider from "../components/GradientSlider";
import AnimatedVideoShowcase from "../components/AnimatedVideos";
import renderIcons from '../../../shared/functions/renderIcons'
import { useRef } from "react";

import '../../../i18n';
import { useTranslation } from 'react-i18next';
// import LanguageSelector from "../../../components/LanguageSelector";
import LanguageSelector from "../../../shared/UIElements/LaunguageSelect";
import T from "../../../helpers/Translator";

const heroSlides = [
  {
    title: "Manage Your Entire Business in One Platform",
    subtitle: "From tasks to teams — WonHubs powers it all.",
    cta: "Simplify. Scale. Succeed.",
  },
  {
    title: "Workflows That Just Work",
    subtitle: "Automate daily operations and drive growth with ease.",
    cta: "No chaos. Just clarity.",
  },
  {
    title: "Smarter Tools for Smarter Teams",
    subtitle: "Real-time tracking, intelligent dashboards, and effortless collaboration.",
    cta: "Your all-in-one business command center.",
  },
  {
    title: "Built for Any Business. Ready for Every Team.",
    subtitle: "Whether you're a startup, agency, or enterprise, WonHubs adapts to you.",
    cta: "One platform. Endless potential.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const videoList = [
  "/videos/v1.mp4",
  "/videos/v2.mp4",
  "/videos/v3.mp4",
  "/videos/v4.mp4",
  "/videos/v5.mp4",
  "/videos/v6.mp4"
];

const navOptions = [
  {
    id: 'product',
    label: 'Product',
    path: '/request/demo',
    description: 'Explore more about our product by requesting a demo.',
    target: undefined,
  },
  {
    id: 'industries',
    label: 'Industries',
    path: '/industries',
    description: 'See how WonHubs serves different industries.',
    target: '_blank',
  },
  {
    id: 'partners',
    label: 'Partners',
    path: '/global-partners',
    description: 'Discover our global partner network.',
    target: '_blank',
  },
  {
    id: 'community',
    label: 'Community',
    path: '/community',
    description: 'Join and connect with the WonHubs community.',
    target: '_blank',
  },
  {
    id: 'learning',
    label: 'Learning',
    path: '/docs',
    description: 'Access documentation and learning resources.',
    target: '_blank',
  },
  {
    id: 'tutorials',
    label: 'Tutorials',
    path: '/tutorials',
    description: 'Browse tutorials to get started quickly.',
    target: '_blank',
  },
];

export default function HomePage() {
  const Navigation = useNavigate();
  const token = Cookies.get('activeUser');
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [isExtentionOpen, setExentionOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false)
  const [language, setLanguage] = useState(localStorage.getItem("lan") || 'en')
  const { t } = useTranslation();

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);
  }, []);

  // ...inside HomePage component
  const searchRef = useRef();
  const navOptionRef = useRef();

  useEffect(() => {
    if (!searchOpen) return;
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    if (!isExtentionOpen) return;
    function handleClickOutside(e) {
      if (navOptionRef.current && !navOptionRef.current.contains(e.target)) {
        setExentionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExtentionOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const updatedSearches = [searchQuery, ...recentSearches.filter(q => q !== searchQuery)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

    Navigation(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  const handleRecentClick = (query) => {
    setSearchQuery(query);
    Navigation(`/search?q=${encodeURIComponent(query)}`);
  };

  if (token !== undefined) {
    // return Navigation(-1);
  }

  const onOptionSelection = (id) => {
    setExentionOpen(true)
    setSelectedOption(navOptions.find(item => item.id === id))
  }

  return (
    <div className="w-screen min-h-screen bg-white text-black flex flex-col">
      {/* Nav */}
      <nav className="h-[60px] flex justify-between items-center py-2 !px-4 md:!px-[5%] shadow">
        <div className="flex items-center gap-2">
          <img
            src='https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png'
            alt="icon"
            className="w-8 hidden md:flex"
          />
          <h1 className="!text-[1rem] md:!text-3xl font-bold m-0"> <T to={language}>WONHUBS</T></h1>
        </div>
        <div className="hidden lg:flex !gap-1 md:!gap-8 items-center">
          {navOptions.map(item => (
            <button
              type="button"
              key={item.id}
              onClick={() => onOptionSelection(item.id)}
              className="!bg-transaprent w-fit !text-inherit hover:!underline font-semibold"
            >
              <T to={language}> {item.label}</T>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 md:!gap-4">
          <div className=" flex items-center p-0 gap-2 md:ml-[5%]">
            {/* <Select
              className="border rounded !w-[100px]"
              values={[{ label: 'All', value: 'all' }]}
              options={[
                { label: 'All', value: 'all' }
              ]}
            /> */}
            <div className="w-fit flex items-center">
              <span
                onClick={() => setSearchOpen(!searchOpen)}
                className="hover:bg-black hover:text-white rounded-full p-1 border transition-all duration-500 cursor-pointer"
              >
                {renderIcons('LuSearch', 25, 'inherit')}
              </span>
              {searchOpen &&
                <div
                  ref={searchRef}
                  className="absolute top-[60px] left-0 w-screen p-2 md:p-4 bg-white border shadow z-50 max-h-[400px] overflow-y-auto "
                >
                  <form onSubmit={handleSearchSubmit} className="relative w-full flex flex-col items-center gap-2">
                    <div className="w-full flex justify-between gap-4 md:grid md:grid-cols-3">
                      <span className="hidden md:flex"></span>
                      <div className="focus-within:shadow-lg w-full flex items-center border rounded">
                        <input
                          type="search"
                          placeholder="Search..."
                          className="p-2 w-full md:w-[95%] outline-none"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="h-full !py-1 !px-3 !border-l-1 !border-gray-200 !rounded-tr-md !rounded-br-md">
                          {renderIcons('LuSearch', 15, 'inherit')}
                        </button>
                      </div>
                      <div className="w-fit md:w-full flex justify-end">
                        <button
                          type="button"
                          title="Close"
                          onClick={() => setSearchOpen(false)}
                          className=" w-fit h-fit border !rounded-full hover:!border-black "
                        >
                          {renderIcons('IoIosClose', 20, 'inherit')}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col w-7/9">
                      <h5 className=" !text-lg">Recents</h5>
                      {recentSearches.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="w-full text-left !px-3 !py-2 hover:!bg-gray-100 rounded"
                          onClick={() => handleRecentClick(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </form>
                </div>}
            </div>
          </div>

          <LanguageSelector currentLang={language} onChange={setLanguage} />

          <button
            onClick={() => Navigation('/login')}
            className="flex items-center gap-2 border text-nowrap !px-4 !py-2 !rounded-full hover:shadow-lg"
          >
            <T to={language}> Login</T> <AiOutlineLogin className="hidden md:block" size={15} />
          </button>

          <button
            type='button'
            className="flex lg:hidden"
            onClick={() => setSideNavOpen(true)}
          >
            {renderIcons('GiHamburgerMenu', 22, 'inherit')}
          </button>
        </div>
      </nav>

      {isExtentionOpen &&
        <div
          ref={navOptionRef}
          className="absolute top-[60px] w-screen min-h-[200px] bg-white flex flex-col text-black
                        p-4 z-2 gap-2"
        >
          <div className='flex items-start justify-end'>
            <button
              type="button"
              title="Close"
              onClick={() => setExentionOpen(false)}
              className=" w-fit h-fit border !rounded-full hover:!border-black"
            >
              {renderIcons('IoIosClose', 20, 'inherit')}
            </button>
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="border-r-2 border-[#ccc] p-2">
              <h5 className="">
                <T to={language}>{selectedOption?.label}</T>
              </h5>
              <p><T to={language}>{selectedOption?.description}</T></p>
            </div>
            <a
              href={selectedOption?.path || '/'}
              target="_blank"
              className="!ml-4 border !rounded-full p-2 px-4 text-black
                           hover:!text-blue-500 hover:!border-blue-500 hover:shadow-lg"
            // onClick={() => Navigation(selectedOption?.path)}
            >
              <T to={language}>Learn More</T>
            </a>
          </div>
        </div>}

      {/* Hero Section */}
      <section
        className="h-fit md:h-[70vh] relative bg-gradient-to-b md:bg-gradient-to-r from-[#0476d3]/50
         via-white md:py-16 text-left !px-4 md:!px-[5%] flex items-center flex-col md:flex-row "
      >
        <div className="w-full md:w-1/2 ">
          <h1
            className="!text-3xl md:!text-4xl  :!text-5xl font-bold !mb-4"
          >
            <T to={language}> Welcome to</T> <br className="hidden lg:inline-block" />
            <span className="text-[#0476d3] text-4xl md:text-5xl lg:text-8xl">
              <T to={language}>WonHubs!</T>
            </span><br />
            <br />
            <T to={language}>The Future Way to Work</T>
          </h1>
          <p className="max-w-2xl !text-lg md:!text-lg :!text-xl !mb-6">
            <T to={language}>Your All-in-One Business Management Platform. From capturing leads to resolving service tickets — WonHubs empowers your business to grow faster and serve smarter.</T>
          </p>
          <div className="flex flex-col md:flex-row items-center w-full md:w-fit gap-4">
            <button
              onClick={() => Navigation('/external/register')}
              className="!bg-[#0476d3] !text-white !px-6 !py-3 !rounded-full hover:!bg-white
             hover:!text-black border border--[#0476d3] transition duration-500"
            >
              <T to={language}> Start Free Trial</T>
            </button>
            <button
              onClick={() => Navigation('/request/demo')}
              className="border !px-6 !py-3 !rounded-full hover:!bg-black
             hover:!text-white transition duration-500"
            >
              <T to={language}>Request a Demo</T>
            </button>
          </div>
        </div>

        <AnimatedVideoShowcase />
      </section>

      <section className="flex flex-col items-center justify-center p-0">
        <HeroCarousel slides={heroSlides} language={language} />
      </section>

      {/* Features Section */}
      <section className="bg-[#f9f9f9] py-16 px-4 flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold mb-12">💼 What You Can Do with WonHubs</h2>
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "🔹 Sales CRM",
              color: "bg-yellow-400",
              points: [
                "Track and nurture leads with custom pipelines",
                "Automate follow-ups and reminders",
                "Assign leads to teams and measure conversions",
              ],
            },
            {
              title: "🎧 Helpdesk & Ticketing",
              color: "bg-green-500",
              points: [
                "Create, assign, and resolve support tickets",
                "Set SLAs and auto-escalation rules",
                "Collaborate with internal comments",
              ],
            },
            {
              title: "📊 Analytics & Dashboards",
              color: "bg-red-500",
              points: [
                "Real-time insights on leads, tickets, and performance",
                "Customizable reports with filters and exports",
              ],
            },
            {
              title: "📢 Communication Hub",
              color: "bg-purple-500",
              points: [
                "Connect WhatsApp, Email, SMS, and Calls",
                "Use templates and canned responses",
                "Track all customer conversations in one place",
              ],
            },
            {
              title: "👥 Team Collaboration",
              color: "bg-pink-500",
              points: [
                "Centralized task and project management",
                "Assign, monitor, and track work across teams",
                "Plan meetings, set deadlines, and reminders",
              ],
            },
          ].map((f, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg bg-white hover:text-white
               p-8 group transition-all duration-500 hover:shadow-xl"
            >
              {/* Animated Corner Blob */}
              <div
                className={`absolute -top-20 -right-20 w-32 h-32 rounded-full ${f.color} transition-transform duration-500 group-hover:scale-[10]`}
              ></div>

              {/* Card Content */}
              <div className="relative z-10 space-y-4">
                <h5 className=" font-bold "><T to={language}>{f.title}</T></h5>
                <ul className="space-y-2 list-disc list-inside text-[1rem] m-0">
                  {f.points.map((p, j) => (
                    <li key={j}><T to={language}>{p}</T></li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4">
        <h2 className="text-center text-3xl font-bold !mb-8">
          🛠️ <T to={language}>Key Features That Set Us Apart</T>
        </h2>

        <motion.div
          className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            "🔄 Process Automation: Custom triggers to reduce manual effort",
            "🌐 Multi-Channel Inbox: Manage all messages in one place",
            "📁 Knowledge Base Integration: Self-service content for customers",
            "🔐 Advanced Permissions: Full role-based access control",
            "🧠 AI-Ready Engine (Coming Soon): Smart ticket suggestions and lead scoring",
            "📱 Mobile-Friendly: Work from anywhere",
            "💳 Billing & Payments: Invoice generation and payment tracking",
            "🔒 Secure & Scalable: Enterprise-grade security, 99.9% uptime",
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#f9f9f9] p-6 rounded-lg shadow transition-all duration-300 
              ease-in-out cursor-pointer hover:shadow-xl flex items-center gap-4"
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.03,
                transition: { type: "tween", ease: "easeInOut", duration: 0 },
              }}

            >
              <span className="text-2xl"> <T to={language}>{item.slice(0, 2)}</T></span>
              <span> <T to={language}>{item.slice(2)}</T></span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-16 px-4">
        <h2 className="text-center text-3xl font-bold flex flex-col gap-4">🌟 What Our Clients Say</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            {
              quote: `"We moved from spreadsheets and scattered emails to a single system that does it all. WonHubs has saved us over 20 hours a week."`,
              author: "— S. Dinesh, Operations Manager, MetroPlus Hospitals",
            },
            {
              quote: `"The CRM tools helped us close more leads and the ticket system keeps our clients happy. Great support from the WonHubs team!"`,
              author: "— K. Sreeja, Head of Growth, Edurise",
            },
          ].map((item, i) => (
            <div key={i} className="bg-[#f9f9f9] p-6 rounded-lg shadow hover:shadow-lg transition text-center">
              <p className="italic mb-4">{item.quote}</p>
              <p className="font-semibold">{item.author}</p>
            </div>
          ))}
        </div>
      </section> */}
      <section className="bg-white/10 py-8 px-4">
        <h2
          className="text-center !text-xl md:!text-3xl font-bold mb-12 grid grid-cols-2 md:grid-cols-3 text-nowrap"
        >
          <span className="hidden md:block"></span>
          <T to={language}>Training Videos</T>
          <a
            href="/learing-and-training"
            target="_blank"
            className="text-sm flex items-center gap-2 justify-end text-right"
          >
            <T to={language}> Learn More</T> <IoIosArrowRoundForward />
          </a>
        </h2>

        <GradientSlider videoList={videoList} />
      </section>

      {/* Integrations & Security */}
      <section className="bg-[#f9f9f9] py-8 px-4 flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold mb-12">
          <T to={language}> Seamless Integrations & Security You Can Trust</T>
        </h2>
        <div className="md:w-full lg:w-5/9 mx-auto grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded p-2 shadow">
            <h3 className="text-xl font-bold mb-4">✅ <T to={language}>Integrations</T></h3>
            <ul className="list-disc list-inside space-y-2">
              <li><T to={language}>WhatsApp Business API</T></li>
              <li><T to={language}>Google Calendar & Gmail</T></li>
              <li><T to={language}>Razorpay, PayU, Stripe</T></li>
              <li><T to={language}>SMS Gateways (TextLocal, MSG91)</T></li>
              <li><T to={language}>Excel/CSV Lead Upload</T></li>
            </ul>
          </div>

          <div className="bg-white rounded p-2 shadow">
            <h3 className="text-xl font-bold mb-4">🔐 <T to={language}>Security</T></h3>
            <ul className="list-disc list-inside space-y-2">
              <li><T to={language}>Role-based access</T></li>
              <li><T to={language}>Encrypted data storage</T></li>
              <li><T to={language}>Daily backups & 99.9% uptime</T></li>
              <li><T to={language}>GDPR & HIPAA-ready (on request)</T></li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6"><T to={language}> How It Works</T></h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          <T to={language}>Sign Up in 2 Minutes → Import Your Data or Start Fresh → Customize Modules & Automations → Go Live with Your Team</T>
        </p>
        <p className="text-[#fca311] font-semibold">🎁 <T to={language}>Free onboarding support included with all plans.</T></p>
      </section>

      {/* Contact Us */}
      <section className="w-full bg-[#042154] text-white py-12 md:py-20 px-4 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4"> <T to={language}>Ready to Take Control of Your Business?</T></h2>
        <p className="w-full mx-auto mb-8 text-lg">
          <T to={language}> Let WonHubs be your digital partner in growth.</T>
        </p>
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <button
            type="button"
            onClick={() => Navigation('/request/demo')}
            className="!bg-[#0476d3] !text-white !px-5 !py-3 !rounded-full hover:!bg-white hover:!text-black hover:!shadow transition duration-500"
          >
            <T to={language}>Request a Free Demo</T>
          </button>
          <button
            type="button"
            onClick={() => Navigation('/external/register')}
            className="border border-black !px-5 !py-3 text-black !rounded-full hover:!bg-black hover:!text-white transition duration-500"
          >
            <T to={language}>Start Your Free Trial</T>
          </button>
        </div>
        <div className="w-full mx-auto text-gray-50  flex items-center justify-center flex-wrap ">
          <p className="border-r-2 px-2 m-0">📞<T to={language}> Phone: +91-7893536373</T></p>
          <p className="border-r-2 px-2 m-0">📧 <T to={language}>Email: support@wonhubs.com</T></p>
          <p className="border-r-2 px-2 m-0">📍 <T to={language}>Location: Kanuru, Vijayawada, Andhra Pradesh India</T></p>
          <a href="https://wonhubs.com" className=" px-2 m-0">🌐<T to={language}> Website: wonhubs.com</T></a>
        </div>
        <p className="mt-2"><T to={language}>Or fill out our contact form and we’ll get back to you within 24 hours.</T></p>
      </section>

      <footer className="text-center py-2 text-xs  bg-[#042154] text-white">
        © {new Date().getFullYear()} <T to={language}>WonHubs. All rights reserved.</T>
      </footer>

      {sideNavOpen &&
        <div
          className="fixed w-screen h-screen bg-[#052569] text-white z-10 p-0 flex flex-col"
        >
          <button
            type='button'
            onClick={() => setSideNavOpen(false)}
            className="!bg-transparent self-end !mx-8 mt-2 border"
          >
            {renderIcons('IoIosClose', 20, 'inherit')}
          </button>
          <div className="flex flex-col !gap-4 md:!gap-8 p-10">

            {navOptions.map(item => (
              <>
                <div
                  key={item.id}
                  onClick={() => Navigation()}
                >
                  <T to={language}>{item.label}</T>
                </div>
              </>
            ))}
          </div>
        </div>
      }
    </div >
  );
}
