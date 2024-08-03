import Image from "next/image";
import Car from "@/assets/icons/car.svg";
import Heart from "@/assets/icons/heart.svg";
import Logo from "@/assets/icons/logo.svg";
import Photo from "@/assets/icons/photo.svg";
import Searcher from "@/assets/icons/searcher.svg";

export default function Icon({
  children,
  filled,
  hover,
  rounded,
  selected,
  text,
  size,
}: {
  children?: string;
  filled?: boolean;
  hover?: boolean;
  rounded?: boolean;
  selected?: boolean;
  text?: string;
  size?: number;
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

  /** Render **/
  return (
    <div
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded ${filled && "bg-light"} ${rounded && "rounded-full bg-light"} ${selected && "bg-primary-light"} ${hover && "hover:border-1 hover:border-solid hover:border-primary-light"}`}
    >
      {text && <p className="select-none">{text}</p>}
      {children && (
        <Image
          priority
          src={getIcon(children)}
          alt={`${children} icon`}
          width={size || 24}
          height={size || 24}
        />
      )}
    </div>
  );
}
