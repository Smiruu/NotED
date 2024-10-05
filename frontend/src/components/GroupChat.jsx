import React, { useEffect, useState, useRef } from 'react';

const Chat = ({ groupId, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null); // Reference to scroll to the bottom

    useEffect(() => {
        const chatSocket = new WebSocket(
            `ws://localhost:8000/ws/chat/${groupId}/?token=${currentUser.token.access}`
        );

        chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);

            if (data.messages) {
                // Load existing messages
                setMessages(data.messages);
            } else if (data.message) {
                // New message received
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        user: data.user,
                        content: data.message,
                        photo: data.photo || null, // Safeguard if photo is missing
                    },
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

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    return (
        <div>
            <div id="chat-messages" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, index) => ( 
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        {msg.photo ? ( // Only render image if photo URL exists
                            <img
                                src={msg.photo}
                                alt={`${msg.user}'s profile`}
                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} // Styling the image
                            />
                        ) : (
                            <div style={{ width: '40px', height: '40px', marginRight: '10px' }} /> // Placeholder for spacing
                        )}
                        <strong>{msg.user}:</strong> {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
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
