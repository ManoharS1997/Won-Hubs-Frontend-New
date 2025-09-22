import { v4 as uuid } from 'uuid'


export const Dummy_views_list = [
    {
        view: 'desktop',
        imgUrl: 'https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/yuy9ktfwjnkbltfuv1lc'
    },
    {
        view: 'tab',
        imgUrl: 'https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/ziyb0vmt6rujycohnljz'
    },
    {
        view: 'mobile',
        imgUrl: 'https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/qdzipxrptmua9vrqvqxs'
    },
    {
        view: 'sms',
        imgUrl: 'https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/iin4ndjfsjkmzprjljfq'
    }
]

export const AnnouncementData = [
    { id: '1', Date: '2023-02-20', Announcement: "Employee engagement program conducted by HR team" },
    { id: '2', Date: '2023-02-12', Announcement: "Fire event mock drill across the company building for emergency training. The office will be evacuated and employees will be taken to the common area as part of training" },
    { id: '3', Date: '2000-08-16', Announcement: "Upcoming downtime for updating server" },
    { id: '4', Date: '2023-03-16', Announcement: "New project kick-off meeting scheduled for next week. Team members are expected to attend for project details and allocation of tasks" },
    { id: '5', Date: '2002-05-10', Announcement: "Reminder: Company-wide diversity and inclusion workshop on Monday. All employees are encouraged to participate and contribute to the discussion" },
    { id: '6', Date: '2023-03-26', Announcement: "Congratulations to the sales team for achieving the quarterly targets. A team celebration will be organized on Friday in the office cafeteria" },
    { id: '7', Date: '2022-08-13', Announcement: "IT system maintenance planned for the weekend. Expect intermittent downtime on Saturday for system upgrades" },
    { id: '8', Date: '2023-09-14', Announcement: "Reminder: Annual performance reviews scheduled for next month. Managers, please ensure your team members are prepared for the evaluations" },
    { id: '9', Date: '2023-05-27', Announcement: "Company-wide health and wellness day on Thursday. Yoga and meditation sessions will be conducted in the office premises. Participation is encouraged" },
    { id: '10', Date: '2024-10-14', Announcement: "Holiday office party details finalized. Save the date for a festive celebration on Friday evening at the company's event hall" },
    { id: '11', Date: '2022-10-29', Announcement: "IT security awareness training on Wednesday. All employees are required to attend to enhance cybersecurity knowledge and practices" },
    { id: '12', Date: '2019-04-23', Announcement: "Launch of the new company website. Check your emails for details and updates on the improved features and functionalities" },
    { id: '13', Date: '2009-03-20', Announcement: "Reminder: Bi-monthly team-building activity on Friday afternoon. Team leads, please coordinate with your members for active participation" },
    { id: '14', Date: '2018-01-18', Announcement: "Company-wide survey on workplace satisfaction. Your feedback is crucial for continuous improvement. Look out for the survey link in your inbox" },
    { id: '15', Date: '1999-08-05', Announcement: "Welcome aboard to our new hires joining next week. Let's extend a warm welcome and support them in their onboarding process" },
    { id: '16', Date: '2004-12-24', Announcement: "Quarterly financial results meeting scheduled for Tuesday. Finance team, please ensure all necessary reports are prepared and submitted" },
    { id: '17', Date: '2022-12-06', Announcement: "Holiday office closure from December 24th to January 1st for the year-end break. Wishing everyone a joyful holiday season" },
    { id: '18', Date: '2013-08-31', Announcement: "Kick-off meeting for the innovation challenge. Teams interested in participating, please submit your proposals by the end of the month" },
    { id: '19', Date: '2025-03-15', Announcement: "Reminder: Company-wide blood donation drive on Friday. Your participation can make a difference in someone's life" },
    { id: '20', Date: '2025-09-20', Announcement: "Upcoming leadership training workshop for managers. Details and schedule will be shared soon. Managers, please block your calendars accordingly" },
];

export const ArticlesContent = [
    { id: '1', name: "Steps to setup a new laptop hardware", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "22-02-2023", Publisher: 'Micheal' },
    { id: '2', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "12-02-2023", Publisher: 'James' },
    { id: '3', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "17-02-2023", Publisher: 'John' },
    { id: '4', name: "Steps to setup a new laptop hardware", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "22-02-2023", Publisher: 'Micheal' },
    { id: '5', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "12-02-2023", Publisher: 'James' },
    { id: '6', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "17-02-2023", Publisher: 'John' }
]

export const FavouritesData = [
    {
        id: 1,
        favorite: true,
        department: 'IT',
        priority: 'High',
        assignedTo: 'John Doe',
        status: 'In Progress',
        category: 'tickets',
    },
    {
        id: 2,
        favorite: true,
        department: 'Marketing',
        priority: 'Medium',
        assignedTo: 'Jane Smith',
        status: 'Pending',
        category: 'groups',
    },
    {
        id: 3,
        favorite: true,
        department: 'HR',
        priority: 'Low',
        assignedTo: 'Bob Johnson',
        status: 'Completed',
        category: 'issues',
    },
    {
        id: 4,
        favorite: true,
        department: 'Finance',
        priority: 'High',
        assignedTo: 'Alice Williams',
        status: 'In Progress',
        category: 'tickets',
    },
    {
        id: 5,
        favorite: true,
        department: 'Sales',
        priority: 'Medium',
        assignedTo: 'Charlie Brown',
        status: 'Pending',
        category: 'groups',
    },
    {
        id: 6,
        favorite: true,
        department: 'Operations',
        priority: 'Low',
        assignedTo: 'David Miller',
        status: 'Completed',
        category: 'issues',
    },
    {
        id: 7,
        favorite: true,
        department: 'Customer Support',
        priority: 'High',
        assignedTo: 'Eva Davis',
        status: 'In Progress',
        category: 'tickets',
    },
    {
        id: 8,
        favorite: true,
        department: 'Product Development',
        priority: 'Medium',
        assignedTo: 'Frank Wilson',
        status: 'Pending',
        category: 'groups',
    },
    {
        id: 9,
        favorite: true,
        department: 'Quality Assurance',
        priority: 'Low',
        assignedTo: 'Grace Thompson',
        status: 'Completed',
        category: 'issues',
    },
    {
        id: 10,
        favorite: true,
        department: 'Research and Development',
        priority: 'High',
        assignedTo: 'Henry Jones',
        status: 'In Progress',
        category: 'tickets',
    },
    {
        id: 11,
        favorite: true,
        department: 'Sales',
        priority: 'Medium',
        assignedTo: 'Charlie Brown',
        status: 'Pending',
        category: 'groups',
    },
    {
        id: 12,
        favorite: true,
        department: 'Operations',
        priority: 'Low',
        assignedTo: 'David Miller',
        status: 'Completed',
        category: 'issues',
    },
    {
        id: 13,
        favorite: true,
        department: 'Customer Support',
        priority: 'High',
        assignedTo: 'Eva Davis',
        status: 'In Progress',
        category: 'tickets',
    },
    {
        id: 14,
        favorite: true,
        department: 'Product Development',
        priority: 'Medium',
        assignedTo: 'Frank Wilson',
        status: 'Pending',
        category: 'groups',
    },
    {
        id: 15,
        favorite: true,
        department: 'Quality Assurance',
        priority: 'Low',
        assignedTo: 'Grace Thompson',
        status: 'Completed',
        category: 'issues',
    },
    {
        id: 16,
        favorite: true,
        department: 'Research and Development',
        priority: 'High',
        assignedTo: 'Henry Jones',
        status: 'In Progress',
        category: 'tickets',
    },
];

export const FeedbackData = [
    {
        "id": 1,
        "department": "Customer Service",
        "feedbackText": "Excellent service! The representative was very helpful and resolved my issue quickly.",
        "rating": 5
    },
    {
        "id": 2,
        "department": "Technical Support",
        "feedbackText": "Had some issues with my device, but the technical support team guided me through the troubleshooting steps. Problem solved!",
        "rating": 4
    },
    {
        "id": 3,
        "department": "Product Development",
        "feedbackText": "Love the new features in the latest update. The user interface is much more intuitive.",
        "rating": 5
    },
    {
        "id": 4,
        "department": "Billing",
        "feedbackText": "Billing process is confusing. It would be great to have a more user-friendly system.",
        "rating": 2
    },
    {
        "id": 5,
        "department": "Sales",
        "feedbackText": "The sales representative was knowledgeable and answered all my questions. However, the pricing could be more competitive.",
        "rating": 3
    },
    {
        "id": 6,
        "department": "Technical Support",
        "feedbackText": "Quick response and efficient resolution to my technical issue. Very satisfied with the support team's service.",
        "rating": 5
    },
    {
        "id": 7,
        "department": "Product Development",
        "feedbackText": "The latest update introduced some bugs, and the overall experience has been affected. Hope these issues get resolved soon.",
        "rating": 3
    },
    {
        "id": 8,
        "department": "Customer Service",
        "feedbackText": "Had a billing inquiry, and the customer service representative was patient and assisted me until the issue was clarified. Great service!",
        "rating": 4
    },
    {
        "id": 9,
        "department": "Sales",
        "feedbackText": "The sales process was smooth, and the representative provided all necessary information. However, the delivery time was longer than expected.",
        "rating": 3
    },
    {
        "id": 10,
        "department": "Billing",
        "feedbackText": "Improved billing system! The new interface is user-friendly and makes it easier to understand charges.",
        "rating": 4
    },
    {
        "id": 6,
        "department": "Technical Support",
        "feedbackText": "Quick response and efficient resolution to my technical issue. Very satisfied with the support team's service.",
        "rating": 5
    },
    {
        "id": 7,
        "department": "Product Development",
        "feedbackText": "The latest update introduced some bugs, and the overall experience has been affected. Hope these issues get resolved soon.",
        "rating": 3
    },
    {
        "id": 8,
        "department": "Customer Service",
        "feedbackText": "Had a billing inquiry, and the customer service representative was patient and assisted me until the issue was clarified. Great service!",
        "rating": 4
    },
    {
        "id": 9,
        "department": "Sales",
        "feedbackText": "The sales process was smooth, and the representative provided all necessary information. However, the delivery time was longer than expected.",
        "rating": 3
    },
    {
        "id": 10,
        "department": "Billing",
        "feedbackText": "Improved billing system! The new interface is user-friendly and makes it easier to understand charges.",
        "rating": 4
    }
]

