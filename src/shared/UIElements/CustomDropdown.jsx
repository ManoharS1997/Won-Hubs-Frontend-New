import Select from 'react-select'
import convertName from '../../utils/conevrtName'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'

export default function CustomDropdown({
    label,
    type,
    options,
    onOptionChange,
    defaultValue,
    api_data,
    dependent,
    formData,
    section,
    isGrouped = false
}) {
    const [finalOptions, setFinalOptions] = useState(options)
    let initialUrl = api_data ? api_data.url : ''

    const getOptions = useCallback(async () => {
        try {
            let url = initialUrl
            if (api_data && dependent) {
                url = api_data.url + formData[section][dependent].value
            }
            const options = api_data.options
            const response = await fetch(url, options)
            const data = await response.json()

            const processed = isGrouped
                ? data.data
                : data.data.map(item => {
                    if (typeof item === 'string') return { label: item, option: item }
                    return {
                        label: item.name || Object.keys(item)[0],
                        option: item.id || Object.keys(item)[1]
                    }
                })

            setFinalOptions(processed)
        } catch (err) {
            console.log(err)
        }
    }, [api_data, dependent, formData, section, initialUrl, isGrouped])

    useEffect(() => {
        if (api_data) {
            getOptions()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getOptions])

    useEffect(() => {
        setFinalOptions(options)
    }, [options])

    // Helper to find selected value from flat or grouped options
    const findSelectedOption = () => {
        if (isGrouped) {
            for (const group of finalOptions || []) {
                const match = group.options.find(opt => opt.option === defaultValue)
                if (match) return match
            }
        } else {
            return finalOptions?.find(item => item.option === defaultValue)
        }
        return { label: defaultValue, option: defaultValue }
    }

    return (
        <div className="w-full text-[var(--text-color)] flex flex-col gap-2">
            <label>{convertName(label)}</label>
            <Select
                options={finalOptions || []}
                value={findSelectedOption()}
                onChange={onOptionChange}
                styles={{
                    menu: base => ({
                        ...base,
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? 'var(--primary-color)' : 'var(--secondary-color)',
                        color: !state.isFocused ? 'var(--primary-color)' : 'var(--secondary-color)',
                        cursor: 'pointer',
                    }),
                }}
                formatGroupLabel={isGrouped ? (group) => (
                    <div className="flex justify-between items-center px-2 py-1 bg-[var(--primary-color)]">
                        <span className="font-semibold text-[var(--secondary-color)]">{group.label}</span>
                        <span className="text-xs text-[var(--secondary-color)]">{group.options.length} items</span>
                    </div>
                ) : undefined}
            />
        </div>
    )
}
