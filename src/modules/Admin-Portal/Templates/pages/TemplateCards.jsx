import { Link } from 'react-router-dom'
import { useState } from 'react'
import Modal from 'react-modal'
import { IoCloseSharp } from "react-icons/io5";
import { subCategoryTemplatesData } from '../../../../DataFile/DefaultDataFile';

import {
  BodyContainer,
  Card,
  CardsContainer,
  CategoryTitle,
  ClosePopupBtn,
  ContentContainer,
  MainContainer,
  PopupContainer,
  TemplateImage,
  TemplateItem,
  TemplateTitle,
  TemplatesList,
} from '../components/TemplateCards/StyledComponents'

const backgroundImages = {
  sms: 'https://res.cloudinary.com/drtguvwir/image/upload/v1706597975/WON-Platform-Images/mzh7n9bdqwvyleh6bhur.png',
  standard: 'https://res.cloudinary.com/drtguvwir/image/upload/v1706777534/WON-Platform-Images/kpre4lm4mogtucadvyaa.png',
  mobile: 'https://res.cloudinary.com/drtguvwir/image/upload/v1706596479/WON-Platform-Images/gzyg8amdbngqd3szx65p.jpg',
  other: 'https://res.cloudinary.com/drtguvwir/image/upload/v1706778001/WON-Platform-Images/rfzdcevurf6ujzzhydol.png'
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    borderRadius: '15px',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'var(--background-color)'
  },
}

export default function TemplateCards() {
  const [openSubcategoryTemplates, setSubcategoryTemplates] = useState(false)
  const [templatesData, setTemplatesData] = useState(subCategoryTemplatesData)
  const [activeTemplateType, setTemplateType] = useState('SMS')

  const SetOpenSubcategoryTemplates = (value) => {
    setTemplateType(value)
    setSubcategoryTemplates(true)
  }

  const closeSubcategoryTemplates = () => setSubcategoryTemplates(false)

  return (
    <MainContainer>
      <BodyContainer>
        <ContentContainer>
          <ul className='w-full h-fit grid md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <Card bg={backgroundImages.sms} onClick={() => SetOpenSubcategoryTemplates('SMS')}> SMS</Card>
            <Card bg={backgroundImages.standard} onClick={() => SetOpenSubcategoryTemplates('Standard')} >STANDARD</Card>
            <Card bg={backgroundImages.mobile} onClick={() => SetOpenSubcategoryTemplates('Mobile')} >MOBILE</Card>
            <Link to='/template-creation'><Card bg={backgroundImages.other}></Card></Link>
          </ul>
          <Modal
            isOpen={openSubcategoryTemplates}
            onRequestClose={closeSubcategoryTemplates}
            contentLabel='this is a popup container for sub catregorized templates...'
            style={customStyles}
          >
            <ClosePopupBtn type='button' onClick={closeSubcategoryTemplates} > <IoCloseSharp size={20} /> </ClosePopupBtn>
            <PopupContainer>
              <CategoryTitle>{activeTemplateType} Template Gallery </CategoryTitle>

              <TemplatesList>
                {templatesData.map(template => {
                  if (activeTemplateType === template.format) {
                    return (<Link to='/template-creation' key={template.type} style={{ color: '#000000' }}><TemplateItem >
                      <TemplateImage
                        src='https://res.cloudinary.com/drtguvwir/image/upload/v1706784350/WON-Platform-Images/z96pynq441h85cprby4r.png'
                        alt='template'
                      />
                      <TemplateTitle> {template.templateName} </TemplateTitle>
                    </TemplateItem></Link>)
                  }
                  return null
                })}
              </TemplatesList>
            </PopupContainer>

          </Modal>
        </ContentContainer>
      </BodyContainer>
    </MainContainer>
  )
}