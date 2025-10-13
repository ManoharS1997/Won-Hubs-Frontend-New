// import React, { useState, useEffect } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import {
//   EditorState,
//   convertToRaw,
//   ContentState,
// } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// const uploadImageCallBack = (file) => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", "https://api.imgur.com/3/image");
//     xhr.setRequestHeader("Authorization", "Client-ID 1b9e7a1b5b1c9ab");
//     const data = new FormData();
//     data.append("image", file);
//     xhr.send(data);
//     xhr.addEventListener("load", () => {
//       const response = JSON.parse(xhr.responseText);
//       resolve({ data: { link: response.data.link } });
//     });
//     xhr.addEventListener("error", () => {
//       const error = JSON.parse(xhr.responseText);
//       reject(error);
//     });
//   });
// };

// const FullFeaturedEditor = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [htmlOutput, setHtmlOutput] = useState("");

//   const onEditorStateChange = (state) => {
//     setEditorState(state);
//     const html = draftToHtml(convertToRaw(state.getCurrentContent()));
//     setHtmlOutput(html);
//   };

//   useEffect(() => {
//     const html = "<p><b>Welcome!</b> Full toolbar now works 🎉</p>";
//     const blocks = htmlToDraft(html);
//     if (blocks) {
//       const contentState = ContentState.createFromBlockArray(blocks.contentBlocks);
//       setEditorState(EditorState.createWithContent(contentState));
//     }
//   }, []);

//   return (
//     <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
//       <h2 style={{ textAlign: "center" }}>📝 Fully Working WYSIWYG Editor</h2>

//       {/* ✅ Universal Fix Styles */}
//       <style>{`
//         .rdw-editor-toolbar {
//           border: 1px solid #ddd !important;
//           background: #fafafa !important;
//           border-radius: 6px !important;
//           padding: 6px !important;
//           flex-wrap: wrap !important;
//           z-index: 1000 !important;
//         }

//         .rdw-dropdown-wrapper,
//         .rdw-option-wrapper {
//           position: relative !important;
//           z-index: 9999 !important;
//         }

//         /* Dropdown option lists */
//         .rdw-dropdown-optionwrapper {
//           position: fixed !important;
//           top: auto !important;
//           left: auto !important;
//           background: white !important;
//           border: 1px solid #ccc !important;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
//           z-index: 99999 !important;
//         }

//         /* Popups (emoji, color, image, link, embed) */
//         .rdw-colorpicker-modal,
//         .rdw-emoji-modal,
//         .rdw-link-modal,
//         .rdw-image-modal,
//         .rdw-embedded-modal {
//           position: fixed !important;
//           background: white !important;
//           border: 1px solid #ccc !important;
//           padding: 10px !important;
//           border-radius: 6px !important;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
//           z-index: 99999 !important;
//         }

//         .demo-editor {
//           min-height: 200px;
//           border: 1px solid #ccc !important;
//           border-radius: 6px;
//           padding: 10px;
//           background: #fff;
//         }

//         textarea {
//           width: 100%;
//           height: 200px;
//           margin-top: 20px;
//           font-family: monospace;
//           background: #f9f9f9;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           padding: 10px;
//         }

//         /* Make sure parent containers don't clip the dropdowns */
//         body, html, #root, .App {
//           overflow: visible !important;
//         }
//       `}</style>

//       <Editor
//         editorState={editorState}
//         onEditorStateChange={onEditorStateChange}
//         toolbarClassName="demo-toolbar"
//         wrapperClassName="demo-wrapper"
//         editorClassName="demo-editor"
//         placeholder="Start typing here..."
//         toolbar={{
//           options: [
//             "inline",
//             "blockType",
//             "fontSize",
//             "fontFamily",
//             "list",
//             "textAlign",
//             "colorPicker",
//             "link",
//             "embedded",
//             "emoji",
//             "image",
//             "remove",
//             "history",
//           ],
//           inline: {
//             inDropdown: false,
//             options: [
//               "bold",
//               "italic",
//               "underline",
//               "strikethrough",
//               "monospace",
//               "superscript",
//               "subscript",
//             ],
//           },
//           blockType: { inDropdown: true },
//           fontSize: { inDropdown: true },
//           fontFamily: { inDropdown: true },
//           list: { inDropdown: true },
//           textAlign: { inDropdown: true },
//           colorPicker: { popupClassName: "rdw-colorpicker-modal" },
//           link: { inDropdown: true },
//           embedded: { popupClassName: "rdw-embedded-modal" },
//           emoji: { popupClassName: "rdw-emoji-modal" },
//           image: {
//             uploadCallback: uploadImageCallBack,
//             previewImage: true,
//             alt: { present: true, mandatory: true },
//             inputAccept: "image/*",
//           },
//           remove: { className: "toolbar-remove" },
//           history: { inDropdown: true },
//         }}
//       />

