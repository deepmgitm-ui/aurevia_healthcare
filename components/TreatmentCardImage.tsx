"use client";

import { useState } from "react";

export default function TreatmentCardImage({ src, fallbackSrc, alt }: { src: string; fallbackSrc: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (imageSrc !== fallbackSrc) setImageSrc(fallbackSrc);
      }}
    />
  );
}
