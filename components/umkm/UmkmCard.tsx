"use client";

import { motion } from "framer-motion";

interface UmkmCardProps {
  title: string;
  description: string;
  image: string;
}

export default function UmkmCard({ title, description, image }: UmkmCardProps) {
  return (
    <motion.div
      className="rounded-[16px] border border-[#C0C0C0]/50 bg-transparent flex flex-col items-center justify-between overflow-hidden transition-all duration-300"
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 4px 40px 1px rgba(0, 0, 0, 0.08)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        width: "439.33px",
        height: "451px",
      }}
    >
      <img
        src={image}
        alt={title}
        className="object-cover rounded-t-[16px]"
        style={{
          width: "415.33px",
          height: "219px",
          marginTop: "12px",
        }}
      />

      <div className="flex flex-col justify-between flex-grow text-left w-full px-3 pt-3 pb-4">
        <div>
          <h3 className="font-semibold text-[#000000] text-lg mb-2">{title}</h3>
          <p className="text-[#767676] text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <motion.button
          whileHover={{
            backgroundColor: "#5B903A",
            borderColor: "#CCDCC2",
            color: "#FFFFFF",
            scale: 1.02,
          }}
          transition={{ duration: 0.2 }}
          className="mt-4 w-full border border-[#C0C0C0] text-[#000000] rounded-[12px] bg-white font-medium text-base"
          style={{
            width: "418px",
            height: "50px",
          }}
        >
          Beli Sekarang
        </motion.button>
      </div>
    </motion.div>
  );
}