export const ArticlesContent2 = [
    { id: '1', name: "Steps to setup a new laptop hardware", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "22-02-2023", Publisher: 'Micheal' },
    { id: '2', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "12-02-2023", Publisher: 'James' },
    { id: '3', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "17-02-2023", Publisher: 'John' },
    { id: '4', name: "Steps to setup a new laptop hardware", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "22-02-2023", Publisher: 'Micheal' },
    { id: '5', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "12-02-2023", Publisher: 'James' },
    { id: '6', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "17-02-2023", Publisher: 'John' },
    { id: '1', name: "Steps to setup a new laptop hardware", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "22-02-2023", Publisher: 'Micheal' },
    { id: '2', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "12-02-2023", Publisher: 'James' },
    { id: '3', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "17-02-2023", Publisher: 'John' },
    { id: '4', name: "Steps to setup a new laptop hardware", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "22-02-2023", Publisher: 'Micheal' },
    { id: '5', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "12-02-2023", Publisher: 'James' },
    { id: '6', name: "Connecting to company's network and enabling windows defender", content: "Article to setup a new laptop or configure a new hardware device. Windows will start searching for and downloading updates, but you don't have to wait for this process to complete before moving on to your next task.", Date: "17-02-2023", Publisher: 'John' }

]

export const UserTicketsData = [
    {
        ticketNumber: 101,
        priority: "High",
        requestorEmail: "user@example.com",
        department: "Human Resource",
        state: "in progress",
        assignedMember: "mijfd@gmail.com",
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 102,
        priority: "Medium",
        requestorEmail: "anotheruser@example.com",
        department: "marketing",
        state: "complete",
        assignedMember: "asdfhhj@gmail.com",
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 103,
        priority: "High",
        requestorEmail: "user@example.com",
        department: "Human Resource",
        state: "in progress",
        assignedMember: "mijfd@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 104,
        priority: "Medium",
        requestorEmail: "anotheruser@example.com",
        department: "Marketing",
        state: "complete",
        assignedMember: "asdfhhj@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 105,
        priority: "Low",
        requestorEmail: "thirduser@example.com",
        department: "IT Support",
        state: "pending",
        assignedMember: "xcvbnm@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 106,
        priority: "High",
        requestorEmail: "fourthuser@example.com",
        department: "Finance",
        state: "in progress",
        assignedMember: "qwertyu@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 107,
        priority: "Medium",
        requestorEmail: "fifthuser@example.com",
        department: "Customer Support",
        state: "complete",
        assignedMember: "poiuytr@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 108,
        priority: "Low",
        requestorEmail: "sixthuser@example.com",
        department: "Sales",
        state: "pending",
        assignedMember: "lkjhgf@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 109,
        priority: "High",
        requestorEmail: "seventhuser@example.com",
        department: "Engineering",
        state: "in progress",
        assignedMember: "zxcvbnm@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 110,
        priority: "Medium",
        requestorEmail: "eighthuser@example.com",
        department: "Research and Development",
        state: "complete",
        assignedMember: "asdfghj@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 111,
        priority: "Low",
        requestorEmail: "ninthuser@example.com",
        department: "Legal",
        state: "pending",
        assignedMember: "qweert@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 112,
        priority: "High",
        requestorEmail: "tenthuser@example.com",
        department: "Quality Assurance",
        state: "in progress",
        assignedMember: "zxcvbn@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 113,
        priority: "Medium",
        requestorEmail: "eleventhuser@example.com",
        department: "Administration",
        state: "complete",
        assignedMember: "yuiop@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 114,
        priority: "Low",
        requestorEmail: "twelfthuser@example.com",
        department: "Logistics",
        state: "pending",
        assignedMember: "asdfgh@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 115,
        priority: "High",
        requestorEmail: "user@example.com",
        department: "Human Resource",
        state: "in progress",
        assignedMember: "mijfd@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 116,
        priority: "Medium",
        requestorEmail: "anotheruser@example.com",
        department: "Marketing",
        state: "complete",
        assignedMember: "asdfhhj@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 117,
        priority: "Low",
        requestorEmail: "thirduser@example.com",
        department: "IT Support",
        state: "pending",
        assignedMember: "xcvbnm@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 118,
        priority: "High",
        requestorEmail: "fourthuser@example.com",
        department: "Finance",
        state: "in progress",
        assignedMember: "qwertyu@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 119,
        priority: "Medium",
        requestorEmail: "fifthuser@example.com",
        department: "Customer Support",
        state: "complete",
        assignedMember: "poiuytr@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 120,
        priority: "Low",
        requestorEmail: "sixthuser@example.com",
        department: "Sales",
        state: "pending",
        assignedMember: "lkjhgf@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 121,
        priority: "High",
        requestorEmail: "seventhuser@example.com",
        department: "Engineering",
        state: "in progress",
        assignedMember: "zxcvbnm@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 122,
        priority: "Medium",
        requestorEmail: "eighthuser@example.com",
        department: "Research and Development",
        state: "complete",
        assignedMember: "asdfghj@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 123,
        priority: "Low",
        requestorEmail: "ninthuser@example.com",
        department: "Legal",
        state: "pending",
        assignedMember: "qweert@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 124,
        priority: "High",
        requestorEmail: "tenthuser@example.com",
        department: "Quality Assurance",
        state: "in progress",
        assignedMember: "zxcvbn@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 125,
        priority: "Medium",
        requestorEmail: "eleventhuser@example.com",
        department: "Administration",
        state: "complete",
        assignedMember: "yuiop@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
    {
        ticketNumber: 126,
        priority: "Low",
        requestorEmail: "twelfthuser@example.com",
        department: "Logistics",
        state: "pending",
        assignedMember: "asdfgh@gmail.com" /* ... other properties */,
        status: "Approved",
        requestedBy: "John Doe",
        approvedBy: "Jane Smith",
        isFavourite: false,
    },
];

export const DummyTicketData = {
    "ticket_id": 1,
    "name": "Sample Ticket 1",
    "on_behalf_of": "John Doe",
    "category": "Technical Support",
    "sub_category": "Software",
    "service": "Installation",
    "status": "Open",
    "approval_state": "true",
    "short_description": "Issue with Software X",
    "description": "Encountering errors while trying to install Software X.",
    "private_comments": "Investigating the issue further.",
    "public_comments": "Ticket opened for resolving installation issue.",
    "active": "true",
    "history": "Ticket opened on 2024-05-09 10:00 AM",
    "priority": 2,
    "requested_email": "john.doe@example.com",
    "department": "IT",
    "state": "New York",
    "assigned_members": "Jane Smith",
    "approved_by": "Manager A",
    "requested_by": "John Doe",
    "task_type": "Installation",
    "attachments": "link_to_attachments",
    "price_per_unit": "50",
    "quantity": 1
}

export const UserTicketDetailData = [
    {
        id: 1,
        from: 'sender',
        message: 'hello you`re getting this from the sender '
    },
    {
        id: 2,
        from: 'receiver',
        message: 'heyy you`re getting this from the receiver '
    },
    {
        id: 3,
        from: 'sender',
        message: 'hello you`re getting this from the sender  2'
    },
    {
        id: 4,
        from: 'sender',
        message: 'hello you`re getting this from the sender 3'
    },
    {
        id: 5,
        from: 'sender',
        message: 'hello you`re getting this from the receiver 2 '
    },
]

export const tabsList = [
    {
        id: "1", name: "History", data: [
            { id: uuid(), dateModified: '20.05.2022', modifier: 'john', details: 'Updated the action plan' },
            { id: uuid(), dateModified: '21.05.2022', modifier: 'john', details: 'Fixed a bug in the login process' },
            { id: uuid(), dateModified: '22.05.2022', modifier: 'john', details: 'Added new features to the dashboard' },
            { id: uuid(), dateModified: '23.05.2022', modifier: 'john', details: 'Reviewed and optimized database queries' },
            { id: uuid(), dateModified: '01.06.2022', modifier: 'john', details: 'Resolved performance issues' },
            { id: uuid(), dateModified: '02.06.2022', modifier: 'john', details: 'Implemented user authentication' },
            { id: uuid(), dateModified: '03.06.2022', modifier: 'john', details: 'Refactored code for better readability' },
            { id: uuid(), dateModified: '10.06.2022', modifier: 'john', details: 'Fixed styling issues on mobile devices' },
            { id: uuid(), dateModified: '11.06.2022', modifier: 'john', details: 'Deployed latest version to production' },
            { id: uuid(), dateModified: '12.06.2022', modifier: 'john', details: 'Conducted code review and provided feedback' },
        ]
    },
    {
        id: "2", name: 'Details', data: [
            {
                id: uuid(), "Create Date": '', "Closed Date": '', 'Re-Open Date': '', 'Time Re-Opened': '', 'Remind Me': '',
                'Emergency Contact': '', 'Solution Type': ['Training'], 'Response SLA': '', 'Resolution SLA': ''
            },

        ]
    },
    {
        id: "3", name: 'Related records', data: [
            { id: uuid(), dateModified: '20.05.2022', modifier: 'john', details: 'Updated the action plan' },
            { id: uuid(), dateModified: '20.05.2022', modifier: 'john', details: 'Updated the action plan' },
            { id: uuid(), dateModified: '21.05.2022', modifier: 'john', details: 'Fixed a bug in the login process' },
            { id: uuid(), dateModified: '22.05.2022', modifier: 'john', details: 'Added new features to the dashboard' },
        ]
    },
    {
        id: "4", name: 'Attachments', data: [
            { id: uuid(), dateModified: '20.05.2022', modifier: 'john', details: 'Updated the action plan' },
            { id: uuid(), dateModified: '20.05.2022', modifier: 'john', details: 'Updated the action plan' },
        ]
    },
    {
        id: "5", name: 'Child Tickets', data: [
            { id: uuid(), dateModified: '12.06.2022', modifier: 'john', details: 'Conducted code review and provided feedback' },
        ]
    },
]

export const companyData = {
    Marketing: {
        DigitalMarketing: {
            SocialMediaMarketing: ["Content Creation", "Ads Management", "Influencer Outreach"],
            SEOMarketing: ["Keyword Research", "On-Page Optimization", "Link Building"],
            EmailMarketing: ["Campaign Design", "List Management", "Automation"]
        },
        TraditionalMarketing: {
            PrintMedia: ["Flyers", "Brochures", "Billboards"],
            BroadcastMedia: ["TV Commercials", "Radio Spots", "Print Ads"],
            Events: ["Event Planning", "Booth Design", "Promotional Materials"]
        }
    },
    Finance: {
        Accounting: {
            FinancialReporting: ["Balance Sheets", "Income Statements", "Cash Flow Statements"],
            Bookkeeping: ["Accounts Payable", "Accounts Receivable", "General Ledger"],
            Taxation: ["Tax Preparation", "Tax Planning", "Tax Compliance"]
        },
        FinancialPlanning: {
            Budgeting: ["Budget Development", "Budget Monitoring", "Budget Analysis"],
            Forecasting: ["Sales Forecasting", "Expense Forecasting", "Financial Modeling"],
            InvestmentManagement: ["Portfolio Analysis", "Asset Allocation", "Risk Management"]
        }
    },
    HumanResources: {
        Recruitment: {
            Hiring: ["Job Posting", "Resume Screening", "Interviewing"],
            Onboarding: ["Orientation", "Training", "Paperwork"],
            EmployeeRelations: ["Conflict Resolution", "Performance Management", "Employee Satisfaction"]
        },
        Benefits: {
            Compensation: ["Salary Structure", "Bonus Programs", "Benefits Packages"],
            HealthAndWellness: ["Health Insurance", "Fitness Programs", "Mental Health Support"],
            RetirementPlans: ["401(k)", "Pension Plans", "Retirement Counseling"]
        }
    },
    Sales: {
        LeadGeneration: {
            Prospecting: ["Identifying Leads", "Contact Information Gathering", "Lead Scoring"],
            Outreach: ["Cold Calling", "Email Campaigns", "Networking Events"],
            SalesPresentations: ["Product Demos", "Sales Pitches", "Proposal Writing"]
        },
        AccountManagement: {
            CustomerRelationships: ["Customer Onboarding", "Account Reviews", "Customer Support"],
            Upselling: ["Identifying Opportunities", "Cross-Selling", "Value Proposition"],
            Renewals: ["Contract Negotiation", "Renewal Proposals", "Customer Retention"]
        }
    }
};

export const RolesDummyData = [
    { id: 1, Name: 'Alice', Age: 25, City: 'New York', Occupation: 'Engineer' },
    { id: 2, Name: 'Bob', Age: 30, City: 'Los Angeles', Occupation: 'Teacher' },
    { id: 3, Name: 'Charlie', Age: 40, City: 'Chicago', Occupation: 'Doctor' },
    { id: 4, Name: 'David', Age: 22, City: 'Houston', Occupation: 'Artist' },
    { id: 5, Name: 'Emma', Age: 35, City: 'Phoenix', Occupation: 'Programmer' },
    { id: 6, Name: 'Frank', Age: 45, City: 'Philadelphia', Occupation: 'Chef' },
    { id: 7, Name: 'Grace', Age: 28, City: 'San Antonio', Occupation: 'Lawyer' },
    { id: 8, Name: 'Henry', Age: 50, City: 'San Diego', Occupation: 'Writer' },
    { id: 9, Name: 'Ivy', Age: 33, City: 'Dallas', Occupation: 'Athlete' },
    { id: 10, Name: 'Jack', Age: 38, City: 'San Jose', Occupation: 'Scientist' },
];

export const GroupsDummyData = [
    {
        "group_id": 1,
        "group_name": "Finance Team",
        "manager_name": "Andrew Johnson",
        "group_email": "finance@example.com",
        "parent_group": "parent1",
        "group_type_description": "Finance Department",
        "group_type": "Internal",
        "region": "Global"
    },
    {
        "group_id": 2,
        "group_name": "Marketing Department",
        "manager_name": "Sophie Williams",
        "group_email": "marketing@example.com",
        "parent_group": "parent2",
        "group_type_description": "Marketing and Advertising",
        "group_type": "Internal",
        "region": "North America"
    },
    {
        "group_id": 3,
        "group_name": "External Partners",
        "manager_name": "Chris Davis",
        "group_email": "partners@example.com",
        "parent_group": "parent3",
        "group_type_description": "External Partnerships",
        "group_type": "External",
        "region": "Global"
    },
    {
        "group_id": 4,
        "group_name": "IT Support",
        "manager_name": "Emily White",
        "group_email": "itsupport@example.com",
        "parent_group": "parent4",
        "group_type_description": "IT Support Team",
        "group_type": "Internal",
        "region": "Europe"
    },
    {
        "group_id": 5,
        "group_name": "Sales Division",
        "manager_name": "Mike Johnson",
        "group_email": "sales@example.com",
        "parent_group": "parent5",
        "group_type_description": "Sales and Distribution",
        "group_type": "Internal",
        "region": "Asia-Pacific"
    },
    {
        "group_id": 6,
        "group_name": "External Consultants",
        "manager_name": "Grace Taylor",
        "group_email": "consultants@example.com",
        "parent_group": "parent6",
        "group_type_description": "External Consulting",
        "group_type": "External",
        "region": "Global"
    },
    {
        "group_id": 7,
        "group_name": "Research and Development",
        "manager_name": "Robert Anderson",
        "group_email": "rnd@example.com",
        "parent_group": "parent7",
        "group_type_description": "Innovation and Product Development",
        "group_type": "Internal",
        "region": "North America"
    },
    {
        "group_id": 8,
        "group_name": "Internal Training",
        "manager_name": "Ava Davis",
        "group_email": "training@example.com",
        "parent_group": "parent8",
        "group_type_description": "Employee Training",
        "group_type": "Internal",
        "region": "Europe"
    },
    {
        "group_id": 9,
        "group_name": "Legal Affairs",
        "manager_name": "Jack Wilson",
        "group_email": "legal@example.com",
        "parent_group": "parent9",
        "group_type_description": "Legal Department",
        "group_type": "Internal",
        "region": "Asia-Pacific"
    },
    {
        "group_id": 10,
        "group_name": "Customer Support",
        "manager_name": "Liam Moore",
        "group_email": "support@example.com",
        "parent_group": "parent10",
        "group_type_description": "Customer Support Team",
        "group_type": "Internal",
        "region": "Global"
    },
    {
        "group_id": 6,
        "group_name": "External Consultants",
        "manager_name": "Grace Taylor",
        "group_email": "consultants@example.com",
        "parent_group": "parent6",
        "group_type_description": "External Consulting",
        "group_type": "External",
        "region": "Global"
    },
    {
        "group_id": 7,
        "group_name": "Research and Development",
        "manager_name": "Robert Anderson",
        "group_email": "rnd@example.com",
        "parent_group": "parent7",
        "group_type_description": "Innovation and Product Development",
        "group_type": "Internal",
        "region": "North America"
    },
    {
        "group_id": 8,
        "group_name": "Internal Training",
        "manager_name": "Ava Davis",
        "group_email": "training@example.com",
        "parent_group": "parent8",
        "group_type_description": "Employee Training",
        "group_type": "Internal",
        "region": "Europe"
    },
    {
        "group_id": 9,
        "group_name": "Legal Affairs",
        "manager_name": "Jack Wilson",
        "group_email": "legal@example.com",
        "parent_group": "parent9",
        "group_type_description": "Legal Department",
        "group_type": "Internal",
        "region": "Asia-Pacific"
    },
    {
        "group_id": 10,
        "group_name": "Customer Support",
        "manager_name": "Liam Moore",
        "group_email": "support@example.com",
        "parent_group": "parent10",
        "group_type_description": "Customer Support Team",
        "group_type": "Internal",
        "region": "Global"
    }
]

export const DummyLocationsData = [
    {
        "location_id": 1,
        "location_name": "Headquarters",
        "street": "123 Main Street",
        "city": "Cityville",
        "state_country": "State A",
        "postal_code": "12345",
        "contact": "John Doe",
        "phone_no": "555-1234",
        "fax_no": "555-5678",
        "parent_location": null
    },
    {
        "location_id": 2,
        "location_name": "Branch Office 1",
        "street": "456 Oak Avenue",
        "city": "Townsville",
        "state_country": "State B",
        "postal_code": "54321",
        "contact": "Jane Smith",
        "phone_no": "555-9876",
        "fax_no": "555-4321",
        "parent_location": "Headquarters"
    },
    {
        "location_id": 3,
        "location_name": "Branch Office 2",
        "street": "789 Pine Street",
        "city": "Villagetown",
        "state_country": "State C",
        "postal_code": "67890",
        "contact": "Bob Johnson",
        "phone_no": "555-1111",
        "fax_no": "555-2222",
        "parent_location": "Headquarters"
    },
    {
        "location_id": 4,
        "location_name": "Warehouse A",
        "street": "101 Storage Lane",
        "city": "Storagetown",
        "state_country": "State D",
        "postal_code": "98765",
        "contact": "Alice Brown",
        "phone_no": "555-7777",
        "fax_no": "555-8888",
        "parent_location": "Headquarters"
    },
    {
        "location_id": 5,
        "location_name": "Retail Store 1",
        "street": "222 Shopper Street",
        "city": "Shopsville",
        "state_country": "State E",
        "postal_code": "54321",
        "contact": "Mark Green",
        "phone_no": "555-3333",
        "fax_no": "555-4444",
        "parent_location": "Warehouse A"
    },
    {
        "location_id": 6,
        "location_name": "Retail Store 2",
        "street": "333 Mall Avenue",
        "city": "Malltown",
        "state_country": "State F",
        "postal_code": "87654",
        "contact": "Sara White",
        "phone_no": "555-5555",
        "fax_no": "555-6666",
        "parent_location": "Warehouse A"
    },
    {
        "location_id": 7,
        "location_name": "Remote Office",
        "street": "789 Remote Street",
        "city": "Remotetown",
        "state_country": "State G",
        "postal_code": "76543",
        "contact": "Chris Green",
        "phone_no": "555-9999",
        "fax_no": "555-0000",
        "parent_location": "Branch Office 1"
    },
    {
        "location_id": 8,
        "location_name": "Storage Facility",
        "street": "456 Storage Street",
        "city": "Storagetown",
        "state_country": "State H",
        "postal_code": "45678",
        "contact": "Laura Black",
        "phone_no": "555-1239",
        "fax_no": "555-8765",
        "parent_location": "Warehouse A"
    }
];


export const UsersDummyData = [
    { "first_name": "John", "last_name": "Doe", "user_id": "john.doe123", "title": "Software Engineer", "department": "Engineering", "active": true, "reset_password": false, "email": "john.doe@example.com", "time_zone": "UTC", "phone_no": "+1234567890", "picture": "https://example.com/john_doe_picture.jpg", "location": "Office A" },
    { "first_name": "Alice", "last_name": "Smith", "user_id": "alice.smith456", "title": "Marketing Specialist", "department": "Marketing", "active": true, "reset_password": false, "email": "alice.smith@example.com", "time_zone": "GMT", "phone_no": "+9876543210", "picture": "https://example.com/alice_smith_picture.jpg", "location": "Office B" },
    { "first_name": "Bob", "last_name": "Johnson", "user_id": "bob.johnson789", "title": "HR Manager", "department": "Human Resources", "active": false, "reset_password": true, "email": "bob.johnson@example.com", "time_zone": "EST", "phone_no": "+1112223333", "picture": "https://example.com/bob_johnson_picture.jpg", "location": "Office C" },
    { "first_name": "Eva", "last_name": "Williams", "user_id": "eva.williams234", "title": "Data Analyst", "department": "Analytics", "active": true, "reset_password": false, "email": "eva.williams@example.com", "time_zone": "PST", "phone_no": "+4445556666", "picture": "https://example.com/eva_williams_picture.jpg", "location": "Office D" },
    { "first_name": "Charlie", "last_name": "Brown", "user_id": "charlie.brown567", "title": "Product Manager", "department": "Product Management", "active": false, "reset_password": true, "email": "charlie.brown@example.com", "time_zone": "CST", "phone_no": "+7778889999", "picture": "https://example.com/charlie_brown_picture.jpg", "location": "Office E" },
    { "first_name": "Grace", "last_name": "Miller", "user_id": "grace.miller890", "title": "Financial Analyst", "department": "Finance", "active": true, "reset_password": false, "email": "grace.miller@example.com", "time_zone": "EST", "phone_no": "+9998887777", "picture": "https://example.com/grace_miller_picture.jpg", "location": "Office F" },
    { "first_name": "David", "last_name": "Clark", "user_id": "david.clark123", "title": "System Administrator", "department": "IT", "active": true, "reset_password": false, "email": "david.clark@example.com", "time_zone": "PST", "phone_no": "+6667778888", "picture": "https://example.com/david_clark_picture.jpg", "location": "Office G" },
    { "first_name": "Sophia", "last_name": "Baker", "user_id": "sophia.baker456", "title": "UX Designer", "department": "Design", "active": false, "reset_password": true, "email": "sophia.baker@example.com", "time_zone": "GMT", "phone_no": "+3332221111", "picture": "https://example.com/sophia_baker_picture.jpg", "location": "Office H" },
    { "first_name": "Michael", "last_name": "White", "user_id": "michael.white789", "title": "Customer Support Specialist", "department": "Customer Support", "active": true, "reset_password": false, "email": "michael.white@example.com", "time_zone": "CST", "phone_no": "+1110009999", "picture": "https://example.com/michael_white_picture.jpg", "location": "Office I" },
    { "first_name": "Olivia", "last_name": "Johnson", "user_id": "olivia.johnson234", "title": "Sales Representative", "department": "Sales", "active": false, "reset_password": true, "email": "olivia.johnson@example.com", "time_zone": "PST", "phone_no": "+8887776666", "picture": "https://example.com/olivia_johnson_picture.jpg", "location": "Office J" },
    { "first_name": "William", "last_name": "Davis", "user_id": "william.davis567", "title": "Quality Assurance Engineer", "department": "QA", "active": true, "reset_password": false, "email": "william.davis@example.com", "time_zone": "EST", "phone_no": "+4443332222", "picture": "https://example.com/william_davis_picture.jpg", "location": "Office K" },
    { "first_name": "Ava", "last_name": "Thomas", "user_id": "ava.thomas890", "title": "Content Writer", "department": "Content", "active": true, "reset_password": false, "email": "ava.thomas@example.com", "time_zone": "GMT", "phone_no": "+7776665555", "picture": "https://example.com/ava_thomas_picture.jpg", "location": "Office L" },
    { "first_name": "Liam", "last_name": "Anderson", "user_id": "liam.anderson123", "title": "Network Engineer", "department": "IT", "active": false, "reset_password": true, "email": "liam.anderson@example.com", "time_zone": "CST", "phone_no": "+2221110000", "picture": "https://example.com/liam_anderson_picture.jpg", "location": "Office M" },
    { "first_name": "Emma", "last_name": "Garcia", "user_id": "emma.garcia456", "title": "Graphic Designer", "department": "Design", "active": true, "reset_password": false, "email": "emma.garcia@example.com", "time_zone": "PST", "phone_no": "+9998887777", "picture": "https://example.com/emma_garcia_picture.jpg", "location": "Office N" },
    { "first_name": "Noah", "last_name": "Rodriguez", "user_id": "noah.rodriguez789", "title": "Business Analyst", "department": "Analytics", "active": false, "reset_password": true, "email": "noah.rodriguez@example.com", "time_zone": "EST", "phone_no": "+6665554444", "picture": "https://example.com/noah_rodriguez_picture.jpg", "location": "Office O" },
    { "first_name": "Isabella", "last_name": "Martinez", "user_id": "isabella.martinez234", "title": "Project Manager", "department": "Project Management", "active": true, "reset_password": false, "email": "isabella.martinez@example.com", "time_zone": "GMT", "phone_no": "+3332221111", "picture": "https://example.com/isabella_martinez_picture.jpg", "location": "Office P" },
    { "first_name": "James", "last_name": "Hernandez", "user_id": "james.hernandez567", "title": "Technical Support Specialist", "department": "Customer Support", "active": false, "reset_password": true, "email": "james.hernandez@example.com", "time_zone": "PST", "phone_no": "+8887776666", "picture": "https://example.com/james_hernandez_picture.jpg", "location": "Office Q" },
    { "first_name": "Mia", "last_name": "Lopez", "user_id": "mia.lopez890", "title": "Data Scientist", "department": "Analytics", "active": true, "reset_password": false, "email": "mia.lopez@example.com", "time_zone": "EST", "phone_no": "+4443332222", "picture": "https://example.com/mia_lopez_picture.jpg", "location": "Office R" },
    { "first_name": "Alexander", "last_name": "Smith", "user_id": "alexander.smith123", "title": "Software Developer", "department": "Engineering", "active": true, "reset_password": false, "email": "alexander.smith@example.com", "time_zone": "GMT", "phone_no": "+7776665555", "picture": "https://example.com/alexander_smith_picture.jpg", "location": "Office S" },
    { "first_name": "Sophie", "last_name": "Taylor", "user_id": "sophie.taylor456", "title": "UX/UI Designer", "department": "Design", "active": false, "reset_password": true, "email": "sophie.taylor@example.com", "time_zone": "CST", "phone_no": "+2221110000", "picture": "https://example.com/sophie_taylor_picture.jpg", "location": "Office T" }
]

export const subCategoryTemplatesData = [
    { format: 'SMS', type: 'hr', templateName: 'notification', description: ' this is a notification template' },
    { format: 'SMS', type: 'hr', templateName: 'offer letter', description: ' this is a offer letter template' },
    { format: 'SMS', type: 'hr', templateName: 'finance related template', description: ' this is a financial template' },
    { format: 'SMS', type: 'tr', templateName: 'project in detail', description: ' this is a project related template' },
    { format: 'SMS', type: 'marketing', templateName: 'annual income', description: ' this is an annual income template' },
    { format: 'SMS', type: 'marketing', templateName: 'annual income', description: ' this is an annual income template' },
    { format: 'SMS', type: 'marketing', templateName: 'annual income', description: ' this is an annual income template' },
    { format: 'SMS', type: 'marketing', templateName: 'annual income', description: ' this is an annual income template' },
    { format: 'SMS', type: 'marketing', templateName: 'annual income', description: ' this is an annual income template' },
    { format: 'SMS', type: 'tr', templateName: 'template 1', description: 'this is template number 1' },
    { format: 'SMS', type: 'tr', templateName: 'template 2', description: 'this is template number 2' },
    { format: 'Standard', type: 'it', templateName: 'template 3', description: 'this is template number 3' },
    { format: 'Standard', type: 'it', templateName: 'template 4', description: 'this is template number 4' },
    { format: 'Standard', type: 'sales', templateName: 'template 5', description: 'this is template number 5' },
    { format: 'Standard', type: 'tr', templateName: 'template 6', description: 'this is template number 6' },
    { format: 'Standard', type: 'hr', templateName: 'template 7', description: 'this is template number 7' },
    { format: 'Standard', type: 'tr', templateName: 'template 8', description: 'this is template number 8' },
    { format: 'Standard', type: 'tr', templateName: 'template 9', description: 'this is template number 9' },
    { format: 'Standard', type: 'hr', templateName: 'template 10', description: 'this is template number 10' },
    //
    { format: 'Standard', type: 'hr', templateName: 'template 11', description: 'this is template number 11' },
    { format: 'Standard', type: 'it', templateName: 'template 12', description: 'this is template number 12' },
    { format: 'Standard', type: 'it', templateName: 'template 13', description: 'this is template number 13' },
    { format: 'Standard', type: 'it', templateName: 'template 14', description: 'this is template number 14' },
    { format: 'Standard', type: 'it', templateName: 'template 15', description: 'this is template number 15' },
    { format: 'Standard', type: 'sales', templateName: 'template 16', description: 'this is template number 16' },
    { format: 'Standard', type: 'sales', templateName: 'template 17', description: 'this is template number 17' },
    { format: 'Standard', type: 'sales', templateName: 'template 18', description: 'this is template number 18' },
    { format: 'Standard', type: 'sales', templateName: 'template 19', description: 'this is template number 19' },
    { format: 'Standard', type: 'sales', templateName: 'template 20', description: 'this is template number 20' },
    { format: 'Standard', type: 'hr', templateName: 'notification', description: ' this is a notification template' },
    { format: 'Standard', type: 'hr', templateName: 'offer letter', description: ' this is a offer letter template' },
    { format: 'Standard', type: 'hr', templateName: 'finance related template', description: ' this is a financial template' },
    { format: 'Standard', type: 'tr', templateName: 'project in detail', description: ' this is a project related template' },
    { format: 'Standard', type: 'marketing', templateName: 'annual income', description: ' this is an annual income template' },
    { format: 'Standard', type: 'marketing', templateName: 'annual income', description: ' this is an annual income template' },
    { format: 'Standard', type: 'marketing', templateName: 'annual income', description: ' this is an annual income template' },
    { format: 'Standard', type: 'marketing', templateName: 'annual income', description: ' this is an annual income template' },
    { format: 'Standard', type: 'marketing', templateName: 'annual income', description: ' this is an annual income template' },
    // 
    { format: 'Standard', type: 'tr', templateName: 'template 1', description: 'this is template number 1' },
    { format: 'Standard', type: 'tr', templateName: 'template 2', description: 'this is template number 2' },
    { format: 'Standard', type: 'it', templateName: 'template 3', description: 'this is template number 3' },
    { format: 'Standard', type: 'tr', templateName: 'template 6', description: 'this is template number 6' },
    { format: 'Standard', type: 'hr', templateName: 'template 7', description: 'this is template number 7' },
    { format: 'Mobile', type: 'tr', templateName: 'template 8', description: 'this is template number 8' },
    { format: 'Mobile', type: 'tr', templateName: 'template 9', description: 'this is template number 9' },
    { format: 'Mobile', type: 'hr', templateName: 'template 10', description: 'this is template number 10' },
    { format: 'Mobile', type: 'hr', templateName: 'template 11', description: 'this is template number 11' },
    { format: 'Mobile', type: 'it', templateName: 'template 12', description: 'this is template number 12' },
    { format: 'Mobile', type: 'it', templateName: 'template 13', description: 'this is template number 13' },
    { format: 'Mobile', type: 'it', templateName: 'template 14', description: 'this is template number 14' },
    { format: 'Mobile', type: 'it', templateName: 'template 15', description: 'this is template number 15' },
    { format: 'Mobile', type: 'sales', templateName: 'template 16', description: 'this is template number 16' },
    { format: 'Mobile', type: 'sales', templateName: 'template 17', description: 'this is template number 17' },
    { format: 'Mobile', type: 'sales', templateName: 'template 18', description: 'this is template number 18' },
    { format: 'Mobile', type: 'sales', templateName: 'template 19', description: 'this is template number 19' },
    { format: 'Mobile', type: 'sales', templateName: 'template 20', description: 'this is template number 20' }
];

export const TemplatesDummyData = [
    { "template_id": 1, "template_name": "Template 1", "active": true, "description": "Description 1", "who_will_receive": "Users", "sms_alert": false, "preview": "Preview 1", "created": "2023-01-01", "created_by": "User 1", "updated": null, "updated_by": null },
    { "template_id": 2, "template_name": "Template 2", "active": true, "description": "Description 2", "who_will_receive": "Groups", "sms_alert": true, "preview": "Preview 2", "created": "2023-02-02", "created_by": "User 2", "updated": "2023-02-15", "updated_by": "User 3" },
    { "template_id": 3, "template_name": "Template 3", "active": false, "description": "Description 3", "who_will_receive": "Fields", "sms_alert": false, "preview": "Preview 3", "created": "2023-03-03", "created_by": "User 3", "updated": null, "updated_by": null },
    { "template_id": 4, "template_name": "Template 4", "active": true, "description": "Description 4", "who_will_receive": "Users", "sms_alert": true, "preview": "Preview 4", "created": "2023-04-04", "created_by": "User 4", "updated": "2023-04-15", "updated_by": "User 5" },
    { "template_id": 5, "template_name": "Template 5", "active": false, "description": "Description 5", "who_will_receive": "Groups", "sms_alert": false, "preview": "Preview 5", "created": "2023-05-05", "created_by": "User 5", "updated": "2023-05-15", "updated_by": "User 6" },
    { "template_id": 6, "template_name": "Template 6", "active": true, "description": "Description 6", "who_will_receive": "Fields", "sms_alert": true, "preview": "Preview 6", "created": "2023-06-06", "created_by": "User 6", "updated": "2023-06-15", "updated_by": "User 7" },
    { "template_id": 7, "template_name": "Template 7", "active": false, "description": "Description 7", "who_will_receive": "Users", "sms_alert": false, "preview": "Preview 7", "created": "2023-07-07", "created_by": "User 7", "updated": null, "updated_by": null },
    { "template_id": 8, "template_name": "Template 8", "active": true, "description": "Description 8", "who_will_receive": "Groups", "sms_alert": true, "preview": "Preview 8", "created": "2023-08-08", "created_by": "User 8", "updated": "2023-08-15", "updated_by": "User 9" },
    { "template_id": 9, "template_name": "Template 9", "active": false, "description": "Description 9", "who_will_receive": "Fields", "sms_alert": false, "preview": "Preview 9", "created": "2023-09-09", "created_by": "User 9", "updated": "2023-09-15", "updated_by": "User 10" },
    { "template_id": 10, "template_name": "Template 10", "active": true, "description": "Description 10", "who_will_receive": "Users", "sms_alert": true, "preview": "Preview 10", "created": "2023-10-10", "created_by": "User 10", "updated": "2023-10-15", "updated_by": "User 11" },
    { "template_id": 11, "template_name": "Template 11", "active": false, "description": "Description 11", "who_will_receive": "Groups", "sms_alert": false, "preview": "Preview 11", "created": "2023-11-11", "created_by": "User 11", "updated": null, "updated_by": null },
    { "template_id": 12, "template_name": "Template 12", "active": true, "description": "Description 12", "who_will_receive": "Fields", "sms_alert": true, "preview": "Preview 12", "created": "2023-12-12", "created_by": "User 12", "updated": "2023-12-15", "updated_by": "User 13" },
    { "template_id": 13, "template_name": "Template 13", "active": false, "description": "Description 13", "who_will_receive": "Users", "sms_alert": false, "preview": "Preview 13", "created": "2024-01-01", "created_by": "User 13", "updated": null, "updated_by": null },
    { "template_id": 14, "template_name": "Template 14", "active": true, "description": "Description 14", "who_will_receive": "Groups", "sms_alert": true, "preview": "Preview 14", "created": "2024-02-02", "created_by": "User 14", "updated": "2024-02-15", "updated_by": "User 15" },
    { "template_id": 15, "template_name": "Template 15", "active": false, "description": "Description 15", "who_will_receive": "Fields", "sms_alert": false, "preview": "Preview 15", "created": "2024-03-03", "created_by": "User 15", "updated": null, "updated_by": null },
    { "template_id": 16, "template_name": "Template 16", "active": true, "description": "Description 16", "who_will_receive": "Users", "sms_alert": true, "preview": "Preview 16", "created": "2024-04-04", "created_by": "User 16", "updated": "2024-04-15", "updated_by": "User 17" },
    { "template_id": 17, "template_name": "Template 17", "active": false, "description": "Description 17", "who_will_receive": "Groups", "sms_alert": false, "preview": "Preview 17", "created": "2024-05-05", "created_by": "User 17", "updated": "2024-05-15", "updated_by": "User 18" },
    { "template_id": 18, "template_name": "Template 18", "active": true, "description": "Description 18", "who_will_receive": "Fields", "sms_alert": true, "preview": "Preview 18", "created": "2024-06-06", "created_by": "User 18", "updated": "2024-06-15", "updated_by": "User 19" },
    { "template_id": 19, "template_name": "Template 19", "active": false, "description": "Description 19", "who_will_receive": "Users", "sms_alert": false, "preview": "Preview 19", "created": "2024-07-07", "created_by": "User 19", "updated": null, "updated_by": null },
    { "template_id": 20, "template_name": "Template 20", "active": true, "description": "Description 20", "who_will_receive": "Groups", "sms_alert": true, "preview": "Preview 20", "created": "2024-08-08", "created_by": "User 20", "updated": "2024-08-15", "updated_by": "User 21" }
]

export const ticketsData = [
    { ticket_id: 101, priority: "High", requestor_email: "user@example.com", department: "Human Resource", state: "in progress", assigned_members: "mijfd@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith" },
    { ticket_id: 102, priority: "Medium", requestor_email: "anotheruser@example.com", department: "Marketing", state: "complete", assigned_members: "asdfhhj@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 103, priority: "High", requestor_email: "user@example.com", department: "Human Resource", state: "in progress", assigned_members: "mijfd@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 104, priority: "Medium", requestor_email: "anotheruser@example.com", department: "Marketing", state: "complete", assigned_members: "asdfhhj@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 105, priority: "Low", requestor_email: "thirduser@example.com", department: "IT Support", state: "pending", assigned_members: "xcvbnm@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 106, priority: "High", requestor_email: "fourthuser@example.com", department: "Finance", state: "in progress", assigned_members: "qwertyu@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 107, priority: "Medium", requestor_email: "fifthuser@example.com", department: "Customer Support", state: "complete", assigned_members: "poiuytr@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 108, priority: "Low", requestor_email: "sixthuser@example.com", department: "Sales", state: "pending", assigned_members: "lkjhgf@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 109, priority: "High", requestor_email: "seventhuser@example.com", department: "Engineering", state: "in progress", assigned_members: "zxcvbnm@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 110, priority: "Medium", requestor_email: "eighthuser@example.com", department: "Research and Development", state: "complete", assigned_members: "asdfghj@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 111, priority: "Low", requestor_email: "ninthuser@example.com", department: "Legal", state: "pending", assigned_members: "qweert@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 112, priority: "High", requestor_email: "tenthuser@example.com", department: "Quality Assurance", state: "in progress", assigned_members: "zxcvbn@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 113, priority: "Medium", requestor_email: "eleventhuser@example.com", department: "Administration", state: "complete", assigned_members: "yuiop@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 114, priority: "Low", requestor_email: "twelfthuser@example.com", department: "Logistics", state: "pending", assigned_members: "asdfgh@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 115, priority: "High", requestor_email: "user@example.com", department: "Human Resource", state: "in progress", assigned_members: "mijfd@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 116, priority: "Medium", requestor_email: "anotheruser@example.com", department: "Marketing", state: "complete", assigned_members: "asdfhhj@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 117, priority: "Low", requestor_email: "thirduser@example.com", department: "IT Support", state: "pending", assigned_members: "xcvbnm@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 118, priority: "High", requestor_email: "fourthuser@example.com", department: "Finance", state: "in progress", assigned_members: "qwertyu@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 119, priority: "Medium", requestor_email: "fifthuser@example.com", department: "Customer Support", state: "complete", assigned_members: "poiuytr@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
    { ticket_id: 120, priority: "Low", requestor_email: "sixthuser@example.com", department: "Sales", state: "pending", assigned_members: "lkjhgf@gmail.com", status: "Approved", requested_by: "John Doe", approved_by: "Jane Smith", },
];

export const reportsList = [
    {
        report_id: 1,
        report_name: " Informational Report(NSR02)",
        reportData: {
            xAxis: [{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16, 18] }],
            series: [
                {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                },
                {
                    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
                },
                {
                    data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
                    valueFormatter: (value) => (value == null ? '?' : value.toString()),
                },
            ]
        },
        graphType: 'lines'
    },
    {
        report_id: 2,
        report_name: "Analytic Report(NSR03)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            series: [
                { data: [35, 44, 24, 34], stack: "Q1" },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50], stack: "Q2" },
                { data: [60, 50, 15, 25] },
            ]
        },
        graphType: 'bar'
    },
    {
        report_id: 3,
        report_name: "Operational Report(NSR04)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            series: [
                {
                    data1: [
                        { label: 'Group A', value: 400 },
                        { label: 'Group B', value: 300 },
                        { label: 'Group C', value: 300 },
                        { label: 'Group D', value: 200 },
                    ],
                    data2:
                        [
                            { label: '1', value: 100 },
                            { label: '2', value: 300 },
                            { label: '3', value: 100 },
                            { label: '4', value: 80 },
                            { label: '5', value: 40 },
                            { label: '6', value: 30 },
                            { label: '7', value: 50 },
                            { label: '8', value: 100 },
                            { label: '9', value: 200 },
                            { label: '10', value: 150 },
                            { label: '11', value: 50 },
                        ]
                },
            ]
        },
        graphType: 'pie'
    },
    {
        report_id: 4,
        report_name: "Product Report(NSR05)",
        reportData: {
            series: [
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
            ],
            yAxis: [
                {
                    min: -3,
                    max: 3,
                    tickInterval: [-3, -1.5, 0, 1.5, 3],
                },
            ],
            xAxis: [
                {
                    min: -3,
                    max: 3,
                    tickInterval: [-3, -1.5, 0, 1.5, 3],
                },
            ],
        },
        graphType: 'scatter'
    },
    {
        report_id: 5,
        report_name: "Industry Report(NSR06)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            data: [3, -10, -2, 5, 7, -2, 4, 6],
        },
        graphType: 'sparkle'
    },
    {
        report_id: 6,
        report_name: "Department Report(NSR07)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            value1: 60,
            value2: 50,
        },
        graphType: 'gauge'
    },

    // 2nd cycle
    {
        report_id: 1,
        report_name: " Progress Report(NSR08)",
        reportData: {
            xAxis: [{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }],
            series: [
                {
                    data: [1, 4.5, 1, 7.5, 0.5, 4],
                    valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                },
                {
                    data: [null, null, null, null, 6.5, 3, 9.5, 2.5, 6],
                },
                {
                    data: [9, 6, 7, 2, null, null, 4, 3.5, 3],
                    valueFormatter: (value) => (value == null ? '?' : value.toString()),
                },
            ]
        },
        graphType: 'lines'
    },
    {
        report_id: 2,
        report_name: "Internal Report(NSR09)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            series: [
                { data: [25, 34, 14, 24] },
                { data: [61, 7, 59, 40] },
                { data: [25, 35, 40, 60] },
                { data: [70, 60, 25, 35] },
            ]
        },
        graphType: 'bar'
    },
    {
        report_id: 3,
        report_name: "External Report(NSR010)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            series: [
                {
                    data1: [
                        { label: 'Group A', value: 500 },
                        { label: 'Group B', value: 100 },
                        { label: 'Group C', value: 600 },
                        { label: 'Group D', value: 700 },
                    ],
                    data2:
                        [
                            { label: '1', value: 100 },
                            { label: '2', value: 600 },
                            { label: '3', value: 100 },
                            { label: '4', value: 290 },
                            { label: '5', value: 60 },
                            { label: '6', value: 80 },
                            { label: '7', value: 40 },
                            { label: '8', value: 500 },
                            { label: '9', value: 100 },
                            { label: '10', value: 350 },
                            { label: '11', value: 90 },
                        ]
                },
            ]
        },
        graphType: 'pie'
    },
    {
        report_id: 4,
        report_name: "Vertiocal & Lateral Report(NSR011)",
        reportData: {
            series: [
                { data: [15, 24, 4, 14] },
                { data: [31, 4, 29, 10] },
                { data: [35, 55, 50, 70] },
                { data: [80, 70, 35, 35] },
            ],
            yAxis: [
                {
                    min: -3,
                    max: 3,
                    tickInterval: [-3, -1.5, 0, 1.5, 3],
                },
            ],
            xAxis: [
                {
                    min: -3,
                    max: 3,
                    tickInterval: [-3, -1.5, 0, 1.5, 3],
                },
            ],
        },
        graphType: 'scatter'
    },
    {
        report_id: 5,
        report_name: "Strategic Report(NSR012)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            data: [5, -20, -4, 7, 9, -4, 6, 8],
        },
        graphType: 'sparkle'
    },
    {
        report_id: 6,
        report_name: "Research Report(NSR013)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            value1: 20,
            value2: 30,
        },
        graphType: 'gauge'
    },

    // 3rd cycle
    {
        report_id: 1,
        report_name: " Progress Report(NSR014)",
        reportData: {
            xAxis: [{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }],
            series: [
                {
                    data: [3, 3.5, 4, 10.5, 3.5, 7],
                    valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                },
                {
                    data: [null, null, null, null, 9.5, 6, 12.5, 5.5, 9],
                },
                {
                    data: [12, 9, 10, 5, null, null, 7, 6.5, 6],
                    valueFormatter: (value) => (value == null ? '?' : value.toString()),
                },
            ]
        },
        graphType: 'lines'
    },
    {
        report_id: 2,
        report_name: "Internal Report(NSR015)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            series: [
                { data: [55, 64, 44, 54] },
                { data: [91, 10, 89, 70] },
                { data: [55, 65, 70, 90] },
                { data: [90, 90, 55, 65] },
            ]
        },
        graphType: 'bar'
    },
    {
        report_id: 3,
        report_name: "External Report(NSR016)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            series: [
                {
                    data1: [
                        { label: 'Group A', value: 800 },
                        { label: 'Group B', value: 400 },
                        { label: 'Group C', value: 900 },
                        { label: 'Group D', value: 400 },
                    ],
                    data2:
                        [
                            { label: '1', value: 500 },
                            { label: '2', value: 900 },
                            { label: '3', value: 400 },
                            { label: '4', value: 590 },
                            { label: '5', value: 90 },
                            { label: '6', value: 110 },
                            { label: '7', value: 10 },
                            { label: '8', value: 800 },
                            { label: '9', value: 400 },
                            { label: '10', value: 750 },
                            { label: '11', value: 60 },
                        ]
                },
            ]
        },
        graphType: 'pie'
    },
    {
        report_id: 4,
        report_name: "Vertiocal & Lateral Report(NSR017)",
        reportData: {
            series: [
                { data: [45, 54, 7, 44] },
                { data: [11, 7, 59, 40] },
                { data: [65, 85, 20, 40] },
                { data: [10, 60, 65, 95] },
            ],
            yAxis: [
                {
                    min: -3,
                    max: 3,
                    tickInterval: [-3, -1.5, 0, 1.5, 3],
                },
            ],
            xAxis: [
                {
                    min: -3,
                    max: 3,
                    tickInterval: [-3, -1.5, 0, 1.5, 3],
                },
            ],
        },
        graphType: 'scatter'
    },
    {
        report_id: 5,
        report_name: "Strategic Report(NSR018)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            data: [1, -50, -1, 4, 6, -1, 3, 5],
        },
        graphType: 'sparkle'
    },
    {
        report_id: 6,
        report_name: "Research Report(NSR019)",
        reportData: {
            xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }],
            value1: 10,
            value2: 90,
        },
        graphType: 'gauge'
    },
]

