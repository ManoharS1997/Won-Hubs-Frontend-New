import React, { useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS for styling

const QuillEditor = () => {
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('')

  // Custom toolbar options
  const modules = {
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

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'align', 'script'
  ];

  const handleContentChange = (content, delta, source, editor) => {
    // console.log('Content updated:', content); // Log the HTML content
    // console.log('Delta:', delta); // Log the delta object
    setEditorContent(content);
  };

  const handleSave = () => {
    console.log('Saved content:', editorContent);
    alert('Content saved successfully!');
  };

  console.log(editorContent)

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
        />
      </InputFiedlContainer>
      <ReactQuill
        value={editorContent}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Write the Alert content here..."
        style={{ height: '95%' }}
      />
      <CreateBtn
        onClick={handleSave}
        disabled={editorContent === ''}
        idDisabled={
          editorContent === '' ||
          editorContent === '<p><br></p>' ||
          title === ''
        }
      >
        CREATE
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