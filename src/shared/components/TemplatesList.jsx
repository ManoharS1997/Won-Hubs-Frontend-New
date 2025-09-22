
import styled from "styled-components"
import BackBtn from "../UIElements/BackBtn"

const TemplatesListContainer = styled.ul`
    list-style: none;
    padding: 1rem;
    display: ${({ show }) => show ? 'flex' : 'none'};
    flex-direction: row;
    gap: 1rem;

    @media (max-width: 576px) {
      flex-direction: column;
    }
`

const TemplateItem = styled.li`
    min-width: 7rem;
    min-height: 10rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 0.5rem;
    background-image: url(${({ bgImage }) => bgImage ? bgImage : 'none'});
    background-size: cover;
    background-position: center;
    
    &:hover {
        box-shadow: 0 0 0.5rem 0.2rem rgba(0,0,0,0.2);
    }
`

export default function TemplatesList({ templatesList, show, onTemplateSelect, onClick }) {
  return (
    <>
      <BackBtn show={show}
        onClick={onClick}
      />
      <TemplatesListContainer show={show} >
        {templatesList.map(template => (
          <TemplateItem
            key={template.id}
            bgImage={template.imageUrl}
            onClick={onTemplateSelect}
          >
            {template?.content}
          </TemplateItem>
        ))}
        <TemplateItem
          onClick={onTemplateSelect}

        > + Create New </TemplateItem>
      </TemplatesListContainer>
    </>
  )
}