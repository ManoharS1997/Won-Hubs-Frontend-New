import { useState, useEffect } from 'react';
import axios from 'axios';

const LinkedInSignInButton = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    method: 'get',
                    url: `${import.meta.env.VITE_HOSTED_API_URL}/api/linkedin`, // Backend endpoint URL
                    headers: {
                        'Authorization': 'Bearer AQU0_J1HVsw1FXOh48Ptcb0f6YcZb7-njogNKh4rPsSTRy4icN4Hhg_XHPVPX483k3ne_Mr4IMBvo1MXpLFhDFKBNU4jp6tLJoQcz5qQaWqVkEuP09pOCsKbM8Be1oVDIxlrXnxW4wL2DbbnIwv-go8MzPVNgLJGXpVrDl0YeJFpLQg2IFdJDmwHmA7nDV5bEAbW_LJK8AiA8AYZH4luW113tm9JQFtDf1Welr6KE6Xxb490n_cjh8mAGLxugY14Icpsbdk2CUVsl0rt_l5SU_icfMD91pBMNSEsdlDq362OKDLLQrBx9Uf5X8sb6eTFqUR1D4XANZc_flYTzqi5u46pnv0gZw',
                        'Cookie': 'bcookie="v=2&5aa422b1-3830-4760-8943-6b9bc2deb5e7"'
                    },
                };

                const response = await axios.request(config);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(userData)
    return (
        <div>
            {userData ? (
                <div>
                    <h2>User Info:</h2>
                    <p>Name: {userData.name}</p> 
                    <p>Email: {userData.email}</p>
                    <p>Country: {userData.locale.country}</p>
                    <p>Language: {userData.locale.language}</p>
                    {/* Add more fields as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default LinkedInSignInButton;
