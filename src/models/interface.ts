interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface Box {
  id: number;
  boxName: string;
  creationDate: Date;
  lastModified: Date;
  emoji: string;
  count: number;
  repetitions: number;
  currentLesson: number;
  initialDecks: Card[][];
}

interface Card {
  id: number;
  tags: Tag[];
  deck: "unknown" | "learned" | "lessons";
  boxId: number;
  front: string;
  back: string;
  creationDate: Date;
  lastModified: Date;
  lastReviewed: Date;
  reviewsCount: number;
  reviewedInLesson: boolean;
  currentLesson: number;
  repeatLessons: number[]; // [0, 2, 5, 9] 盒子“0-2-5-9”表示卡片将在第0次、第2次、第5次和第9次学习会话中被复习
  repetitionsLeft: number; // 在当前学习会话中还需要复习的次数
}

interface Tag {
  id: number;
  name: string;
  color: string;
  creationDate: Date;
  lastModified: Date;
}
