import styled from "styled-components";

export const tableBtn = styled.button `
    border: ${props => props.showOptions ? "1px solid lightgray" : "none"};
      background-color: '#ffffff';
      color: '#000' ;
      
      &:hover {
        border: 1px solid #80a1d4 !important;
        background-color: beige;
      }
`