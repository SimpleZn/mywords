// @ts-ignore
const db: IDBDatabase = window.leitnerDb;

export interface getCardsByPagePayload {
  currentPage: number;
  pageSize: number;
}

export class SmartCardService {
  static async getAllCards() {}
}
