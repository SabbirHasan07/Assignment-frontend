import Image from "next/image";
import { SetImage } from "pokemon-tcg-sdk-typescript/dist/sdk";

// Card Image Component
const CardImage = ({ imageUrl }: { imageUrl: SetImage }) => {
  const { logo } = imageUrl;
  return (
    <>
      <div className="h-60 w-auto rounded-t-xl flex justify-center items-center">
        <Image
          src={logo}
          alt={"images"}
          width={300}
          height={50}
          priority={true}
          className="h-44"
        />
      </div>
    </>
  );
};

export default CardImage;
