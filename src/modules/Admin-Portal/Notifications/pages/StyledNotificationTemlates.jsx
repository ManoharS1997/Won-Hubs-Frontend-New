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
    /* margin-right: 10px; */
    border-radius: 8px;
    border: none;
    color: var(--text-color);
    cursor: pointer;

    &:hover {
        outline: none;
        border: none;
        background-color: #e9ecef;
    }
`;

export const Btn = styled.button`
    padding: 12px;
    height: 28px;
    width: max-content;
    /* margin: 5px; */
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
`;

export const CustomContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 10px;
    height: 100%;
`;

export const CustomNotificationContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
`;

export const NotificationTemplateMainContainer = styled.div`
    height: 50%;
    width: 80%;
    display: flex;
    background-color: var(--background-color);
`;

export const SideNavAndContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    /* margin-top: 7vh; */
`;

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
    
    height: 180px;
    min-width: 280px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;
    background-size: cover;
`;

export const TemplateTilesContainer = styled.div`
    height: 100%;
    margin: 0px;
    padding: 10px;
    /* border: 1px solid #ccc; */
    border-radius: 8px;
    overflow-y: auto;
    background-color: var(--background-color);
    width:100%;

    &::-webkit-scrollbar {
        width: 7px;
    }
`;

export const TemplatesContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: var(--background-color);
`;

export const TitleContainer = styled.div`
    margin: 5px;
    color: var(--text-color);
`;

export const ModalCloseBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    padding: 0px;
    margin: 0;
    border-radius: 50%;
    background-color: #fff;
    color: red;
    border: none;
    
    &:hover {
        background-color: red;
        color: #fff;
    }
`

export const TemplatesList = styled.ul`
    padding: 2%;
    display: grid;
    grid-template-columns: auto auto auto auto;
    list-style: none;
    gap: 10px;
`

export const TemplateItem = styled.li`
    width: 100%;
    height: 100px;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    
    &:hover {
        box-shadow: 0px 20px 70px 1px;
    }
`
export const FinishBtn = styled.button`
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  border: none;
  height: 100%;
  transition: transform 0.5s ease;
  margin-left: auto;
  border-radius: 100px;

  svg {
    left: 0;
    transition: transform 0.5s ease;
    transform: translateX(0);
  }

  &:hover svg {
    transform: translateX(10px);
  }
`