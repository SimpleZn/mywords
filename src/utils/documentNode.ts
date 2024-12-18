// 函数：给单词加上下划线
function underlineWords(words: string[]) {
  // 定义一个过滤器，只接受文本节点
  // 获取页面上的所有文本节点
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node) {
        return node.nodeType === Node.TEXT_NODE
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    }
  );

  let currentNode = walker.currentNode;

  while (currentNode) {
    const text = currentNode.nodeValue;
    console.log("text", text);
    if (text) {
      // 替换文本中的单词并加上下划线
      const underlinedText = text.replace(
        new RegExp(`\\b(${words.join("|")})\\b`, "gi"),
        '<span style="text-decoration: underline;">$1</span>'
      );
      console.log("underlinedText", text, underlinedText);
      currentNode.nodeValue = underlinedText;
    }
    // @ts-ignore
    currentNode = walker.nextNode();
  }
}

function underlineWordsByInnerHTML(words: string[]) {
  const regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
  const underlinedHTML = document.body.innerHTML.replace(
    regex,
    '<span style="text-decoration: underline;">$1</span>'
  );
  document.body.innerHTML = underlinedHTML;
}
