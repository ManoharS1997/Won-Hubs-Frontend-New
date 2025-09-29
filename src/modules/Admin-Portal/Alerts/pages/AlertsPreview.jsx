
import { useState, } from "react"
import { MainContainer } from "./StyledComponents"
import Cookies from 'js-cookie'
import { BodyContainer } from "../../Notifications/CreateNotification/StyledComponents"
import { IoChevronBackSharp } from "react-icons/io5";
import BackBtn from "../../../../shared/UIElements/BackBtn"
import { CustomLabel, CustomInput, CustomSelect, CustomOption } from "../../Notifications/CreateNotification/StyledComponents"
import ReactQuill from 'react-quill';
import { modules,formats } from "../../../../shared/components/QuillEditor"
import { useNavigate } from "react-router-dom";

export default function PreviewAlerts({ recordId }) {
  const [recordData, setRecordData] = useState({})
  const data = JSON.parse(localStorage.getItem('alertData'))
  // console.log(data, "data Here")
  const data1=JSON.parse(localStorage.getItem('alertContent'))
  console.log(data1,"Data1 Here")
  const [formValues, setFormValues] = useState(data)
  const [FormTitle,setFormtitle]=useState(data1?.title)
  const [editorContent,setEditorContent]=useState(data1?.editorContent)
  const navigate=useNavigate()
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
        short_description: editorContent,
        ...formValues, // keep naming consistent with backend
      };
  
      let url = "http://localhost:3001/alerts/newAlert";
      let method = "POST";
  
      // If editing, switch to update API
      // if (recordData && recordData.record) {
      //   url = `http://localhost:3001/alerts/update/${recordData?.record.id}`;
      //   method = "PUT"; // or PATCH if your backend supports partial updates
      // }
  
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

  return (
    // {/* {/* <ViewSelection
    //     viewsList={Dummy_views_list}
    //     noOfCards={4}
    //     show={flowStep === 1}
    //     onViewSelect={() => {
    //         console.log('setting 2nd stage')
    //         setFlowStep(2)
    //     }}
    // /> */}
    // {/* <TemplatesList
    //     templatesList={DUMMY_TEMPLATES_LIST}
    //     show={flowStep === }
    //     onClick={() => setFlowStep(1)}
    //     onTemplateSelect={() => setFlowStep(3)}
    // /> */}
    // {/* <AlertEditor
    //     show={flowStep === 3}
    //     onClick={() => setFlowStep(2)}
    //     recordData={recordData}
    //     data={data}

    // />  */}
    <MainContainer>
      <BodyContainer className="flex flex-col">
        <div className="w-[84%] flex items-center justify-between">
          <BackBtn type="button" 
          // onClick={() => setShowPreview(false)}
          >
            <IoChevronBackSharp size={25} /> Edit
          </BackBtn>
          <button
            onClick={handleSave}
            
            className="!bg-[#04274b] text-white rounded py-2 px-4 flex items-center justify-center w-fit m-0 self-end"
          >
            Save
          </button>
        </div>

        {/* Editable Fields */}
        <div className="w-full flex flex-col md:flex-row gap-4 p-2  h-[20%]">

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
        <div className="w-full flex flex-row items-center gap-2 py-2 m-0">
          <label className="text-base">Title</label>
          <input
            type="text"
            className="w-1/5 px-3 py-1 rounded-md border border-gray-300 outline-none
               focus:border-[var(--primary-color)] focus:shadow-[0_0_0.3rem_0.1rem_var(--primary-color)]
               max-sm:flex-grow"
               value={FormTitle}
          />
        </div>

        <ReactQuill
          value={editorContent}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="Write the Alert content here..."
          style={{ height: '50%' }}

        />


      </BodyContainer>
    </MainContainer>
  )
}