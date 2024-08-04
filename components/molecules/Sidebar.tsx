import { useLocalStorage } from "@mantine/hooks";
import Icon from "../atoms/Icon";
import { User } from "@/types/users.type";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Sidebar() {
  /** Variables **/
  const router = useRouter();
  const [currentUser] = useLocalStorage<string>({
    key: "currentUser",
  });
  const [users] = useLocalStorage<User[]>({
    key: "users",
  });

  /** Methods **/
  const getUserCredentials = () => {
    const currentUserName = users?.find(
      (user) => user._id === currentUser,
    )?.name;
    const currentUserSurname = users?.find(
      (user) => user._id === currentUser,
    )?.surname;
    if (!currentUserName || !currentUserSurname) return;
    return currentUserName.slice(0, 1) + currentUserSurname.slice(0, 1);
  };
  const isCurrentRoute = (route: string) => {
    return router.pathname === route;
  };

  /** Render **/
  return (
    <div className="flex h-full w-12 flex-col justify-between bg-dark p-2 md:w-16 md:p-4">
      <div className="flex flex-col gap-8">
        <Link href="/home">
          <Icon>logo</Icon>
        </Link>
        <div className="flex flex-col gap-4">
          <Link href="/home">
            <Icon hover filled selected={isCurrentRoute("/home")}>
              car
            </Icon>
          </Link>
          <Link href="/favorites">
            <Icon hover filled selected={isCurrentRoute("/favorites")}>
              heart
            </Icon>
          </Link>
        </div>
      </div>
      <Icon rounded text={getUserCredentials()} />
    </div>
  );
}
