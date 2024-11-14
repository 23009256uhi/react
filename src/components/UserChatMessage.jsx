import styles from "./UserChatMessage.module.css";

function UserChatMessage({ message, className }) {
  return (
    <div className={`${styles.chatMessageDiv} ${className}`}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default UserChatMessage;
