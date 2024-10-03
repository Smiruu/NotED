import React, { useEffect, useState } from 'react';

const Chat = ({ groupId, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);
    console.log(groupId)
    console.log(currentUser.token.access)

    useEffect(() => {
        const chatSocket = new WebSocket(
            `ws://localhost:8000/ws/chat/${groupId}/?token=${currentUser.token.access}`
        );

        chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.messages) {
                // Load existing messages
                setMessages(data.messages);
            } else if (data.message) {
                // New message received
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { user: data.user, content: data.message },
                ]);
            }
        };

        chatSocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        chatSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(chatSocket);

        return () => {
            chatSocket.close(); // Clean up on component unmount
        };
    }, [groupId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input) {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ message: input, user: currentUser.name }));
                setInput(''); // Clear input after sending
            } else {
                console.error("WebSocket is not open. Current state:", socket ? socket.readyState : "Socket is not initialized");
            }
        }
    };
    

    return (
        <div>
            <div id="chat-messages" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
