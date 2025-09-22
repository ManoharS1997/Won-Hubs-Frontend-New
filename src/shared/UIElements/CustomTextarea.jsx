import convertName from "../../utils/conevrtName";

export default function CustomTextarea({
    label,
    placeholder,
    value,
    onChangeHandler,
    rows = 5, // Optional rows attribute
}) {
    return (
        <div className="w-full text-[var(--text-color)] flex flex-col gap-2">
            <label>{convertName(label)}</label>
            <textarea
                value={value}
                placeholder={placeholder}
                onChange={onChangeHandler}
                rows={rows} // Use the rows prop
                className="border border-2 border-[var(--secondary-color)] p-2 outline-none focus:!border-[var(--primary-color)] focus-within:shadow-md"
            />
        </div>
    );
}
