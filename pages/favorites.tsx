import Section from "@/components/atoms/Section";
import Sidebar from "@/components/molecules/Sidebar";
import Card from "@/components/molecules/Card";
import { useCarsHook } from "@/hooks/useCarsHook";
import { useUsersHook } from "@/hooks/useUsersHook";
import { useState } from "react";

export default function Favorites() {
  /** Variables **/
  const [loading, setLoading] = useState<{
    brand: string;
    model: string;
  }>();

  /** Hooks **/
  const { getCurrentUser, removeFavorite } = useUsersHook();
  const { getFavoriteCars, isCarFavorite } = useCarsHook();

  /** Methods **/
  const currentUser = getCurrentUser();

  const handleFavoriteClick = async (brand: string, model: string) => {
    setLoading({
      brand: brand,
      model: model,
    });
    await removeFavorite(brand, model);
    setLoading({
      brand: "",
      model: "",
    });
  };

  /** Render **/
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <div className="overflow-auto">
          <h1 className="p-4 text-h1 font-normal">
            <span className="text-primary-dark font-bold">
              {currentUser?.name}
            </span>
            's favorite cars
          </h1>
          <div className="mb-4 ml-4 flex flex-col gap-4">
            {getFavoriteCars()?.map((car) => {
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
    </div>
  );
}
