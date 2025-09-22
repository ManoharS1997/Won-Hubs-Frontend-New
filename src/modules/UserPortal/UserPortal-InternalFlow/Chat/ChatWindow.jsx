import { useState } from "react"
import WonContext from '../../../../context/WonContext'

const ChatWindow = () => {
    const [senderText, setSenderText] = useState('');
    const [receiver, setReceiver] = useState('')

    return (
        <WonContext.Consumer>
            {value => {
                const { chatData, setChatData } = value;

                const handleSend = (user, text) => {
                    setChatData(user, text)

                    if (user === 'receiver') {
                        setReceiver('')
                    } else {
                        setSenderText('')
                    }

                }

                return (
                    <div style={{ height: '100vh', width: '100vw', position: 'relative', background: '#111' }}>
                        <div style={{ position: 'absolute', height: '300px', width: '200px', background: '#f1f1f1', bottom: '10px', right: '50px' }}>

                            <div style={{ height: '92%', width: '100%', background: '#ccc' }}>
                                {chatData.map((message, index) => (
                                    message.User === 'sender' ?
                                        <div key={index} style={{ background: 'transparent', width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <p style={{ background: '#fca311', width: 'fit-content',padding:'4px',margin:'2px',borderRadius:'4px'}} >{message.Message}</p>
                                        </div>
                                        :
                                        <div key={index} style={{ background: 'transparent', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                                            <p style={{ background: '#a4c3b2', textAlign: 'left', width: 'fit-content',padding:'4px',margin:'2px',borderRadius:'4px' }} key={index}>{message.Message}</p>
                                        </div>
                                ))}
                            </div>

                            <div style={{ position: 'absolute', bottom: '0', display: 'flex', width: '100%' }}>
                                <input style={{ width: '80%' }} type="text" value={senderText} onChange={(e) => setSenderText(e.target.value)} />
                                <button style={{ width: '20%', padding: '0px' }} onClick={() => handleSend('sender', senderText)}>send</button>
                            </div>
                        </div>

                        <div style={{ position: 'absolute', height: '300px', width: '200px', background: '#f1f1f1', bottom: '10px', left: '50px' }}>
                            <div style={{ height: '92%', width: '100%', background: '#ccc' }}>
                                {chatData.map((message, index) => (
                                    message.User === 'receiver' ?
                                        <div key={index} style={{ background: 'transparent', width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <p style={{ background: '#fca311', width: 'fit-content',padding:'4px',margin:'2px',borderRadius:'4px' }} >{message.Message}</p>
                                        </div>
                                        :
                                        <div key={index} style={{ background: 'transparent', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                                            <p style={{ background: '#a4c3b2', textAlign: 'left', width: 'fit-content',padding:'4px',margin:'2px',borderRadius:'4px' }} key={index}>{message.Message}</p>
                                        </div>
                                ))}
                            </div>

                            <div style={{ position: 'absolute', bottom: '0', display: 'flex', width: '100%' }}>
                                <input style={{ width: '80%' }} type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
                                <button style={{ width: '20%', padding: '0px' }} onClick={() => handleSend('receiver', receiver)}>send R</button>
                            </div>
                        </div>
                    </div>
                );
            }}
        </WonContext.Consumer>
    );
}

export default ChatWindow