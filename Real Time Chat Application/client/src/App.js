// client/src/App.js
import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      // Send the message to the server
      socket.emit("message", { user: "You", text: input });

      // Update local state
      setMessages([...messages, { user: "You", text: input }]);
      setInput("");
    }
  };

  return (
    <div>
      <div>
        <h1>Real-Time Chat App</h1>
      </div>
      <div>
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              <strong>{message.user}:</strong> {message.text}
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Type your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
