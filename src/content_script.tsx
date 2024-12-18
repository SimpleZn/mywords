/**
 * Chrome 扩展的 content_script 是一种特殊的脚本，它可以在浏览器加载网页时注入到特定的网页中。content_script 的主要作用是读取或修改网页的内容，与网页进行交互，以及执行一些特定的逻辑。

具体来说，content_script 可以：

读取和修改 DOM：可以通过 JavaScript 操作网页的 DOM 树，读取或修改网页的内容。
监听 DOM 事件：可以监听网页上的 DOM 事件，例如点击事件、鼠标移动事件等，并做出相应的反应。
与后台脚本通信：可以通过 chrome.runtime.sendMessage 和 chrome.runtime.onMessage 与后台脚本进行通信，实现数据的传递和共享。
访问 Chrome API：可以访问 Chrome 提供的 API，例如 chrome.storage、chrome.tabs 等，实现更丰富的功能。
 */

chrome.runtime.onMessage.addListener(
  (request: any, sender: any, sendResponse: any) => {
    if (request.action === "saveWord") {
      const leitnerDb = request.db;
      console.log("leitnerDb from content script", leitnerDb.name);
      chrome.storage.sync.get({ words: [] }, (data: any) => {
        const words: any[] = data.words;
        words.push({
          word: request.word,
          sentence: request.sentence,
          translation: request.translation,
          date: request.date,
        });
        chrome.storage.sync.set({ words }, () => {
          sendResponse({ status: "Word saved successfully" });
        });
      });
      return true;
    }
  }
);

// todo:
// 将已经保存的单词在页面上高亮展示
