"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchCars();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("https://recomotor-back.alexbeje.dev/users");
    const data = await response.json();
    console.log("🏃‍♀️", data);
    setUsers(data);
  };

  const fetchCars = async () => {
    const response = await fetch("https://recomotor-back.alexbeje.dev/cars");
    const data = await response.json();
    setCars(data);
  };

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
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
      <ul>
        {cars.map((car) => (
          <li>{car.brand}</li>
        ))}
      </ul>
      <button onClick={updateFavorites}>Update favorites</button>
    </div>
  );
}
