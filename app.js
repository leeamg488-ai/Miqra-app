// ============================================
// מִקְרָא — Application Logic
// ============================================

// ---- State ----
const state = {
  currentBook: "gen",
  currentChapter: 1,
  currentTranslation: "lsg",
  currentMode: "interlinear",
  currentView: "reader",
  favorites: JSON.parse(localStorage.getItem("miqra_favorites") || "[]"),
  notes: JSON.parse(localStorage.getItem("miqra_notes") || "[]"),
  highlights: JSON.parse(localStorage.getItem("miqra_highlights") || "{}"),
  lastStrong: null,
  audioPlaying: false,
  deferredInstallPrompt: null
};

// ---- DOM Refs ----
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initPassageSelector();
  initModes();
  renderBibleContent();
  initSearch();
  initLexicon();
  initNotes();
  initFavorites();
  initCompare();
  initStats();
  initTopbarActions();
  initAudio();
  initPWA();
  updateChapterSelect();
});

// ---- Navigation ----
function initNavigation() {
  const sidebar = $("sidebar");
  const overlay = $("overlay");
  const menuBtn = $("menu-btn");
  const closeBtn = $("sidebar-close");

  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    sidebar.classList.remove("hidden");
    overlay.classList.add("visible");
  });

  const closeMenu = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("visible");
  };

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // Desktop: show sidebar always
  const mq = window.matchMedia("(min-width: 769px)");
  const applyDesktop = (e) => {
    if (e.matches) {
      sidebar.classList.remove("hidden");
      overlay.classList.remove("visible");
    }
  };
  mq.addListener(applyDesktop);
  applyDesktop(mq);

  // View switching
  $$(".nav-item[data-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      switchView(view);
      $$(".nav-item").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (window.innerWidth < 769) closeMenu();
    });
  });
}

function switchView(view) {
  state.currentView = view;
  $$(".view").forEach(v => v.classList.remove("active"));
  const el = $(`view-${view}`);
  if (el) el.classList.add("active");
  $("topbar-title").textContent = {
    reader: getPassageTitle(),
    search: "Recherche",
    lexicon: "Lexique Strong",
    favorites: "Favoris",
    notes: "Notes",
    compare: "Comparer traductions",
    stats: "Statistiques"
  }[view] || "";
}

function getPassageTitle() {
  const book = BIBLE_DATA[state.currentBook];
  return book ? `${book.name} ${state.currentChapter}` : "Lecture";
}

// ---- Passage Selector ----
function initPassageSelector() {
  const bookSel = $("book-select");
  const chSel = $("chapter-select");
  const trSel = $("translation-select");

  bookSel.addEventListener("change", () => {
    state.currentBook = bookSel.value;
    state.currentChapter = 1;
    updateChapterSelect();
    renderBibleContent();
    $("topbar-title").textContent = getPassageTitle();
  });

  chSel.addEventListener("change", () => {
    state.currentChapter = parseInt(chSel.value);
    renderBibleContent();
    $("topbar-title").textContent = getPassageTitle();
  });

  trSel.addEventListener("change", () => {
    state.currentTranslation = trSel.value;
    renderBibleContent();
  });
}

function updateChapterSelect() {
  const chSel = $("chapter-select");
  const book = BIBLE_DATA[state.currentBook];
  const maxCh = book ? book.chapters : 50;
  chSel.innerHTML = "";
  for (let i = 1; i <= Math.min(maxCh, 150); i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `Chap. ${i}`;
    if (i === state.currentChapter) opt.selected = true;
    chSel.appendChild(opt);
  }
}

// ---- Modes ----
function initModes() {
  $$(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".mode-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (btn.id === "mode-interlinear") state.currentMode = "interlinear";
      else if (btn.id === "mode-parallel") state.currentMode = "parallel";
      else if (btn.id === "mode-strong-only") state.currentMode = "strong";
      renderBibleContent();
    });
  });
}

