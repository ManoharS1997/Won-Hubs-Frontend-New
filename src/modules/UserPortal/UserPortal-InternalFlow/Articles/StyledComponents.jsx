import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const scaleUp = keyframes`
    from {
        transform: scale(0.9);
    }
    to {
        transform: scale(1);
    }
`;

export const ArticleCon = styled.div`
    min-width: fit-content;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
`;

export const ArticleContentCon = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: transparent;
    padding: 15px;
    overflow-y: auto;
    animation: ${fadeIn} 0.5s ease-in-out;

    &::-webkit-scrollbar {
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

export const ContentContainer1 = styled.div`
    width: 85vw;
    height: 93vh;
    background: #d9d9d9;
    padding: 10px;
`;

export const ContentText = styled.p`
    text-align: left;
    font-size: 14px;
    padding: 5px 0px;
    font-family: sans-serif;
  
`;

export const CustomContainer = styled.div`
    display: flex;
`;

export const DateItem = styled.span`
    font-size: 12px;
    font-family: sans-serif;
`;

export const DatePublisherCon = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const EachContentCon = styled.div`
    height: 120px;
    margin: 0px 0px 10px;
    background-color: #ffccd5;
    border-radius: 4px;
    padding: 5px;
    padding-left: 10px;
    flex: 0 0 calc(20% - 10px);
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    animation: ${scaleUp} 0.5s ease-in-out;
    color:#a4133c;

    &:hover {
        transform: scale(1.02);
    }
`;

export const FrequentUsedItems = styled.a`
    text-align: left;
    text-decoration: underline;
    font-size: 13px;
    font-family: sans-serif;
    text-decoration: none;
    cursor: pointer;
    color: #a4133c;
`;

export const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`;

export const PublisherName = styled.p`
    text-align: left;
    width: 13%;
    font-family: sans-serif;
    
`;
export const LoaderContainer = styled.div`
height:80vh;
width:80vw;
display:flex;
justify-content:center;
align-items:center;`

export const ArticlesInput = styled.input`
     width: 50%;
    height: 100%;
    outline: none;
    border-style: none;
    background-color: transparent;
    padding: 0px 10px;
    /* color: #FFFFFF; */
    flex-grow: 1;
    transition: transform 0.3s, background-color 0.3s;
   `

export const InputContainer = styled.div`


    width: 250px;
    border: 1px solid #000;
    border-radius: 50px;
    display: flex;
    padding: 5px 10px;
    /* color: inherit; */
    align-items: center;
    margin:15px;
    flex-grow:0;`
