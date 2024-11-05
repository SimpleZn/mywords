chrome.runtime.onMessage.addListener((request: any, sender: any, sendResponse: any) => {
  if (request.action === 'saveWord') {
    chrome.storage.sync.get({ words: [] }, (data: any) => {
      const words: any[] = data.words;
      words.push({
        word: request.word,
        sentence: request.sentence,
        translation: request.translation,
        date: request.date
      });
      chrome.storage.sync.set({ words }, () => {
        sendResponse({ status: 'Word saved successfully' });
      });
    });
    return true;
  }
});