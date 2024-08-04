import { Favorite, User } from "@/types/users.type";
import { useLocalStorage } from "@mantine/hooks";
import { useUsersFetchHook } from "@/hooks/useUsersFetchHook";

export function useUsersHook() {
  /** Variables **/
  const [users, setUsers] = useLocalStorage<User[]>({
    key: "users",
  });
  const [currentUser] = useLocalStorage<string>({
    key: "currentUser",
  });

  /** Hooks **/
  const { patchUserFavorites } = useUsersFetchHook();

  /** Methods **/
  const setUser = (user: User) => {
    setUsers(users?.map((u) => (u._id === user._id ? user : u)));
  };
  const getUserFavorites = users?.find(
    (user) => user._id === currentUser,
  )?.favorites;
  const addFavorite = async (brand: string, model: string) => {
    const favorites: Favorite[] | undefined = JSON.parse(
      JSON.stringify(getUserFavorites),
    );
    const payload = [
      ...(favorites || []),
      {
        brand,
        model,
      },
    ];
    const resp = await patchUserFavorites(payload);
    setUser(resp);
  };
  const removeFavorite = async (brand: string, model: string) => {
    const favorites: Favorite[] | undefined = JSON.parse(
      JSON.stringify(getUserFavorites),
    );
    const payload = favorites?.filter(
      (favorite) => favorite.brand !== brand || favorite.model !== model,
    ) || [];
    const resp = await patchUserFavorites(payload);
    setUser(resp);
  };

  /** Return **/
  return { getUserFavorites, addFavorite, removeFavorite };
}
