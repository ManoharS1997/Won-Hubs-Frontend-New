import React, { useMemo, useState, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const SlateEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={value} onChange={onChange} >
      <Editable
        placeholder={placeholder}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "150px",
          borderRadius: "5px",

        }}
      />
    </Slate>
  );
};

export default SlateEditor;
