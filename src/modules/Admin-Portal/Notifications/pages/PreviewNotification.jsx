import { useNavigate } from "react-router-dom";
import { useMemo, useState, useCallback } from 'react';
import { updateTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement
} from 'slate'

import {
  useSlate, Slate, Editable, useSlateStatic, useSelected,
  useFocused, withReact, ReactEditor,
} from 'slate-react'

import isUrl from 'is-url'
import imageExtensions from 'image-extensions'
import { css } from '@emotion/css'

import { withHistory } from 'slate-history'

//ICON IMPORTS
import { IoChevronBackSharp } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import { Button, Icon, } from '../CreateNotification/components'

import {
  ActionBtn, ActionBtnsContainer, BackBtn, BodyContainer, ContentPreviewContainer,
  CustomContainer, MainContainer,
} from '../CreateNotification/PreviewNotification/StyledComponents';


const defaultFieldsData = {
  to: 'Kartheek.M@nowitservices.com',
  cc: 'Sivakumar.E@nowitservices.com, Sriram.k@nowitservices.com',
  notificationName: 'Ticket Creation Notification',
  subject: 'Created Notification Builder Ticket',
  active: true,
  type: 'global'

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

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
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

export default function PreviewNotification({ setShowPreview, previewData, notificationId, updatingContent }) {
  const history = useNavigate();
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const [LocalInitialData, setLocalStorageData] = useState(() => {
    const storedData = localStorage.getItem('notificationContent');
    return storedData ? JSON.parse(storedData) : null;
  });
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  )

  const onBack = () => {
    /* history(-1); */

  }

  const updateNotificationData = async () => {
    await updateTableData('notifications', notificationId, { ...updatingContent, content: JSON.stringify(previewData) })
    history('/All Notifications')
  }

  const editorStyles = {
    width: '100%',
    height: '100%',
    padding: ' 10px 15px',
    flexGrow: '1',
    overflowY: 'auto',
    marginLeft: '0px',
    borderRadius: '5px',
    outline: 'none',
  }

  return (
    <MainContainer>
      <BodyContainer>
        <CustomContainer>
          <BackBtn type='button' onClick={() => setShowPreview(false)}> <IoChevronBackSharp onClick={() => setShowPreview(false)} size={25} /> Edit </BackBtn>
          <ContentPreviewContainer>
            <Slate editor={editor} initialValue={previewData ? previewData : initialValue} style={{ width: '100%', height: '100%' }}>

              <Editable style={editorStyles}
                renderLeaf={renderLeaf}
                spellCheck
                autoFocus
                renderElement={props => <Element {...props} />}
                placeholder="Enter some text..."
              />
            </Slate>
          </ContentPreviewContainer>

          <ActionBtnsContainer>
            <ActionBtn type='button' onClick={() => updateNotificationData()} style={{ color: '#000', border: '1px solid #000' }}>
              <IoMdDoneAll /> Finish
            </ActionBtn>
          </ActionBtnsContainer>
        </CustomContainer>
      </BodyContainer>
    </MainContainer>
  )
}
