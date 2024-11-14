import styles from "./SpeechRecognition.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SpeechRecognition() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // Function to navigate to results page
  function navigateToResults() {
    navigate(`/search/${inputValue}`);
  }

  // Event handler for Enter key press
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      navigateToResults();
    }
  }

  return (
    <div className={styles.speechContainer}>
      <>
        {/* Title */}
        <div className={styles.chatDiv}>
          <h3 className={styles.chatHeader}>
            Which word do you want to practice?
          </h3>
        </div>
      </>

      {/* Input */}
      <div className={styles.inputDiv}>
        <input
          type="text"
          className={styles.input}
          placeholder="Write your word here"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={handleKeyPress}
        ></input>
      </div>
    </div>
  );
}

export default SpeechRecognition;
