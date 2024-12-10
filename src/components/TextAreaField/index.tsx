import React from "react";
import "./index.css";
import styles from "./style.module.scss";
import Textarea, { TextAreaProps } from "rc-textarea";

interface ITextAreaFieldProps extends TextAreaProps {}

export const TextAreaField: React.FC<ITextAreaFieldProps> = ({ ...rest }) => {
  return (
    <div className="text-area-field bg-white flex flex-row">
      <div className={styles.test}>Q</div>
      <Textarea autoSize {...rest} />
      <div className="text-area-field-extra"></div>asdf
    </div>
  );
};
