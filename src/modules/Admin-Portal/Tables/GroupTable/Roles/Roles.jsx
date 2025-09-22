import { CiFilter } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { FaRegWindowMinimize } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";

import { RolesDummyData as dummyData } from "../../../../../../public/DataFile/AnnouncementData";

import {
    Dropdown, DropdownOptions, EditBtn, EditCon,
    FilterCon, HeaderNEditCon, MinimiseBtn, RolesCon,
    SaveBtn, SearchInput, SettingBtn, Table,
    TableCon, TBody, TdTag, ThTag,
    TrTag, UpdateBtn, Warning,
} from './StyledComponents'

const Roles = () => {
    
    const Columns = Object.keys(dummyData[0] || {})

    const OnChangeFilter = () => {
        console.log('write functionality for filter')
    }

    const OnChangeSearch = () => {
        console.log('write functionality for search')
    }

    const handleUpdate = () => {
        console.log('write functionality for update button')
    }

    const handleSave = () => {
        console.log('write functionality for save button')
    }

    const handleSettings = () => {
        console.log('write functionality for settings button')
    }

    const handleMinimise = () => {
        console.log('write functionality for minimise button')
    }

    const handleEdit = () => {
        console.log('write functionality for Edit button')
    }

    return (
        <RolesCon>
            <HeaderNEditCon>
                <FilterCon>
                    <CiFilter size={23} />
                    <Dropdown onChange={OnChangeFilter}>
                        {Columns.map((each) => (
                            <DropdownOptions key={each}>{each}</DropdownOptions>
                        ))}
                    </Dropdown>
                    <SearchInput onChange={OnChangeSearch} type="search" placeholder="Search" />
                </FilterCon>
                
                <EditCon>
                    <UpdateBtn onClick={handleUpdate}>Update</UpdateBtn>
                    
                    <SaveBtn onClick={handleSave}>Save</SaveBtn>
                    
                    <SettingBtn onClick={handleSettings}>
                        <IoIosSettings size={18} />
                    </SettingBtn>

                    <MinimiseBtn onClick={handleMinimise}>
                        <FaRegWindowMinimize />
                    </MinimiseBtn>

                    <EditBtn onClick={handleEdit}>Edit...</EditBtn>
                </EditCon>
            </HeaderNEditCon>

            <TableCon>
                {dummyData.length > 0 ? (
                    <Table>
                        <thead>
                            <TrTag>
                                {Columns.map((each) => (
                                    <ThTag key={each}>{each}</ThTag>
                                ))}
                            </TrTag>
                        </thead>

                        <TBody>
                            {dummyData.map((row, index) => (
                                <TrTag key={index}>
                                    {Columns.map((colName, index) => (
                                        <TdTag key={index}>
                                            {row[colName]}
                                        </TdTag>
                                    ))}

                                </TrTag>
                            ))}
                        </TBody>
                    </Table>
                ) : (<Warning>
                    <CiWarning size={100} />
                    <p>No Records Found</p>
                </Warning>)}
            </TableCon>
        </RolesCon>
    )
}

export default Roles