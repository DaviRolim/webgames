import React from "react";
import { Box } from "@chakra-ui/react";

function ImageBox({ disabled, handleClick, id, type }: ImageBoxProps) {
  return (
    <Box
      p={2}
      h={[75, 100, 150, 200]}
      w={[75, 100, 150, 200]}
      cursor="pointer"
      backgroundSize="contain"
      borderWidth={5}
      borderRadius={15}
      borderStyle="solid"
      backgroundRepeat={"no-repeat"}
      backgroundPosition="center"
      backgroundImage={`url(/images/${type}.png)`}
      onClick={() => (disabled ? null : handleClick(id))}
    />
  );
}

type ImageBoxProps = {
  id: string;
  type: string;
  disabled: boolean;
  handleClick: (id: string) => void;
};

export default ImageBox;
