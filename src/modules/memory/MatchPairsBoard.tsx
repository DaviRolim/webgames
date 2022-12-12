import { SimpleGrid } from "@chakra-ui/react";
import Card from "./Card";
import useCards from "./hooks/useCards";

function MatchPairsBoard() {
  const { cards, flipped, solved, disabled, handleClick } = useCards();

  return (
    <SimpleGrid columns={[3, 6, 3, 4]} spacing="35px" m={8}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          type={card.type}
          flipped={flipped.includes(card.id)}
          solved={solved.includes(card.id)}
          disabled={
            disabled || solved.includes(card.id) || flipped.includes(card.id)
          }
          handleClick={handleClick}
        />
      ))}
    </SimpleGrid>
  );
}

MatchPairsBoard.propTypes = {};

export default MatchPairsBoard;
