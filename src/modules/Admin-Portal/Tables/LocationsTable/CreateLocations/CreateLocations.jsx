import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

import {
    BackBtn, BtnsCon, CreateLocationsContainer, CustomViewContainer,
    FieldsCon, FormContent, Heading, HeaderTag, Input,
    InputCon, Label, SaveBtn, SideNavNContentContainer
} from './StyledComponents'

const CreateLocations = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [formFields, setFormFields] = useState([])
    const [newLocationData, setNewLocationData] = useState({})

    useEffect(() => {
        const getUserFormFields = async (department, category, subCategory) => {
            setLoading(true);
            let data
            const url = `http://localhost:3001/AdminPortalForms/${subCategory}/${category}/${department}`
            const options = {
                method: 'GET'
            }

            try {
                const response = await fetch(url, options)
                data = await response.json()
                setFormFields(data.AdminFormsData[0].fields)
                // console.log('heyy', data.AdminFormsData[0].fields)
            } catch (error) {
                console.error('Error fetching fields:', error);
            } finally {
                setLoading(false);
            }

            return data.AdminFormsData
        }

        getUserFormFields('Global', 'Core Forms', 'Locations Form')
    }, [])

    const onChangeInputField = (fieldName, value) => {
        const snake_case = fieldName.replace(/ /g, '_')
        setNewLocationData((prevState) => ({
            ...prevState,
            [snake_case]: value,
        }))
    }

    const addLocation = async (e) => {
        e.preventDefault()
        const url = `http://localhost:3001/location/newLocation`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLocationData)
        }

        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }
            const result = await response.json();
            console.log('Location added successfully:', result);
        }
        catch (error) {
            console.error('error adding Location', error)
        }

        setNewLocationData({})
    }


    const OnBack = () => navigate(-1)

    return (
        <CustomViewContainer>
            <SideNavNContentContainer>
                <CreateLocationsContainer>
                    <FormContent>
                        <Heading>
                            <BackBtn onClick={OnBack}>
                                <IoIosArrowBack size={26} />
                            </BackBtn>
                            <HeaderTag>Create Location</HeaderTag>
                        </Heading>

                        <FieldsCon onSubmit={addLocation}>

                            {formFields && formFields.map(each => (
                                <div key={each.id}>

                                    {(each.details.type === 'text' || each.details.type === 'number' || each.details.type === 'checkbox' || each.details.type === 'email') && (
                                        <InputCon key={each.id}>
                                            <Label>{each.details.name}</Label>
                                            {each.details.type !== 'checkbox' ? (
                                                <Input
                                                    type={each.details.type}
                                                    placeholder={each.details.placeholder}
                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                    value={newLocationData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                />
                                            ) : (
                                                <Input
                                                    type={each.details.type}
                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.checked)}
                                                    checked={newLocationData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                />
                                            )}
                                        </InputCon>
                                    )}

                                    {each.details.type === 'select' && (
                                        <InputCon key={each.id}>
                                            <Label >{each.details.name}</Label>
                                            <select
                                                onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                value={newLocationData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                            >
                                                {each.details.options.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </InputCon>)}

                                    {each.details.type === 'textarea' && (
                                        <InputCon key={each.id}>
                                            <Label>{each.details.name}</Label>
                                            <textarea
                                                placeholder={each.details.placeholder}
                                                onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                value={newLocationData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                            />
                                        </InputCon>
                                    )}

                                    {each.details.type === 'file attachment' && (
                                        <InputCon key={each.id}>
                                            <Label>{each.details.name}</Label>
                                            <Input
                                                type='file'
                                                placeholder={each.details.placeholder}
                                                onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                value={newLocationData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                            />
                                        </InputCon>
                                    )}

                                </div>
                            ))}

                            {/* <InputCon>
                                <Label>Location Name</Label>
                                <Input
                                    type='text'
                                    value={formData.locationName}
                                    onChange={(e) => handleChange('locationName', e.target.value)} />
                            </InputCon>

                            <InputCon>
                                <Label>Street</Label>
                                <Input
                                    type='text'
                                    value={formData.street}
                                    onChange={(e) => handleChange('street', e.target.value)} />
                            </InputCon>

                            <InputCon>
                                <Label>City</Label>
                                <Input
                                    type='text'
                                    value={formData.city}
                                    onChange={(e) => handleChange('city', e.target.value)} />
                            </InputCon>

                            <InputCon>
                                <Label>State/Country</Label>
                                <Input
                                    type='text'
                                    value={formData.stateOrCountry}
                                    onChange={(e) => handleChange('stateOrCountry', e.target.value)} />
                            </InputCon>

                            <InputCon>
                                <Label>Postal Code</Label>
                                <Input
                                    type='text'
                                    value={formData.postalCode}
                                    onChange={(e) => handleChange('postalCode', e.target.value)} />
                            </InputCon>

                            <InputCon>
                                <Label>Contact</Label>
                                <Input
                                    type='text'
                                    value={formData.contact}
                                    onChange={(e) => handleChange('contact', e.target.value)} />
                            </InputCon>

                            <InputCon>
                                <Label>Phone No</Label>
                                <Input
                                    type='text'
                                    value={formData.phoneNo}
                                    onChange={(e) => handleChange('phoneNo', e.target.value)} />
                            </InputCon>

                            <InputCon>
                                <Label>Fax No</Label>
                                <Input
                                    type='text'
                                    value={formData.faxNo}
                                    onChange={(e) => handleChange('faxNo', e.target.value)} />
                            </InputCon>

                            <InputCon>
                                <Label>Parent Location</Label>
                                <Input
                                    type='text'
                                    value={formData.parentLocation}
                                    onChange={(e) => handleChange('parentLocation', e.target.value)} />
                            </InputCon> */}

                            <BtnsCon>
                                <SaveBtn type="submit">Submit</SaveBtn>
                            </BtnsCon>
                        </FieldsCon>
                    </FormContent>
                </CreateLocationsContainer>
            </SideNavNContentContainer>
        </CustomViewContainer>
    )
}
export default CreateLocations