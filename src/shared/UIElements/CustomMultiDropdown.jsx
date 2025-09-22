import Select from 'react-select';
import CreatableSelect from "react-select/creatable";
import { useEffect, useState } from 'react';

export default function CustomMultiDropdown({
    label,
    type,
    options,
    onOptionChange,
    defaultValue,
    api_data,
    dependent,
    formData,
    section,
    customOptions
}) {
    const [finalOptions, setFinalOptions] = useState(options);

    useEffect(() => {
        if (api_data) {
            getOptions();
        }
    }, [api_data, formData]);

    useEffect(() => {
        setFinalOptions(options);
    }, [options]);

    const getOptions = async () => {
        try {
            const url = api_data.url;
            const response = await fetch(url, api_data?.options);
            const data = await response.json();
            setFinalOptions(data?.data?.map(item => ({ label: item.name, value: item.id })) || []);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreate = (inputValue) => {
        const newOption = { label: inputValue, value: inputValue };
        setFinalOptions(prev => [...prev, newOption]);

        // Immediately add the new option to the selected values
        if (onOptionChange) {
            onOptionChange([...defaultValue, newOption]);
        }
    };

    return (
        <div className="w-full flex flex-col gap-2">
            <label>{label}</label>
            {customOptions ? (
                <CreatableSelect
                    options={finalOptions}
                    value={defaultValue}
                    isMulti
                    onChange={onOptionChange}
                    onCreateOption={handleCreate}
                    styles={{
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused ? 'var(--primary-color)' : 'var(--secondary-color)',
                            color: state.isFocused ? 'var(--secondary-color)' : 'var(--primary-color)',
                        }),
                    }}
                />
            ) : (
                <Select
                    options={finalOptions}
                    value={defaultValue}
                    isMulti
                    onChange={onOptionChange}
                    styles={{
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused ? 'var(--primary-color)' : 'var(--secondary-color)',
                            color: state.isFocused ? 'var(--secondary-color)' : 'var(--primary-color)',
                        }),
                    }}
                />
            )}
        </div>
    );
}
