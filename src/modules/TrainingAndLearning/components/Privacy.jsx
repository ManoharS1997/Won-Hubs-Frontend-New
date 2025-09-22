import { useEffect, useRef } from "react";

// Helper to highlight matches
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

export default function Privacy({ searchText, onMatch }) {
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
    "Your data is encrypted and backed up daily",
    "Role-based access ensures team security",
    "Help is always available via email or demo calls",
    "A knowledge base and how-to videos are available (on request)",
  ];

  return (
    <div className="flex items-center justify-between">
      <section ref={containerRef} className="">
        <h2 className="text-3xl font-bold mb-4">
          {highlightText("🔐 Privacy & Support", searchText)}
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx}>{highlightText(item, searchText)}</li>
          ))}
        </ul>
      </section>
      <img
        src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/Untitled_design_7_t61hmr'
        className='w-[350px] h-fit'
      />
    </div>
  );
}
