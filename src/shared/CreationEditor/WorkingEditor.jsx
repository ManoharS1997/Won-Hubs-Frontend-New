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
  FaVideo,
  FaFileWord
} from 'react-icons/fa';
import { VscTextSize } from "react-icons/vsc";
import { IoColorPalette } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import mammoth from 'mammoth';
import EditableFields from './EditableFields';

const fieldsList = [
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
const EditorRichUI = ({ path }) => {
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
  const [detailsObject, setDetailsObject] = useState(JSON.parse(localStorage.getItem('notificationData')))
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
  const Navigate = useNavigate()
  const wordFileInputRef = useRef(null);

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
      case 'image': setShowImageModal(true); break;
      case 'video': setShowVideoModal(true); break;
      case "word": handleWordInsert(); break;
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
  // Call insertVideoWithDebug(src, width, height, playHere)
  function insertVideoWithDebug(src, width = 400, height = 250, playHere = true) {
    const editor = editorRef.current;
    if (!editor) { console.error('no editorRef'); return; }

    const sel = window.getSelection();

    // Create wrapper
    const wrap = document.createElement('div');
    wrap.style.margin = '10px 0';
    wrap.style.display = 'flex';
    wrap.style.justifyContent = 'center';

    // Create video element (or iframe for youtube)
    const isYouTube = (u) => /youtube\.com|youtu\.be/.test(u);
    let node;
    if (playHere && isYouTube(src)) {
      const id = (src.split('v=')[1] || src.split('/').pop() || '').split('&')[0];
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}`;
      iframe.width = width;
      iframe.height = height;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      node = iframe;
    } else if (playHere) {
      const v = document.createElement('video');
      v.controls = true;
      v.width = width;
      v.height = height;

      // If src looks like base64 or blob or plain url, prefer setting <source>
      const source = document.createElement('source');
      source.src = src;
      // Try to set type if obvious
      if (/\.(mp4)(\?.*)?$/.test(src)) source.type = 'video/mp4';
      if (/\.(webm)(\?.*)?$/.test(src)) source.type = 'video/webm';
      if (/\.(ogg|ogv)(\?.*)?$/.test(src)) source.type = 'video/ogg';

      v.appendChild(source);
      node = v;

      // Attach debugging listeners
      v.addEventListener('loadedmetadata', () => console.log('DBG: loadedmetadata — duration=', v.duration));
      v.addEventListener('canplay', () => console.log('DBG: canplay'));
      v.addEventListener('canplaythrough', () => console.log('DBG: canplaythrough'));
      v.addEventListener('error', (e) => {
        console.error('DBG: video element error', e, v.error);
        // try fallback: set src directly on video (some sources need it)
        // v.src = src;
      });
      v.addEventListener('stalled', () => console.warn('DBG: stalled'));
      v.addEventListener('suspend', () => console.warn('DBG: suspend'));
      v.addEventListener('waiting', () => console.warn('DBG: waiting'));
      v.addEventListener('playing', () => console.log('DBG: playing'));
      v.addEventListener('pause', () => console.log('DBG: paused'));
    } else {
      // fallback link
      const a = document.createElement('a');
      a.href = src;
      a.target = '_blank';
      a.textContent = 'Open video';
      node = a;
    }

    wrap.appendChild(node);

    // Insert into editor (preserve selection if inside editor)
    if (!sel.rangeCount || !editor.contains(sel.anchorNode)) {
      console.warn('DBG: selection missing or outside editor — appending at end');
      editor.appendChild(wrap);
    } else {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(wrap);
      range.setStartAfter(wrap);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    // Log node and src
    console.log('DBG: inserted video node', node, 'currentSrc:', node.currentSrc || node.src || (node.querySelector && node.querySelector('source')?.src));

    // Try autoplay test (muted) to verify playable
    if (playHere && node.tagName === 'VIDEO') {
      node.muted = true;
      node.play().then(() => {
        console.log('DBG: autoplay test succeeded (muted)');
        node.pause();
        node.muted = false;
      }).catch(err => {
        console.warn('DBG: autoplay test failed (expected if not muted):', err);
      });
    }
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

  const saveContentToLocalStorage = () => {
    const content = editorRef.current?.innerHTML || "";
    console.log(content, "Content Here")
    localStorage.setItem("editorContent", content);
    Navigate(path)
  };
  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent && editorRef.current) {
      editorRef.current.innerHTML = savedContent;
    }
  }, []);

  return (
    <div className='flex h-[100%] w-[100%]'>
      <div className="hidden w-[17vw] h-full md:flex flex-col p-4 bg-[#353535] text-white overflow-y-auto custom-scrollbar">
        <h2 className="text-center">Additional Fields</h2>
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
      <div className='overflow-y-auto custom-scrollbar p-0 m-0 w-full'>
        <div className="flex items-start gap-4 w-full mt-2">
          {/* Editable Fields */}
          <div className="flex-1">
            <EditableFields />
          </div>
          {/* Finish Button */}
          <div className="flex items-end mt-2">
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
              onClick={saveContentToLocalStorage}
            >
              <span>Finish</span>
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
          </div>
        </div>

        <div className="w-[79vw] min-h-[95%] mt-10 mx-auto  p-0">
          <div style={{ maxWidth:"97%" ,margin: '20px auto', border: '2px solid #dcdcdc', borderRadius: 8, minHeight: "95%", maxHeight:"98%" }} 
          className='!mr-2 flex-1'>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '1rem', borderBottom: '1px solid #eee', background: '#fafafa', alignItems: 'center' }}>
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
              <ToolButton id="code" Icon={FaCode} title="Insert Code Block" />
            </div>

            {/* <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            spellCheck
            style={{ minHeight: 320, padding: 16, outline: 'none', fontFamily, fontSize, color }}
            onKeyDown={handleKeyDown}
          >
            <p>Start typing your content here...</p>
          </div> */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              spellCheck
              style={{
                minHeight: 320,          // Minimum editor height
                maxHeight: '80vh',       // Maximum height before scrolling (adjust as needed)
                padding: 16,
                outline: 'none',
                fontFamily,
                fontSize,
                color,
                overflowY: 'auto',       // Vertical scroll only when content exceeds maxHeight
                overflowX: 'hidden',     // Prevent horizontal scroll
              }}
              onKeyDown={handleKeyDown}
              onInput={saveContentToLocalStorage}
            >
              <p>Start typing your content here...</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFilePicked} />
          </div>
        </div>
      </div>

      {/* --- Image Modal --- */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px] flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Insert Image</h2>
            <div className="flex gap-2">
              <label className="flex-1">
                <input
                  type="radio"
                  name="sourceType"
                  checked={imageData.sourceType === 'link'}
                  onChange={() => setImageData(prev => ({ ...prev, sourceType: 'link' }))}
                />
                Link
              </label>
              <label className="flex-1">
                <input
                  type="radio"
                  name="sourceType"
                  checked={imageData.sourceType === 'file'}
                  onChange={() => setImageData(prev => ({ ...prev, sourceType: 'file' }))}
                />
                File
              </label>
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
              <button onClick={handleImageModalInsert} className="px-4 py-2 bg-blue-500 text-white rounded">Insert</button>
            </div>
          </div>
        </div>
      )}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px] flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center">Insert Video</h2>

            <div className="flex gap-3 justify-center">
              <button
                className={`px-3 py-1 rounded-md ${videoData.sourceType === "link" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                onClick={() => setVideoData({ ...videoData, sourceType: "link", file: null })}
              >
                Video Link
              </button>
              <button
                className={`px-3 py-1 rounded-md ${videoData.sourceType === "file" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                onClick={() => setVideoData({ ...videoData, sourceType: "file", url: "" })}
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
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={() => {
                  if (videoData.sourceType === "link" && videoData.url) {
                    insertVideo(videoData.url, videoData.width, videoData.height, videoData.playHere);
                  } else if (videoData.sourceType === "file" && videoData.file) {
                    const reader = new FileReader();
                    reader.onload = (ev) =>
                      // insertVideo(ev.target.result, videoData.width, videoData.height, videoData.playHere);
                      insertVideoWithDebug('https://your-host/path/video.mp4', 640, 360, true);

                    reader.readAsDataURL(videoData.file);
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