export const defaultDashboardLayouts = [
    {
        id: 1,
        name: "My Default Dashboard [CDL02]",
        layouts: [
            { i: "1", x: 0, y: 0, w: 12, h: 4, },

            { i: "a", x: 0, y: 1, w: 6, h: 5, },
            { i: "b", x: 1, y: 2, w: 12, h: 9, },
            { i: "c", x: 1, y: 1, w: 6, h: 5 },
            { i: "d", x: 1, y: 3, w: 8, h: 11, },
            { i: 'e', x: 1, y: 4, w: 4, h: 4 },
            { i: "f", x: 1, y: 4, w: 4, h: 4 },
            { i: "g", x: 1, y: 4, w: 4, h: 4 },
            { i: "h", x: 1, y: 4, w: 4, h: 4 },
            { i: "i", x: 1, y: 4, w: 4, h: 4 }
        ]
    },
    {
        id: 2,
        name: "Tasks & Approvals Dashboard [CDL15]",
        layouts: [
            { i: "1", x: 0, y: 0, w: 4, h: 3 },
            { i: "2", x: 4, y: 0, w: 4, h: 3 },
            { i: "3", x: 8, y: 0, w: 4, h: 3 },
            { i: "4", x: 0, y: 3, w: 6, h: 2 },
            { i: "a", x: 6, y: 3, w: 6, h: 4 },
            { i: "b", x: 0, y: 5, w: 8, h: 5 },
            { i: "c", x: 8, y: 5, w: 4, h: 5 },
            { i: "d", x: 0, y: 10, w: 4, h: 4 },
            { i: 'e', x: 4, y: 10, w: 8, h: 4 },
            { i: "f", x: 0, y: 14, w: 6, h: 3 }
        ]
    },
    {
        id: 3,
        name: "Connections Dashboard [CDL85]",
        layouts: [
            { i: "1", x: 0, y: 0, w: 3, h: 3 },
            { i: "2", x: 3, y: 0, w: 3, h: 3 },
            { i: "3", x: 6, y: 0, w: 3, h: 3 },
            { i: "4", x: 9, y: 0, w: 3, h: 3 },
            { i: "a", x: 0, y: 3, w: 9, h: 5 },
            { i: "b", x: 9, y: 3, w: 3, h: 7 },
            { i: "c", x: 0, y: 8, w: 6, h: 5 },
            { i: "d", x: 6, y: 8, w: 6, h: 4 },
            { i: 'e', x: 0, y: 13, w: 4, h: 4 },
            { i: "f", x: 4, y: 13, w: 8, h: 4 }
        ]
    },
    {
        id: 4,
        name: "Feedback Reports Dashboard [CDL07]",
        layouts: [
            { i: "1", x: 0, y: 0, w: 3, h: 3 },
            { i: "2", x: 3, y: 0, w: 3, h: 3 },
            { i: "3", x: 6, y: 0, w: 3, h: 3 },
            { i: "4", x: 9, y: 0, w: 3, h: 3 },
            { i: "a", x: 0, y: 3, w: 6, h: 5 },
            { i: "b", x: 6, y: 3, w: 6, h: 5 },
            { i: "c", x: 0, y: 8, w: 9, h: 6 },
            { i: "d", x: 9, y: 8, w: 3, h: 6 },
            { i: 'e', x: 0, y: 14, w: 6, h: 4 },
            { i: "f", x: 6, y: 14, w: 6, h: 4 }
        ]
    },
    {
        id: 5,
        name: "Events Managing Dashboard [CDL152]",
        layouts: [
            { i: "1", x: 0, y: 0, w: 4, h: 2 },
            { i: "2", x: 4, y: 0, w: 4, h: 2 },
            { i: "3", x: 8, y: 0, w: 4, h: 2 },
            { i: "4", x: 0, y: 2, w: 12, h: 4 },
            { i: "a", x: 0, y: 6, w: 6, h: 5 },
            { i: "b", x: 6, y: 6, w: 6, h: 5 },
            { i: "c", x: 0, y: 11, w: 6, h: 5 },
            { i: "d", x: 6, y: 11, w: 6, h: 5 },
            { i: 'e', x: 0, y: 16, w: 6, h: 4 },
            { i: "f", x: 6, y: 16, w: 6, h: 4 }
        ]
    },
]

