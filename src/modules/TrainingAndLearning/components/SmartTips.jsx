import { useEffect, useRef } from "react";

// Highlighting helper
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

export default function SmartTips({ searchText, onMatch }) {
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

  const tips = [
    "“Use automation to send a welcome message when a lead is added.”",
    "“Create escalation rules for tickets to avoid delays.”",
    "“Use filters to export custom reports for reviews or investor meetings.”",
    "“Organize tasks into departments for better tracking.”",
  ];

  return (
    <div className="flex items-center justify-between">
      <img
        src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/Untitled_design_4_ta4ifa'
        className='w-[300px] h-fit'
      />
      <section
        ref={containerRef}
        className=""
      >
        <h2 className="text-3xl font-bold mb-4">
          {highlightText("🧠 Smart Tips from Power Users", searchText)}
        </h2>
        <div className="space-y-3 text-[1rem] ">
          {tips.map((tip, idx) => (
            <blockquote
              key={idx}
              className="border-l-4 border-[#fca311] pl-4 italic text-gray-700"
            >
              {highlightText(tip, searchText)}
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
