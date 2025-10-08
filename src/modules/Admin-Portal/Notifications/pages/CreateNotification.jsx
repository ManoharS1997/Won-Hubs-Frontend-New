import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import isHotkey from 'is-hotkey'
import {
  Editor, Transforms, createEditor, Element as SlateElement
} from 'slate'
import {
  useSlate, Slate, Editable, useSlateStatic, useSelected,
  useFocused, withReact, ReactEditor,
} from 'slate-react'

import { withHistory } from 'slate-history'
import { css } from '@emotion/css'

import { Button, Icon, Toolbar } from '../CreateNotification/components'
import { useNavigate } from 'react-router-dom'

// import WonContext from '../../../../context/WonContext'
import PreviewNotification from './PreviewNotification'

import { IoMdAdd } from "react-icons/io";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { IoChevronBackSharp } from "react-icons/io5";
import {
  MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdOutlineCode, MdFormatQuote,
  MdFormatListNumbered, MdFormatListBulleted, MdFormatAlignLeft, MdFormatAlignCenter,
  MdFormatAlignRight, MdFormatAlignJustify, MdImage
} from "react-icons/md";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import { FinishBtn } from './StyledNotificationTemlates'
import renderIcons from '../../../../shared/functions/renderIcons'
import Cookies from 'js-cookie'
import {
  ActionBtn, ActionBtnsContainer, AddFieldBtn, AddIcon,
  BackBtn, BodyContainer, CreateNotificationContainer,
  CustomContainer, CustomHeading, CustomInput, CustomLabel,
  CustomOption, CustomSelect, DefaultFieldlsContainer,
  FieldContainer, FieldsContainer, FieldsList, MainContainer,
  SidebarContainer, TextAreaTag, ToolBarContainer
} from '../CreateNotification/StyledComponents';
// import SlateEditor from '../../../../shared/components/SlateNew/SlateEditor/Editor'


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

const defaultFieldsData = {
  to: 'Kartheek.M@nowitservices.com',
  cc: 'Sivakumar.E@nowitservices.com, Sriram.k@nowitservices.com',
  notificationName: 'Ticket Creation Notification',
  subject: 'Created Notification Builder Ticket',
  active: true,
  type: 'global'
}

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
const initialValue = [
  {
    type: 'heading-two',
    children: [
      {
        text: `Notification name:  ${defaultFieldsData.notificationName}`,
      },
    ],
  },
  {
    type: 'image',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: `Receivers:  ${defaultFieldsData.to}, ${defaultFieldsData.cc}`,
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Notification Content:  ',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Hi <Assigned Member>,',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '<You can write your notification here>',
      },
    ],
  },
  // {
  //   type: 'image',
  //   children: [{ text: '' }],
  // },
]

