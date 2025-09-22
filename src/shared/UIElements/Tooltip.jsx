import React from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

const ListItem = styled.li`
  cursor: pointer;
  width: 100%;
  padding: 0.3rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

export default function CustomTooltip({
  optionId,
  optionsList = [],
  onSelectOptionHandler = () => { },
  position = "bottom-end",
  offset = 0,
  openOnClick = false,
  noArrow = false,
  tooltipStyle = {},
  wrapperStyle = {},
  tooltipClassName = "",
  renderItem = null, // custom item renderer override
  content = '',
  style,
  clickable = false
}) {

  const renderOptions = () => (
    <ul
      style={{
        height: "fit-content",
        padding: 0,
        margin: 0,
        listStyle: "none",
        fontSize: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        backgroundColor: "var(--primary-color)",
        ...wrapperStyle,
      }}
    >
      {optionsList?.options?.map((option) => {
        const content =
          typeof option.option === "string" ? option.option : option.name;

        return (
          <ListItem
            key={option.id}
            onClick={() => onSelectOptionHandler(option.option)}
          >
            {renderItem ? renderItem(option) : content}
          </ListItem>
        );
      })}
    </ul>
  );
  // console.log('content', content)
  return (
    <Tooltip
      id={optionId}
      place={position}
      render={optionsList.length > 0 ? renderOptions : null}
      offset={offset}
      noArrow={noArrow}
      openOnClick={openOnClick}
      clickable={clickable}
      // closeEvents={{ click: true }}
      className={tooltipClassName}
      style={{
        backgroundColor: "var(--primary-color)",
        zIndex: 10,
        opacity: 1,
        padding: "0.3rem",
        ...tooltipStyle,
      }}
    >
      {content}
    </Tooltip >
  );
}
