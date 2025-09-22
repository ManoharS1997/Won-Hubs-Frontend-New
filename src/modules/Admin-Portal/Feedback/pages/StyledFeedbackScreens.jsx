import { styled } from 'styled-components'
import { Link } from 'react-router-dom';

export const BackBtn = styled.button`
    height: 30px;
    width: 30px;
    padding: 0;
    outline: none;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin-right: 10px;
    border-radius: 8px;
    border: none;
    color: #000;
    cursor: pointer;

    &:hover {
        outline: none;
        border: none;
        background-color: #e9ecef;
    }
`

export const CustomContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 10px;
    height: 100%;
`

export const CustomNotificationContainer = styled.div`
    width: 100%;
    height: 90vh;
    padding: 10px;
    background-color: #fff;
`

export const NotificationTemplateMainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
`

export const SideNavAndContentContainer = styled.div`
    width: 100vw;
    height: fit-content;
    display: flex;
    margin-top:7vh;
`

export const StyledLink = styled(Link)`
    flex: 0 0 calc(25% - 10px);
    height: 180px;
    min-width: 280px;
    max-width: calc(25% - 10px);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    background-size: cover;
`;

export const TemplateTile = styled.button`
    width: 100%;
    height: 100%;
    background: transparent;
`

export const TemplateTilesContainer = styled.div`
    height: 76%;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow-y: auto;

    &::-webkit-scrollbar{
        width: 7px;
    }
`

export const TemplatesContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;
`

export const TitleContainer = styled.div`
    margin: 5px;
`





