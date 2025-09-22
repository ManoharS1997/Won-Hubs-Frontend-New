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

export default function LearningUseCases({ searchText, onMatch }) {
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

  const rows = [
    {
      role: "Salesperson",
      learn: "How to track and convert leads faster",
    },
    {
      role: "Support Agent",
      learn: "How to resolve tickets and use canned replies",
    },
    {
      role: "Team Manager",
      learn: "How to assign, track, and approve tasks",
    },
    {
      role: "Admin / Owner",
      learn: "How to set up automations and monitor KPIs",
    },
    {
      role: "Marketing/Communication",
      learn: "How to send messages via WhatsApp, Email, or SMS",
    },
  ];

  return (
    <section
      ref={containerRef}
      className=""
    >
      <h2 className="!text-3xl font-bold !mb-4">
        {highlightText("📚 Learning Use Cases", searchText)}
      </h2>
      <div className="overflow-x-auto text-[1rem]">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Role</th>
              <th className="border px-4 py-2 text-left">What You'll Learn</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 1 ? "bg-gray-50" : ""}>
                <td className="border px-4 py-2">
                  {highlightText(row.role, searchText)}
                </td>
                <td className="border px-4 py-2">
                  {highlightText(row.learn, searchText)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
