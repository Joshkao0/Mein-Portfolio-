const projectCategories = {
  "ESP-Projekte": [
    {
      title: "Space Invaders - aktualisierter Bau",
      description: "Space Invaders mit OLED-Display und Potentiometer aktualisierter.",
      specs: ["2x Steckbrett", "1x ESP32", "0.96\" I2C OLED", "1x Buzzer", "1x Potentiometer"],
      date: "Mai 2025",
      image: "img/space_invaders_neu1.jpg",
    },
    {
      title: "RC-Car mit WiFi",
      description: "Ein ferngesteuertes Auto über WLAN.",
      specs: ["1x ESP8266", "4x DC-Motoren", "1x L298N", "App-gesteuert"],
      date: "Juni 2025",
      image: "img/rc_car1.jpg",
      image2: "img/rc_car2.jpg",
      image3: "img/rc_car3.jpg"
    },
    {
      title: "Flappybird",
      description: "Ähnlich wie Space Invaders ein Fun-Spielzeug für zwischendurch.",
      specs: ["1x ESP32","1x Steckbrett","0.96\" I2C OLED","1x Button"],
      date: "1.8.2025",
      image: "img/Flappybird1.jpg",
      image2: "img/Flappybird2.jpg",
      image3: "img/Videos/Flappybird3.mp4",
      videoThumbnail: "img/Thumbnail/Flappybird3-thumb.jpg"
    }
  ],
  "Arduino UNO R3 Projekte": [
    {
      title: "LED-Roulette",
      description: "5 LEDs mit Zufallswurf.",
      specs: ["1x Steckbrett", "5x LED","5x 220Ω Widerstand"],
      date: "18.5.2025",
      image: "img/led-roulette1.jpg",
      image2: "img/led-roulette2.jpg",
      image3: "img/Videos/led-roulette3.mp4",
      videoThumbnail: "img/Thumbnail/led-roulette3.jpg"
    },
    {
      title: "Space Invaders - alte Version",
      description: "Space Invaders mit OLED-Display und Potentiometer. Alte Version hier ohne, weil mein Potentiometer kaputt ging :(",
      specs: ["1x Steckbrett", "1x Arduino UNO R3", "0.96\" SPI OLED", "1x Potentiometer"],
      date: "Mai 2025",
      image: "img/space_invaders_alt1.jpg",
    },

  ],
  "Nur mit Strom/Steckbrett": [
    {
      title: "Lichtschaltung",
      description: "Eine LED wird per Knopfdruck ausgeschaltet. Lässt man den Knopf los, geht die andere LED an.",
      specs: ["1x Steckbrett", "2x LED","1x Knopf", "1x 220Ω Widerstand"],
      date: "16.4.2025",
      image: "img/lichtpoten1.jpg",
      image2: "img/lichtpoten2.jpg",
    },
    {
      title: "LED-Helligkeit",
      description: "Eine einfache Lichtsteuerung mit einem Potentiometer.",
      specs: ["1x Steckbrett","1x LED", "1x Potentiometer", "1x 220Ω Widerstand"],
      date: "16.4.2025",
      image: "img/led-helligkeit1.jpg",
      image2: "img/led-helligkeit2.jpg",
    },
    {
      title: "Buzzer Peep",
      description: "Ein Buzzer piept, bis ein Knopf gedrückt wird. Lässt man ihn los, piept er weiter.",
      specs: ["1x Steckbrett", "1x LED","1x 220Ω Widerstand", "1x Button", "1x Aktiver Buzzer"],
      date: "16.4.2025",
      image: "img/buzzer peep1.jpg",
    },
    {
      title: "Stolperfalle",
      description: "Stolperfalle ohne das Stolpern halt.",
      specs: ["1x Steckbrett", "1x LED", "1x 10KΩ Widerstand", "1x BC547 Transistor", "1x LDR", "1x Buzzer", "1x Laser"],
      date: "1.8.2025",
      image: "img/Stolerfalle1.jpg",
      image2: "img/Stolerfalle2.jpg",
    },
    {
      title: "Fan zu abkühlen",
      description: "Ein kleiner Lüfter der jemanden schön abkühlen kann mit ca. 60dB.",
      specs: ["1x Steckbrett", "Handvoll mit Jumper-Kabeln", "1x DC Motor", "1x Potentiometer"],
      date: "4.8.2025",
      image: "img/Fan1.jpg",
      image2: "img/Fan2.jpg",
      image3: "img/Videos/Fan3.mp4",
      videoThumbnail: "img/Thumbnail/Fan2.jpg"
    },
  ],
  "Modding": [
    {
      title: "3DS Modding",
      description: "Modifizierter Nintendo 3DS mit neuer Software. Mehr Hilfe bei https://3ds.hacks.guide/",
      specs: ["Nintendo 3DS", "Homebrew Launcher", "Micro SD Karte Min 32GB"],
      date: "2025",
      image: "img/3ds_mod1.jpg",
    },
  ]
};

const projectsDiv = document.getElementById('projects');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const searchInput = document.getElementById('searchInput');

