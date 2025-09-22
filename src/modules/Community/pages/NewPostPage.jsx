import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'support', name: '💬 Support & Help' },
  { id: 'product-ideas', name: '💡 Product Ideas' },
  { id: 'general', name: '🌐 General Discussion' },
  { id: 'announcements', name: '📣 Announcements' },
  { id: 'success-stories', name: '🏆 Success Stories' },
  { id: 'partner-connect', name: '🤝 Partner Connect' },
];

export default function NewPostPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0].id);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    // In real app, you'd POST to server here
    alert(`Post Created!\n\nTitle: ${title}\nCategory: ${category}\nContent: ${content}`);
    navigate('/community/categories/' + category);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-4 text-[#14213d]">➕ Create New Post</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="title">
            Post Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-[#0476d3]"
            placeholder="Enter your question or topic"
          />
        </div>

        <div className="mb-4 flex items-center gap-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="category">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg focus:outline-[#0476d3]"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1" htmlFor="content">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full border rounded-lg p-3 resize-none focus:outline-[#0476d3]"
            placeholder="Write your question, idea, or topic details..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="!bg-[#0476d3] text-white !px-6 !py-3 !rounded-full hover:!bg-[#0476d3b7] transition duration-500"
        >
          ➕ Post to Community
        </button>
      </div>
    </div>
  );
}