export const DefaultLayout = [
    {
        "id": 3, "name": "Dash 2",
        "layouts": [{ "h": 4, "i": "1", "w": 12, "x": 0, "y": 0 }, { "h": 5, "i": "a", "w": 6, "x": 0, "y": 1 }, { "h": 9, "i": "b", "w": 12, "x": 1, "y": 2 },
        { "h": 5, "i": "c", "w": 6, "x": 1, "y": 1 }, { "h": 11, "i": "d", "w": 8, "x": 1, "y": 3 }, { "h": 4, "i": "e", "w": 4, "x": 1, "y": 4 },
        { "h": 4, "i": "f", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "g", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "h", "w": 4, "x": 1, "y": 4 },
        { "h": 4, "i": "i", "w": 4, "x": 1, "y": 4 }], "selected_reports": [{ "report_id": 11, "widget_id": "1" }, { "report_id": 11, "widget_id": "a" },
        { "report_id": 15, "widget_id": "c" }, { "report_id": 13, "widget_id": "b" }]
    },

    {
        "id": 2, "name": "Dash 3", "layouts": [{ "h": 4, "i": "1", "w": 11, "x": 0, "y": 0, "moved": false, "static": false },
        { "h": 5, "i": "a", "w": 6, "x": 0, "y": 4, "moved": false, "static": false }, { "h": 8, "i": "b", "w": 7, "x": 0, "y": 9, "moved": false, "static": false },
        { "h": 5, "i": "c", "w": 6, "x": 6, "y": 4, "moved": false, "static": false }, { "h": 7, "i": "d", "w": 5, "x": 0, "y": 17, "moved": false, "static": false },
        { "h": 6, "i": "e", "w": 6, "x": 0, "y": 24, "moved": false, "static": false }, { "h": 6, "i": "f", "w": 6, "x": 6, "y": 24, "moved": false, "static": false },
        { "h": 7, "i": "g", "w": 7, "x": 5, "y": 17, "moved": false, "static": false }, { "h": 8, "i": "h", "w": 5, "x": 7, "y": 9, "moved": false, "static": false }], "selected_reports": [{ "report_id": 11, "widget_id": "a" }, { "report_id": 10, "widget_id": "1" }, { "report_id": 15, "widget_id": "c" }, { "report_id": 13, "widget_id": "b" }, { "report_id": 12, "widget_id": "h" }, { "report_id": 9, "widget_id": "d" }, { "report_id": 16, "widget_id": "f" }, { "report_id": 18, "widget_id": "e" }, { "report_id": 17, "widget_id": "g" }]
    },
    {
        "id": 3, "name": "Dash 2", "layouts": [{ "h": 4, "i": "1", "w": 12, "x": 0, "y": 0 }, { "h": 5, "i": "a", "w": 6, "x": 0, "y": 1 },
        { "h": 9, "i": "b", "w": 12, "x": 1, "y": 2 }, { "h": 5, "i": "c", "w": 6, "x": 1, "y": 1 }, { "h": 11, "i": "d", "w": 8, "x": 1, "y": 3 },
        { "h": 4, "i": "e", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "f", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "g", "w": 4, "x": 1, "y": 4 },
        { "h": 4, "i": "h", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "i", "w": 4, "x": 1, "y": 4 }], "selected_reports": [{ "report_id": 11, "widget_id": "1" },
        { "report_id": 11, "widget_id": "a" }, { "report_id": 15, "widget_id": "c" }, { "report_id": 13, "widget_id": "b" }]
    },
    {
        "id": 4, "name": "dash 4", "layouts": [{ "h": 4, "i": "1", "w": 12, "x": 0, "y": 0 }, { "h": 5, "i": "a", "w": 6, "x": 0, "y": 1 },
        { "h": 9, "i": "b", "w": 12, "x": 1, "y": 2 }, { "h": 5, "i": "c", "w": 6, "x": 1, "y": 1 }, { "h": 11, "i": "d", "w": 8, "x": 1, "y": 3 },
        { "h": 4, "i": "e", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "f", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "g", "w": 4, "x": 1, "y": 4 },
        { "h": 4, "i": "h", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "i", "w": 4, "x": 1, "y": 4 }]
    }]

