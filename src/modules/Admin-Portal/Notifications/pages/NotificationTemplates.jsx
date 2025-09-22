import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'
import Cookies from 'js-cookie';
import FormInput from '../../../../shared/UIElements/FormInput';

//ICON IMPORTS
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

//Component imports
import WonContext from '../../../../context/WonContext';

import {
  BackBtn, CustomContainer, CustomNotificationContainer,
  NotificationTemplateMainContainer, SideNavAndContentContainer,
  StyledLink, TemplateTile, TemplateTilesContainer, TemplatesContainer,
  TitleContainer, ModalCloseBtn, TemplatesList, TemplateItem
} from './StyledNotificationTemlates';
import FormDropdown from '../../../../shared/UIElements/FormDropdown';
import FormTextarea from '../../../../shared/UIElements/FormTextarea';
import Swal from 'sweetalert2';


const NotificationTemplates = () => {
  const [templates, setTemplates] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedTab, setSelectedtab] = useState()
  const navigate = useNavigate()
  const [configureData, setConfigureData] = useState({
    to: { value: '', isMandatory: true },
    cc: { value: '', isMandatory: true },
    subject: { value: '', isMandatory: true },
    name: { value: '', isMandatory: true },
    type: { value: '', isMandatory: false }
  })

  const GoBack = () => {
    navigate(-1)
  }

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '10%',
      left: '10%',
      right: '10%',
      bottom: '10%',
      borderRadius: '15px',
      width: '80vw',
      height: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',

    },
  }

  const renderNotificationTemplates = async (type) => {
    try {
      const url = `${import.meta.env.VITE_HOSTED_API_URL}/table/notifications`
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      }

      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const filteredByType = data.notifications.filter(item => item.type === type)
        setTemplates(filteredByType)
      }
      setModalOpen(true)
    }
    catch (error) {
      console.log(error)
    }
  }
  const onChangeInput = (e) => {
    console.log(e, "onChange Value Here")
    console.log(e.target.id, e.target.value, "Heree")
    setConfigureData(prev => ({
      ...prev,
      [e.target.id]: {
        isMandatory: prev[e.target.id].isMandatory,
        value: e.target.value
      }
    }))
  }
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const emptyFields = Object.keys(configureData).filter(
        (field) =>
          configureData[field].isMandatory && configureData[field].value.trim() === ""
      );
      if (emptyFields.length > 0) {
        // setLoading(false);
        return Swal.fire({
          title: "Missing Mandatory Fields!",
          text: `Please fill: ${emptyFields
            .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
            .join(",")}`,

          icon: "warning",
          confirmButtonColor: "#3085d6",
        });
      }
      localStorage.setItem("notificationData",JSON.stringify(configureData))
      navigate("/notifications/new");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  // return (
  //   <WonContext.Consumer>
  //     {value => {
  //       const { openSettings } = value

  //       return (
  //         <NotificationTemplateMainContainer>
  //           <SideNavAndContentContainer>
  //             <CustomNotificationContainer>
  //               <TemplatesContainer>
  //                 <TitleContainer>
  //                   <BackBtn onClick={GoBack}>
  //                     <IoIosArrowBack size={30} />
  //                   </BackBtn>
  //                 </TitleContainer>

  //                 <TemplateTilesContainer>
  //                   <CustomContainer>
  //                     <TemplateTile
  //                       onClick={() => renderNotificationTemplates('sms')}
  //                       style={{
  //                         backgroundImage: "url('https://res.cloudinary.com/dca9sij3n/image/upload/v1706596299/m9wadwyljrnvb5lvlsit.png')"
  //                       }}>SMS
  //                     </TemplateTile>

  //                     <TemplateTile onClick={() => renderNotificationTemplates('desktop')} style={{
  //                       backgroundImage: "url('https://res.cloudinary.com/dca9sij3n/image/upload/v1706595713/wvsf7jr4thhxspdw3jpf.png')"
  //                     }}>Desktop
  //                     </TemplateTile>

  //                     <TemplateTile
  //                       onClick={() => renderNotificationTemplates('tab')}
  //                       style={{
  //                         backgroundImage: "url('https://res.cloudinary.com/dca9sij3n/image/upload/v1706596676/cbxuw7wd7ihijebvveru.png')"
  //                       }}>Tab
  //                     </TemplateTile>

  //                     <TemplateTile
  //                       onClick={() => navigate('/notifications/new')}
  //                       style={{ border: '1px solid #ccc' }}
  //                     >
  //                       <AiOutlinePlus
  //                         size={40}
  //                         style={{ color: '#000', }}
  //                       />
  //                     </TemplateTile>
  //                   </CustomContainer>
  //                 </TemplateTilesContainer>
  //               </TemplatesContainer>
  //             </CustomNotificationContainer>

  //             <Modal
  //               isOpen={isModalOpen}
  //               onRequestClose={() => setModalOpen(false)}
  //               style={modalStyles}
  //             >
  //               <ModalCloseBtn type='button' onClick={() => setModalOpen(false)} title='close'>
  //                 <IoIosClose size={25} />
  //               </ModalCloseBtn>

  //               {templates.length > 0 ?
  //                 <ul className='p-2% grid md:grid-cols-4 list-none gap-4 m-0 p-0'>
  //                   {templates.map(item => (
  //                     <TemplateItem key={item.id} onClick={() => navigate(`/notifications/${item.id}`)}>
  //                       {item.name}
  //                     </TemplateItem>
  //                   ))}
  //                 </ul>
  //                 : <div className='w-full h-full flex items-center justify-center text-xl text-gray-400'>
  //                   <p>No Templates Available</p>
  //                 </div>
  //               }
  //             </Modal>
  //             {/* {openSettings ? <Settings /> : null} */}
  //           </SideNavAndContentContainer>
  //         </NotificationTemplateMainContainer>
  //       )
  //     }}
  //   </WonContext.Consumer>
  // )
  return (
    <WonContext.Consumer>
      {value => {
        const { openSettings } = value

        return (
          <NotificationTemplateMainContainer>
            <SideNavAndContentContainer>
              <CustomNotificationContainer >
                <TemplatesContainer className='h-full '>
                  {/* Top Header Section */}
                  <TitleContainer className="flex items-center justify-between">
                    <BackBtn onClick={GoBack}>
                      <IoIosArrowBack size={30} />
                    </BackBtn>

                    <div className='w-full flex items-center justify-center gap-4'>
                      {['Desktop', 'Tab', 'Mobile'].map((item, index) => (
                        <button
                          key={index}
                          className={`h-fit w-[100px] !border-b-2 transition-all duration-500 py-2 font-semibold
                          ${selectedTab === item ? '!border-black' : '!border-transparent'}`}
                          onClick={() => setSelectedtab(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </TitleContainer>

                  {/* Templates List */}
                  <TemplateTilesContainer className="h-full">
                    <ul className="grid md:grid-cols-4 gap-4 bg-[var(--background-color)] rounded-lg p-4 list-none w-full h-fit m-0 overflow-auto">
                      {templates
                        .filter(t => t.mode === selectedTab)
                        .map((item, index) => (
                          <TemplateTile
                            key={index}
                            style={{ backgroundImage: `url(${item.thumbnail})` }}
                          >
                            {item.name}
                          </TemplateTile>
                        ))}

                      {/* Add New Tile */}
                      <li
                        onClick={() => {
                          setModalOpen(true)
                          // setSelectedDesign(null) // this indicates a new design
                          //  navigate('/notifications/new')
                        }}
                        className="w-full h-[200px] bg-gray-50 rounded flex items-center justify-center hover:shadow-lg border-2 !border-dashed cursor-pointer"
                      >
                        <p style={{ fontSize: '55px' }}>+</p>
                      </li>
                    </ul>

                    {/* Show fallback message if no templates */}
                    {templates.filter(t => t.mode === selectedTab).length === 0 && (
                      <div className="text-center text-gray-500 mt-4">No templates available for this selection</div>
                    )}
                  </TemplateTilesContainer>
                </TemplatesContainer>
              </CustomNotificationContainer>

              {/* Configure Modal */}
              {isModalOpen && (
                <div className="fixed w-screen min-h-screen bg-black/50 top-0 left-0 flex items-center justify-center">
                  <div className="flex flex-col justify-between items-center bg-white py-4 px-8 rounded-lg gap-4 w-[600px] max-w-[90%]">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="self-end border !rounded-full hover:!bg-red-500 hover:text-white transition-all duration-500"
                    >
                      <IoIosClose size={20} />
                    </button>

                    <div className="w-full flex flex-col gap-2">
                      <FormInput
                        inputType="text"
                        name="to"
                        label="To"
                        placeholder="Enter User Names Here"
                        isMandatory={true}
                        value={configureData?.to?.value}
                        onChangeHandler={onChangeInput}
                      />
                      <FormInput
                        inputType="text"
                        name="name"
                        label="Name"
                        value={configureData?.name?.value}
                        placeholder="Enter User Names Here"
                        isMandatory={true}
                        onChangeHandler={onChangeInput}
                      />
                      <FormDropdown
                        label="Type"
                        name='type'
                        options={[
                          { label: "Global", value: "global" },
                          { label: "Local", value: "local" }
                        ]}
                        isMandatory={true}
                        onChangeHandler={onChangeInput}
                        placeholder="Enter Type Here"


                      />
                      <FormInput
                        inputType="text"
                        name="cc"
                        label="CC"
                        value={configureData?.cc?.value}
                        placeholder="Enter Email id's Here"
                        isMandatory={true}
                        onChangeHandler={onChangeInput}
                      />
                      <FormTextarea
                        label="Subject"
                        isMandatory={true}
                        name="subject"
                        onChangeHandler={onChangeInput}
                        value={configureData?.subject?.value}

                      />
                    </div>

                    <button
                      type="submit"
                      // onClick={() => navigate('/notifications/new')}
                      onClick={handleSave}
                      className="border w-full px-4 py-2 rounded !bg-[var(--primary-color)]/20 hover:!bg-[var(--primary-color)] hover:text-[var(--background-color)] transition-all duration-500"
                    >
                      Create Notification
                    </button>
                  </div>
                </div>
              )}


            </SideNavAndContentContainer>
          </NotificationTemplateMainContainer>
        )
      }}
    </WonContext.Consumer>
  )



}

export default NotificationTemplates