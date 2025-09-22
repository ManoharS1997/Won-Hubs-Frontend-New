import styled from 'styled-components'
export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
`;

export const CustomContainer = styled.div`
    margin-top: 7vh;
    display: flex;
`;


export const ContentContainer1 = styled.div`
    width: 85vw;
    height: 98vh;
    background: #d9d9d9;
    padding: 10px;
    display:flex;
  
`
export const ItemDetailsContainer=styled.div`
height:89vh;
width:85vw;
background-color:white;
box-shadow: 8vh;

border-radius:20px;
margin-top:50px;
align-self:center;
padding:40px;

`

export const DateContainer=styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;`

export const Title=styled.p`
font-size:15px;
font-family:roboto;
font-weight:bold;
color:#a4133c;
`

export const Description=styled.p`
font-size:14px;
color:#5c5552;
font-family:roboto;
`

export const BackButton=styled.button`
height:40px;
width:50px;
border-radius:5px;
background-color:darkgrey;
align-self:flex-start;
color:white;

margin-bottom:18px;
`
export const DateItem=styled.span`
color:#a4133c;
font-size:14px;`

export const BottomContainer=styled.div`
margin:50px;`
