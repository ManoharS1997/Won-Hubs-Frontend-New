
import { useMemo, useContext, useState } from 'react';
// import { FaChevronDown } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import WhatIsWonhubs from '../components/WhatIsWonhubs';
import WhatYouLearn from '../components/WhatYouLearn';
import CoreConcepts from '../components/CoreComponents';
import UserRoles from '../components/UserRoles';
import LearningUseCases from '../components/LearningUseCases';
import QuickWins from '../components/QuickWins';
import SmartTips from '../components/SmartTips';
import Customization from '../components/Customization';
import Exercises from '../components/Exercises';
import Privacy from '../components/Privacy';
import WhatsNext from '../components/WhatsNext';
import WonContext from '../../../context/WonContext';
import WonhubsIntroduction from '../components/v1/WonhubsIntroduction';
import GetStartedWithWonhubs from '../components/tutorials/GetStarted';
import Select from 'react-dropdown-select';

import { TbVersions } from "react-icons/tb";
import { BiSolidVideos } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";

const versions = [
  {
    version: 'v1.0',
    sections: [
      { id: 'introduction', title: 'Introduction to Won Hubs' },
      { id: 'core-concepts', title: 'Core Concepts' },
      { id: 'user-roles', title: 'User Roles & Permissions' },
      { id: 'quick-wins', title: 'Quick Wins' },
      { id: 'customization', title: 'Customization Basics' },
      { id: 'sample-exercises', title: 'Sample Exercises' },
      { id: 'privacy-support', title: 'Privacy & Support' },
      { id: 'whats-next', title: 'What’s Next?' }
    ],
  },
  {
    version: 'v2.0.2',
    sections: [],
  }
];

const tutorials = [
  {
    id: 'v-getting-started',
    title: 'Getting Started with Won Hubs',
    description: 'A beginner-friendly walkthrough of the Won Hubs platform, covering sign-up, navigation, and basic features.',
    videoUrl: 'https://www.example.com/video/getting-started'
  },
  {
    id: 'v-customizing-dashboard',
    title: 'Customizing Your Dashboard',
    description: 'Learn how to personalize your dashboard, add widgets, and organize your workspace for maximum productivity.',
    videoUrl: 'https://www.example.com/video/customizing-dashboard'
  },
  {
    id: 'v-managing-users',
    title: 'Managing Users & Permissions',
    description: 'Step-by-step guide to adding users, assigning roles, and managing permissions within your organization.',
    videoUrl: 'https://www.example.com/video/managing-users'
  },
  {
    id: 'v-automation-basics',
    title: 'Automation Basics',
    description: 'Discover how to automate repetitive tasks and streamline your workflows using Won Hubs automation tools.',
    videoUrl: 'https://www.example.com/video/automation-basics'
  }
]

const helpItems = [
  "📞 Phone: +91-XXXXXXXXXX",
  "📧 Email: support@wonhubs.com",
  "📄 Download Quick Start Guide",
  "🖥️ Request Custom Training",
];

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

