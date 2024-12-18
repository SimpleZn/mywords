export class Card {
  id: number;
  word: string;
  translation: string;
  exampleSentence: string;
  audioUrl: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    word: string,
    translation: string,
    exampleSentence: string,
    audioUrl: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.word = word;
    this.translation = translation;
    this.exampleSentence = exampleSentence;
    this.audioUrl = audioUrl;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
