import { create } from "zustand";

const useCartStore = create((set) => ({
    /* ── State ── */
    cart: [],
    isCartOpen: false,

    /* ── Actions ── */
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

    addToCart: (item) =>
        set((state) => {
            const existingIdx = state.cart.findIndex(
                (i) => i.id === item.id && i.material === item.material
            );

            if (existingIdx !== -1) {
                // Item with same id + material exists — bump quantity
                const updated = [...state.cart];
                updated[existingIdx] = {
                    ...updated[existingIdx],
                    quantity: updated[existingIdx].quantity + 1,
                };
                return { cart: updated };
            }

            // New item
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

    removeFromCart: (id) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
        })),

    clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
