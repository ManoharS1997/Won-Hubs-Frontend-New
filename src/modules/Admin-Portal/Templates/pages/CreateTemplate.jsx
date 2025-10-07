
import { Link } from "react-router-dom";

import { useState, useCallback, useMemo, useEffect } from "react";
import Modal from 'react-modal'
import styled from "styled-components";

// import { createEditor } from 'slate';
// import { withHistory } from "slate-history";
// import { Slate, Editable, withReact } from 'slate-react';
// import Toolbar from '../../SlateEditor/Toolbar/Toolbar.jsx'
// import { sizeMap, fontFamilyMap } from '../../SlateEditor/utils/SlateUtilityFunctions.js'
// import withLinks from '../../SlateEditor/plugins/withLinks.js'
// import withTables from '../../SlateEditor/plugins/withTable.js'
// import withEmbeds from '../../SlateEditor/plugins/withEmbeds.js'

// import '../../SlateEditor/Editor.css'
// import Image from '../../SlateEditor/Elements/Image/Image'
// import Video from '../../SlateEditor/Elements/Video/Video'

import { useNavigate } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { IoChevronBackSharp } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { LuExpand } from "react-icons/lu";

import {
  ActionBtn, ActionBtnsContainer, AddFieldBtn, AddIcon, BackBtn,
  BodyContainer, CheckboxLabel, CloseFullViewBtn, CustomContainer,
  CustomHeading, CustomInput, CustomLabel, CustomOption, CustomSelect,
  CustomTextarea, DefaultFieldlsContainer, EditorContainer, ExpandBtn,
  FieldContainer, FieldsContainer, FieldsList, MainContainer,
  SidebarContainer, TextEditorCustomContainer

} from '../components/CreateTemplate/StyledComponents'
import { GetAnyRecordFromAnyTable } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations.jsx";
// import SlateEditor from "../../../../shared/components/SlateEditor.jsx";

const Element = (props) => {

  const { attributes, children, element } = props;

  switch (element.type) {
    case 'headingOne':
      return <h1 {...attributes}>{children}</h1>
    case 'headingTwo':
      return <h2 {...attributes}>{children}</h2>
    case 'headingThree':
      return <h3 {...attributes}>{children}</h3>
    case 'blockquote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'alignLeft':
      return <div style={{ textAlign: 'left', listStylePosition: 'inside' }} {...attributes}>{children}</div>
    case 'alignCenter':
      return <div style={{ textAlign: 'center', listStylePosition: 'inside' }} {...attributes}>{children}</div>
    case 'alignRight':
      return <div style={{ textAlign: 'right', listStylePosition: 'inside' }} {...attributes}>{children}</div>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'orderedList':
      return <ol type='1' {...attributes}>{children}</ol>
    case 'unorderedList':
      return <ul {...attributes}>{children}</ul>
    case 'link':
      return <Link {...props} />

    case 'table':
      return <table className='Ttable'>
        <tbody {...attributes}>{children}</tbody>
      </table>
    case 'table-row':
      return <tr {...attributes}>{children}</tr>
    case 'table-cell':
      return <td className='Ttd' {...attributes}>{children}</td>
    case 'image':
      return <Image {...props} />
    case 'video':
      return <Video {...props} />
    default:
      return <p {...attributes}>{children}</p>
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
  if (leaf.strikethrough) {
    children = <span style={{ textDecoration: 'line-through' }}>{children}</span>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.superscript) {
    children = <sup>{children}</sup>
  }
  if (leaf.subscript) {
    children = <sub>{children}</sub>
  }
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>
  }
  if (leaf.bgColor) {
    children = <span style={{ backgroundColor: leaf.bgColor }}>{children}</span>
  }
  if (leaf.fontSize) {
    const size = sizeMap[leaf.fontSize]
    children = <span style={{ fontSize: size }}>{children}</span>
  }
  if (leaf.fontFamily) {
    const family = fontFamilyMap[leaf.fontFamily]
    children = <span style={{ fontFamily: family }}>{children}</span>
  }
  return <span {...attributes}>{children}</span>
}

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
  templateName: 'Offer Letter Template',
  shortDescription: 'This is  a IT offer letter format template',
}

