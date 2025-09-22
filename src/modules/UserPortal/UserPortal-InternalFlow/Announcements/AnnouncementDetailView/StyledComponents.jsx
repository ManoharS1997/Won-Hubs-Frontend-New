import styled from 'styled-components'


export const MainContainer = styled.div`
height: 100%;
width: 100%;
display: flex;
`;

export const CustomContainer = styled.div`
display: flex;
`;


export const ContentContainer1 = styled.div`
width: fit-content;
height: 93vh;
flex-grow: 1;
background: #d9d9d9;
padding: 10px;
display:flex;
align-items:center;
justify-content: center;

`
export const ItemDetailsContainer = styled.div`
height:100%;
width:fit-content;
background-color:#FFFFFF;
flex-grow:1;
display: flex;
flex-direction: column;
border-radius:20px;
margin-top:0px;
padding:20px;`

export const Title = styled.h1`
font-size:30px;
font-family:Bree-serief;
color:DarkBlue;
margin-top:45px;`

export const Description = styled.p`
font-size:23px;
font-family:Bree-Serief;
align-self: flex-end;
color:darkmagenta;
margin-top:20px;`

export const BottomContainer=styled.div`
height:90vh;
width:84vw;
background-color:white;
box-shadow: 8vh;
margin-top:30px;
border-radius:20px;

align-self:center;
padding:40px;`

