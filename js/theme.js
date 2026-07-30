/* Applies ?theme= and optional ?scheme= before first paint when loaded in <head>.
   Valid themes: mist | previous | citrus | harbor | signal | slate */
(function () {
  "use strict";

  var ALLOWED = {
    mist: true,
    previous: true,
    citrus: true,
    harbor: true,
    signal: true,
    slate: true,
  };

  var params = new URLSearchParams(window.location.search);
  var theme = params.get("theme") || "mist";
  if (!ALLOWED[theme]) theme = "mist";
  document.documentElement.setAttribute("data-theme", theme);

  var scheme = params.get("scheme");
  if (scheme === "light" || scheme === "dark") {
    document.documentElement.setAttribute("data-scheme", scheme);
  }
})();
