/* Renders the site from window.SITE_DATA and wires up interactions.
   Content lives in js/data.js — this file rarely needs editing. */
(function () {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) return;

  /* ---------- helpers ---------- */

  function el(tag, className, attrs) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (attrs) for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    return node;
  }

  function tileInner(item) {
    const frag = document.createDocumentFragment();
    if (item.confidential) {
      // confidential tiles show only the brand color and a label
      const veil = el("span", "tile-veil");
      const label = el("span", "tile-veil-label");
      label.textContent = "Confidential";
      veil.append(label);
      frag.append(veil);
      return frag;
    }
    const logo = el("img", "tile-logo", {
      src: item.logo,
      alt: "",
      loading: "lazy",
      decoding: "async",
    });
    const text = el("span", "tile-text");
    const name = el("span", "tile-name");
    name.textContent = item.company || item.name;
    const role = el("span", "tile-role");
    role.textContent = item.role || item.tagline || "";
    text.append(name, role);
    frag.append(logo, text);
    return frag;
  }

  function applyTheme(node, theme) {
    node.style.setProperty("--tile-bg", theme.bg);
    node.classList.add(theme.ink === "light" ? "tile-ink-light" : "tile-ink-dark");
  }

  /* ---------- experience tiles ---------- */

  const dialog = document.getElementById("experience-dialog");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogBody = document.getElementById("dialog-body");

  const expGrid = document.getElementById("experience-grid");
  if (expGrid) {
    data.experience.filter((item) => !item.hidden).forEach((item) => {
      const tile = el("button", "tile", { type: "button" });
      applyTheme(tile, item.theme);
      tile.setAttribute("aria-haspopup", "dialog");
      tile.setAttribute("aria-label", item.title);
      tile.append(tileInner(item));
      tile.addEventListener("click", () => {
        dialogTitle.textContent = item.title;
        // descriptions are trusted site content from data.js and may contain links
        dialogBody.innerHTML = item.description;
        dialog.showModal();
      });
      expGrid.append(tile);
    });
  }

  if (dialog) {
    // close when the backdrop (the dialog element itself) is clicked
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  }

  /* ---------- link tiles ---------- */

  const linksGrid = document.getElementById("links-grid");
  if (linksGrid) {
    data.links.forEach((item) => {
      const tile = el("a", "tile", { href: item.href, target: "_blank", rel: "noopener" });
      applyTheme(tile, item.theme);
      tile.append(tileInner(item));
      linksGrid.append(tile);
    });
  }

  /* ---------- shelves (projects + interests) ---------- */

  function buildShelf(containerId, items) {
    const shelf = document.getElementById(containerId);
    if (!shelf) return;
    const track = shelf.querySelector(".shelf-track");

    items.forEach((item) => {
      const card = item.href
        ? el("a", "shelf-item", { href: item.href, target: "_blank", rel: "noopener" })
        : el("div", "shelf-item");
      const frame = el("span", "shelf-frame");
      const img = el("img", "", {
        src: item.image,
        alt: item.alt || item.title || "",
        loading: "lazy",
        decoding: "async",
        width: "600",
        height: "600",
      });
      if (item.href && !item.title) card.setAttribute("aria-label", item.alt || "");
      frame.append(img);
      card.append(frame);
      if (item.title) {
        const cap = el("span", "shelf-caption");
        const t = el("span", "shelf-title");
        t.textContent = item.title;
        cap.append(t);
        if (item.subtitle) {
          const s = el("span", "shelf-subtitle");
          s.textContent = item.subtitle;
          cap.append(s);
        }
        card.append(cap);
      }
      track.append(card);
    });

    const prev = shelf.querySelector(".shelf-btn-prev");
    const next = shelf.querySelector(".shelf-btn-next");
    // page by whole cards so the arrows always land on a card edge
    const unit = () =>
      track.children.length > 1
        ? track.children[1].offsetLeft - track.children[0].offsetLeft
        : 240;
    const step = () => unit() * Math.max(1, Math.floor((track.clientWidth * 0.9) / unit()));
    const page = (dir) => {
      const target = Math.round((track.scrollLeft + dir * step()) / unit()) * unit();
      track.scrollTo({ left: target, behavior: "smooth" });
    };
    prev.addEventListener("click", () => page(-1));
    next.addEventListener("click", () => page(1));

    function updateButtons() {
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 10;
      next.disabled = track.scrollLeft >= max - 10;
    }
    updateButtons();
    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
  }

  buildShelf("projects-shelf", data.projects);
  buildShelf("interests-shelf", data.interests);

  /* ---------- scroll-reveal ---------- */

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealables = document.querySelectorAll(
    ".tile, .shelf-item, .section-head, .hero > *"
  );
  // stagger by position within each container so items reveal left to right
  const siblingCounts = new Map();
  revealables.forEach((node) => {
    const parent = node.parentElement;
    const i = siblingCounts.get(parent) || 0;
    siblingCounts.set(parent, i + 1);
    node.classList.add("reveal");
    node.style.setProperty("--reveal-delay", `${Math.min(i % 8, 5) * 60}ms`);
  });
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach((n) => n.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealables.forEach((n) => io.observe(n));
  }

  /* ---------- easter egg: click the headshot ---------- */

  const avatarBtn = document.querySelector(".avatar-btn");
  if (avatarBtn) {
    let running = false;
    avatarBtn.addEventListener("click", () => {
      const toast = el("div", "bills-toast");
      toast.textContent = "🏈 Go Bills!";
      document.body.append(toast);
      setTimeout(() => toast.remove(), 2200);

      if (running || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      running = true;
      avatarBtn.classList.add("avatar-hyped");

      const canvas = document.createElement("canvas");
      canvas.className = "confetti-canvas";
      document.body.append(canvas);
      const ctx = canvas.getContext("2d");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.scale(dpr, dpr);

      const rect = avatarBtn.getBoundingClientRect();
      const ox = rect.left + rect.width / 2;
      const oy = rect.top + rect.height / 2;
      const COLORS = ["#00338D", "#C60C30", "#FFFFFF", "#7A9BD4"]; // Bills palette
      const parts = Array.from({ length: 150 }, (_, i) => {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
        const speed = 4 + Math.random() * 8;
        return {
          x: ox, y: oy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          size: 5 + Math.random() * 6,
          color: COLORS[i % COLORS.length],
          ball: i % 24 === 0, // every so often, a football
        };
      });

      const started = performance.now();
      const DURATION = 2400;
      (function tick(now) {
        const t = (now || performance.now()) - started;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - 1600) / (DURATION - 1600));
        parts.forEach((p) => {
          p.vy += 0.22; // gravity
          p.vx *= 0.992;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vr;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          if (p.ball) {
            ctx.font = "22px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("🏈", 0, 0);
          } else {
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          }
          ctx.restore();
        });
        ctx.globalAlpha = 1;
        if (t < DURATION) {
          requestAnimationFrame(tick);
        } else {
          canvas.remove();
          avatarBtn.classList.remove("avatar-hyped");
          running = false;
        }
      })();
    });
  }

  /* ---------- scrollspy nav ---------- */

  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
  const sections = [...navLinks]
    .map((a) => document.getElementById(a.hash.slice(1)))
    .filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) =>
            a.hash.slice(1) === entry.target.id
              ? a.setAttribute("aria-current", "true")
              : a.removeAttribute("aria-current")
          );
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }
})();
