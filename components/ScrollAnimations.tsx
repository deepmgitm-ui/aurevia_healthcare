"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // 👈 Ye jadoo page changes ko track karega
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollAnimations() {
    const pathname = usePathname(); // URL track karte hain

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Pehle purane animations ko khatam karo taaki conflict na ho
        ScrollTrigger.getAll().forEach((t) => t.kill());

        // Thoda delay dete hain taaki Next.js naya DOM properly load kar le
        const timer = setTimeout(() => {

            // 1. Text Reveal Animations (.js-reveal)
            const revealElements = document.querySelectorAll(".js-reveal");
            revealElements.forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 85%" },
                    }
                );
            });

            // 2. Headings Split Animations (.js-split)
            const splitElements = document.querySelectorAll(".js-split");
            splitElements.forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 80%" },
                    }
                );
            });

            // 3. Treatments List ki special staggered animation
            const treatRows = document.querySelectorAll(".treat-row");
            if (treatRows.length > 0) {
                gsap.fromTo(treatRows,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.06,
                        ease: "power3.out",
                        scrollTrigger: { trigger: treatRows[0].parentElement, start: "top 80%" },
                    }
                );
            }

        }, 100); // 100ms का buffer Next.js DOM loading के लिए

        // Clean up
        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [pathname]); // 👈 Ye pathname dependancy sabse crucial fix hai Next.js ke liye

    return null;
}