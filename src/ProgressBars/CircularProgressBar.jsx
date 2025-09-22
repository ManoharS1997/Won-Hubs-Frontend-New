import React, { useState, useEffect } from 'react';
import './CircularProgressBar.css'; // Create a CSS file for styling

const CircularProgressBar = () => {
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    useEffect(() => {
        // Simulate fetching data
        fetchData();
    }, []);

    const fetchData = () => {
        const totalDataSize = 100; // Assume 100 units of data
        let loadedData = 0;

        const interval = setInterval(() => {
            loadedData += 10; // Simulate loading 10 units at a time
            setLoadingPercentage((loadedData / totalDataSize) * 100);

            if (loadedData >= totalDataSize) {
                clearInterval(interval);
            }
        }, 500); // Simulate delay of 500ms between loading units
    }

    return (
        <div className="circular-progress-container">
            <svg className="circular-progress" viewBox="0 0 36 36">
                <path
                    className="circle-bg"
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className="circle"
                    strokeDasharray={`${loadingPercentage}, 100`}
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">
                    {Math.round(loadingPercentage)}%
                </text>
            </svg>
        </div>
    );
};

export default CircularProgressBar;
