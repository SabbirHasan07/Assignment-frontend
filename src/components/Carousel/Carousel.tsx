import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselSettings from "@/utilities/CarouselSettings";
import CarouselImage from "@/utilities/CarouselImage";

//Featured Card Carousel
const Carousel = () => {
  return (
    <>
      <h1 className="font-bold text-3xl pt-3 mt-16 pb-6 text-center text-black">
        Featured Cards
        <hr className="w-[150px] border-b-4 border-red-500 mt-3 mx-auto font-bold border-top-3 text-red-500" />
      </h1>
      <div className="w-3/4 m-auto">
        <div className="mt-8">
          <Slider {...CarouselSettings}>
            {CarouselImage.map((data) => (
              <div
                key={data}
                className="sm:h-[180px] md:h-[200px] lg:h-[340px] text-black rounded-xl"
              >
                <div className="xs:h-25 flex justify-center items-center rounded-t-xl m-3">
                  <Image
                    src={data}
                    alt="pokemon-image"
                    width={512}
                    height={512}
                    className="w-full hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Carousel;
