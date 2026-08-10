"use client";

import { useEffect } from "react";

export default function DevSignature() {
  useEffect(() => {
    console.log(
      "%cCrafted with ❤️ by TtStDeEp",
      "color: #0B485B; font-size: 14px; font-weight: bold; background: #D9F2EF; padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(11, 72, 91, 0.1);"
    );
  }, []);

  return null;
}
