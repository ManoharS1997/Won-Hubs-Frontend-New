import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoImageOutline } from "react-icons/io5";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss';
import renderIcons from '../../../../shared/functions/renderIcons.jsx';

//ICON IMPORTS
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { TbSection } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import { FinishBtn } from '../../Notifications/pages/StyledNotificationTemlates.jsx';

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

import {
  AddBtn, AddItem, BackBtn, Btn, BtnAdd, Btnsection, ContentArea, CustomContainer,
  CustomInput, CustomLabel, CustomSelect, CustomTextArea, CustomTextField, CustomTitle,
  DeleteBtn, Description, FeedBackNameContainer, FeedBackSideBar, FieldContainer, FieldsList,
  HeaderContainer, MainContainer, MainContainer2, QuestionDiv, RadioBtnContainer, RadioBtnSet,
  ResponseContainer, ResponseDiv, SectionTag, TabsContainer, TemplateImgContainer, Title,
  TitleContainer, ToggleSwitch
} from './StyledCreateFeedback.jsx';
import { GetAnyRecordFromAnyTable } from '../../../../utils/CheckAndExecuteFlows/CRUDoperations.jsx';

const initialState = {
  image: '',
  // formTitle: '',
  active: true,
  dateOfSubmission: '',
  responses: [],
  sections: [
    {
      id: 1,
      sectionTitle: '',
      sectionDescription: '',
      content: [
        { id: uuidv4(), question: '', type: { datatype: 'Short Text', data: [] }, required: false },
      ]
    },

  ],

};

