import * as Lucide from "react-icons/lu";
import { useState } from "react";
import { ICON_DOMAIN_MAP } from "./iconDomainMap";

const DOMAIN_KEYWORDS = {
  roles: ["role", "roles", "permission", "access", "auth", "security"],
  channels: ["channel", "channels", "chat", "message", "stream"],
  groups: ["group", "groups", "team", "users"],
  tickets: ["ticket", "issue", "bug", "task"],
  notifications: ["notification", "alert", "bell"],
  templates: ["template", "layout", "form"],
};
const ALL_ICONS = Object.values(ICON_DOMAIN_MAP).flat();
// console.log(ALL_ICONS, "All HEre")

const getMatchedDomains = (search) => {
  const term = search.toLowerCase();

  return Object.entries(DOMAIN_KEYWORDS)
    .filter(([_, keywords]) =>
      keywords.some((k) => term.startsWith(k) || k.startsWith(term))
    )
    .map(([domain]) => domain);
};
const getIconsToRender = (search) => {
  // 1️⃣ No search → show all icons
  // console.log(search, "search Here")
  if (!search.trim()) {
    return ALL_ICONS;
  }
  // 2️⃣ Try semantic domain match
  const matchedDomains = getMatchedDomains(search);
  // console.log(matchedDomains, "matched Hereeee")
  if (matchedDomains.length > 0) {
    // console.log(matchedDomains.flatMap(
    return matchedDomains.flatMap(
      (domain) => ICON_DOMAIN_MAP[domain] || []
    );
  }
  // 3️⃣ Fallback → show all icons (NEVER EMPTY)
  return ALL_ICONS;
};

const IconPicker = ({ onSelect }) => {
  const [search, setSearch] = useState("");

  const iconsToRender = getIconsToRender(search);
  console.log(iconsToRender, "HEreeee Check")

  return (
    <div className="absolute z-50 bg-white border rounded-xl shadow-lg w-80 p-3">
      <input
        type="text"
        placeholder="Search icons (roles, channels, tickets...)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-2 border rounded px-2 py-1"
      />

      <div className="grid grid-cols-6 gap-2 max-h-56 overflow-auto">
        {iconsToRender.map((iconName) => {
          const IconComp = Lucide[iconName];
          console.log(IconComp, "Icon Map Here");// here we are getting undefined so that we doesnt seeing any icons here 
          if (!IconComp) return null;

          return (
            <button
              key={iconName}
              className="p-2 rounded hover:bg-gray-100"
              onClick={() =>
                onSelect({
                  type: "library",
                  library: "lucide",
                  name: iconName,
                })
              }
              title={iconName}
            >
              <IconComp size={18} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const IconRenderer = ({ icon }) => {
  if (!icon) return null;

  if (icon.type === "library") {
    const IconComp = Lucide[icon.name];
    return IconComp ? <IconComp size={16} /> : null;
  }

  return null;
};

const AddIconComponent = ({ domain = "roles", onSaveIcon }) => {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [icon, setIcon] = useState(null);
  // console.log(icon, "icon here ")
  return (
    <div className="relative">
      <label className="text-sm font-medium text-gray-700">Icon</label>

      <button
        type="button"
        onClick={() => setShowIconPicker((p) => !p)}
        className="
    w-full mt-1
    flex items-center justify-between
    border border-gray-300
    !rounded-lg px-3 py-2
    bg-white
    transition-all
   
    hover:shadow-sm
    
  "
      >
        <span className="flex items-center gap-2">
          {icon && <IconRenderer icon={icon} />}
          <span className="text-gray-500">
            {icon ? "Change icon" : "Select icon"}
          </span>
        </span>
        <span className="text-gray-400">⌄</span>
      </button>

      {showIconPicker && (
        <IconPicker
          domain={domain}
          onSelect={(val) => {
            setIcon(val);
            onSaveIcon(val)
            setShowIconPicker(false);
          }}
        />
      )}
    </div>
  );
};

export default AddIconComponent;
