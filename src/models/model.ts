import BackBone from "backbone";
import { v4 } from "uuid";

export class CardModel extends BackBone.Model {
  defaults(): Partial<Card> {
    return {
      id: v4(),
      boxId: 1, // default box
      creationDate: new Date(),
      deck: "unknown",
    };
  }
  constructor(attrs: Partial<Card>, options?: any) {
    super(attrs, options);
  }
}
