import { useEffect, useState } from "react";

export const useLeitnerDb = () => {
  const [leitnerDb, setLeitnerDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    chrome.storage.local.get(["leitnerDb"], (result) => {
      console.log("get db by useLeitnerDb", result.leitnerDb);
      setLeitnerDb(result.leitnerDb);
    });
  }, []);

  return leitnerDb;
};
