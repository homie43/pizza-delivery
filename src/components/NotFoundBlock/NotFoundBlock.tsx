import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div>
      <h1 className={styles.root}>
        <span>🤨</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.descr}>К сожалению такая страница отсутствует</p>
    </div>
  );
};

export default NotFoundBlock;