export default function LearningPage() {
  const [openVersion, setOpenVersion] = useState('');
  const [searchText, setSearchText] = useState('');
  const [matchingSections, setMatchingSections] = useState(new Set());
  const [category, setCategory] = useState(null)
  const { setLearningPageserachText, searchInputForArticles } = useContext(WonContext)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const allOption = { label: 'All', value: 'all' };
  const [selectedCategory, setSelectedCategory] = useState([allOption]);
  const [search, setSearch] = useState('');

  const { contentName } = useParams()
  const Navigate = useNavigate()
  const options = useMemo(() => [
    allOption,
    ...versions.map(item => ({ label: item.title, value: item.id }))
  ], []);

  const getSearchResults = () => {
    const lower = searchText.toLowerCase();
    return versions
      .flatMap(ver =>
        ver.sections.map(sec => ({
          ...sec,
          version: ver.version
        }))
      )
      .filter(sec =>
        !searchText.trim() || // if search is empty, show everything
        sec.title.toLowerCase().includes(lower) ||
        matchingSections.has(sec.id)
      );
  };

  const handleSectionMatch = (sectionId, didMatch) => {
    setMatchingSections(prev => {
      const newSet = new Set(prev);
      if (didMatch) {
        newSet.add(sectionId);
      } else {
        newSet.delete(sectionId);
      }
      return newSet;
    });
  };

  const toggleVersion = (version) => {
    setOpenVersion(openVersion === version ? '' : version);
  };

  const renderVersions = () => {
    return versions.map((ver) => (
      <div key={ver.version} className=" rounded-lg p-4 bg-white">
        <button
          onClick={() => toggleVersion(ver.version)}
          className="flex items-center justify-between w-full text-left text-lg font-semibold !py-2 !px-3 !border-b !border-gray-200"
        >
          {ver.version}
        </button>

        <ul className="mt-2 ml-2 border-l border-[#0476d3]/30 pl-3 space-y-1">
          {ver.sections.map((section) => (
            <li key={section.id}>
              <p
                onClick={() => {
                  setIsDropdownOpen(false);
                  Navigate(`/learing-and-training/${section.id}`);
                }}
                className={`block text-sm text-[#14213d] hover:text-[#0476d3] transition cursor-pointer ${section.id === contentName ? '!text-[#0476d3]' : ''}`}
              >
                {section.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    ))
  }

  const renderTutorials = () => {
    return (
      <div>
        <h2>Tutorials</h2>
        <ul className="">
          {tutorials.map((tutorial, index) => (
            <div key={tutorial.id} className=" rounded-lg flex flex-col">
              <p
                className="text-[1rem] hover:underline cursor-pointer text-[#0476d3]"
                onClick={() => {
                  setIsDropdownOpen(false);
                  Navigate(`/learing-and-training/${tutorial.id}`);
                }}
              >
                {index + 1}. {tutorial.title}
              </p>
            </div>
          ))}
        </ul>
      </div>
    );
  }

  const HomeContent = () => {
    return (
      <div className="h-screen flex-1 flex flex-col items-center justify-start px-0 pb-12 ">
        <section
          className=' w-full min-h-[70vh] justify-center !px-4 md:!px-15 flex flex-col mb-4'
          style={{
            backgroundImage: "url('https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/3_s3w8uq')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          <h1
            className="!text-3xl md:!text-4xl font-bold text-[#14213d] 
                md:w-1/2 !m-0"
          >
            From Learning to Leading <br />
            Powered by WonHubs.
          </h1>
          <p className="md:w-[40%] text-lg !mb-6 text-gray-700">
            This is your starting point to master Won Hubs. Whether you’re a new user or looking to deepen your knowledge, you’ll find step-by-step guides, best practices, and tips to help you succeed.
          </p>
        </section>
        <div className="w-full h-fit !px-4 md:!px-30 flex flex-col gap-4">
          <div className='flex items-center justify-between'>
            <div className="mb-8">
              <h2 className="!text-2xl font-semibold mb-2">What You’ll Find Here:</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[1rem]">
                <li>Clear explanations of core modules and features</li>
                <li>Quick wins to get you productive fast</li>
                <li>Role-based learning paths for Admins, Sales, Support, and more</li>
                <li>Sample exercises to practice what you learn</li>
                <li>Customization tips to tailor Won Hubs to your business</li>
                <li>Privacy, support, and next steps for your journey</li>
              </ul>
            </div>

            <img
              src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/vecteezy_student-online-learning-for-search-engine-optimization-and_5151168_ncu4ft'
              className='w-[400px] h-fit'
            />
          </div>

          <div className='flex items-center justify-between px-15'>
            <img
              src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/Screenshot_2025-07-10_123421_hkgwwl'
              className='w-[300px] h-fit'
            />
            <div className="mb-8">
              <h2 className="!text-2xl font-semibold !mb-2">How to Use This Section:</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-800 text-[1rem]">
                <li>Browse the menu on the header to jump to any topic</li>
                <li>Follow the guides and try out the exercises</li>
                <li>Share with your team for faster onboarding</li>
                <li>Reach out to support if you need help or custom training</li>
              </ol>
            </div>
          </div>

          <div className="bg-[#0476d3]/10 border-l-4 border-[#0476d3] p-4 rounded mb-6">
            <p className="text-[#14213d] font-medium">
              <span className="mr-2">💡</span>
              Tip: Bookmark this page for easy access as you explore Won Hubs!
            </p>
          </div>

          <WhatIsWonhubs
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("what-is", didMatch)}
          />
          <WhatYouLearn
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("what-you-learn", didMatch)}
          />
          <CoreConcepts
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("core-concepts", didMatch)}
          />
          <UserRoles
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("roles", didMatch)}
          />
          <LearningUseCases
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("use-cases", didMatch)}
          />
          <QuickWins
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("quick-wins", didMatch)}
          />
          <SmartTips
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("tips", didMatch)}
          />
          <Customization
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("customization", didMatch)}
          />
          <Exercises
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("exercises", didMatch)}
          />
          <Privacy
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("privacy", didMatch)}
          />
          <div className="mt-8">
            <h3 className="!text-lg font-semibold mb-2">Ready to get started?</h3>
            <p className="mb-2">Select a topic from the menu or begin with <span className="font-semibold">"What is Won Hubs?"</span> to learn the basics.</p>
            <p className="text-gray-600">Happy learning! 🚀</p>
          </div>
          <WhatsNext
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("next", didMatch)}
          />
        </div>
        <footer
          className='w-full !px-10 py-4 bg-[#02063f] !text-white '
        >
          <div className="flex items-center justify-center gap-4">
            {helpItems.map((item, idx) => (
              <p key={idx} className='border-r-1 pr-4'>{item}</p>
            ))}
          </div>
        </footer>
      </div>
    )
  }

  const switchCategory = () => {
    switch (category) {
      case 'versions':
        return renderVersions()
      case 'tutorials':
        return renderTutorials()
      default:
        return null
    }
  }

  const renderContent = () => {
    switch (contentName) {
      case "introduction":
        return (
          <WonhubsIntroduction
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("what-is", didMatch)}
          />
        );
      case "what-you-learn":
        return (
          <WhatYouLearn
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("what-you-learn", didMatch)}
          />
        );
      case "core-concepts":
        return (
          <CoreConcepts
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("core-concepts", didMatch)}
          />
        );
      case "roles":
        return (
          <UserRoles
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("roles", didMatch)}
          />
        );
      case "use-cases":
        return (
          <LearningUseCases
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("use-cases", didMatch)}
          />
        );
      case "quick-wins":
        return (
          <QuickWins
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("quick-wins", didMatch)}
          />
        );
      case "tips":
        return (
          <SmartTips
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("tips", didMatch)}
          />
        );
      case "customization":
        return (
          <Customization
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("customization", didMatch)}
          />
        );
      case "exercises":
        return (
          <Exercises
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("exercises", didMatch)}
          />
        );
      case "privacy":
        return (
          <Privacy
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("privacy", didMatch)}
          />
        );
      case "next":
        return (
          <WhatsNext
            searchText={searchText}
            onMatch={didMatch => handleSectionMatch("next", didMatch)}
          />
        );
      case 'v-getting-started':
        return <GetStartedWithWonhubs />
      default:
        return <HomeContent />
    }
  }

  const navOptions = (category) => {
    setIsDropdownOpen(true)
    setCategory(category)
  }

  return (
    <div className="relative bg-white text-gray-800 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header
        className="sticky top-0 z-20 w-full h-[10vh] bg-[#0476d3]/10 border-b px-2 md:px-4 py-2 
        grid grid-cols-2 md:grid-cols-3 ">
        <h2
          className="!text-sm md:!text-xl font-bold text-[#14213d] cursor-pointer !m-0 flex items-center"
          onClick={() => Navigate('/learing-and-training')}
        >
          📖 Learning & Training
        </h2>

        <div
          className="relative flex items-center justify-end md:justify-center gap-4 md:gap-15 "
        >
          <span
            className="text-sm md:text-[1rem] hover:underline"
            onMouseEnter={() => navOptions('versions')}
          >
            <span className='hidden md:flex'> VERSIONS</span>
            <span className='md:hidden flex'><TbVersions size={25} /> </span>
          </span>
          <span
            className="text-sm md:text-[1rem] hover:underline"
            onMouseEnter={() => navOptions('tutorials')}
          >
            <span className='hidden md:flex'> TUTORIALS</span>
            <span className='md:hidden flex'><BiSolidVideos size={25} /> </span>
          </span>
        </div>

        <span className='hidden md:block'></span>
      </header>

      {/* Overlay Dropdown */}
      {isDropdownOpen && (
        <div
          className="absolute top-[10vh] left-0 w-full bg-white border-b shadow-lg z-10
           overflow-y-auto max-h-[80vh] px-6 py-6 flex flex-col"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            type='button'
            className='self-end border p-1 !rounded-full hover:!bg-red-500 hover:text-white'
            title='Close'
            onClick={() => setIsDropdownOpen(false)}
          >
            <IoCloseSharp size={15} />
          </button>
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
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {switchCategory()}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {renderContent()}
        {/* Contact Us */}
        <section className="w-full bg-[#042154] text-white py-12 md:py-20 px-4 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"> Ready to Take Control of Your Business?</h2>
          <p className="w-full mx-auto mb-8 text-lg">
            Let WonHubs be your digital partner in growth.
          </p>
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            <button
              type="button"
              onClick={() => Navigate('/request/demo')}
              className="!bg-[#0476d3] !text-white !px-5 !py-3 !rounded-full hover:!bg-white hover:!text-black hover:!shadow transition duration-500"
            >
              Request a Free Demo
            </button>
            <button
              type="button"
              onClick={() => Navigate('/external/register')}
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
      </main>
    </div>
  );
}
