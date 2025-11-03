import { useEffect, useRef, useState } from 'react';
import { MdOutlineDescription } from "react-icons/md";

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
  FaVideo,
  FaFileWord,
  FaMinus
} from 'react-icons/fa';
import { VscTextSize } from "react-icons/vsc";
import { IoColorPalette } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import mammoth from 'mammoth';
import EditableFields from './EditableFields';
import './Editor.css'
import { MdInsertPageBreak } from "react-icons/md";


export const fieldsList = [
  { fieldName: 'Address', isAdded: false, value: 'India  -6-284-1, Uma Shankar Nagar, Revenue Ward -17 , YSR Tadigadapa, 520007.' },
  { fieldName: 'Assigned Member', isAdded: false, value: 'Kartheek Muppiri' },
  { fieldName: 'Category', isAdded: false, value: 'WON-Platform' },
  { fieldName: 'Contact Number', isAdded: false, value: '+19 2568974613' },
  { fieldName: 'Created By', isAdded: false, value: 'Sriram Kakani' },
  { fieldName: 'Department', isAdded: false, value: 'Technical' },
  { fieldName: 'Description', isAdded: false, value: 'This ticket is assigned for update the client requirements in the Admin Portal' },
  { fieldName: 'Due Date', isAdded: false, value: '22/2/2024' },
  { fieldName: 'Email Address', isAdded: false, value: 'Kartheek.M@nowitservices.com' },
  { fieldName: 'Internal Notes', isAdded: false, value: '{empty}' },
  { fieldName: 'Location', isAdded: false, value: 'Vijayawada' },
  { fieldName: 'Priority', isAdded: false, value: '1-High' },
  { fieldName: 'State', isAdded: false, value: 'Created' },
  { fieldName: 'Sub-department', isAdded: false, value: 'MERN Developer' },
  { fieldName: 'Subject', isAdded: false, value: '{empty}' },
]
const FONT_SIZE_MAP = {
  '12px': 2,
  '14px': 3,
  '16px': 4,
  '18px': 5,
  '20px': 6,
  '24px': 7,
};