export const TasksDummyData = [
    { "id": 18000001, "name": "Task A", "on_behalf_of": "Alice Johnson", "status": "In Progress", "approval_state": "Pending", "short_description": "Fix bug in module X", "description": "There is a critical bug in module X that needs to be resolved urgently.", "private_comments": "Needs review by senior developer", "public_comments": "Jane Smith", "active": true, "history": "Created on 2024-05-01, Updated on 2024-05-02", "priority": "High", "requested_email": "alice.johnson@example.com", "departed": "No", "state": "Open", "assigned_members": "John Doe", "approved_by": "", "requested_by": "Alice Johnson", "task_type": "Bug", "attachments": "screenshot.png", "price_per_unit": "", "quantity": "" },
    { "id": 18000002, "name": "Task B", "on_behalf_of": "Bob Williams", "status": "Completed", "approval_state": "Approved", "short_description": "Develop new feature Y", "description": "Implement new feature Y according to the specifications provided.", "private_comments": "Tested and approved", "public_comments": "Jane Smith", "active": false, "history": "Created on 2024-04-25, Completed on 2024-05-03", "priority": "Medium", "requested_email": "bob.williams@example.com", "departed": "No", "state": "Closed", "assigned_members": "Mary Johnson", "approved_by": "Sarah Lee", "requested_by": "Bob Williams", "task_type": "Feature", "attachments": "design_doc.pdf", "price_per_unit": "", "quantity": "" },
    { "id": 18000003, "name": "Task C", "on_behalf_of": "Charlie Brown", "status": "Pending", "approval_state": "Pending", "short_description": "Update documentation", "description": "Update the project documentation to include the latest changes and features.", "private_comments": "Awaiting review from documentation team", "public_comments": "Jane Smith", "active": true, "history": "Created on 2024-05-10", "priority": "Low", "requested_email": "charlie.brown@example.com", "departed": "No", "state": "Open", "assigned_members": "Emily Clark", "approved_by": "", "requested_by": "Charlie Brown", "task_type": "Documentation", "attachments": "doc_update_notes.txt", "price_per_unit": "", "quantity": "" }
]

