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

export default function Exercises({ searchText, onMatch }) {
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
    "Add a lead, assign it to a teammate, and set a follow-up reminder",
    "Create a support ticket and track its progress",
    "Send a WhatsApp message from within Won Hubs",
    "Generate a simple sales report",
    "Create a task, assign it to a department, and mark it complete",
  ];

  return (
    <div className="flex items-center justify-between">
      <img
        src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/Untitled_design_6_lfyr7n'
        className='w-[300px] h-fit'
      />
      <section ref={containerRef} className="">
        <h2 className="text-3xl font-bold mb-4">
          {highlightText("🧪 Test It Out: Sample Exercises", searchText)}
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx}>{highlightText(item, searchText)}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
