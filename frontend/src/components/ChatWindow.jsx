// components/ChatWindow.js
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const ChatWindow = ({ receiverTag }) => {
    const userInfo = useSelector((state) => state.userLogin.userInfo);
    const senderTag = userInfo.token.user_tag;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null); // Reference to scroll to the bottom
    const [receiverUserName, setReceiverUserName] = useState('');

    // Fetch receiver's user info based on receiverTag
    const users = useSelector((state) => state.userList.users); // Assuming you have a userList reducer
    useEffect(() => {
        const receiver = users.find(user => user.user_tag === receiverTag);
        if (receiver) {
            setReceiverUserName(receiver.name); // Set the receiver's name
        }
    }, [receiverTag, users]);

    useEffect(() => {
        // Create a new WebSocket connection
        const ws = new WebSocket(`ws://localhost:8000/ws/chat/${senderTag}/${receiverTag}/?token=${userInfo.token.access}`);

        // Set the WebSocket instance in state
        setSocket(ws);

        // Handle incoming messages
        ws.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            if (messageData.messages) {
                // Load existing messages
                setMessages(messageData.messages);
            } else if (messageData.message) {
                // New message received
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        user: messageData.user,
                        content: messageData.message,
                        photo: messageData.photo || null, // Safeguard if photo is missing
                    },
                ]);
            }
        };

        // Clean up the WebSocket connection on unmount
        return () => {
            ws.close();
        };
    }, [receiverTag, senderTag]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            const messageData = {
                sender: senderTag,
                receiver: receiverTag,
                message: newMessage,
            };

            // Send message through WebSocket
            socket.send(JSON.stringify(messageData));
            setNewMessage(''); // Clear the input field
        }
    };

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    return (
        <div className="chat-window">
            <h2>Chat with {receiverUserName || receiverTag}</h2> {/* Use receiver's name or fallback to user tag */}
            <div id="chat-messages" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        {msg.photo ? (
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
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatWindow;