//       <h3 style={{ marginTop: "30px" }}>🔍 HTML Output</h3>
//       <textarea value={htmlOutput} readOnly />
//     </div>
//   );
// };

// export default FullFeaturedEditor;
// {working of half of the work}
// import React, { useState } from 'react';
// import {
//   FaBold,
//   FaItalic,
//   FaUnderline,
//   FaStrikethrough,
//   FaStar,
//   FaListUl,
//   FaListOl,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
//   FaAlignJustify,
//   FaFont,
//   FaImage,
//   FaSmile,
// } from 'react-icons/fa';

// const toolbarConfig = [
//   { type: 'button', icon: FaBold, title: 'Bold' },
//   { type: 'button', icon: FaItalic, title: 'Italic' },
//   { type: 'button', icon: FaUnderline, title: 'Underline' },
//   { type: 'button', icon: FaStrikethrough, title: 'Strikethrough' },
//   { type: 'button', icon: FaStar, title: 'Star' },
//   { type: 'button', icon: FaListUl, title: 'Unordered List' },
//   { type: 'button', icon: FaListOl, title: 'Ordered List' },
//   { type: 'button', icon: FaAlignLeft, title: 'Align Left' },
//   { type: 'button', icon: FaAlignCenter, title: 'Align Center' },
//   { type: 'button', icon: FaAlignRight, title: 'Align Right' },
//   { type: 'button', icon: FaAlignJustify, title: 'Justify' },
//   {
//     type: 'dropdown',
//     icon: FaFont,
//     title: 'Font Family',
//     options: ['Arial', 'Times New Roman', 'Courier New', 'Georgia'],
//     stateKey: 'fontFamily',
//   },
//   {
//     type: 'dropdown',
//     icon: null,
//     title: 'Font Size',
//     options: ['12px', '14px', '16px', '18px', '20px'],
//     stateKey: 'fontSize',
//   },
//   {
//     type: 'dropdown',
//     icon: null,
//     title: 'Color',
//     options: ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ff00ff'],
//     stateKey: 'color',
//   },
//   { type: 'button', icon: FaImage, title: 'Insert Image' },
//   {
//     type: 'dropdown',
//     icon: FaSmile,
//     title: 'Emoji',
//     options: ['😀', '😂', '😍', '😎', '🤩', '😢'],
//     stateKey: 'emoji',
//   },
// ];

// const EditorLayout = () => {
//   const [state, setState] = useState({
//     fontFamily: 'Arial',
//     fontSize: '14px',
//     color: '#000000',
//     emoji: null,
//     openDropdown: null,
//   });

//   const toggleDropdown = (key) => {
//     setState((prev) => ({
//       ...prev,
//       openDropdown: prev.openDropdown === key ? null : key,
//     }));
//   };

//   const selectOption = (key, value) => {
//     setState((prev) => ({
//       ...prev,
//       [key]: value,
//       openDropdown: null,
//     }));
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: '20px auto', border: '1px solid #ccc', borderRadius: 5 }}>
//       {/* Toolbar */}
//       <div
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           padding: 10,
//           borderBottom: '1px solid #ccc',
//           background: '#f9f9f9',
//           gap: 8,
//         }}
//       >
//         {toolbarConfig.map((item, index) => {
//           if (item.type === 'button') {
//             const Icon = item.icon;
//             return (
//               <div key={index}>
//                 <button title={item.title} style={{ cursor: 'pointer', padding: 6 }}>
//                   {Icon && <Icon />}
//                   {state[item.stateKey] && <span>{state[item.stateKey]}</span>}
//                 </button>
//               </div>
//             );
//           }