function makeChip(text, badgeText = null) {
  const chip = document.createElement("span");
  chip.className = "chip";
  chip.innerHTML = `${badgeText ? `<span class="badge">${badgeText}</span>` : ""}${escapeHtml(text)}`;
  return chip;
}
function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', project.title + ' Projekt öffnen');

  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.style.display='none'">
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <small class="date">${project.date}</small>
  `;

  const specs = Array.isArray(project.specs) ? project.specs : [];
  if (specs.length) {
    const chipsWrap = document.createElement('div');
    chipsWrap.className = 'chips';
    const maxVisible = 3;
    specs.slice(0, maxVisible).forEach((s, i) => {
      chipsWrap.appendChild(makeChip(s, i === 0 ? "Komponente" : null));
    });
    const remaining = specs.length - maxVisible;
    if (remaining > 0) {
      const moreChip = document.createElement('span');
      moreChip.className = 'chip';
      moreChip.innerHTML = `<span class="badge">+${remaining}</span> mehr`;
      chipsWrap.appendChild(moreChip);
    }
    card.appendChild(chipsWrap);
  }

  card.onclick = () => openModal(project);
  card.onkeypress = (e) => { if (e.key === 'Enter') openModal(project); };

  return card;
}

let currentImages = [];
let selectedIndex = 0;

function openModal(project) {
  currentImages = [];

  if (project.image) currentImages.push({ type: 'image', src: project.image });
  if (project.image2) currentImages.push({ type: 'image', src: project.image2 });
  if (project.image3) {
    if (project.image3.toLowerCase().endsWith('.mp4')) {
      currentImages.push({ type: 'video', src: project.image3 });
    } else {
      currentImages.push({ type: 'image', src: project.image3 });
    }
  }

  selectedIndex = 0;
  const selected = currentImages[0];

  const mediaHtml = selected && selected.type === 'video'
    ? `<video id="main-img" class="project-image" controls>
         <source src="${selected.src}" type="video/mp4">
         Dein Browser unterstützt kein Video.
       </video>`
    : `<img id="main-img" src="${selected ? selected.src : ''}" alt="${project.title}" class="project-image">`;

  modalBody.innerHTML = `
    <h2 id="modalTitle">${project.title}</h2>
    <p>${project.description}</p>
    <ul>${(project.specs || []).map(s => `<li>${s}</li>`).join('')}</ul>
    <p class="date">Datum: ${project.date}</p>
    ${mediaHtml}
    <div class="image-gallery">
      ${currentImages.map((item, i) => {
        let thumbSrc = '';
        if(item.type === 'video') {
          thumbSrc = project.videoThumbnail || 'https://via.placeholder.com/100x70?text=Video';
        } else {
          thumbSrc = item.src;
        }
        return `<img src="${thumbSrc}" data-index="${i}" alt="Bild ${i + 1}" class="${i === 0 ? 'selected' : ''}">`;
      }).join('')}
    </div>
  `;

  modal.style.display = 'flex';
  modal.focus();

  const galleryImgs = modalBody.querySelectorAll('.image-gallery img');
  galleryImgs.forEach(img => { img.onclick = () => { selectImage(parseInt(img.dataset.index)); }; });
}

function selectImage(index) {
  if (index === selectedIndex) return;
  selectedIndex = index;

  const container = document.getElementById('main-img');
  const selected = currentImages[index];
  let newElement;

  if (selected.type === 'video') {
    newElement = document.createElement('video');
    newElement.id = 'main-img';
    newElement.className = 'project-image';
    newElement.controls = true;
    const source = document.createElement('source');
    source.src = selected.src;
    source.type = 'video/mp4';
    newElement.appendChild(source);
  } else {
    newElement = document.createElement('img');
    newElement.id = 'main-img';
    newElement.className = 'project-image';
    newElement.src = selected.src;
    newElement.alt = 'Bild';
  }

  container.replaceWith(newElement);

  const galleryImgs = modalBody.querySelectorAll('.image-gallery img');
  galleryImgs.forEach(img => { img.classList.toggle('selected', parseInt(img.dataset.index) === index); });
}

function closeModal() { modal.style.display = 'none'; modalBody.innerHTML = ''; }
modal.onclick = function(event) { if (event.target === modal) closeModal(); };
document.addEventListener('keydown', function(e) { if (e.key === "Escape" && modal.style.display === 'flex') closeModal(); });

function renderProjects(filter = '') {
  projectsDiv.innerHTML = '';
  for (const [category, projects] of Object.entries(projectCategories)) {
    const filtered = projects.filter(proj =>
      proj.title.toLowerCase().includes(filter.toLowerCase()) ||
      proj.description.toLowerCase().includes(filter.toLowerCase())
    );
    if (filtered.length === 0) continue;

    const catDiv = document.createElement('div');
    catDiv.className = 'project-category';
    const h2 = document.createElement('h2'); h2.textContent = category; catDiv.appendChild(h2);

    const container = document.createElement('div'); container.className = 'project-container';
    filtered.forEach(proj => { container.appendChild(createProjectCard(proj)); });
    catDiv.appendChild(container);
    projectsDiv.appendChild(catDiv);
  }
}

searchInput.addEventListener('input', (e) => { renderProjects(e.target.value); });
renderProjects();
