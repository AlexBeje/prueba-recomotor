import { Car, Model } from "@/types/cars.type";
import { Carousel as MantineCarousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Icon from "../atoms/Icon";

export default function Carousel() {
  /** Variables **/
  const [selectedCarModels, setSelectedCarModels] = useState<
    {
      brandAndModel: string;
      img: string;
    }[]
  >([]);
  const [cars] = useLocalStorage<Car[]>({
    key: "cars",
  });

  /** Lifecycle **/
  useEffect(() => {
    const randomCars = getAllCars()
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setSelectedCarModels(randomCars);
  }, [cars]);

  /** Methods **/
  const getAllCars = () => {
    const allCars: {
      brandAndModel: string;
      img: string;
    }[] = [];
    cars?.forEach((car) =>
      car.model.forEach((model) => {
        allCars.push({
          brandAndModel: `${car.brand} ${model.name}`,
          img: model.img,
        });
      }),
    );
    return allCars;
  };
  const getSlides = selectedCarModels.map((carModel) => (
    <MantineCarousel.Slide
      key={carModel.brandAndModel}
      className="relative h-[250px] md:h-[500px]"
    >
      <div className="absolute right-8 top-8 z-10">
        <Icon hover rounded size={16}>
          heart
        </Icon>
      </div>
      <div className="absolute h-full w-full bg-black opacity-50" />
      <Image
        className="object-cover"
        src={carModel.img}
        alt="Car picture"
        width={"100%"}
        height={"100%"}
      />
      <p className="text-h1 absolute bottom-16 left-8 z-10 font-bold text-light">
        {carModel.brandAndModel}
      </p>
    </MantineCarousel.Slide>
  ));

  /** Render **/
  return (
    <MantineCarousel
      withIndicators
      draggable={false}
      loop
      className="h-[250px] md:h-[500px]"
    >
      {getSlides}
    </MantineCarousel>
  );
}
