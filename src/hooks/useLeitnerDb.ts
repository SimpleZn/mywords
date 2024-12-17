import { useEffect, useState } from "react";
import { useUserId } from "./useUserId";
import { openDB } from "../data_model/db";

export const useLeitnerDb = () => {
  const userId = useUserId();
  const [leitnerDb, setLeitnerDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    if (!userId) return;
    openDB(userId, (db) => {
      setLeitnerDb(db);
    });
  }, [userId]);

  return leitnerDb;
};
