import { addCard } from "./indexDb/card";
import { openDB } from "./indexDb/db";
import { CardModel } from "./models/model";
import { getOrCreateUserId } from "./utils/uniqueId";

let leitnerDb: IDBDatabase;

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
/**
 * 在 content_script 中，你无法直接监听 chrome.contextMenus.onClicked 事件，
 * 因为 chrome.contextMenus API 是用于在浏览器的上下文菜单中创建自定义菜单项的，
 * 它属于后台脚本（background.js）的范畴。
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveWord") {
    const selectedText = info.selectionText?.toString().trim() || "";
    if (selectedText) {
      const sentence = getSentence(selectedText);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        const card = new CardModel({
          front: selectedText,
          back: sentence,
          envs: {
            tabUrl: activeTab.url,
            sentence: sentence,
          },
        });
        console.log("card model", card.toJSON(), leitnerDb.name);
        addCard(leitnerDb, card.toJSON()).then(() => {
          // send message to content_script, show some message
          console.log("Word saved db successfully");
          chrome.tabs.sendMessage(
            activeTab.id!,
            {
              action: "saveWord",
              word: selectedText,
              sentence,
              date: new Date(),
            },
            (response) => {
              if (response && response.status === "Word saved successfully") {
                console.log("Word saved successfully");
              }
            }
          );
        });
      });
    }
  }
});
