

import {
    BodyContainer,
    ComponentContainer,
    ContentContainer,
    CustomHeading,
    CustomTable,
    ScheduledContainer,
    TableBody,
    TableContainer,
    TableData,
    TableHead,
    TableHeader,
    TableRow
} from './StyledComponents'


// Recieved data for tesing
const data = [
    { from: "Dr. Emily Peterson", subject: "Lab results ready for review" },
    { from: "Delivery Service", subject: "Package delayed due to weather conditions" },
    { from: "University Library", subject: "Overdue book notice: Introduction to Philosophy" },
    { from: "John Doe", subject: "Meeting next week" },
    { from: "Company XYZ", subject: "Product update" },
    { from: "Friend ABC", subject: "Weekend plans" },
    { from: "Tech Support", subject: "Scheduled maintenance on your account" },
    { from: "Marketing Team", subject: "New product launch event" },
    { from: "Health Insurance", subject: "Important policy update" },
    { from: "Weather Service", subject: "Severe weather warning in your area" },
    { from: "Event Organizer", subject: "Reminder: Tickets for upcoming concert" },
    { from: "Job Opportunity", subject: "Exciting career opportunity at XYZ Company" },
    { from: "Social Media", subject: "Your friend mentioned you in a post" },
    { from: "Travel Agency", subject: "Special discounts on holiday packages" },
    { from: "Fitness Trainer", subject: "New workout plan for better results" },
    { from: "Pet Care", subject: "Annual check-up reminder for your pet" },
    { from: "Finance Department", subject: "Monthly expense report" },
    { from: "Local News", subject: "Breaking news update: Traffic alert" },
    { from: "Online Course Platform", subject: "New courses available in your area of interest" },
    { from: "Customer Feedback", subject: "We value your opinion – please take a survey" },
    // Add more rows as needed
];

export default function Scheduled() {
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
        <ScheduledContainer>
            <BodyContainer>
                <ComponentContainer>
                    <ContentContainer>
                        <CustomHeading>Scheduled Notifications</CustomHeading>

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
        </ScheduledContainer>
    )
}