// styles
import styles from "@/styles/PageLoader.module.css";

export default function PageLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.content}>
          <div className={styles.ellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
