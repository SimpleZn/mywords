import React, { useState } from "react";
import EventManager from "../../utils/EventManager";
import { useLeitnerDb } from "../../hooks/useLeitnerDb";
import { SmartCard } from "../SmartCard";
import useSWR from "swr";
import { SWRKeys } from "../../utils/swr-keys";
import { getAllCards } from "../../data_model/card";

export const MainContent = () => {
  const [cards, setCards] = useState([]);
  const events = new EventManager();
  const db = useLeitnerDb();

  const { data } = useSWR(db ? SWRKeys.getAllCards : null, () => {
    return getAllCards(db!);
  });

  console.log("allCards", data);

  const addNewCard = () => {
    const newCardsSet = [...cards, {}];
    // @ts-ignore
    setCards(newCardsSet);
  };
  events.addListener("card:add-new-card-request", addNewCard);

  return (
    <main className="ml-64 p-4 pt-16 deck-edit-section">
      <div className="multi-cards">
        {/* <h1 className="text-2xl font-bold">Main Content</h1> */}

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <SmartCard />
      </div>
    </main>
  );
};
