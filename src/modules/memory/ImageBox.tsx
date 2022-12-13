import React, { useRef, useState } from "react";
import { Box } from "@chakra-ui/react";

function ImageBox({ disabled, handleClick, id, type }: ImageBoxProps) {
  const audioElement = useRef<HTMLAudioElement>(null);

  const onClick = (id: string) => {
    audioElement.current!.play();
    handleClick(id);
  };

  return (
    <>
      <audio ref={audioElement} src="/sound-effects/swipe-card.wav" />
      <Box
        p={2}
        h={[75, 100, 150, 200]}
        w={[75, 100, 150, 200]}
        cursor="pointer"
        backgroundSize="contain"
        borderWidth={2}
        borderRadius={20}
        borderStyle="solid"
        backgroundRepeat={"no-repeat"}
        backgroundPosition="center"
        backgroundImage={`url(/images/${type})`}
        onClick={() => (disabled ? null : onClick(id))}
      />
    </>
  );
}

type ImageBoxProps = {
  id: string;
  type: string;
  disabled: boolean;
  handleClick: (id: string) => void;
};

export default ImageBox;
