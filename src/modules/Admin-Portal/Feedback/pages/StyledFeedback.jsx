import styled from "styled-components";


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

export const ContentArea = styled.div`
    width: 85%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CustomContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    padding: 5px;
    display: flex;
    align-items: center;
`;

export const CustomTable = styled.table``;

export const CustomTd = styled.td`
    background: transparent;
    border-bottom: 1px solid #ccc;
    padding: 0px;
    height: 40px; 
`

export const CustomTextField = styled.input`
    border: none;
    padding: 5px 5px 5px 8px;
    margin: 4px;
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background: #f5f3f4;
    outline: none;
    font-size: 1.2rem;
`;

export const CustomTh = styled.th`
    background-color: #ccc;
    padding: 1px;
`;

export const CustomTr = styled.tr`
    width: 100%;
    &:hover{
        background: #fff;
    }
`

export const Description = styled.div`
    width: 100%;
    height: 70%;
    border-radius: 8px;
`;

export const FeedBackNameContainer = styled.div`
    width: 45%;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
`;

export const FieldContainer = styled.div`
    height: fit-content;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
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
    z-index: 999;
    background: #8e9aaf;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 5px 0px 5px;
`;

export const HeaderTag = styled.h1`
    position: absolute;
    top: 10%;
    left: 4%;
    z-index: 999;
    font-size: 2.5rem;
    font-weight: 5000;
    margin: 0px;
    width: 300px;
    text-align: center;
    color: #000;
`;

export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background: #dee2e6;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const MainContainer2 = styled.div`
    width: 100%;
    height: 93%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    &::-webkit-scrollbar {
        width: 7px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
        color: #000;
    }
`;

export const QuestionDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: fit-content;
    margin: 0px;
`;

export const SectionTag = styled.span`
    height: fit-content;
    width: fit-content;
    background: #f2e9e4;
    margin: 1% 1% 0% 2%;
    padding: 6px;
    border-radius: 8px 8px 0px 0px;
    font-size: 1.2rem;
`;

export const TabsContainer = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    align-items: flex-end;
`;

export const TemplateImgContainer = styled.div`
    width: 100%;
    min-height: 200px;
    position: relative;
    border-radius: 15px;
    background-size: cover;
`;

export const Title = styled.div`
    height: 25%;
    width: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
`;

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
`;





















