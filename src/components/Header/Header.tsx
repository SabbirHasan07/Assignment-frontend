import { useCartCount } from "@/hooks/useCount";
import useLogin from "@/hooks/useLogin";
import { StampedSet } from "@/types";
import { getItem } from "@/utilities/fakeDB";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

// Header Component
const Header = () => {
  const { login, username, updateLogin, updateUsername } = useLogin();
  const { random } = useCartCount();

  const router = useRouter();

  const defaultState: { count: 0; items: StampedSet[] } = {
    count: 0,
    items: [],
  };
  const [cart, setCartCount] = useState<{ count: number; items: StampedSet[] }>(
    defaultState
  );

  const handleLogin = () => {
    updateLogin("Login");
    updateUsername("");
    router.push("/login");
    toast.success("Logged out successfully !");
  };

  useEffect(() => {
    let cartItem = getItem("cart");
    if (!cartItem) cartItem = defaultState;
    setCartCount(cartItem);
  }, [random]);

  return (
    <>
      {/* Toaster  */}
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <nav className="bg-gray-900 border-gray-200 px-4 lg:px-6 py-2 dark:bg-gray-800 w-100 overflow-hidden">
        <div className="flex flex-wrap justify-between items-center flex-shrink-0">
          {/* cart icon  */}
          <div className="flex">
            <Link
              href="/cart"
              className="flex items-center space-x-3 rtl:space-x-reverse mr-1"
            >
              <svg
                className="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
            </Link>
            <small className="text-white text-center w-4 h-4 rounded bg-red-700 text-xs">
              {cart?.count}
            </small>
          </div>
          {/* logo  */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/pokemon.png"
              alt="pokemon"
              width={150}
              height={100}
              className="mr-3"
            />
          </Link>
          {/* Login/Logout */}
          <div className="flex">
            <span className="mt-2 mr-4 text-rose-700 font-bold">
              {username}
            </span>
            <Button
              className="flex justify-center items-center w-24 h-10 pr-1 text-white bg-blue-400 hover:bg-blue-700"
              onClick={handleLogin}
            >
              {login}
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
