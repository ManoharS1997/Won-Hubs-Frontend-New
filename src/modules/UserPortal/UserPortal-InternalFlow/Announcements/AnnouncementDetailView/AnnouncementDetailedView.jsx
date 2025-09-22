
import { useParams, useNavigate } from "react-router-dom"
import { AnnouncementData as data } from "../../../../../DataFile/DefaultDataFile"
import { MainContainer, CustomContainer, ContentContainer1, ItemDetailsContainer, Title, Description, BottomContainer } from "./StyledComponents"
import LeftNav from "../../../LeftNav/pages/LeftNav"
import { IoIosArrowBack } from "react-icons/io";

const AnnouncementDetailView = () => {
    const { id } = useParams()
    const RequiredData = data.filter(item => item.id === id)
    // console.log(RequiredData)
    const Navigate = useNavigate()
    return (
        <MainContainer>
            <CustomContainer>
                <ContentContainer1>
                    <ItemDetailsContainer>
                        <IoIosArrowBack size={25} onClick={() => { Navigate(-1) }} />
                        <Title>{RequiredData[0].Announcement}</Title>
                        <Description>{`Held on:${RequiredData[0].Date}`}</Description>
                    </ItemDetailsContainer>
                </ContentContainer1>

            </CustomContainer>
        </MainContainer>


    )
}

export default AnnouncementDetailView