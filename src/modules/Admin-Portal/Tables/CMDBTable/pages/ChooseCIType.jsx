import { useNavigate } from "react-router-dom";
import renderIcons from "../../../../../shared/functions/renderIcons";

const ciTypes = ['business_services', 'application', 'hardware', 'network', 'cloud_resources', 'datacenter', 'operating_system', 'database', 'middleware', 'software', 'user_devices', 'people', 'facilities', 'documents', 'extended_classes'];

export default function ChooseCIType() {
  const Navigate = useNavigate()

  return (
    <div className="w-full h-full choose-ci-type px-2 md:px-4 py-3 flex flex-col gap-4 ">
      <h2 className="text-2xl h-[10%] m-0  flex items-center gap-4 col-span-full font-bold">
        <button
          type="button"
          className="!bg-inherit"
          onClick={() => Navigate(-1)}
        >
          {renderIcons("IoChevronBack", 30)}
        </button>
        Choose CI Type
      </h2>
      <p className="px-2 md:px-10 m-0">
        Please select the type of Configuration Item (CI) you want to manage.
      </p>

      <ul className="w-full h-fit !px-2 md:!px-10 flex flex-col md:flex-row md:flex-wrap items-center gap-4 overflow-auto">
        {ciTypes.map((type) => (
          <li
            key={type}
            onClick={() => Navigate(`/cmdb/${type}`)}
            className="w-full md:w-fit text-center border py-2 px-3 cursor-pointer hover:bg-blue-600 hover:text-white text-[var(--text-color)] transition-all duration-500 "
          >
            <span>
              {type
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
} 