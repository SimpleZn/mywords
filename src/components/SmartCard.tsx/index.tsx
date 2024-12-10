import React from 'react';
import './index.css';

interface ISmartCardProps {
  question?: string;
  answer?: string;
  onQuestionChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAnswerChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const SmartCard: React.FC<ISmartCardProps> = ({ question, answer, onQuestionChange, onAnswerChange }) => {
  return (
    <div className="smart-card">
      <textarea value={question} onChange={onQuestionChange} className="text-area-question"></textarea>
      <textarea value={answer} onChange={onAnswerChange} className="text-area-answer"></textarea>
    </div>
  );
};