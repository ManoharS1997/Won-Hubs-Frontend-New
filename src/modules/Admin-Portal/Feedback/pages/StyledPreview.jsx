import styled from "styled-components";

export const BackBtn = styled.button`
    /* position: absolute; */
    top: 2%;
    left: 0.5%;
    /* z-index: 999; */
    padding: 0px;
    background: transparent;
    border: none;
`

export const CustomContainer = styled.div`
    height: fit-content;
    width: 50%;
`

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

export const Description = styled.div`
    width: 100%;
    height: 70%;
    border-radius: 8px;
`;

export const FieldContainer =  styled.div`
    height: fit-content;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px;
    /* position: relative; */
    display: flex;
    flex-direction: column;
    padding: 5px;
    background: #fff;
`;

export const FieldsList = styled.div`
    height: fit-content;
    width: 100%;
    margin-top: 15px;
    /* position: relative; */
`;

export const HeaderTag = styled.h1`
    /* position: absolute; */
    top: 10%;
    left: 4%;
    z-index: 999;
    font-size: 2.5rem;
    font-weight: 5000;
    margin: 0px;
    width: 300px;
`

export const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    background: #dee2e6;
    display: flex;
    flex-direction: column;
`

export const QuestionDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: fit-content;
`;

export const RadioBtnContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const RadioBtnSet = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    padding: 10px 10px 10px 15px;
`;

export const RequireSpan = styled.span`
    color: red;
    font-size: 20px;
    /* position: absolute; */
    right: 1px;
    top: 1px;
`

export const ResponseDiv = styled.div`
    border: 1px solid #f5f3f4;
    border-radius: 7px;
    height: fit-content;
    background: #fff;
    width: 50%;
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

export const SubContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    /* position: relative; */

    &::-webkit-scrollbar{
        width: 7px;
    }
    &::-webkit-scrollbar-track{
        background: transparent;
        color: #000;
    }
`

export const SubmitBtn = styled.button`
    position: absolute;
    right: 8%;
    bottom: 8%;
    height:30px;
    width: 100px;
    background: #06d6a0;   
`

export const SubmitPopUpText = styled.p`
    /* position: absolute; */
    right: 5%;
    top:3%;
    color: #FFFFFF;
    font-weight: 500;
    background: #29bf12;
    border-radius: 8px;
    width: fit-content;
    height: fit-content;
    padding: 10px;
`

export const TemplateImgContainer = styled.div`
    width: 100%;
    min-height: 200px;
    /* position: relative; */
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