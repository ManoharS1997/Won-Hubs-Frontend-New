// src/components/Authenticate.js
import React, { useState } from "react";
import { registerUser } from "../../../../utils/WebAuthn";

const BiometricAuthenticate = () => {
    const [message, setMessage] = useState("");

    const handleAuthenticate = async () => {
        const result = await registerUser();
        setMessage(result);
    };

    return (
        <div>
            <h2>Authenticate</h2>
            <button onClick={handleAuthenticate}>Authenticate</button>
            <p>{message}</p>
        </div>
    );
};

export default BiometricAuthenticate;
