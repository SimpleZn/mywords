/**
 * Chrome 扩展的 content_script 是一种特殊的脚本，它可以在浏览器加载网页时注入到特定的网页中。content_script 的主要作用是读取或修改网页的内容，与网页进行交互，以及执行一些特定的逻辑。

具体来说，content_script 可以：

读取和修改 DOM：可以通过 JavaScript 操作网页的 DOM 树，读取或修改网页的内容。
监听 DOM 事件：可以监听网页上的 DOM 事件，例如点击事件、鼠标移动事件等，并做出相应的反应。
与后台脚本通信：可以通过 chrome.runtime.sendMessage 和 chrome.runtime.onMessage 与后台脚本进行通信，实现数据的传递和共享。
访问 Chrome API：可以访问 Chrome 提供的 API，例如 chrome.storage、chrome.tabs 等，实现更丰富的功能。
 */

// 假设这是从背景脚本获取的保存的单词列表
const savedWords = ["Web", "web"];

// 将已经保存的单词在页面上高亮展示

function addDataWordAttributes(savedWords: string[]) {
  const textNodes = document.evaluate(
    "//text()[not(ancestor::*[@data-word])]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for (let i = 0; i < textNodes.snapshotLength; i++) {
    const textNode = textNodes.snapshotItem(i);
    // @ts-ignore
    const wordsInText = textNode.textContent.split(/\s+/);
    for (const word of wordsInText) {
      // @ts-ignore
      if (savedWords.includes(word)) {
        // 创建一个新的元素来包含这个单词
        const newElement = document.createElement("span");
        newElement.textContent = word;
        newElement.setAttribute("data-word", word);
        newElement.style.textDecoration = "underline";

        // 替换原来的文本节点为新的元素
        // @ts-ignore
        textNode.parentNode.replaceChild(newElement, textNode);
        break; // 避免重复添加属性
      }
    }
  }
}

// 定义一个函数，在页面加载完成后执行
function onPageLoad() {
  console.log("Page has loaded!");

  // 在这里执行你想要在页面加载后执行的操作
  // 例如，你可以调用 underlineWords 函数来给单词加下划线
  // underlineWords(savedWords);

  // 使用 MutationObserver 监听 DOM 变化
  const observer = new MutationObserver(() => {
    // underlineWords(savedWords); // 重新应用下划线样式
    addDataWordAttributes(savedWords);
    observer.disconnect();
    const wordElements = document.querySelectorAll(`[data-word]`);
    wordElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // 创建一个modal弹窗, 包含content 和footer, footer包含两个按钮，cancel和 reviewd, 点击cancel 关闭弹窗
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "white";
        modal.style.padding = "20px";
        modal.style.border = "1px solid #ccc";
        modal.style.zIndex = "9999";

        const content = document.createElement("div");
        content.style.marginBottom = "20px";
        content.innerHTML = "这是模态框的内容";

        const footer = document.createElement("div");
        footer.style.display = "flex";
        footer.style.justifyContent = "flex-end";

        const cancelButton = document.createElement("button");
        cancelButton.style.marginRight = "10px";
        cancelButton.innerHTML = "取消";
        cancelButton.addEventListener("click", () => {
          modal.style.display = "none";
        });

        const reviewButton = document.createElement("button");
        reviewButton.innerHTML = "已复习";
        reviewButton.addEventListener("click", () => {
          // 取消下划线展示
          const wordRelatedElements = document.querySelectorAll(
            `[data-word=${element.textContent}]`
          );
          wordRelatedElements.forEach((element) => {
            // @ts-ignore
            element.style.textDecoration = "none";
          });
          modal.style.display = "none";
        });

        footer.appendChild(cancelButton);
        footer.appendChild(reviewButton);

        modal.appendChild(content);
        modal.appendChild(footer);

        document.body.appendChild(modal);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
// 在 window 对象上添加 onload 事件监听器
window.onload = onPageLoad;

chrome.runtime.onMessage.addListener(
  (request: any, sender: any, sendResponse: any) => {
    if (request.action === "saveWord") {
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

// 读取user_config 配置项
chrome.storage.sync.get("user_config", (config) => {
  if (config.enableHover) {
    // 为匹配的单词添加 hover 功能
    // enable hover
  } else {
    console.log("Hover功能已被禁用");
  }
});

/**
 * content_script
 * 保存动作在后台，应为是通过右键菜单方式触发的，所以需要在后台脚本中保存单词，
 * 保存成功后，将消息广播到content_script中，在对应的单词下面加上下划线，表示已经保存。
 * 保存失败后，在content_script中显示错误信息。“保存失败”
 *
 */

// // 监听保存成功的消息
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "wordSaved") {
//     // 在页面上找到所有匹配的单词并添加下划线
//     const wordElements = document.querySelectorAll(
//       `[data-word="${message.word}"]`
//     );
//     wordElements.forEach((element) => {
//       element.style.textDecoration = "underline";
//     });
//   }
// });
