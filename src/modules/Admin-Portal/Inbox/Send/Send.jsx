

import {
    BodyContainer,
    ComponentContainer,
    ContentContainer,
    CustomHeading,
    CustomTable,
    SendContainer,
    TableBody,
    TableContainer,
    TableData,
    TableHead,
    TableHeader,
    TableRow
} from './StyledComponents'


// Recieved data for tesing
const data = [
    { from: "Local Bookstore", subject: "Author event: Meet your favorite novelist!" },
    { from: "Gym Membership", subject: "Reminder: Group fitness class tonight at 7 PM" },
    { from: "Streaming Service", subject: "New season of your favorite show available now!" },
    { from: "Company ABC", subject: "Important announcement for employees" },
    { from: "Tech Conference", subject: "Last chance to register for the upcoming conference" },
    { from: "Health Insurance", subject: "Update on your health insurance coverage" },
    { from: "Travel Agency", subject: "Special deals on holiday packages this season" },
    { from: "Financial Advisor", subject: "Tips for managing your investment portfolio" },
    { from: "Local News", subject: "Breaking news: Major event happening in the city" },
    { from: "Online Course Platform", subject: "Enroll now in the new coding bootcamp" },
    { from: "Music Streaming", subject: "Discover new playlists curated for you" },
    { from: "Fitness App", subject: "Your weekly workout schedule is ready" },
    { from: "Job Recruitment", subject: "Exciting job opportunities matching your skills" },
    { from: "Food Delivery", subject: "Try our new menu items with exclusive discounts" },
    { from: "Weather Service", subject: "Weekly weather forecast for your location" },
    { from: "Online Retailer", subject: "Flash sale: Limited-time discounts on popular items" },
    { from: "Social Media", subject: "New friend requests and notifications" },
    { from: "Tech News", subject: "Latest developments in the tech industry" },
    { from: "Community Events", subject: "Join upcoming community gatherings and activities" },
    { from: "Virtual Assistant", subject: "Tips for optimizing your productivity" },
    { from: "Fashion Newsletter", subject: "Explore the latest fashion trends this season" },
    // Add more rows as needed
];


export default function Send() {
    const cellWidth = 40;

    // styles for the table
    const styles = {
        tableCell: {
            width: cellWidth,
            borderRight: "1px solid #eee",
        },
        tableRow: {
            marginBottom: "10px",
        },
    };

    return (
        <SendContainer>
            <BodyContainer>
                <ComponentContainer>
                    <ContentContainer>
                        <CustomHeading>Send Notifications</CustomHeading>

                        <TableContainer>
                            <CustomTable>
                                <TableHead>
                                    <TableRow>
                                        <TableHeader style={styles.tableCell}>From</TableHeader>
                                        <TableHeader style={styles.tableCell}>Subject</TableHeader>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {data.map((item) => (
                                        <TableRow key={item.from} style={styles.tableRow}>
                                            <TableData style={styles.tableCell}>{item.from}</TableData>
                                            <TableData style={styles.tableCell}>{item.subject}</TableData>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </CustomTable>
                        </TableContainer>
                    </ContentContainer>

                </ComponentContainer>
            </BodyContainer>
        </SendContainer>
    )
}