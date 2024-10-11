import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import "./css/GroupChat.css"; // Import the CSS file

const Chat = ({ groupId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null); // Reference to scroll to the bottom

  // Get user info from Redux store
  const userInfo = useSelector((state) => state.userLogin.userInfo);

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
      console.log("WebSocket connection established");
    };

    chatSocket.onclose = () => {
      console.log("WebSocket connection closed");
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
        setInput(""); // Clear input after sending
      } else {
        console.error(
          "WebSocket is not open. Current state:",
          socket ? socket.readyState : "Socket is not initialized"
        );
      }
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <div className="custom-chat-window">
      <div className="custom-chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`custom-message ${
              msg.user === userInfo.token.name
                ? "custom-sent"
                : "custom-received"
            }`}
          >
            <div
              className={`custom-message-body ${
                msg.user === userInfo.token.name
                  ? "custom-sent"
                  : "custom-received"
              }`}
            >
              {msg.user === userInfo.token.name ? (
                <>
                  <div className="custom-message-content-wrapper">
                    <strong className="custom-message-header">
                      {msg.user}
                    </strong>{" "}
                    {/* User name */}
                    <span className="custom-message-content">
                      {msg.content.split(/(?<=\G.{50})/).map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          <br />{" "}
                          {/* Insert a line break after every 50 characters */}
                        </React.Fragment>
                      ))}
                    </span>{" "}
                    {/* Message content beside name */}
                  </div>
                  <div className="custom-message-photo-wrapper">
                    {msg.photo ? ( // Only render image if photo URL exists
                      <img
                        src={msg.photo}
                        alt={`${msg.user}'s profile`}
                        className="custom-message-photo"
                      />
                    ) : (
                      <div className="custom-chat-placeholder" /> // Placeholder for spacing
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="custom-message-photo-wrapper">
                    {msg.photo ? ( // Only render image if photo URL exists
                      <img
                        src={msg.photo}
                        alt={`${msg.user}'s profile`}
                        className="custom-message-photo"
                      />
                    ) : (
                      <div className="custom-chat-placeholder" /> // Placeholder for spacing
                    )}
                  </div>
                  <div className="custom-message-content-wrapper">
                    <strong className="custom-message-header">
                      {msg.user}
                    </strong>{" "}
                    {/* User name */}
                    <span className="custom-message-content">
                      {msg.content.split(/(?<=\G.{50})/).map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          <br />{" "}
                          {/* Insert a line break after every 50 characters */}
                        </React.Fragment>
                      ))}
                    </span>{" "}
                    {/* Message content beside name */}
                  </div>
                </>
              )}
            </div>
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
          className="custom-chat-input"
        />
        <button type="submit" className="custom-chat-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
