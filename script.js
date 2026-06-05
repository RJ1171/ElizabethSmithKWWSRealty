const stickyCta = document.querySelector(".sticky-cta");
const closing = document.querySelector(".closing");

if (stickyCta && closing && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      stickyCta.style.opacity = entry.isIntersecting ? "0" : "1";
      stickyCta.style.pointerEvents = entry.isIntersecting ? "none" : "auto";
    },
    { threshold: 0.25 }
  );

  observer.observe(closing);
}
