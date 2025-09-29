
import { useState } from "react"
import ViewSelection from "../../../../shared/components/ViewSelection"
import { Dummy_views_list } from "../../../../DataFile/DefaultDataFile"
import { MainContainer } from "./StyledComponents"
import TemplatesList from "../../../../shared/components/TemplatesList"
import AlertEditor from "../components/AlertEditor"


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

export default function CreateAlerts() {
    const [flowStep, setFlowStep] = useState(1)

    return (
        <MainContainer style={{ height: '100%' }} >
            <ViewSelection
                viewsList={Dummy_views_list}
                noOfCards={4}
                show={flowStep === 1}
                onViewSelect={() => {
                    console.log('setting 2nd stage')
                    setFlowStep(2)
                }}
            />
            <TemplatesList
                templatesList={DUMMY_TEMPLATES_LIST}
                show={flowStep === 2}
                onClick={() => setFlowStep(1)}
                onTemplateSelect={() => setFlowStep(3)}
            />
            <AlertEditor
                show={flowStep === 3}
                onClick={() => setFlowStep(2)}

            />
        </MainContainer>
    )
}