// ---- Render Bible Content ----
function renderBibleContent() {
  const container = $("bible-content");
  const book = BIBLE_DATA[state.currentBook];

  if (!book) {
    container.innerHTML = `<div class="hint-text">Ce livre n'est pas encore disponible dans cette démo.<br>Essayez <strong>Genèse</strong> ou <strong>Psaumes</strong>.</div>`;
    return;
  }

  const chData = book.data[state.currentChapter];
  if (!chData) {
    container.innerHTML = `<div class="hint-text">Ce chapitre n'est pas encore disponible dans cette démo.<br>Essayez le chapitre 1 pour la Genèse ou le Psaume 23.</div>`;
    return;
  }

  let html = `<div class="chapter-header">
    <h2>${book.name} ${state.currentChapter}</h2>
    <div class="hebrew-title">${book.hebrewName}</div>
  </div>`;

  chData.forEach(verse => {
    const hlKey = `${state.currentBook}-${state.currentChapter}-${verse.v}`;
    const hl = state.highlights[hlKey] || "";

    html += `<div class="verse" id="v${verse.v}">
      <span class="verse-num">${verse.v}</span>
      <div class="verse-body">`;

    if (state.currentMode === "parallel") {
      // Show both LSG and Hebrew side by side
      html += `<div class="verse-text ${hl}">${verse.lsg}</div>`;
      if (verse.hebrew) {
        html += `<div class="verse-text" style="direction:rtl;font-family:'Noto Serif Hebrew',serif;font-size:1.05rem;color:var(--ink-light);margin-top:6px;">${verse.hebrew}</div>`;
      }
    } else if (state.currentMode === "strong") {
      // Strong numbers only view
      html += `<div class="interlinear-row">`;
      verse.words.forEach((w, i) => {
        html += `<div class="iword" data-strong="${w.strong}" data-heb="${w.heb}" data-translit="${w.translit}" data-fr="${w.fr}" onclick="showStrongPopup('${w.strong}', this)">
          <span class="iword-heb">${w.heb}</span>
          <span class="iword-num">${w.strong}</span>
        </div>`;
      });
      html += `</div>`;
    } else {
      // Interlinear (default)
      html += `<div class="verse-text ${hl}">${verse.lsg}</div>`;
      html += `<div class="interlinear-row">`;
      verse.words.forEach(w => {
        html += `<div class="iword" data-strong="${w.strong}" data-heb="${w.heb}" data-translit="${w.translit}" data-fr="${w.fr}" onclick="showStrongPopup('${w.strong}', this)">
          <span class="iword-heb">${w.heb}</span>
          <span class="iword-translit">${w.translit}</span>
          <span class="iword-num">${w.strong}</span>
        </div>`;
      });
      html += `</div>`;
    }

    html += `</div></div>`;
  });

  container.innerHTML = html;
}

// ---- Strong Popup ----
function showStrongPopup(strongNum, el) {
  const popup = $("strong-popup");
  const entry = STRONGS_HEBREW[strongNum];

  // Remove active from siblings
  $$(".iword, .ltr-word").forEach(w => w.classList.remove("clicked"));
  if (el) el.classList.add("clicked");

  state.lastStrong = strongNum;

  if (!entry) {
    // Basic display from word attributes
    const heb = el ? el.dataset.heb : "";
    const translit = el ? el.dataset.translit : "";
    $("popup-number").textContent = strongNum;
    $("popup-hebrew").textContent = heb;
    $("popup-translit").textContent = translit;
    $("popup-pronunc").textContent = "";
    $("popup-definition").textContent = "Définition complète disponible dans la version complète du lexique.";
    $("popup-etymology").textContent = "";
    $("popup-related").innerHTML = "";
    $("popup-stats").textContent = "";
  } else {
    $("popup-number").textContent = entry.number;
    $("popup-hebrew").textContent = entry.hebrew;
    $("popup-translit").textContent = entry.translit;
    $("popup-pronunc").textContent = `/${entry.pronunciation}/  •  ${entry.pos}`;
    $("popup-definition").textContent = entry.definition;
    $("popup-etymology").textContent = "Étymologie : " + entry.etymology;

    // Related words
    const relDiv = $("popup-related");
    if (entry.related && entry.related.length) {
      relDiv.innerHTML = entry.related.map(r =>
        `<span class="related-chip" onclick="lookupStrong('${r}')">${r}</span>`
      ).join("") + entry.relatedWords.map(w =>
        `<span class="related-chip" style="font-family:'Noto Serif Hebrew',serif">${w}</span>`
      ).join("");
    } else {
      relDiv.innerHTML = "";
    }

    $("popup-stats").textContent = `Occurrences : ${entry.occurrences.toLocaleString("fr")} fois dans la Bible hébraïque`;
  }

  popup.classList.remove("hidden");
}

