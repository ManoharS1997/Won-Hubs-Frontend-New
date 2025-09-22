import { useEffect, useRef } from "react";

// Utility to highlight matches
function highlightText(text, searchText) {
  if (!searchText) return text;

  const lowerText = text.toLowerCase();
  const lowerSearch = searchText.toLowerCase();

  const parts = [];
  let lastIndex = 0;

  while (true) {
    const index = lowerText.indexOf(lowerSearch, lastIndex);
    if (index === -1) {
      parts.push(text.slice(lastIndex));
      break;
    }
    parts.push(text.slice(lastIndex, index));
    parts.push(
      <span key={index} className="bg-yellow-200 font-semibold">
        {text.slice(index, index + searchText.length)}
      </span>
    );
    lastIndex = index + searchText.length;
  }

  return parts;
}

export default function UserRoles({ searchText, onMatch }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!searchText) {
      onMatch(false);
      return;
    }
    if (containerRef.current) {
      const text = containerRef.current.textContent || "";
      const isMatch = text.toLowerCase().includes(searchText.toLowerCase());
      onMatch(isMatch);
    }
  }, [searchText, onMatch]);

  const listItems = [
    "Admin: Full access to settings and team controls",
    "Sales Agents: Focused on leads and follow-ups",
    "Support Staff: Handle incoming support tickets",
    "Managers: Oversee team activity and performance",
    "Clients (optional): Can be given limited access to view progress or submit requests"
  ];

  return (
    <div className="flex items-center justify-between">
      <img
        src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/Untitled_design_2_mjfwsf'
        className='w-[300px] h-fit'
      />
      <section
        ref={containerRef}
        id="roles"
        className=""
      >
        <h2 className="!text-3xl font-bold !mb-4 text-[#14213d]">
          {highlightText("🛠️ User Roles You’ll Encounter", searchText)}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-[1rem] ">
          {listItems.map((item, idx) => (
            <li key={idx}>{highlightText(item, searchText)}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
