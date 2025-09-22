import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

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

import WonContext from '../../../../context/WonContext'
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

import {
  ActionBtn, ActionBtnsContainer, AddFieldBtn, AddIcon,
  BackBtn, BodyContainer, CreateNotificationContainer,
  CustomContainer, CustomHeading, CustomInput, CustomLabel,
  CustomOption, CustomSelect, DefaultFieldlsContainer,
  FieldContainer, FieldsContainer, FieldsList, MainContainer,
  SidebarContainer, TextAreaTag, ToolBarContainer
} from '../CreateNotification/StyledComponents';

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

const CreateNotification = () => {
  const navigate = useNavigate();
  const [notificationContent, setNotificationContent] = useState([])
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

  useEffect(() => {
    if (id && id !== 'new') {
      getNotificationData()
    }
  }, [])

  const getNotificationData = async () => {
    const url = `${import.meta.env.VITE_HOSTED_API_URL}/notification/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const parsedData = JSON.parse(data.record.content)
    setNotificationContent(parsedData)
    setNotificationData(data.record)
  }
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

  const saveContent = (e) => {
    setNotificationContent(e)
  }

  console.log(notificationData)


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

          <div
            className='w-[83vw] h-full grow flex flex-col overflow-y-auto'
          >
            <BackBtn type='button' onClick={() => onBack()}><IoChevronBackSharp size={25} /> Back </BackBtn>

            <div
              className='w-full self-center h-full flex flex-col md:flex-row p-2 gap-4'
            >
              <div
                className='w-full h-fit flex flex-col gap-4'
              >
                <div
                  className='flex w-full items-center gap-4'
                >
                  <CustomLabel htmlFor='to'>To: </CustomLabel>
                  <CustomInput type='text' id='to' value={defaultFieldsData.to} />
                </div>

                <div
                  className='flex w-full items-center gap-4'
                >
                  <CustomLabel htmlFor='cc'>CC: </CustomLabel>
                  <CustomInput type='text' id='cc' value={defaultFieldsData.cc} />
                </div>
              </div>

              <div
                className='w-full h-fit flex flex-col gap-4'
              >
                <div
                  className='flex w-full items-center gap-4'
                >
                  <CustomLabel htmlFor='notification-name'>Name: </CustomLabel>
                  <CustomInput type='text' id='notification-name' value={updatingContent.name ? updatingContent.name : notificationData.name} onChange={(e) => setUpdatingContent({ ...updatingContent, name: e.target.value })} />
                </div>

                <div
                  className='flex w-full items-center gap-4'
                >
                  <CustomLabel htmlFor='subject'>Subject: </CustomLabel>
                  <TextAreaTag id='subject' value={defaultFieldsData.subject} cols={40} rows={3} />
                </div>
              </div>

              <div
                className='w-full h-fit flex flex-col gap-4'
              >
                <div
                  className='flex w-full items-center gap-4'
                >
                  <CustomLabel htmlFor='type'>Type: </CustomLabel>

                  <CustomSelect id='type' value={defaultFieldsData.type}>
                    <CustomOption selected={defaultFieldsData.type === 'global'} value='global'>Global</CustomOption>
                    <CustomOption selected={defaultFieldsData.type === 'local'} value='local'>Local</CustomOption>
                  </CustomSelect>
                </div>
              </div>
            </div>

            <CreateNotificationContainer>
              {notificationContent.length !== 0 ?
                <Slate editor={editor} initialValue={notificationContent} onChange={saveContent}>
                  <Toolbar className='tool-bar'>
                    <ToolBarContainer id='toolbar-buttons'>
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

                  <Editable style={editorStyles}
                    renderLeaf={renderLeaf}
                    spellCheck
                    autoFocus
                    onKeyDown={event => {
                      for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event)) {
                          event.preventDefault()
                          const mark = HOTKEYS[hotkey]
                          toggleMark(editor, mark)
                        }
                      }
                    }}
                    renderElement={props => <Element {...props} />}
                    placeholder="Enter some text..."
                  />
                </Slate> :
                null
              }
            </CreateNotificationContainer>

            <ActionBtnsContainer>
              {/* <Link to='/notification-preview'> */}
              <ActionBtn type='button'
                style={{ color: '#000', border: '1px solid #000' }}
                onClick={() => setShowPreview(true)}
              >
                Next
                <TbPlayerTrackNextFilled size={15} style={{ marginLeft: '15px' }} />
              </ActionBtn>
              {/* </Link> */}
            </ActionBtnsContainer>
          </div>
        </BodyContainer> :

        <PreviewNotification setShowPreview={setShowPreview} previewData={notificationContent} updatingContent={updatingContent} notificationId={id} />
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
  {
    type: 'image',
    children: [{ text: '' }],
  },
]

export default CreateNotification