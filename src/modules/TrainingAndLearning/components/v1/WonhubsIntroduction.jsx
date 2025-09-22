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

export default function WonhubsIntroduction({ searchText, onMatch }) {
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
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between px-4 py-6 max-w-6xl mx-auto">
      <section ref={containerRef} className="max-w-3xl space-y-4 text-[1rem]">
        <h1 className="!text-3xl font-bold mb-2">
          {highlightText("📖 Introduction to Won Hubs", searchText)}
        </h1>

        <p>
          {highlightText("Welcome to Won Hubs – Your Hub for Learning, Collaboration, and Growth.", searchText)}
        </p>

        <p>
          {highlightText("Won Hubs is our comprehensive learning and enablement platform designed to help your entire team—from new hires to advanced users—understand, adopt, and master the Won platform. Whether you’re a sales rep, support agent, admin, or manager, Won Hubs provides the structured, role-based learning you need to get up to speed quickly and work more effectively.", searchText)}
        </p>

        <h2 className="!text-2xl font-semibold !mt-4">
          {highlightText("💡 Why Won Hubs?", searchText)}
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>{highlightText("Structured Learning Paths tailored to different roles.", searchText)}</li>
          <li>{highlightText("Step-by-Step Guides that make even complex features easy to understand.", searchText)}</li>
          <li>{highlightText("Quick Wins to help you see immediate value.", searchText)}</li>
          <li>{highlightText("Best Practices from industry experts.", searchText)}</li>
          <li>{highlightText("Exercises and Examples to apply what you learn.", searchText)}</li>
        </ul>

        <h2 className="!text-2xl font-semibold !mt-4">
          {highlightText("🚀 What Can You Do with Won Hubs?", searchText)}
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>{highlightText("Explore Core Modules.", searchText)}</li>
          <li>{highlightText("Role-Based Training.", searchText)}</li>
          <li>{highlightText("Customize Your Experience.", searchText)}</li>
          <li>{highlightText("Practice with Real-World Scenarios.", searchText)}</li>
          <li>{highlightText("Stay Up to Date with version-specific guides.", searchText)}</li>
        </ul>

        <h2 className="!text-2xl font-semibold !mt-4">
          {highlightText("🧭 How is This Site Organized?", searchText)}
        </h2>
        <p>
          {highlightText("Won Hubs is structured into clear sections to help you navigate easily:", searchText)}
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>{highlightText("Introduction", searchText)}</li>
          <li>{highlightText("Core Concepts", searchText)}</li>
          <li>{highlightText("User Roles", searchText)}</li>
          <li>{highlightText("Quick Wins", searchText)}</li>
          <li>{highlightText("Customization", searchText)}</li>
          <li>{highlightText("Exercises", searchText)}</li>
          <li>{highlightText("Privacy & Support", searchText)}</li>
          <li>{highlightText("Version-Based Guides", searchText)}</li>
        </ul>

        <h2 className="!text-2xl font-semibold !mt-4">
          {highlightText("✨ Who Should Use Won Hubs?", searchText)}
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>{highlightText("New Hires", searchText)}</li>
          <li>{highlightText("Sales Teams", searchText)}</li>
          <li>{highlightText("Support Teams", searchText)}</li>
          <li>{highlightText("Administrators", searchText)}</li>
          <li>{highlightText("Managers", searchText)}</li>
          <li>{highlightText("IT & Developers", searchText)}</li>
        </ul>

        <h2 className="!text-2xl font-semibold mt-4">
          {highlightText("✅ What’s Next?", searchText)}
        </h2>
        <p>
          {highlightText("Ready to dive in? Choose a topic from the menu and start your learning journey. If you’re new, we recommend beginning with Core Concepts to understand how Won works. If you’re here to explore new features, check out the version-specific sections for the latest updates.", searchText)}
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <p>
            {highlightText("💡 Tip: Take it one section at a time, share with your team, and bookmark your progress!", searchText)}
          </p>
        </div>
      </section>
    </div>
  );
}
