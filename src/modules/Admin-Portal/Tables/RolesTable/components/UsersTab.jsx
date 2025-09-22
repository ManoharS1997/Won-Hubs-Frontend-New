import {
    // TabHeaderContainer,
    CustomTbody,
    CustomTable,
    CustomTd,
    CustomTh,
    CustomTr,
    CustomThead,
    TableContainer
} from './RoleDeatailedViewStyledComponents.jsx'

const usersData = [
    { id: 1, user: "Kit", state: 'Active', inherited: 'false', inheritanceCount: 0 },
    { id: 2, user: "John", state: 'Inactive', inherited: 'true', inheritanceCount: 2 },
    { id: 3, user: "Alice", state: 'Active', inherited: 'false', inheritanceCount: 0 },
    { id: 4, user: "Bob", state: 'Active', inherited: 'true', inheritanceCount: 1 },
    { id: 5, user: "Eva", state: 'Inactive', inherited: 'false', inheritanceCount: 0 },
    { id: 6, user: "Charlie", state: 'Active', inherited: 'false', inheritanceCount: 0 },
    { id: 7, user: "Lucy", state: 'Inactive', inherited: 'true', inheritanceCount: 3 },
    { id: 8, user: "Max", state: 'Active', inherited: 'false', inheritanceCount: 0 },
    { id: 9, user: "Sophie", state: 'Active', inherited: 'true', inheritanceCount: 2 },
    { id: 10, user: "Oliver", state: 'Inactive', inherited: 'false', inheritanceCount: 0 },
    { id: 11, user: "Mia", state: 'Active', inherited: 'true', inheritanceCount: 1 },
    { id: 12, user: "Leo", state: 'Active', inherited: 'false', inheritanceCount: 0 },
]


export default function UsersTab({recordsPerPage}){
    return(
        <TableContainer>
            <CustomTable>
                <CustomThead>
                    <CustomTr>
                        <CustomTh>User ID</CustomTh>
                        <CustomTh>User</CustomTh>
                        <CustomTh>State</CustomTh>
                        <CustomTh>Inherited</CustomTh>
                        <CustomTh>Inheritance Count</CustomTh>
                    </CustomTr>
                </CustomThead>
                
                <CustomTbody>
                    {usersData.slice(0, recordsPerPage).map(user => (
                        <CustomTr key={user.id}>
                            <CustomTd>{user.id}</CustomTd>
                            <CustomTd>{user.user}</CustomTd>
                            <CustomTd><a href='#'>{user.state}</a></CustomTd>
                            <CustomTd>{user.inherited}</CustomTd>
                            <CustomTd>{user.inheritanceCount}</CustomTd>
                        </CustomTr>
                    ))}
                    
                </CustomTbody>
            </CustomTable>
        </TableContainer>
    )
}