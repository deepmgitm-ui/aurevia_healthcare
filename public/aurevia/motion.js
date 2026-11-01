/* Small, optional motion accents for the static content pages. */
const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.refreshAureviaAnimations = function () {
  const gsap = window.gsap;
  const trigger = window.ScrollTrigger;

  if (motionReduced || !gsap || !trigger) {
    document.querySelectorAll(".js-reveal").forEach((node) => {
      node.style.opacity = "1";
      node.style.transform = "none";
    });
    document.querySelectorAll(".hero-headline .line span").forEach((node) => {
      node.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(trigger);
  trigger.getAll().forEach((item) => item.kill());

  // Use one restrained reveal for meaningful content; no per-word theatrics.
  gsap.utils.toArray(".js-reveal").forEach((node) => {
    gsap.fromTo(node, { opacity: 0, y: 10 }, {
      opacity: 1,
      y: 0,
      duration: 0.48,
      ease: "power2.out",
      clearProps: "transform",
      scrollTrigger: { trigger: node, start: "top 91%", once: true },
    });
  });

  // A short, single entrance on the home headline and supporting actions.
  const hero = document.querySelector(".aurevia-page-index .hero");
  if (hero) {
    const headline = hero.querySelector(".hero-headline");
    const visual = hero.querySelector(".hero-city-collage");
    if (headline) gsap.fromTo(headline, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.62, ease: "power2.out" });
    if (visual) gsap.fromTo(visual, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.72, delay: 0.1, ease: "power2.out" });
  }

  // Keep the existing count-up cues, with no continuous animation afterwards.
  document.querySelectorAll("[data-count]").forEach((node) => {
    const value = Number.parseInt(node.dataset.count || "0", 10);
    const number = node.querySelector(".n");
    if (!number || !value) return;
    number.textContent = "0";
    trigger.create({
      trigger: node,
      start: "top 90%",
      once: true,
      onEnter() {
        const count = { value: 0 };
        gsap.to(count, {
          value,
          duration: 0.75,
          ease: "power1.out",
          onUpdate: () => { number.textContent = String(Math.round(count.value)); },
        });
      },
    });
  });

  window.setTimeout(() => trigger.refresh(), 120);
};

window.refreshAureviaAnimations();
