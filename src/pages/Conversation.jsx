import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Conversation.module.css";
import ChatMessage from "../components/ChatMessage";
import UserChatMessage from "../components/UserChatMessage";

function Conversation() {
  const [conversation, setConversation] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Fetch the entire conversation history when the component mounts
  async function fetchMessages() {
    try {
      const response = await axios.get("http://localhost:5000/messages");
      setConversation(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  // Handle Enter key press to send the message
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  }

  // Handle seding a message
  async function handleSendMessage() {
    if (!inputValue.trim()) return; // Prevent sending empty messages

    try {
      const updatedConversation = [
        ...conversation,
        { role: "user", text: inputValue },
      ];

      const response = await axios.post("http://localhost:5000/conversation", {
        inputValue,
      });

      const aiMessage = { role: "ai", text: response.data };
      setConversation([...updatedConversation, aiMessage]);

      setInputValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className={styles.conversationDiv}>
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          {/* Loop through the conversation and render messages */}
          {conversation.map((msg, index) =>
            msg.role === "ai" ? (
              <ChatMessage
                key={index}
                message={msg.text}
                className={styles.chatMessageAnimated}
              />
            ) : (
              <UserChatMessage
                key={index}
                message={msg.text}
                className={styles.userMessage}
              />
            )
          )}
        </div>

        {/* Input Field */}
        <div className={styles.inputDiv}>
          <div className={styles.innerInputDiv}>
            <input
              type="text"
              className={styles.input}
              placeholder="Type your message"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={handleKeyPress}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
