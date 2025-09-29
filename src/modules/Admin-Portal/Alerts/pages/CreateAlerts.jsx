
import { useState, useEffect } from "react"
import ViewSelection from "../../../../shared/components/ViewSelection"
import { Dummy_views_list } from "../../../../DataFile/DefaultDataFile"
import { MainContainer } from "./StyledComponents"
import TemplatesList from "../../../../shared/components/TemplatesList"
import AlertEditor from "../components/AlertEditor"
import Cookies from 'js-cookie'


const DUMMY_TEMPLATES_LIST = [
    {
        id: '2156',
        imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
    },
    {
        id: '4548',
        imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
    },
    {
        id: '58484',
        imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
    },
    {
        id: '887878',
        imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
    },
    {
        id: '9895',
        imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
    },
    {
        id: '54541',
        imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
    },
    {
        id: '6889',
        imageUrl: 'https://img.freepik.com/premium-vector/smartphone-screen-emergency-notification-interface-template-design-with-transparent-background_539007-262.jpg'
    },
]

export default function CreateAlerts({ recordId }) {
    const [flowStep, setFlowStep] = useState(3)
    const[recordData,setRecordData]=useState({})
    const data=JSON.parse(localStorage.getItem('alertData'))
    console.log(data,"data Here")
    const getAlertDetails = async () => {
        try {
            // Fetch existing record details
            const response = await fetch(
                `http://localhost:3001/alert/${recordId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                }
            );
            console.log(response,"response")
            const data = await response.json();
            console.log("Fetched alert details:", data);
            setRecordData(data)
            // ✅ You can store data in state here if needed
            setFlowStep(3); // ✅ Directly go to step 3
        } catch (error) {
            console.error("Error fetching alert details:", error);
        }
    };
    useEffect(() => {
        if (recordId) {
             setFlowStep(3);
            getAlertDetails()
        }
    },[])
    return (
        <MainContainer style={{ height: '100%' }} >
            {/* <ViewSelection
                viewsList={Dummy_views_list}
                noOfCards={4}
                show={flowStep === 1}
                onViewSelect={() => {
                    console.log('setting 2nd stage')
                    setFlowStep(2)
                }}
            /> */}
            {/* <TemplatesList
                templatesList={DUMMY_TEMPLATES_LIST}
                show={flowStep === }
                onClick={() => setFlowStep(1)}
                onTemplateSelect={() => setFlowStep(3)}
            /> */}
            <AlertEditor
                show={flowStep === 3}
                onClick={() => setFlowStep(2)}
                recordData={recordData}
                data={data}

            />
        </MainContainer>
    )
}