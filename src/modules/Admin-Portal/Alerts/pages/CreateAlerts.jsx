
import { useState, useEffect,useCallback } from "react"
import ViewSelection from "../../../../shared/components/ViewSelection"
import { Dummy_views_list } from "../../../../DataFile/DefaultDataFile"
import { MainContainer } from "./StyledComponents"
import TemplatesList from "../../../../shared/components/TemplatesList"
import AlertEditor from "../components/AlertEditor"
import { useMemo } from 'react';
import Cookies from 'js-cookie'
import { IoChevronBackSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import {
  BodyContainer,
  ActionBtn, ActionBtnsContainer, AddFieldBtn, AddIcon, BackBtn,
  CheckboxLabel, CloseFullViewBtn, CustomContainer,
  CustomHeading, CustomInput, CustomLabel, CustomOption, CustomSelect,
  CustomTextarea, DefaultFieldlsContainer, EditorContainer, ExpandBtn,
  FieldContainer, FieldsContainer, FieldsList,
  SidebarContainer, TextEditorCustomContainer
} from '../../Templates/components/CreateTemplate/StyledComponents'
import { withHistory } from "slate-history";
import Toolbar from '../../SlateEditor/Toolbar/Toolbar.jsx'
import { sizeMap, fontFamilyMap } from '../../SlateEditor/utils/SlateUtilityFunctions.js'
import withLinks from '../../SlateEditor/plugins/withLinks.js'
import withTables from '../../SlateEditor/plugins/withTable.js'
import withEmbeds from '../../SlateEditor/plugins/withEmbeds.js'

import '../../SlateEditor/Editor.css'
import Image from '../../SlateEditor/Elements/Image/Image'
import Video from '../../SlateEditor/Elements/Video/Video'
import styled from "styled-components"
import { GetAnyRecordFromAnyTable } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations.jsx"

const DUMMY_TEMPLATES_LIST = [
  {
    id: '2156',
    imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
  },
  {
    id: '4548',
    imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
  },
  {
    id: '58484',
    imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
  },
  {
    id: '887878',
    imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
  },
  {
    id: '9895',
    imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
  },
  {
    id: '54541',
    imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
  },
  {
    id: '6889',
    imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
  },
]
const fieldsListData = [
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

export default function CreateAlerts({ recordId }) {
  const [flowStep, setFlowStep] = useState(3)
  const [recordData, setRecordData] = useState({})
  const data = JSON.parse(localStorage.getItem('alertData'))
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])
  const editor = useMemo(() => withHistory(withEmbeds(withTables(withLinks(withReact(createEditor()))))), []);

  const getAlertDetails = async () => {
    try {
      // Fetch existing record details
      const response = await GetAnyRecordFromAnyTable('alerts', recordId);
      console.log(response,"Alerts Response Hereeee")

    } catch (error) {
      console.error("Error fetching alert details:", error);
    }
  };
  useEffect(() => {
    if (recordId) {
      setFlowStep(3);
      getAlertDetails()
    }
  }, [])
  const renderElement = useCallback(props => <Element {...props} />, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const onBack = () => {
    history.goBack()
  }
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // return (
  //     <MainContainer style={{ height: '100%' }} >
  //         {/* <ViewSelection
  //             viewsList={Dummy_views_list}
  //             noOfCards={4}
  //             show={flowStep === 1}
  //             onViewSelect={() => {
  //                 console.log('setting 2nd stage')
  //                 setFlowStep(2)
  //             }}
  //         /> */}
  //         {/* <TemplatesList
  //             templatesList={DUMMY_TEMPLATES_LIST}
  //             show={flowStep === }
  //             onClick={() => setFlowStep(1)}
  //             onTemplateSelect={() => setFlowStep(3)}
  //         /> */}
  //         {/* <AlertEditor
  //             show={flowStep === 3}
  //             onClick={() => setFlowStep(2)}
  //             recordData={recordData}
  //             data={data}

  //         /> */}
  //     </MainContainer>
  // )
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
          <div className="flex justify-between items-center w-full mb-4">
            <BackBtn type='button' title="Back" onClick={onBack}><IoChevronBackSharp size={25} /> Back</BackBtn>
            <ActionBtnsContainer>
              <Link to='/PreviewAlert'>
                <ActionBtn
                  type='button'
                  style={{ color: '#000', border: '1px solid #000' }}
                  onClick={() => localStorage.setItem('AlertContent', JSON.stringify(value))}
                >
                  Preview
                </ActionBtn>
              </Link>
            </ActionBtnsContainer>
          </div>



          {/* </EditorContainer> */}
          <EditorContainer>
            <Slate editor={editor} value={value} onChange={handleChange}>
              <Toolbar />
              <TextEditorCustomContainer className="editor-wrapper">
                <StyledEditor
                  placeholder="Write something..."
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  spellCheck
                  autoFocus
                />
              </TextEditorCustomContainer>
            </Slate>
          </EditorContainer>


        </CustomContainer>
      </BodyContainer>
    </MainContainer>
  )
}