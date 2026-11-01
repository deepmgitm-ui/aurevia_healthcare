"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import ContactForm from "@/components/ContactForm";

const subscribeToMount = () => () => {};
const getClientMountedSnapshot = () => true;
const getServerMountedSnapshot = () => false;

export default function PortalFormMount() {
  const mounted = useSyncExternalStore(subscribeToMount, getClientMountedSnapshot, getServerMountedSnapshot);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const targetNode = document.getElementById("react-contact-form-portal");
  if (!targetNode) {
    return null;
  }

  return createPortal(<ContactForm layout="wide" plain />, targetNode);
}
