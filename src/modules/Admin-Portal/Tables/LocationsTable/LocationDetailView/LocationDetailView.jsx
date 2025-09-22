import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from "react-icons/io";

import {
    BackBtn, BtnsCon, CustomContainer, CustomViewContainer,
    DeleteBtn, FieldsCon, FormContent, HeaderTag, Heading,
    Input, InputCon, Label, SideNavNContentContainer, UpdateBtn
} from './StyledComponents'

const LocationDetailView = (props) => {
    const { match } = props
    const { params } = match
    const { id } = params
    
    const history = useNavigate();
    const [formData, setFormData] = useState({
        locationName: "",
        street: "",
        city: "",
        stateOrCountry: "",
        postalCode: "",
        contact: "",
        phoneNo: "",
        faxNo: "",
        parentLocation: ''
    })

    useEffect(() => {
        getLocationData()
    }, [])

    const getLocationData = async () => {
        const url = `http://localhost:3001/location/${id}`
        const options = {
            method: 'GET'
        }
        const response = await fetch(url, options)
        const data = await response.json()

        setFormData({
            locationId: data.location[0].location_id,
            locationName: data.location[0].location_name,
            street: data.location[0].street,
            city: data.location[0].city,
            stateOrCountry: data.location[0].state,
            postalCode: data.location[0].postal_code,
            contact: data.location[0].contact,
            phoneNo: data.location[0].phone_no,
            faxNo: data.location[0].fax_no,
            parentLocation: data.location[0].parent_location
        })
    }

    const updateLocation = async (e) => {
        e.preventDefault()
        const url = `http://localhost:3001/location/update/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        const response = await fetch(url, options)
        const err = await response.json()
    }

    const handleChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,

        }))
    };

    const OnBack = () => history.goBack()

    return (
        <CustomViewContainer>
            <SideNavNContentContainer>
                <CustomContainer>

                    <FormContent>
                        <Heading>
                            <BackBtn onClick={OnBack}>
                                <IoIosArrowBack size={26} />
                            </BackBtn>
                            <HeaderTag></HeaderTag>
                        </Heading>

                        <FieldsCon onSubmit={updateLocation}>
                            <InputCon>
                                <Label>Location ID</Label>
                                <Input
                                    type='text'
                                    value={formData.locationId}
                                    onChange={(e) => handleChange('locationId', e.target.value)} />
                            </InputCon>

                            <InputCon>
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
                            </InputCon>

                            <BtnsCon>
                                <UpdateBtn type='submit' >Update</UpdateBtn>
                                <DeleteBtn type="button">Delete</DeleteBtn>
                            </BtnsCon>
                        </FieldsCon>
                    </FormContent>
                </CustomContainer>
            </SideNavNContentContainer>
        </CustomViewContainer>
    )
}
export default LocationDetailView