import { v4 as uuidv4 } from "uuid";

//BUTTONS DATA
export const buttonsDataFields = [
    {
        id: "1",
        type: 'button',
        Task: "Email",
        Due_Date: "25-May-2020",
        details: {
            name: 'Email',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for send mail.',
        },
        isDefault: true
    },
    {
        id: "2",
        type: 'button',
        Task: "Save",
        Due_Date: "26-May-2020",
        details: {
            name: 'Save',
            type: 'Button',
            icon: 'https://www.flaticon.com/free-icon/diskette_2874050?term=save&page=1&position=9&origin=search&related_id=2874050',
            description: 'This field is for Save Form Content.',
        },
        isDefault: true
    },
    {
        id: "3",
        type: 'button',
        Task: "Update",
        Due_Date: "27-May-2020",
        details: {
            name: 'Update',
            type: 'Button',
            icon: 'https://www.flaticon.com/free-icon/refresh_2546743?term=update&page=1&position=2&origin=search&related_id=2546743',
            description: 'This field is for Update Form Content.',
        },
        isDefault: true
    },
    {
        id: "4",
        type: 'button',
        Task: "Transfer Ticket",
        Due_Date: "23-Aug-2020",
        details: {
            name: 'Transfer Ticket',
            type: 'Button',
            icon: 'https://www.flaticon.com/free-icon/payment_4251243?term=ticket+transfer&page=1&position=2&origin=search&related_id=4251243',
            description: 'This field is for transfer the ticket.',
        },
        isDefault: true
    },

    {
        id: "5",
        type: 'button',
        Task: "Pay Now",
        Due_Date: "25-May-2020",
        details: {
            name: 'Pay Now',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for payment.',
        },
        isDefault: true
    },
    {
        id: "6",
        type: 'button',
        Task: "Subscribe",
        Due_Date: "25-May-2020",
        details: {
            name: 'Subscribe',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for Subscribe.',
        },
        isDefault: true
    },
    {
        id: "7",
        type: 'button',
        Task: "Read More",
        Due_Date: "25-May-2020",
        details: {
            name: 'Read More',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for Know More.',
        },
        isDefault: true
    },
    {
        id: "8",
        type: 'button',
        Task: "Attchment",
        Due_Date: "25-May-2020",
        details: {
            name: 'Attachment',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for attach files.',
        },
        isDefault: true
    },

    {
        id: "9",
        type: 'button',
        Task: "Submit",
        Due_Date: "25-May-2020",
        details: {
            name: 'Submit',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for Submit.',
        },
        isDefault: true
    },

    {
        id: "10",
        type: 'button',
        Task: "Add to Cart",
        Due_Date: "25-May-2020",
        details: {
            name: 'Add To Cart',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for Adding the Item to cart.',
        },
        isDefault: true
    },

    {
        id: "11",
        type: 'button',
        Task: "Clone",
        Due_Date: "25-May-2020",
        details: {
            name: 'Clone',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for cloning.',
        },
        isDefault: true
    },

    {
        id: "12",
        type: 'button',
        Task: "Print",
        Due_Date: "25-May-2020",
        details: {
            name: 'Print',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for print the page.',
        },
        isDefault: true
    },
    {
        id: "13",
        type: 'button',
        Task: "Download",
        Due_Date: "25-May-2020",
        details: {
            name: 'Download',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for download content.',
        },
        isDefault: true
    },
    {
        id: "14",
        type: 'button',
        Task: "Publish",
        Due_Date: "25-May-2020",
        details: {
            name: 'Publish',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for publishing the content.',
        },
        isDefault: true
    },
    {
        id: "15",
        type: 'Retaire',
        Task: "Email",
        Due_Date: "25-May-2020",
        details: {
            name: 'Retaire',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for Retaire.',
        },
        isDefault: true
    },
    {
        id: "16",
        type: 'button',
        Task: "Run",
        Due_Date: "25-May-2020",
        details: {
            name: 'Run',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is Run.',
        },
        isDefault: true
    },
]

export const buttonsData = {
    [uuidv4()]: {
        title: "Buttons",
        items: buttonsDataFields,
    },
    [uuidv4()]: {
        title: "Drop Button Here",
        items: []
    }
}

