import { useSelected, useFocused } from "slate-react";
import "./Image.css";

const Image = ({ attributes, element, children }) => {
  const { file, width, height } = element;
  const selected = useSelected();
  const focused = useFocused();

  // ✅ Safely handle file or URL
  let imageUrl = "";

  if (file instanceof File || file instanceof Blob) {
    imageUrl = URL.createObjectURL(file);
  } else if (typeof file === "string") {
    imageUrl = file; // already a URL string (from DB or uploaded)
  } else {
    console.warn("Invalid image file type:", file);
  }

  return (
    <div
      {...attributes}
      className="element-image"
      style={{
        display: "flex",
        justifyContent: "center",
        boxShadow: selected && focused ? "0 0 3px 3px lightgray" : "none",
      }}
    >
      <div contentEditable={false} style={{ width, height }}>
        {imageUrl ? (
          <img alt="img1" src={imageUrl} style={{ maxWidth: "100%", maxHeight: "100%" }} />
        ) : (
          <div style={{ color: "gray" }}>No Image</div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Image;