//           if (item.type === 'dropdown') {
//             const Icon = item.icon;
//             return (
//               <div key={index} style={{ position: 'relative' }}>
//                 <button
//                   onClick={() => toggleDropdown(item.stateKey)}
//                   style={{ display: 'flex', alignItems: 'center', padding: 6, cursor: 'pointer' }}
//                   title={item.title}
//                 >
//                   {Icon && <Icon />}
//                   <span style={{ marginLeft: Icon ? 4 : 0 }}>
//                     {state[item.stateKey] || item.title}
//                   </span>
//                 </button>
//                 {state.openDropdown === item.stateKey && (
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: 35,
//                       left: 0,
//                       border: '1px solid #ccc',
//                       background: '#fff',
//                       zIndex: 10,
//                       minWidth: 100,
//                     }}
//                   >
//                     {item.options.map((opt) => (
//                       <div
//                         key={opt}
//                         style={{ padding: 5, cursor: 'pointer' }}
//                         onClick={() => selectOption(item.stateKey, opt)}
//                       >
//                         {opt}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           }

//           return null;
//         })}
//       </div>

//       {/* Editor Area */}
//       <div
//         contentEditable
//         style={{
//           minHeight: 250,
//           padding: 10,
//           outline: 'none',
//           fontFamily: state.fontFamily,
//           fontSize: state.fontSize,
//           color: state.color,
//         }}
//       >
//         Start typing your content here...
//         {state.emoji && <span>{state.emoji}</span>}
//       </div>
//     </div>
//   );
// };

// export default EditorLayout;


// EditorRichUI.jsx
// EditorFull.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaFont,
  FaImage, FaSmile, FaCode, FaUndo, FaRedo, FaLink, FaIndent, FaOutdent, FaEraser, FaSave,
} from 'react-icons/fa';

/**
 * Fully functional contentEditable editor UI (no external rich-text libraries).
 * - Uses document.execCommand for formatting (widely supported, although deprecated).
 * - Saves HTML content to backend via fetch POST.
 *
 * NOTE: Change SAVE_ENDPOINT to your actual API route that persists HTML into SQL.
 */
const SAVE_ENDPOINT = '/api/documents'; // << change this to your backend endpoint

const FONT_SIZE_MAP = { '12px': 2, '14px': 3, '16px': 4, '18px': 5, '20px': 6, '24px': 7 };

