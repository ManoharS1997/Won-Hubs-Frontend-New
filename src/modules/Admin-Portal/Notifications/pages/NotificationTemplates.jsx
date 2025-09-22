import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'
import Cookies from 'js-cookie';

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

const NotificationTemplates = () => {
  const [templates, setTemplates] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

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

  return (
    <WonContext.Consumer>
      {value => {
        const { openSettings } = value

        return (
          <NotificationTemplateMainContainer>
            <SideNavAndContentContainer>
              <CustomNotificationContainer>
                <TemplatesContainer>
                  <TitleContainer>
                    <BackBtn onClick={GoBack}>
                      <IoIosArrowBack size={30} />
                    </BackBtn>
                  </TitleContainer>

                  <TemplateTilesContainer>
                    <CustomContainer>
                      <TemplateTile
                        onClick={() => renderNotificationTemplates('sms')}
                        style={{
                          backgroundImage: "url('https://res.cloudinary.com/dca9sij3n/image/upload/v1706596299/m9wadwyljrnvb5lvlsit.png')"
                        }}>SMS
                      </TemplateTile>

                      <TemplateTile onClick={() => renderNotificationTemplates('desktop')} style={{
                        backgroundImage: "url('https://res.cloudinary.com/dca9sij3n/image/upload/v1706595713/wvsf7jr4thhxspdw3jpf.png')"
                      }}>Desktop
                      </TemplateTile>

                      <TemplateTile
                        onClick={() => renderNotificationTemplates('tab')}
                        style={{
                          backgroundImage: "url('https://res.cloudinary.com/dca9sij3n/image/upload/v1706596676/cbxuw7wd7ihijebvveru.png')"
                        }}>Tab
                      </TemplateTile>

                      <TemplateTile
                        onClick={() => navigate('/notifications/new')}
                        style={{ border: '1px solid #ccc' }}
                      >
                        <AiOutlinePlus
                          size={40}
                          style={{ color: '#000', }}
                        />
                      </TemplateTile>
                    </CustomContainer>
                  </TemplateTilesContainer>
                </TemplatesContainer>
              </CustomNotificationContainer>

              <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={modalStyles}
              >
                <ModalCloseBtn type='button' onClick={() => setModalOpen(false)} title='close'>
                  <IoIosClose size={25} />
                </ModalCloseBtn>

                {templates.length > 0 ?
                  <ul className='p-2% grid md:grid-cols-4 list-none gap-4 m-0 p-0'>
                    {templates.map(item => (
                      <TemplateItem key={item.id} onClick={() => navigate(`/notifications/${item.id}`)}>
                        {item.name}
                      </TemplateItem>
                    ))}
                  </ul>
                  : <div className='w-full h-full flex items-center justify-center text-xl text-gray-400'>
                    <p>No Templates Available</p>
                  </div>
                }
              </Modal>
              {/* {openSettings ? <Settings /> : null} */}
            </SideNavAndContentContainer>
          </NotificationTemplateMainContainer>
        )
      }}
    </WonContext.Consumer>
  )

}

export default NotificationTemplates