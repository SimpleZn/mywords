import { useEffect, useState } from "react";
import { getOrCreateUserId } from "../utils/uniqueId";

export const useUserId = () => {
  const [userId, setUserId] = useState<string>();
  useEffect(() => {
    getOrCreateUserId().then((result) => {
      setUserId(result);
    });
  }, []);

  return userId;
};
