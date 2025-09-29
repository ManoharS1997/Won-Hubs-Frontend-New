import { useNavigate } from "react-router-dom";
import { useMemo, useState, useCallback } from 'react';
import { updateTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement
} from 'slate'
import renderIcons from "../../../../shared/functions/renderIcons";
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
import { Button, Icon, } from '../CreateNotification/components'

import {
  ActionBtn, ActionBtnsContainer, BackBtn, BodyContainer, ContentPreviewContainer,
  CustomContainer, MainContainer,
} from '../CreateNotification/PreviewNotification/StyledComponents';
import { CustomLabel, CustomInput, TextAreaTag } from "../CreateNotification/StyledComponents";
import { CustomSelect, CustomOption } from "../CreateNotification/StyledComponents";
import { FinishBtn } from "./StyledNotificationTemlates";
import Cookies from 'js-cookie'

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

export default function PreviewNotification({
  setShowPreview,
  previewData,
  notificationId,
  updatingContent,
  notificationItem,
  recordId
}) {
  console.log(notificationItem, "ID here");

  const navigate = useNavigate();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  // ✅ Use state for editable fields
  const [notificationDetails, setNotificationDetails] = useState(() => ({
    to: notificationItem?.to?.value || "",
    cc: notificationItem?.cc?.value || "",
    name: notificationItem?.name?.value || "",
    subject: notificationItem?.subject?.value || "",
    type: notificationItem?.type?.value || "global",
  }));

  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNotificationDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const CreateNotification = async () => {
  const payload = {
    emailBody: previewData,
    toAddress: notificationDetails.to,
    cc: notificationDetails.cc,
    subject: notificationDetails.subject,
    type: notificationDetails.type,
    name: notificationDetails.name,
  };

  console.log(payload, "payload");

  const isUpdate = !!recordId; // ✅ Use notificationId to check if this is update
  const url = isUpdate
    ? `http://localhost:3001/notifications/update/${recordId}`
    : `http://localhost:3001/notifications/newNotifications`;

  const options = {
    method: isUpdate ? "PUT" : "POST", // ✅ Switch method dynamically
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to ${isUpdate ? "update" : "create"} notification`);
    }
    console.log(await response.json(), "response Here");

    localStorage.removeItem("notificationData");
    navigate("/All Notifications");
  } catch (error) {
    console.error("Error creating/updating notification:", error);
  }
};


  const editorStyles = {
    width: "100%",
    height: "100%",
    padding: " 10px 15px",
    flexGrow: "1",
    overflowY: "auto",
    marginLeft: "0px",
    borderRadius: "5px",
    outline: "none",
  };



  return (
    <MainContainer>
      <BodyContainer className="flex flex-col">
        <div className="w-[84%] flex items-center justify-between">
          <BackBtn type="button" onClick={() => setShowPreview(false)}>
            <IoChevronBackSharp size={25} /> Edit
          </BackBtn>
          <button
            onClick={CreateNotification}
            className="!bg-[#04274b] text-white rounded py-2 px-4 flex items-center justify-center w-fit m-0"
          >
            Save
          </button>
        </div>

        {/* Editable Fields */}
        <div className="w-full self-center h-[20%] flex flex-col md:flex-row p-2 gap-4">
          {/* Left Section */}
          <div className="w-full h-fit flex flex-col gap-4">
            <div className="flex w-full items-center gap-4">
              <CustomLabel htmlFor="to">To: </CustomLabel>
              <CustomInput
                type="text"
                id="to"
                value={notificationDetails.to}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex w-full items-center gap-4">
              <CustomLabel htmlFor="cc">CC: </CustomLabel>
              <CustomInput
                type="text"
                id="cc"
                value={notificationDetails.cc}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Middle Section */}
          <div className="w-full h-fit flex flex-col gap-4">
            <div className="flex w-full items-center gap-4">
              <CustomLabel htmlFor="name">Name: </CustomLabel>
              <CustomInput
                type="text"
                id="name"
                value={notificationDetails.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex w-full items-center gap-4">
              <CustomLabel htmlFor="subject">Subject: </CustomLabel>
              <TextAreaTag
                id="subject"
                value={notificationDetails.subject}
                onChange={handleInputChange}
                cols={40}
                rows={3}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full h-fit flex flex-col gap-4">
            <div className="flex w-full items-center gap-4">
              <CustomLabel htmlFor="type">Type: </CustomLabel>
              <CustomSelect
                id="type"
                value={notificationDetails.type}
                onChange={(e) =>
                  setNotificationDetails((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
              >
                <CustomOption value="global">Global</CustomOption>
                <CustomOption value="local">Local</CustomOption>
              </CustomSelect>
            </div>
          </div>
        </div>

        {/* Slate Editor Preview */}
        <div className="w-[90%] h-full flex items-start justify-start">
          <ContentPreviewContainer className="h-full w-full">
            <Slate
              editor={editor}
              initialValue={previewData ?? initialValue}
              style={{ width: "100%", height: "100%" }}
            >
              <Editable
                style={editorStyles}
                renderLeaf={renderLeaf}
                spellCheck
                autoFocus
                renderElement={renderElement}
                placeholder="Enter some text..."
              />
            </Slate>
          </ContentPreviewContainer>
        </div>
      </BodyContainer>
    </MainContainer>
  );
}