export const ApprovalsDummyData = [
    { "id": '1', "state": "Open", "approved_by": "John Doe", "requested_by": "Alice Johnson", "approved_date": "2024-05-02", "created_date": "2024-05-01", "approved_notes": "Reviewed and approved by John Doe", "short_description": "Fix bug in module X", "description": "There is a critical bug in module X that needs to be resolved urgently.", "active": "true", "name": "Task A", "approval_group": "Development Team", "location": "New York", "due_date": "2024-05-10" },
    { "id": '2', "state": "Closed", "approved_by": "Sarah Lee", "requested_by": "Bob Williams", "approved_date": "2024-05-03", "created_date": "2024-04-25", "approved_notes": "Completed and approved by Sarah Lee", "short_description": "Develop new feature Y", "description": "Implement new feature Y according to the specifications provided.", "active": "false", "name": "Task B", "approval_group": "Product Team", "location": "San Francisco", "due_date": "2024-05-03" },
    { "id": '3', "state": "Pending", "approved_by": "", "requested_by": "Charlie Brown", "approved_date": "", "created_date": "2024-05-10", "approved_notes": "", "short_description": "Update documentation", "description": "Update the project documentation to include the latest changes and features.", "active": "true", "name": "Task C", "approval_group": "Documentation Team", "location": "Remote", "due_date": "2024-05-20" }
]


