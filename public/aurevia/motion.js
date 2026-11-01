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

// Keep the photograph in place while the care story advances with the reader.
(() => {
  const story = document.querySelector(".journey-story");
  if (!story) return;
  const image = story.querySelector(".journey-story-image");
  const caption = story.querySelector(".journey-story-caption");
  const place = story.querySelector(".journey-story-place");
  const steps = [...story.querySelectorAll("[data-journey-step]")];
  if (!image || !caption || !place || steps.length < 2) return;

  const activate = (step) => {
    if (step.classList.contains("is-active")) return;
    steps.forEach((item) => item.classList.toggle("is-active", item === step));
    const nextImage = step.dataset.image;
    if (nextImage && image.getAttribute("src") !== nextImage) {
      image.classList.add("is-changing");
      const preload = new Image();
      preload.onload = () => {
        image.src = nextImage;
        image.alt = step.dataset.alt || "Aurevia care journey";
        requestAnimationFrame(() => image.classList.remove("is-changing"));
      };
      preload.onerror = () => image.classList.remove("is-changing");
      preload.src = nextImage;
    }
    caption.textContent = step.dataset.caption || "Care, as it unfolds";
    place.textContent = step.dataset.place || "Here with you";
  };

  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (current) activate(current.target);
  }, { rootMargin: "-38% 0px -38% 0px", threshold: [0.05, 0.25, 0.5, 0.75] });
  steps.forEach((step) => observer.observe(step));
})();
