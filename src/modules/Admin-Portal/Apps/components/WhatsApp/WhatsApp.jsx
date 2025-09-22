import axios from "axios";
import { useState } from "react";

const WhatsApp = () => {
    const [ number, setNumber ] = useState()

    const header = {
        headers: {
            Authorization: 'Bearer EAADhQXXGCBQBOZBQpEOG5oTx3quhlNZClQrI5ZBY2CjPg04R82DKDOaZA0FxAK4tPZC3rgkfFHNP8yIZA0HVJkp0tk3wJtO5Vzs7VK9ImNVGj9ZAxJifTpc5uwQShhZAcR1mZBprO9e1ZBjeUoeOeO6XSy1rF3OBNq8NeHkHFWNec1i4clKTltKyAa1SJ0fUgRYhq9', // Write your own Bearer code
            Accept: 'application/json',
        },
    }

    const sendMsg = () => {
        const body = {
            "messaging_product": "whatsapp",
            "to": "91"+number,
            "type": "template",
            "template": {
                "name": "hello_world",
                "language": {
                    "code": "en_US"
                }
            }
        }

        axios.post('https://graph.facebook.com/v19.0/239259039280863/messages', body, header)
            .then((res) => (
                console.log("Msg sent Success",res)
            ))
            .catch((err) => (
                console.log("Error while sending",err)
            ));
    };

    return (
        <div>
            <input type="text" onChange={(e) => setNumber(e.target.value)} />
            <button onClick={sendMsg}>send Msg</button>
        </div>
    )

}

export default WhatsApp