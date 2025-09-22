
import Select from 'react-select'
import { EventFieldContainer, FieldLabel, FieldInput } from "./StyledEventFieldsList"

export default function EventFieldItem(props) {
    const { value, label, onActiveChange, labelStyles } = props

    const ConvertLabel = (label) => {
        return label.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
    }

    const renderProperField = (valueType) => {
        if (label === 'active') {
            return <Select
                styles={{
                    control: (basicStyles, state) => ({
                        ...basicStyles,
                        borderRadius: '0.5rem',
                        boxShadow: 'none',
                        borderWidth: '2px',
                        borderColor: state.isFocused ? '#022a6b' : '#d1d8e3',
                        // zIndex: '-1'
                    })
                }}
                defaultValue={{ label: ConvertLabel(value), value: value }}
                options={[{ label: 'True', value: 'true' }, { label: 'False', value: 'false' }]}
                onChange={e => onActiveChange(prevState => ({ ...prevState, active: e.value }))}
            />
        }

        switch (valueType) {
            case 'string':
                return <FieldInput type="text" value={value} />
            case 'int':
                return <FieldInput type="number" value={value} />
            default:
                return <FieldInput type="text" value={value} />
        }
    }

    return (
        <EventFieldContainer>
            <FieldLabel style={labelStyles}>{ConvertLabel(label)}</FieldLabel>
            {renderProperField(typeof value)}
        </EventFieldContainer>
    )
}