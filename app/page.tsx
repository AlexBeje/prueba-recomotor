"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://recomotor-back.alexbeje.dev/users");
      const data = await response.json();
      console.log("🖐", data);
    };
    fetchData();
  }, []);

  const updateFavorites = async () => {
    const response = await fetch(
      "https://recomotor-back.alexbeje.dev/users/66ac6b5ef4def290859e3042",
      {
        method: "PATCH",
        body: JSON.stringify({
          favorites: [
            {
              id: 1,
              brand: "Seat",
              model: "Leon",
            },
            {
              id: 2,
              brand: "Nissan",
              model: "Juke",
            },
          ],
        }),
      }
    );
    const data = await response.json();
    console.log("🖐", data);
  };

  return (
    <div>
      home
      <button onClick={updateFavorites}>Update favorites</button>
    </div>
  );
}
