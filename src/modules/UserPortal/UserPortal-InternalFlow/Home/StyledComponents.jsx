
import styled from 'styled-components'


export const Alert = styled.span`
    align-self: flex-start;
    margin-left: 10px;
    height: 15px;
    width: 15px;
    font-size: 9px;
    background-color: ${(props) => props.alerts.length > 0 ? 'red' : 'none'};
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CustomContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position:relative;
    
`;

export const CustomImg = styled.img`
    width: 100%;
    height: fit-content;
    height:100%;
    max-height: 100%;
    
 
    object-fit:cover;
    mix-blend-mode:color-burn ;
    border-image:fill 0 green;
    aspect-ratio: 4/3;
`;


export const Heading = styled.h1`
    font-size: 25px;
    display: flex;
    align-items: center;
    font-weight: bold;
    color:black;
`;

export const HomeCon = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
`;

export const HomeContentCon = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
`;

export const HomeDashCon = styled.div`
    background-color: #d9d9d9;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    padding: 10px;
`;

export const NotificationBtn = styled.button`
    padding: 0px;
    outline: none;
    width: 150px;
    cursor: pointer;
    background-color: #fff;
    color: #55D6F9;
    border-style: none;
    font-weight: 600;
    margin: 12px;
    border-radius: 0px;
    text-align: left;
    display: flex;
`;

export const ParaTag = styled.p`
    font-size: 1em;
    margin: 1px;
`;

export const RightAlertCon = styled.div`
    align-self: center;
    margin-left: 10%;
    width: fit-content;
    height: fit-content;
`;

export const ScrollVideos = styled.div`
    max-width: 80vw;
    height: 25vh;
    margin: 15px 0px;
    background-color: transparent;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    
    .slick-arrow {
        color: #000;
        display: flex;
    }
`;

export const SlickItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 100%;
    text-align: center;
    background-color: transparent;
    margin: 3px;
    border-radius: 15px;
    object-fit:cover;
`;

export const SpanTag = styled.span`
    margin-right: 5px;
    font-size: 15px;
    font-weight: bold;
`;

export const StarContainer = styled.div`
    display: flex;
    align-items: center;
    background-color:transparent;
`;

export const TabItem = styled.button`
    padding: 10px;
    outline: none;
    width: 200px;
    cursor: pointer;
    background-color: ${(props) => props.isactive === 'true' ? '#284B63' : '#fff'};
    color: ${(props) => props.isactive === 'true' ? '#FFFFFF' : '#284B63'};
    border-style: none;
    font-weight: 600;
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    display: flex;

    &:hover {
        background-color: ${(props) => props.isactive === 'true' ? '#284B63' : '#d9d9d9'};
        cursor: pointer;
    }
`;

export const TabTextNoti = styled.div`
    width: 100%;
    display: flex;
    padding: 0px;
    width: fit-content;
`;

// export const UploadInput = styled.input``;

// export const UploadLabel = styled.label`
//     width: fit-content;
// `;

// export const UploadText = styled.span`
//     margin: 5px;
// `;

// export const UploadVidBtn = styled.label`
//     display: flex;
//     height: 200px;
//     width: 350px;
//     justify-content: center;
//     flex-direction: column;
//     align-items: center;
//     background-color: #FEF5E7;
//     border-radius: 10px;
// `;

export const UserTabs = styled.div`
    display: flex;
    width: fit-content;
    justify-content: flex-start;
    border-bottom: 1px solid #a6a2a2;
`;
export const ModelContainer = styled.div`
    height:100%;
    width:100%;
    background-color:'rgba(0,0,0,0.7)';
  
`
export const ArticlesSlickItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 200px;
    text-align: center;
    background-color:#79a4f2;
    flex-direction:column;
    color:black;
    
    border-radius:10px;
    box-shadow:15px;
    margin: 3px;
    border-radius: 15px;
    box-shadow:10px;
`
export const ArticlesTitle = styled.div`
font-size:15px;
font-weight:bold;
font-family:"Times New Roman";`

