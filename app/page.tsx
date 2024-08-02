"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("https://recomotor-back.alexbeje.dev/users");
    const data = await response.json();
    setUsers(data);
  };

  const removeFavorite = async () => {
    const body = {
      favorites: [],
    };
    console.log("🤴", JSON.stringify(body));
    await fetch(
      "https://recomotor-back.alexbeje.dev/users/66ac6b5ef4def290859e3042",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorites: [
            {
              id: 1,
              brand: "Seat",
              model: "Leon",
            },
            {
              id: 2,
              brand: "Mercedes-Ben",
              model: "B Class",
            },
          ],
        }),
      }
    );
    fetchUsers();
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4">Favorites</h1>
      {users.map((user: any, id) => (
        <div key={id}>
          <h1 className="text-3xl">{user.name}</h1>
          <ul className="text-sm list-disc list-inside">
            {user.favorites.map((favorite: any) => (
              <li key={id}>
                {favorite.brand} {favorite.model}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/* <button
        onClick={removeFavorite}
        className="mt-2 p-2 bg-blue-500 text-white"
      >
        Remove favorite
      </button> */}
    </div>
  );
}
