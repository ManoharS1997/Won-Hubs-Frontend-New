import { NavLink } from 'react-router-dom';

export default function SidebarNav() {
  return (
    <aside className="w-64 border-r p-4 hidden md:block">
      <nav className="space-y-3">
        <NavLink to="/community/home" className="block text-[#14213d] hover:text-[#fca311]">🏠 Home</NavLink>
        <NavLink to="/community/categories" className="block text-[#14213d] hover:text-[#fca311]">📂 Categories</NavLink>
        <NavLink to="/community/guidelines" className="block text-[#14213d] hover:text-[#fca311]">📜 Guidelines</NavLink>
        <NavLink to="/community/posts/new" className="block text-[#14213d] hover:text-[#fca311]">➕ New Post</NavLink>
      </nav>
    </aside>
  );
}
