// background.js
chrome.runtime.onInstalled.addListener(() => {
  // 创建右键菜单项
  chrome.contextMenus.create({
      id: "saveWord",
      title: "Save to MyWords",
      contexts: ["selection"]
  });
});

function getSentence(word: string): string {
  const text = window.getSelection()?.toString().trim() || '';
  
  if (!text || !word || text.indexOf(word) === -1) {
    return ''; // not found
  }

  const index = text.indexOf(word);
  let sentenceStart = text.lastIndexOf('.', index - 1) + 1;
  if (sentenceStart === -1) {
    sentenceStart = 0;
  }

  let sentenceEnd = text.indexOf('.', index);
  if (sentenceEnd === -1) {
    sentenceEnd = text.length;
  }

  return text.substring(sentenceStart, sentenceEnd);
}

// 监听右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveWord") {
    const selectedText = window.getSelection()?.toString().trim() || '';
    // const selectedText = window.getSelection()?.toString().trim() || '';
    if (selectedText) {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
                action: 'saveWord',
                word: selectedText,
                sentence: getSentence(selectedText), // 这里简化处理，使用页面URL作为句子的占位符
                translation: '', // 初始时没有翻译
                date: new Date().toISOString()
            }, (response) => {
                if (response && response.status === 'Word saved successfully') {
                    console.log('Word saved successfully');
                }
            });
      });
    }
  }
});