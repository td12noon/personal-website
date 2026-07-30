(function () {
  "use strict";

  var OPTIONS = [
    {
      id: "storm",
      name: "Stormy morning",
      tag: "Blue-gray",
      desc: "Mist and fog blues — trustworthy, calm, quietly modern. Closest to your Stormy morning board.",
      fonts: "Sora + Source Sans 3",
      swatches: ["#6A89A7", "#BDDDFC", "#88BDF2", "#384959"],
    },
    {
      id: "moss",
      name: "Mossy hollow",
      tag: "Olive",
      desc: "Earthy olive greens with soft sage paper. Natural and grounded without going rustic.",
      fonts: "Archivo + Public Sans",
      swatches: ["#636B2F", "#BAC095", "#D4DE95", "#3D4127"],
    },
    {
      id: "fogline",
      name: "Fogline",
      tag: "Hybrid",
      desc: "Stormy paper with a moss accent — the two boards crossed. Unique, still restrained.",
      fonts: "Outfit + DM Sans",
      swatches: ["#EAF1F6", "#88BDF2", "#5E6635", "#2F3A3F"],
    },
    {
      id: "overcast",
      name: "Overcast",
      tag: "Monochrome",
      desc: "Same storm family, deeper slate as the accent. More graphic, less color pop.",
      fonts: "Bricolage Grotesque + Figtree",
      swatches: ["#EEF3F7", "#BDDDFC", "#6A89A7", "#384959"],
    },
    {
      id: "canopy",
      name: "Canopy",
      tag: "Soft moss",
      desc: "Mossy hollow turned quieter — pear washes, olive accent, airy sage paper.",
      fonts: "Sora + Manrope",
      swatches: ["#F2F3EB", "#D4DE95", "#BAC095", "#636B2F"],
    },
    {
      id: "previous",
      name: "Previous",
      tag: "Before",
      desc: "Warm cream + indigo — the production look, for side-by-side reference.",
      fonts: "Space Grotesk + Inter",
      swatches: ["#F6F5F1", "#FFFFFF", "#1B1B20", "#4F46E5"],
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
