import { Link } from 'react-router-dom';

// Mock user data
const mockUser = {
  id: 1,
  name: 'JaneDoe',
  bio: 'Customer Support Specialist. Here to help!',
  avatar: 'https://i.pravatar.cc/150?u=JaneDoe',
  posts: [
    {
      id: '1',
      title: 'How do I set up ticket escalations?',
      category: 'Support & Help',
      date: '2024-06-10',
    },
    {
      id: '2',
      title: 'Best way to onboard a new team?',
      category: 'Support & Help',
      date: '2024-06-09',
    },
    {
      id: '3',
      title: 'Workflow automations ideas',
      category: 'Product Ideas',
      date: '2024-06-08',
    },
  ],
};

export default function UserProfilePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white border rounded-lg p-6 shadow-sm mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={mockUser.avatar}
          alt={`${mockUser.name}'s avatar`}
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="!text-3xl font-bold text-[#14213d] mb-2">{mockUser.name}</h1>
          <p className="text-gray-700">{mockUser.bio}</p>
        </div>
      </div>

      <section>
        <h2 className="!text-2xl font-bold mb-4 text-[#14213d]">📝 Posts by {mockUser.name}</h2>
        <div className="space-y-4">
          {mockUser.posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            mockUser.posts.map((post) => (
              <Link
                key={post.id}
                to={`/community/posts/${post.id}`}
                className="block border rounded-lg p-4 bg-white hover:shadow-lg transition"
              >
                <h3 className="!text-lg font-semibold text-[#14213d] mb-1">{post.title}</h3>
                <div className="text-sm text-gray-600">
                  {post.category} • {new Date(post.date).toLocaleDateString()}
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
