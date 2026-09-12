const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  const syncNavigationState = () => {
    const isDesktop = window.innerWidth > 860;

    if (isDesktop) {
      siteNav.hidden = false;
      siteNav.classList.remove("is-open");
      siteNav.removeAttribute("aria-hidden");
      menuToggle.setAttribute("aria-expanded", "false");
      return;
    }

    const isOpen = siteNav.classList.contains("is-open");
    siteNav.hidden = !isOpen;
    siteNav.setAttribute("aria-hidden", String(!isOpen));
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    siteNav.hidden = !isOpen;
    siteNav.setAttribute("aria-hidden", String(!isOpen));
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      siteNav.hidden = true;
      siteNav.setAttribute("aria-hidden", "true");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  syncNavigationState();
  window.addEventListener("resize", syncNavigationState);
}
