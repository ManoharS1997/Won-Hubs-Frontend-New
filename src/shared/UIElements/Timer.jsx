import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinutes = 0, initialSeconds = 0, onComplete }) => {
    const [time, setTime] = useState({
        minutes: initialMinutes,
        seconds: initialSeconds,
    });

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTime((prevTime) => {
                const { minutes, seconds } = prevTime;

                if (seconds > 0) {
                    return { minutes, seconds: seconds - 1 };
                } else if (minutes > 0) {
                    return { minutes: minutes - 1, seconds: 59 };
                } else {
                    clearInterval(timerInterval);
                    if (onComplete) onComplete(); // Call onComplete when the timer finishes
                    return { minutes: 0, seconds: 0 };
                }
            });
        }, 1000);

        return () => clearInterval(timerInterval); // Cleanup interval on unmount
    }, [onComplete]);

    const { minutes, seconds } = time;

    // if (time.minutes === 0 && time.seconds === 0) {
    //     return <span>Time's up!</span>;
    // }

    return (
        <span style={{ flexDirection: 'column', alignItems: 'center', display: time.minutes === 0 && time.seconds === 0 ? 'none' : 'flex' }}>
            <span style={{ fontSize: '0.7rem' }}>Try again in</span>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
    );
};

export default Timer;
