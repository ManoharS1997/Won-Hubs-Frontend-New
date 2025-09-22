

import {
    BodyContainer,
    ComponentContainer,
    ContentContainer,
    CustomHeading,
    CustomTable,
    TableBody,
    TableContainer,
    TableData,
    TableHead,
    TableHeader,
    TableRow,
    TrashContainer
} from "./StyledComponents";


// Recieved data for tesing
const data = [
    {
        from: "City Government",
        subject: "Important information about upcoming road closures",
    },
    {
        from: "Travel Agency",
        subject: "Flight confirmation for your upcoming trip to Hawaii",
    },
    {
        from: "Job Application",
        subject:
            "Status update: Your application for [position] is still under review",
    },
    {
        from: "Friend",
        subject: "Catching up: Coffee this weekend?"
    },
    {
        from: "Company XYZ",
        subject: "Invitation to our product launch event"
    },
    {
        from: "Tech News",
        subject: "Latest updates on breakthrough technologies"
    },
    {
        from: "Fitness Trainer",
        subject: "Your personalized workout plan for the week",
    },
    {
        from: "Book Club",
        subject: "Next book selection and meeting details"
    },
    {
        from: "Financial Advisor",
        subject: "Tips for managing your investment portfolio",
    },
    {
        from: "Healthcare Provider",
        subject: "Reminder: Annual health checkup scheduled",
    },
    {
        from: "Event Organizer",
        subject: "Tickets and details for the upcoming concert",
    },
    {
        from: "Online Store",
        subject: "Exclusive discounts on your favorite products",
    },
    {
        from: "Weather Service",
        subject: "Weather forecast for the upcoming week",
    },
    {
        from: "Local News",
        subject: "Top headlines in your city today"
    },
    {
        from: "Music Playlist",
        subject: "Discover new songs in this week's playlist",
    },
    {
        from: "Podcast Recommendation",
        subject: "Latest episodes of your favorite podcast series",
    },
    {
        from: "Learning Platform",
        subject: "New courses available: Expand your knowledge!",
    },
];

// Now, the `data` array contains 20 objects.

export default function Trash() {
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
        <TrashContainer>
            <BodyContainer>
                <ComponentContainer>
                    <ContentContainer>
                        <CustomHeading>Trashed Notifications</CustomHeading>

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
                                            <TableData style={styles.tableCell}>
                                                {item.subject}
                                            </TableData>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </CustomTable>
                        </TableContainer>

                    </ContentContainer>
                </ComponentContainer>
            </BodyContainer>
        </TrashContainer>
    );
}
