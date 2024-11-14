import logoIcon from "../../logo.svg";
import styles from "./ChatMessage.module.css";

function ChatMessage({ message, className }) {
  return (
    <div className={`${styles.chatMessageDiv} ${className}`}>
      <img src={logoIcon} alt="icon" className={styles.logoIcon} />
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default ChatMessage;
