import { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import EditableFields from '../../../../shared/CreationEditor/EditableFields';
import { useNavigate } from 'react-router-dom';
import { IoImageOutline } from "react-icons/io5";
import 'react-quill/dist/quill.bubble.css';
import QuestionCard from './QuestionCard';
import { GetAnyRecordFromAnyTable } from '../../../../utils/CheckAndExecuteFlows/CRUDoperations';


export const dummyList = [
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
const CreateFeedBack2 = ({ recordId }) => {
  const [fieldsListData, setFieldsListData] = useState(dummyList);
  const [detailsObject, setDetailsObject] = useState(localStorage.getItem('feedbackData') ? JSON.parse(localStorage.getItem('feedbackData')) : null);
  const [imageFile, setImageFile] = useState(null);
  const [Questions, setQuestions] = useState([]);
  const Navigate = useNavigate();
  const [clickedValue, setClickedValue] = useState("");
  const [itemClicked, setItemClicked] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setImageFile(base64String); // update React state
        localStorage.setItem('ImageUrl', base64String); // ✅ store directly
      };
      reader.readAsDataURL(file);
    }
  };


  const handleQuestionChange = (questions) => {
    setQuestions(questions);
  };

  const saveContentToLocalStorage = () => {
    const editorContent = {
      imageFile,
      questions: Questions
    };
    localStorage.setItem('editorContent', JSON.stringify(editorContent));
    Navigate('/notifications/preview/testing', { state: { detailsObject, path: "feedback", editorContent: editorContent, isUpdate: recordId ? true : false, recordId } });
  };

  useEffect(() => {
    if (recordId) {
      // Fetch existing feedback data based on recordId
      const fetchFeedbackData = async () => {
        try {
          const response = await GetAnyRecordFromAnyTable('feedback', recordId);
          if (response && response.data) {
            console.log(response, "response Here")
            const { to_address, from_address, subject, questions, image_file, description, name, cc } = response.data[0];
            setDetailsObject({
              to: { value: to_address },
              from: { value: from_address },
              subject: { value: subject },


              description: { value: description },
              name: { value: name },
              cc: { value: cc }
            });
            setQuestions(questions || []);
            setImageFile(image_file || null);
          }
        } catch (error) {
          console.log("Error fetching feedback data:", error);
        }
      };
      fetchFeedbackData();
    }
  }, [recordId]);


  return (
    <div className='flex h-[100%] w-[100%]  p-0 m-0 overflow-hidden'>
      <div className='flex justify-between place-items-center h-[100%] w-[100%] '>
        {/* additional fields */}
        <div className="hidden w-[17vw] min-h-[90%] h-full md:flex flex-col p-4 bg-[#353535] text-white overflow-y-auto custom-scrollbar">
          <h2 className="text-center">Fields</h2>
          <ul className="flex flex-col gap-[10px] pl-0">
            {fieldsListData.map((item) =>
              item.isAdded ? null : (
                <button
                  key={item.fieldName}
                  // onClick={() => handleAddField(item.fieldName, item.value)}
                  onClick={() => {
                    console.log(item.value, "item.value");
                    setClickedValue(item.value);
                    setItemClicked(prev => !prev); // trigger change
                  }}
                  className="p-[10px] w-full h-fit bg-black outline-none border border-white text-white text-center flex justify-between items-center rounded-md"
                >
                  {item.fieldName}
                  <IoMdAdd />
                </button>
              )
            )}
          </ul>
        </div>
        {/* Main Content */}
        <div className='w-[90%]  h-full p-2  m-0  overflow-hidden'>

          <div className="h-[100%] w-full mt-4 flex items-start  flex-col overflow-y-auto custom-scrollbar gap-2 m-0 pb-2">
            {/* image Container */}
            <div className=" w-[80%] mx-auto p-0 ">
              <div
                className={`w-full h-[200px] relative rounded-[15px] bg-gray-180  shadow bg-center bg-no-repeat bg-contain  border-1 border-blue-800`}
                style={{
                  backgroundImage: imageFile ? `url(${imageFile})` : "none",
                }}
              >
                <label
                  htmlFor="templateImg"
                  className="absolute bottom-[5px] right-[5px] p-[3px] rounded-full border border-gray-300 text-black cursor-pointer bg-white hover:bg-gray-200 transition"
                >
                  <IoImageOutline size={20} />
                </label>
                <input
                  id="templateImg"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden mix-blend-difference"
                />
              </div>
            </div>
            <div className='h-[80%] w-full'>
              <QuestionCard SaveChanges={handleQuestionChange} Questions={Questions} showPreview={recordId ? true : false} valueItemClicked={itemClicked} insertValue={clickedValue}
                className='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateFeedBack2
