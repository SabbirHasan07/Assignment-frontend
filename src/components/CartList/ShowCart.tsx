import useCount, { useCartCount } from "@/hooks/useCount";
import { StampedSet } from "@/types";
import { getItem, setItem } from "@/utilities/fakeDB";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ShowCart = ({ item }: { item: StampedSet }) => {
  const defaultState: { count: 0; items: StampedSet[] } = {
    count: 0,
    items: [],
  };
  const [cart, setCartCount] = useState<{ count: number; items: StampedSet[] }>(
    defaultState
  );

  const { removeId, decrement } = useCount();
  const { random, setRandom } = useCartCount();

  useEffect(() => {
    let cartItem = getItem("cart");
    if (!cartItem) cartItem = defaultState;
    setCartCount(cartItem);
  }, [random]);

  const decrementCount = () => {
    const filteredItems = cart?.items?.filter(
      (i) => !(i.set.id === item.set.id && i.timeStamp === item.timeStamp)
    );
    const newCart = { count: cart.count - 1, items: [...filteredItems] };
    setItem("cart", JSON.stringify(newCart));
    setCartCount(newCart);
    setRandom();
  };

  return (
    <>
      <div className="flex flex-col min-h-[300px] bg-gray-300 m-3 rounded ">
        <Image
          src={item?.set?.images?.logo}
          alt={"images"}
          width={100}
          height={100}
          priority={true}
          className="h-36 w-32 my-3 mx-auto"
        />
        <button
          className="block my-5 w-24 p-3 bg-orange-500 text-white font-bold mx-auto rounded"
          type="button"
          onClick={() => {
            decrement();
            removeId(item?.set?.id);
            decrementCount();
            toast.success("Removed item from cart!");
          }}
        >
          Remove
        </button>
      </div>
    </>
  );
};

export default ShowCart;
