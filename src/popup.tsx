import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  const [words, setWords] = useState<
    {
      word: string;
      sentence: string;
      translation: string;
      date: string;
    }[]
  >([]);
  const [currentURL, setCurrentURL] = useState<string>("");

  useEffect(() => {
    // 从chrome.storage.sync中获取words数据
    chrome.storage.sync.get(["words"], function (result) {
      const words = result.words || [];
      setWords(words);
    });

    // 获取当前标签页的URL
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url || "");
    });
  }, []);

  return (
    <div
      style={{
        width: "700px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={() => {
          // open new tab: new_page.tsx
          chrome.tabs.create({ url: "new_page.html" });
        }}
      >
        Manage
      </button>
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Current URL:</strong> {currentURL}
        </p>
        <p>
          <strong>Current Time:</strong> {new Date().toLocaleTimeString()}
        </p>
      </div>

      <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
        Saved Words
      </h2>

      {words.length === 0 ? (
        <p>No words saved yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {words.map((word, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#f0f0f0",
                margin: "10px 0",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>{word.word}</h3>
              <p>
                <strong>Sentence:</strong> {word.sentence}
              </p>
              <p>
                <strong>Translation:</strong> {word.translation}
              </p>
              <p>
                <strong>Date:</strong> {word.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