function lookupStrong(num) {
  closePopup();
  switchView("lexicon");
  $$(".nav-item").forEach(b => b.classList.remove("active"));
  document.querySelector('.nav-item[data-view="lexicon"]').classList.add("active");
  $("lexicon-input").value = num;
  renderLexiconEntry(num);
}

function closePopup() {
  $("strong-popup").classList.add("hidden");
  $$(".iword, .ltr-word").forEach(w => w.classList.remove("clicked"));
}

$("popup-close").addEventListener("click", closePopup);

$("popup-lexicon-btn").addEventListener("click", () => {
  if (state.lastStrong) lookupStrong(state.lastStrong);
});

$("popup-search-btn").addEventListener("click", () => {
  if (!state.lastStrong) return;
  closePopup();
  switchView("search");
  $("search-input").value = state.lastStrong;
  document.querySelector('label[data-filter="strong"]').click();
  performSearch();
});

$("popup-note-btn").addEventListener("click", () => {
  if (!state.lastStrong) return;
  closePopup();
  switchView("notes");
  $("note-ref").value = `${state.lastStrong} — ${getPassageTitle()}`;
  $("note-text").focus();
});

// ---- Search ----
function initSearch() {
  $("search-btn").addEventListener("click", performSearch);
  $("search-input").addEventListener("keydown", e => { if (e.key === "Enter") performSearch(); });

  $$(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      $$(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });
}

function performSearch() {
  const query = $("search-input").value.trim().toLowerCase();
  const filterEl = document.querySelector('.filter-chip.active');
  const filterType = filterEl ? filterEl.dataset.filter : "text";
  const results = $("search-results");

  if (!query) {
    results.innerHTML = `<p class="hint-text">Entrez un terme pour rechercher…</p>`;
    return;
  }

  let matches = [];

  if (filterType === "strong") {
    // Search Strong's number
    const upperQ = query.toUpperCase();
    SEARCH_INDEX.forEach(item => {
      const book = BIBLE_DATA[item.book];
      if (!book) return;
      const chData = book.data[item.ch];
      if (!chData) return;
      const verse = chData.find(v => v.v === item.v);
      if (!verse) return;
      const hasStrong = verse.words.some(w => w.strong.toLowerCase() === upperQ);
      if (hasStrong) {
        matches.push({ ...item, matched: [] });
      }
    });
  } else {
    // Text search
    SEARCH_INDEX.forEach(item => {
      if (item.text.toLowerCase().includes(query)) {
        matches.push(item);
      }
    });
  }

  if (!matches.length) {
    results.innerHTML = `<div class="hint-text">Aucun résultat pour « ${query} ».<br>Essayez avec « lumière », « Dieu », « eau » ou H430…</div>`;
    return;
  }

  results.innerHTML = matches.map(m => {
    const highlighted = m.text.replace(new RegExp(query, "gi"), match => `<mark>${match}</mark>`);
    return `<div class="result-card" onclick="navigateToVerse('${m.book}', ${m.ch}, ${m.v})">
      <div class="result-ref">${m.ref}</div>
      <div class="result-text">${filterType === "strong" ? m.text : highlighted}</div>
    </div>`;
  }).join("");
}

