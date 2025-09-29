import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Header options
    [{ font: [] }], // Font options
    [{ size: ['small', false, 'large', 'huge'] }], // Font size options
    ['bold', 'italic', 'underline', 'strike'], // Formatting options
    [{ color: [] }, { background: [] }], // Text color and background
    [{ script: 'sub' }, { script: 'super' }], // Subscript / superscript
    [{ list: 'ordered' }, { list: 'bullet' }], // Lists
    [{ indent: '-1' }, { indent: '+1' }], // Indent
    [{ align: [] }], // Text alignment
    ['link', 'image', 'video'], // Links, images, and videos
    ['clean'], // Remove formatting
  ],
};
 export const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'align', 'script'
  ];

const QuillEditor = ({ recordData }) => {
  console.log(recordData, "rec her")
  // console.log(data,"From Template View")
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  // Custom toolbar options

 

  const handleContentChange = (content, delta, source, editor) => {
    // console.log('Content updated:', content); // Log the HTML content
    // console.log('Delta:', delta); // Log the delta object
    setEditorContent(content);
  };

  const handleSave = async () => {
    console.log("Saving alert...");
    console.log("Saved content:", editorContent);

    const payload = {
      title: title,
      short_description: editorContent, // keep naming consistent with backend
    };

    let url = "http://localhost:3001/alerts/newAlert";
    let method = "POST";

    // If editing, switch to update API
    if (recordData && recordData.record) {
      url = `http://localhost:3001/alerts/update/${recordData?.record.id}`;
      method = "PUT"; // or PATCH if your backend supports partial updates
    }

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
          : "Content created successfully!"
      );
      navigate("/All Alerts");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Something went wrong while saving!");
    }
  };
  const onSubmit = () => {
    localStorage.setItem('alertContent', JSON.stringify({
      title: title,
      editorContent: editorContent,
    }))
    navigate('/PreviewAlert', { replace: true })
  }


  useEffect(() => {
    if (recordData && recordData.record) {
      console.log(recordData.record, "rec her")
      setTitle(recordData.record.title || '')
      setEditorContent(recordData.record.short_description || '')
    }
  }, [recordData])


  console.log(editorContent, "editor Content Hereee..,")

  return (
    <EditorContainer>
      {/* <h2>Advanced Quill Editor</h2> */}
      <InputFiedlContainer>
        <label>Title</label>
        <input
          type='text'
          placeholder='Enetr Title'
          onChange={(e) => setTitle(e.target.value)}
          style={{ textTransform: 'capitalize' }}
          value={title}
        />
      </InputFiedlContainer>
      <ReactQuill
        value={editorContent}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Write the Alert content here..."
        style={{ height: '50%' }}

      />
      <CreateBtn
        type="button"
        onClick={onSubmit}
        disabled={editorContent === ''}
        idDisabled={
          editorContent === '' ||
          editorContent === '<p><br></p>' ||
          title === ''
        }
        className="!mt-2"
      >
        {recordData && recordData?.record ? "UPDATE" : "CREATE"}
      </CreateBtn>

    </EditorContainer>
  );
};

export default QuillEditor;



const EditorContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 2rem ;

    @media (max-width: 576px) {
      padding: 0;
    }
`

const InputFiedlContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0.5rem 0;
    
    label{
        font-size: 1rem;
    }
    input{
        padding: 0.3rem 0.7rem;
        border-radius: 0.3rem;
        outline: none;
        border: 1px solid #ccc;
        width: 20%;
        
        &:focus{
            border-color: var(--primary-color);
            box-shadow: 0 0 0.3rem 0.1rem  var(--primary-color)
          };
        }

        @media (max-width: 576px) {
          input{
            flex-grow: 1;
          }
        }
    
`

const CreateBtn = styled.button`
    padding: 0.35rem 0.7rem;
    width: fit-content;
    align-self: flex-end;
    background-color:  var(--secondary-color);
    border-radius: 0.5rem;
    /* margin-top: 3%; */
    background-color:  var(--primary-color);
    color:  var(--secondary-color);
    border: none;
    margin-top: 10px;
   
    &:hover {
        background-color: ${({ idDisabled }) => !idDisabled ? ' var(--secondary-color)' : '#ccc'};
        color: ${({ idDisabled }) => !idDisabled ? ' var(--primary-color)' : ' var(--secondary-color)'};
        box-shadow: inset 0 0 0.2rem 0.1rem ${({ idDisabled }) => !idDisabled ? ' var(--primary-color)' : 'inherit'},
            0 0 0.2rem 0.1rem ${({ idDisabled }) => !idDisabled ? ' var(--secondary-color)' : 'inherit'},
            0 0 0.5rem 0.1rem ${({ idDisabled }) => !idDisabled ? 'var(--primary-color)' : 'inherit'};
    }
    
    ${({ idDisabled }) => idDisabled &&
  {
    background: '#ccc',
    color: '#fff',
    cursor: 'no-drop',
  }
  }
`