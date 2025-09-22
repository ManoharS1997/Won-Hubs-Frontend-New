import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaLayerGroup, FaPlus, FaBook, FaUser } from 'react-icons/fa';

export default function CommunityLayout() {
  return (
    <div className="h-screen flex bg-white text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-gray-50 hidden md:flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6 text-[#14213d] flex items-center gap-2">
          <img
            alt='Logo'
            className='h-8 w-fit'
            src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/olnxfrhzkj0czc5fsvxt'
          />
          Community
        </h2>
        <nav className="space-y-4">
          {[
            { to: "/community/home", icon: <FaHome />, label: "Home" },
            { to: "/community/categories", icon: <FaLayerGroup />, label: "Categories" },
            { to: "/community/posts/new", icon: <FaPlus />, label: "New Post" },
            { to: "/community/guidelines", icon: <FaBook />, label: "Guidelines" },
            { to: "/community/user/profile", icon: <FaUser />, label: "Profile" },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-[#0476d3]/10 transition ${isActive ? 'bg-[#0476d3]/20 font-bold' : ' text-black'}`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => {
            // Example: Clear auth token and redirect to login
            // localStorage.removeItem('authToken');
            // window.location.href = '/login';
          }}
          className="flex items-center gap-2 !p-2 !rounded-full hover:!bg-red-100 text-red-600 transition font-semibold w-full !mt-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
          </svg>
          Logout
        </button>
      </aside>
      <main className="flex-1 min-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
