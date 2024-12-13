import React, { useState } from "react";
import styles from "./style.module.scss";
import { TextAreaField } from "../TextAreaField";

interface ISmartCardProps {
  cardInfo: Card;
  onChange?: (cardInfo: Card) => void;
}

export const SmartCard: React.FC<ISmartCardProps> = ({
  cardInfo,
  onChange,
}) => {
  const [cardCont, setCardCont] = useState<Card>(cardInfo || {});

  const onQuestionChange = (front: string) => {
    const newContent = {
      ...cardCont,
      front,
    };
    setCardCont(newContent);
    onChange?.(newContent);
  };

  const onAnswerChange = (back: string) => {
    const newContent = {
      ...cardCont,
      back,
    };
    setCardCont(newContent);
    onChange?.(newContent);
  };

  return (
    <div className={styles.smartCard}>
      <div className={styles.header}>
        <div>left info : Date ... etc</div>
        <div>right actions</div>
      </div>
      <div className={styles.textFields}>
        <TextAreaField
          indicator="Q"
          value={cardCont.back}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onQuestionChange(e.target.value)
          }
        />
        <TextAreaField
          indicator="A"
          value={cardCont.front}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onAnswerChange(e.target.value)
          }
        />
      </div>
    </div>
  );
};
