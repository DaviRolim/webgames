import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import Card from "./Card";
import useBoard from "./hooks/useBoard";
import React, { useEffect, useRef, useState } from "react";

function MatchPairsBoard() {
  const winnigSoundEffect = useRef<HTMLAudioElement>(null);
  const matchedPairSoundEffect = useRef<HTMLAudioElement>(null);
  const { cards, flipped, solved, disabled, handleClick } = useBoard();
  const [gameFinished, setGameFinished] = useState(false);
  useEffect(() => {
    if (solved.length === 12) {
      winnigSoundEffect.current?.play();

      setTimeout(() => {
        setGameFinished(true);
      }, 2000);
    } else {
      matchedPairSoundEffect.current?.play();
    }
  }, [solved]);

  if (gameFinished) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        py={12}
      >
        <Button onClick={() => setGameFinished(false)} colorScheme="yellow">Jogar novamente</Button>
      </Box>
    );
  }
  return (
    <>
      <audio
        src="/sound-effects/cards-matched.mp3"
        ref={matchedPairSoundEffect}
      />
      <audio
        src="/sound-effects/solved-all-matches.mp3"
        ref={winnigSoundEffect}
      />
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
    </>
  );
}

MatchPairsBoard.propTypes = {};

export default MatchPairsBoard;
