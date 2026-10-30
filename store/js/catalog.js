(function () {
  const modal = document.getElementById("modal");
  const mImg = document.getElementById("m-img");
  const mSku = document.getElementById("m-sku");
  const mTitle = document.getElementById("m-title");
  const mPrice = document.getElementById("m-price");
  const mBlurb = document.getElementById("m-blurb");
  const mSizes = document.getElementById("m-sizes");
  const mOrder = document.getElementById("m-order");
  const mTodo = document.getElementById("m-todo");
  const mClose = document.getElementById("m-close");
  const SHOP = "https://dj-dogcon-shop.fourthwall.com/";

  function cardOrderHref(card) {
    const btn = card && card.querySelector(".order-btn");
    if (btn && btn.getAttribute("href") && btn.getAttribute("href") !== "#") {
      return btn.getAttribute("href");
    }
    return SHOP;
  }

  function openCard(card) {
    if (!card || !card.dataset.title) return;
    mImg.src = card.dataset.img || "";
    mImg.alt = card.dataset.title;
    mSku.textContent = "No. " + (card.dataset.sku || "");
    mTitle.textContent = card.dataset.title;
    mPrice.textContent = "$" + Number(card.dataset.price).toFixed(2);
    mBlurb.textContent = card.dataset.blurb || "";
    mSizes.innerHTML = "";
    const sizes = (card.dataset.sizes || "One Size").split(",");
    sizes.forEach(function (s, i) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = s.trim();
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", function () {
        mSizes.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
      });
      mSizes.appendChild(b);
    });
    const href = cardOrderHref(card);
    mOrder.href = href;
    mOrder.target = "_blank";
    mOrder.rel = "noopener";
    if (mTodo) {
      mTodo.hidden = true;
      mTodo.textContent = "";
    }
    modal.hidden = false;
    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.hidden = true;
  }

  document.querySelectorAll(".card[data-sku]").forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (e.target.closest(".order-btn")) return;
      openCard(card);
    });
  });

  // Order buttons: allow normal navigation (no preventDefault)
  document.querySelectorAll(".order-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      // if somehow still #, send to shop
      if (!btn.getAttribute("href") || btn.getAttribute("href") === "#") {
        e.preventDefault();
        window.open(SHOP, "_blank", "noopener");
      }
    });
  });

  // Modal Add to Order follows href (no alert)
  mOrder.addEventListener("click", function (e) {
    if (!mOrder.getAttribute("href") || mOrder.getAttribute("href") === "#") {
      e.preventDefault();
      window.open(SHOP, "_blank", "noopener");
    }
  });

  mClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
})();