const CreateFeedback = ({ recordId }) => {
  const navigate = useNavigate()
  const [fieldsListData, setFieldsListdata] = useState(fieldsList)
  const [lastSelectedInput, setLastSelectedInput] = useState('')
  const [cursorPosition, setCursorPosition] = useState({
    positionVal: '',
    text: ''
  });
  const inputRefs = useRef({});
  const [image, setImage] = useState('');
  const [activeTab, setActiveTab] = useState('Questions')
  const [formValues, setFormValues] = useState(() => {
    // Get the value from localStorage
    const storedFeedbackContent = localStorage.getItem('feedbackData');
    console.log(storedFeedbackContent, "Stored Hereee..,")
  
    if (!storedFeedbackContent) {
      return initialState;
    } else {
      return JSON.parse(storedFeedbackContent);
    }
  });
  console.log(formValues, "formValues Here")

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  const formats = [
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link'
  ];

  const onChangeImg = (e) => {
    const selectedImg = e.target.files[0];
    const imgUrl = URL.createObjectURL(selectedImg);
    setImage(imgUrl);
    setFormValues((prevState) => ({
      ...prevState,
      image: imgUrl
    }))
  };

  const OnTitleText = useMemo(() => {
    return (sectionID, newValue) => {
      console.log(newValue, "In the UseMemo Sections")
      setFormValues((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === sectionID ? { ...section, sectionTitle: newValue } : section
        ),
      }));
    };
  }, []);

  const onChangeDescriptionText = useMemo(() => {
    return (sectionID, newValue) => {
      setFormValues((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === sectionID ? { ...section, sectionDescription: newValue } : section
        ),
      }));

    };
  }, []);

  const onChangeQuestion = (sectionID, ContentID, e) => {
    const newText = e.target.value
    setCursorPosition({ positionVal: e.target.selectionStart, text: newText })

    setFormValues((prevState) => ({
      ...prevState,
      sections: prevState.sections.map((section) =>
        sectionID === section.id ? { ...section, content: section.content.map((item) => item.id === ContentID ? { ...item, question: newText } : item) } : section
      )

    }))
  }

  const insertText = (newText) => {
    const position = cursorPosition.positionVal
    const sectionId = lastSelectedInput.sectionID
    const contentId = lastSelectedInput.contentID
    let oldText = ''
    const section = formValues.sections.find(section => section.id === sectionId);

    if (section) {
      // Find the content with the given contentId within the found section
      const content = section.content.find(item => item.id === contentId);

      if (content) {
        oldText = content.question;
      } else {
        console.error('Content with the given contentId not found');
      }
    } else {
      console.error('Section with the given sectionId not found');
    }

    const newString = oldText.substring(0, position) + `<${newText}>` + ' ' + oldText.substring(position)


    setFormValues((prevState) => ({
      ...prevState,
      sections: prevState.sections.map((section) =>
        sectionId === section.id ? { ...section, content: section.content.map((item) => item.id === contentId ? { ...item, question: newString } : item) } : section
      )
    }))

    setCursorPosition(prev => ({
      ...prev,
      positionVal: newString.length
    }))

  };

  const handleAddItem = (sectionID) => {
    const newItem = { id: uuidv4(), question: '', type: { datatype: 'Short Text', data: [] }, response: '', required: false }
    setFormValues(prevValues => ({
      ...prevValues,
      sections: prevValues.sections.map(section => {
        if (section.id === sectionID) {
          return {
            ...section,
            content: [...section.content, newItem]
          }
        }
        return section
      })

    }))
  }

  const onChangeType = (sectionID, contentID, e) => {
    setFormValues(prevValues => ({
      ...prevValues,
      sections: prevValues.sections.map(section => {
        if (section.id === sectionID) {
          return {
            ...section,
            content: section.content.map(content => {
              if (content.id === contentID) {
                return {
                  ...content,
                  type: {
                    ...content.type,
                    datatype: e.target.value,
                    data: (e.target.value === 'Multiple Choice' || e.target.value === 'CheckBox' || e.target.value === 'Dropdown')
                      ? [{ itemID: 1, itemLabel: '', isItemChecked: false }]
                      : []
                  }
                };
              }
              return content;
            })
          };
        }
        return section;
      })
    }));
  };

  const onDelete = (sectionID, contentID) => {
    setFormValues(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id === sectionID) {
          const filteredContent = section.content.filter(content => content.id !== contentID);
          return {
            ...section,
            content: filteredContent.length > 0 ? filteredContent : section.content
          };
        }
        return section;
      })
    }));
  };

  const onDeleteSection = (sectionID) => {
    setFormValues(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionID)
    }))
  }

  const OnChangeInResponse = (dataType, sectionID, contentID, e, dataItemID) => {
    setFormValues(prevValues => ({
      ...prevValues,
      sections: prevValues.sections.map(section => {
        if (section.id === sectionID) {
          return {
            ...section,
            content: section.content.map(content => {
              if (content.id === contentID) {

                switch (dataType) {
                  case 'Short Text':
                  case 'Paragraph':
                    return { ...content, response: e.target.value };

                  case 'Multiple Choice':
                    return {
                      ...content,
                      type: {
                        ...content.type,
                        data: content.type.data.map(i =>
                          i.itemID === dataItemID ? { ...i, isItemChecked: e.target.checked } : { ...i, isItemChecked: false }
                        )
                      }
                    };

                  case 'CheckBox':
                    return {
                      ...content,
                      type: {
                        ...content.type,
                        data: content.type.data.map(i =>
                          i.itemID === dataItemID ? { ...i, isItemChecked: e.target.checked } : i
                        )
                      }
                    };

                  default:
                    return content;
                }
              }
              return content

            })
          }
        }
        return section;
      })
    }));
  };

  const OnChangeLabel = (dataType, sectionID, contentID, dataItemID, e) => {
    setFormValues(prevValues => ({
      ...prevValues,
      sections: prevValues.sections.map(section => {
        if (section.id === sectionID) {
          return {
            ...section,
            content: section.content.map(content => {
              if (content.id === contentID) {

                switch (dataType) {
                  case 'Multiple Choice':
                  case 'CheckBox':
                  case 'Dropdown':
                    return {
                      ...content,
                      type: {
                        ...content.type,
                        data: content.type.data.map(i =>
                          i.itemID === dataItemID ? { ...i, itemLabel: e.target.value } : i
                        )
                      }
                    };
                  default:
                    return content;
                }
              }
              return content
            })
          }

        }
        return section;
      })
    }));
  };

  const OnAddExtraCheckbox = (sectionID, contentID) => {
    setFormValues(prevValues => ({
      ...prevValues,
      sections: prevValues.sections.map(section => {
        if (section.id === sectionID) {
          return {
            ...section,
            content: section.content.map(content => {
              if (content.id === contentID) {
                return {
                  ...content,
                  type: {
                    ...content.type,
                    data: [
                      ...content.type.data,
                      {
                        itemID: content.type.data.length + 1,
                        itemLabel: '',
                        isItemChecked: false
                      }
                    ]
                  }
                };
              }
              return content;
            })
          };
        }
        return section;
      })
    }));
  };

  const onRemoveRadio = (sectionID, contentID, dataItemID) => {
    setFormValues(prevValues => ({
      ...prevValues,
      sections: prevValues.sections.map(section => {
        if (section.id === sectionID) {
          return {
            ...section,
            content: section.content.map(content => {
              if (content.id === contentID) {
                return {
                  ...content,
                  type: {
                    ...content.type,
                    data: content.type.data.filter(i => i.itemID !== dataItemID)
                  }
                };
              }
              return content;
            })
          };
        }
        return section;
      })
    }));
  };

  const handleAddSection = () => {
    const newSection = {
      id: uuidv4(),
      sectionTitle: '',
      sectionDescription: '',
      content: [
        { id: uuidv4(), question: '', type: { datatype: 'Short Text', data: [] }, response: '' },
      ]
    }
    setFormValues((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }))
  }

  const onChangeRequired = (sectionID, contentID, e) => {
    setFormValues(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id === sectionID) {
          return {
            ...section,
            content: section.content.map(content => {
              if (content.id === contentID) {
                return {
                  ...content,
                  required: e.target.checked
                };
              }
              return content;
            })
          };
        }
        return section;
      })
    }));
  };

  const onChangeTitle = (e) => {
    setFormValues(prev => ({
      ...prev,
      formTitle: e.target.value,
    }))
  }

  const onClickInputBox = (sectionID, contentID, e) => {
    setCursorPosition(e.target.selectionStart)
    setLastSelectedInput({ sectionID, contentID })
  }

  const GoBack = () => {
    navigate(-1)
  }

  const onPreview = () => {
    let alertText = ''
    for (let section of formValues.sections) {
      if (section.sectionTitle.trim() === '') {
        alertText = 'Fill All Section Titles'
        Swal.fire({
          text: alertText,
          icon: 'warning',
          customClass: {
            confirmButton: 'my-custom-button'
          }
        });
        return false
      }

      for (let content of section.content) {
        if (content.question.trim() === '') {
          alertText = 'Fill All The Questions';
          Swal.fire({
            text: alertText,
            icon: 'warning',
            customClass: {
              confirmButton: 'my-custom-button'
            }
          });
          return false
        }
      }
    }
    return true
  }
  const getFeedBackData=async ()=>{
    const response=await GetAnyRecordFromAnyTable('feedback',recordId)
    console.log(response,'FeedBack Data')
    const feedbackData=response?.data[0]
    setFormValues({
      image: feedbackData.image || '',
      // formTitle: feedbackData.formTitle || '',
      active: feedbackData.active || true,
      dateOfSubmission: feedbackData.dateOfSubmission || '',
      responses: feedbackData.responses || [],
      sections: feedbackData.sections || [],
    })
  }

  useEffect(
    () => { 
      if(recordId){ 
        getFeedBackData()
      }
    },[]

  )

  return (
    <MainContainer>
      <HeaderContainer className="bg-transparent mt-1">
    
        <BackBtn type='button' onClick={GoBack}>
          <IoIosArrowBack size={30} />
        </BackBtn>
        
        <TabsContainer>
          <h2 >FeedBack Form</h2>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '5px' }}>

            <Btnsection type='button' style={{ height: '40px', width: '40px' }} onClick={handleAddSection}>
              <TbSection size={20} />
            </Btnsection>

            <FinishBtn
              type="button"
              onClick={() => {
                if (onPreview()) {
                  localStorage.setItem('feedbackContent', JSON.stringify(formValues));
                  navigate('/PreviewFeedback');
                }
              }}
            >
              Preview
              {renderIcons('IoIosArrowForward', 25, 'inherit')}
            </FinishBtn>

          </div>
        </TabsContainer>
      </HeaderContainer>

      <MainContainer2>
        {activeTab === 'Questions' && (
          <FeedBackSideBar>
            {fieldsListData.map((each) => (
              <AddItem onClick={() => insertText(each.fieldName)} key={each.fieldName}> {each.fieldName} <IoMdAdd size={20} /> </AddItem>
            ))}
          </FeedBackSideBar>
        )}
        {activeTab === 'Questions' && (
          <ContentArea >
            <CustomContainer>
              <TemplateImgContainer style={{ background: formValues.image ? `url(${formValues.image})` : '#fff' }}>
                <CustomLabel htmlFor='templateImg'><IoImageOutline size={20} /></CustomLabel>
                <CustomInput id='templateImg' type='file' accept='image/*' onChange={onChangeImg} />
              </TemplateImgContainer>

              {formValues.sections.map((item, index) => (
                <>
                  {
                    formValues.sections.length > 1 && (<div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <SectionTag >Section {index + 1}/{formValues.sections.length}</SectionTag>
                      <button style={{ padding: '0px', marginBottom: '2px', background: 'transparent', border: 'none', color: '#691e06' }} onClick={() => onDeleteSection(item.id)}><IoIosRemoveCircle size={25} /></button>
                    </div>)
                  }
                  <TitleContainer key={item.id} style={{ marginTop: formValues.sections.length <= 1 ? '10px' : '' }}>
                    <Title>
                      <ReactQuill
                        theme="bubble"
                        value={formValues?.sections?.[0]?.sectionTitle || ""}
                        onChange={(newValue) => OnTitleText(item.id, newValue)}
                        modules={modules}
                        formats={formats}
                        className="large-text"
                        placeholder='Title...'
                        style={{ width: '100%', height: '100%', background: '#f5f3f4', borderRadius: '8px' }}
                      />
                    </Title>

                    <Description>
                      <ReactQuill
                        theme="bubble"
                        value={item.sectionDescription}
                        onChange={(newValue) => onChangeDescriptionText(item.id, newValue)}
                        modules={modules}
                        formats={formats}
                        className='description-text'
                        placeholder='Description...'
                        style={{ width: '100%', height: '100%', padding: '0px', background: '#f5f3f4', borderRadius: '8px' }}
                      />
                    </Description>
                  </TitleContainer>

                  <FieldsList>
                    {item.content.map((each) => (
                      <FieldContainer key={each.id}>
                        <QuestionDiv>
                          <CustomTextField ref={inputRef => (inputRefs.current[`input_${item.id}_${each.id}`] = inputRef)}
                            type='text'
                            placeholder='Question...?'
                            value={each.question}
                            onChange={(e) => onChangeQuestion(item.id, each.id, e)}
                            onClick={(e) => onClickInputBox(item.id, each.id, e)}
                          />

                          <CustomSelect onChange={(e) => onChangeType(item.id, each.id, e)} value={each.type.datatype}>
                            <option value="Short Text">Short Text</option>
                            <option value="Paragraph">Paragraph</option>
                            <option value="Multiple Choice">Multiple Choice</option>
                            <option value="CheckBox">CheckBox</option>
                            <option value="Dropdown">Dropdown</option>
                          </CustomSelect>
                        </QuestionDiv>

                        <ResponseContainer>

                          <ResponseDiv>
                            {each.type.datatype === 'Short Text' && (
                              <CustomTextField readOnly value={each.type.data} placeholder='Enter Short-Answer Text...' onChange={(e) => OnChangeInResponse('Short Text', item.id, each.id, e, '')} style={{ width: '95%', borderRadius: '0px', height: '35px', background: '#fff', borderBottom: '1px solid #ccc', }} />
                            )}

                            {each.type.datatype === 'Paragraph' && (
                              <CustomTextArea readOnly value={each.type.data} placeholder='Enter Long-Answer Text...' onChange={(e) => OnChangeInResponse('Paragraph', item.id, each.id, e, '')} />
                            )}

                            {each.type.datatype === 'Multiple Choice' && (
                              <>
                                <RadioBtnSet>
                                  {each.type.data.map((box) => (
                                    <RadioBtnContainer key={box.itemID}>
                                      <input id={box.itemID} name={each.id} type='radio' checked={box.isItemChecked} />
                                      <input style={{ border: 'none', borderBottom: '1px solid #000', marginLeft: '5px', outline: 'none' }} htmlFor={box.itemID} type='text' value={box.itemLabel} onChange={(e) => OnChangeLabel('Multiple Choice', item.id, each.id, box.itemID, e)} />
                                      {
                                        each.type.data.length > 1 && <AddBtn style={{ background: 'transparent', padding: '0px', color: '#000' }} type='button' onClick={() => onRemoveRadio(item.id, each.id, box.itemID)}><IoIosClose size={20} /></AddBtn>
                                      }

                                    </RadioBtnContainer>
                                  ))}
                                </RadioBtnSet>
                                <AddBtn type='button' onClick={() => OnAddExtraCheckbox(item.id, each.id)}>Add</AddBtn>
                              </>

                            )}

                            {each.type.datatype === 'CheckBox' && (
                              <>
                                <RadioBtnSet>
                                  {each.type.data.map((eachBox) => (
                                    <RadioBtnContainer key={eachBox.itemID}>
                                      <input id={eachBox.itemID} type='checkbox' />
                                      <input type='text' style={{ border: 'none', borderBottom: '1px solid #000', marginLeft: '5px', outline: 'none' }} htmlFor={eachBox.itemID} value={eachBox.itemLabel} onChange={(e) => OnChangeLabel('CheckBox', item.id, each.id, eachBox.itemID, e)} />
                                      {
                                        each.type.data.length > 1 && <AddBtn style={{ background: 'transparent', padding: '0px' }} type='button' onClick={() => onRemoveRadio(item.id, each.id, eachBox.itemID)}><IoIosClose size={20} /></AddBtn>
                                      }
                                    </RadioBtnContainer>
                                  ))}
                                </RadioBtnSet>
                                <AddBtn type='button' onClick={() => OnAddExtraCheckbox(item.id, each.id)}>Add</AddBtn>
                              </>
                            )}

                            {each.type.datatype === 'Dropdown' && (
                              <>
                                <RadioBtnSet>
                                  {each.type.data.map((eachBox, index) => (
                                    <RadioBtnContainer key={eachBox.itemID}>
                                      {/* <input id={eachBox.itemID} type='checkbox' /> */}
                                      <span>{index + 1} .</span>
                                      <input type='text' style={{ border: 'none', borderBottom: '1px solid #000', marginLeft: '5px', outline: 'none' }} htmlFor={eachBox.itemID} value={eachBox.itemLabel} onChange={(e) => OnChangeLabel('Dropdown', item.id, each.id, eachBox.itemID, e)} />
                                      {
                                        each.type.data.length > 1 && <AddBtn style={{ background: 'transparent', padding: '0px' }} type='button' onClick={() => onRemoveRadio(item.id, each.id, eachBox.itemID)}><IoIosClose size={20} /></AddBtn>
                                      }
                                    </RadioBtnContainer>
                                  ))}
                                </RadioBtnSet>
                                <AddBtn type='button' onClick={() => OnAddExtraCheckbox(item.id, each.id)}>Add</AddBtn>
                              </>
                            )}
                          </ResponseDiv>

                          <ToggleSwitch>
                            <label className="switch">
                              <input type="checkbox" onChange={(e) => onChangeRequired(item.id, each.id, e)} />
                              <span className="slider"></span>
                            </label>
                          </ToggleSwitch>
                        </ResponseContainer>

                        <DeleteBtn disabled={item.content.length <= 1} type="button" onClick={() => onDelete(item.id, each.id)}>
                          <MdDelete size={25} />
                        </DeleteBtn>
                      </FieldContainer>
                    ))

                    }
                    <BtnAdd type="button" onClick={() => handleAddItem(item.id)}>
                      <FaPlus size={25} />
                    </BtnAdd>
                  </FieldsList>
                </>
              ))}
            </CustomContainer>
          </ContentArea>
        )}
      </MainContainer2>
    </MainContainer>
  );
};
export default CreateFeedback;

 