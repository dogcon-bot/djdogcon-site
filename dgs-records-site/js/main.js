(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "Menu";
      }
    });
  }

  var clock = document.getElementById("cd");
  if (!clock) return;
  var target = Date.parse(clock.getAttribute("data-premiere"));
  var watch = clock.getAttribute("data-watch") || "";
  if (!target) return;

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function tick() {
    var remain = target - Date.now();
    if (remain <= 0) {
      clock.innerHTML = "";
      if (watch.indexOf("https://") === 0) {
        var link = document.createElement("a");
        link.className = "btn red";
        link.href = watch;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "Watch now";
        clock.appendChild(link);
      } else {
        clock.textContent = "Out now";
      }
      return;
    }
    var seconds = Math.floor(remain / 1000);
    var units = {
      d: Math.floor(seconds / 86400),
      h: pad(Math.floor((seconds % 86400) / 3600)),
      m: pad(Math.floor((seconds % 3600) / 60)),
      s: pad(seconds % 60)
    };
    Object.keys(units).forEach(function (key) {
      var node = clock.querySelector('[data-unit="' + key + '"]');
      if (node) node.textContent = units[key];
    });
    window.setTimeout(tick, 1000);
  }

  tick();
})();
