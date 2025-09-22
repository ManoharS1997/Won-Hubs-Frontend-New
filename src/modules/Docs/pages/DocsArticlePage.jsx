import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import renderIcons from '../../../shared/functions/renderIcons';

// Example mock docs data
const mockDocs = {
  'crm': {
    title: ' CRM Module',
    articles: {
      'overview': {
        title: 'CRM Overview',
        content: `
## What is the CRM Module?

The CRM module helps you manage leads and customers from first contact to deal closing.

### Features
- Lead capture
- Custom pipelines
- Automated follow-ups
- Lead scoring

### Why Use It?
It streamlines your sales process and improves conversion rates.

For more help, contact support.
        `
      },
      'leads': {
        title: 'Managing Leads',
        content: `
## Managing Leads

Learn how to add, update, and track leads in your CRM.

### Steps
1. Go to CRM → Leads
2. Click "Add Lead"
3. Fill in details and assign
        `
      },
    }
  },

  'getting-started': {
    title: ' Getting Started',
    articles: {
      'setup': {
        title: 'Initial Setup Guide',
        content: `
## Welcome to WonHubs

Let's get your workspace set up in minutes.

### Steps
1. Create your account
2. Invite your team
3. Customize settings
        `
      }
    }
  },
};

export default function DocsArticlePage() {
  const { categoryId, articleId } = useParams();

  const category = mockDocs[categoryId];
  const article = category?.articles[articleId];

  if (!category || !article) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h1 className="!text-3xl font-bold mb-4 text-[#14213d]">❌ Article Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find that article in the documentation.</p>
        <Link
          to={-1}
          className="inline-block bg-[#0476d3]/10 !text-[#0476d3] px-6 py-3 rounded-full hover:bg-[#0476d3] hover:!text-white transition duration-500"
        >
         Go Back 
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#14213d] to-[#1f2d4a] py-8 px-4 text-white text-center">
        <h1 className="!text-4xl font-bold !mb-2">{article.title}</h1>
        <p className="max-w-2xl mx-auto !text-lg">{category.title}</p>
      </section>

      <Link
        to={`/docs/${categoryId}`}
        className="inline-block bg-[#0476d3]/10 text-sm !text-[#0476d3] p-2 rounded-full hover:bg-[#0476d3]
         hover:!text-white transition duration-500 mt-4 ml-4"
      >
        {renderIcons('IoIosArrowBack', 20, 'inherit')}
      </Link>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto py-0 px-4 prose prose-lg">
        <ReactMarkdown>
          {article.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
