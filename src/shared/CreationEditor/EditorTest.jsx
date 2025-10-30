import React, { useEffect, useRef, useState } from "react";
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaImage, FaSmile, FaFileWord, FaPalette, FaVideo, FaFilePdf, FaFileAlt, FaCode, FaMinus } from "react-icons/fa";
import mammoth from "mammoth";
import { HexColorPicker } from "react-colorful";
// import EmojiPicker from "emoji-picker-react";
import EditableFields from "./EditableFields";
import { useNavigate } from "react-router-dom";

const TestEditor = ({ data, path, onUpdate }) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [detailsObject, setDetailsObject] = useState(data);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();

  // -------- Toolbar Functions --------
  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const insertImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.execCommand("insertImage", false, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const insertVideo = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const videoHTML = `<video controls width="320"><source src="${e.target.result}" type="${file.type}"></video>`;
      document.execCommand("insertHTML", false, videoHTML);
    };
    reader.readAsDataURL(file);
  };

  const handleWordUpload = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.convertToHtml({ arrayBuffer });
    document.execCommand("insertHTML", false, value);
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;
    if (type === "image") insertImage(file);
    if (type === "video") insertVideo(file);
    if (type === "word") handleWordUpload(file);
    event.target.value = "";
  };

  const insertEmoji = (emoji) => {
    document.execCommand("insertText", false, emoji.emoji);
    editorRef.current.focus();
    // setShowEmojiPicker(false);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    document.execCommand("foreColor", false, color);
    editorRef.current.focus();
  };

  // -------- 🆕 Insert Page Break --------
  const insertPageBreak = () => {
    const pageBreakHTML = `
    <div class="page-break-container" contenteditable="false" style="position: relative; text-align: center; margin: 20px 0;">
      <div class="page-break" 
        style="border-top: 2px dashed #999; margin: 10px 0; color:#777; font-size:12px;">
        ——— Page Break ———
      </div>
      <button class="remove-page-break" 
        style="display: none; position: absolute; top: -10px; right: 10px; background: #f44336; color: white; border: none; border-radius: 4px; padding: 2px 6px; cursor: pointer; font-size: 10px;">
        ✖
      </button>
    </div>
    <p><br></p>
  `;
    document.execCommand("insertHTML", false, pageBreakHTML);
    editorRef.current.focus();
  };


  // -------- Save & Preview --------
  const handlePreview = () => {
    const content = editorRef.current.innerHTML;
    localStorage.setItem("editorContent", content);
    navigate("/preview");
  };

  // -------- Toolbar --------
  const ToolbarButton = ({ icon: Icon, onClick, title }) => (
    <button
      onClick={onClick}
      title={title}
      className="p-2 hover:bg-gray-100 rounded-md transition-all"
    >
      <Icon />
    </button>
  );
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // Show delete button when clicked
    const handleClick = (e) => {
      if (e.target.closest('.page-break-container')) {
        const container = e.target.closest('.page-break-container');
        const button = container.querySelector('.remove-page-break');
        button.style.display = 'inline';
      } else {
        // Hide all delete buttons when clicking elsewhere
        editor.querySelectorAll('.remove-page-break').forEach(btn => btn.style.display = 'none');
      }
    };

    // Handle delete click
    const handleDelete = (e) => {
      if (e.target.classList.contains('remove-page-break')) {
        const container = e.target.closest('.page-break-container');
        container.remove();
        e.stopPropagation();
      }
    };

    editor.addEventListener('click', handleClick);
    editor.addEventListener('click', handleDelete);

    return () => {
      editor.removeEventListener('click', handleClick);
      editor.removeEventListener('click', handleDelete);
    };
  }, []);


  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col">
      <div className="flex flex-wrap gap-2 bg-gray-50 border rounded-md p-2 shadow-sm">
        <ToolbarButton icon={FaBold} title="Bold" onClick={() => applyFormat("bold")} />
        <ToolbarButton icon={FaItalic} title="Italic" onClick={() => applyFormat("italic")} />
        <ToolbarButton icon={FaUnderline} title="Underline" onClick={() => applyFormat("underline")} />
        <ToolbarButton icon={FaListUl} title="Bullet List" onClick={() => applyFormat("insertUnorderedList")} />
        <ToolbarButton icon={FaListOl} title="Numbered List" onClick={() => applyFormat("insertOrderedList")} />
        <ToolbarButton icon={FaImage} title="Insert Image" onClick={() => fileInputRef.current.click()} />
        <ToolbarButton icon={FaVideo} title="Insert Video" onClick={() => videoInputRef.current.click()} />
        <ToolbarButton icon={FaFileWord} title="Insert Word Text" onClick={() => fileInputRef.current.click()} />
        {/* <ToolbarButton icon={FaSmile} title="Insert Emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)} /> */}
        <ToolbarButton icon={FaPalette} title="Text Color" onClick={() => setShowColorPicker(!showColorPicker)} />
        {/* 🆕 Page Break Button */}
        <ToolbarButton icon={FaMinus} title="Insert Page Break" onClick={insertPageBreak} />
        <ToolbarButton icon={FaFilePdf} title="Preview" onClick={handlePreview} />
      </div>

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,.doc,.docx"
        className="hidden"
        onChange={(e) => handleFileChange(e, "image")}
      />
      <input
        type="file"
        ref={videoInputRef}
        accept="video/*"
        className="hidden"
        onChange={(e) => handleFileChange(e, "video")}
      />

      {/* Color Picker */}
      {showColorPicker && (
        <div className="absolute mt-2 bg-white border rounded-md shadow-md p-2">
          <HexColorPicker color={selectedColor} onChange={handleColorChange} />
        </div>
      )}

      {/* Emoji Picker */}
      {/* {showEmojiPicker && (
        <div className="absolute mt-2 bg-white border rounded-md shadow-md p-2">
          <EmojiPicker onEmojiClick={insertEmoji} />
        </div>
      )} */}

      {/* Editor Box */}
      <div
        ref={editorRef}
        contentEditable
        className="border rounded-md p-4 min-h-[400px] mt-3 focus:outline-none"
        style={{ fontFamily: "sans-serif", lineHeight: "1.5" }}
        dangerouslySetInnerHTML={{ __html: localStorage.getItem("editorContent") || "" }}
      />
    </div>
  );
};

export default TestEditor;
