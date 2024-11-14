import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./PracticeWord.module.css";

function PracticeWord() {
  const location = useLocation();
  const { word, phonetic } = location.state || {};
  const [instructions, setInstructions] = useState("");
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  // Fetch Instructions
  async function getInstructions(phonetic) {
    try {
      const response = await axios.post("http://localhost:5000/instructions", {
        phonetic: phonetic,
      });
      setInstructions(response.data);
    } catch (error) {
      console.error("Error getting isntructions:", error);
    }
  }

  // Analyse Voice Transcript
  async function analyse() {
    try {
      const response = await axios.post("http://localhost:5000/analyse", {
        recognizedText: transcript,
        expectedWord: word,
      });
      setFeedback(response.data);
    } catch (error) {
      console.error("Error comparing phonetics:", error);
      setFeedback("Failed to analyse pronunciation");
    }
  }

  // Start Recording Voice
  function startRecording() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-GB";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      axios
        .post("http://localhost:5000/analyse", {
          recognizedText: transcript,
          expectedWord: word,
        })
        .then((response) => {
          setFeedback(response.data);
        })
        .catch((error) => {
          console.error("Error comparing phonetics:", error);
          setFeedback("Failed to analyse pronunciation");
        });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert(`An error occurred during speech recognition: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  }

  // Stop Recording Voice
  function stopRecording() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }

  // Watch for transcript changes to call analyse function
  useEffect(() => {
    if (transcript) {
      analyse();
    }
  }, [transcript]);

  // Fetch instructions on component mount
  useEffect(() => {
    getInstructions(phonetic);
  }, [phonetic]);

  return (
    <div className={styles.practiceDiv}>
      {/* Word Phonetic and Instructions */}
      {word && phonetic ? (
        <div className={styles.speechContainer}>
          <h1 className={styles.wordTitle}>
            Let's practice how to say:{" "}
            <span className={styles.word}>{word}</span>
          </h1>
          <p className={styles.phonetic}>
            Phonetic transcription: <strong>{phonetic}</strong>
          </p>

          <p className={styles.instructions}>
            <strong>Instructions:</strong> Read the instructions below, and when
            ready, <span className={styles.highlight}>press the button</span> to
            start recording and{" "}
            <span className={styles.highlight}>pronounce the word aloud</span>.
          </p>
          <p className={styles.instructionDetails}>{instructions}</p>

          {/* Button for Start/Stop Recording */}
          <button
            className={isRecording ? styles.recordingButton : styles.tryButton}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <>Stop Recording</> : <>Start Recording</>}
          </button>

          {/* Feedback */}
          <div className={styles.feedbackContainer}>
            {/* <p className={styles.transcript}>Transcript: {transcript}</p> */}
            <p className={styles.feedback}>{feedback}</p>
          </div>
        </div>
      ) : (
        <div>
          <p>No data</p>
        </div>
      )}
    </div>
  );
}

export default PracticeWord;
