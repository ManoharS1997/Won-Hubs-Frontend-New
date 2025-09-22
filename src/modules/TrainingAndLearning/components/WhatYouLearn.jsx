import { useEffect, useRef } from "react";

// Utility: highlights all instances of searchText in a text
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

export default function WhatYouLearn({ searchText, onMatch }) {
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

  return (
    <main
      ref={containerRef}
      className="flex items-center justify-between text-[1rem]"
    >

      <img
        src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/man-working-with-computer-people-talking_bquaws'
        className='w-[400px] h-fit'
      />
      <section>
        <h2 className="text-3xl font-bold mb-4">
          {highlightText("🎓 What Will You Learn Here?", searchText)}
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {[
            "How each core module works",
            "Tips to onboard your team quickly",
            "How to automate daily tasks",
            "Best practices to increase productivity",
            "Industry use cases with real examples",
            "How to customize Won Hubs for your business",
          ].map((item, idx) => (
            <li key={idx}>{highlightText(item, searchText)}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
