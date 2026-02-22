"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SearchBar from "@/components/SearchBar";
import useCartStore from "@/store/cartStore";

const CartDrawer = dynamic(() => import("@/components/CartDrawer"), {
    ssr: false,
});

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleCart = useCartStore((s) => s.toggleCart);
    const cartCount = useCartStore((s) =>
        s.cart.reduce((n, i) => n + i.quantity, 0)
    );

    return (
        <>
            <header className="absolute top-0 left-0 right-0 z-20 bg-zinc-900/80 backdrop-blur-md pointer-events-auto">
                <div className="flex items-center justify-between px-6 py-4">
                    <Link
                        href="/"
                        className="text-lg md:text-xl font-light tracking-[0.25em] uppercase text-white/90 hover:text-white transition-colors"
                    >
                        Artisan Studio
                    </Link>
                    <nav className="flex items-center gap-4 md:gap-6 text-xs tracking-widest uppercase text-white/50">
                        {/* Desktop links */}
                        <Link
                            href="/collection"
                            className="hidden md:inline hover:text-white/90 transition-colors"
                        >
                            Collection
                        </Link>
                        <Link
                            href="/about"
                            className="hidden md:inline hover:text-white/90 transition-colors"
                        >
                            About
                        </Link>

                        {/* Search */}
                        <div className="hidden md:block">
                            <SearchBar />
                        </div>

                        {/* Cart icon */}
                        <button
                            onClick={toggleCart}
                            className="relative cursor-pointer hover:text-white/90 transition-colors"
                            aria-label="Open cart"
                        >
                            🛒
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold leading-none bg-amber-500 text-black px-1">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                            className="md:hidden cursor-pointer hover:text-white/90 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            )}
                        </button>
                    </nav>
                </div>

                {/* Mobile dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-white/10 px-6 py-3 flex flex-col gap-3 text-xs tracking-widest uppercase text-white/60">
                        <Link
                            href="/collection"
                            className="hover:text-white/90 transition-colors"
                        >
                            Collection
                        </Link>
                        <Link
                            href="/about"
                            className="hover:text-white/90 transition-colors"
                        >
                            About
                        </Link>
                        <SearchBar />
                    </div>
                )}
            </header>
            <CartDrawer />
        </>
    );
}
