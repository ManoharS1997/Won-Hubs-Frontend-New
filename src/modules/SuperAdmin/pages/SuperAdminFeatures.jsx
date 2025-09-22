
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Add Admin",
    description: "Add admins to WONHUBS.",
    icon: <FaStar className="text-red-500 text-3xl" />,
    redirect: '/add/admin'
  },
  {
    title: "Instances",
    description: "All instaces created for WONHUBS will be managed here.",
    icon: <FaStar className="text-red-500 text-3xl" />,
    redirect: '/all/instances'
  },
];

const SuperAdminFeatures = () => {
  const Navigate = useNavigate()

  return (
    <div className="p-8 flex flex-col gap-4">
      <h2 className="text-3xl font-bold mb-6">Super Admin Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            onClick={() => Navigate(feature.redirect)}
            className="bg-white rounded-none shadow-[10px_10px_0px_0px_#000] 
            p-6 flex flex-col items-center cursor-pointer border border-black 
            hover:shadow-none transition-all duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-center">{feature.title}</h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default SuperAdminFeatures;
