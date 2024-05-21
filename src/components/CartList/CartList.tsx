import useCount, { useCartCount } from "@/hooks/useCount";
import { useSets } from "@/hooks/react-query-hooks";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useEffect, useState } from "react";
import { getItem } from "@/utilities/fakeDB";
import { StampedSet } from "@/types";
import { Toaster } from "react-hot-toast";
import ShowCart from "./ShowCart";

const CartList = () => {
  const { cartIds } = useCount();
  const { random } = useCartCount();
  const cardSets = useSets();
  const sets = cardSets.data;
  const defaultState: { count: 0; items: StampedSet[] } = {
    count: 0,
    items: [],
  };
  const [cart, setCartCount] = useState<{ count: number; items: StampedSet[] }>(
    defaultState
  );

  let findData: Set[] = [];

  cartIds.forEach((id) => {
    const result = sets?.filter((set) => set.id === id);
    findData.push(...(result as Set[]));
  });

  useEffect(() => {
    let cartItem = getItem("cart");
    if (!cartItem) cartItem = defaultState;
    setCartCount(cartItem);
  }, [random]);

  return (
    <div className="min-h-[560px]">
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      {cart?.count === 0 ? (
        <div className="flex w-full h-screen justify-center items-center">
          <h1 className="w-50 text-gray-500 font-bold text-4xl">
            There is no item in the cart
          </h1>
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-3xl pt-3 mt-4 pb-5 text-center text-black">
            Cart Items
            <hr className="w-[200px] border-b-4 border-red-500 mt-3 mx-auto font-bold border-top-3 text-red-500" />
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 px-20">
            {cart.items?.map((x, index) => (
              <ShowCart item={x} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
