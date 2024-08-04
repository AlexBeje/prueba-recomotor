import Section from "@/components/atoms/Section";
import Card from "@/components/molecules/Card";
import Carousel from "@/components/molecules/Carousel";
import Sidebar from "@/components/molecules/Sidebar";
import { Car } from "@/types/cars.type";
import { User } from "@/types/users.type";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";

export default function Home() {
  /** Variables **/
  const [loading, setLoading] = useState<{
    brand: string;
    model: string;
  }>();
  const [cars] = useLocalStorage<Car[]>({
    key: "cars",
  });
  const [users, setUsers] = useLocalStorage<User[]>({
    key: "users",
  });
  const [currentUser] = useLocalStorage<string>({
    key: "currentUser",
  });

  /** Methods **/
  const getUserFavorites = () => {
    return users?.find((user) => user._id === currentUser)?.favorites;
  };
  const getIsCarFavorite = (brand: string, model: string) => {
    const currentUserFavorites = users?.find(
      (user) => user._id === currentUser,
    )?.favorites;
    return currentUserFavorites?.find(
      (favorite) => favorite.brand === brand && favorite.model === model,
    )
      ? true
      : false;
  };
  const getCarCards = (car: Car) => {
    const handleFavoriteClick = async (brand: string, model: string) => {
      const favorites = getUserFavorites();
      const carAlreadyFavorited = getIsCarFavorite(brand, model);
      if (carAlreadyFavorited) {
        favorites?.splice(
          favorites.findIndex(
            (favorite) => favorite.brand === brand && favorite.model === model,
          ),
          1,
        );
      } else {
        favorites?.push({ brand, model });
      }
      setLoading({
        brand: brand,
        model: model,
      });
      await fetch(`https://recomotor-back.alexbeje.dev/users/${currentUser}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorites,
        }),
      });
      const response = await fetch("https://recomotor-back.alexbeje.dev/users");
      const data = await response.json();
      setLoading({
        brand: "",
        model: "",
      });
      setUsers(data);
    };
    return (
      <div key={car._id} className="mr-4 flex flex-col gap-4 md:flex-row">
        {car.model.map((model) => (
          <Card
            loading={loading}
            key={model.name}
            image={model.img}
            favorite={getIsCarFavorite(car.brand, model.name)}
            brand={car.brand}
            model={model.name}
            onFavoriteClick={() => handleFavoriteClick(car.brand, model.name)}
          >
            {car.brand + " " + model.name}
          </Card>
        ))}
      </div>
    );
  };

  /** Render **/
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="overflow-y-auto">
        <Carousel />
        <div className="my-4 ml-4 flex flex-col gap-4">
          {cars?.map((car) => {
            return [
              <Section key={car.brand}>{car.brand}</Section>,
              getCarCards(car),
            ];
          })}
        </div>
      </div>
    </div>
  );
}
