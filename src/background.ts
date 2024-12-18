import { openDB } from "./indexDb/db";
import { getOrCreateUserId } from "./utils/uniqueId";

let leitnerDb: IDBDatabase;

// background.js
chrome.runtime.onInstalled.addListener(async () => {
  // 创建右键菜单项
  chrome.contextMenus.create({
    id: "saveWord",
    title: "Save to MyWords",
    contexts: ["selection"],
  });

  try {
    const userId = await getOrCreateUserId();
    console.log("User ID:", userId);
    openDB(userId, (db) => {
      leitnerDb = db;
    });
  } catch (error) {
    console.error("Error getting or creating user ID:", error);
  }
});

// 监听右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  function getSentence(word: string): string {
    const text = word?.toString().trim() || "";

    if (!text || text.toLowerCase().indexOf(word.toLowerCase()) === -1) {
      return ""; // not found
    }

    // Helpers to find the start and end of the sentence
    const findSentenceDelimiter = (
      index: number,
      direction: "backward" | "forward"
    ): number => {
      const delimiters = ".!?";
      let indexFound = -1;
      for (
        let i = index;
        direction === "backward" ? i >= 0 : i < text.length;
        direction === "backward" ? i-- : i++
      ) {
        if (delimiters.includes(text[i])) {
          indexFound = i;
          break;
        }
      }
      return indexFound === -1
        ? direction === "backward"
          ? 0
          : text.length - 1
        : indexFound;
    };

    // Find the start and end of the sentence
    const startIndex = findSentenceDelimiter(
      text.toUpperCase().indexOf(word.toUpperCase()),
      "backward"
    );
    const endIndex = findSentenceDelimiter(
      text.toUpperCase().indexOf(word.toUpperCase(), startIndex),
      "forward"
    );

    // Extract the sentence
    const sentence = text.slice(startIndex, endIndex + 1).trim();

    return sentence;
  }
  if (info.menuItemId === "saveWord") {
    const selectedText = info.selectionText?.toString().trim() || "";
    // const selectedText = window.getSelection()?.toString().trim() || '';
    if (selectedText) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(
          activeTab.id!,
          {
            action: "saveWord",
            word: selectedText,
            sentence: getSentence(selectedText), // 这里简化处理，使用页面URL作为句子的占位符
            translation: "", // 初始时没有翻译
            date: new Date().toISOString(),
            db: leitnerDb,
          },
          (response) => {
            if (response && response.status === "Word saved successfully") {
              console.log("Word saved successfully", response, leitnerDb.name);
            }
            // new Card object
          }
        );
      });
    }
  }
});
