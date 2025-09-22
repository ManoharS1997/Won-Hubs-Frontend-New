import { useState } from "react"

import WonContext from '../../../../context/WonContext'

export default function ReceiverWindow() {
    const [receiverText, setReceiverText] = useState('');

    return (
        <WonContext.Consumer>
            {value => {
                const { chatData, setChatData } = value;

                const handleSend = () => {
                    setChatData('receiver', receiverText)
                    setReceiverText('')
                }

                return (
                    <div style={{ height: '100vh', width: '100vw', position: 'relative', background: '#111' }}>
                        <div style={{ position: 'absolute', height: '300px', width: '200px', background: '#f1f1f1', bottom: '10px', right: '50px' }}>

                            <div style={{ height: '92%', width: '100%', background: '#ccc' }}>
                                {chatData.map((message, index) => (

                                    <p key={index}>{message.Message}</p>


                                ))}
                            </div>

                            <div style={{ position: 'absolute', bottom: '0', display: 'flex', width: '100%' }}>
                                <input style={{ width: '80%' }} type="text" value={receiverText} onChange={(e) => setReceiverText(e.target.value)} />
                                <button style={{ width: '20%', padding: '0px' }} onClick={handleSend}>send</button>
                            </div>
                        </div>
                    </div>
                );
            }}
        </WonContext.Consumer>
    );
}