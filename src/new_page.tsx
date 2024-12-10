import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import "./tailwind.css";
import EventManager from "./utils/EventManager";
import { SmartCard } from "./components/SmartCard.tsx";
import { TextAreaField } from "./components/TextAreaField";

const FixedHeader = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow h-16">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <h1 className="text-2xl font-bold">Fixed Header</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#">Link 1</a>
            </li>
            <li>
              <a href="#">Link 2</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const Sidebar = () => {
  return (
    <aside className="fixed left-0 bottom-0 top-16 w-64 bg-gray-100 overflow-y-auto">
      <ul>
        <li>
          <a href="#">Sidebar Item 1</a>
        </li>
        <li>
          <a href="#">Sidebar Item 2</a>
        </li>
        <li>
          <a href="#">Sidebar Item 3</a>
        </li>
      </ul>
    </aside>
  );
};

const MainContent = () => {
  const [cards, setCards] = useState([]);
  const events = new EventManager();

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
        <TextAreaField />
      </div>
    </main>
  );
};

const NewPage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* <FixedHeader /> */}
      <div className="flex flex-1">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <NewPage />
  </React.StrictMode>
);
