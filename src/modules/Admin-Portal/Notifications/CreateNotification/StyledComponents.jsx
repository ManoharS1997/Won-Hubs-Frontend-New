import styled from "styled-components";

export const ActionBtn = styled.button`
    width: fit-content;
    background-color: transparent;
    color: #FFFFFF;
    padding: 10px;
    border-radius: 5px;
    outline: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
        box-shadow:
        inset 0 -3em 3em rgb(0 200 0 / 10%),
        0 0 0 2px white,
        2px 2px 1.2em #333533;
    }
`

export const ActionBtnsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 15px;
    padding: 15px 30px;
`

export const AddFieldBtn = styled.button`
    padding: 10px;
    width: 100%;
    height: fit-content;
    background-color: #000000;
    outline: none;
    border-style: none;
    color: #FFFFFF;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #FFFFFF;
    border-radius: 5px;
    
    &:hover {
        border-color: #9ef01a;
        color: #9ef01a
    }
`

export const AddIcon = styled.span`
    background-color: transparent;
    padding: 0px;
    width: fit-content;
    height: 100%;
`

export const BackBtn = styled.button`
    width: fit-content;
    background-color: transparent;
    padding: 0px;
    margin: 8px 15px;
    display: flex;
    align-items: center;
    color: #000000;
    outline: none;
    border-style: none;
`

export const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

export const CreateNotificationContainer = styled.div`
    width: 98%;
    height: 60vh;
    padding: 20px;
    margin: 0;
    display: flex;
    align-self: center;
    border-radius: 10px;
    box-shadow: 0px 0px 12px 1px;
`

export const CustomContainer = styled.div`
    width: 83vw;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

export const CustomHeading = styled.h2`
    text-align: center;
`

export const CustomInput = styled.input`
    background-color: transparent;
    color: #000000;
    width: 80%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #bfc0c0;
    outline: none;
    padding: 6px;
`

export const CustomLabel = styled.label`
    width: fit-content;
    text-align: right;
    padding-right: 15px;
    width: 20%;
`

export const CustomOption = styled.option`
`

export const CustomSelect = styled.select`  
    background-color: #FFFFFF;
    color: #000000;
    padding: 5px;
    border: 1px solid #bfc0c0;
    border-radius: 5px;
    cursor: pointer;
`

export const DefaultFieldlsContainer = styled.div`
    width: 80%;
    align-self: center;
    height: 100%;
    display: flex;
    justify-content: space-between;
`

export const FieldContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    margin-bottom: 13px;
`

export const FieldsContainer = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const FieldsList = styled.ul`
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 0px;
`

export const SidebarContainer = styled.div`
    width: 17vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: #353535;
    color: #FFFFFF;
    overflow-y: auto;
`

export const TextAreaTag = styled.textarea`
    background: #fff;
    color: #000;
    border-radius: 5px;
    max-height: 80px;
    width: 300px;
    padding: 6px;
`

export const ToolBarContainer = styled.div`
    width: fit-content;
    height: 100%;
    overflow: auto;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    row-gap: 7px;
    padding: 10px;
    
    &::-webkit-scrollbar {
        width: 4px;
    }
`