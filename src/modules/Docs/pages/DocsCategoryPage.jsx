import { useParams, Link } from 'react-router-dom';
import { BiArrowFromLeft } from "react-icons/bi";
import renderIcons from '../../../shared/functions/renderIcons';

// Sample mock categories data
const mockCategories = {
  'getting-started': {
    id: 'getting-started',
    title: '🚀 Getting Started',
    description: 'Learn how to set up your WonHubs workspace.',
    articles: [
      { id: 'setup', title: 'Initial Setup Guide' },
      { id: 'first-steps', title: 'First Steps' },
      { id: 'faq', title: 'FAQ for New Users' },
    ],
  },
  'crm': {
    id: 'crm',
    title: '📒 CRM Module',
    description: 'Manage leads, pipelines, and customers.',
    articles: [
      { id: 'overview', title: 'CRM Overview' },
      { id: 'leads', title: 'Managing Leads' },
      { id: 'pipelines', title: 'Setting Up Pipelines' },
      { id: 'follow-ups', title: 'Automating Follow-Ups' },
    ],
  },
  'ticketing': {
    id: 'ticketing',
    title: '🛠️ Ticketing System',
    description: 'Automate support and internal requests.',
    articles: [
      { id: 'overview', title: 'Ticketing Overview' },
      { id: 'slas', title: 'Configuring SLAs' },
      { id: 'automations', title: 'Setting Up Automations' },
    ],
  },
  // Add more categories if needed...
};

export default function DocsCategoryPage() {
  const { categoryId } = useParams();

  const category = mockCategories[categoryId];

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#14213d]">❌ Category Not Found</h1>
        <p className="text-gray-600">The documentation category you’re looking for does not exist.</p>
        <Link
          to={-1}
          className="mt-6 inline-block bg-[#0476d3] text-white px-6 py-3 rounded-full hover:bg-[#0476d3] transition"
        >
          🔙 Back to Docs Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#14213d] to-[#1f2d4a] py-10 px-4 text-white text-center">
        <h1 className="!text-4xl font-bold mb-2">{category.title}</h1>
        <p className="max-w-2xl mx-auto !text-lg">{category.description}</p>
      </section>

      {/* Articles List */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="!text-2xl font-bold !mb-6 text-[#14213d] flex items-center gap-2">
          <Link
            to="/docs"
            className="inline-block bg-[#0476d3]/10 text-sm !text-[#0476d3] p-2 rounded-full hover:bg-[#0476d3] hover:!text-white transition duration-500"
          >
            {renderIcons('IoIosArrowBack', 20, 'inherit')}
          </Link>
          📄 Articles in This Category
        </h2>
        <div className="space-y-4">
          {category.articles.map((article) => (
            <Link
              key={article.id}
              to={`/docs/${category.id}/${article.id}`}
              className="block border rounded-lg p-3 bg-white hover:shadow-lg transition"
            >
              <h3 className="!text-lg font-bold text-black flex items-center justify-between">
                {article.title}
                <span className='p-2 bg-[#0476d3]/10 rounded-full flex items-center justify-center w-fit text-[#0476d3]'>
                  <BiArrowFromLeft />
                </span>
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">

        </div>
      </div>
    </div>
  );
}
