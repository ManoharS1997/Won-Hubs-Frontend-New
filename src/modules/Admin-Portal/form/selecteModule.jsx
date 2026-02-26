import { useState } from "react";

const DUMMY_MODULES = [
  { name: "Channels", subModules: ["Public", "Private"] },
  { name: "Roles", subModules: ["Admin", "Editor"] },
  { name: "Tickets", subModules: [] },
];

const ModuleSelect = ({
  modules,
  value,
  onChange,
  placeholder = "Select Module",
}) => {
  const data = modules?.length ? modules : DUMMY_MODULES;

  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [localModules, setLocalModules] = useState(data);
  const [addingModule, setAddingModule] = useState(false);
  const [newModule, setNewModule] = useState("");
  const [addingSubFor, setAddingSubFor] = useState(null);
  const [newSub, setNewSub] = useState("");
  const [module, setModule] = useState("");


  return (
    // <div className=" h-full w-full border-2 flex justify-center ">
    <div className="relative w-48">
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full h-10 border rounded px-3 bg-white flex justify-between items-center"
      >
        {value || placeholder}
        <span className="text-gray-500">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 mt-1 w-full bg-white border rounded shadow-md z-20">
          {localModules.map((mod) => (
            <div
              key={mod.name}
              className="relative px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseEnter={() => setHovered(mod.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="flex justify-between items-center"
                onClick={() => {
                  if (!mod.subModules.length) {
                    onChange?.(mod.name);
                    setOpen(false);
                  }
                }}
              >
                <span>{mod.name}</span>
                {mod.subModules.length > 0 && (
                  <span className="text-gray-400">‹</span>
                )}
              </div>

              {/* Submenu */}
              {hovered === mod.name && mod.subModules.length > 0 && (
                <div
                  className="absolute right-full top-0 mr-1 w-44 bg-white border rounded shadow-md z-30"
                  onMouseEnter={() => setHovered(mod.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {mod.subModules.map((sub) => (
                    <div
                      key={sub}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        onChange?.(sub);
                        setOpen(false);
                      }}
                    >
                      {sub}
                    </div>
                  ))}

                  {/* Add Submodule */}
                  <div className=" px-2 py-2">
                    {addingSubFor === mod.name ? (
                      <input
                        autoFocus
                        value={newSub}
                        onChange={(e) => setNewSub(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newSub.trim()) {
                            setLocalModules((prev) =>
                              prev.map((m) =>
                                m.name === mod.name
                                  ? {
                                    ...m,
                                    subModules: [...m.subModules, newSub],
                                  }
                                  : m
                              )
                            );
                            setNewSub("");
                            setAddingSubFor(null);
                          }
                          if (e.key === "Escape") {
                            setAddingSubFor(null);
                            setNewSub("");
                          }
                        }}
                        className="w-full border rounded px-2 py-1 text-sm"
                        placeholder="New submodule"
                      />
                    ) : (
                      <button
                        onClick={() => setAddingSubFor(mod.name)}
                        className="text-indigo-600 text-sm"
                      >
                        + Add Submodule
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Module */}
          <div className=" px-3 py-2">
            {addingModule ? (
              <input
                autoFocus
                value={newModule}
                onChange={(e) => setNewModule(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newModule.trim()) {
                    setLocalModules((prev) => [
                      ...prev,
                      { name: newModule, subModules: [] },
                    ]);
                    setNewModule("");
                    setAddingModule(false);
                  }
                  if (e.key === "Escape") {
                    setAddingModule(false);
                    setNewModule("");
                  }
                }}
                placeholder="New module"
                className="w-full border rounded px-2 py-1 text-sm"
              />
            ) : (
              <button
                onClick={() => setAddingModule(true)}
                className="text-indigo-600 text-sm"
              >
                + Add Module
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleSelect;
