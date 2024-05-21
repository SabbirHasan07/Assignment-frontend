import useLogin from "@/hooks/useLogin";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Login from "../../../public/images/login.jpg";

// Login Component
const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();
  const { updateLogin, previousUsername } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username == "codecamp" && password == "123") {
      updateLogin("Log Out");
      previousUsername();

      router.push("/");
      toast.success("Logged in successfully !");
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-80 m-10 lg:mt-36">
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <div className="hidden lg:flex items-center justify-center flex-1 bg-blue-200 text-black">
        <div className="max-w-md text-center">
          <Image src={Login} width={600} height={600} alt="login"/>
        </div>
      </div>

      <div className="w-full bg-black lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-white text-center">
            Sign in
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-orange-200 text-center">
            Join to Our Community with all time access and free{" "}
          </h1>

          <form
            action="#"
            method="POST"
            className="space-y-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>

            <p className="text-white">
              {error && (
                <span className="text-red-600 font-bold">
                  Invalid Username or Password
                </span>
              )}
            </p>

            <div>
              <button
                type="submit"
                className="mt-8 p-2 w-full bg-blue-500 text-white rounded-md hover:bg-gray-800  /"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
