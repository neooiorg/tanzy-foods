const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("#primary-navigation");

if (header && menuToggle && navigation) {
  const closeMenu = () => {
    header.classList.remove("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    header.classList.add("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.contains("is-menu-open");
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 940) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 940) {
      closeMenu();
    }
  });
}

const gallery = document.querySelector("[data-gallery]");

if (gallery) {
  const mainImage = gallery.querySelector("[data-gallery-main]");
  const thumbs = gallery.querySelectorAll("[data-gallery-thumb]");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const src = thumb.getAttribute("data-gallery-thumb");
      if (!src || !mainImage) {
        return;
      }

      mainImage.src = src;
      thumbs.forEach((item) => item.classList.remove("is-active"));
      thumb.classList.add("is-active");
    });
  });
}

const quantity = document.querySelector("[data-quantity]");

if (quantity) {
  const input = quantity.querySelector("[data-quantity-input]");
  const decrease = quantity.querySelector("[data-quantity-dec]");
  const increase = quantity.querySelector("[data-quantity-inc]");

  const readValue = () => {
    const parsed = parseInt(input.value, 10);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  };

  const setValue = (value) => {
    input.value = String(Math.max(1, value));
  };

  if (input && decrease && increase) {
    decrease.addEventListener("click", () => setValue(readValue() - 1));
    increase.addEventListener("click", () => setValue(readValue() + 1));
    input.addEventListener("change", () => setValue(readValue()));
  }
}

const tabsBar = document.querySelector("[data-tabs]");

if (tabsBar) {
  const tabs = tabsBar.querySelectorAll("[data-tab]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("is-active"));
      tab.classList.add("is-active");
    });
  });

  const sections = Array.from(tabs)
    .map((tab) => {
      const id = (tab.getAttribute("href") || "").replace("#", "");
      const section = id ? document.getElementById(id) : null;
      return section ? { tab, section } : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const match = sections.find((item) => item.section === entry.target);
          if (!match) {
            return;
          }

          tabs.forEach((item) => item.classList.remove("is-active"));
          match.tab.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((item) => observer.observe(item.section));
  }
}

if (window.jQuery && jQuery.fn.owlCarousel) {
  jQuery(".reviews__carousel").owlCarousel({
    dots: true,
    dotsEach: true,
    items: 1,
    loop: true,
    margin: 16,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      760: {
        items: 2,
        margin: 18,
      },
      980: {
        items: 3,
        margin: 20,
      },
    },
  });
}
