import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// COMPONENT IMPORTS
import Settings from "../../../Settings/pages/Settings";

import WonContext from "../../../../../context/WonContext";

// ICON IMPORTS
import { RxUpdate } from "react-icons/rx";
import { IoIosArrowBack } from "react-icons/io";

import {
    ActionButtonsContainer,
    BackBtn,
    CompanyDetailsContainer,
    CompanyForm,
    CompanyTableDetailedViewContainer,
    CustomContainer,
    CustomInput,
    CustomLabel,
    FormTitle,
    InputField,
    UpdateBtn
} from "./StyledComponents";


export default function CompanyDetailedView(props) {
    const { match } = props
    const { params } = match
    const { id } = params

    const navigate = useNavigate()
    const [companyData, setCompanyData] = useState({
        companyName: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        phoneNo: '',
        faxNo: '',
        contactPerson: '',
        currency: '',
    })

    useEffect(() => {
        getCompanyData()
    }, [])

    const getCompanyData = async () => {
        const url = `http://localhost:3001/company/${id}`
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const data = await response.json()
        setCompanyData({
            companyName: data.company[0].company_name,
            street: data.company[0].street,
            city: data.company[0].city,
            state: data.company[0].state,
            postalCode: data.company[0].postal_code,
            phoneNo: data.company[0].phone_no,
            faxNo: data.company[0].fax_no,
            contactPerson: '',
            currency: data.company[0].currency,
        })
    }

    const onBackBtn = () => {
        navigate('/Companies')
    }

    const updateCompany = async (e) => {
        e.preventDefault()
        const url = `http://localhost:3001/company/update/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData)
        }
        const response = await fetch(url, options)
    }

    const onUpdateField = (fieldName, value) => {
        console.log(companyData)
        setCompanyData((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }))
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { openSettings } = value
                return (
                    <CompanyTableDetailedViewContainer>
                        <CompanyDetailsContainer>
                            <CustomContainer>

                                <CompanyForm onSubmit={updateCompany}>
                                    <BackBtn type="button" onClick={onBackBtn}><IoIosArrowBack size={35} /></BackBtn>
                                    <FormTitle>{companyData.companyName} Details</FormTitle>

                                    <InputField>
                                        <CustomLabel htmlFor="company-name">Company Name</CustomLabel>
                                        <CustomInput type="text" id='company-name' placeholder="Enter Company Name" onChange={(e) => { onUpdateField('companyName', e.target.value) }} value={companyData.companyName} />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor="street">Street</CustomLabel>
                                        <CustomInput type="text" id='street' placeholder="Street" onChange={(e) => { onUpdateField('street', e.target.value) }} value={companyData.street} />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor="city">City</CustomLabel>
                                        <CustomInput type="text" id='city' placeholder="City" onChange={(e) => { onUpdateField('city', e.target.value) }} value={companyData.city} />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor="State">State / Country</CustomLabel>
                                        <CustomInput type="text" id='state' placeholder="State" onChange={(e) => { onUpdateField('state', e.target.value) }} value={companyData.state} />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor="postal-code"> Postal Code</CustomLabel>
                                        <CustomInput type="text" id='postal-code' placeholder="Zip Code" onChange={(e) => { onUpdateField('postalCode', e.target.value) }} value={companyData.postalCode} />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor="phone-no">Phone No.</CustomLabel>
                                        <CustomInput type="tel" id='phone-no' format={'0-9{2}+ 0-9{10}'} onChange={(e) => { onUpdateField('phoneNo', e.target.value) }} value={companyData.phoneNo} />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor="fax-no">Fax No</CustomLabel>
                                        <CustomInput type="text" id='fax-no' placeholder="Fax No" onChange={(e) => { onUpdateField('faxNo', e.target.value) }} value={companyData.faxNo} />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor="contact-person">Contact Person</CustomLabel>
                                        <CustomInput type="text" id='contact-person' placeholder="Contact Person" value={companyData.contactPerson} />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor="currency">Currency</CustomLabel>
                                        <CustomInput type="text" id='currency' placeholder="Currency Type" onChange={(e) => { onUpdateField('currency', e.target.value) }} value={companyData.currency} />
                                    </InputField>

                                    <ActionButtonsContainer>
                                        <UpdateBtn type="submit" >Update <RxUpdate /></UpdateBtn>
                                    </ActionButtonsContainer>

                                </CompanyForm>

                            </CustomContainer>
                            {/* {openSettings ? <Settings /> : null} */}
                        </CompanyDetailsContainer>
                    </CompanyTableDetailedViewContainer>
                )
            }}
        </WonContext.Consumer>
    )
}