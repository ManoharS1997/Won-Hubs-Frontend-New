import styled from "styled-components";

import ViewCard from "../UIElements/ViewCard";

const ViewsList = styled.ul`
    width: 100%;
    height: fit-content;
    display: ${({ show }) => show ? 'grid' : 'none'};
    padding: 1rem;
    grid-template-columns: ${({ noOfCards }) => noOfCards ?
    'auto '.repeat(noOfCards) :
    'auto '.repeat(3)};
    gap: 1rem;
    margin: 0;
    background-color: var(--background-color);

    @media (max-width:576px) {
      grid-template-columns: auto;
      overflow: auto;
    }
`

export default function ViewSelection({ viewsList, noOfCards, onViewSelect, show }) {
  if (!viewsList) {
    return <div className="center-div"><h1>NO Views</h1></div>
  }

  return (
    <ViewsList noOfCards={noOfCards} show={show}>
      {viewsList.map((view, index) => {
        return <ViewCard
          key={index}
          content={view.view}
          image={view.imgUrl}
          onClick={onViewSelect}
        />
      })}
    </ViewsList>
  )
}