const Button = (props) => {
    const { children, format, active, ...rest } = props

    const toolButtonStyles = {
        width: 'fit-content',
        height: 'fit-content',
        margin: '1px',
        padding: '3px',
        backgroundColor: '#FFFFFF',
        color: '#000000',


    }

    return (
        <button className={active ? 'btnActive' : 'lol'} title={format}  {...rest} style={toolButtonStyles}>
            {children}
        </button>
    )
}

export default Button;