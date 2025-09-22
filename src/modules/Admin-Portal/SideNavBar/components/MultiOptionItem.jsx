
import { useState } from "react";
import styled from "styled-components";
import CustomTooltip from "../../../../shared/components/CustomTooltip";

import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Option = styled.li`
    width: ${({ show }) => show ? '100%' : 'fit-content'} ;
    height: ${({ show }) => show ? 'fit-content' : 'fit-content'} ;
    transition: all 0.5s ease;
    color: #fff;
    list-style: none;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: ${({ show }) => show ? 'none' : 'auto'} ;
    font-size: 1rem;
    border-radius: 5px;

    &:hover {
        background-color: var(--background-color);
        color: var(--text-color);
    }
`
const IconSpan = styled.span`
    
    svg {
            transition: all 0.3s ease;
            transform: rotate(${({ expand }) => expand ? '-90deg' : '0deg'});
        }
`
const SubOptions = styled.div`
    height: ${({ expand }) => expand ? 'fit-content' : '0px'};
    color: #fff;
    margin: 0 0 0 1rem;
    list-style: none;
    transition: all 0.5s ease;
    cursor: pointer;
    overflow: ${({ expand }) => expand ? 'visible' : 'hidden'};
`
const SubOption = styled.li`
    padding: 0.5rem;
    border-left:   ${({ active }) => active ? '2px solid' + `var(--background-color)` : "1px solid#6e6e6e"};
    transition: all 0.5s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ active }) => active ? 'var(--partial)' : '#fff'};
        /* border-width:  ${({ active }) => active ? '2px' : '1px'}; */
    
    &:hover{
    border-color: var(--secondary-color);
    color: var(--background-color);
}
`

export default function MultiOptionItem({ title, optionsList, setOpen, show }) {
    const [expand, setExpand] = useState(false)
    const activeTab = window.location.pathname.split('/').join('').split('%20').join(' ')

    const Navigate = useNavigate()
    if (optionsList?.length === 0) {
        return (
            <Option>
                {title}
            </Option>
        )
    }

    const onSelectOptionHandler = (path) => {
        console.log(path)
        Navigate(path)
        // setOpen(false)
        localStorage.setItem('activeNav', path)
    }
    // console.log(optionsList)

    const renderOptions = () => (
        <SubOptions
            expand={expand}
        // onMouseLeave={() => setExpand(false)}
        >
            {optionsList.options.map((option) => (
                <SubOption
                    active={true}
                    key={option.id}
                    onClick={() => onSelectOptionHandler(option.option)}
                >
                    {option.icon}
                    {option.option}
                </SubOption>
            ))}
        </SubOptions>
    )

    return (
        <>
            <Option
                // onMouseEnter={() => setExpand(true)}
                show={show}
                expand={expand}
                onClick={() => setExpand(!expand)}
                // onMouseLeave={() => setExpand(false)}
                data-tooltip-id={`sub - options - ${show ? '' : title} `}
                data-tooltip-content={``}
            >
                <span style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                    {optionsList.icon}
                    {show && title}
                </span>
                {show && <IconSpan
                    expand={expand}

                >
                    <MdKeyboardArrowRight />
                </IconSpan>}
            </Option>

            <SubOptions
                expand={expand && show === true}
            >
                {optionsList.options.map((option) => (
                    <SubOption
                        active={activeTab === option.option}
                        key={option.id}
                        onClick={() => onSelectOptionHandler(option.option)}
                    >
                        {option.icon}
                        {option.option}
                    </SubOption>
                ))}
            </SubOptions>
            <CustomTooltip
                // htmlcontent={``}
                optionId={`sub - options - ${title} `}
                optionsList={optionsList}
                onSelectOptionHandler={onSelectOptionHandler}
            />
        </>
    )
}