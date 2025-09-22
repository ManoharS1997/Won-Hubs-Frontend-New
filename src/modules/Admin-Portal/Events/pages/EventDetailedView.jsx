
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import BackButton from "../../../../shared/components/BackButton"
import EventFieldsList from "../components/EventFieldsList"
import UpdateButton from "../components/UpdateBtn"
import { getRecordData, updateTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations"
import { MainContainer, ContentContainer, TopHeader, DetailedForm, TopTitle } from "./EventDetailedViewStyledComponents"

export default function EventDetailedView(props) {
    const [eventData, setEventData] = useState({})
    const [eventDataUpdated, setEventDataUpdated] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        getEventData()
    }, [])

    const getEventData = async () => {
        const eventdata = await getRecordData('event_logs', id, 'Event Detailed View', window.location.href)
        console.log(eventdata)
        !eventdata.error && setEventData(eventdata[0])
    }

    const updateEventData = async () => {
        await updateTableData('event_logs', eventData.id, { active: eventData.active }, 'Event Detailed View', window.location.href)
        setEventDataUpdated(false)
        return Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Event Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const changeActiveStatus = (updatedData) => {
        setEventDataUpdated(true)
        setEventData(updatedData)
    }
    console.log(eventData)
    return (
        <MainContainer>
            <ContentContainer>
                <TopHeader>
                    <BackButton type="button">Back</BackButton>
                    <TopTitle>Event_{eventData?.id}</TopTitle>
                    <UpdateButton
                        type='button'
                        style={{ marginLeft: 'auto' }}
                        display={eventDataUpdated}
                        onClick={updateEventData}
                    >Update</UpdateButton>
                </TopHeader>
                <DetailedForm>
                    <EventFieldsList eventData={eventData} onActiveChange={changeActiveStatus} />
                </DetailedForm>
            </ContentContainer>
        </MainContainer>
    )
}