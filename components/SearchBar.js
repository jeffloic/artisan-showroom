"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push("/collection?q=" + encodeURIComponent(trimmed));
        setQuery("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex items-center rounded-full overflow-hidden transition-all duration-200"
            style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.1)",
            }}
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-28 sm:w-36 md:w-44 bg-transparent text-xs text-white/80 placeholder:text-white/30 px-4 py-2 outline-none tracking-wide"
            />
            <button
                type="submit"
                className="pr-3 pl-1 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
                aria-label="Search"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </button>
        </form>
    );
}
