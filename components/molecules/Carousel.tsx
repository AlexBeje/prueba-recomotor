import Icon from "../atoms/Icon";
import Loader from "../atoms/Loader";
import { Carousel as MantineCarousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { useCarsHook } from "@/hooks/useCarsHook";
import { useEffect, useState } from "react";

export default function Carousel({
  onFavoriteClick,
  loading,
}: {
  onFavoriteClick?: (brand: string, model: string) => void;
  loading?: {
    brand: string;
    model: string;
  };
}) {
  /** Variables **/
  const [selectedCarModels, setSelectedCarModels] = useState<
    {
      brand: string;
      model: string;
      img: string;
    }[]
  >([]);

  /** Hooks **/
  const { getCars, getAllCars, isCarFavorite } = useCarsHook();

  /** Lifecycle **/
  useEffect(() => {
    const randomCars = getAllCars()
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setSelectedCarModels(randomCars);
  }, [getCars()]);

  /** Methods **/
  const handleFavoriteClick = (brand: string, model: string) => {
    if (onFavoriteClick) {
      return onFavoriteClick(brand, model);
    }
  };
  const getSlides = () => {
    return selectedCarModels.map((carModel) => (
      <MantineCarousel.Slide
        key={`${carModel.brand}-${carModel.model}`}
        className="relative h-[250px] md:h-[500px]"
      >
        <div
          className="absolute right-4 top-4 md:right-8 md:top-8 z-10"
          onClick={() => handleFavoriteClick(carModel.brand, carModel.model)}
        >
          {loading?.brand === carModel.brand &&
          loading?.model === carModel.model ? (
            <Loader favorite={isCarFavorite(carModel.brand, carModel.model)} />
          ) : (
            <Icon
              hover
              rounded
              size={16}
              selected={isCarFavorite(carModel.brand, carModel.model)}
            >
              heart
            </Icon>
          )}
        </div>
        <div className="absolute h-full w-full bg-black opacity-50" />
        <Image
          className="object-cover"
          src={carModel.img}
          alt="Car picture"
          width={"100%"}
          height={"100%"}
        />
        <h1 className="absolute bottom-16 left-8 z-10 text-h2 md:text-h1 font-bold text-light">
          {carModel.brand} {carModel.model}
        </h1>
      </MantineCarousel.Slide>
    ));
  };

  /** Render **/
  return (
    <MantineCarousel
      withIndicators
      draggable={false}
      loop
      className="h-[250px] md:h-[500px]"
    >
      {getSlides()}
    </MantineCarousel>
  );
}
