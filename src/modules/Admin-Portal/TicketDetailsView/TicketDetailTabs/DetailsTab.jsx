import {
    ConLeft,
    ConRight,
    DetailsTabContainer,
    DropDown,
    EachElement,
    Input,
    Label
} from './StyledComponents'

const DetailsTab = () => {
    const SolutionTypes = ['training', 'experienced']

    return (
        <DetailsTabContainer>
            {/* <ConLeft>
                <EachElement>
                    <Label>Created Date</Label>
                    <Input type='date' />
                </EachElement>

                <EachElement>
                    <Label>Closed Date</Label>
                    <Input type='date' />
                </EachElement>

                <EachElement>
                    <Label>Re-Opened Date</Label>
                    <Input type='date' />
                </EachElement>

                <EachElement>
                    <Label>Time Re-Opened</Label>
                    <Input type='text' />
                </EachElement>
            </ConLeft>

            <ConRight>
                <EachElement>
                    <Label>Remind Me</Label>
                    <Input type='date' />
                </EachElement>

                <EachElement>
                    <Label>Emergency Contact</Label>
                    <Input type='text' />
                </EachElement>

                <EachElement>
                    <Label>Solution Type</Label>
                    <DropDown>
                        <option value="" disabled>
                            Select Type
                        </option>
                        {SolutionTypes.map((each) => (
                            <option key={each} value={each}>
                                {each}
                            </option>
                        ))}
                    </DropDown>
                </EachElement>

                <EachElement>
                    <Label>Response SLA</Label>
                    <Input type='date' />
                </EachElement>

                <EachElement>
                    <Label>Resolution</Label>
                    <Input type='date' />
                </EachElement>
            </ConRight> */}
            
            
        </DetailsTabContainer>
    )
}

export default DetailsTab