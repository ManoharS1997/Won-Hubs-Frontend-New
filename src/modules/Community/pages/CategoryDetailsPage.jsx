import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { TbArrowBigUpLines, TbArrowBigDownLines } from "react-icons/tb";

const mockPosts = [
  {
    id: '1',
    title: 'How do I set up ticket escalations?',
    author: 'JaneDoe',
    replies: 5,
    date: '2024-06-10',
  },
  {
    id: '2',
    title: 'Best way to onboard a new team?',
    author: 'SupportGuru',
    replies: 8,
    date: '2024-06-09',
  },
  {
    id: '3',
    title: 'Workflow automations ideas',
    author: 'TeamLead42',
    replies: 2,
    date: '2024-06-08',
  },
  {
    id: '4',
    title: 'Is WhatsApp integration live?',
    author: 'JohnSmith',
    replies: 4,
    date: '2024-06-07',
  },
];

export default function CategoryDetailPage() {
  const { id } = useParams();
  const Navigate = useNavigate()

  // Optional: Format category name from slug
  const categoryName = id
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 overflow-auto">
      <h1
        className="!text-3xl md:text-4xl font-bold !mb-8 text-[#14213d] flex items-center justify-between"
      >
        <span className='flex items-center gap-2'>
          <IoIosArrowBack onClick={() => Navigate(-1)} />
          {categoryName} Posts
        </span>

        <div className="text-center">
          <Link
            to="/community/posts/new"
            className="inline-block bg-[#fca311] text-white text-sm px-4 py-2 rounded-full hover:bg-[#e1940e] transition"
          >
            ➕ Start a New Post
          </Link>
        </div>
      </h1>

      <div className="space-y-6">
        {mockPosts.map((post) => (
          <Link
            key={post.id}
            to={`/community/posts/${post.id}`}
            className="block border rounded-lg p-3 hover:shadow-lg transition bg-white"
          >
            <h2 className="!text-xl font-bold mb-2 text-[#14213d]">{post.title}</h2>
            <div className="flex justify-between text-sm text-gray-600">
              <span>by {post.author}</span>
              <span>{post.replies} replies</span>
              <div className='flex items-center gap-4 bg-[#0476d3]/10 px-1 py-0.5 rounded text-[#0476d3] '>
                <span className='flex items-center gap-2'>{post?.upvotes || 0} <TbArrowBigUpLines size={18} /> </span>
                <span className='flex items-center gap-2'>{post?.downvotes || 0} <TbArrowBigDownLines size={18} /> </span>
              </div>
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
