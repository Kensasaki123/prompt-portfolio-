const profile = window.PORTFOLIO_PROFILE;
const $ = (selector) => document.querySelector(selector);
const safeUrl = (url) => { try { const parsed = new URL(url); return ["http:", "https:"].includes(parsed.protocol) && !url.includes("your-username") ? parsed.href : ""; } catch { return ""; } };

function renderProfile() {
  const setText = (selector, value) => { const element = $(selector); if (element && value) element.textContent = value; };
  setText("#brand-name", profile.name); setText("#footer-name", profile.name); setText("#hero-name", profile.name);
  setText("#location", profile.location); setText("#hero-intro", profile.intro); setText("#about-copy", profile.about); setText("#education-copy", profile.education);
  setText("#year", new Date().getFullYear());
  if (profile.avatar) { const photo = $("#profile-photo"); photo.src = profile.avatar; photo.loading = "lazy"; }
  const github = safeUrl(profile.github); ["#github-link", "#contact-github"].forEach((s) => { if (github) $(s).href = github; });
  const linkedin = safeUrl(profile.linkedin); if (linkedin) $("#linkedin-link").href = linkedin;
  const mail = profile.email && profile.email !== "hello@example.com" ? profile.email : "";
  if (mail) { $("#email-link").href = `mailto:${mail}`; $("#email-link").innerHTML = `${escapeHtml(mail)} <span>↗</span>`; }
  $("#skill-list").innerHTML = profile.skills.map((skill, index) => `<div class="skill-item"><span class="mono">0${index + 1}</span><span>${escapeHtml(skill)}</span><span class="skill-arrow">↗</span></div>`).join("");
  const needsSetup = profile.projects.some((project) => !safeUrl(project.repo));
  $("#link-note").textContent = needsSetup ? "I couldn't match these five assignment projects to repositories on your public GitHub yet. Add the correct repository URLs in profile.js when available." : "";
  $("#link-note").hidden = !needsSetup;
}

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }

const categories = ["All", ...new Set(profile.projects.map((project) => project.category))];
let activeCategory = "All";
function renderFilters() {
  $("#filters").innerHTML = categories.map((category) => `<button type="button" class="filter-chip ${category === activeCategory ? "active" : ""}" data-category="${escapeHtml(category)}" aria-pressed="${category === activeCategory}">${escapeHtml(category)}</button>`).join("");
}
function renderProjects() {
  const query = $("#project-search").value.trim().toLowerCase();
  const filtered = profile.projects.filter((project) => (activeCategory === "All" || project.category === activeCategory) && `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase().includes(query));
  $("#results-count").textContent = `${filtered.length} ${filtered.length === 1 ? "project" : "projects"} found`;
  $("#project-grid").innerHTML = filtered.length ? filtered.map((project) => {
    const repo = safeUrl(project.repo); const live = safeUrl(project.live);
    return `<article class="project-card"><div class="card-top"><span class="project-number">${escapeHtml(project.number)}</span><span class="project-category">${escapeHtml(project.category)}</span></div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.description)}</p><div class="tech-list">${project.tech.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div><div class="card-links">${repo ? `<a href="${repo}" target="_blank" rel="noreferrer">Repository ↗</a>` : "<span class=\"link-unset\">Add repository URL</span>"}${live ? `<a href="${live}" target="_blank" rel="noreferrer">Live app ↗</a>` : ""}</div></article>`;
  }).join("") : `<div class="empty-state">No projects match that search. Try a project name or technology.</div>`;
}
$("#filters").addEventListener("click", (event) => { const button = event.target.closest("[data-category]"); if (!button) return; activeCategory = button.dataset.category; renderFilters(); renderProjects(); });
$("#project-search").addEventListener("input", renderProjects);

const themeToggle = $("#theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme"); if (savedTheme) document.documentElement.dataset.theme = savedTheme;
themeToggle.addEventListener("click", () => { const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = next; localStorage.setItem("portfolio-theme", next); themeToggle.querySelector(".toggle-label").textContent = next === "dark" ? "Light mode" : "Dark mode"; });

const panel = $("#chat-panel"); const messages = $("#chat-messages");
$("#chat-launcher").addEventListener("click", () => { panel.hidden = false; $("#chat-input").focus(); });
$("#chat-close").addEventListener("click", () => { panel.hidden = true; });
document.querySelectorAll(".suggestions button").forEach((button) => button.addEventListener("click", () => { $("#chat-input").value = button.textContent; $("#chat-form").requestSubmit(); }));
function addMessage(text, role) { const element = document.createElement("div"); element.className = `message ${role}-message`; element.textContent = text; messages.append(element); messages.scrollTop = messages.scrollHeight; return element; }
$("#chat-form").addEventListener("submit", async (event) => {
  event.preventDefault(); const input = $("#chat-input"); const question = input.value.trim(); if (!question) return;
  addMessage(question, "user"); input.value = ""; const pending = addMessage("Thinking…", "assistant");
  try {
    const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) });
    const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.error || "The assistant could not respond right now."); pending.textContent = data.answer || "The assistant returned an empty response. Please try again.";
  } catch (error) { pending.textContent = error.message || "I couldn't reach the assistant. Please try again in a moment."; }
  messages.scrollTop = messages.scrollHeight;
});

renderProfile(); renderFilters(); renderProjects();
