"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function AboutPage() {
    return (
        <main className="bg-zinc-900 text-white min-h-screen">
            {/* Shared header */}
            <Header />

            {/* Content */}
            <div className="pt-24 px-8 md:px-24 pb-16 max-w-4xl mx-auto">
                {/* Hero heading */}
                <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
                    Crafted in Accra.
                    <br />
                    <span className="text-amber-400/80">Built for the World.</span>
                </h1>

                <div className="mt-12 space-y-6 text-white/60 text-base md:text-lg leading-relaxed">
                    <p>
                        Artisan Studio was born from a simple idea: that
                        beautifully crafted furniture shouldn&apos;t be confined to exclusive
                        showrooms. Founded in the heart of Accra, we partner with master
                        woodworkers and designers who have perfected their craft over
                        generations, blending West African woodworking traditions with
                        contemporary minimalist aesthetics.
                    </p>

                    <p>
                        Every piece in our collection is made from responsibly sourced
                        hardwoods — hand-selected Walnut, Ebony, and Birch — shaped with
                        precision and finished with care. No shortcuts, no particle board,
                        no compromise. Each chair, table, and lamp is an individual work,
                        carrying the subtle marks of the artisan who made it.
                    </p>

                    <p>
                        We believe the future of shopping is immersive. That&apos;s why our
                        showroom lives in 3D. Rotate a chair, change the wood finish in
                        real time, and see exactly how it will look before it arrives at
                        your door. It&apos;s not e&#8209;commerce — it&apos;s an
                        experience.
                    </p>

                    <p>
                        From our workshop in Accra to wherever you call home, Artisan
                        Studio is building a bridge between heritage craftsmanship and
                        modern living. We don&apos;t just sell furniture —&nbsp;we tell a
                        story with every piece.
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 my-12" />

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link
                        href="/collection"
                        className="inline-block px-8 py-3 rounded-xl text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                            background: "linear-gradient(135deg, #c9a84c 0%, #a07828 100%)",
                            color: "#000",
                            boxShadow: "0 4px 14px rgba(201,168,76,.35)",
                        }}
                    >
                        Explore the Collection
                    </Link>
                    <Link
                        href="/"
                        className="text-xs tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors"
                    >
                        ← Back to Showroom
                    </Link>
                </div>
            </div>
        </main>
    );
}
