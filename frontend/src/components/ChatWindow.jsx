// components/ChatWindow.js
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./css/ChatWindow.css";

const ChatWindow = ({ receiverTag, receiverName, receiverPhoto }) => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const senderTag = userInfo.token.user_tag;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null); // Reference to scroll to the bottom

  // Fetch receiver's user info based on receiverTag
  const users = useSelector((state) => state.userList.users); // Assuming you have a userList reducer

  useEffect(() => {
    // Create a new WebSocket connection
    const ws = new WebSocket(
      `ws://localhost:8000/ws/chat/${senderTag}/${receiverTag}/?token=${userInfo.token.access}`
    );

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
    if (newMessage.trim() !== "") {
      const messageData = {
        sender: senderTag,
        receiver: receiverTag,
        message: newMessage,
      };

      // Send message through WebSocket
      socket.send(JSON.stringify(messageData));
      setNewMessage(""); // Clear the input field
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  console.log(users);

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-chat-window ${
              msg.user === userInfo.token.name ? "sent" : "received"
            }`}
          >
            <div
              className={`message-body ${
                msg.user === userInfo.token.name ? "sent" : "received"
              }`}
            >
              {msg.user === userInfo.token.name ? (
                <>
                  <div className="message-content-wrapper">
                    <strong className="message-header">{msg.user}</strong>
                    <span className="message-content">
                      {msg.content.split(/(?<=\G.{50})/).map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          <br />
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                  <div className="message-photo-wrapper">
                    {msg.photo ? (
                      <img
                        src={msg.photo}
                        alt={`${msg.user}'s profile`}
                        className="message-photo"
                      />
                    ) : (
                      <div className="chat-placeholder" />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="message-photo-wrapper">
                    {msg.photo ? (
                      <img
                        src={msg.photo}
                        alt={`${msg.user}'s profile`}
                        className="message-photo"
                      />
                    ) : (
                      <div className="chat-placeholder" />
                    )}
                  </div>
                  <div className="message-content-wrapper">
                    <strong className="message-header">{msg.user}</strong>
                    <span className="message-content">
                      {msg.content.split(/(?<=\G.{50})/).map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          <br />
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          required
          className="chat-input"
        />
        <button type="submit" className="chat-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
