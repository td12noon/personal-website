(function () {
  "use strict";

  var OPTIONS = [
    {
      id: "previous",
      name: "Previous",
      tag: "Before",
      desc: "Warm cream paper, indigo accent — the look you have now on production.",
      fonts: "Space Grotesk + Inter",
      swatches: ["#F6F5F1", "#FFFFFF", "#1B1B20", "#4F46E5"],
    },
    {
      id: "mist",
      name: "Mist & pine",
      tag: "Cool / calm",
      desc: "Cool slate mist paper with a forest accent. Quiet, professional, less “default AI.”",
      fonts: "Bricolage Grotesque + Figtree",
      swatches: ["#E7EEF0", "#F4F8F9", "#132028", "#0C6B56"],
    },
    {
      id: "citrus",
      name: "Ink & citrus",
      tag: "Sharp",
      desc: "Olive-cool paper and a chartreuse signal color. Higher energy without going neon-purple.",
      fonts: "Syne + Manrope",
      swatches: ["#F1F3EC", "#FAFBF7", "#171A14", "#8FA30D"],
    },
    {
      id: "harbor",
      name: "Harbor",
      tag: "Editorial",
      desc: "Soft blue paper, deep harbor ink-blue, Fraunces for a more editorial display voice.",
      fonts: "Fraunces + Source Sans 3",
      swatches: ["#E8EEF4", "#F5F8FB", "#142033", "#1F4E79"],
    },
    {
      id: "signal",
      name: "Signal",
      tag: "Product",
      desc: "Cool gray paper with a cyan-teal accent — clean product-site energy, not indigo.",
      fonts: "Outfit + DM Sans",
      swatches: ["#EEF1F4", "#F7F9FB", "#101418", "#0E7C8B"],
    },
    {
      id: "slate",
      name: "Slate & ember",
      tag: "Bold",
      desc: "Stone-gray paper with a strong ember red accent. Direct and high-contrast.",
      fonts: "Archivo + Public Sans",
      swatches: ["#E9E7E2", "#F6F4EF", "#1C1F24", "#C0392B"],
    },
  ];

  var grid = document.getElementById("options");
  var template = document.getElementById("option-template");
  var scheme = "light";

  function schemeQuery() {
    return "scheme=" + encodeURIComponent(scheme);
  }

  function render() {
    grid.textContent = "";
    OPTIONS.forEach(function (opt) {
      var node = template.content.cloneNode(true);
      var article = node.querySelector(".option");
      var mock = node.querySelector(".mock");

      node.querySelector(".option-name").textContent = opt.name;
      node.querySelector(".option-tag").textContent = opt.tag;
      node.querySelector(".option-desc").textContent = opt.desc;
      node.querySelector(".option-fonts").textContent = opt.fonts;

      var link = node.querySelector(".option-link");
      link.href = "index.html?theme=" + encodeURIComponent(opt.id) + "&" + schemeQuery();
      link.setAttribute("aria-label", "Open full site with " + opt.name + " theme");

      var swatches = node.querySelector(".swatches");
      opt.swatches.forEach(function (hex) {
        var s = document.createElement("span");
        s.className = "swatch";
        s.style.background = hex;
        s.title = hex;
        swatches.appendChild(s);
      });

      mock.classList.add("theme-" + opt.id);
      mock.setAttribute("data-scheme", scheme);

      grid.appendChild(node);
      // keep a reference for scheme updates
      article.dataset.themeId = opt.id;
    });
  }

  function setScheme(next) {
    scheme = next;
    document.documentElement.setAttribute("data-scheme", scheme);
    document.querySelectorAll(".scheme-btn").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-scheme") === scheme);
    });
    document.querySelectorAll(".mock").forEach(function (mock) {
      mock.setAttribute("data-scheme", scheme);
    });
    document.querySelectorAll(".option-link").forEach(function (link) {
      var id = link.closest(".option").dataset.themeId;
      link.href = "index.html?theme=" + encodeURIComponent(id) + "&" + schemeQuery();
    });
  }

  document.querySelectorAll(".scheme-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setScheme(btn.getAttribute("data-scheme"));
    });
  });

  render();
})();
