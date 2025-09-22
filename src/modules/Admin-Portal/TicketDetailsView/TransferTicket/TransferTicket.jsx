import Modal from 'react-modal'
import WonContext from '../../../../context/WonContext';
import { useState, useRef, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";

import { companyData } from '../../../../DataFile/DefaultDataFile';

import {
    TransferTicketContainer, TransferTicketHeader, Header, CloseBtn,
    BodyContainer, Field, LabelTag, CustomDropdownContainer, NewCustomDropDown,
    CustomDrpdownOptions, OptionsContainer, DropdownOptions, DropdownSearchBox,
    CustomContainer, TextAreaTag, BtnsContainer, Btn
} from './StyledComponents'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
        display: 'flex',
        padding: '10px'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Adjust the last value (0.5) for transparency */
    },
};

const TransferTicket = () => {
    const [isDepartmentOpen, setDepartmentOpen] = useState(false)
    const [departmentSearchTerm, setDepartmentSearchTerm] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const departmentOutsideClose = useRef(null)
    const [isCategoryOpen, setCategoryOpen] = useState(false)
    const [categorySearchTerm, setCategorySearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const categoryOutsideClose = useRef(null)
    const [isSubCategoryOpen, setSubCategoryOpen] = useState(false)
    const [SubcategorySearchTerm, setSubCategorySearchTerm] = useState('')
    const [selectedSubCategory, setSelectedSubCategory] = useState('')
    const subCategoryOutsideClose = useRef(null)
    const [isServiceOpen, setServiceOpen] = useState(false)
    const [ServiceSearchTerm, setServiceSearchTerm] = useState('')
    const [selectedService, setSelectedService] = useState('')
    const serviceOutsideClose = useRef(null)
    const [Description, setDescription] = useState('')
    const [attachment, setAttachment] = useState('')

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (departmentOutsideClose.current && !departmentOutsideClose.current.contains(event.target)) {
                setDepartmentOpen(false);
            }
            if (categoryOutsideClose.current && !categoryOutsideClose.current.contains(event.target)) {
                setCategoryOpen(false);
            }
            if (subCategoryOutsideClose.current && !subCategoryOutsideClose.current.contains(event.target)) {
                setSubCategoryOpen(false);
            }
            if (serviceOutsideClose.current && !serviceOutsideClose.current.contains(event.target)) {
                setServiceOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    const filteredDepartmentOptions = Object.keys(companyData).filter((each) => each.toLowerCase().includes(departmentSearchTerm.toLowerCase()))

    const filteredCategoryOptions = selectedDepartment && Object.keys(companyData[selectedDepartment])

    const filteredSubCategoryOptions = selectedDepartment && selectedCategory && Object.keys(companyData[selectedDepartment][selectedCategory])

    const filteredServiceOptions = selectedDepartment && selectedCategory && selectedSubCategory && companyData[selectedDepartment][selectedCategory][selectedSubCategory]

    const parts = attachment.split('\\')

    let fileName
    if (parts.length === 1) {
        fileName = attachment
    } else {
        fileName = parts[parts.length - 1]
    }

    console.log(attachment)

    return (
        <WonContext.Consumer>
            {value => {
                const { istransferTicketOpen, setTransferTicketOpen } = value;

                return (
                    <Modal style={customStyles} isOpen={istransferTicketOpen}>
                        <TransferTicketContainer>
                            <TransferTicketHeader>
                                <Header>Transfer Ticket</Header>
                                <CloseBtn onClick={setTransferTicketOpen} ><IoCloseOutline size={20} /></CloseBtn>
                            </TransferTicketHeader>

                            <BodyContainer>
                                <CustomContainer>
                                    <Field>
                                        <LabelTag>Department :</LabelTag>
                                        
                                        <CustomDropdownContainer ref={departmentOutsideClose}>
                                            <NewCustomDropDown onClick={() => setDepartmentOpen(!isDepartmentOpen)}>
                                                {selectedDepartment ? selectedDepartment : 'Select Department...'}
                                                <FaAngleDown style={{ transform: `rotate(${isDepartmentOpen ? '180deg' : '0deg'})` }} />
                                            </NewCustomDropDown>

                                            {isDepartmentOpen && (
                                                <CustomDrpdownOptions>
                                                    <DropdownSearchBox
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={departmentSearchTerm}
                                                        onChange={(e) => setDepartmentSearchTerm(e.target.value)}
                                                    />
                                                    
                                                    <OptionsContainer>
                                                        {filteredDepartmentOptions.map(option => (
                                                            <DropdownOptions
                                                                key={option}
                                                                data-option-value={option} // Attach a custom attribute
                                                                onClick={() => {
                                                                    setSelectedDepartment(option)
                                                                    setSelectedCategory('')
                                                                    setSelectedSubCategory('')
                                                                    setSelectedService('')
                                                                    setDepartmentOpen(false)
                                                                }}
                                                            >
                                                                {option}
                                                            </DropdownOptions>
                                                        ))}
                                                    </OptionsContainer>
                                                </CustomDrpdownOptions>
                                            )}
                                        </CustomDropdownContainer>
                                    </Field>

                                    <Field style={{ marginLeft: '10px' }}>
                                        <LabelTag>Category :</LabelTag>
                                        <CustomDropdownContainer ref={categoryOutsideClose}>
                                            <NewCustomDropDown onClick={() => setCategoryOpen(selectedDepartment && !isCategoryOpen)}>
                                                {selectedCategory ? selectedCategory : 'Select Category...'}
                                                <FaAngleDown style={{ transform: `rotate(${isCategoryOpen ? '180deg' : '0deg'})` }} />
                                            </NewCustomDropDown>

                                            {selectedDepartment && isCategoryOpen && (
                                                <CustomDrpdownOptions>
                                                    <DropdownSearchBox
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={categorySearchTerm}
                                                        onChange={(e) => setCategorySearchTerm(e.target.value)}
                                                    />
                                                    <OptionsContainer>
                                                        {filteredCategoryOptions.map(option => (
                                                            <DropdownOptions
                                                                key={option}
                                                                data-option-value={option} // Attach a custom attribute
                                                                onClick={() => {
                                                                    setSelectedCategory(option)
                                                                    setCategoryOpen(false)
                                                                }}
                                                            >
                                                                {option}
                                                            </DropdownOptions>
                                                        ))}
                                                    </OptionsContainer>
                                                </CustomDrpdownOptions>
                                            )}
                                        </CustomDropdownContainer>
                                    </Field>

                                </CustomContainer>

                                <CustomContainer>

                                    <Field>
                                        <LabelTag>Sub-Category :</LabelTag>
                                        <CustomDropdownContainer ref={subCategoryOutsideClose}>
                                            <NewCustomDropDown onClick={() => setSubCategoryOpen(selectedCategory && !isSubCategoryOpen)}>
                                                {selectedSubCategory ? selectedSubCategory : 'Select Sub-Category...'}
                                                <FaAngleDown style={{ transform: `rotate(${isSubCategoryOpen ? '180deg' : '0deg'})` }} />
                                            </NewCustomDropDown>

                                            {selectedDepartment && selectedCategory && isSubCategoryOpen && (
                                                <CustomDrpdownOptions>
                                                    <DropdownSearchBox
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={SubcategorySearchTerm}
                                                        onChange={(e) => setSubCategorySearchTerm(e.target.value)}
                                                    />
                                                    <OptionsContainer>
                                                        {filteredSubCategoryOptions.map(option => (
                                                            <DropdownOptions
                                                                key={option}
                                                                data-option-value={option} // Attach a custom attribute
                                                                onClick={() => {
                                                                    setSelectedSubCategory(option),
                                                                        setSubCategoryOpen(false)
                                                                }
                                                                }
                                                            >
                                                                {option}
                                                            </DropdownOptions>
                                                        ))}
                                                    </OptionsContainer>
                                                </CustomDrpdownOptions>
                                            )}
                                        </CustomDropdownContainer>
                                    </Field>

                                    <Field style={{ marginLeft: '10px' }}>
                                        <LabelTag>Service :</LabelTag>
                                        <CustomDropdownContainer ref={serviceOutsideClose}>
                                            <NewCustomDropDown onClick={() => setServiceOpen(selectedSubCategory && !isServiceOpen)}>
                                                {selectedService ? selectedService : 'Select Service...'}
                                                <FaAngleDown style={{ transform: `rotate(${isServiceOpen ? '180deg' : '0deg'})` }} />
                                            </NewCustomDropDown>

                                            {selectedSubCategory && isServiceOpen && (
                                                <CustomDrpdownOptions>
                                                    <DropdownSearchBox
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={ServiceSearchTerm}
                                                        onChange={(e) => setServiceSearchTerm(e.target.value)}
                                                    />
                                                    <OptionsContainer>
                                                        {filteredServiceOptions.map(option => (
                                                            <DropdownOptions
                                                                key={option}
                                                                data-option-value={option} // Attach a custom attribute
                                                                onClick={() => {
                                                                    setSelectedService(option)
                                                                    setServiceOpen(false)
                                                                }}
                                                            >
                                                                {option}
                                                            </DropdownOptions>
                                                        ))}
                                                    </OptionsContainer>
                                                </CustomDrpdownOptions>
                                            )}
                                        </CustomDropdownContainer>
                                    </Field>

                                </CustomContainer>

                                <div style={{ height: '50%' }}>
                                    <TextAreaTag rows={10} placeholder='Description...' value={Description} onChange={(e) => setDescription(e.target.value)} />
                                </div>

                                <BtnsContainer>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Btn style={{ display: 'flex', background: '#fff', color: '#5f7470', border: '1px solid', padding: '4px' }}>
                                            <label htmlFor='uploadFile'><HiOutlineUpload size={18} style={{ padding: '0px' }} /> Upload </label>
                                            <input id='uploadFile' name="attachment" type='file' style={{ display: 'none' }} onChange={(e) => setAttachment(e.target.value)} />
                                        </Btn>
                                        {attachment && <p style={{ color: '#02c39a' }}>{attachment.split(`\\`).pop().substr(0, 20)} </p>}

                                    </div>
                                    <div>
                                        <Btn onClick={setTransferTicketOpen} style={{ background: '#fff', color: '#d81159', border: '1px solid' }}>Cancel</Btn>
                                        <Btn style={{ background: '#f1f1', color: '#1dd3b0', border: '1px solid' }}>Transfer Ticket</Btn>
                                    </div>
                                </BtnsContainer>
                            </BodyContainer>
                        </TransferTicketContainer>
                    </Modal>
                )
            }}
        </WonContext.Consumer>
    )

}

export default TransferTicket