const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const startForm = document.querySelector(".start-form");
const formMessage = document.querySelector(".form-message");

if (menuToggle && siteNav) {
  const mobileMediaQuery = window.matchMedia("(max-width: 860px)");

  const syncNavigationState = () => {
    const isDesktop = !mobileMediaQuery.matches;

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
      if (!mobileMediaQuery.matches) {
        return;
      }

      siteNav.classList.remove("is-open");
      siteNav.hidden = true;
      siteNav.setAttribute("aria-hidden", "true");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  syncNavigationState();
  mobileMediaQuery.addEventListener("change", syncNavigationState);
}

if (startForm && formMessage) {
  startForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(startForm);
    const name = String(formData.get("name") || "").trim();
    const story = String(formData.get("story") || "").trim();
    const greeting = name ? `Thank you, ${name}.` : "Thank you.";
    const summary = story
      ? ` We’re ready to begin shaping your story: “${story}”`
      : " We’re ready to begin shaping your story.";

    formMessage.textContent = `${greeting}${summary}`;
    formMessage.hidden = false;
    formMessage.focus();
  });
}
