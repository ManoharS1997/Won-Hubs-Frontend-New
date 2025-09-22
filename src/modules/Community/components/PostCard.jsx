export default function PostCard({ title, author, replies, link }) {
  return (
    <a href={link} className="block border rounded-lg p-5 hover:shadow-lg transition">
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500">by {author} • {replies} replies</p>
    </a>
  );
}
