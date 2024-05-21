import { create } from "zustand";

export const useCartCount = create<{ random: number; setRandom: () => void }>(
  (set) => ({
    random: 0,
    setRandom: () =>
      set((state: { random: number }) => ({
        random: Math.ceil(Math.random() * 500),
      })),
  })
);

type Store = {
  count: number;
  cartIds: Array<string>;
  increment: () => void;
  decrement: () => void;
  addId: (id: string) => void;
  removeId: (id: string) => void;
};

// Cart Store
const useCart = create<Store>((set) => ({
  count: 0,
  cartIds: [],
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  addId: (id) => set((state) => ({ cartIds: [...state.cartIds, id] })),
  removeId: (id) =>
    set((state) => {
      state.cartIds.splice(state.cartIds.indexOf(id), 1);
      return {
        cartIds: [...state.cartIds],
      };
    }),
}));

export default useCart;
