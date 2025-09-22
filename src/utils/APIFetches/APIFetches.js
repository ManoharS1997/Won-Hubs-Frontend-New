import { useQuery } from "@tanstack/react-query";
// updating new mails to the database table
export const UpdateNewMails = async () => {

    try {
        const response = await fetch(`${import.meta.env.VITE_HOSTED_API_URL}/read-email`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch emails');
        }

        const data = await response.json();
    } catch (error) {
        // setError(error.message);
    }
};

// Function to fetch emails from the API
export const FetchMails = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOSTED_API_URL}/api/read/emails`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch emails');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching emails:', error);
        throw error; // Throw the error to handle it upstream
    }
};

export const useGmailFetch = () => {
    const { data, error, isLoading } = useQuery({ queryKey: 'emails', queryFn: useGmailFetch })
    return data
}

// fetching data from email_log table
export const FetchEmailLogs = async () => {
    try {
        const url = `${import.meta.env.VITE_HOSTED_API_URL}/emails-read`
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)

        const data = await response.json()
        return data
    } catch (error) {
        // console.log(error)
    }
}

// send registration mail for unregistered users
export const SendRegistrationMail = async (mailId) => {

    const url = `${import.meta.env.VITE_HOSTED_API_URL}/api/send-registration-email`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: mailId || 'sivakumar.erugu@nowitservices.com' })
    }

    const response = await fetch(url, options)

    // console.log(response.ok)
}