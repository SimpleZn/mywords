import scrollIntoView from "scroll-into-view-if-needed";

export const scrollTo = (elementId: string) => {
  const currentRow = document.querySelector(elementId);
  if (currentRow) {
    scrollIntoView(currentRow, {
      scrollMode: "if-needed",
      block: "start",
    });
  }
};
