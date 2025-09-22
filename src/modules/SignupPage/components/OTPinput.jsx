import { useRef } from 'react';

const OTPInput = ({ otp, setOtp, length = 6, onChangeOTP }) => {
    const inputRefs = useRef([]);

    // Handle input change
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return; // Only accept numbers

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp); // Update the parent state

        // Move focus to the next input
        if (element.nextSibling && element.value) {
            inputRefs.current[index + 1].focus();
        }

        onChangeOTP(newOtp.join('')); // Notify parent of the change
    };

    // Handle backspace
    const handleBackspace = (event, index) => {
        if (event.key === 'Backspace') {
            if (otp[index] === '') {
                if (index > 0) {
                    inputRefs.current[index - 1].focus();
                }
            } else {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
                onChangeOTP(newOtp.join(''));
            }
        }
    };

    // Handle arrow key navigation
    const handleKeyDown = (event, index) => {
        if (event.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (event.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
            {otp.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => {
                        handleBackspace(e, index);
                        handleKeyDown(e, index);
                    }}
                    ref={(el) => (inputRefs.current[index] = el)}
                    style={{
                        width: '30px',
                        height: '30px',
                        fontSize: '18px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        padding: '2px'
                    }}
                />
            ))}
        </div>
    );
};

export default OTPInput;
