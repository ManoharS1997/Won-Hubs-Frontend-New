import React, { useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { countryCodes } from '../Data/CountrySelector';

export default function CountryRegionSelector() {
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
        async function fetchCountry() {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                setCountry(data.country_name);
                setCountryCode(data.country_code.toLowerCase());
            } catch (error) {
                console.error('Error fetching geolocation data:', error);
            }
        }
        fetchCountry();
    }, []);

    const handleCountryChange = (val) => {
        setCountry(val);
        setRegion('');
        setCountryCode(getCountryCode(val));
    };

    const getCountryCode = (countryName) => {
        const countryList = countryCodes
        return countryList[countryName] || '';
    };

    return (
        <div className="w-full flex justify-between gap-4">
            <div className="w-[50%] flex items-center gap-2">
                <label className="w-[100%] font-medium text-[var(--text-color)] text-nowrap ">Country:</label>
                {countryCode && (
                    <img
                        src={`https://flagcdn.com/w40/${countryCode}.png`}
                        alt={country}
                        className="w-6 h-4"
                    />
                )}
                <CountryDropdown
                    value={country}
                    onChange={handleCountryChange}
                    defaultOptionLabel="Select a country"
                    className="w-fit !h-[2rem] border border-gray-300 rounded-md"
                />
            </div>

            <div className="w-[50%] flex items-center justify-end gap-2">
                <label className="w-[30%] font-medium text-[var(--text-color)]">Sub-region:</label>
                <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(val) => setRegion(val)}
                    defaultOptionLabel="Select a region"
                    className="!!w-full !h-[2rem] border border-gray-300 rounded-md"
                />
            </div>
        </div>
    );
}
