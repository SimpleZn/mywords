import React from "react";
import "./index.css";
import styles from "./style.module.scss";
import Textarea, { TextAreaProps } from "rc-textarea";

interface ITextAreaFieldProps extends TextAreaProps {
  indicator?: string;
}

export const TextAreaField: React.FC<ITextAreaFieldProps> = ({
  indicator,
  ...rest
}) => {
  return (
    <div className="text-area-field bg-white flex flex-row text-base w-full">
      {indicator && <div className={styles.indicator}>{indicator}</div>}
      <Textarea
        className="border-b-2 border-black outline-none focus:text-[#197096] flex-1 focus:border-red-500 "
        autoSize
        {...rest}
      />
      <div className="text-area-field-extra"></div>
    </div>
  );
};
