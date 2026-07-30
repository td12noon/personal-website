/* Applies ?theme= and optional ?scheme= before first paint when loaded in <head>.
   Valid themes: storm | moss | fogline | overcast | canopy | previous */
(function () {
  "use strict";

  var ALLOWED = {
    storm: true,
    moss: true,
    fogline: true,
    overcast: true,
    canopy: true,
    previous: true,
  };

  var params = new URLSearchParams(window.location.search);
  var theme = params.get("theme") || "storm";
  if (!ALLOWED[theme]) theme = "storm";
  document.documentElement.setAttribute("data-theme", theme);

  var scheme = params.get("scheme");
  if (scheme === "light" || scheme === "dark") {
    document.documentElement.setAttribute("data-scheme", scheme);
  }
})();
