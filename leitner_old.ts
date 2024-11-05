type LearningStage = "箱1" | "箱2" | "箱3";

interface Card {
  id: number;
  content: string;
  stage: LearningStage;
  lastReviewDate: Date | null;
}

class Box {
  cards: Card[] = [];
  interval: number;

  constructor(container: LearningContainer, interval: number) {
    this.interval = interval;
    container.registerBox(this);
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  reviewCard(card: Card, success: boolean) {
    if (success) {
      this.moveCardToNextStage(card);
    } else {
      this.moveCardToPreviousStage(card);
    }
  }

  moveCardToNextStage(card: Card) {
    const nextStage = this.getNextStage(card.stage);
    card.stage = nextStage;
    card.lastReviewDate = new Date();
    this.saveCard(card);
  }

  moveCardToPreviousStage(card: Card) {
    const previousStage = this.getPreviousStage(card.stage);
    card.stage = previousStage;
    card.lastReviewDate = new Date();
    this.saveCard(card);
  }

  getNextStage(currentStage: LearningStage): LearningStage {
    switch (currentStage) {
      case "箱1":
        return "箱2";
      case "箱2":
        return "箱3";
      case "箱3":
        return "箱3"; // 箱3已经是最高阶段，不发生变化
      default:
        throw new Error("Unknown stage");
    }
  }

  getPreviousStage(currentStage: LearningStage): LearningStage {
    switch (currentStage) {
      case "箱1":
        return "箱1"; // 箱1已经是最低阶段，不发生变化
      case "箱2":
        return "箱1";
      case "箱3":
        return "箱2";
      default:
        throw new Error("Unknown stage");
    }
  }

  saveCard(card: Card) {
    // 这里实现保存卡片的逻辑
  }
}

class LearningContainer {
  private boxes: Box[];
  private cardDatabase: { [id: number]: Card } = {};

  constructor() {
    this.boxes = [
      new Box(this, 1), // 箱1：每天复习
      new Box(this, 3), // 箱2：每3天复习
      new Box(this, 5), // 箱3：每5天复习
    ];
  }

  registerBox(box: Box) {
    // 可以在这里存储附加信息
  }

  getBoxForNewCard(): Box {
    return this.boxes.find((box) => box.cards.length === 0) || this.boxes[0];
  }

  reviewCard(cardId: number, success: boolean) {
    const card = this.cardDatabase[cardId];
    if (card) {
      this.boxes
        .find((box) => box.cards?.includes(card))
        ?.reviewCard(card, success);
    } else {
      console.error("Card not found");
    }
  }

  addCard(content: string) {
    const newCard: Card = {
      id: Date.now(),
      content,
      stage: "箱1",
      lastReviewDate: null,
    };
    this.cardDatabase[newCard.id] = newCard;
    this.getBoxForNewCard().addCard(newCard);
  }
}

// 示例用法
const learningContainer = new LearningContainer();
learningContainer.addCard("示例卡片1");
learningContainer.addCard("示例卡片2");

// 假设学生答错了卡片1
// learningContainer.reviewCard(学习容器.cardDatabase[学习容器卡片1.id].id, false);
