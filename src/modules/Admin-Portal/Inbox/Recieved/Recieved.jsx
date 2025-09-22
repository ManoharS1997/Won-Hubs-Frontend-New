
import {
    BodyContainer,
    ContentContainer,
    CustomContainer,
    CustomHeading,
    CustomTable,
    RecievedContainer,
    TableBody,
    TableContainer,
    TableData,
    TableHead,
    TableHeader,
    TableRow
} from './StyledComponents'


// Recieved data for tesing
const data = [
    { from: "Jim Harper", subject: "Invoice details for the customer dated 22-02-2023" },
    { from: "Charles Darwin", subject: "Customer feedback survey form results for product delivery" },
    { from: "Jim Harper", subject: "Invoice details for the customer dated 22-02-2023" },
    { from: "Charles Darwin", subject: "Customer feedback survey form results for product delivery" },
    { from: "Jim Harper", subject: "Invoice details for the customer dated 22-02-2023" },
    { from: "Charles Darwin", subject: "Customer feedback survey form results for product delivery" },
    { from: "John Doe", subject: "Meeting agenda for next week" },
    { from: "Jane Smith", subject: "Proposal for new project collaboration" },
    { from: "Alice Johnson", subject: "Status update on ongoing project" },
    { from: "Bob Anderson", subject: "Discussion points for team meeting" },
    { from: "Eva Williams", subject: "Product launch plan and timeline" },
    { from: "Michael Davis", subject: "Request for information on recent changes" },
    { from: "Sara Brown", subject: "Reminder: Upcoming deadline for project submissions" },
    { from: "Daniel Lee", subject: "Feedback and suggestions for team building event" },
    { from: "Sophia White", subject: "Invitation to company social gathering" },
    { from: "Ryan Miller", subject: "Announcement: Employee of the Month" },
];

export default function Recieved() {
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
        <RecievedContainer>
            <BodyContainer>
                <CustomContainer>
                    <ContentContainer>
                        <CustomHeading>Recieved Notifications</CustomHeading>

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
                </CustomContainer>
            </BodyContainer>
        </RecievedContainer>
    )
}