
import EventFieldItem from "./EventFieldItem"
import { EventFieldList } from "./StyledEventFieldsList"

export default function EventFieldsList(props) {
    const { eventData, onActiveChange } = props

    if (Object.keys(eventData).length === 0) {
        return (
            <div>No Data Found</div>
        )
    }
    return (
        <EventFieldList>
            {Object.keys(eventData).map(item => (
                <EventFieldItem
                    key={item}
                    value={eventData[item]}
                    label={item}
                    onActiveChange={onActiveChange}
                    labelStyles={{ zIndex: item === 'active' ? '1' : '0' }}
                />
            ))}
        </EventFieldList>
    )
}