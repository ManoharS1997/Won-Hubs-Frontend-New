import { Tooltip } from "react-tooltip";
import styled from "styled-components";

const ListItem = styled.li`
    cursor: pointer;
    width: 100%;
    padding: 0.3rem 1rem;
    border-radius: 50px;
    font-weight: 600;

    &:hover {
        background-color: #FFF;
        color: #000;
    }
`

export default function CustomTooltip({ htmlcontent, optionsList, onSelectOptionHandler, optionId, position, offset, openOnClick, noArrow }) {

    const optionsRenderer = () => (
        <ul style={{
            height: 'fit-content',
            padding: '0rem',
            listStyle: 'none',
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            margin: '0',
            backgroundColor: 'var(--primary-color)'
        }}>
            {optionsList?.options?.map((option) => (
                <ListItem
                    key={option.id}
                    onClick={() => onSelectOptionHandler(option.option)}
                >
                    {/* {option.icon} */}
                    {option?.option && typeof option.option === 'string' ? option.option : option.name}
                </ListItem>
            ))}
        </ul>
    )
    return (
        <Tooltip
            id={optionId}
            place={position ? position : "bottom-right"}
            render={optionsRenderer}
            openOnClick={openOnClick ? openOnClick : false}
            noArrow={noArrow ? noArrow : false}
            clickable
            closeEvents={{ click: 'true' }}
            offset={offset ? offset : 0}
            style={{
                backgroundColor: 'var(--primary-color)',
                zIndex: '10',
                height: 'fit-content',
                opaccity: '1',
                padding: '0.3rem',
                // marginTop: '100%'
                // position: 'absolute',
            }}
        >
        </Tooltip>
    )
}