import { useLocalStorage } from "@mantine/hooks";
import { useUsersHook } from "./useUsersHook";
import { Car } from "@/types/cars.type";

export function useCarsHook() {
  /** Variables **/
  const [cars] = useLocalStorage<Car[]>({
    key: "cars",
  });

  /** Hooks **/
  const { getUserFavorites } = useUsersHook();

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
  const isCarFavorite = (brand: string, model: string) =>
    getUserFavorites?.some(
      (favorite) => favorite.brand === brand && favorite.model === model,
    );

  /** Return **/
  return { getCars, getAllCars, isCarFavorite };
}
