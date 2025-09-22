
import convertName from '../../utils/conevrtName'

export default function CustomInput({ type, label, placeholder, value, onChangeHandler }) {
    return (
        <div className="w-full text-[var(--text-color)] flex flex-col gap-2">
            <label>{convertName(label)}</label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChangeHandler}
                className=" border-[var(--seconary-color)] border-2 h-[2rem] p-2 outline-none focus:!border-[var(--primary-color)]"
            />
        </div>
    )
}