const CustomSettings = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    padding: '0px',
    zIndex: '9999',
    position: 'fixed',
    transform: 'translate(0%, 0%)',
    transition: 'all 0.5s ease',
    animation: 'fadeIn 0.3s ease forwards',
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      visibility: 'hidden',
    },
    to: {
      opacity: 1,
      visibility: 'visible',
    },
  },
};

export default function CreateTemplate({ recordId }) {
  const history = useNavigate()
  const [templateContent, setTemplateContent] = useState(JSON.parse(localStorage.getItem('templateContent')))
  const editor = useMemo(() => withHistory(withEmbeds(withTables(withLinks(withReact(createEditor()))))), []);
  const [fieldsListData, setFieldsListdata] = useState(fieldsList)
  const [formatSize, setFormatSize] = useState(['2480px', '3580px'])
  const [fullView, setFullView] = useState(false)
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Hello' }],
    },
  ])

  const openFullView = () => setFullView(true)
  const closeFullView = () => setFullView(false)

  useEffect(() => {
    if (recordId) {
      const fetchTemplateContent = async () => {
        const response = await GetAnyRecordFromAnyTable('templates', recordId);
        console.log(response, "Single Template Record")
        if (response.success) {
          // console.log(response.data[0].content, "Template Content")
          // setTemplateContent(response.data[0].content);
          setValue(response.data[0].content)
        }
      };
      fetchTemplateContent();
    }
  }, [1]);

  const changeFormate = (e) => {
    setFormatSize(e.target.value)
  }

  const StyledEditor = styled(Editable)`
    width: 100%;
    height: 100%;
    padding: 10px 15px;
    flex-grow: 1;
    overflow-y: auto;
    // marginLeft: '15px',
    border-radius: 5px;
    // whiteSpace: ' ',
    // overflowWrap: 'none'
    
    &::-webkit-scrollbar {
      width: 5px;
    }
    
    &::-webkit-scrollbar-track{
      background-color: transparent;
    }
  `



  const renderElement = useCallback(props => <Element {...props} />, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const onBack = () => {
    history.goBack()
  }



  return (
    <MainContainer>
      <BodyContainer>
        <SidebarContainer>
          <CustomHeading>Additional Fields</CustomHeading>

          <FieldsList>{fieldsListData.map(item => (
            item.isAdded ? null : (
              <AddFieldBtn key={item.fieldName} id={item.fieldName} onClick={() => { editor.insertText(`${item.value}`) }} >
                {item.fieldName}<AddIcon ><IoMdAdd id={item.fieldName} /></AddIcon>
              </AddFieldBtn>)
          ))}</FieldsList>
        </SidebarContainer>

        <CustomContainer>
          <BackBtn type='button' title="Back" onClick={onBack}><IoChevronBackSharp size={25} /> Back</BackBtn>
          {/* 
          <DefaultFieldlsContainer>

            <FieldsContainer>
              <FieldContainer>
                <CustomLabel htmlFor='notification-name'> Name : </CustomLabel>
                <CustomInput type='text' id='notification-name' value={defaultFieldsData.templateName} />
              </FieldContainer>

              <FieldContainer>
                <CustomLabel htmlFor='subject'>Short Description : </CustomLabel>
                <CustomTextarea id='subject' value={defaultFieldsData.shortDescription} cols={2} rows={2} >

                </CustomTextarea>
              </FieldContainer>

            </FieldsContainer>

            <FieldsContainer>

              <FieldContainer style={{ justifyContent: 'flex-end' }}>
                <CustomLabel right={true} htmlFor='type'>Type : </CustomLabel>
                <CustomSelect id='type' value={'defaultFieldsData'.type}>
                  <CustomOption selected={'defaultFieldsData'.type === 'global'} value='global'>Global</CustomOption>
                  <CustomOption selected={'defaultFieldsData'.type === 'local'} value='local'>Local</CustomOption>
                </CustomSelect>
              </FieldContainer>

              <FieldContainer style={{ justifyContent: 'flex-end' }}>
                <CustomLabel right={true} htmlFor='type'>Style : </CustomLabel>
                <CustomSelect id='type' onChange={changeFormate}>
                  <CustomOption selected={'defaultFieldsData'.type === 'a4'} value={['2480px', '3508px']}>Landscape</CustomOption>
                  <CustomOption selected={'defaultFieldsData'.type === 'a5'} value={['1754px', '2480px']}>Portrait</CustomOption>
                  <CustomOption selected={'defaultFieldsData'.type === 'letter'} value={['1100px', '850px']}>Executive</CustomOption>
                  <CustomOption selected={'defaultFieldsData'.type === 'letter'} value={['1100px', '850px']}>Envelop</CustomOption>
                  <CustomOption selected={'defaultFieldsData'.type === 'a4'} value={['2480px', '3508px']}>A4</CustomOption>
                  <CustomOption selected={'defaultFieldsData'.type === 'a5'} value={['1754px', '2480px']}>A5</CustomOption>
                  <CustomOption selected={'defaultFieldsData'.type === 'letter'} value={['1100px', '850px']}>Letter</CustomOption>
                </CustomSelect>
              </FieldContainer>

              <FieldContainer style={{ justifyContent: 'flex-end' }}>
                <CheckboxLabel right={true} htmlFor='active'>Active : </CheckboxLabel>
                <CustomInput
                  style={{ flexGrow: '0', width: 'fit-content', marginRight: 'auto' }}
                  type='checkbox' id='active' checked={'defaultFieldsData'.active}
                />
              </FieldContainer>


            </FieldsContainer>

          </DefaultFieldlsContainer> */}

          {/* <EditorContainer>
            <Slate
              editor={editor}
              initialValue={templateContent === null ? initialValue : templateContent}
              onChange={newValue => setValue(newValue)}
            >
              <Toolbar openFullView={openFullView} />
              <TextEditorCustomContainer className="editor-wrapper">
                <StyledEditor
                  placeholder='Write something'
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  spellCheck
                  autoFocus
                />
                <ExpandBtn type='button' title="Expand in Full View"><LuExpand size={15} onClick={() => openFullView()} /> </ExpandBtn>
              </TextEditorCustomContainer>
            </Slate>

            <Modal
              isOpen={fullView}
              onRequestClose={closeFullView}
              style={CustomSettings}
            >
              <CloseFullViewBtn type='button' title="Expand in Full View"><CgClose size={15} onClick={closeFullView} /></CloseFullViewBtn>
              <div style={{ display: 'flex', height: '96%' }}>
                <SidebarContainer>
                  <CustomHeading>Additional Fields</CustomHeading>

                  <FieldsList>{fieldsListData.map(item => (
                    item.isAdded ? null : (
                      <AddFieldBtn key={item.fieldName} id={item.fieldName} onClick={() => { editor.insertText(`${item.value}`) }} >
                        {item.fieldName}<AddIcon ><IoMdAdd id={item.fieldName} /></AddIcon>
                      </AddFieldBtn>)
                  ))}</FieldsList>
                </SidebarContainer>
                <div style={{ width: '100%', height: '85vh', padding: ' 0px 15px' }}>
                  <Slate
                    editor={editor}
                    initialValue={templateContent === null ? initialValue : templateContent}
                    onChange={newValue => setValue(newValue)}
                  >
                    <Toolbar />
                    <div
                      className="editor-wrapper"
                      style={{
                        border: '1px solid #f3f3f3',
                        padding: '10px',
                        margin: '0px',
                        width: '100%',
                        height: '100%',
                        overflow: 'auto'
                      }}>
                      <StyledEditor
                        placeholder='Write something'
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        spellCheck
                        autoFocus
                      />

                    </div>
                  </Slate>
                </div>
              </div>
            </Modal>

          </EditorContainer> */}
          {/* Adding my new Editor */}
          {/* <SlateEditor value={value} onChange={newValue => setValue(newValue)} placeholder="Write something..." />
          <ActionBtnsContainer>
            <Link to='/template-preview'>
              <ActionBtn
                type='button'
                style={{ color: '#000', border: '1px solid #000' }}
                onClick={() => localStorage.setItem('templateContent', JSON.stringify(initialValue))}
              >
                Next
                <TbPlayerTrackNextFilled size={15} style={{ marginLeft: '15px' }} /></ActionBtn>
            </Link>
          </ActionBtnsContainer> */}

        </CustomContainer>
      </BodyContainer>
    </MainContainer>
  )
}