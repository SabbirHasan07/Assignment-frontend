import { useEffect, useState } from "react";
import Image from "next/image";
import SliderImage from "@/utilities/SliderImage";

// Slider Component
const Slider = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlide((slide + 1) % SliderImage.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [slide]);

  return (
    <div className="carousel  overflow-hidden">
      <div className="carousel-item relative">
        <Image
          src={SliderImage[slide]}
          alt={`Slide ${slide + 1}`}
          width={1920}
          height={550}
          className="w-screen object-fit-contain"
        />
      </div>
    </div>
  );
};

export default Slider;
