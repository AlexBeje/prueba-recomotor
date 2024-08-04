import { useLocalStorage } from "@mantine/hooks";

export function useUsersFetchHook() {
  /** Variables **/
  const [currentUser] = useLocalStorage<string>({
    key: "currentUser",
  });

  /** Methods **/
  const getUsers = async () => {
    const response = await fetch("https://recomotor-back.alexbeje.dev/users");
    return await response.json();
  };
  const patchUserFavorites = async (
    favorites: { brand: string; model: string }[],
  ) => {
    const resp = await fetch(
      `https://recomotor-back.alexbeje.dev/users/${currentUser}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorites,
        }),
      },
    );
    return await resp.json();
  };

  /** Return **/
  return { getUsers, patchUserFavorites };
}
