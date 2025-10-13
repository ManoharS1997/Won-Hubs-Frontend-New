import React, { useEffect, useRef, useState } from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaFont,
  FaImage,
  FaSmile,
  FaCode,
  FaUndo,
  FaRedo,
  FaLink,
  FaIndent,
  FaOutdent,
  FaEraser,
} from 'react-icons/fa';

const FONT_SIZE_MAP = {
  '12px': 2,
  '14px': 3,
  '16px': 4,
  '18px': 5,
  '20px': 6,
  '24px': 7,
};

const EditorRichUI = () => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('14px');
  const [color, setColor] = useState('#000000');
  const [active, setActive] = useState({});

  const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Poppins', 'Roboto'];
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px'];

  // Expanded color palette
  const colorPalette = [
    '#000000', '#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7',
    '#FFFFFF', '#FF0000', '#E91E63', '#9C27B0', '#673AB7',
    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
    '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107',
    '#FF9800', '#FF5722', '#795548', '#607D8B', '#C2185B',
    '#F44336', '#8E24AA', '#5E35B1', '#3949AB', '#1E88E5',
    '#039BE5', '#00ACC1', '#00897B', '#43A047', '#7CB342',
    '#C0CA33', '#FDD835', '#FFB300', '#FB8C00', '#F4511E',
  ];

  const emojis = [
    '😀', '😂', '😅', '😍', '😘', '😎', '🤩', '😢', '😭', '😡', '🤔', '🙄',
    '😇', '😴', '😬', '🤗', '😋', '🥳', '🤠', '🤓', '😈', '👻', '💩', '👍', '👎', '🙏', '💪', '🔥', '💯'
  ];

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
      } catch { }
    };
    document.addEventListener('selectionchange', updateActive);
    updateActive();
    return () => document.removeEventListener('selectionchange', updateActive);
  }, []);

  const exec = (cmd, val = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    document.dispatchEvent(new Event('selectionchange'));
  };

  const handleButton = (id) => {
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
      case 'link': insertLink(); break;
      case 'image': handleImageInsert(); break;
      default: break;
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL (https://...)', 'https://');
    if (url) exec('insertHTML', `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
  };

  const handleImageInsert = () => {
    const choice = window.prompt('Insert Image from (link / file)? Type "link" or "file"');
    if (!choice) return;
    if (choice.toLowerCase() === 'file') fileInputRef.current?.click();
    else if (choice.toLowerCase() === 'link') {
      const url = prompt('Enter image URL:');
      if (url) insertImage(url);
    }
  };

  const insertImage = (src) => {
    exec(
      'insertHTML',
      `<img src="${src}" style="max-width:300px; border-radius:6px; display:block; margin:6px 0;" alt="image"/>`
    );
  };

  const onImagePicked = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => insertImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const insertCodeBlock = () => {
    const selection = window.getSelection()?.toString();
    const safe = (selection || '// code here')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    exec('insertHTML', `<pre style="background:#f5f5f5;padding:8px;border-radius:4px;"><code>${safe}</code></pre>`);
  };

  const insertEmoji = (emo) => exec('insertText', emo);

  const applyFontFamily = (f) => { setFontFamily(f); exec('fontName', f); setOpenDropdown(null); };
  const applyFontSize = (s) => { setFontSize(s); exec('fontSize', FONT_SIZE_MAP[s] || 3); setOpenDropdown(null); };
  const applyColor = (c) => { setColor(c); exec('foreColor', c); setOpenDropdown(null); };

  const ToolButton = ({ id, Icon, title, activeState = false }) => (
    <div style={{ margin: 4 }}>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => handleButton(id)}
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
          border: activeState ? '1px solid #007bff' : '1px solid transparent',
          background: activeState ? '#e7f0ff' : 'transparent',
        }}
      >
        <Icon />
      </button>
    </div>
  );

  const Dropdown = ({ keyName, Icon, title, options, renderItem, labelRender }) => (
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
        <span style={{ fontSize: 14 }}>{labelRender ? labelRender() : title}</span>
      </button>

      {openDropdown === keyName && (
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 0,
            border: '1px solid #ddd',
            background: '#fff',
            zIndex: 50,
            boxShadow: '0 8px 24px rgba(0,0,0,.12)',
            borderRadius: 8,
            padding: 10,
            width: keyName === 'color' || keyName === 'emoji' ? 260 : 'auto',
            maxHeight: 200,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: keyName === 'color' ? 'repeat(10, 22px)' : keyName === 'emoji' ? 'repeat(8, 1fr)' : 'auto',
            gap: 6,
          }}
        >
          {/* top small pointer triangle */}
          <div style={{
            position: 'absolute',
            top: -8,
            left: 20,
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '8px solid #fff',
            filter: 'drop-shadow(0 -1px 1px rgba(0,0,0,0.08))'
          }} />

          {options.map((opt) => (
            <div
              key={opt}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (keyName === 'color') applyColor(opt);
                else if (keyName === 'emoji') insertEmoji(opt);
                else if (keyName === 'font-family') applyFontFamily(opt);
                else if (keyName === 'font-size') applyFontSize(opt);
                setOpenDropdown(null);
              }}
              style={
                keyName === 'color'
                  ? { width: 22, height: 22, borderRadius: 4, background: opt, border: opt === '#FFFFFF' ? '1px solid #ccc' : 'none', cursor: 'pointer' }
                  : { padding: 6, textAlign: 'center', cursor: 'pointer', fontSize: keyName === 'emoji' ? 20 : 14 }
              }
            >
              {renderItem ? renderItem(opt) : keyName !== 'color' ? opt : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  const applyListStyle = (style) => {
  let listType = "ul";
  let listStyleType = "disc";

  switch (style) {
    case "• Disc": listType = "ul"; listStyleType = "disc"; break;
    case "◦ Circle": listType = "ul"; listStyleType = "circle"; break;
    case "▪ Square": listType = "ul"; listStyleType = "square"; break;
    case "1. Numbered": listType = "ol"; listStyleType = "decimal"; break;
    case "a. Lower Alpha": listType = "ol"; listStyleType = "lower-alpha"; break;
    case "A. Upper Alpha": listType = "ol"; listStyleType = "upper-alpha"; break;
    case "i. Lower Roman": listType = "ol"; listStyleType = "lower-roman"; break;
    case "I. Upper Roman": listType = "ol"; listStyleType = "upper-roman"; break;
    default: break;
  }

  const html = `<${listType} style="list-style-type: ${listStyleType};"><li></li></${listType}>`;
  exec("insertHTML", html);

  // Move cursor inside the new list item
  setTimeout(() => {
    const li = editorRef.current.querySelector("li:last-child");
    if (li) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(li);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, 0);
};
const handleKeyDown = (e) => {
  const sel = window.getSelection();
  const li = sel?.anchorNode?.closest("li");

  // Handle Enter: create new bullet
  if (e.key === "Enter" && li) {
    e.preventDefault();
    const newLi = document.createElement("li");
    newLi.innerHTML = "";
    li.parentNode.insertBefore(newLi, li.nextSibling);

    const range = document.createRange();
    range.selectNodeContents(newLi);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Handle Backspace: stop bullets if empty
  if (e.key === "Backspace" && li && li.textContent === "") {
    e.preventDefault();
    const list = li.parentNode;
    const p = document.createElement("p");
    list.parentNode.insertBefore(p, list.nextSibling);
    list.removeChild(li);
    if (list.childNodes.length === 0) list.remove();

    const range = document.createRange();
    range.selectNodeContents(p);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
};



  return (
    <div style={{ maxWidth: 980, margin: '20px auto', border: '1px solid #dcdcdc', borderRadius: 8 }}>
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          padding: 10,
          borderBottom: '1px solid #eee',
          background: '#fafafa',
          alignItems: 'center',
        }}
      >
        {/* Formatting */}
        <ToolButton id="bold" Icon={FaBold} title="Bold" activeState={active.bold} />
        <ToolButton id="italic" Icon={FaItalic} title="Italic" activeState={active.italic} />
        <ToolButton id="underline" Icon={FaUnderline} title="Underline" activeState={active.underline} />
        <ToolButton id="strike" Icon={FaStrikethrough} title="Strikethrough" activeState={active.strike} />
        <ToolButton id="remove" Icon={FaEraser} title="Clear Format" />

        {/* Lists */}
        <Dropdown
          icon={FaListUl}
          title="List Style"
          options={["• Disc", "◦ Circle", "▪ Square", "1. Numbered", "a. Lower Alpha", "A. Upper Alpha", "i. Lower Roman", "I. Upper Roman"]}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          keyName="list"
          onOptionClick={(style) => applyListStyle(style)}
        />


        {/* Align */}
        <ToolButton id="align-left" Icon={FaAlignLeft} title="Align Left" />
        <ToolButton id="align-center" Icon={FaAlignCenter} title="Align Center" />
        <ToolButton id="align-right" Icon={FaAlignRight} title="Align Right" />
        <ToolButton id="align-justify" Icon={FaAlignJustify} title="Justify" />

        {/* Indent */}
        <ToolButton id="indent" Icon={FaIndent} title="Indent" />
        <ToolButton id="outdent" Icon={FaOutdent} title="Outdent" />

        {/* Undo / Redo */}
        <ToolButton id="undo" Icon={FaUndo} title="Undo" />
        <ToolButton id="redo" Icon={FaRedo} title="Redo" />

        {/* Dropdowns */}
        <Dropdown keyName="font-family" Icon={FaFont} title="Font" options={fontFamilies} labelRender={() => fontFamily} />
        <Dropdown keyName="font-size" title="Size" options={fontSizes} labelRender={() => fontSize} />
        <Dropdown keyName="color" title="Color" options={colorPalette} />
        <Dropdown keyName="emoji" Icon={FaSmile} title="Emoji" options={emojis} labelRender={() => '😊'} />

        {/* Link & Image */}
        <div style={{ display: 'flex', gap: 6 }}>
          <ToolButton id="link" Icon={FaLink} title="Insert Link" />
          <ToolButton id="image" Icon={FaImage} title="Insert Image" />
        </div>

        {/* Code */}
        <ToolButton id="code" Icon={FaCode} title="Insert Code Block" />
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck
        style={{
          minHeight: 320,
          padding: 16,
          outline: 'none',
          fontFamily,
          fontSize,
          color,
        }}
        onKeyDown={handleKeyDown}
      >
        <p>Start typing your content here...</p>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onImagePicked} />
    </div>
  );
};

export default EditorRichUI;
