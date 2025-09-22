import styled, { keyframes } from "styled-components";

// TITLE DROPDOWN STYLES 

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
export const BackBtn = styled.button`
    height: 30px;
    width: 30px;
    padding: 0;
    outline: none;
    margin: 0;
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: transparent;
    margin-right: 10px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    color: #000;
    &:hover{
        outline: none;
        border: none;
        background-color: #e9ecef;
    }
`;

export const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #e5e5e5;
`;

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column !important;
    background-color: #ffffff;
    padding: 15px;
    padding-bottom: 3px;
    border-radius: 15px;
`;

export const CustomContainer = styled.div`
    width: 83vw;
    height: 100%;
    flex-grow: 1;
    background-color: #e5e5e5;
    padding: 10px;
    margin: 0px;
`;

export const UserTicketsContainer = styled.div`
    background-color: #ffffff;
    width: 100%;
    flex-grow: 1;
    /* height: fit-content; */
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px;
    margin-bottom: 15px;
`;

export const TicketsList = styled.ul`
    /* padding-left: 0px;
    display: flex;
    flex-wrap: wrap; 
    column-gap: 10px;
    row-gap: 15px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 35px 15px 15px 1px;
    &::-webkit-scrollbar{
        width: 5px;
    } */
    
    
    padding-left: 0px;
    display: grid;
    grid-template-columns: auto auto auto auto ;
    column-gap: 10px;
    row-gap: 15px;
    width: 100%;
    height: 80vh;
    max-height: 100%;
    overflow-y: auto;
    /* flex-grow: 1; */
    padding: 15px;
    /* margin-top: 15px ; */
    
    &::-webkit-scrollbar{
        width: 7px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    
    &:hover::-webkit-scrollbar-thumb {
        background-color: #d9d9d9;
    }
`;

export const TicketCard = styled.li`
    width: 292px;
    height: fit-content;
    border-radius: 10px;
    box-shadow: 0px 2px 8px 0px;
    background-color: #f4f3ee;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: url('https://res.cloudinary.com/drtguvwir/image/upload/v1705900319/WON-Platform-Images/ycrfgojuyu1z4qafstvm.jpg');
    color: #FFFFFF;
    background-position: left;
    &:hover {
        box-shadow: 0 0 30px 8px #48abe0;
        position: relative;
        transform: scale(2);
        transform: translate(0, -10px);
        transition: all 200ms;
    }
`;

export const IdAndFavoutrite = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TicketId = styled.span`
    font-size: 20px;
    padding-bottom: 15px;
    font-weight: bold;
`;

export const FavouriteIconBtn = styled.button`
    background-color: inherit;
    color: #fff;
    font-weight: bold;
    padding: 0px;
    margin: 0px;
    outline: none;
    border-style: none;
    height: fit-content;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

export const CustomP = styled.p`
    width: 100%;
    font-size: 13px;
`;

export const RedirectBtn = styled.button`
    width: 20px;
    height: 20px;
    padding: 0px;
    border-radius: 50%;
    outline: none;
    background-color: transparent;
    color: #FFFFFF;
    margin-left: auto;
    border-style: none;
`;

export const HeaderContainer = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
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

export const DropdownToggle = styled.div`
    cursor: pointer;
    height: fit-content;
    width: fit-content;
    font-size: 22px;
    font-weight: bold;
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

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
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