const CreateNotification = ({ recordId }) => {
  console.log(recordId, "hereee RecordId")
  const navigate = useNavigate();
  const item = JSON.parse(localStorage.getItem("notificationData"));
  // console.log(notificationItem,"State here ..,")
  // const [notificationContent, setNotificationContent] = useState([])
  const [notificationItem, setNotificationItem] = useState(item || [])
  const [notificationContent, setNotificationContent] = useState(initialValue)
  const [notificationData, setNotificationData] = useState([])
  const [fieldsListData, setFieldsListdata] = useState(fieldsList)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const [LocalIntialdata, setlocalstorageData] = useState(JSON.parse(localStorage.getItem('notificationContent')))
  const [showPreview, setShowPreview] = useState(false)
  const [updatingContent, setUpdatingContent] = useState({})
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  )

  const { id } = useParams()
  const [suggestion, setSuggestion] = useState("")

  const fetchAISuggestion = async (text) => {
    console.log("triggering to accept oprn It")
    try {
      if (!text || text.trim().length < 5) {
        setSuggestion("");
        return;
      }
      const payload = {
        text,
      }
      // console.log("Trigger")
      const url = "http://localhost:3001/suggestion"
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(url, options)
      console.log(response, "response Here")
      setSuggestion(response.choices[0].message.content?.trim() || "");
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      setSuggestion("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (recordId) {
          await getNotificationData();
        }
      } catch (error) {
        console.log("Error fetching notification data:", error);
      }
    };

    fetchData();
  }, [recordId]);

  const getNotificationData = async () => {
    try {
      console.log("Triggering Hereee");

      const url = `${import.meta.env.VITE_HOSTED_API_URL}/notifications/${recordId}`;
      const options = { method: "GET" };
      const response = await fetch(url, options);
      // console.log(response, "Response Hereee")
      const data = await response.json();
      console.log(data, "data here");
      const parsedData = data.record?.email_body
        ? JSON.parse(data.record.email_body)
        : initialValue;
      console.log(parsedData, "parsed Hereee");
      setNotificationContent(parsedData);
      setNotificationData(data.record);
      setNotificationItem({
        name: { value: data.record?.name || "" },
        to: { value: data.record?.to_address || "" },
        type: { value: data.record?.type || "" },
        subject: { value: data.record?.subject || "" },
        cc: { value: data.record?.cc || "" },
      });
    } catch (error) {
      console.log("Error fetching notification data:", error);
    }
  };

  const onBack = () => {
    navigate(-1)
  }

  const editorStyles = {
    width: 'fit-content',
    height: '55vh',
    padding: ' 10px 15px',
    flexGrow: '1',
    overflowY: 'auto',
    marginLeft: '15px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
  }

  const handleChange = (newValue) => {
    setNotificationContent(newValue);
    const plainText = Editor.string(editor, []); // Extract plain text from Slate
    fetchAISuggestion(plainText);
  };
  const handleKeyDown = (event) => {
    // Accept suggestion with Tab
    if (event.key === "Tab" && suggestion) {
      event.preventDefault();
      Transforms.insertText(editor, suggestion);
      setSuggestion("");
      return;
    }

    // Dismiss suggestion with Escape
    if (event.key === "Escape") {
      setSuggestion("");
      return;
    }

    // Preserve your HOTKEY logic
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };
  console.log(notificationContent, "Here notification Content")
  return (
    <MainContainer>
      {!showPreview ?
        <BodyContainer>
          <div
            className='hidden w-[17vw] h-full md:flex flex-col p-4 bg-[#353535] text-white overflow-y-auto'
          >
            <CustomHeading>Additional Fields</CustomHeading>

            <FieldsList>
              {fieldsListData.map(item => (
                item.isAdded ? null : (
                  <AddFieldBtn key={item.fieldName} id={item.fieldName} onClick={() => { editor.insertText(`${item.value}`) }} >
                    {item.fieldName}<AddIcon ><IoMdAdd id={item.fieldName} /></AddIcon>
                  </AddFieldBtn>)
              ))}
            </FieldsList>
          </div>

         
          <div className="relative w-[83vw] min-h-[90%] ">
            <div className="absolute right-8 z-10">
              <FinishBtn type="button"
                onClick={() => setShowPreview(true)}>
                Preview
                {renderIcons('MdDoubleArrow', 25, 'inherit')}
              </FinishBtn>
            </div>
            <div className="flex flex-col items-center justify-center w-full mt-12">
              <CreateNotificationContainer>
                {notificationContent?.length !== 0 ? 
                (
                  <Slate
                    editor={editor}
                    value={notificationContent ?? initialValue}  // ✅ always provide a valid array
                    onChange={handleChange}
                  >

                    <Toolbar className="tool-bar">
                      <ToolBarContainer id="toolbar-buttons">
                        <MarkButton format="bold" icon={<MdFormatBold size={20} />} />
                        <MarkButton format="italic" icon={<MdFormatItalic size={20} />} />
                        <MarkButton format="underline" icon={<MdFormatUnderlined size={20} />} />
                        <MarkButton format="code" icon={<MdOutlineCode size={20} />} />
                        <BlockButton format="heading-one" icon={<LuHeading1 size={20} />} />
                        <BlockButton format="heading-two" icon={<LuHeading2 size={20} />} />
                        <BlockButton format="block-quote" icon={<MdFormatQuote size={20} />} />
                        <BlockButton format="numbered-list" icon={<MdFormatListNumbered size={20} />} />
                        <BlockButton format="bulleted-list" icon={<MdFormatListBulleted size={20} />} />
                        <BlockButton format="left" icon={<MdFormatAlignLeft size={20} />} />
                        <BlockButton format="center" icon={<MdFormatAlignCenter size={20} />} />
                        <BlockButton format="right" icon={<MdFormatAlignRight size={20} />} />
                        <BlockButton format="justify" icon={<MdFormatAlignJustify size={20} />} />
                        <InsertImageButton icon={<MdImage size={20} />} />
                      </ToolBarContainer>
                    </Toolbar>

                    <Editable
                      style={editorStyles}
                      renderLeaf={renderLeaf}
                      spellCheck
                      autoFocus
                      renderElement={(props) => <Element {...props} />}
                      placeholder="Enter some text..."
                      onKeyDown={handleKeyDown}
                    />
                  </Slate>
                )
                // <SlateEditor />
                 : null}
              </CreateNotificationContainer>
              {suggestion && (
                <div className="absolute bottom-4 left-6 text-gray-400 opacity-60 pointer-events-none select-none">
                  {suggestion}
                </div>
              )}

            </div>
          </div>

        </BodyContainer> :

        <PreviewNotification setShowPreview={setShowPreview} previewData={notificationContent} updatingContent={updatingContent} notificationId={id}
          notificationItem={notificationItem} recordId={recordId} />
      }
    </MainContainer>
  )

}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes < SlateElement > (editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = (props) => {
  const { attributes, children, element } = props
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'image':
      return <Image {...props} />
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon style={{ color: isMarkActive(editor, format) ? 'green' : 'grey' }}>{icon}</Icon>
    </Button>
  )
}

const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)

  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        className={css`
          position: relative;
        `}
      >
        <img
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
          `}
        />
        <Button
          active
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className={css`
            display: ${selected && focused ? 'inline' : 'none'};
            position: absolute;
            top: 0.5em;
            left: 0.5em;
            background-color: white;
          `}
        >
          <Icon>delete</Icon>
        </Button>
      </div>
    </div>
  )
}

const InsertImageButton = ({ icon }) => {
  const editor = useSlateStatic()
  return (
    <Button
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the image:')
        if (url && !isImageUrl(url)) {
          alert('URL is not an image')
          return
        }
        url && insertImage(editor, url)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}

// const initialValue = [
//   {
//     type: 'heading-two',
//     children: [
//       {
//         text: `Notification name:  ${defaultFieldsData.notificationName}`,
//       },
//     ],
//   },
//   {
//     type: 'image',
//     children: [{ text: '' }],
//   },
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text: `Receivers:  ${defaultFieldsData.to}, ${defaultFieldsData.cc}`,
//       },
//     ],
//   },
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text: 'Notification Content:  ',
//       },
//     ],
//   },
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text: 'Hi <Assigned Member>,',
//       },
//     ],
//   },
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text: '<You can write your notification here>',
//       },
//     ],
//   },
//   {
//     type: 'image',
//     children: [{ text: '' }],
//   },
// ]

export default CreateNotification