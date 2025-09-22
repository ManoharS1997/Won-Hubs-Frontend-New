import styled from "styled-components";

export const TicketDetailsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0px;
    background-color: #fff;
`
export const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 0px !important;
`
export const TicketDetailsComponent = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    padding: 0px;
    background-color: #ffffff;
    border-radius: 15px;
`
export const DetailsAndActionsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
    overflow-y: auto;
    display: flex;
    align-items: center;
    /* margin-bottom: 15px; */
`
export const CustomContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #e5e5e5;
    display: flex;
    flex-direction: column;
`
export const DetailsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 10px;
    flex-direction: column;
    overflow: auto;
`
export const ActionsContainer = styled(DetailsContainer)`
`
export const TicketNumber = styled.h1`
    height: fit-content;
    display: flex;
    align-items: center;
    padding: 0px;
    font-size: 2.3rem;
`
export const CustomPara = styled.p`
    width: 100%;
    display: flex;
    align-items: center;
`
export const CustomLabel = styled.label`
    color: #000;
    font-weight: 600;
    width: 30%;
    text-align: right;
`
export const CustomInput = styled.input`
    outline: none;
    border: 1px solid #ccd3de;
    padding: 5px;
    margin-left: 2%;
    background-color: transparent;
    border-radius: 5px;
    color: #000;
    min-width: 50%;
    width: fit-content;
    flex-grow: 1;
`
export const CustomSelect = styled.select`
    padding: 5px;
    color: #000;
    margin-left: 2%;
    background-color: transparent;
    outline: none;
    border: 1px solid #ccd3de;
    min-width: 50%;
    width: fit-content;
    border-radius: 5px;
    flex-grow: 1;
`
export const CustomOption = styled.option`
    padding: 5px;
    background-color: #fff;

    border: 1px solid;
`
export const ActionButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
`
export const ActionBtn = styled.button`
    width: fit-content;
    height: fit-content;
    margin-right: 10px;
    background-color: #208af5;
    outline: none;
    cursor: pointer;
    border-radius: 7px;
    padding: 6px;
    color: #fff;
    display: flex;
    align-items: center;
`
export const CustomTextArea = styled.textarea`
    margin-left: 2%;
    background-color: #fff;
    color: #000;
    padding: 10px;
    outline: none;
    border-radius: 8px;
    border: 1px solid #ccd3de;
    min-width: 50%;
    width: fit-content;
`
export const CustomButton = styled.button`
`
export const HeaderContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const TicketTabsList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    column-gap: 5px;
    margin-bottom: 8px;
`
export const TicketTab = styled.li`
    min-width: 30px;
    padding: 2px 10px;
    margin: 0;
    border-radius: 5px;
    background-color: ${({ active }) => active ? 'inherit' : '#050C9C'};
    color:  ${({ active }) => active ? '#000' : '#fff'};
    display: flex;
    align-items: center;
    column-gap: 10px;
    /* border-top: 5px solid ${({ active }) => active ? '#06D001' : 'transparent'}; */
    
    &:hover {
        color: #000;
        background-color: ${({ active }) => active ? '#fff' : '#c0c0c0'};
    } 
`
export const TabCloseBtn = styled.button`
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    cursor: pointer;
`
export const TabsContainer = styled.div`
    width: 100%;
    height: fit-content;
    margin-bottom: 10px;
    color: #fff;
    padding: 10px 10px 0px 10px;
    background-color: #4361ee;
    border-radius: 10px 10px 0px 0px;
`
export const TabsList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    column-gap: 5px;
    margin: 0;
`
export const TabItem = styled.li`
    padding: 2px 10px;
    border-radius: 5px 5px 0px 0px;
    background-color: ${({ active }) => active ? '#fff' : 'inherit'};
    color:  ${({ active }) => active ? '#000' : '#fff'};
    /* border-top: 5px solid ${({ active }) => active ? '#06D001' : 'transparent'}; */
    
    &:hover {
        color: #000;
        background-color: ${({ active }) => active ? '#fff' : '#c0c0c0'};
    } 
`

// not found view styles
export const TicketNotFoundView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 15px;
    align-items: center;
`
export const NotFoundText = styled.p`
    font-size: 20px;
    font-style: oblique;
    font-weight: bold;
    background-color: #70e000;
    padding: 10px 15px;
    border-radius: 10px;
`