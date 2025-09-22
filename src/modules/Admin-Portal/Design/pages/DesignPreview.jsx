import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSelect } from "../components/StyledComponents";
import {
  ActionBtnContainer,
  CustomBtn,
  CustomTable,
  CustomTableContainer,
  CustomTd,
  CustomTbody,
  CustomTh,
  CustomThead,
  CustomTr,
  FieldForm,
  FieldInputContainer,
  FormFieldinput,
  FormFieldsContainer,
  FormLable,
  PreviewForm,
  SaveBtn,
  TabContentContainer,
} from '../components/StyledComponents';
import renderIcons from "../../../../shared/functions/renderIcons";
import WonContext from "../../../../context/WonContext";
import Cookies from 'js-cookie'

// Utility: Capitalize first letter of each word
function capitalizeFirstLetterOfEachWord(str) {
  return str.replace(/\w\S*/g, txt =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export default function PreviewDesign({
  hidePreview, data, designType, formTitle, updateFormTitle,
  getDropdownOptions, selectedDepartments, updateDepartments, updateCategory, updateSubcategory, views,
  selectedViews, onClickView, columnOptions, noOfColumns, changeNoOfColumns, alignmentOptions,
  buttonsAlignment, updateButtonsAllignment
}) {
  // Set initial active tab
  const [activeTab, setActiveTab] = useState(data.tabs.length > 0 ? data.tabs[0].id : null);
  const [openConfigure, setOpenConfigure] = useState(false);
  const { selectedDesign } = useContext(WonContext)
  const navigate = useNavigate();

  // Handle tab change
  const handleTabChange = (e) => setActiveTab(e.target.id);

  // Save design to backend

  const onSaveDesign = async (payload) => {
    const urls = {
      catalog: '/designs/newCatalog',
      AdminPortalForms: '/designs/newAdminPortalForm',
      default: '/designs/newDesign'
    };
    const currentUrl = import.meta.env.VITE_HOSTED_API_URL + (urls[designType] || urls.default);
    // console.log('current url: ', currentUrl)
    try {
      const response = await fetch(currentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Design added successfully!');
        navigate('/All Designs');
      } else {
        console.error('Error adding design:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Get data for the active tab (not used in current render)
  // const getActiveTabData = () => data.tabs.filter(tab => tab.id === activeTab);

  return (
    <div className="flex flex-col gap-2">
      {/* Header: Back and Continue buttons */}
      <div className="flex items-center justify-between px-4 py-2">
        <button
          type='button'
          onClick={hidePreview}
          className="!m-1 w-fit h-fit !text-[20px] border-none flex items-center gap-2 "
        >
          {renderIcons('IoChevronBackOutline', 25)}
          Edit
        </button>
        <button
          onClick={() => setOpenConfigure(true)}
          className="!bg-[#495057] text-white rounded py-2 px-4 flex items-center justify-center w-fit m-0 "
        >
          Continue
        </button>
      </div>

      {/* Main Preview Card */}
      <div className="w-[80%] h-fit flex flex-col self-center shadow-[0px_4px_16px_0px] p-0 rounded-lg ">
        {/* Tabs */}
        <ul className="w-full h-fit min-h-[35px] flex gap-2 list-none p-2 pb-0 bg-[var(--primary-color)] rounded-t-lg m-0">
          {data.tabs.map(tab => (
            <li
              className={`py-1 px-2 rounded-t cursor-pointer text-semibold
                ${activeTab === tab.id ? 'bg-white text-[var(--primary-color)]' : 'bg-transparent text-white'}`}
              key={tab.id}
              id={tab.id}
              onClick={handleTabChange}
            >
              {tab.Task}
            </li>
          ))}
        </ul>

        {/* Form Preview */}
        <form className="w-full h-fit self-center p-2 px-4">
          <h1 className="!text-[35px] flex justify-between !px-4">
            {capitalizeFirstLetterOfEachWord(data.title)}
            {/* Render buttons above fields if alignment is 'top' */}
            {data.buttons_alignment === 'top' && (
              <ActionBtnContainer>
                {data.buttons.map(button => (
                  <CustomBtn type='button' key={button.id}>{button.Task}</CustomBtn>
                ))}
              </ActionBtnContainer>
            )}
          </h1>

          {/* Fields */}
          <FieldForm split>
            <FormFieldsContainer double={data.field_columns === '2'}>
              {data.fields.map(field => (
                <FieldInputContainer key={field.id}>
                  <FormLable htmlFor={field.Task}>{field.details.name} : </FormLable>
                  {field.details.type !== 'select' ? (
                    <FormFieldinput
                      style={{ flexGrow: field.details.type === 'checkbox' ? '0' : '1' }}
                      type={field.details.type}
                      id={field.Task}
                      placeholder={field.details.placeholder}
                    />
                  ) : (
                    <select style={{ flexGrow: '1' }}>
                      {field.details.options
                        ? field.details.options.map(option => (
                          <option key={option}>{option}</option>
                        ))
                        : <option>None</option>
                      }
                    </select>
                  )}
                </FieldInputContainer>
              ))}
            </FormFieldsContainer>
          </FieldForm>

          {/* Render buttons below fields if alignment is 'bottom' */}
          {data.buttons_alignment === "bottom" && (
            <ActionBtnContainer style={{ alignSelf: 'flex-end', margin: '10px 0px' }}>
              {data.buttons.map(button => (
                <CustomBtn type='button' key={button.id}>{button.Task}</CustomBtn>
              ))}
            </ActionBtnContainer>
          )}

          {/* Table preview code is commented out for now */}
        </form>
      </div>

      {/* Configure Modal */}
      {openConfigure && (
        <div className="fixed w-screen min-h-screen bg-black/50 top-0 left-0 flex items-center justify-center">
          <div className="flex flex-col justify-between items-center w-fit bg-white py-4 px-8 rounded-lg gap-4">
            {/* Close button */}
            <button
              type='button'
              onClick={() => setOpenConfigure(false)}
              className="self-end border !rounded-full hover:!bg-red-500 hover:text-white transition-all duration-500"
            >
              {renderIcons('IoIosClose', 20, 'inherit')}
            </button>

            {/* Department Select */}
            <div className="w-[280px] mx-1 border rounded">
              <ReactSelect
                options={getDropdownOptions('department')}
                value={selectedDesign ? selectedDesign?.department : selectedDepartments.department}
                onChange={updateDepartments}
                placeholder="Select Department"
              />
            </div>

            {/* Category Select */}
            <div className="w-[280px] mx-1 border rounded">
              <ReactSelect
                options={getDropdownOptions('category')}
                value={selectedDesign ? selectedDesign?.category : selectedDepartments.category}
                onChange={updateCategory}
                placeholder="Select Category"
                isDisabled={!selectedDepartments.department}
              />
            </div>

            {/* Sub-Category Select */}
            <div className="w-[280px] mx-1 border rounded">
              <ReactSelect
                options={getDropdownOptions('sub_category')}
                value={selectedDesign ? selectedDesign?.sub_category : selectedDepartments.sub_category}
                onChange={updateSubcategory}
                placeholder="Select Sub-Category"
                isDisabled={!selectedDepartments.category}
              />
            </div>

            {/* Views Multi-Select */}
            <div className="w-[280px] mx-1 border rounded">
              <ReactSelect
                options={views.map(view => ({ label: view, value: view }))}
                values={selectedDesign ? selectedDesign?.views : views.filter(view => selectedViews.includes(view)).map(view => ({ label: view, value: view }))}
                onChange={onClickView}
                multi
                placeholder="Select Views"
              />
            </div>

            {/* Save Design Button (calls onSaveDesign with current data) */}
            <button
              type="button"
              className="border w-full px-4 py-2 rounded !bg-[var(--primary-color)]/20 hover:!bg-[var(--primary-color)] hover:text-[var(--background-color)] transition-all duration-500 "
              onClick={() => onSaveDesign(data)}
            >
              Save Design
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
