"use client";

import { useEffect } from "react";

export default function DevSignature() {
  useEffect(() => {
    console.log(
      "%cCrafted with ❤️ by TtStDeEp",
      "color: #03045E; font-size: 14px; font-weight: bold; background: #CAF0F8; padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(3, 4, 94, 0.1);"
    );
  }, []);

  return null;
}