const EditorRichUI = ({ path = "", defaultFieldsData = {}, content, isUpdate, recordId }) => {
  console.log(content,"content Heree")

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const savedCollection = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('14px');
  const [color, setColor] = useState('#000000');
  const [active, setActive] = useState({});
  const [fieldsListData, setFieldsListData] = useState(fieldsList);
  const [imageData, setImageData] = useState({
    sourceType: 'link',  // 'link' or 'file'
    url: '',
    file: null,
    width: '50px',
    height: '100px',
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [emailData, setEmailData] = useState(defaultFieldsData);
  const [detailsObject, setDetailsObject] = useState(JSON.parse(localStorage.getItem(`${path}Data`))) || defaultFieldsData;
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const [videoData, setVideoData] = useState({
    sourceType: "link",
    url: "",
    file: null,
    width: 400,
    height: 250,
    playHere: true, // true = inline, false = open in new window
  });
  const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Poppins', 'Roboto'];
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px'];
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
  const pageSizes = {
    A0: { width: "841mm", height: "1189mm" },
    A1: { width: "594mm", height: "841mm" },
    A2: { width: "420mm", height: "594mm" },
    A3: { width: "297mm", height: "420mm" },
    A4: { width: "210mm", height: "297mm" },
    A5: { width: "148mm", height: "210mm" },
    Letter: { width: "8.5in", height: "11in" },
    Legal: { width: "8.5in", height: "14in" },
    Tabloid: { width: "11in", height: "17in" },
    Executive: { width: "7.25in", height: "10.5in" },
    B4: { width: "250mm", height: "353mm" },
    B5: { width: "176mm", height: "250mm" },
  };

  const Navigate = useNavigate()
  const wordFileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    const saveSelection = () => {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        savedCollection.current = sel.getRangeAt(0);
      }
    };
    document.addEventListener('selectionchange', saveSelection);
    return () => document.removeEventListener('selectionchange', saveSelection);
  }, []);


  const exec = (cmd, val = null) => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (savedCollection.current) {
      sel.removeAllRanges();
      sel.addRange(savedCollection.current);
    }
    document.execCommand(cmd, false, val);
    document.dispatchEvent(new Event('selectionchange'));
  };

  const handlePageSizeChange = (size) => {
    const editor = editorRef.current;
    if (!editor) return;

    const sizes = {
      A0: { width: "841mm", height: "1189mm" },
      A1: { width: "594mm", height: "841mm" },
      A2: { width: "420mm", height: "594mm" },
      A3: { width: "297mm", height: "420mm" },
      A4: { width: "210mm", height: "297mm" },
      A5: { width: "148mm", height: "210mm" },
      A6: { width: "105mm", height: "148mm" },
      Letter: { width: "216mm", height: "279mm" },
      Legal: { width: "216mm", height: "356mm" },
      Tabloid: { width: "279mm", height: "432mm" },
      Executive: { width: "184mm", height: "267mm" },
      B4: { width: "250mm", height: "353mm" },
      B5: { width: "176mm", height: "250mm" },
    };

    const selected = sizes[size];
    if (!selected) return;

    editor.style.width = selected.width;
    editor.style.minHeight = selected.height;
    editor.style.margin = "20px auto";
    editor.style.padding = "20mm";
    editor.style.backgroundColor = "#fff";
    editor.style.boxShadow = "0 0 5px rgba(0,0,0,0.2)";
    editor.style.transition = "all 0.3s ease";
  };



  const handleButton = (id, value) => {
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
      case 'image': setShowImageModal(true); break;
      case 'video': setShowVideoModal(true); break;
      case "word": handleWordInsert(); break;
      case "pageBreak":
        insertPageBreak(); break;
      case "pageSize": handlePageSizeChange(value); break;

      default: break;
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL (https://...)', 'https://');
    if (url) exec('insertHTML', `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
  };

  const insertImage = (src, width = 50, height = 50) => {
    console.log("insertImage called with:", { src, width, height });

    const editor = editorRef.current;
    if (!editor) {
      console.error("Editor ref is null!");
      return;
    }

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'image';
    img.style.width = width + 'px';
    img.style.height = height + 'px';
    img.style.borderRadius = '6px';
    img.style.display = 'block';
    img.style.margin = '6px 0';

    // Get current selection
    const sel = window.getSelection();

    if (!sel.rangeCount || !editor.contains(sel.anchorNode)) {
      // If no selection or selection is outside editor, append at end
      console.warn("Selection outside editor, appending at end");
      editor.appendChild(img);

      // Move cursor after image
      const range = document.createRange();
      range.setStartAfter(img);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);

      savedCollection.current = range;
      return;
    }

    // If selection is inside editor, insert at cursor
    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(img);

    range.setStartAfter(img);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    savedCollection.current = range;

    console.log("Image inserted successfully inside editor");
  };


  const handleImageModalInsert = () => {
    console.log(imageData, "herreee")
    if (!imageData.url && !imageData.file) return;

    if (imageData.sourceType === 'link') {
      console.log("Inserting image from link:", imageData.url);
      insertImage(imageData.url, imageData.width, imageData.height);
    } else if (imageData.sourceType === 'file' && imageData.file) {
      const reader = new FileReader();
      reader.onload = (ev) => insertImage(ev.target.result, imageData.width, imageData.height);
      reader.readAsDataURL(imageData.file);
    }

    setImageData({ sourceType: 'link', url: '', file: null, width: '', height: '' });
    setShowImageModal(false);
  };
  const onFilePicked = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageData(prev => ({ ...prev, file }));
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

  const insertTextAtCursor = (text) => {
    const editor = editorRef.current;
    editor.focus();
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleAddField = (fieldName, value) => {
    insertTextAtCursor(value);
    setFieldsListData((prev) =>
      prev.map((f) => f.fieldName === fieldName ? { ...f, isAdded: true } : f)
    );
  };

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

  const Dropdown = ({ keyName, Icon, title, options, labelRender, onOptionClick }) => (
    <div style={{ position: 'relative', margin: 4 }}>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          setDropdownPosition({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
          });
          setOpenDropdown((p) => (p === keyName ? null : keyName));
        }}

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
        type="button"
      >
        {Icon && <Icon />}
        <span style={{ fontSize: 14 }}>{labelRender ? labelRender() : title}</span>
      </button>

      {openDropdown === keyName && (
        <div
          style={{
            position: 'fixed', // ✅ instead of absolute
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            border: '1px solid #ddd',
            background: '#fff',
            zIndex: 9999, // ✅ ensures it's on top
            boxShadow: '0 8px 24px rgba(0,0,0,.12)',
            borderRadius: 8,
            padding: 10,
            width:
              keyName === 'color' || keyName === 'emoji'
                ? 260
                : 'auto',
            maxHeight: 200,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns:
              keyName === 'color'
                ? 'repeat(10, 22px)'
                : keyName === 'emoji'
                  ? 'repeat(8, 1fr)'
                  : 'auto',
            gap: 6,
          }}
        >

          {options.map((opt) => (
            <div
              key={opt}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (onOptionClick) onOptionClick(opt);
                if (keyName === 'color') applyColor(opt);
                else if (keyName === 'emoji') insertEmoji(opt);
                else if (keyName === 'font-family') applyFontFamily(opt);
                else if (keyName === 'font-size') applyFontSize(opt);
                else if (keyName === 'pageSize') handlePageSizeChange(opt)
                setOpenDropdown(null);
              }}
              style={keyName === 'color'
                ? { width: 22, height: 22, borderRadius: 4, background: opt, border: opt === '#FFFFFF' ? '1px solid #ccc' : 'none', cursor: 'pointer' }
                : { padding: 6, textAlign: 'center', cursor: 'pointer', fontSize: keyName === 'emoji' ? 20 : 14 }
              }
            >
              {keyName !== 'color' ? opt : ''}
            </div>
          ))}


        </div>
      )}
    </div>
  );

  const handleKeyDown = (e) => {
    const sel = window.getSelection();
    const li = sel?.anchorNode?.closest("li");
    // Auto turn off formatting after typing
    if (e.key.length === 1) {
      const wasBold = document.queryCommandState('bold');
      const wasItalic = document.queryCommandState('italic');
      const wasUnderline = document.queryCommandState('underline');
      setTimeout(() => {
        if (wasBold) document.execCommand('bold', false, null);
        if (wasItalic) document.execCommand('italic', false, null);
        if (wasUnderline) document.execCommand('underline', false, null);
      }, 0);
    }
  };
  const insertVideo = (src, width = 400, height = 250, playHere = true) => {
    const editor = editorRef.current;
    if (!editor) return;

    const sel = window.getSelection();

    // Create actual video player
    if (playHere) {
      const videoWrapper = document.createElement('div');
      videoWrapper.style.margin = '10px 0';
      videoWrapper.style.display = 'flex';
      videoWrapper.style.justifyContent = 'center';

      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.style.width = width + 'px';
      video.style.height = height + 'px';
      video.style.borderRadius = '8px';
      video.style.display = 'block';

      // For safety: detect file type
      const type = src.endsWith('.mp4')
        ? 'video/mp4'
        : src.endsWith('.webm')
          ? 'video/webm'
          : src.endsWith('.ogg')
            ? 'video/ogg'
            : '';
      if (type) {
        const sourceTag = document.createElement('source');
        sourceTag.src = src;
        sourceTag.type = type;
        video.appendChild(sourceTag);
      }

      videoWrapper.appendChild(video);

      // Insert at selection or end
      if (!sel.rangeCount || !editor.contains(sel.anchorNode)) {
        editor.appendChild(videoWrapper);
      } else {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(videoWrapper);
        range.setStartAfter(videoWrapper);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      savedCollection.current = sel.getRangeAt(0);
      console.log("✅ Video inserted and playable:", src);

    } else {
      // Insert as a clickable link
      const link = document.createElement('a');
      link.href = src;
      link.target = '_blank';
      link.textContent = '🎬 Open Video in New Tab';
      link.style.color = '#007bff';
      link.style.textDecoration = 'underline';

      if (!sel.rangeCount || !editor.contains(sel.anchorNode)) {
        editor.appendChild(link);
      } else {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(link);
        range.setStartAfter(link);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      savedCollection.current = sel.getRangeAt(0);
      console.log("🔗 Inserted video link:", src);
    }
  };

  function insertVideoFile(file, width = 400, height = 250, playHere = true) {
    if (!file) return;
    const editor = editorRef.current;
    if (!editor) return;

    const sel = window.getSelection();

    // Convert file to object URL
    const url = URL.createObjectURL(file);

    // Create video element
    const videoWrapper = document.createElement('div');
    videoWrapper.style.margin = '10px 0';
    videoWrapper.style.display = 'flex';
    videoWrapper.style.justifyContent = 'center';

    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.width = width;
    video.height = height;
    video.style.borderRadius = '8px';
    video.style.display = 'block';

    videoWrapper.appendChild(video);

    // Insert at selection or end
    if (!sel.rangeCount || !editor.contains(sel.anchorNode)) {
      editor.appendChild(videoWrapper);
    } else {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(videoWrapper);
      range.setStartAfter(videoWrapper);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    // Revoke object URL when done (optional)
    video.addEventListener('loadeddata', () => URL.revokeObjectURL(url));
  }
  //Word functions
  const handleWordInsert = () => {
    wordFileInputRef.current?.click();
  };

  const onWordFilePicked = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith(".docx")) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      insertTextAtCursor(result.value); // insert text at cursor
    } else {
      alert("Only .docx files are supported for now.");
    }
  };

  const saveContentToLocalStorage = (navigate = false) => {
    const content = editorRef.current?.innerHTML || "";
    localStorage.setItem("editorContent", content);
    if (navigate) Navigate(`/notifications/preview/testing`, { state: { detailsObject: detailsObject, editorContent: content, path: path, isUpdate: isUpdate, recordId: recordId } });
  };

  useEffect(() => {
    if (content && editorRef.current) {
      // Only set if the content isn't already inside
      if (editorRef.current.innerHTML !== content) {
        editorRef.current.innerHTML = content;
      }
    }
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent && editorRef.current) {
      editorRef.current.innerHTML = savedContent;
    }
  }, []);
  // useEffect(() => {
    
  // }, [content, defaultFieldsData]);

  useEffect(() => {
    if (Object.keys(defaultFieldsData).length > 0) {
      setDetailsObject(defaultFieldsData);
    }
  }, [defaultFieldsData, path]);

  const handleFieldsUpdate = (updatedData) => {
    setDetailsObject(updatedData);
    localStorage.setItem(`${path}Data`, JSON.stringify(updatedData));
  };

  const insertPageBreak = () => {
    const editor = editorRef.current;
    if (!editor) return;

    // Force focus into editor
    editor.focus();

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    // Ensure selection is inside editor
    if (!editor.contains(range.startContainer)) {
      // Move caret to end of editor if not inside
      const newRange = document.createRange();
      newRange.selectNodeContents(editor);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }

    // Create wrapper div
    const wrapper = document.createElement("div");
    wrapper.className = "page-break";
    wrapper.contentEditable = "false";

    // Dashed line
    const line = document.createElement("div");
    line.className = "page-break-line";
    wrapper.appendChild(line);

    // ❌ Remove button
    const removeBtn = document.createElement("span");
    removeBtn.innerHTML = "✖";
    removeBtn.className = "remove-break-btn";
    removeBtn.title = "Remove Page Break";
    wrapper.appendChild(removeBtn);

    // Remove on click (only when ❌ clicked)
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      wrapper.remove();
    });

    // Insert at cursor
    const currentRange = selection.getRangeAt(0);
    currentRange.insertNode(wrapper);

    // Move cursor after break
    currentRange.setStartAfter(wrapper);
    currentRange.setEndAfter(wrapper);
    selection.removeAllRanges();
    selection.addRange(currentRange);
  };
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleClick = (e) => {
      if (e.target.classList.contains("page-break")) {
        e.target.remove(); // remove page break if clicked
      }
    };

    editor.addEventListener("click", handleClick);
    return () => editor.removeEventListener("click", handleClick);
  }, []);


  return (
    <div className='flex h-full w-full'>
      <div className="hidden w-[17vw] h-full md:flex flex-col p-4 bg-[#353535] text-white overflow-y-auto custom-scrollbar">
        <h2 className="text-center"> Fields</h2>
        <div>
          <input type="text" placeholder="Search fields..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <ul className="flex flex-col gap-[10px] pl-0">
          {fieldsListData.map((item) =>
            item.isAdded ? null : (
              <button
                key={item.fieldName}
                onClick={() => handleAddField(item.fieldName, item.value)}
                className="p-[10px] w-full h-fit bg-black outline-none border border-white text-white text-center flex justify-between items-center rounded-md hover:border-[#9ef01a] hover:text-[#9ef01a]"
              >
                {item.fieldName}
                <IoMdAdd />
              </button>
            )
          )}
        </ul>
      </div>
      <div className='overflow-y-auto custom-scrollbar  m-0 w-full overflow-hidden'>
        {/* <div className="flex items-start gap-4 w-full mt-2"> */}
        {/* Editable Fields */}
        {/* {detailsObject && (
            <EditableFields data={detailsObject} onUpdate={handleFieldsUpdate} path={path} />
          )} */}
        {/* Finish Button */}
        {/* <div className="flex items-end mt-2 justify-end">
          <button
            className="
        bg-black text-white 
        flex items-center justify-between 
        px-4 py-1 
        font-bold 
        outline-none 
        cursor-pointer 
        h-full 
        transition-transform duration-500 ease-in-out 
        !rounded-full
        group
      "
            type="button"
            onClick={() => saveContentToLocalStorage(true)}
          >
            <span>Preview</span>
            <svg
              className="transition-transform duration-500 ease-in-out transform group-hover:translate-x-[10px]"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="40"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M1 8h14M9 3l6 5-6 5" />
            </svg>
          </button>
        </div> */}
        {/* </div> */}
        <div className="w-[73vw] mx-auto mt-4 mb-0 h-[75vh] flex flex-col  rounded-md bg-white ">
          <div
            style={{
              maxWidth: "97%",
              margin:'2px',
              border: "2px solid #dcdcdc",
              borderRadius: 8,
              height: "68vh",
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              
            }}
            className="!mr-2 flex-1"
          >
{/* toolBar container */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                padding: "0.75rem 1rem",
                borderBottom: "1px solid #eee",
                background: "#fafafa",
                alignItems: "center",
                flexShrink: 0,
                position: 'relative',
                zIndex: 10
              }}
              className="overflow-x-auto scrollbar-hide" // Allows horizontal scroll on very small screens
            >
              {/* Formatting */}
              <ToolButton id="bold" Icon={FaBold} title="Bold" activeState={active.bold} />
              <ToolButton id="italic" Icon={FaItalic} title="Italic" activeState={active.italic} />
              <ToolButton id="underline" Icon={FaUnderline} title="Underline" activeState={active.underline} />
              <ToolButton id="strike" Icon={FaStrikethrough} title="Strikethrough" activeState={active.strike} />
              <ToolButton id="remove" Icon={FaEraser} title="Clear Format" />
              {/* Lists */}
              <Dropdown
                Icon={FaListUl}
                title="List Style"
                options={["• Disc", "◦ Circle", "▪ Square", "1. Numbered", "a. Lower Alpha", "A. Upper Alpha", "i. Lower Roman", "I. Upper Roman"]}
                keyName="list"
                onOptionClick={(style) => {
                  let listType = style.includes('Numbered') || style.includes('Alpha') || style.includes('Roman') ? 'ol' : 'ul';
                  let typeMap = {
                    '• Disc': 'disc', '◦ Circle': 'circle', '▪ Square': 'square',
                    '1. Numbered': 'decimal', 'a. Lower Alpha': 'lower-alpha', 'A. Upper Alpha': 'upper-alpha',
                    'i. Lower Roman': 'lower-roman', 'I. Upper Roman': 'upper-roman'
                  };
                  exec('insertHTML', `<${listType} style="list-style-type: ${typeMap[style]};"><li>&nbsp;</li></${listType}>`);
                }}
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
              <Dropdown keyName="font-size" title="Size" options={fontSizes} labelRender={() => fontSize} Icon={VscTextSize} />
              <Dropdown keyName="color" title="Color" options={colorPalette} Icon={IoColorPalette} />
              <Dropdown keyName="emoji" Icon={FaSmile} title="Emoji" options={emojis} />
              {/* Link & Image */}
              <ToolButton id="link" Icon={FaLink} title="Insert Link" />
              <ToolButton id="image" Icon={FaImage} title="Insert Image" />
              <ToolButton id="video" Icon={FaVideo} title="Insert Video" />
              <ToolButton id="word" Icon={FaFileWord} title="Insert Word File" />
              <input
                type="file"
                ref={wordFileInputRef}
                accept=".docx,.doc"
                style={{ display: 'none' }}
                onChange={onWordFilePicked}
              />
              {/* Code */}
              {/* <ToolButton Icon={FaMinus} title="Insert Page Break" /> */}
              <ToolButton id="code" Icon={FaCode} title="Insert Code Block" />
              <button className='h-fit w-fit' type="button" onClick={insertPageBreak} title="Page Break"><span><MdInsertPageBreak/></span> </button>
              <Dropdown
                keyName="pageSize"
                title='Size'
                options={[
                  "A0", "A1", "A2", "A3", "A4", "A5", "A6",
                  "Letter", "Legal", "Tabloid", "Executive",
                  "B4", "B5"
                ]}
                Icon={MdOutlineDescription}
                onOptionClick={(opt) => handleButton("pageSize", opt)}
              />

            </div>
            {/* editor Area div */}
            
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50 p-2">
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                spellCheck
                style={{
                  width: pageSizes["A4"]?.width || "210mm",
                  minHeight: pageSizes["A4"]?.height || "297mm",
                  margin: "20px auto",
                  padding: "20mm",
                  background: "#fff",
                  boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                className="custom-scrollbar"
                onKeyDown={handleKeyDown}
                onInput={() => saveContentToLocalStorage(false)}
              >
                <p>Start typing your content here...</p>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFilePicked} />
          </div>
        </div>
      </div>


      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px] flex flex-col gap-4">
            <h2 className="text-md font-semibold mb-0">Insert Image</h2>
            <div className="flex gap-2 border-b border-gray-200 ">
              <button
                type="button"
                onClick={() => setImageData(prev => ({ ...prev, sourceType: 'link' }))}
                className={`flex-1 text-sm py-1 font-medium transition-all duration-150  bg-transparent w-10 ${imageData.sourceType === 'link'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-blue-500'
                  }`}
              >
                Link
              </button>

              <button
                type="button"
                onClick={() => setImageData(prev => ({ ...prev, sourceType: 'file' }))}
                className={`flex-1 text-sm py-1 font-medium transition-all duration-150 bg-transparent ${imageData.sourceType === 'file'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-blue-500'
                  }`}
              >
                File
              </button>
            </div>


            {imageData.sourceType === 'link' ? (
              <input
                type="text"
                placeholder="Image URL"
                className="border p-2 rounded w-full"
                value={imageData.url}
                onChange={(e) => setImageData(prev => ({ ...prev, url: e.target.value }))}
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={onFilePicked}
              />
            )}

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Width (px)"
                className="border p-2 rounded flex-1"
                value={imageData.width}
                onChange={(e) => setImageData(prev => ({ ...prev, width: e.target.value }))}
              />
              <input
                type="number"
                placeholder="Height (px)"
                className="border p-2 rounded flex-1"
                value={imageData.height}
                onChange={(e) => setImageData(prev => ({ ...prev, height: e.target.value }))}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowImageModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleImageModalInsert} className="px-4 py-2 !bg-blue-500 text-white rounded">Insert</button>
            </div>
          </div>
        </div>
      )}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px] flex flex-col gap-4">
            <h2 className="text-md font-semibold text-center mb-0">Insert Video</h2>

            <div className="flex gap-3 justify-center">
              <button
                className={`px-3 py-1 rounded-md border-b-2 transition-all !bg-transparent ${videoData.sourceType === "link"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700"
                  }`}
                onClick={() =>
                  setVideoData({ ...videoData, sourceType: "link", file: null })
                }
              >
                Video Link
              </button>
              <button
                className={`px-3 py-1 rounded-md border-b-2 transition-all !bg-transparent ${videoData.sourceType === "file"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700"
                  }`}
                onClick={() =>
                  setVideoData({ ...videoData, sourceType: "file", url: "" })
                }
              >
                Upload File
              </button>
            </div>

            {videoData.sourceType === "link" ? (
              <input
                type="text"
                placeholder="Paste video URL (e.g. https://...)"
                value={videoData.url}
                onChange={(e) => setVideoData({ ...videoData, url: e.target.value })}
                className="border p-2 rounded w-full"
              />
            ) : (
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoData({ ...videoData, file: e.target.files[0] })}
                className="border p-2 rounded w-full"
              />
            )}

            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Width (px)"
                value={videoData.width}
                onChange={(e) => setVideoData({ ...videoData, width: e.target.value })}
                className="border p-2 rounded w-1/2"
              />
              <input
                type="number"
                placeholder="Height (px)"
                value={videoData.height}
                onChange={(e) => setVideoData({ ...videoData, height: e.target.value })}
                className="border p-2 rounded w-1/2"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={videoData.playHere}
                onChange={(e) => setVideoData({ ...videoData, playHere: e.target.checked })}
              />
              <label>Play video inside editor</label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 px-3 py-1 rounded-md"
                onClick={() => setShowVideoModal(false)}
              >
                Cancel
              </button>
              <button
                className="!bg-blue-500 text-white px-3 py-1 !rounded-md"
                onClick={() => {
                  if (videoData.sourceType === "link" && videoData.url) {
                    insertVideo(videoData.url, videoData.width, videoData.height, videoData.playHere);
                  } else if (videoData.sourceType === "file" && videoData.file) {
                    insertVideoFile(videoData.file, videoData.width, videoData.height);
                  }

                  setShowVideoModal(false);
                  setVideoData({
                    sourceType: "link",
                    url: "",
                    file: null,
                    width: 400,
                    height: 250,
                    playHere: true,
                  });
                }}
              >
                Insert Video
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditorRichUI;


