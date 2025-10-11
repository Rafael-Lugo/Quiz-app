const toggleDarkMode = (on) => {
    document.documentElement.classList.toggle("theme-dark", on);
    localStorage.setItem("darkMode", on ? "1" : "0");
  };


  const savedMode = localStorage.getItem("darkMode") === "1";
  if (savedMode) document.documentElement.classList.add("theme-dark");

  
  document.addEventListener("change", (e) => {
      if (e.target.matches('[data-js="dark-toggle"]')) {
        toggleDarkMode(e.target.checked);
      }
    });

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".card__bookmark");
        if (!btn) return;

        const isPressed = btn.getAttribute("aria-pressed") === "true";
        btn.setAttribute("aria-pressed", String(!isPressed));
    });