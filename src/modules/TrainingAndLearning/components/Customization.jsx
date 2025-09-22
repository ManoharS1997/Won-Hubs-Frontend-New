import { useEffect, useRef } from "react";

// Helper to highlight search terms
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

export default function Customization({ searchText, onMatch }) {
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
    "Rename modules (e.g., Patients instead of Leads)",
    "Create custom ticket types or sales stages",
    "Build workflows for your team’s daily routines",
    "Set permissions so each user only sees what they need",
  ];

  return (
    <div className="flex items-center justify-between">
      <section ref={containerRef} className="text-[1rem]">
        <h2 className="text-3xl font-bold mb-4">
          {highlightText("🧩 Customization: Make It Yours", searchText)}
        </h2>
        <p className="mb-4">
          {highlightText("Won Hubs isn’t one-size-fits-all. You can:", searchText)}
        </p>
        <ul className="list-disc list-inside space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx}>{highlightText(item, searchText)}</li>
          ))}
        </ul>
      </section>
      <img
        src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/Untitled_design_5_rhmoro'
        className='w-[300px] h-fit'
      />
    </div>
  );
}
