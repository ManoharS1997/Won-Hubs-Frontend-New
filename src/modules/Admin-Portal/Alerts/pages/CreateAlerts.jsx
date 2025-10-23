
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
import EditorRichUI from "../../../../shared/CreationEditor/WorkingEditor.jsx"


// export default function CreateAlerts({ recordId }) {
//   const [flowStep, setFlowStep] = useState(3)
//   const [recordData, setRecordData] = useState({})
//   const data = JSON.parse(localStorage.getItem('alertData'))
//   const [value, setValue] = useState([
//     {
//       type: 'paragraph',
//       children: [{ text: '' }],
//     },
//   ])
//   const editor = useMemo(() => withHistory(withEmbeds(withTables(withLinks(withReact(createEditor()))))), []);

//   const getAlertDetails = async () => {
//     try {
//       // Fetch existing record details
//       const response = await GetAnyRecordFromAnyTable('alerts', recordId);
//       console.log(response,"Alerts Response Hereeee")

//     } catch (error) {
//       console.error("Error fetching alert details:", error);
//     }
//   };
//   useEffect(() => {
//     if (recordId) {
//       setFlowStep(3);
//       getAlertDetails()
//     }
//   }, [])
//   const renderElement = useCallback(props => <Element {...props} />, [])

//   const renderLeaf = useCallback(props => {
//     return <Leaf {...props} />
//   }, [])

//   const onBack = () => {
//     history.goBack()
//   }
//   const handleChange = (newValue) => {
//     setValue(newValue);
//   };

//   // return (
//   //     <MainContainer style={{ height: '100%' }} >
//   //         {/* <ViewSelection
//   //             viewsList={Dummy_views_list}
//   //             noOfCards={4}
//   //             show={flowStep === 1}
//   //             onViewSelect={() => {
//   //                 console.log('setting 2nd stage')
//   //                 setFlowStep(2)
//   //             }}
//   //         /> */}
//   //         {/* <TemplatesList
//   //             templatesList={DUMMY_TEMPLATES_LIST}
//   //             show={flowStep === }
//   //             onClick={() => setFlowStep(1)}
//   //             onTemplateSelect={() => setFlowStep(3)}
//   //         /> */}
//   //         {/* <AlertEditor
//   //             show={flowStep === 3}
//   //             onClick={() => setFlowStep(2)}
//   //             recordData={recordData}
//   //             data={data}

//   //         /> */}
//   //     </MainContainer>
//   // )
//   return (
//     <MainContainer>
//       <BodyContainer>
//         <SidebarContainer>
//           <CustomHeading>Additional Fields</CustomHeading>

//           <FieldsList>{fieldsListData.map(item => (
//             item.isAdded ? null : (
//               <AddFieldBtn key={item.fieldName} id={item.fieldName} onClick={() => { editor.insertText(`${item.value}`) }} >
//                 {item.fieldName}<AddIcon ><IoMdAdd id={item.fieldName} /></AddIcon>
//               </AddFieldBtn>)
//           ))}</FieldsList>
//         </SidebarContainer>

//         <CustomContainer>
//           <div className="flex justify-between items-center w-full mb-4">
//             <BackBtn type='button' title="Back" onClick={onBack}><IoChevronBackSharp size={25} /> Back</BackBtn>
//             <ActionBtnsContainer>
//               <Link to='/PreviewAlert'>
//                 <ActionBtn
//                   type='button'
//                   style={{ color: '#000', border: '1px solid #000' }}
//                   onClick={() => localStorage.setItem('AlertContent', JSON.stringify(value))}
//                 >
//                   Preview
//                 </ActionBtn>
//               </Link>
//             </ActionBtnsContainer>
//           </div>



//           {/* </EditorContainer> */}
//           <EditorContainer>
//             <Slate editor={editor} value={value} onChange={handleChange}>
//               <Toolbar />
//               <TextEditorCustomContainer className="editor-wrapper">
//                 <StyledEditor
//                   placeholder="Write something..."
//                   renderElement={renderElement}
//                   renderLeaf={renderLeaf}
//                   spellCheck
//                   autoFocus
//                 />
//               </TextEditorCustomContainer>
//             </Slate>
//           </EditorContainer>


//         </CustomContainer>
//       </BodyContainer>
//     </MainContainer>
//   )
// }
const CreateAlerts=({recordId})=>{
  // console.log(JSON.parse(localStorage.getItem("notificationData"),"Create Notification Page"))
  const [alertData,setAlertData]=useState(JSON.parse(localStorage.getItem("alertData"))|| {})
  const [editorContent, setEditorContent]=useState("")
    useEffect(() => {
    const fetchData = async () => {
      try {
        if (recordId) {
          await getAlertData();
        }
      } catch (error) {
        console.log("Error fetching alert data:", error);
      }
    };

    fetchData();
  }, [recordId]);

    const getAlertData = async () => {
    try {
      console.log("Triggering Hereee");

      const url = `${import.meta.env.VITE_HOSTED_API_URL}/alerts/${recordId}`;
      const options = { method: "GET" };
      const response = await fetch(url, options);
      console.log(response, "Response Hereee")
      const data = await response.json();
      console.log(data, "data here from Alerts");
      // const parsedData = data.record?.email_body
      //   ? JSON.parse(data.record.email_body)
      //   : initialValue;
      // console.log(parsedData, "parsed Hereee");
      // setNotificationContent(parsedData);
      // setNotificationData(data.record);
      setAlertData({
        name: { value: data.record?.name || "" },
        to: { value: data.record?.to_address || "" },
        type: { value: data.record?.type || "" },
        subject: { value: data.record?.subject || "" },
        cc: { value: data.record?.cc || "" },
      });
      setEditorContent(data.record?.email_body || "");
    } catch (error) {
      console.log("Error fetching notification data:", error);
    }
  };

  return (
    <div className='h-[100%] w-[100%] '>
      <EditorRichUI path="alerts" 
      defaultFieldsData={alertData}
      content={editorContent}
       />
    </div>
  )
}
export default CreateAlerts