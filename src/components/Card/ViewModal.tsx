import useCount, { useCartCount } from "@/hooks/useCount";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import CardImage from "./CardImage";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { getItem, setItem } from "@/utilities/fakeDB";
import { StampedSet } from "@/types";
import toast, { Toaster } from "react-hot-toast";

// Quick View Modal
const ViewModal = ({ info }: { info: PokemonTCG.Set }) => {
  const defaultState: { count: 0; items: StampedSet[] } = {
    count: 0,
    items: [],
  };

  const [openModal, setOpenModal] = useState(false);
  const [cart, setCartCount] = useState<{ count: number; items: StampedSet[] }>(
    defaultState
  );

  const { id, images } = info;
  const { addId } = useCount();
  const { random, setRandom } = useCartCount();

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    let cartItem = getItem("cart");
    if (!cartItem) cartItem = defaultState;
    setCartCount(cartItem);
  }, [random]);

  const updateCount = () => {
    const newCart = {
      count: cart.count + 1,
      items: [...cart.items, { set: info, timeStamp: Date.now() }],
    };
    setItem("cart", JSON.stringify(newCart));
    setCartCount(newCart);
    setRandom();
    toast.success("Added item to cart");
  };

  return (
    <>
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>

      <button
        onClick={handleModal}
        className="mt-5 btn text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 block mx-auto"
      >
        Quick view
      </button>

      <Transition show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-5"
          onClose={setOpenModal}
          open={openModal}
        >
          <TransitionChild
            as={Fragment}
            enter="duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700/50 backdrop-blur-md transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="duration-300"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-center">
                      <div className="mt-3 sm:mt-0 text-left">
                        <div className="mt-2">
                          <div className="h-[170px] p-16 ml-4 mb-5 mx-auto flex justify-center items-center rounded-md">
                            <CardImage imageUrl={images} />
                          </div>

                          <div className="ml-4">
                            <h2 className="text-xl mt-2">
                              <span className="text-black font-bold">
                                Name:
                              </span>{" "}
                              {info?.name}
                            </h2>

                            <p>
                              <span className="text-black font-bold">
                                Series:
                              </span>{" "}
                              {info?.series}
                            </p>

                            <p>
                              <span className="text-black font-bold">
                                Total Count:
                              </span>{" "}
                              {info?.printedTotal}
                            </p>
                            <p>
                              <span className="text-black font-bold">
                                Release Date:{" "}
                                {info?.releaseDate
                                  ?.toString()
                                  .split("/")
                                  .reverse()
                                  .join("/")}
                              </span>
                            </p>
                            {/* <h3>Updated At: {info?.updatedAt}</h3> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 py-3 pb-10">
                    <div className="m-auto">
                      <div className="px-10 grid grid-cols-2">
                        <div className="flex justify-start">
                          <button
                            className="text-white form-button clear w-28 bg-teal-500 rounded hover:bg-green-600"
                            type="button"
                            onClick={() => {
                              updateCount();
                              addId(id);
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="text-white form-button clear w-28 bg-red-500 rounded hover:bg-orange-700 py-2"
                            onClick={() => setOpenModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ViewModal;
