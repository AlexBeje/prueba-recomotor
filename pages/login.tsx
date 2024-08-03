import { User } from "@/types/users.type";
import { Car } from "@/types/cars.type";
import { Button, Select } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";

export default function Login() {
  /** Variables **/
  const router = useRouter();
  const [users] = useLocalStorage<User[]>({
    key: "users",
  });
  const [cars] = useLocalStorage<Car[]>({
    key: "cars",
  });
  const [currentUser, setCurrentUser] = useLocalStorage<string | null>({
    key: "currentUser",
    defaultValue: "",
  });

  /** Methods **/
  const getUsersEmailList = () => {
    return users?.map((user) => {
      return { value: user._id, label: user.email };
    });
  };
  const getCarImage = () => {
    return cars?.[0].model[2].img;
  };
  const handleChangeUser = (email: string | null) => {
    setCurrentUser(email);
  };
  const handleLogin = (email: string) => {
    if (!email) return;
    router.push("/home");
  };

  /** Render **/
  return (
    <div className="relative flex h-screen w-screen">
      <div className="absolute hidden h-full w-1/2 bg-black opacity-50 md:block" />
      <img
        className="hidden object-cover md:block"
        src={getCarImage()}
        alt="Car picture"
        width={"50%"}
      />
      <div className="flex w-full flex-col justify-center gap-6 bg-dark px-10 text-light md:w-1/2 md:px-20">
        <h1 className="text-h1">Welcome!</h1>
        <div className="flex flex-col gap-2">
          <p>
            Please
            <span className="text-p px-1 font-bold text-primary-light">
              identify
            </span>
            yourself to enter the website.
          </p>
          <Select
            placeholder="Select your email"
            data={getUsersEmailList()}
            onChange={(email) => handleChangeUser(email)}
          />
        </div>
        <Button
          variant="filled"
          className="w-20 bg-primary-light text-dark hover:bg-white hover:text-dark"
          onClick={() => currentUser && handleLogin(currentUser)}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
