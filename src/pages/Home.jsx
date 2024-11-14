import styles from "./Home.module.css";
import SpeechRecognition from "../components/SpeechRecognition";

function Home() {
  return (
    <div className={styles.homeDiv}>
      <SpeechRecognition />
    </div>
  );
}

export default Home;
