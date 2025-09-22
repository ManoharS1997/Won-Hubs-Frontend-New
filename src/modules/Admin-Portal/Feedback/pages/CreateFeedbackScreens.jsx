import { useNavigate } from 'react-router-dom';


//ICON IMPORTS
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

//Component imports
import WonContext from '../../../../context/WonContext';

import {
    BackBtn, CustomContainer, CustomNotificationContainer, NotificationTemplateMainContainer,
    SideNavAndContentContainer, StyledLink, TemplateTile, TemplateTilesContainer,
    TemplatesContainer, TitleContainer
} from './StyledFeedbackScreens';


const CreateFeedbackScreens = () => {
    const history = useNavigate()

    const GoBack = () => {
        history.push('/Dashboard')
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
                                            <StyledLink to="/CreateFeedbackEditor" style={{ backgroundImage: "url('https://res.cloudinary.com/dca9sij3n/image/upload/v1706596299/m9wadwyljrnvb5lvlsit.png')" }}>
                                                <TemplateTile ></TemplateTile>
                                            </StyledLink>

                                            <StyledLink to="/CreateFeedbackEditor" style={{
                                                backgroundImage: "url('https://res.cloudinary.com/dca9sij3n/image/upload/v1706595713/wvsf7jr4thhxspdw3jpf.png')"
                                            }}>
                                                <TemplateTile ></TemplateTile>
                                            </StyledLink>

                                            <StyledLink to="/CreateFeedbackEditor" style={{
                                                backgroundImage: "url('https://res.cloudinary.com/dca9sij3n/image/upload/v1706596676/cbxuw7wd7ihijebvveru.png')"
                                            }}>
                                                <TemplateTile></TemplateTile>
                                            </StyledLink>

                                            <StyledLink to="/CreateFeedbackEditor" style={{ border: '1px solid #ccc' }}>
                                                <TemplateTile >
                                                    <AiOutlinePlus size={40} style={{ color: '#000' }} />
                                                </TemplateTile>
                                            </StyledLink>
                                        </CustomContainer>
                                    </TemplateTilesContainer>

                                </TemplatesContainer>

                            </CustomNotificationContainer>

                            {/* {openSettings ? <Settings /> : null} */}

                        </SideNavAndContentContainer>

                    </NotificationTemplateMainContainer>
                )
            }}
        </WonContext.Consumer>
    )

}

export default CreateFeedbackScreens