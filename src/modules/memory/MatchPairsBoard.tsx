import { Box, Button, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Card from "./Card";
import useBoard from "./hooks/useBoard";
import React, { useEffect, useRef, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { Rubik_Puddles } from "@next/font/google";

const rubikPuddlesFont = Rubik_Puddles({
  weight: "400",
  subsets: ["latin"],
});
function MatchPairsBoard() {
  const winnigSoundEffect = useRef<HTMLAudioElement>(null);
  const matchedPairSoundEffect = useRef<HTMLAudioElement>(null);
  const { width, height } = useWindowSize();
  const { cards, flipped, solved, disabled, handleClick, handleResetGame } =
    useBoard();
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    if (solved.length === 12) {
      winnigSoundEffect.current?.play();
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
        setGameFinished(true);
      }, 4000);
    } else {
      matchedPairSoundEffect.current?.play();
    }
  }, [solved]);

  const handlePlayAgain = () => {
    handleResetGame();
    setGameFinished(false);
  };
  if (gameFinished) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        py={12}
      >
        <Button onClick={handlePlayAgain} colorScheme="yellow">
          Jogar novamente
        </Button>
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
      {showConfetti && <Confetti width={width} height={height} />}
      <Stack height="100%">
        <Text
          className={rubikPuddlesFont.className}
          color="red.300"
          whiteSpace="pre-wrap"
          fontWeight="bold"
          fontSize={[60, 80, 130]}
          textAlign="center"
          mb={[24, 15, 5]}
        >
          Lari   Land
        </Text>
        <SimpleGrid columns={[3, 6, 3, 4]} spacing="35px">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              type={card.type}
              flipped={flipped.includes(card.id)}
              solved={solved.includes(card.id)}
              disabled={
                disabled ||
                solved.includes(card.id) ||
                flipped.includes(card.id)
              }
              handleClick={handleClick}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}

MatchPairsBoard.propTypes = {};

export default MatchPairsBoard;