export const catalogButtons = [
    {
        id: "1",
        type: 'button',
        Task: "Email",
        Due_Date: "25-May-2020",
        details: {
            name: 'Email',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for send mail.',
        },
        isDefault: true
    },
    {
        id: "3",
        type: 'button',
        Task: "Update",
        Due_Date: "27-May-2020",
        details: {
            name: 'Update',
            type: 'Button',
            icon: 'https://www.flaticon.com/free-icon/refresh_2546743?term=update&page=1&position=2&origin=search&related_id=2546743',
            description: 'This field is for Update Form Content.',
        },
        isDefault: true
    },
    {
        id: "4",
        type: 'button',
        Task: "Transfer Ticket",
        Due_Date: "23-Aug-2020",
        details: {
            name: 'Transfer Ticket',
            type: 'Button',
            icon: 'https://www.flaticon.com/free-icon/payment_4251243?term=ticket+transfer&page=1&position=2&origin=search&related_id=4251243',
            description: 'This field is for transfer the ticket.',
        },
        isDefault: true
    },

    {
        id: "5",
        type: 'button',
        Task: "Pay Now",
        Due_Date: "25-May-2020",
        details: {
            name: 'Pay Now',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for payment.',
        },
        isDefault: true
    },
    {
        id: "6",
        type: 'button',
        Task: "Subscribe",
        Due_Date: "25-May-2020",
        details: {
            name: 'Subscribe',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for Subscribe.',
        },
        isDefault: true
    },
    {
        id: "7",
        type: 'button',
        Task: "Read More",
        Due_Date: "25-May-2020",
        details: {
            name: 'Read More',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for Know More.',
        },
        isDefault: true
    },
    {
        id: "8",
        type: 'button',
        Task: "Attchment",
        Due_Date: "25-May-2020",
        details: {
            name: 'Attachment',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for attach files.',
        },
        isDefault: true
    },

    {
        id: "9",
        type: 'button',
        Task: "Submit",
        Due_Date: "25-May-2020",
        details: {
            name: 'Submit',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for Submit.',
        },
        isDefault: true
    },

    {
        id: "10",
        type: 'button',
        Task: "Add to Cart",
        Due_Date: "25-May-2020",
        details: {
            name: 'Add To Cart',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for Adding the Item to cart.',
        },
        isDefault: true
    },

    {
        id: "11",
        type: 'button',
        Task: "Clone",
        Due_Date: "25-May-2020",
        details: {
            name: 'Clone',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for cloning.',
        },
        isDefault: true
    },

    {
        id: "12",
        type: 'button',
        Task: "Print",
        Due_Date: "25-May-2020",
        details: {
            name: 'Print',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for print the page.',
        },
        isDefault: true
    },
    {
        id: "13",
        type: 'button',
        Task: "Download",
        Due_Date: "25-May-2020",
        details: {
            name: 'Download',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for download content.',
        },
        isDefault: true
    },
    {
        id: "14",
        type: 'button',
        Task: "Publish",
        Due_Date: "25-May-2020",
        details: {
            name: 'Publish',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for publishing the content.',
        },
        isDefault: true
    },
    {
        id: "15",
        type: 'Retaire',
        Task: "Email",
        Due_Date: "25-May-2020",
        details: {
            name: 'Retaire',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is for Retaire.',
        },
        isDefault: true
    },
    {
        id: "16",
        type: 'button',
        Task: "Run",
        Due_Date: "25-May-2020",
        details: {
            name: 'Run',
            type: 'button',
            icon: 'https://www.flaticon.com/free-icon/email_542689?term=email&page=1&position=2&origin=search&related_id=542689',
            description: 'This Button is Run.',
        },
        isDefault: true
    },
]

export const catalogButtonsData = {
    [uuidv4()]: {
        title: "Buttons",
        items: catalogButtons,
    },
    [uuidv4()]: {
        title: "Drop Button Here",
        items: [{
            id: "2",
            type: 'button',
            Task: "Save",
            Due_Date: "26-May-2020",
            details: {
                name: 'Save',
                type: 'Button',
                icon: 'https://www.flaticon.com/free-icon/diskette_2874050?term=save&page=1&position=9&origin=search&related_id=2874050',
                description: 'This field is for Save Form Content.',
            },
            isDefault: true
        },]
    }
}

// additional Fields

