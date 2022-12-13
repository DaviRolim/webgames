// import Image from "next/image";
import ReactCardFlip from "react-card-flip";
import ImageBox from "./ImageBox";

const Card = ({
  id,
  type,
  flipped,
  solved,
  disabled,
  handleClick,
  soundEffect,
}: CardProps) => {
  return (
    <ReactCardFlip
      isFlipped={flipped || solved}
      flipDirection="horizontal"
      flipSpeedBackToFront={1}
      flipSpeedFrontToBack={1}
    >
      <ImageBox
        id={id}
        type={"back"}
        disabled={disabled}
        handleClick={handleClick}
      />

      <ImageBox
        id={id}
        type={type}
        disabled={disabled}
        handleClick={handleClick}
      />
    </ReactCardFlip>
  );
};

type CardProps = {
  id: string;
  type: string;
  flipped: boolean;
  solved: boolean;
  disabled: boolean;
  handleClick: (id: string) => void;
  soundEffect?: HTMLAudioElement;
};

export default Card;
