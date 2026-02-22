"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import useCartStore from "@/store/cartStore";

const ShowroomCanvas = dynamic(() => import("@/components/ShowroomCanvas"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#555",
        fontFamily: "sans-serif",
        fontSize: "1rem",
        letterSpacing: "0.05em",
      }}
    >
      Loading showroom…
    </div>
  ),
});

const SWATCHES = [
  { name: "Walnut", color: "#8B4513" },
  { name: "Ebony", color: "#1C1C1C" },
  { name: "Birch", color: "#F5F0E8" },
];

function ShowroomContent() {
  const [productColor, setProductColor] = useState("#8B4513");
  const [activeIdx, setActiveIdx] = useState(0);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleCart = useCartStore((s) => s.toggleCart);

  const searchParams = useSearchParams();
  const modelId = searchParams.get("model") || "puffy-chair";

  const handleSwatch = (color, idx) => {
    setProductColor(color);
    setActiveIdx(idx);
  };

  const handleAddToCart = () => {
    addToCart({
      id: modelId,
      name: `Custom ${modelId.replace(/-/g, " ")}`,
      material: SWATCHES[activeIdx].name,
      color: productColor,
      price: 850,
    });
    toggleCart();
  };

  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden bg-zinc-900">
      {/* ── 3D Canvas (background layer) ── */}
      <div className="absolute top-0 left-0 w-screen h-[100dvh] z-0 bg-zinc-900">
        <ShowroomCanvas productColor={productColor} modelId={modelId} />
      </div>

      {/* ── UI Overlay (pointer-events-none so clicks pass to OrbitControls) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* ── Shared Header ── */}
        <Header />

        {/* ── Floating product panel ── */}
        <div className="absolute bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-12 md:top-1/2 md:-translate-y-1/2 w-full md:w-auto z-10 pointer-events-auto">
          <div className="w-full md:w-96 bg-zinc-800/90 text-white rounded-t-3xl md:rounded-3xl p-6 backdrop-blur-md shadow-2xl border-t border-white/10 md:border md:border-white/8 flex flex-col gap-4 transition-all duration-300">

            {/* ── Always visible: title + price ── */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">Handcrafted</p>
                <h2 className="text-lg font-semibold text-white/90 leading-tight">
                  Custom Minimalist Chair
                </h2>
              </div>
              <p className="text-2xl font-bold text-white tracking-tight ml-4 shrink-0">
                GHS 850
              </p>
            </div>

            {/* ── Mobile toggle button ── */}
            <button
              onClick={() => setIsCardExpanded((v) => !v)}
              className="md:hidden flex items-center justify-center gap-2 text-[11px] tracking-widest uppercase text-amber-400/80 hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              {isCardExpanded ? (
                <>
                  Minimize
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </>
              ) : (
                <>
                  Customize
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                </>
              )}
            </button>

            {/* ── Expandable content (always visible on desktop) ── */}
            <div
              className={`flex flex-col gap-5 overflow-hidden transition-all duration-300 ease-in-out md:!max-h-[500px] md:!opacity-100 ${isCardExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              {/* Material Options */}
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">
                  Material Options
                </p>
                <div className="flex items-center gap-3">
                  {SWATCHES.map((s, i) => (
                    <button
                      key={s.name}
                      onClick={() => handleSwatch(s.color, i)}
                      title={s.name}
                      className="group relative w-9 h-9 rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none"
                      style={{
                        background: s.color,
                        boxShadow:
                          activeIdx === i
                            ? `0 0 0 2px #000, 0 0 0 4px rgba(255,255,255,.7)`
                            : "0 2px 6px rgba(0,0,0,.4)",
                      }}
                      aria-label={`Select ${s.name} material`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-white/50">
                  {SWATCHES[activeIdx].name}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10" />

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3 rounded-xl text-sm font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #c9a84c 0%, #a07828 100%)",
                  color: "#000",
                  boxShadow: "0 4px 14px rgba(201,168,76,.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(201,168,76,.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(201,168,76,.35)";
                }}
              >
                Add to Cart
              </button>
            </div>

          </div>
        </div>

        {/* ── Bottom hint (hidden on mobile where panel sits at bottom) ── */}
        <p className="hidden md:block absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-widest uppercase text-white/25">
          Drag to rotate
        </p>

      </div>{/* end UI overlay */}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
          Loading Showroom...
        </div>
      }
    >
      <ShowroomContent />
    </Suspense>
  );
}
