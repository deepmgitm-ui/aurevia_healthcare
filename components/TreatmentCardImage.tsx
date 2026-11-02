"use client";

import { useState } from "react";
import Image from "next/image";

export default function TreatmentCardImage({ src, fallbackSrc, alt }: { src: string; fallbackSrc: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="(max-width: 700px) 30vw, (max-width: 1100px) 50vw, 33vw"
      loading="lazy"
      onError={() => {
        if (imageSrc !== fallbackSrc) setImageSrc(fallbackSrc);
      }}
    />
  );
}
