import styled, { keyframes } from "styled-components";
import BootstrapDropdown from "react-bootstrap/Dropdown";

const fadeIn = keyframes`
    from {
    opacity: 0;
    transform: translateY(-10px); /* Move the dropdown up initially */
    }
    to {
    opacity: 1;
    transform: translateY(0); /* Move the dropdown down */
    }
`
const slideIn = keyframes` //animation source
    from {
    opacity: 0;
    transform: translateX(-10px); /* Move the sub-menu to the left initially */
    }
    to {
    opacity: 1;
    transform: translateX(0); /* Move the sub-menu to its original position */
    }
`
export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
`;
export const AllText = styled.h1`
    font-size: 15px;
    margin: 5px;
    padding: 0;
    text-align: left;
`;
export const AndBtn = styled.button`
    height: 30px;
    min-width: 50px;
    width: fit-content;
    outline: none;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #000;
    padding: 4px;
    font-size: 1rem;
    border-radius: 13px;
`;
export const AndOrBtnClose = styled.button`
    height: 30px;
    width: 30px;
    outline: none;
    border: 1px solid #ccc;
    background-color: #fff;
    color: red;
    padding: 0px;
    margin-left: 5px;
    border-radius: 50%;
`;
export const BackBtn = styled.button`
    height: 30px;
    width: 30px;
    padding: 0;
    outline: none;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
    margin-right: 10px;
    border-radius: 8px;
    border: none;
    color: #000;
    cursor: pointer;

    &:hover {
        outline: none;
        border: none;
    }
`;
export const CheckBoxTag = styled.input`
    background-color: #fff;
    color: #fff;
`;
export const CloseManageAccountBtn = styled.button`
    margin-left: auto;
    margin-right: 2px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: transparent;
    color: #000;
    outline: none;
    padding: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none;
    &:hover {
        background-color: red;
        color: #FFFFFF;
    }
`
export const ConfigureButton = styled.button`
    text-align: center;
    display: flex;
    align-items: center;
    height: 30px;
    outline: none;
    border: 1px solid #6c757d;
    padding: 5px;
    margin-right: 5px;
    margin-left: 5px;
    background-color: #FFFFFF;
    color: #353535;
    outline: none;
`;
export const CustomContainer = styled.div`
    width: fit-content;
    flex-grow: 1;
    height: 93vh;
    overflow-y: auto;
    padding: 10px;
    background-color: var(--background-color);
`;
export const CustomTbody = styled.tbody`
`;
export const CustomTr = styled.tr`
    border-bottom: 1px solid #e5e5e5;
    overflow-y: auto;
    &:hover {
        background-color: #e5e5e5;
    }
`;
export const CustomUserTable = styled.table`
    width: 100%;
    height: fit-content;
    flex-grow: 1;
    margin: 0px;
    background-color: #fff;
    border-collapse: collapse;
`;
export const CustomViewContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
export const MultiLevelDropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    height: 20px;
    width: fit-content;
`;
export const DropdownMenu = styled.ul`
    list-style: none;
    padding: 0;
    margin: 1px;
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
    width: 200px;
    border-radius: 3px;
    opacity: 0;
    animation: ${fadeIn} 0.3s ease-in-out;

    ${MultiLevelDropdownContainer}:hover & {
        display: block;
        opacity: 1;
    }
`;
export const DropdownToggle = styled.div`
    cursor: pointer;
    height: fit-content;
    width: fit-content;
    font-size: 22px;
    font-weight: bold;
`;
export const FilterBtn = styled.button`
    height: 30px;
    width: 30px;
    padding: 0;
    outline: none;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin-right: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    color: #000;

    &:hover {
        outline: none;
        border: none;
        background-color: #e9ecef;
    }
`;
export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 10px 10px 6px;
`;
export const FormContent = styled.div`
    border-radius: 15px;
    padding: 0px;
    background-color: var(--background-color);
    min-height: 100%;
