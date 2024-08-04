import Section from "@/components/atoms/Section";
import Card from "@/components/molecules/Card";
import Carousel from "@/components/molecules/Carousel";
import Sidebar from "@/components/molecules/Sidebar";
import { Car } from "@/types/cars.type";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { useCarsHook } from "@/hooks/useCarsHook";
import { useUsersHook } from "@/hooks/useUsersHook";

export default function Home() {
  /** Variables **/
  const [loading, setLoading] = useState<{
    brand: string;
    model: string;
  }>();

  /** Hooks **/
  const { getCars, isCarFavorite } = useCarsHook();
  const { addFavorite, removeFavorite } = useUsersHook();

  /** Methods **/
  const handleFavoriteClick = async (brand: string, model: string) => {
    const carIsFavorite = isCarFavorite(brand, model);
    setLoading({
      brand: brand,
      model: model,
    });
    if (!carIsFavorite) {
      await addFavorite(brand, model);
    } else {
      await removeFavorite(brand, model);
    }
    setLoading({
      brand: "",
      model: "",
    });
  };

  /** Render **/
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="overflow-y-auto">
        <Carousel
          onFavoriteClick={(brand, model) => handleFavoriteClick(brand, model)}
          loading={loading}
        />
        <div className="my-4 ml-4 flex flex-col gap-4">
          {getCars()?.map((car) => {
            return (
              <div key={car.brand} className="flex flex-col gap-4">
                <Section>{car.brand}</Section>
                <div className="mr-4 flex flex-col gap-4 md:flex-row">
                  {car.model.map((model) => (
                    <Card
                      loading={loading}
                      key={model.name}
                      image={model.img}
                      favorite={isCarFavorite(car.brand, model.name)}
                      brand={car.brand}
                      model={model.name}
                      onFavoriteClick={(brand, model) =>
                        handleFavoriteClick(brand, model)
                      }
                    >
                      {car.brand + " " + model.name}
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
