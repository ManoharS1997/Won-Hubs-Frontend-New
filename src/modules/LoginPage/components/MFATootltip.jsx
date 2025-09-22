import { Tooltip } from "react-tooltip";

export default function MFATooltip({ id, label }) {
    return (
        <Tooltip
            id={label}
            place="bottom"
            style={{
                textTransform: 'capitalize',
                background: '#FFFFFF',
                color: 'inherit',
                boxShadow: '0 0 2px 1px #ccc'
            }}
        >
            {label}
        </Tooltip>
    )
}