const EditorFull = () => {
  const editorRef = useRef(null);
  const fileRef = useRef(null);

  // UI state
  const [openDropdown, setOpenDropdown] = useState(null);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('14px');
  const [textColor, setTextColor] = useState('#111111');
  const [highlightColor, setHighlightColor] = useState('#ffffff');
  const [active, setActive] = useState({});
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Options for dropdowns
  const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Poppins', 'Roboto'];
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px'];

  const colorPalette = [
    '#000000','#2C3E50','#34495E','#7F8C8D','#BDC3C7','#FFFFFF',
    '#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3',
    '#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39',
    '#FFEB3B','#FFC107','#FF9800','#FF5722','#795548','#607D8B',
    '#C2185B','#F06292','#BA68C8','#9575CD','#7986CB','#64B5F6',
    '#4DD0E1','#4DB6AC','#AED581','#DCE775','#FFD54F','#FFB74D',
    '#FF8A65','#A1887F','#90A4AE'
  ];

  const stickers = [
    '🔥','✨','🎯','✅','💡','📌','🚀','📎','🔒','🔔',
    '🛠️','🎉','❤️','👍','👎','⭐','🏷️','🧾','📁','🧩'
  ];

  const emojis = ['😀','😂','😍','😎','🤩','😢','😭','😡','🤔','🙄','😇','🤗','😋','🥳','🤠'];

  // Keep toolbar active state in sync with selection
  useEffect(() => {
    const updateActive = () => {
      try {
        setActive({
          bold: document.queryCommandState('bold'),
          italic: document.queryCommandState('italic'),
          underline: document.queryCommandState('underline'),
          strike: document.queryCommandState('strikeThrough'),
          ul: document.queryCommandState('insertUnorderedList'),
          ol: document.queryCommandState('insertOrderedList'),
          left: document.queryCommandState('justifyLeft'),
          center: document.queryCommandState('justifyCenter'),
          right: document.queryCommandState('justifyRight'),
          justify: document.queryCommandState('justifyFull'),
        });
      } catch (e) {
        // ignore
      }
    };
    document.addEventListener('selectionchange', updateActive);
    updateActive();
    return () => document.removeEventListener('selectionchange', updateActive);
  }, []);

  // helper: focus editor and restore selection (we rely on not losing selection because toolbar mouseDown prevents default)
  const focusEditor = () => editorRef.current?.focus();

  // execute commands
  const exec = (cmd, val = null) => {
    focusEditor();
    try {
      document.execCommand(cmd, false, val);
    } catch (e) {
      console.warn('execCommand failed:', cmd, e);
    }
    // trigger selection update
    document.dispatchEvent(new Event('selectionchange'));
  };

  // ---- toolbar button handlers ----
  const handleTool = (id) => {
    switch (id) {
      case 'bold': exec('bold'); break;
      case 'italic': exec('italic'); break;
      case 'underline': exec('underline'); break;
      case 'strike': exec('strikeThrough'); break;
      case 'ul': exec('insertUnorderedList'); break;
      case 'ol': exec('insertOrderedList'); break;
      case 'align-left': exec('justifyLeft'); break;
      case 'align-center': exec('justifyCenter'); break;
      case 'align-right': exec('justifyRight'); break;
      case 'align-justify': exec('justifyFull'); break;
      case 'indent': exec('indent'); break;
      case 'outdent': exec('outdent'); break;
      case 'undo': exec('undo'); break;
      case 'redo': exec('redo'); break;
      case 'remove': exec('removeFormat'); break;
      case 'code': insertCodeBlock(); break;
      case 'insert-link': showInsertLinkPrompt(); break;
      case 'insert-image': showImageChoice(); break;
      default: break;
    }
  };

  // insert code block wrapper
  const insertCodeBlock = () => {
    const sel = window.getSelection()?.toString();
    const safe = (sel || '// code here').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    exec('insertHTML', `<pre style="background:#f5f5f5;padding:8px;border-radius:4px;"><code>${safe}</code></pre>`);
  };

  // Insert link via prompt (we create anchor with target=_blank)
  const showInsertLinkPrompt = () => {
    // ask for link text and href
    const href = window.prompt('Enter URL (https://...)', 'https://');
    if (!href) return;
    const text = window.getSelection()?.toString() || href;
    // insert anchor HTML with target
    exec('insertHTML', `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`);
  };

  // Image insert flow
  const showImageChoice = () => {
    const choice = window.prompt('Insert image from "link" or "file"? (type link or file)', 'link');
    if (!choice) return;
    if (choice.toLowerCase() === 'file') {
      fileRef.current?.click();
    } else {
      const url = window.prompt('Enter image URL:');
      if (url) insertImage(url);
    }
  };

  const insertImage = (src) => {
    // Insert responsive image with preview style
    exec('insertHTML', `<img src="${src}" alt="" style="max-width: 100%; max-height: 360px; border-radius:6px; display:block; margin:8px 0;"/>`);
  };

  // handle file input for image
  const onFileImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => insertImage(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = ''; // reset so same file can be reselected later
  };

  // Insert emoji or sticker
  const insertEmoji = (ch) => exec('insertText', ch);

  // apply font family / size / colors
  const applyFontFamily = (f) => { setFontFamily(f); exec('fontName', f); setOpenDropdown(null); };
  const applyFontSize = (s) => { setFontSize(s); exec('fontSize', FONT_SIZE_MAP[s] || 3); setOpenDropdown(null); };
  const applyTextColor = (c) => { setTextColor(c); exec('foreColor', c); setOpenDropdown(null); };
  const applyHighlight = (c) => { setHighlightColor(c); exec('hiliteColor', c); setOpenDropdown(null); };

  // Save content to backend (HTML)
  // Sends: { title, html, createdAt } as JSON. Adjust to your backend schema.
  const saveDocument = async () => {
    const html = editorRef.current?.innerHTML || '';
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Please enter a title before saving.' });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const payload = { title: title.trim(), html, createdAt: new Date().toISOString() };
      const res = await fetch(SAVE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      setMessage({ type: 'success', text: 'Document saved.' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Save failed — check console / backend.' });
    } finally {
      setSaving(false);
    }
  };

  // Utility to insert a template into the editor (for autoCopies / templates)
  // Example usage for templates: insertTemplate(templateHtml)
  const insertTemplate = (templateHtml) => {
    // Inserts HTML at caret
    exec('insertHTML', templateHtml);
  };

  // Render helpers
  const ToolButton = ({ id, Icon, title, activeState }) => (
    <div style={{ margin: 4 }}>
      <button
        onMouseDown={(e) => e.preventDefault()} // prevent losing selection
        onClick={() => handleTool(id)}
        title={title}
        style={{
          cursor: 'pointer',
          padding: 8,
          minWidth: 36,
          minHeight: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
          border: activeState ? '1px solid #2b7cff' : '1px solid transparent',
          background: activeState ? '#e8f0ff' : 'transparent',
        }}
      >
        <Icon />
      </button>
    </div>
  );

  const Dropdown = ({ keyName, Icon, title, options, renderSquare, onSelectLabel }) => (
    <div style={{ position: 'relative', margin: 4 }}>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpenDropdown((p) => (p === keyName ? null : keyName))}
        title={title}
        style={{
          cursor: 'pointer',
          padding: '6px 10px',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid transparent',
        }}
      >
        {Icon && <Icon />}
        <span style={{ fontSize: 14 }}>{onSelectLabel ? onSelectLabel() : title}</span>
      </button>

      {openDropdown === keyName && (
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 0,
            border: '1px solid #ddd',
            background: '#fff',
            zIndex: 140,
            boxShadow: '0 10px 30px rgba(0,0,0,.12)',
            borderRadius: 8,
            padding: 10,
            width: keyName === 'color' || keyName === 'stickers' ? 340 : 'auto',
            maxHeight: 320,
            overflowY: 'auto',
            display: keyName === 'color' ? 'grid' : 'grid',
            gridTemplateColumns: keyName === 'color' ? 'repeat(16, 20px)' : keyName === 'stickers' ? 'repeat(8, 1fr)' : 'auto',
            gap: 8,
          }}
        >
          {/* top triangle pointer */}
          <div style={{
            position: 'absolute',
            top: -8,
            left: 20,
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '8px solid #fff',
            filter: 'drop-shadow(0 -1px 1px rgba(0,0,0,0.08))'
          }} />

          {options.map((opt) => (
            <div
              key={opt}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (renderSquare) renderSquare(opt);
                else if (onSelectLabel) onSelectLabel(opt);
                setOpenDropdown(null);
              }}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: keyName === 'stickers' ? 6 : 0,
                fontSize: keyName === 'stickers' ? 20 : 12,
                width: keyName === 'color' ? 20 : 'auto',
                height: keyName === 'color' ? 20 : 'auto',
                background: keyName === 'color' ? opt : 'transparent',
                borderRadius: keyName === 'color' ? 4 : 6,
                border: keyName === 'color' && opt === '#FFFFFF' ? '1px solid #ddd' : 'none',
              }}
            >
              {keyName === 'color' ? null : opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: 1040, margin: '20px auto', border: '1px solid #ddd', borderRadius: 10 }}>
      {/* Header: title + save */}
      <div style={{ display: 'flex', gap: 8, padding: 10, borderBottom: '1px solid #eee', alignItems: 'center' }}>
        <input
          style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
          placeholder="Document title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={saveDocument}
          disabled={saving}
          title="Save document"
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            background: '#0b74ff',
            color: '#fff',
            border: 'none',
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            cursor: saving ? 'not-allowed' : 'pointer'
          }}
        >
          <FaSave /> {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: 10, borderBottom: '1px solid #eee', background: '#fafafa', alignItems: 'center' }}>
        <ToolButton id="bold" Icon={FaBold} title="Bold" activeState={active.bold} />
        <ToolButton id="italic" Icon={FaItalic} title="Italic" activeState={active.italic} />
        <ToolButton id="underline" Icon={FaUnderline} title="Underline" activeState={active.underline} />
        <ToolButton id="strike" Icon={FaStrikethrough} title="Strikethrough" activeState={active.strike} />
        <ToolButton id="remove" Icon={FaEraser} title="Remove formatting" />

        <div style={{ width: 1, height: 28, background: '#eee', margin: '0 8px' }} />

        <ToolButton id="ul" Icon={FaListUl} title="Bulleted list" activeState={active.ul} />
        <ToolButton id="ol" Icon={FaListOl} title="Numbered list" activeState={active.ol} />
        <ToolButton id="indent" Icon={FaIndent} title="Indent" />
        <ToolButton id="outdent" Icon={FaOutdent} title="Outdent" />

        <div style={{ width: 1, height: 28, background: '#eee', margin: '0 8px' }} />

        <ToolButton id="align-left" Icon={FaAlignLeft} title="Align left" activeState={active.left} />
        <ToolButton id="align-center" Icon={FaAlignCenter} title="Align center" activeState={active.center} />
        <ToolButton id="align-right" Icon={FaAlignRight} title="Align right" activeState={active.right} />
        <ToolButton id="align-justify" Icon={FaAlignJustify} title="Justify" activeState={active.justify} />

        <div style={{ width: 1, height: 28, background: '#eee', margin: '0 8px' }} />

        <ToolButton id="undo" Icon={FaUndo} title="Undo" />
        <ToolButton id="redo" Icon={FaRedo} title="Redo" />
        <ToolButton id="code" Icon={FaCode} title="Insert code block" />

        {/* Font family & size */}
        <Dropdown keyName="font-family" Icon={FaFont} title="Font family" options={fontFamilies} onSelectLabel={() => null} />
        <Dropdown keyName="font-size" title="Font size" options={fontSizes} onSelectLabel={() => null} />

        {/* Colors (text & highlight) */}
        <Dropdown
          keyName="color"
          title="Text color"
          options={colorPalette}
          renderSquare={(c) => applyTextColor(c)}
          onSelectLabel={() => null}
        />
        <Dropdown
          keyName="highlight"
          title="Highlight"
          options={colorPalette}
          renderSquare={(c) => applyHighlight(c)}
          onSelectLabel={() => null}
        />

        {/* Stickers (grid) */}
        <Dropdown keyName="stickers" Icon={FaSmile} title="Stickers" options={stickers} renderSquare={(s) => insertEmoji(s)} />

        {/* Emojis */}
        <Dropdown keyName="emoji" title="Emoji" options={emojis} renderSquare={(s) => insertEmoji(s)} />

        {/* Link & image side by side*/}
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <div style={{ margin: 4 }}>
            <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleTool('insert-link')} title="Insert link" style={{ padding: 8, borderRadius: 6 }}>
              <FaLink />
            </button>
          </div>
          <div style={{ margin: 4 }}>
            <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleTool('insert-image')} title="Insert image" style={{ padding: 8, borderRadius: 6 }}>
              <FaImage />
            </button>
          </div>
        </div>

      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck
        style={{
          minHeight: 420,
          padding: 18,
          outline: 'none',
          fontFamily, // note: execCommand('fontName') will apply inline font as well
          fontSize,
          color: textColor,
          backgroundColor: '#fff'
        }}
        onKeyUp={() => document.dispatchEvent(new Event('selectionchange'))}
        onMouseUp={() => document.dispatchEvent(new Event('selectionchange'))}
      >
        <p style={{ margin: 0 }}>Start writing your document...</p>
      </div>

      {/* hidden file input used for image file uploads */}
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFileImage} />

      {/* feedback */}
      <div style={{ padding: 10 }}>
        {message && (
          <div style={{ color: message.type === 'error' ? 'crimson' : 'green' }}>{message.text}</div>
        )}
      </div>
    </div>
  );
};

export default EditorFull;
