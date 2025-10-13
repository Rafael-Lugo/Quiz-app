(() => {
  // Ejecuta solo en la página de perfil
  if (!document.body.classList.contains('app--profile')) return;

  // ====== Datos y utilidades ======
  const MARVEL_CHARACTERS = [
    "Iron Man","Captain America","Thor","Hulk","Black Widow",
    "Hawkeye","Spider-Man","Black Panther","Doctor Strange",
    "Scarlet Witch","Captain Marvel","Ant-Man","Loki","Star-Lord","Gamora"
  ];

  const $ = (sel, root = document) => root.querySelector(sel);

  const form       = $('[data-js="profile-form"]');
  const nameInput  = $('[data-js="name-input"]');
  const nameDisp   = $('[data-js="name-display"]');
  const ageInput   = $('[data-js="age-input"]');
  const yearInput  = $('[data-js="year-input"]');
  const favSelect  = $('[data-js="favorite-select"]');
  const darkToggle = $('[data-js="dark-toggle"]');

  const profileData = {
    fullName: "Max Mustermann",
    age: "", birthYear: "", favorite: "", darkMode: false,
  };

  function populateCharacters() {
    if (!favSelect) return;
    favSelect.innerHTML =
      '<option value="" disabled selected>Select a character</option>' +
      MARVEL_CHARACTERS.map(c => `<option value="${c}">${c}</option>`).join("");
  }

  const Y = () => new Date().getFullYear();

  // Profile Name
  if (nameInput && nameDisp) {
    nameInput.addEventListener('input', () => {
      nameDisp.textContent = nameInput.value.trim() || profileData.fullName;
    });
  }

  if (ageInput && yearInput) {
    ageInput.addEventListener('input', () => {
      const a = parseInt(ageInput.value, 10);
      if (!isNaN(a)) yearInput.value = Y() - a;
    });
    yearInput.addEventListener('input', () => {
      const y = parseInt(yearInput.value, 10);
      if (!isNaN(y)) ageInput.value = Math.max(0, Y() - y);
    });
  }
  //dark mode
  function applyDark(on){ document.documentElement.classList.toggle('theme-dark', on); }
  if (darkToggle) {
    darkToggle.addEventListener('change', () => applyDark(darkToggle.checked));
  }

  //form
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      profileData.fullName  = nameInput?.value.trim() || profileData.fullName;
      profileData.age       = ageInput?.value.trim() || "";
      profileData.birthYear = yearInput?.value.trim() || "";
      profileData.favorite  = favSelect?.value || "";
      profileData.darkMode  = !!darkToggle?.checked;
      nameDisp.textContent  = profileData.fullName;
      console.log('✅ Profile saved', profileData);
     
    });

    form.addEventListener('reset', () => {
      setTimeout(() => {
        if (favSelect) favSelect.selectedIndex = 0;
        if (darkToggle) { darkToggle.checked = false; applyDark(false); }
        if (ageInput) ageInput.value = "";
        if (yearInput) yearInput.value = "";
        if (nameDisp) nameDisp.textContent = "Max Mustermann";
      }, 0);
    });
  }

  // Init
  populateCharacters();
})();