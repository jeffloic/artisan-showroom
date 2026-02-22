import Link from "next/link";
import Header from "@/components/Header";

const PRODUCTS = [
    {
        id: "office-chair",
        name: "Ergonomic Office Chair",
        price: 1200,
        tag: "Seating",
        desc: "Premium comfort for long work sessions.",
    },
    {
        id: "velvet-chair",
        name: "Plush Velvet Chair",
        price: 1500,
        tag: "Seating",
        desc: "Luxurious velvet upholstery with gold accents.",
    },
    {
        id: "puffy-chair",
        name: "Plush Puffy Chair",
        price: 950,
        tag: "Seating",
        desc: "Cloud-like comfort in a modern silhouette.",
    },
    {
        id: "tree-bookshelf",
        name: "Illuminated Tree Bookshelf",
        price: 1800,
        tag: "Storage",
        desc: "Organic branching design with integrated LED lighting.",
    },
    {
        id: "wooden-furniture",
        name: "Classic Wooden Furniture",
        price: 2100,
        tag: "Sets",
        desc: "Matching set of handcrafted wooden pieces.",
    },
    {
        id: "handcrafted-bowl",
        name: "Handcrafted Wooden Bowl",
        price: 150,
        tag: "Decor",
        desc: "Artistic centerpiece carved from single-piece oak.",
    },
    {
        id: "skameka",
        name: "Skameka Stool",
        price: 300,
        tag: "Seating",
        desc: "Minimalist geometric stool with a natural finish.",
    },
    {
        id: "medieval-table",
        name: "Medieval Banquet Table",
        price: 3200,
        tag: "Tables",
        desc: "Grand dining table with rustic ironwork.",
    },
    {
        id: "sculpted-boat",
        name: "Miniature Sculpted Boat",
        price: 600,
        tag: "Art",
        desc: "Decorative nautical sculpture for shelves or mantels.",
    },
    {
        id: "wooden-clock",
        name: "Artisan Wooden Clock",
        price: 400,
        tag: "Decor",
        desc: "Silent movement clock with live-edge wood face.",
    },
    {
        id: "rocking-chair",
        name: "Vintage Rocking Chair",
        price: 1100,
        tag: "Seating",
        desc: "Classic comfort with a smooth, rhythmic glide.",
    },
    {
        id: "sofa-chair",
        name: "Cozy Sofa Chair",
        price: 1400,
        tag: "Seating",
        desc: "Compact sofa-style armchair for relaxed lounging.",
    },
    {
        id: "modern-chair",
        name: "Sleek Modern Chair",
        price: 850,
        tag: "Seating",
        desc: "Architectural lines meeting ergonomic support.",
    },
    {
        id: "sleek-armchair",
        name: "Sleek Armchair",
        price: 1300,
        tag: "Seating",
        desc: "Contoured design for the modern living space.",
    },
    {
        id: "rounded-chair",
        name: "Rounded Sofa Chair",
        price: 1600,
        tag: "Seating",
        desc: "Circular profile with soft, wrap-around cushioning.",
    },
    {
        id: "wooden-chair",
        name: "Standard Wooden Chair",
        price: 450,
        tag: "Seating",
        desc: "Timeless wooden chair built for durability.",
    },
];

export default async function CollectionPage({ searchParams }) {
    const params = await searchParams;
    const query = params?.q || "";

    const filtered = query
        ? PRODUCTS.filter(
            (p) =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.tag.toLowerCase().includes(query.toLowerCase()) ||
                p.desc.toLowerCase().includes(query.toLowerCase())
        )
        : PRODUCTS;

    return (
        <main className="bg-zinc-900 text-white min-h-screen">
            {/* Shared header */}
            <Header />

            {/* ── Heading ── */}
            <div className="px-8 pt-24 pb-6 max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-light tracking-tight">
                    The Collection
                </h1>
                {query && (
                    <p className="mt-2 text-sm text-white/40">
                        Search results for{" "}
                        <span className="text-amber-400/80">&ldquo;{query}&rdquo;</span>
                    </p>
                )}
            </div>

            {/* ── Product grid ── */}
            <div className="px-8 pb-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {filtered.length === 0 ? (
                    <p className="col-span-full text-center text-white/30 py-20 text-sm tracking-wide">
                        No products found for &ldquo;{query}&rdquo;
                    </p>
                ) : (
                    filtered.map((product) => (
                        <div
                            key={product.id}
                            className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,.15)]"
                            style={{
                                background: "rgba(255,255,255,.04)",
                                border: "1px solid rgba(255,255,255,.08)",
                            }}
                        >
                            {/* Image placeholder */}
                            <div className="aspect-[4/3] bg-zinc-800 flex items-center justify-center relative overflow-hidden">
                                <span className="text-5xl text-white/10 group-hover:text-white/20 group-hover:scale-110 transition-all duration-500 select-none">
                                    ✦
                                </span>
                                {/* Tag badge */}
                                <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 backdrop-blur-md">
                                    {product.tag}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="p-5 flex flex-col gap-2">
                                <h2 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                                    {product.name}
                                </h2>
                                <p className="text-xs text-white/30 leading-relaxed">
                                    {product.desc}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-lg font-bold tracking-tight">
                                        GHS {product.price.toLocaleString()}
                                    </p>
                                    <Link
                                        href={`/?model=${product.id}`}
                                        className="text-[10px] tracking-[0.15em] uppercase px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5"
                                        style={{
                                            background: "linear-gradient(135deg, #c9a84c 0%, #a07828 100%)",
                                            color: "#000",
                                            boxShadow: "0 2px 10px rgba(201,168,76,.25)",
                                        }}
                                    >
                                        View in 3D
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}