`;
export const HeaderContainer = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0px ;
    border-radius: 5px;
`;
export const ManageAccountContent = styled.div`
    height: 90%;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 1px;
`
export const MenuItem = styled.li`
    display: flex;
    padding: 6px 10px 6px;
    align-items: center;
    color: #000;
    &:hover {
        background-color: #f0f0f0;
    }

    .plus {
        margin: 0;
        padding: 0;
        position: absolute;
        right: 10px;
    }
`;
export const OrBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    min-width: 40px;
    background-color: #fff;
    color: #000;
    padding: 0px;
    margin: 0px 4px 0px 4px;
    font-size: 1rem;
    text-align: center;
    border-radius: 13px;
    border: 1px solid #ccc;
`;
export const SearchInput = styled.input`
    height: 30px;
    border-radius: 8px;
    outline: none;
    border: 1px solid #6c757d;
    padding: 5px;
    margin-left: 3px;
    margin-right: 3px;
    background-color: #fff;
    color: #000;
`;
export const SideNavNContentContainer = styled.div`
    width: 100%;
    height: 93vh;
    background-color: #e5e5e5;
    display: flex;
`;
export const StyledDropDown = styled(BootstrapDropdown)`
    height: 30px;
    min-width: 140px;
    max-width: fit-content;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
`;
export const StyledItem = styled(BootstrapDropdown.Item)`
    padding: 0px 0px 0px 5px;
    border-radius: 3px;
    &:hover {
        background-color: #e8e8e4;
    }
`;
export const StyledMenu = styled(BootstrapDropdown.Menu)`
    width: 100%;
    min-height: fit-content;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 200px;
    padding: 3px;
    background-color: #fff;

    &::-webkit-scrollbar{
        width: 2px;
    }
    &::-webkit-scrollbar-track{
        background: transparent;
    }
`;
export const StyledToggle = styled(BootstrapDropdown.Toggle)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: none;
`;
export const SubMenu = styled.ul`
    position: absolute;
    top: 0;
    left: 100%;
    display: none;
    min-width: 100px;
    z-index: 1;
    width: 150px;
    background-color: #fff;
    margin: 2px;
    list-style-type: none;
    padding-left: 0px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    opacity: 0;
    animation: ${slideIn} 0.3s ease-in-out;

    ${MenuItem}:hover & {
        display: block;
        opacity: 1;
    }
`;
export const SubMenuItem = styled.li`
    padding: 5px;
    &:hover {
        background-color: #f0f0f0;
    }
`;
export const TableContainer = styled.div`
    background-color: #fff;
    color: #000;
    width: 100%;
    height: 80vh;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    &::-webkit-scrollbar{
        width: 7px;
    }
    &::-webkit-scrollbar-track{
        background: transparent;
    }
`;
export const TdTag = styled.td`
    text-align: left;
    border: none ;
    text-align: left;
    padding: 2px 8px 2px 8px;
    margin: 5px;
`;
export const ThTag = styled.th`
    border: 1px solid #dddddd;
    padding: 8px;
    text-align: left;
    margin: 5px;
    height: 20%;
    background-color: #363946;
    color: #fff;
    border: none;
    position: sticky;
    top: 0;
`;
export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 10px;
`;

// <<<< Model Styles
export const ManageAccountPopUp = styled.div`
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    background-color: #fff;
    padding: 2px;
    overflow: hidden;
    outline: none;
`
export const ModelHeaderContainer = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 5px;
`
export const ModelHeadingText = styled.h1`
    font-size: 22px;
    padding: 4px;
    margin: 1px;
`
export const ModelCustomContainerLeft = styled.div`
    height: 100%;
    width:15%;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    margin-right: 4px;
    border-radius: 10px;
    padding-top: 6px;
    padding-left: 6px;
`
export const ModelCustomContainerRight = styled.div`
    height: 100%;
    width:85%;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 1px;
`