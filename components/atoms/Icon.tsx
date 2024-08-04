import Image from "next/image";
import Car from "@/assets/icons/car.svg";
import Heart from "@/assets/icons/heart.svg";
import Logo from "@/assets/icons/logo.svg";
import Photo from "@/assets/icons/photo.svg";
import Searcher from "@/assets/icons/searcher.svg";
import { Loader } from "@mantine/core";

export default function Icon({
  children,
  filled,
  hover,
  rounded,
  selected,
  text,
  size,
  loading,
  onClick,
}: {
  children?: string;
  filled?: boolean;
  hover?: boolean;
  rounded?: boolean;
  selected?: boolean;
  text?: string;
  size?: number;
  loading?: boolean;
  onClick?: () => void;
}) {
  /** Methods **/
  const getIcon = (icon: string) => {
    switch (icon) {
      case "car":
        return Car;
      case "heart":
        return Heart;
      case "logo":
        return Logo;
      case "photo":
        return Photo;
      case "search":
        return Searcher;
      default:
        return Logo;
    }
  };
  const handleOnClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  /** Render **/
  return (
    <div
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded ${filled && "bg-light"} ${rounded && "rounded-full bg-light"} ${selected && "bg-primary-light"} ${hover && "hover:border-1 hover:border-solid hover:border-primary-light"}`}
    >
      {text && <p className="select-none">{text}</p>}
      {loading ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-light">
          <Loader color="#212529" size="xs" />
        </div>
      ) : (
        children && (
          <Image
            priority
            src={getIcon(children)}
            alt={`${children} icon`}
            width={size || 24}
            height={size || 24}
            onClick={() => handleOnClick()}
          />
        )
      )}
    </div>
  );
}