export const additionalFields = [
    {
        id: "1",
        type: 'field',
        Task: "Name",
        Due_Date: "25-May-2020",
        details: {
            name: 'Name',
            type: 'text',
            length: '200',
            required: true,
            placeholder: 'Enter Name...',
            description: 'This field is for enter your name in the input field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "2",
        type: 'field',
        Task: "Department",
        Due_Date: "26-May-2020",
        details: {
            name: 'Department',
            type: 'select',
            length: '100',
            required: true,
            placeholder: 'Enter Department...',
            description: 'This field is for select your department name in the dropdown.',
            options: ['HR', 'TR', 'Financial', "Business"],
        },
        isDefault: true
    },
    {
        id: "3",
        type: 'field',
        Task: "Organisation",
        Due_Date: "27-May-2020",
        details: {
            name: 'Organisation',
            type: 'select',
            length: '100',
            required: true,
            placeholder: 'Enter Organisation...',
            description: 'This field is for select your Organisation name in the select field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "4",
        type: 'field',
        Task: "Contact Details",
        Due_Date: "23-Aug-2020",
        details: {
            name: 'Contact Details',
            type: 'text',
            length: '500',
            required: true,
            placeholder: 'Enter Contact details...',
            description: 'This field is for enter your contact info in the input field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "5",
        type: 'field',
        Task: "Description",
        Due_Date: "25-May-2020",
        details: {
            name: 'Description',
            type: 'text',
            length: '500',
            required: true,
            placeholder: 'Enter Description...',
            description: 'This field is for write description for the form.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "6",
        type: 'field',
        Task: "CustomField 1",
        Due_Date: "25-May-2020",
        details: {
            name: 'Custom Field 1',
            type: 'select',
            length: '200',
            required: true,
            placeholder: 'Enter CustomField1...',
            description: 'This field is for enter your CustomField in the input field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "7",
        type: 'field',
        Task: "CustomField 2",
        Due_Date: "26-May-2020",
        details: {
            name: 'Custom Field 2',
            type: 'select',
            length: '200',
            required: true,
            placeholder: 'Enter CustomField2...',
            description: 'This field is for enter your CustomField in the input field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "8",
        type: 'field',
        Task: "CustomField 3",
        Due_Date: "27-May-2020",
        details: {
            name: 'Custom Field 3',
            type: 'text',
            length: '200',
            required: true,
            placeholder: 'Enter CustomField3...',
            description: 'This field is for enter your CustomField in the input field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "9",
        type: 'field',
        Task: "CustomField 4",
        Due_Date: "23-Aug-2020",
        details: {
            name: 'Custom Fieald 4',
            type: 'text',
            length: '200',
            required: true,
            placeholder: 'Enter CustomField4...',
            description: 'This field is for enter your CustomField in the input field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "10",
        type: 'field',
        Task: "CustomField 5",
        Due_Date: "25-May-2020",
        details: {
            name: 'Custom Fieald 5',
            type: 'text',
            length: '200',
            required: true,
            placeholder: 'Enter CustomField5...',
            description: 'This field is for enter your CustomField in the input field.',
            options: [],
        },
        isDefault: true
    },

    {
        id: "11",
        type: 'field',
        Task: "CustomField 1",
        Due_Date: "25-May-2020",
        details: {
            name: 'Custom Field 1',
            type: 'select',
            length: '200',
            required: true,
            placeholder: 'Enter CustomField1...',
            description: 'This field is for enter your CustomField in the input field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "12",
        type: 'field',
        Task: "CustomField 2",
        Due_Date: "26-May-2020",
        details: {
            name: 'Custom Field 2',
            type: 'select',
            length: '200',
            required: true,
            placeholder: 'Enter CustomField2...',
            description: 'This field is for enter your CustomField in the input field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "13",
        type: 'field',
        Task: "CustomField 3",
        Due_Date: "27-May-2020",
        details: {
            name: 'Custom Field 3',
            type: 'select',
            length: '200',
            required: true,
            placeholder: 'Enter CustomField3...',
            description: 'This field is for enter your CustomField in the input field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "14",
        type: 'field',
        Task: "CustomField 4",
        Due_Date: "23-Aug-2020",
        details: {
            name: 'Custom Fieald 4',
            type: 'text',
            length: '200',
            required: true,
            placeholder: 'Enter CustomField4...',
            description: 'This field is for enter your CustomField in the input field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "15",
        type: 'field',
        Task: "CustomField 5",
        Due_Date: "25-May-2020",
        details: {
            name: 'Custom Fieald 5',
            type: 'text',
            length: '200',
            required: true,
            placeholder: 'Enter CustomField5...',
            description: 'This field is for enter your CustomField in the input field.',
            options: [],
        },
        isDefault: true
    },
]

export const additionalFieldsData = {
    [uuidv4()]: {
        title: "Additional Fields",
        items: additionalFields,
    },
    [uuidv4()]: {
        title: "Drop Field Here",
        items: []
    }
}

export const additionalCatalogFields = [                   //CATALOG FORM FIELDS
    {
        id: "9",
        type: 'field',
        Task: "Department",
        Due_Date: "26-May-2020",
        details: {
            name: 'Department',
            type: 'select',
            length: '100',
            required: true,
            placeholder: 'Enter Department...',
            description: 'This field is for select your department name in the dropdown.',
            options: ['HR', 'TR', 'Financial', "Business"],
        },
        isDefault: true
    },
    {
        id: "10",
        type: 'field',
        Task: "Organisation",
        Due_Date: "27-May-2020",
        details: {
            name: 'Organisation',
            type: 'select',
            length: '100',
            required: true,
            placeholder: 'Enter Organisation...',
            description: 'This field is for select your Organisation name in the select field.',
            options: [],
        },
        isDefault: true
    },
    {
        id: "11",
        type: 'field',
        Task: "Contact Details",
        Due_Date: "23-Aug-2020",
        details: {
            name: 'Contact Details',
            type: 'text',
            length: '500',
            required: true,
            placeholder: 'Enter Contact details...',
            description: 'This field is for enter your contact info in the input field.',
            options: [],
        },
        isDefault: true
    },

]

export const additionalCatalogFieldsData = {                     //CATALOG FORM DATA
    [uuidv4()]: {
        title: "Additional Fields",
        items: additionalCatalogFields,
    },
    [uuidv4()]: {
        title: "Drop Field Here",
        items: [
            {
                "id": "1",
                "type": "field",
                "Task": "Name",
                "Due_Date": "25-May-2020",
                "details": {
                    "name": "Name",
                    "type": "text",
                    "length": "200",
                    "required": true,
                    "placeholder": "Enter Name...",
                    "description": "This field is for enter your name in the input field.",
                    "options": []
                },
                isDefault: true
            },
            {
                "id": "2",
                "type": "field",
                "Task": "On Behalf Of",
                "Due_Date": "25-May-2020",
                "details": {
                    "name": "On Behalf Of",
                    "type": "text",
                    "length": "500",
                    "required": true,
                    "placeholder": "Enter on Who`s behalf you`re raising this ticket...",
                    "description": "This field is for write on Who`s behalf you`re raising this ticket for the form.",
                    "options": []
                },
                isDefault: true
            },
            {
                "id": "3",
                "type": "field",
                "Task": "Category",
                "Due_Date": "25-May-2020",
                "details": {
                    "name": "Category",
                    "type": "select",
                    "length": "500",
                    "required": true,
                    "placeholder": "Select Category...",
                    "description": "This field is for write Category for the form.",
                    "options": []
                },
                isDefault: true
            },
            {
                "id": "4",
                "type": "field",
                "Task": "Sub Category",
                "Due_Date": "25-May-2020",
                "details": {
                    "name": "Sub Category",
                    "type": "select",
                    "length": "500",
                    "required": true,
                    "placeholder": "Select Sub Category...",
                    "description": "This field is for write Sub Category for the form.",
                    "options": []
                },
                isDefault: true
            },
            {
                "id": "5",
                "type": "field",
                "Task": "Short Description",
                "Due_Date": "25-May-2020",
                "details": {
                    "name": "Short Description",
                    "type": "TextArea",
                    "length": "500",
                    "required": true,
                    "placeholder": "Enter Description...",
                    "description": "This field is for write description for the form.",
                    "options": []
                },
                isDefault: true
            },
            {
                "id": "6",
                "type": "field",
                "Task": "Description",
                "Due_Date": "25-May-2020",
                "details": {
                    "name": "Description",
                    "type": "TextArea",
                    "length": "500",
                    "required": true,
                    "placeholder": "Select Task Type...",
                    "description": "This field is for write Select Task Type for the form.",
                    "options": []
                },
                isDefault: true
            },
            {
                "id": "7",
                "type": "field",
                "Task": "Attachment",
                "Due_Date": "25-May-2020",
                "details": {
                    "name": "Attachment",
                    "type": "File Attachment",
                    "length": "500",
                    "required": true,
                    "placeholder": "Choose File Attachment...",
                    "description": "This field is for write Select File Attachment for the form.",
                    "options": []
                },
                isDefault: true
            },
            {
                "id": "8",
                "type": "field",
                "Task": "Task Type",
                "Due_Date": "25-May-2020",
                "details": {
                    "name": "Task Type",
                    "type": "select",
                    "length": "500",
                    "required": true,
                    "placeholder": "Select Task Type...",
                    "description": "This field is for write Select Task Type for the form.",
                    "options": []
                },
                isDefault: true
            }
        ]
    }
}

// tabs data

export const tabsData = [
    {
        id: "1",
        type: 'tab',
        Task: "History",
        Due_Date: "25-May-2020",
        details: {
            name: 'History',
            type: 'table',
            referenceTables: [
                {
                    id: uuidv4(),
                    name: 'Users',
                    selected: true,
                },
                {
                    id: uuidv4(),
                    name: 'Groups',
                    selected: true,
                },
                {
                    id: uuidv4(),
                    name: 'Tickets',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'CMDB',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Locations',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Companies',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Departments',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Notifications',
                    selected: false,
                },
            ],
            filter: [
                {
                    id: uuidv4(),
                    name: 'userId',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'departmentId',
                    referenceTable: 'roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'priority',
                    referenceTable: 'ticket',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'state',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'city',
                    referenceTable: 'notification',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'age',
                    referenceTable: 'department',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'name',
                    referenceTable: 'cmdb',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'managerName',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'parentGroup',
                    referenceTable: 'groups',
                    selected: false,
                },
            ],
            configureFields: [
                {
                    id: uuidv4(),
                    name: 'userId',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'departmentId',
                    referenceTable: 'roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'priority',
                    referenceTable: 'ticket',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'state',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'city',
                    referenceTable: 'notification',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'age',
                    referenceTable: 'department',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'name',
                    referenceTable: 'cmdb',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'managerName',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'parentGroup',
                    referenceTable: 'groups',
                    selected: false,
                },
            ],
            length: '20',
            description: 'This tab is for History ',
        },
        isDefault: true
    },
    {
        id: "2",
        type: 'tab',
        Task: "Attachment",
        Due_Date: "26-May-2020",
        details: {
            name: 'Attachments',
            type: 'table',
            referenceTables: [
                {
                    id: uuidv4(),
                    name: 'Users',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Groups',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Tickets',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'CMDB',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Locations',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Companies',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Departments',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Notifications',
                    selected: false,
                },
            ],
            filter: [
                {
                    id: uuidv4(),
                    name: 'userId',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'departmentId',
                    referenceTable: 'roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'priority',
                    referenceTable: 'ticket',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'state',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'city',
                    referenceTable: 'notification',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'age',
                    referenceTable: 'department',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'name',
                    referenceTable: 'cmdb',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'managerName',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'parentGroup',
                    referenceTable: 'groups',
                    selected: false,
                },
            ],
            configureFields: [
                {
                    id: uuidv4(),
                    name: 'userId',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'departmentId',
                    referenceTable: 'roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'priority',
                    referenceTable: 'ticket',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'state',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'city',
                    referenceTable: 'notification',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'age',
                    referenceTable: 'department',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'name',
                    referenceTable: 'cmdb',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'managerName',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'parentGroup',
                    referenceTable: 'groups',
                    selected: false,
                },
            ],
            length: '20',
            description: 'This tab is for Attachment ',
        },
        isDefault: true
    },
    {
        id: "3",
        type: 'tab',
        Task: "Child Tickets",
        Due_Date: "27-May-2020",
        details: {
            name: 'Child Tickets',
            type: 'table',
            referenceTables: [
                {
                    id: uuidv4(),
                    name: 'Users',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Groups',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Tickets',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'CMDB',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Locations',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Companies',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Departments',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Notifications',
                    selected: false,
                },
            ],
            filter: [
                {
                    id: uuidv4(),
                    name: 'userId',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'departmentId',
                    referenceTable: 'roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'priority',
                    referenceTable: 'ticket',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'state',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'city',
                    referenceTable: 'notification',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'age',
                    referenceTable: 'department',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'name',
                    referenceTable: 'cmdb',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'managerName',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'parentGroup',
                    referenceTable: 'groups',
                    selected: false,
                },
            ],
            configureFields: [
                {
                    id: uuidv4(),
                    name: 'userId',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'departmentId',
                    referenceTable: 'roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'priority',
                    referenceTable: 'ticket',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'state',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'city',
                    referenceTable: 'notification',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'age',
                    referenceTable: 'department',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'name',
                    referenceTable: 'cmdb',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'managerName',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'parentGroup',
                    referenceTable: 'groups',
                    selected: false,
                },
            ],
            length: '30',
            description: 'This tab is for Child Tickets ',
        },
        isDefault: true
    },
    {
        id: "4",
        type: 'tab',
        Task: "Details",
        Due_Date: "23-Aug-2020",
        details: {
            name: 'Details',
            type: 'form',
            referenceTables: [
                {
                    id: uuidv4(),
                    name: 'Users',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Groups',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Tickets',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'CMDB',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Locations',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Companies',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Departments',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Notifications',
                    selected: false,
                },
            ],
            filter: [
                {
                    id: uuidv4(),
                    name: 'userId',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'departmentId',
                    referenceTable: 'roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'priority',
                    referenceTable: 'ticket',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'state',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'city',
                    referenceTable: 'notification',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'age',
                    referenceTable: 'department',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'name',
                    referenceTable: 'cmdb',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'managerName',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'parentGroup',
                    referenceTable: 'groups',
                    selected: false,
                },
            ],
            configureFields: [
                {
                    id: uuidv4(),
                    name: 'userId',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'departmentId',
                    referenceTable: 'roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'priority',
                    referenceTable: 'ticket',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'state',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'city',
                    referenceTable: 'notification',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'age',
                    referenceTable: 'department',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'name',
                    referenceTable: 'cmdb',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'managerName',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'parentGroup',
                    referenceTable: 'groups',
                    selected: false,
                },
            ],
            length: '20',
            description: 'This tab is for Details ',
        },
        isDefault: true
    },
    {
        id: "5",
        type: 'tab',
        Task: "Related Records",
        Due_Date: "25-May-2020",
        details: {
            name: 'Related Records',
            type: 'table',
            referenceTables: [
                {
                    id: uuidv4(),
                    name: 'Users',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Groups',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Tickets',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'CMDB',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Locations',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Companies',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Departments',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'Notifications',
                    selected: false,
                },
            ],
            filter: [
                {
                    id: uuidv4(),
                    name: 'userId',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'departmentId',
                    referenceTable: 'roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'priority',
                    referenceTable: 'ticket',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'state',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'city',
                    referenceTable: 'notification',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'age',
                    referenceTable: 'department',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'name',
                    referenceTable: 'cmdb',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'managerName',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'parentGroup',
                    referenceTable: 'groups',
                    selected: false,
                },
            ],
            configureFields: [
                {
                    id: uuidv4(),
                    name: 'userId',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'departmentId',
                    referenceTable: 'roles',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'priority',
                    referenceTable: 'ticket',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'state',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'city',
                    referenceTable: 'notification',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'age',
                    referenceTable: 'department',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'name',
                    referenceTable: 'cmdb',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'managerName',
                    referenceTable: 'user',
                    selected: false,
                },
                {
                    id: uuidv4(),
                    name: 'parentGroup',
                    referenceTable: 'groups',
                    selected: false,
                },
            ],
            length: '20',
            description: 'This tab is for Related Records ',
        },
        isDefault: true
    },
]

export const TabColumnsFromBackend = {
    [uuidv4()]: {
        title: "Tabs",
        items: tabsData,
    },
    [uuidv4()]: {
        title: "Drop Tab Here",
        items: []
    }
}



export const dataTypeOptions = [
    'Annotation',
    'Audio',
    'Calendar Date/Time',
    'Chart',
    'Choice',
    'Currency',
    'Data Structure',
    'Date',
    'Date/Time',
    'Decimal',
    'Due Date',
    'Duration',
    'Field Name',
    'File Attachment',
    'Floating Point Number',
    'FX Currency',
    'Geo Point',
    'HTML',
    'Icon',
    'Insert Timestamp',
    'Integer',
    'IP Address (Validated IPV4, IPV6)',
    'Joumal',
    'Language',
    'List',
    'Long',
    'Name-Value Pairs',
    'NDS Icon',
    'number',
    'Price',
    'Reference',
    'Select',
    'String',
    'String (Full UTF-8)',
    'text',
    'TextArea',
    'Table Name',
    'Time',
    'Translated Text',
    'True/False',
    'URL',
    'UTC Time',
    'Wiki'
];