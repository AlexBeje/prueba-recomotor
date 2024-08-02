"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [cars, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://recomotor-back.alexbeje.dev/cars");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {/* <button onClick={updateFavorites}>Update favorites</button> */}
      <ul>
        {cars.map((car, id) => (
          <li key={id}>{car.brand}</li>
        ))}
      </ul>
    </div>
  );
}
