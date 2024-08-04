import Icon from "../atoms/Icon";
import Loader from "../atoms/Loader";
import { Image } from "@mantine/core";

export default function Card({
  children,
  image,
  favorite,
  brand,
  model,
  loading,
  onFavoriteClick,
}: {
  children: string;
  image: string;
  favorite?: boolean;
  brand: string;
  model: string;
  loading?: {
    brand: string;
    model: string;
  };
  onFavoriteClick?: (brand: string, model: string) => void;
}) {
  /** Methods **/
  const handleFavoriteClick = (brand: string, model: string) => {
    if (onFavoriteClick) {
      return onFavoriteClick(brand, model);
    }
  };

  /** Render **/
  return (
    <div className="relative flex w-full flex-col">
      <div
        className="absolute right-4 top-4"
        onClick={() => handleFavoriteClick(brand, model)}
      >
        {loading?.brand === brand && loading?.model === model ? (
          <Loader favorite={favorite} />
        ) : (
          <Icon hover rounded size={16} selected={favorite}>
            heart
          </Icon>
        )}
      </div>
      <Image
        className="min-h-60 flex-1 rounded-t-lg object-cover"
        src={image}
        alt={`${image} picture`}
        width={"100%"}
        height={"100%"}
      />
      <div className="rounded-b-lg bg-dark text-light">
        <h2 className="text-h2 p-4 font-bold">{children}</h2>
      </div>
    </div>
  );
}