export const CompaniesDummyData = [
    { "company_name": "CompanyH", "id": "ABC123", "street": "123 Main Street", "city": "Cityville", "state_or_country": "State1", "postal_code": "12345", "phone_no": "123-456-7890", "fax_no": "987-654-3210", "contact_person": "Vendor", "currency": "USD" },
    { "company_name": "CompanyA", "id": "XYZ789", "street": "456 Oak Avenue", "city": "Townsville", "state_or_country": "Country1", "postal_code": "54321", "phone_no": "456-789-0123", "fax_no": "012-345-6789", "contact_person": "Supplier", "currency": "EUR" },
    { "company_name": "CompanyB", "id": "LMN456", "street": "789 Pine Lane", "city": "Villagetown", "state_or_country": "State2", "postal_code": "67890", "phone_no": "789-012-3456", "fax_no": "345-678-9012", "contact_person": "Customer", "currency": "GBP" },
    { "company_name": "CompanyC", "id": "PQR789", "street": "987 Birch Street", "city": "Hamletsville", "state_or_country": "Country2", "postal_code": "09876", "phone_no": "987-654-3210", "fax_no": "210-987-6543", "contact_person": "Client", "currency": "JPY" },
    { "company_name": "CompanyD", "id": "DEF321", "street": "321 Maple Road", "city": "Countryside", "state_or_country": "State3", "postal_code": "56789", "phone_no": "321-654-9870", "fax_no": "876-543-2109", "contact_person": "Partner", "currency": "CAD" },
    { "company_name": "CompanyE", "id": "GHI654", "street": "654 Cedar Drive", "city": "Metropolis", "state_or_country": "Country3", "postal_code": "23456", "phone_no": "654-987-0123", "fax_no": "321-098-7654", "contact_person": "Associate", "currency": "AUD" },
    { "company_name": "CompanyF", "id": "JKL987", "street": "789 Elm Circle", "city": "Citytown", "state_or_country": "State4", "postal_code": "45678", "phone_no": "789-012-3456", "fax_no": "543-210-9876", "contact_person": "Agent", "currency": "CHF" },
    { "company_name": "CompanyG", "id": "MNO123", "street": "123 Oak Avenue", "city": "Townsville", "state_or_country": "Country4", "postal_code": "56789", "phone_no": "123-456-7890", "fax_no": "098-765-4321", "contact_person": "Dealer", "currency": "SEK" },
    { "company_name": "CompanyH", "id": "PQR321", "street": "321 Pine Lane", "city": "Villagetown", "state_or_country": "State5", "postal_code": "67890", "phone_no": "321-654-9870", "fax_no": "765-432-1098", "contact_person": "Trader", "currency": "NOK" },
    { "company_name": "CompanyI", "id": "STU654", "street": "654 Birch Street", "city": "Hamletsville", "state_or_country": "Country5", "postal_code": "78901", "phone_no": "654-987-0123", "fax_no": "321-098-7654", "contact_person": "Broker", "currency": "DKK" },
    { "company_name": "CompanyJ", "id": "VWX987", "street": "987 Maple Road", "city": "Countryside", "state_or_country": "State6", "postal_code": "89012", "phone_no": "987-654-3210", "fax_no": "210-987-6543", "contact_person": "Wholesaler", "currency": "NZD" },
    { "company_name": "CompanyK", "id": "YZA123", "street": "123 Cedar Drive", "city": "Metropolis", "state_or_country": "Country6", "postal_code": "90123", "phone_no": "123-456-7890", "fax_no": "543-210-9876", "contact_person": "Retailer", "currency": "SGD" },
    { "company_name": "CompanyL", "id": "BCD321", "street": "321 Elm Circle", "city": "Citytown", "state_or_country": "State7", "postal_code": "01234", "phone_no": "321-654-9870", "fax_no": "765-432-1098", "contact_person": "Distributor", "currency": "HKD" },
    { "company_name": "CompanyM", "id": "EFG654", "street": "654 Oak Avenue", "city": "Townsville", "state_or_country": "Country7", "postal_code": "12345", "phone_no": "654-987-0123", "fax_no": "321-098-7654", "contact_person": "Manufacturer", "currency": "INR" },
    { "company_name": "CompanyN", "id": "HIJ987", "street": "987 Pine Lane", "city": "Villagetown", "state_or_country": "State8", "postal_code": "23456", "phone_no": "987-654-3210", "fax_no": "210-987-6543", "contact_person": "Exporter", "currency": "CNY" },
    { "company_name": "CompanyO", "id": "KLM123", "street": "123 Birch Street", "city": "Hamletsville", "state_or_country": "Country8", "postal_code": "34567", "phone_no": "123-456-7890", "fax_no": "543-210-9876", "contact_person": "Importer", "currency": "KRW" },
    { "company_name": "CompanyP", "id": "NOP321", "street": "321 Maple Road", "city": "Countryside", "state_or_country": "State9", "postal_code": "45678", "phone_no": "321-654-9870", "fax_no": "765-432-1098", "contact_person": "Agent", "currency": "TRY" },
    { "company_name": "CompanyQ", "id": "QRS654", "street": "654 Cedar Drive", "city": "Metropolis", "state_or_country": "Country9", "postal_code": "56789", "phone_no": "654-987-0123", "fax_no": "321-098-7654", "contact_person": "Consultant", "currency": "ZAR" },
    { "company_name": "CompanyR", "id": "TUV987", "street": "987 Elm Circle", "city": "Citytown", "state_or_country": "State10", "postal_code": "67890", "phone_no": "987-654-3210", "fax_no": "210-987-6543", "contact_person": "Advisor", "currency": "BRL" },
    { "company_name": "CompanyS", "id": "WXY123", "street": "123 Oak Avenue", "city": "Townsville", "state_or_country": "Country10", "postal_code": "78901", "phone_no": "123-456-7890", "fax_no": "543-210-9876", "contact_person": "Analyst", "currency": "MXN" }
]

