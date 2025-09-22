import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { TbArrowBigUpLines, TbArrowBigDownLines } from "react-icons/tb";

// Sample mock data
const mockPost = {
  id: '1',
  title: 'How do I set up ticket escalations?',
  author: 'JaneDoe',
  content: 'I want to automatically escalate tickets after 24h. How can I do that in Won Hubs?',
  date: '2024-06-10',
  replies: [
    {
      id: 'r1',
      author: 'SupportGuru',
      content: 'You can create a rule in settings → automations. Works great for our team.',
      date: '2024-06-11'
    },
    {
      id: 'r2',
      author: 'TeamLead42',
      content: 'Also recommend adding email notifications for escalations!',
      date: '2024-06-12'
    }
  ]
};

export default function PostDetailPage() {
  const { postId } = useParams();
  const [newReply, setNewReply] = useState('');
  const Navigate = useNavigate()

  // Mock save
  const handleReply = () => {
    if (newReply.trim() !== '') {
      alert(`Reply posted: "${newReply}" (not really saved in this mock)`);
      setNewReply('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <span
        className='flex items-center gap-2 mb-4 text-xl'
        onClick={() => Navigate(-1)}
      >
        <IoIosArrowBack size={25} /> Back
      </span>
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-[#14213d] mb-2">{mockPost.title}</h1>
        <div className="text-sm text-gray-500 mb-4">
          by {mockPost.author} • {new Date(mockPost.date).toLocaleDateString()}
        </div>
        <p className="text-gray-800 mb-6">{mockPost.content}</p>
        <div className='flex items-center gap-4'>
          <span className='flex items-center gap-2'>{mockPost?.upvotes || 0} <TbArrowBigUpLines size={18} /> </span>
          <span className='flex items-center gap-2'>{mockPost?.downvotes || 0} <TbArrowBigDownLines size={18} /> </span>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-[#14213d]">💬 Replies</h2>
        <div className="space-y-4">
          {mockPost.replies.map(reply => (
            <div key={reply.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">
                {reply.author} • {new Date(reply.date).toLocaleDateString()}
              </div>
              <p className="text-gray-800">{reply.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-bold mb-2 text-[#14213d]">➕ Add a Reply</h3>
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          className="w-full border rounded-lg p-3 mb-3 resize-none focus:outline-[#fca311]"
          rows="4"
          placeholder="Write your reply here..."
        />
        <button
          onClick={handleReply}
          className="bg-[#fca311] text-white px-6 py-2 rounded-full hover:bg-[#e1940e] transition"
        >
          Post Reply
        </button>
      </section>
    </div>
  );
}
