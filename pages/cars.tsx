import { getUsers } from "@/app/actions";
import { useEffect } from "react";

export default function Cars() {
  useEffect(() => {
    getUsers();
  }, []);
  return "test";
}
