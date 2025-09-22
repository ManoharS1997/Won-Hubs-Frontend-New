import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const mockAdminArticles = {
  'user-management': {
    title: 'Managing Users & Teams',
    content: `
## Managing Users & Teams

Admins can:

- Add new users
- Assign roles (Admin, Agent, Viewer)
- Deactivate accounts

### Steps
1. Go to Admin → Users
2. Click "Add User"
3. Enter email, assign role.
`
  },
  'permissions': {
    title: 'Roles & Permissions',
    content: `
## Roles & Permissions

Control access to modules.

- Admin: Full control
- Agent: Limited access
- Viewer: Read-only

Set these under Admin → Roles.
`
  },
  // Add more articles here...
};

export default function AdminArticlePage() {
  const { articleId } = useParams();

  const article = mockAdminArticles[articleId];

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#14213d]">❌ Article Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find that admin guide.</p>
        <Link
          to="/docs/admin"
          className="inline-block bg-[#fca311] text-white px-6 py-3 rounded-full hover:bg-[#e1940e] transition"
        >
          🔙 Back to Admin Docs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800">
      <section className="bg-gradient-to-r from-[#14213d] to-[#1f2d4a] py-8 px-4 text-white text-center">
        <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
        <p className="max-w-2xl mx-auto text-lg">Admin Documentation</p>
      </section>

      <div className="max-w-3xl mx-auto py-12 px-4 prose prose-lg">
        <ReactMarkdown>
          {article.content}
        </ReactMarkdown>
        <div className="mt-8">
          <Link
            to="/docs/admin"
            className="inline-block bg-[#fca311] text-white px-6 py-3 rounded-full hover:bg-[#e1940e] transition"
          >
             Back to Admin Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
