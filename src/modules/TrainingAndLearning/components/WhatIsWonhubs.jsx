import { useEffect, useRef } from "react";

// Utility: Highlights all instances of searchText inside the given text
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

export default function WhatIsWonhubs({ searchText, onMatch }) {
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
  }, [searchText]);

  return (
    <main
      ref={containerRef}
      className=" flex items-center justify-between text-[1rem] "
    >
      {/* Example section */}
      <section id="what-is">
        <h2 className="text-3xl font-bold mb-4 text-[#14213d]">
          {highlightText("🔍 What is Won Hubs?", searchText)}
        </h2>
        <p className="mb-4">
          {highlightText(
            "Won Hubs is a single platform that combines the tools your team needs to manage:",
            searchText
          )}
        </p>
        <ul className="list-disc list-inside space-y-2">
          {[
            "Sales and leads",
            "Customer support",
            "Daily tasks and follow-ups",
            "Team communication",
            "Reporting and insights",
          ].map((item, idx) => (
            <li key={idx}>{highlightText(item, searchText)}</li>
          ))}
        </ul>
        <p className="mt-4">
          {highlightText(
            "Instead of switching between different apps, you can run your entire business from one place.",
            searchText
          )}
        </p>
      </section>

      <img
        src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/Untitled_design_khzrpp'
        className='w-[400px] h-fit'
      />
      {/* Add more sections as needed and wrap content with highlightText */}
    </main>
  );
}
