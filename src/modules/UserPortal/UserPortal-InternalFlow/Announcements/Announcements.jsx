
import WonContext from '../../../../context/WonContext';
import ChatBot from '../Chat/Chat';
import { AnnouncementData as data } from '../../../../DataFile/DefaultDataFile';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom"

import {
    AnnounceCon, Card, CardId, CardsList, ContentContainer1,
    CustomA, CustomContainer, CustomP, EventsHead, MainContainer,
    RedirectBtn,
} from './StyledComponents'

const Announcements = () => {
    const FormattedData = data.sort((a, b) => new Date(b.Date) - new Date(a.Date))

    const FormatedDate = (date) => {
        const originalDate = new Date(date)
        return (`${originalDate.getDate()}/${originalDate.getMonth()}/${originalDate.getFullYear()}`)
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { isChatBotOpen } = value

                return (
                    <MainContainer>
                        <CustomContainer>
                            <ContentContainer1>
                                <AnnounceCon>
                                    <EventsHead>Upcoming Events</EventsHead>

                                    <CardsList>
                                        {
                                            FormattedData.map((item) => (
                                                <Link to={`/user-internal/Announcements/${item.id}`} key={item.id}>
                                                    <Card key={item.id}>
                                                        <CardId>{FormatedDate(item.Date)}</CardId>
                                                        <CustomP>{item.Announcement}</CustomP>
                                                        <RedirectBtn type="button">
                                                            <CustomA href='https://nowitservices.com/' target='_blank' >
                                                                <FaArrowUpRightFromSquare size={15} />
                                                            </CustomA>
                                                        </RedirectBtn>
                                                    </Card>
                                                </Link>
                                            ))
                                        }
                                    </CardsList>
                                    {isChatBotOpen && <ChatBot />}
                                </AnnounceCon>
                            </ContentContainer1>
                        </CustomContainer>
                    </MainContainer>
                )
            }}
        </WonContext.Consumer>
    )

}

export default Announcements