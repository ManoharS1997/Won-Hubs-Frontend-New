import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'support',
    name: '💬 Support & Help',
    description: 'Ask questions and get help from the community.',
    postCount: 34,
  },
  {
    id: 'product-ideas',
    name: '💡 Product Ideas',
    description: 'Share and vote on feature requests.',
    postCount: 22,
  },
  {
    id: 'general',
    name: '🌐 General Discussion',
    description: 'Chat about anything related to Won Hubs.',
    postCount: 15,
  },
  {
    id: 'announcements',
    name: '📣 Announcements',
    description: 'Official updates and release notes.',
    postCount: 8,
  },
  {
    id: 'success-stories',
    name: '🏆 Success Stories',
    description: 'Share how you’ve used Won Hubs to grow.',
    postCount: 12,
  },
  {
    id: 'partner-connect',
    name: '🤝 Partner Connect',
    description: 'Find consultants, integrators, and vendors.',
    postCount: 5,
  },
];

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="!text-4xl font-bold mb-8 text-[#14213d]"> Community Categories</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <Link
            key={cat.id}
            to={`/community/categories/${cat.id}`}
            className="block border rounded-lg p-4 shadow-sm hover:shadow-lg transition bg-white"
          >
            <h2 className="!text-xl font-bold mb-2 text-[#14213d]">{cat.name}</h2>
            <p className="text-gray-600 mb-3">{cat.description}</p>
            <div className="text-sm text-[#0476d3] bg-[#0476d3]/10 w-fit px-1 rounded font-semibold">{cat.postCount} Posts</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
