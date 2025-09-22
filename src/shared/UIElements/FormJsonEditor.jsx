import Editor from "@monaco-editor/react";
import renderIcons from "../functions/renderIcons";

export default function FormJsonEditor({
    label,
    isMandatory,
    name,
    value,
    onChangeHandler,
    customstyles
}) {
    const handleEditorChange = (newValue) => {
        try {
            const parsed = JSON.parse(newValue);
            // console.log("Editor value changed", newValue);
            onChangeHandler(parsed);
        } catch (e) {
            // Optional: show validation error or ignore until valid JSON
        }
    };

    return (
        <div className="w-full h-fit flex items-start gap-4" style={customstyles}>
            <label
                htmlFor={name}
                className="w-[30%] text-right !flex justify-end gap-2 pt-2"
            >
                {isMandatory && renderIcons("FaStarOfLife", 10, "#ff0000")}
                {label || "JSON Editor"}
            </label>
            <div className="w-[70%] p-2 border rounded-md shadow-inner bg-white">
                <Editor
                    height="200px"
                    defaultLanguage="json"
                    value={JSON.stringify(value || {}, null, 2)}
                    onChange={handleEditorChange}
                    theme="vs-light"
                    options={{
                        minimap: { enabled: false },
                        lineNumbers: () => "", // ✅ this removes line numbers
                        glyphMargin: false,
                        folding: false,
                        lineDecorationsWidth: 0,
                        lineNumbersMinChars: 0,
                        suggestOnTriggerCharacters: false, // ⛔ disable auto-suggestions
                        quickSuggestions: false,
                        scrollbar: {
                            vertical: "auto",
                            horizontal: "auto"
                        }
                    }}
                />
            </div>
        </div>
    );
}
