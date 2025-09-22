

import styled from "styled-components"

const ListItem = styled.li`
    list-style: none;
    text-transform: uppercase;
    width: 100%;
    min-height: 12rem;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 0.4rem 0.2rem #ccc;
    border-radius: 0.5rem;
    
    background-image: url(${({ image }) => image ? image : 'none'});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transition: all 0.8s ease;
    
    span {
        font-size: 2rem;
        font-weight: 600;
        padding: 0;
        margin: 0;
        color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    
    &:hover {
        background: rgba(0,0,0,0.09);
        span{
            display: block;
            color: inherit;
        }
    }
`

export default function ViewCard({ content, image, onClick }) {
    return (
        <ListItem image={image} onClick={onClick}>
            <span>{content}</span>
        </ListItem>
    )
}