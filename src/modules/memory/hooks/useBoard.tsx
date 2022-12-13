import { useEffect, useState } from "react";
import { CardType } from "../types";

const useBoard = () => {
  const [cards, setCards] = useState<CardType[]>([]); // empty array to store the cards
  const [flipped, setFlipped] = useState<string[]>([]); // array to store the flipped cards
  const [solved, setSolved] = useState<string[]>([]); // array to store the solved cards
  const [disabled, setDisabled] = useState(false); // disable the click event

  useEffect(() => {
    setCards(createCards()); // create cards when the component mounts
  }, []);

  const handleClick = (id: string) => {
    setDisabled(true); // disable the click event
    if (flipped.length === 0) {
      setFlipped([id]); // set the flipped cards
      updateCards(id);
      setDisabled(false); // enable the click event
    } else {
      if (sameCardClicked(id)) return; // if the same card is clicked, return
      setFlipped([flipped[0]!, id]); // set the flipped cards
      if (isMatch(id)) {
        // if the cards are a match
        setSolved([...solved, flipped[0]!, id]); // set the solved cards
        resetCards(); // reset the cards
      } else {
        setTimeout(resetCards, 2000); // set a timeout to reset the cards
      }
    }
  };

  const updateCards = (id: string) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          flipped: true,
        };
      }
      return card;
    });
    setCards(newCards);
  };

  const preloadImages = () => {
    cards.map((card) => {
      const src = `/images/${card.type}.png`; // get the image source
      new Image().src = src; // create a new image and set the source
    });
  };

  const createCards = (): CardType[] => {
    const maxValue = 6;
    const possibleCards = [];
    // TODO Make this dynamic
    // create an array of image names based on the ../../public/images folder
    const imageNames: string[] = [
      "av-amarela",
      "av-azul",
      "av-rosa",
      "av-vermelha",
      "ben-diamond-head",
      "ben-four-arms",
    ];

    for (let i = 0; i < maxValue; i++) {
      possibleCards.push({
        id: `${i}${i}`,
        type: imageNames[i]!,
        flipped: false,
        solved: false,
      });
      possibleCards.push({
        id: `${i}${i + 1}`,
        type: imageNames[i]!,
        flipped: false,
        solved: false,
      });
    }

    return shuffle(possibleCards);
  };

  const shuffle = (array: CardType[]): CardType[] => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex]!;
      array[randomIndex] = temporaryValue!;
    }

    return array;
  };

  const sameCardClicked = (id: string): boolean => flipped.includes(id);

  const isMatch = (id: string): boolean => {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped[0] === card?.id);
    return flippedCard?.type === clickedCard?.type;
  };

  const resetCards = () => {
    setFlipped([]);
    const resetedCards = cards.map((card) => {
      if (solved.includes(card.id)) {
        return card;
      }
      return { ...card, flipped: false };
    });
    setCards(resetedCards);
    setDisabled(false);
  };
  const resetGame = () => {
    console.log("RESET GAME")
    setCards(createCards());
    setFlipped([]);
    setSolved([]);
  };

  return {
    cards,
    flipped,
    solved,
    disabled,
    handleClick,
    handleResetGame: resetGame,
  };
};

export default useBoard;
