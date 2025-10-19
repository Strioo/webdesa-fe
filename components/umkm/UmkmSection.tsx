"use client";

import UmkmCard from "./UmkmCard";

const data = [
  {
    title: "Kopi Lereng Slamet",
    description:
      "Nikmati kopi lokal hasil panen petani Baturraden. Setiap cangkir menghadirkan kehangatan dari sejuknya lereng gunung.",
    image: "assets/images/umkm-kopi-lereng-slamet.png",
  },
  {
    title: "Herbal Wangi Lestari",
    description:
      "Produk herbal alami dari bahan segar pegunungan untuk kesehatan dan relaksasi alami.",
    image: "assets/images/umkm-herbal-wangi-lestari.png",
  },
  {
    title: "Batik Lestari Baturraden",
    description:
      "Motif batik terinspirasi dari alam — dibuat dengan tangan penuh makna dan budaya lokal.",
    image: "assets/images/umkm-batik-lestari-baturraden.png",
  },
  {
    title: "Pasar Sayur Segar",
    description:
      "Sayuran segar langsung dari ladang petani lokal — sehat, alami, dan penuh kesegaran setiap hari.",
    image: "assets/images/umkm-pasar-sayur-segar.png",
  },
  {
    title: "Kerajinan Sumber Rejeki",
    description:
      "Anyaman bambu dan tas rajut hasil tangan pengrajin lokal — karya penuh makna dari alam Baturraden.",
    image: "assets/images/umkm-kerajinan-sumber-rejeki.png",
  },
  {
    title: "Herbal Wangi Lestari",
    description:
      "Produk herbal alami dari bahan segar pegunungan untuk kesehatan dan relaksasi alami.",
    image: "assets/images/umkm-herbal-wangi-lestari.png",
  },
];

export default function UmkmSection() {
  return (
    <section
      className="w-full py-16 bg-[#F8F8F8]"
    >
      <div className="mx-auto px-[34px] max-w-[1280px] mt-10">
        {/* Grid Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] justify-items-center">
          {data.map((item, index) => (
            <UmkmCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
