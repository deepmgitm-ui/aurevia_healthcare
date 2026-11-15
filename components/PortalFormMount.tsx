"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import ContactForm from "@/components/ContactForm";

export default function PortalFormMount() {
  const pathname = usePathname();
  const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Resolve after React commits the page; render-time lookup can find the previous page's node.
    setTargetNode(document.getElementById("react-contact-form-portal"));
  }, [pathname]);

  return targetNode ? createPortal(<ContactForm layout="wide" plain />, targetNode) : null;
}
