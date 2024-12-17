import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SmartCard } from "../SmartCard/index.js";

interface ISmartCardListProps {
  initialCards: Card[];
}

export const SmartCardList: React.FC<ISmartCardListProps> = (props) => {
  const { initialCards } = props;
  const [cards, setCards] = useState<Card[]>(initialCards || []);
  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setCards(cards.concat(Array.from({ length: 20 })) as Card[]);
    }, 1500);
  };

  return (
    <div>
      <span>SmartCardList</span>
      <InfiniteScroll
        dataLength={cards.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {cards.map((card, index) => (
          <div key={card.id ?? index} id={`#smart-card-${card.id ?? index}`}>
            <SmartCard cardInfo={card} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
