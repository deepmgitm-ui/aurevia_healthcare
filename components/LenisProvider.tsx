// components/LenisProvider.tsx
"use client"; // Ye lagana zaroori hai taaki Next.js ko pata chale ye browser ke liye hai

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    );
}