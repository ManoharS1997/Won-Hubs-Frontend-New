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

export default function CoreConcepts({ searchText, onMatch }) {
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
    <div className="flex items-center justify-between">
      <section
        ref={containerRef}
        id="core-concepts"
        className=""
      >
        <h2 className="!text-3xl font-bold !mb-4 text-[#14213d]">
          {highlightText("🧱 Core Concepts to Understand", searchText)}
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "1. CRM (Customer Relationship Management)",
              desc: "Used to capture leads, assign them to team members, track conversations, and monitor follow-ups — all in one timeline."
            },
            {
              title: "2. Ticketing System",
              desc: "A simple way to handle customer complaints, internal issues, or requests — track progress from open to resolved."
            },
            {
              title: "3. Communication Center",
              desc: "Send and receive messages from WhatsApp, Email, SMS, and Calls in a unified inbox."
            },
            {
              title: "4. Tasks & Projects",
              desc: "Break work into tasks, assign owners, and set deadlines. Keep teams aligned with clear to-dos."
            },
            {
              title: "5. Reports & Analytics",
              desc: "Visual dashboards show how your sales, support, and team performance are tracking — helping you make better decisions."
            }
          ].map((item, idx) => (
            <div key={idx} className="!text-[1rem] ">
              <h3 className="!text-xl font-semibold ">{highlightText(item.title, searchText)}</h3>
              <p>{highlightText(item.desc, searchText)}</p>
            </div>
          ))}
        </div>
      </section>
      <img
        src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/Untitled_design_1_rqjn2r'
        className='w-[400px] h-fit'
      />
    </div>
  );
}
