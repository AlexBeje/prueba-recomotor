"use client";

import { Car } from "@/types/cars.type";
import { User } from "@/types/users.type";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  /** Variables **/
  const router = useRouter();
  const [users, setUsers] = useLocalStorage<User[]>({
    key: "users",
    defaultValue: [],
  });
  const [cars, setCars] = useLocalStorage<Car[]>({
    key: "cars",
    defaultValue: [],
  });

  /** Lifecycles **/
  useEffect(() => {
    fetchUsers();
    fetchCars();
  }, []);
  useEffect(() => {
    if (users.length && cars.length) router.push("/login");
  }, [users, cars]);

  /** Methods **/
  const fetchUsers = async () => {
    const response = await fetch("https://recomotor-back.alexbeje.dev/users");
    const data = await response.json();
    setUsers(data);
  };
  const fetchCars = async () => {
    const response = await fetch("https://recomotor-back.alexbeje.dev/cars");
    const data = await response.json();
    setCars(data);
  };

  /** Render **/
  return <></>;
}