export const RolesDummyDatalist = [
    {
        "role_name": "Admin",
        "role_id": 1,
        "require_licence": "Yes",
        "description": "Administrator with full access",
        "role_type": "Global",
        "active": true,
        "extended_roles": "No"
    },
    {
        "role_name": "Manager",
        "role_id": 2,
        "require_licence": "Yes",
        "description": "Managerial role with moderate access",
        "role_type": "Local",
        "active": true,
        "extended_roles": "Yes"
    },
    {
        "role_name": "User",
        "role_id": 3,
        "require_licence": "No",
        "description": "Standard user with basic access",
        "role_type": "Local",
        "active": true,
        "extended_roles": "No"
    },
    {
        "role_name": "Guest",
        "role_id": 4,
        "require_licence": "No",
        "description": "Limited access for guests",
        "role_type": "Private",
        "active": false,
        "extended_roles": "No"
    },
    {
        "role_name": "Support",
        "role_id": 5,
        "require_licence": "Yes",
        "description": "Role for customer support",
        "role_type": "Global",
        "active": true,
        "extended_roles": "Yes"
    },
    {
        "role_name": "Developer",
        "role_id": 6,
        "require_licence": "Yes",
        "description": "Role for software developers",
        "role_type": "Global",
        "active": true,
        "extended_roles": "Yes"
    },
    {
        "role_name": "Tester",
        "role_id": 7,
        "require_licence": "No",
        "description": "Role for software testers",
        "role_type": "Local",
        "active": true,
        "extended_roles": "No"
    },
    {
        "role_name": "Analyst",
        "role_id": 8,
        "require_licence": "No",
        "description": "Role for business analysts",
        "role_type": "Local",
        "active": true,
        "extended_roles": "Yes"
    },
    {
        "role_name": "Consultant",
        "role_id": 9,
        "require_licence": "Yes",
        "description": "Role for external consultants",
        "role_type": "Private",
        "active": false,
        "extended_roles": "No"
    },
    {
        "role_name": "Trainee",
        "role_id": 10,
        "require_licence": "No",
        "description": "Role for trainees",
        "role_type": "Local",
        "active": true,
        "extended_roles": "No"
    }
]