"use client";

import useCartStore from "../store/cartStore";
import { usePaystackPayment } from "react-paystack";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CartDrawer() {
    const cart = useCartStore((s) => s.cart);
    const isCartOpen = useCartStore((s) => s.isCartOpen);
    const toggleCart = useCartStore((s) => s.toggleCart);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const clearCart = useCartStore((s) => s.clearCart);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

    // Paystack config
    const config = {
        reference: new Date().getTime().toString(),
        email: "test@artisan.com",
        amount: total * 100, // Pesewas
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
        currency: "GHS",
    };

    const initializePayment = usePaystackPayment(config);

    const onSuccess = async () => {
        try {
            await addDoc(collection(db, "orders"), {
                items: cart,
                totalPaid: total,
                currency: "GHS",
                status: "PAID",
                createdAt: serverTimestamp(),
            });
            clearCart();
            toggleCart();
            alert("Payment Successful! Thank you for your order.");
        } catch (err) {
            console.error("Failed to save order:", err);
            // Still clear cart so user isn't stuck
            clearCart();
            toggleCart();
            alert("Payment received, but order logging failed. Contact support.");
        }
    };

    const onClose = () => {
        console.log("Payment window closed");
    };

    return (
        <>
            {/* Backdrop */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
                    onClick={toggleCart}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-zinc-900 text-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <h2 className="text-sm font-semibold tracking-widest uppercase">
                        Your Cart
                        {cart.length > 0 && (
                            <span className="ml-2 text-xs text-white/40">({cart.length})</span>
                        )}
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="text-xs tracking-wider uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                        Close ✕
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    {cart.length === 0 ? (
                        <p className="text-sm text-white/30 text-center mt-10">
                            Your cart is empty
                        </p>
                    ) : (
                        cart.map((item, index) => (
                            <div
                                key={`${item.id}-${item.material}`}
                                className="flex items-start justify-between gap-3 rounded-xl p-3"
                                style={{
                                    background: "rgba(255,255,255,.04)",
                                    border: "1px solid rgba(255,255,255,.06)",
                                }}
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white/90 truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-[11px] text-white/40 mt-0.5">
                                        {item.material} · Qty {item.quantity}
                                    </p>
                                    <p className="text-sm font-semibold text-white/80 mt-1">
                                        GHS {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="text-[10px] uppercase tracking-wider text-red-400/70 hover:text-red-400 transition-colors mt-0.5 cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 px-5 py-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs tracking-widest uppercase text-white/40">
                            Total
                        </span>
                        <span className="text-lg font-bold tracking-tight">
                            GHS {total.toLocaleString()}
                        </span>
                    </div>
                    <button
                        onClick={() => {
                            if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
                                alert("Paystack Public Key is missing in this environment!");
                                return;
                            }
                            initializePayment({ onSuccess, onClose });
                        }}
                        disabled={cart.length === 0}
                        className="w-full py-3 rounded-xl text-sm font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{
                            background: "linear-gradient(135deg, #c9a84c 0%, #a07828 100%)",
                            color: "#000",
                            boxShadow: "0 4px 14px rgba(201,168,76,.35)",
                        }}
                        onMouseEnter={(e) => {
                            if (cart.length === 0) return;
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(201,168,76,.5)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 14px rgba(201,168,76,.35)";
                        }}
                    >
                        Pay with Paystack
                    </button>
                </div>
            </div>
        </>
    );
}
