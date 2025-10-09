
import { useState, useMemo,useCallback } from "react"
import { MainContainer } from "./StyledComponents"
import Cookies from 'js-cookie'
import { BodyContainer } from "../../Notifications/CreateNotification/StyledComponents"
import { IoChevronBackSharp } from "react-icons/io5";
import BackBtn from "../../../../shared/UIElements/BackBtn"
import { CustomLabel, CustomInput, CustomSelect, CustomOption } from "../../Notifications/CreateNotification/StyledComponents"
import ReactQuill from 'react-quill';
import { modules, formats } from "../../../../shared/components/QuillEditor"
import { useNavigate } from "react-router-dom";
import renderIcons from "../../../../shared/functions/renderIcons";
import { ContentPreviewContainer } from "../../Notifications/CreateNotification/PreviewNotification/StyledComponents";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from 'slate-history'
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement
} from 'slate'

const editorStyles = {
    width: '100%',
    height: '100%',
    padding: ' 10px 15px',
    flexGrow: '1',
    overflowY: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
  }
  

export default function PreviewAlerts() {
  const [recordData, setRecordData] = useState({})
  const data = JSON.parse(localStorage.getItem('alertData'))
  const data1 = JSON.parse(localStorage.getItem('alertContent'))
   const [initialValue, setInitialValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'First line of text in Slate JS. ' }],
    },
  ])
  const [showDetails, setShowDetails] = useState(false)
  const [formValues, setFormValues] = useState(data)
  const [FormTitle, setFormtitle] = useState(data1?.title)
  const [editorContent, setEditorContent] = useState(data1?.editorContent)
  const [alertContent, setAlertContent] = useState(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('AlertContent'));
        return Array.isArray(stored) && stored.length > 0
          ? stored
          : [
            {
              type: 'paragraph',
              children: [{ text: ' ' }],
            },
          ];
      } catch {
        return [
          {
            type: 'paragraph',
            children: [{ text: ' ' }],
          },
        ];
      }
    });
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleContentChange = (content, delta, source, editor) => {
    // console.log('Content updated:', content); // Log the HTML content
    // console.log('Delta:', delta); // Log the delta object
    setEditorContent(content);
  };

  const handleSave = async () => {
    console.log("Saving alert...");
    console.log("Saved content:", editorContent);

    const payload = {
      title: FormTitle,
      short_description: alertContent,
      ...formValues, // keep naming consistent with backend
    };

    let url = "http://localhost:3001/alerts/newAlert";
    let method = "POST";



    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(url, options);
      console.log(response, "response Hereee")
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      alert(
        recordData && recordData.record
          ? "Content updated successfully!"
          : "Alert created successfully!"
      );
      navigate("/All Alerts");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Something went wrong while saving!");
    }
  };
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

  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );
  

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
 const renderElement = useCallback(props => <Element {...props} />, [])
  
const renderLeaf = useCallback(props => {
      return <Leaf {...props} />
    }, [])




  return (

    <MainContainer>
      <BodyContainer className="flex flex-col">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-2">
            {/* <BackBtn type="button"> */}
            <button className="bg-transparent flex items-center">
              <div className="flex gap-3">
                <IoChevronBackSharp size={25} />
                <p className='!mt-4'>Edit</p>
              </div>
            </button>
            {/* </BackBtn> */}
            <button onClick={() => setShowDetails(!showDetails)} className="m-0 p-0">
              {showDetails ? renderIcons('BsFillCaretDownFill', 20, 'black') : renderIcons('BsFillCaretUpFill', 20, 'black')}
            </button>
          </div>
          <button
            onClick={handleSave}
            className="!bg-[#04274b] text-white rounded py-2 px-4 flex items-center justify-center w-fit m-0"
          >
            Save
          </button>
        </div>

        {/* Editable Fields */}
        {showDetails && <div className="w-full flex flex-col md:flex-row gap-4 p-2  h-[20%]">

          {/* Left Section */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <CustomLabel htmlFor="to">To:</CustomLabel>
              <CustomInput id="to" value={formValues?.to?.value} onChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-4">
              <CustomLabel htmlFor="cc">CC:</CustomLabel>
              <CustomInput id="cc" value={formValues?.cc?.value} onChange={handleInputChange} />
            </div>
          </div>

          {/* Middle Section */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <CustomLabel htmlFor="name">From:</CustomLabel>
              <CustomInput id="name" value={formValues?.from?.value} onChange={handleInputChange} />
            </div>


            <div className="flex items-center gap-4">
              <CustomLabel htmlFor="name">Title:</CustomLabel>
              <CustomInput id="name" value={formValues?.title?.value} onChange={handleInputChange} />
            </div>

          </div>

          {/* Right Section */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <CustomLabel htmlFor="type">Type:</CustomLabel>
              <CustomSelect
                id="type"
                value={formValues?.type?.value}

                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, type: e.target.value }))
                }
              >
                <CustomOption value="global">Global</CustomOption>
                <CustomOption value="local">Local</CustomOption>
              </CustomSelect>
            </div>
            <div className="flex items-center gap-4">
              <CustomLabel htmlFor="name">Description:</CustomLabel>
              <CustomInput id="name" value={formValues?.description?.value} onChange={handleInputChange} />
            </div>
          </div>
        </div>
        }


        {/* <ReactQuill
          value={editorContent}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="Write the Alert content here..."
          style={{ height: '50%' }}
        /> */}
        <div className="w-[90%] h-full flex items-start justify-start">
          <ContentPreviewContainer className="h-full w-full">
            <Slate
              editor={editor}
              value={alertContent}
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
  )
}