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

const cart = document.querySelector("[data-cart]");

if (cart) {
  const formatVnd = (value) => value.toLocaleString("vi-VN");
  const money = (value) => `${formatVnd(value)}<sup>đ</sup>`;

  const cartBody = cart.querySelector("[data-cart-body]");
  const emptyState = cart.querySelector("[data-cart-empty]");
  const subtotalEl = cart.querySelector("[data-subtotal]");
  const totalEl = cart.querySelector("[data-total]");
  const totalRow = totalEl ? totalEl.closest(".cart-summary__row") : null;
  const couponInput = cart.querySelector("[data-coupon-input]");
  const couponApply = cart.querySelector("[data-coupon-apply]");
  const couponNote = cart.querySelector("[data-coupon-note]");
  const headerCounts = document.querySelectorAll(".topbar__cart span");

  let discountRate = 0;
  let discountRow = null;

  const items = () => Array.from(cart.querySelectorAll("[data-cart-item]"));

  const readQty = (input) => {
    const parsed = parseInt(input.value, 10);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  };

  const ensureDiscountRow = () => {
    if (discountRow || !totalRow) {
      return;
    }
    discountRow = document.createElement("div");
    discountRow.className = "cart-summary__row";
    discountRow.innerHTML = "<span>Giảm giá</span><span data-discount>0<sup>đ</sup></span>";
    totalRow.parentNode.insertBefore(discountRow, totalRow);
  };

  const render = () => {
    let subtotal = 0;
    let count = 0;

    items().forEach((item) => {
      const price = parseInt(item.getAttribute("data-price"), 10) || 0;
      const input = item.querySelector("[data-qty-input]");
      const qty = readQty(input);
      input.value = String(qty);

      const line = price * qty;
      subtotal += line;
      count += qty;

      const lineEl = item.querySelector("[data-line-total]");
      if (lineEl) {
        lineEl.innerHTML = money(line);
      }
    });

    const discount = Math.round(subtotal * discountRate);
    const total = subtotal - discount;

    if (subtotalEl) {
      subtotalEl.innerHTML = money(subtotal);
    }
    if (totalEl) {
      totalEl.innerHTML = money(total);
    }

    if (discount > 0) {
      ensureDiscountRow();
      if (discountRow) {
        discountRow.hidden = false;
        const discountEl = discountRow.querySelector("[data-discount]");
        if (discountEl) {
          discountEl.innerHTML = `-${money(discount)}`;
        }
      }
    } else if (discountRow) {
      discountRow.hidden = true;
    }

    headerCounts.forEach((el) => {
      el.textContent = `Giỏ hàng (${count})`;
    });

    if (items().length === 0) {
      if (cartBody) {
        cartBody.hidden = true;
      }
      if (emptyState) {
        emptyState.hidden = false;
      }
    }
  };

  cart.addEventListener("click", (event) => {
    const decrease = event.target.closest("[data-qty-dec]");
    const increase = event.target.closest("[data-qty-inc]");
    const remove = event.target.closest("[data-remove]");

    if (decrease) {
      const input = decrease.parentElement.querySelector("[data-qty-input]");
      input.value = String(Math.max(1, readQty(input) - 1));
      render();
    } else if (increase) {
      const input = increase.parentElement.querySelector("[data-qty-input]");
      input.value = String(readQty(input) + 1);
      render();
    } else if (remove) {
      const item = remove.closest("[data-cart-item]");
      if (item) {
        item.remove();
      }
      render();
    }
  });

  cart.addEventListener("change", (event) => {
    if (event.target.matches("[data-qty-input]")) {
      render();
    }
  });

  if (couponApply && couponInput) {
    couponApply.addEventListener("click", () => {
      const code = (couponInput.value || "").trim().toUpperCase();
      if (!code) {
        return;
      }

      if (code === "LOREM10") {
        discountRate = 0.1;
        if (couponNote) {
          couponNote.hidden = false;
          couponNote.textContent = "Đã áp dụng mã giảm 10%.";
          couponNote.className = "cart-coupon__note cart-coupon__note--ok";
        }
      } else {
        discountRate = 0;
        if (couponNote) {
          couponNote.hidden = false;
          couponNote.textContent = "Mã giảm giá không hợp lệ.";
          couponNote.className = "cart-coupon__note cart-coupon__note--err";
        }
      }

      render();
    });
  }

  render();
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
