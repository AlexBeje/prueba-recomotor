import { useLocalStorage } from "@mantine/hooks";
import { useUsersHook } from "./useUsersHook";
import { Car } from "@/types/cars.type";

export function useCarsHook() {
  /** Variables **/
  const [cars] = useLocalStorage<Car[]>({
    key: "cars",
  });

  /** Hooks **/
  const { getUserFavorites, getCurrentUser } = useUsersHook();

  /** Methods **/
  const getCars = () => {
    return cars;
  };
  const getAllCars = () => {
    const allCars: {
      brand: string;
      model: string;
      img: string;
    }[] = [];
    cars?.forEach((car) =>
      car.model.forEach((model) => {
        allCars.push({
          brand: car.brand,
          model: model.name,
          img: model.img,
        });
      }),
    );
    return allCars;
  };
  const getFavoriteCars = () => {
    const favorites = getCurrentUser()?.favorites;
    const favoriteCars: {
      brand: string;
      model: {
        name: string;
        img: string;
      }[];
    }[] = [];
    cars?.forEach((car) =>
      car.model.forEach((model) => {
        favorites?.forEach((favorite) => {
          if (favorite.brand === car.brand && favorite.model === model.name) {
            if (favoriteCars.some((c) => c.brand === car.brand)) {
              favoriteCars
                .find((c) => c.brand === car.brand)
                ?.model.push({
                  name: model.name,
                  img: model.img,
                });
            } else {
              favoriteCars.push({
                brand: car.brand,
                model: [{ name: model.name, img: model.img }],
              });
            }
          }
        });
      }),
    );
    return favoriteCars;
  };
  const isCarFavorite = (brand: string, model: string) =>
    getUserFavorites()?.some(
      (favorite) => favorite.brand === brand && favorite.model === model,
    );

  /** Return **/
  return { getCars, getAllCars, getFavoriteCars, isCarFavorite };
}