function navigateToVerse(book, ch, v) {
  state.currentBook = book;
  state.currentChapter = ch;
  $("book-select").value = book;
  updateChapterSelect();
  $("chapter-select").value = ch;
  switchView("reader");
  $$(".nav-item").forEach(b => b.classList.remove("active"));
  document.querySelector('.nav-item[data-view="reader"]').classList.add("active");
  renderBibleContent();
  setTimeout(() => {
    const verseEl = $(`v${v}`);
    if (verseEl) verseEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 100);
}

// ---- Lexicon ----
function initLexicon() {
  $("lexicon-btn").addEventListener("click", () => {
    renderLexiconEntry($("lexicon-input").value.trim());
  });
  $("lexicon-input").addEventListener("keydown", e => {
    if (e.key === "Enter") renderLexiconEntry($("lexicon-input").value.trim());
  });
}

function renderLexiconEntry(query) {
  const container = $("lexicon-result");
  if (!query) {
    container.innerHTML = `<p class="hint-text">Entrez un numéro Strong (H430, H1254…)</p>`;
    return;
  }

  const upper = query.toUpperCase();
  const entry = STRONGS_HEBREW[upper];

  if (!entry) {
    container.innerHTML = `<div class="hint-text">« ${query} » non trouvé.<br>Essayez H430 (Elohim), H3068 (YHWH), H1254 (créer), H216 (lumière)…</div>`;
    return;
  }

  const booksList = Object.entries(entry.books)
    .sort((a, b) => b[1] - a[1])
    .map(([book, count]) => {
      const maxCount = Math.max(...Object.values(entry.books));
      const pct = Math.round((count / maxCount) * 100);
      return `<div class="stats-book-item">
        <div>
          <div class="stats-book-name">${book}</div>
          <div class="bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="stats-book-count">${count}×</div>
      </div>`;
    }).join("");

  const relatedHTML = entry.related.map(r =>
    `<span class="related-chip" onclick="relookup('${r}')">${r}</span>`
  ).join("") + entry.relatedWords.map(w =>
    `<span class="related-chip" style="font-family:'Noto Serif Hebrew',serif">${w}</span>`
  ).join("");

  container.innerHTML = `<div class="lexicon-card">
    <div class="lex-header">
      <span class="lex-number">${entry.number}</span>
      <div class="lex-meta">
        <div class="lex-translit">${entry.translit}</div>
        <div class="lex-pronunc">/${entry.pronunciation}/</div>
        <div class="lex-pos">${entry.pos}</div>
      </div>
      <div class="lex-hebrew">${entry.hebrew}</div>
    </div>

    <div class="lex-section">
      <div class="lex-label">Définition</div>
      <div class="lex-text">${entry.definition}</div>
    </div>

    <div class="lex-section">
      <div class="lex-label">Étymologie</div>
      <div class="lex-etymology">${entry.etymology}</div>
    </div>

    <div class="lex-section">
      <div class="lex-label">Occurrences — ${entry.occurrences.toLocaleString("fr")} fois</div>
      <div class="lex-occurrences">${booksList}</div>
    </div>

    ${relatedHTML ? `<div class="lex-section">
      <div class="lex-label">Mots apparentés</div>
      <div class="related-words">${relatedHTML}</div>
    </div>` : ""}
  </div>`;
}

function relookup(num) {
  $("lexicon-input").value = num;
  renderLexiconEntry(num);
}

// ---- Notes ----
function initNotes() {
  $("add-note-btn").addEventListener("click", () => {
    const ref = $("note-ref").value.trim();
    const text = $("note-text").value.trim();
    if (!ref || !text) { showToast("Ajoutez une référence et un texte."); return; }

    const note = {
      id: Date.now(),
      ref,
      text,
      date: new Date().toLocaleDateString("fr-FR")
    };
    state.notes.unshift(note);
    localStorage.setItem("miqra_notes", JSON.stringify(state.notes));
    $("note-ref").value = "";
    $("note-text").value = "";
    renderNotes();
    showToast("Note sauvegardée ✓");
  });
  renderNotes();
}

function renderNotes() {
  const list = $("notes-list");
  if (!state.notes.length) {
    list.innerHTML = `<p class="hint-text">Aucune note. Ajoutez votre première réflexion.</p>`;
    return;
  }
  list.innerHTML = state.notes.map(n => `
    <div class="note-card">
      <button class="note-del" onclick="deleteNote(${n.id})">✕</button>
      <div class="note-ref-label">${n.ref}</div>
      <div class="note-body">${n.text}</div>
      <div class="note-date">${n.date}</div>
    </div>
  `).join("");
}

function deleteNote(id) {
  state.notes = state.notes.filter(n => n.id !== id);
  localStorage.setItem("miqra_notes", JSON.stringify(state.notes));
  renderNotes();
}

// ---- Favorites ----
function initFavorites() {
  renderFavorites();
}

function renderFavorites() {
  const list = $("favorites-list");
  if (!state.favorites.length) {
    list.innerHTML = `<p class="hint-text">Aucun favori. Appuyez sur ☆ pendant la lecture pour ajouter un verset.</p>`;
    return;
  }
  list.innerHTML = state.favorites.map(f => `
    <div class="fav-card" onclick="navigateToVerse('${f.book}', ${f.ch}, ${f.v})">
      <span class="fav-star">★</span>
      <div class="fav-content">
        <div class="fav-ref">${f.ref}</div>
        <div class="fav-text">${f.text}</div>
      </div>
    </div>
  `).join("");
}

// ---- Topbar Actions ----
function initTopbarActions() {
  // Favorite current chapter
  $("fav-btn").addEventListener("click", () => {
    const book = BIBLE_DATA[state.currentBook];
    if (!book) { showToast("Aucun texte chargé."); return; }
    const chData = book.data[state.currentChapter];
    if (!chData) { showToast("Chapitre non disponible."); return; }
    const verse = chData[0];
    const ref = `${book.name} ${state.currentChapter}:${verse.v}`;
    const already = state.favorites.find(f => f.ref === ref);
    if (already) {
      state.favorites = state.favorites.filter(f => f.ref !== ref);
      $("fav-btn").textContent = "☆";
      showToast("Retiré des favoris");
    } else {
      state.favorites.unshift({ ref, text: verse.lsg, book: state.currentBook, ch: state.currentChapter, v: verse.v });
      $("fav-btn").textContent = "★";
      showToast("Ajouté aux favoris ★");
    }
    localStorage.setItem("miqra_favorites", JSON.stringify(state.favorites));
    renderFavorites();
  });

  // Highlight
  $("highlight-btn").addEventListener("click", () => {
    const book = BIBLE_DATA[state.currentBook];
    if (!book || !book.data[state.currentChapter]) return;
    const key = `${state.currentBook}-${state.currentChapter}-1`;
    const current = state.highlights[key] || "";
    const colors = ["", "hl-yellow", "hl-green", "hl-blue", "hl-pink"];
    const next = colors[(colors.indexOf(current) + 1) % colors.length];
    state.highlights[key] = next;
    localStorage.setItem("miqra_highlights", JSON.stringify(state.highlights));
    renderBibleContent();
    showToast(next ? "Surlignage appliqué 🖊" : "Surlignage retiré");
  });
}

// ---- Compare ----
function initCompare() {
  $("compare-btn").addEventListener("click", () => {
    const ref = $("compare-ref").value.trim();
    renderCompare(ref);
  });
  $("compare-ref").addEventListener("keydown", e => {
    if (e.key === "Enter") renderCompare($("compare-ref").value.trim());
  });
}

function renderCompare(ref) {
  const container = $("compare-result");
  if (!ref) {
    container.innerHTML = `<p class="hint-text">Entrez une référence, ex : Genèse 1:1</p>`;
    return;
  }

  const data = TRANSLATIONS[ref];
  if (!data) {
    container.innerHTML = `<div class="hint-text">Référence non disponible dans la démo.<br>Essayez « Genèse 1:1 » ou « Psaumes 23:1 ».</div>`;
    return;
  }

  container.innerHTML = `
    <div class="compare-card">
      <div class="compare-lang">🇮🇱 Hébreu original</div>
      <div class="compare-text rtl">${data.hebraw}</div>
    </div>
    <div class="compare-card" style="border-left-color:var(--gold)">
      <div class="compare-lang" style="color:var(--gold)">Traduction littérale</div>
      <div class="compare-text">${data.hebrewTrad}</div>
    </div>
    <div class="compare-card">
      <div class="compare-lang">🇫🇷 LSG (Louis Segond)</div>
      <div class="compare-text">${data.lsg}</div>
    </div>
    <div class="compare-card">
      <div class="compare-lang">🇬🇧 KJV (King James)</div>
      <div class="compare-text">${data.kjv}</div>
    </div>
    <div class="compare-card">
      <div class="compare-lang">🇺🇸 ESV</div>
      <div class="compare-text">${data.esv}</div>
    </div>
    <div class="compare-card" style="border-left-color:var(--crimson)">
      <div class="compare-lang" style="color:var(--crimson)">📝 Notes exégétiques</div>
      <div class="compare-text" style="font-style:italic;color:var(--ink-light)">${data.notes}</div>
    </div>
  `;
}

// ---- Stats ----
function initStats() {
  $("stats-btn").addEventListener("click", () => {
    renderStats($("stats-input").value.trim());
  });
  $("stats-input").addEventListener("keydown", e => {
    if (e.key === "Enter") renderStats($("stats-input").value.trim());
  });
}

function renderStats(query) {
  const container = $("stats-result");
  if (!query) {
    container.innerHTML = `<p class="hint-text">Entrez un numéro Strong ou mot hébreu…</p>`;
    return;
  }

  const upper = query.toUpperCase();
  const entry = STRONGS_HEBREW[upper];

  if (!entry) {
    container.innerHTML = `<div class="hint-text">Essayez H430, H3068, H776, H1254…</div>`;
    return;
  }

  const booksList = Object.entries(entry.books)
    .sort((a, b) => b[1] - a[1])
    .map(([book, count]) => {
      const maxCount = Math.max(...Object.values(entry.books));
      const pct = Math.round((count / maxCount) * 100);
      return `<div class="stats-book-item">
        <div style="flex:1">
          <div class="stats-book-name">${book}</div>
          <div class="bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="stats-book-count">${count}×</div>
      </div>`;
    }).join("");

  container.innerHTML = `
    <div class="stats-header-card">
      <div>
        <div class="stats-word">${entry.hebrew}</div>
        <div style="font-family:var(--font-body);font-style:italic;color:rgba(245,237,216,0.6);font-size:0.9rem">${entry.translit}</div>
      </div>
      <div style="margin-left:auto;text-align:right">
        <div class="stats-number">${entry.occurrences.toLocaleString("fr")}</div>
        <div class="stats-label">occurrences dans<br>la Bible hébraïque</div>
      </div>
    </div>
    <div style="margin-bottom:10px">
      <div class="lex-label" style="color:var(--gold);font-family:var(--font-ui);font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">Distribution par livre</div>
      <div class="stats-book-list">${booksList}</div>
    </div>
    <div style="background:var(--parchment);border:1px solid var(--border);border-radius:var(--radius);padding:12px;margin-top:8px">
      <div class="lex-label" style="color:var(--gold);font-family:var(--font-ui);font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px">Définition abrégée</div>
      <div style="font-family:var(--font-body);font-size:0.92rem;line-height:1.6;color:var(--ink)">${entry.definition.split(".")[0]}.</div>
    </div>
  `;
}

// ---- Audio (simulated) ----
function initAudio() {
  $("audio-btn").addEventListener("click", () => {
    showToast("🔊 Audio en cours de chargement (fonctionnalité premium)…");
  });
}

// ---- PWA ----
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    state.deferredInstallPrompt = e;

    // Show install banner
    const banner = document.createElement("div");
    banner.className = "install-banner";
    banner.innerHTML = `
      <div class="install-text"><strong>Installer מִקְרָא</strong> pour l'utiliser hors ligne</div>
      <div class="install-actions">
        <button class="btn-primary" id="install-yes" style="font-size:0.78rem;padding:6px 12px">Installer</button>
        <button class="install-dismiss" id="install-no">Non merci</button>
      </div>
    `;
    document.querySelector(".main").prepend(banner);

    document.getElementById("install-yes").addEventListener("click", async () => {
      state.deferredInstallPrompt.prompt();
      const { outcome } = await state.deferredInstallPrompt.userChoice;
      banner.remove();
    });

    document.getElementById("install-no").addEventListener("click", () => {
      banner.classList.add("hidden");
    });
  });

  // Update offline badge
  const updateOnline = () => {
    const badge = $("offline-badge");
    if (navigator.onLine) {
      badge.innerHTML = `<span class="dot" style="background:var(--sage)"></span> En ligne`;
    } else {
      badge.innerHTML = `<span class="dot" style="background:var(--gold-light)"></span> Mode hors ligne`;
    }
  };
  window.addEventListener("online", updateOnline);
  window.addEventListener("offline", updateOnline);
  updateOnline();
}

// ---- Toast ----
function showToast(msg) {
  const toast = $("toast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add("hidden"), 2800);
}
