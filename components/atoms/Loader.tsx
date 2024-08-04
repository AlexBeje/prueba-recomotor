import { Loader as MantineLoader } from "@mantine/core";

export default function Loader({
  favorite,
}: {
  favorite?: boolean;
}) {
  /** Render **/
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full ${
        favorite ? "bg-primary-light" : "bg-light"
      }`}
    >
      <MantineLoader color="#212529" size="xs" />
    </div>
  );
}
