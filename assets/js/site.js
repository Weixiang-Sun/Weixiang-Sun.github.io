/* Site behaviour: theme toggle, header, email copy, WeChat QR, publication lists, BibTeX, figure lightbox. */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const ME = "Weixiang Sun";
  const FIG_DIR = "/assets/img/pubs/";

  /* ---------- Helpers ---------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shortName = p => p.short_title || p.title.split(":")[0];
  const arxivURL = id => `https://arxiv.org/abs/${id}`;
  let toastTimer = 0;
  function toast(msg) {
    const t = $("#toast"); if (!t) return;
    t.textContent = msg; t.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("is-on"), 1600);
  }
  function selectContents(el) {
    try { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } catch (e) {}
  }
  function copyText(text, fallbackEl) {
    const fail = () => { if (fallbackEl) selectContents(fallbackEl); toast("Selected. Press ⌘C or Ctrl+C to copy"); };
    try { navigator.clipboard.writeText(text).then(() => toast("Copied to clipboard"), fail); } catch (e) { fail(); }
  }

  /* ---------- Data ---------- */
  let PUBS = [];
  const dataEl = $("#pubs-data");
  if (dataEl) { try { PUBS = JSON.parse(dataEl.textContent); } catch (e) { PUBS = []; } }

  /* ---------- BibTeX ---------- */
  const STOP = new Set(["a", "an", "the", "can", "do", "why", "how", "when", "on", "of", "for", "and", "to", "in", "via", "you"]);
  const clean = raw => raw.replace(/[*†]/g, "").trim();
  function bibName(raw) { const parts = clean(raw).split(/\s+/); const last = parts.pop(); return parts.length ? `${last}, ${parts.join(" ")}` : last; }
  function bibKey(p) {
    const last = clean(p.authors[0]).split(/\s+/).pop().toLowerCase().replace(/[^a-z]/g, "");
    const word = p.title.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/[\s-]+/).find(w => w.length > 2 && !STOP.has(w)) || "paper";
    return last + p.year + word;
  }
  function bibtex(p) {
    const k = p.bib_type;
    const proc = k === "conf" || k === "workshop";
    const type = proc ? "inproceedings" : k === "review" ? "misc" : "article";
    const f = [["title", p.title], ["author", p.authors.map(bibName).join(" and ") + (p.et_al ? " and others" : "")]];
    if (proc) f.push(["booktitle", p.bib_venue || p.venue]);
    else if (k === "journal") f.push(["journal", p.bib_venue || p.venue]);
    else if (k === "preprint") f.push(["journal", p.arxiv ? `arXiv preprint arXiv:${p.arxiv}` : "Preprint"]);
    else f.push(["note", "Under review"]);
    if (p.volume) f.push(["volume", String(p.volume)]);
    if (p.pages) f.push(["pages", String(p.pages)]);
    f.push(["year", String(p.year)]);
    if (p.arxiv && k !== "preprint") { f.push(["eprint", p.arxiv]); f.push(["archivePrefix", "arXiv"]); }
    return `@${type}{${bibKey(p)},\n` + f.map(([key, v]) => `  ${key} = {${v}}`).join(",\n") + "\n}";
  }

  /* ---------- Publication markup ---------- */
  function authorsHTML(p) {
    return p.authors.map(raw => {
      const m = raw.match(/^(.*?)([*†]*)$/);
      const name = m[1].trim() === ME ? `<span class="me">${esc(m[1])}</span>` : esc(m[1]);
      return name + (m[2] ? `<span class="mark">${m[2]}</span>` : "");
    }).join(", ") + (p.et_al ? ", et al." : "");
  }
  /* A tall figure gets a tall frame (no narrower than 3:4); wide figures keep the 16:10 frame. */
  function thumbHTML(p) {
    if (!p.figure) return `<div class="thumb thumb--empty" aria-hidden="true"><span>${esc(shortName(p))}</span></div>`;
    const size = Array.isArray(p.figure_size) ? p.figure_size : null;
    const tall = size && size[0] < size[1];
    const ratio = tall ? Math.max(0.75, size[0] / size[1]).toFixed(3) : "1.6";
    const dims = size ? ` width="${size[0]}" height="${size[1]}"` : "";
    return `<button type="button" class="thumb${tall ? " thumb--tall" : ""}" style="aspect-ratio: ${ratio}"${size ? "" : " data-autosize"} data-fig="${esc(p.figure)}" aria-label="Enlarge figure from ${esc(shortName(p))}"><img src="${FIG_DIR}${esc(p.figure)}.webp" alt=""${dims} loading="lazy" decoding="async"></button>`;
  }
  function pubHTML(p, id, featured) {
    const title = p.arxiv ? `<a href="${arxivURL(p.arxiv)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title);
    const links = [];
    if (p.arxiv) links.push(`<a class="u" href="${arxivURL(p.arxiv)}" target="_blank" rel="noopener">arXiv</a>`);
    if (p.website) links.push(`<a class="u" href="${esc(p.website)}" target="_blank" rel="noopener">Project page</a>`);
    if (p.code) links.push(`<a class="u" href="${esc(p.code)}" target="_blank" rel="noopener">Code</a>`);
    links.push(`<button type="button" class="u bib-toggle" aria-expanded="false" aria-controls="bib-${id}">BibTeX</button>`);
    const status = { published: "acc", under_review: "rev", preprint: "pre" }[p.status] || "pre";
    const q = [p.title, p.authors.join(" "), p.venue, p.venue_note || "", p.year].join(" ").toLowerCase();
    return `<li class="pub${featured ? " pub--featured" : ""}" data-first="${p.first_author ? 1 : 0}" data-q="${esc(q)}">
      ${thumbHTML(p)}
      <div class="pub-body">
        <p class="pub-venue"><span class="venue venue--${status}">${esc(p.venue)}</span>${p.venue_note ? `<span class="venue-note">${esc(p.venue_note)}</span>` : ""}</p>
        <h3 class="pub-title">${title}</h3>
        ${featured && p.summary ? `<p class="pub-summary">${esc(p.summary)}</p>` : ""}
        <p class="pub-authors">${authorsHTML(p)}</p>
        ${p.venue_detail ? `<p class="pub-where">${esc(p.venue_detail)}</p>` : ""}
        <div class="pub-links">${links.join("")}</div>
        <div class="bib" id="bib-${id}" inert><div class="bib-inner"><div class="bib-box"><pre><code>${esc(bibtex(p))}</code></pre><button type="button" class="btn btn-sm bib-copy">Copy</button></div></div></div>
      </div>
    </li>`;
  }

  /* Figures added later without figure_size: size the frame once the image loads. */
  function autosizeThumbs(scope) {
    $$(".thumb[data-autosize] img", scope).forEach(img => {
      const fit = () => {
        const w = img.naturalWidth, h = img.naturalHeight; if (!w || !h || w >= h) return;
        const btn = img.parentElement; btn.classList.add("thumb--tall"); btn.style.aspectRatio = Math.max(0.75, w / h).toFixed(3);
      };
      if (img.complete) fit(); else img.addEventListener("load", fit, { once: true });
    });
  }

  /* ---------- Home: selected papers ---------- */
  const selected = $("#selected-pubs");
  if (selected) {
    selected.innerHTML = PUBS.filter(p => p.selected).map((p, i) => pubHTML(p, "h" + i, true)).join("");
    autosizeThumbs(selected);
  }

  /* ---------- Publications: full list, filter, search ---------- */
  const list = $("#pub-list");
  if (list) {
    const years = [...new Set(PUBS.map(p => p.year))].sort((a, b) => b - a);
    list.innerHTML = years.map(y => {
      const group = PUBS.filter(p => p.year === y);
      return `<section class="year-group" data-year="${y}">
        <h2 class="year-label">${y}<small data-year-count>${group.length} ${group.length === 1 ? "paper" : "papers"}</small></h2>
        <ol class="pubs">${group.map(p => pubHTML(p, "p" + PUBS.indexOf(p), false)).join("")}</ol>
      </section>`;
    }).join("");
    autosizeThumbs(list);
    $("#count-all").textContent = PUBS.length;
    $("#count-first").textContent = PUBS.filter(p => p.first_author).length;
    $("#pub-total").textContent = PUBS.length;

    let filter = "all", query = "";
    const apply = () => {
      const q = query.trim().toLowerCase();
      let shown = 0;
      $$(".year-group", list).forEach(g => {
        let n = 0;
        $$(".pub", g).forEach(li => {
          const ok = (filter === "all" || li.dataset.first === "1") && (!q || li.dataset.q.includes(q));
          li.hidden = !ok; if (ok) n++;
        });
        g.hidden = n === 0;
        $("[data-year-count]", g).textContent = `${n} ${n === 1 ? "paper" : "papers"}`;
        shown += n;
      });
      $("#pub-shown").textContent = shown;
      $("#pub-empty").hidden = shown > 0;
    };
    $$(".seg button").forEach(b => b.addEventListener("click", () => {
      filter = b.dataset.filter;
      $$(".seg button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      apply();
    }));
    $("#pub-search").addEventListener("input", e => { query = e.target.value; apply(); });
    apply();
  }

  /* ---------- Figure lightbox ---------- */
  const lb = $("#lightbox");
  function openFigure(key) {
    const p = PUBS.find(x => x.figure === key); if (!p || !lb) return;
    const img = $("#lb-img"); img.src = `${FIG_DIR}${p.figure}.webp`; img.alt = p.figure_caption || `Figure from ${p.title}`;
    const cap = $("#lb-cap"); cap.textContent = p.figure_caption || ""; cap.hidden = !p.figure_caption;
    $("#lb-title").textContent = p.title;
    const href = p.arxiv ? arxivURL(p.arxiv) : p.website || "";
    const link = $("#lb-link"); link.hidden = !href; if (href) link.href = href;
    if (typeof lb.showModal === "function") lb.showModal(); else lb.setAttribute("open", "");
  }
  if (lb) {
    $("#lb-close").addEventListener("click", () => lb.close());
    lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
  }

  /* ---------- Clicks: BibTeX, copy, figures ---------- */
  document.addEventListener("click", e => {
    const tog = e.target.closest(".bib-toggle");
    if (tog) {
      const panel = document.getElementById(tog.getAttribute("aria-controls"));
      const open = tog.getAttribute("aria-expanded") !== "true";
      tog.setAttribute("aria-expanded", String(open)); panel.classList.toggle("is-open", open); panel.inert = !open;
      return;
    }
    const bc = e.target.closest(".bib-copy");
    if (bc) { const code = bc.parentElement.querySelector("code"); copyText(code.textContent, code); return; }
    const em = e.target.closest("[data-copy]");
    if (em) { copyText(em.dataset.copy, $(".email-text", em)); return; }
    const fig = e.target.closest("[data-fig]");
    if (fig) openFigure(fig.dataset.fig);
  });

  /* ---------- WeChat popover ---------- */
  const wBtn = $("#wechat-btn"), wPop = $("#wechat-pop");
  if (wBtn && wPop) {
    const closePop = () => { if (!wPop.hidden) { wPop.hidden = true; wBtn.setAttribute("aria-expanded", "false"); } };
    wBtn.addEventListener("click", e => {
      e.stopPropagation();
      if (!wPop.hidden) { closePop(); return; }
      wPop.hidden = false; wBtn.setAttribute("aria-expanded", "true");
      const r = wBtn.getBoundingClientRect(), vw = root.clientWidth;
      wPop.style.left = Math.max(12, Math.min(r.left, vw - wPop.offsetWidth - 12)) + "px";
      wPop.style.top = (r.bottom + 10) + "px";
    });
    document.addEventListener("click", e => { if (!e.target.closest("#wechat-pop")) closePop(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !wPop.hidden) { closePop(); wBtn.focus(); } });
    window.addEventListener("scroll", closePop, { passive: true });
    window.addEventListener("resize", closePop);
  }

  /* ---------- Theme (remembered per browser) ---------- */
  const mqDark = window.matchMedia("(prefers-color-scheme: dark)");
  const effectiveTheme = () => root.dataset.theme || (mqDark.matches ? "dark" : "light");
  const themeBtn = $("#theme-toggle");
  const syncThemeLabel = () => {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    themeBtn.setAttribute("aria-label", `Switch to ${next} theme`); themeBtn.title = `Switch to ${next} theme`;
  };
  themeBtn.addEventListener("click", () => {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncThemeLabel();
  });
  if (mqDark.addEventListener) mqDark.addEventListener("change", syncThemeLabel);
  syncThemeLabel();

  /* ---------- Header ---------- */
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 4);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  if ("ResizeObserver" in window) new ResizeObserver(() => root.style.setProperty("--header-h", header.offsetHeight + "px")).observe(header);
})();
