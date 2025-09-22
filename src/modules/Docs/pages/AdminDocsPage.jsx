import { Link } from 'react-router-dom';

const adminArticles = [
  { id: 'user-management', title: 'Managing Users & Teams', description: 'Add, remove, and assign roles to your users.' },
  { id: 'permissions', title: 'Roles & Permissions', description: 'Set what each user can access.' },
  { id: 'billing', title: 'Billing & Plans', description: 'Manage your subscription and invoices.' },
  { id: 'automations', title: 'Automation Rules', description: 'Create custom workflows to save time.' },
  { id: 'security', title: 'Security Settings', description: 'Two-factor auth, backups, encryption.' },
];

export default function AdminDocsPage() {
  return (
    <div className="bg-white text-gray-800">
      <section className="bg-gradient-to-r from-[#14213d] to-[#1f2d4a] py-10 px-4 text-white text-center">
        <h1 className="!text-4xl font-bold !mb-2"> Admin Documentation</h1>
        <p className="max-w-2xl mx-auto !text-lg">Guides for admins to configure and manage your workspace.</p>
      </section>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="!text-2xl font-bold !mb-6 text-[#14213d]">📄 Admin Topics</h2>
        <div className="space-y-4">
          {adminArticles.map((article) => (
            <Link
              key={article.id}
              to={`/docs/admin/${article.id}`}
              className="block border rounded-lg p-3 bg-white hover:shadow-lg transition"
            >
              <h3 className="!text-lg font-bold text-[#14213d]">{article.title}</h3>
              <p className="text-gray-600">{article.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/docs"
            className="inline-block bg-[#0476d3] text-white px-6 py-3 rounded-full hover:bg-[#0476d3] transition"
          >
            🔙 Back to Docs Home
          </Link>
        </div>
      </div>
    </div>
  );
}
