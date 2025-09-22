import styled from "styled-components";

export const AddBtn = styled.button`
    background: #ccc;
    padding: 5px;
    margin: 10px 5px 5px 5px;
    cursor: pointer;
    border: none;
`;

export const AddItem = styled.button`
    color: #fff;
    width: 95%;
    margin: 5px;
    background: #353535;
    border: 1px solid #fff;
    display: flex;
    justify-content: space-between;
`;

export const BackBtn = styled.button`
    height: 30px;
    width: 30px;
    padding: 0;
    outline: none;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
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

export const Btn = styled.button`
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    outline: none;
    border: none;
`;

export const BtnAdd = styled.button`
    background: #99d98c;
    float: inline-end;
    height: 40px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
`;

export const Btnsection = styled.button`
    background: #8a817c;
    height: 70px;
    width: 70px;
    bottom: 5%;
    right: 6%;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin: 0px 10px 0px 0px;
`;

export const ContentArea = styled.div`
    width: 85%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 576px) {
        width: 100%;
        padding: 0.5rem;
    }
`;

export const CustomContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    padding: 5px;
    display: flex;
    @media (max-width:576px) {
        width: 100%;
    }
`;

export const CustomInput = styled.input`
    display: none;
    mix-blend-mode: difference;
`;

export const CustomLabel = styled.label`
    position: absolute;
    bottom: 5px;
    right: 5px;
    padding: 3px;
    border-radius: 50%;
    border: 1px solid #ccc;
    color: #000;
`;

export const CustomSelect = styled.select`
    width: 23%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
`;

export const CustomTextArea = styled.textarea`
    min-height: 98%;
    max-height: 98%;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding: 5px 5px 5px 8px;
`;

export const CustomTextField = styled.input`
    border: none;
    padding: 5px 5px 5px 8px;
    margin: 4px;
    width: 70%;
    height: 40px;
    border-radius: 10px;
    background: #f5f3f4;
    outline: none;
    font-size: 1.2rem;
`;

export const CustomTitle = styled.input`
    font-size: 1.3rem;
    color: #000;
    font-weight: 500;
    border: none;
    outline: none;
    padding: 0px 5px 3px 5px;
    border-bottom: 1px solid #000;
    background: transparent;
`;

export const DeleteBtn = styled.button`
    background: transparent;
    position: absolute;
    top: 16px;
    right: 12px;
    border: none;
    padding: 0px;
    height: fit-content;
    color: ${(props) => (props.disabled ? '#adb5bd' : '#000')};
    
    :hover{
        color: ${(props) => (props.disabled ? '#adb5bd' : '#660708')};
    }
`;

export const Description = styled.div`
    width: 100%;
    height: 70%;
    border-radius: 8px;
`;

export const FeedBackNameContainer = styled.div`
    width: 50%;
    height: 40px;
    color: #fff;
    display: flex;
    align-items: center;
`;

export const FeedBackSideBar = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #495057;
    overflow: auto;

    @media (max-width:576px){
        display: none;
    }
`;

export const FieldContainer = styled.div`
    height: fit-content;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 5px;
    background: #fff;
`;

export const FieldsList = styled.div`
    height: fit-content;
    width: 100%;
    margin-top: 15px;
    position: relative;
`;

export const HeaderContainer = styled.div`
    height: 7%;
    width: 100%;
    margin: 0px;
    /* z-index: 999; */
    background: #8e9aaf;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    gap: 0.5rem;

    @media (max-width: 576px) {
        flex-direction: column;
        height: fit-content;
        align-items: flex-start;
    }
`;

export const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    background: #dee2e6;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: auto;
`;

export const MainContainer2 = styled.div`
    width: 100%;
    height: 93%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: auto;

    &::-webkit-scrollbar{
        width: 7px;
    }
    &::-webkit-scrollbar-track{
        background: transparent;
        color: #000;
    }
`;

export const QuestionDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: fit-content;
`;

export const RadioBtnContainer = styled.div`
    display: flex;
    align-items: center;
`

export const RadioBtnSet = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    padding: 10px 10px 10px 15px;
`

export const ResponseContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
`

export const ResponseDiv = styled.div`
    border: 1px solid #f5f3f4;
    border-radius: 7px;
    height: fit-content;
    background: #fff;
    width:50%;
`

export const SectionTag = styled.span`
    height: fit-content;
    width: fit-content;
    background: #f2e9e4;
    margin: 1% 1% 0% 2%;
    padding: 6px;
    border-radius: 8px 8px 0px 0px;
    font-size: 1.2rem;
`

export const TabsContainer = styled.div`
    width: 47%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media (max-width: 576px) {
        width: 100%;
    }
`

export const TemplateImgContainer = styled.div`
    width: 100%;
    min-height: 200px;
    position: relative;
    border-radius: 15px;
    background-size: cover;
`

export const Title = styled.div`
    height: 25%;
    width: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
`

export const TitleContainer = styled.div`
    min-height: 180px;
    width: 100%;
    border-radius: 15px;
    margin-top: 0px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
`

export const ToggleSwitch = styled.div`
    margin-right: 10px;
    height: fit-content;
    position: absolute;
    bottom: 0.5em;
    right: 0;
`

export const Alert = styled.span`
    font-size: 15px;
    position: absolute;
    bottom: 3px;
    left: 10px;
`;

export const CustomTable = styled.table``;

export const CustomTh = styled.th`
    background-color: #ccc;
`;

export const FieldList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #495057;
`;



















