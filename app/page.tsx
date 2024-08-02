"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  // const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://recomotor-back.alexbeje.dev/users",
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
        }
      );
      console.log("👶", response);
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return <div>home</div>;
}
