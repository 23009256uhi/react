import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>About Us</h1>
      <p className={styles.paragraph}>
        Welcome to <strong>LinguaAI</strong> – an AI-powered dictionary app
        designed to help you not only understand words but also master their
        pronunciation, so you can express yourself with clarity and confidence.
      </p>
      <p className={styles.paragraph}>
        Our app leverages advanced AI technology to give you immediate feedback
        on your pronunciation, so you can improve steadily and sound more
        natural when speaking. Each word includes an interactive pronunciation
        feature. Say the word aloud, and LinguaAI listens, analyzes, and
        provides feedback to help you improve. Our intelligent feedback system
        highlights where your pronunciation can be adjusted, focusing on aspects
        like stress, intonation, and sound accuracy.
      </p>
      <p className={styles.paragraph}>
        We’re here to help you on every step of your journey. If you have any
        questions or feedback, feel free to reach out – we’d love to hear from
        you.
      </p>
    </div>
  );
}

export default About;
