

import { v4 as uuid } from 'uuid'
import { OptionsItem } from "./StyledRoutesList"
import { useNavigate } from 'react-router-dom'
import renderIcons from '../../../../shared/functions/renderIcons'

export default function SingleOption({ setNavItem, option, setOpen, setClose, show, hideIcon, classNames }) {
    const navigate = useNavigate()

    const onSelectOptionHandler = (path) => {
        console.log(path)
        navigate(path)
        // setOpen(false)
        localStorage.setItem('activeNav', path)
    }

    return (
        <OptionsItem
            key={uuid()}
            className={classNames}
            id={option.option}
            onClick={() => {
                onSelectOptionHandler(option.option)
                setClose()
            }}
            show={show}
            active={window.location.pathname.split('/').join('').split('%20').join(' ') === option.option}
        >
            {!hideIcon && renderIcons(option.icon, 20, 'inherit')}
            {show && option.option}
        </OptionsItem>
    )
}