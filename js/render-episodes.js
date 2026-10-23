/**
 * Renders everything driven by EPISODES / TOPICS (see episodes-data.js):
 *   [data-episode-list="home"]  — featured episodes, max 3 (homepage)
 *   [data-episode-list="all"]  — full archive with topic filter + search (episodes.html)
 *   [data-cover-list]          — compact "what we cover" rows (homepage)
 *   [data-topics-grid]         — topic cards with live counts (topics.html)
 */
(function () {
  const PLAY_ICON =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function episodeCard(ep) {
    const topic = TOPICS[ep.topic];
    const thumb = ep.youtubeId
      ? `<div class="episode-thumb">
           <img src="https://i.ytimg.com/vi/${ep.youtubeId}/hqdefault.jpg" alt="" loading="lazy" />
           <span class="play">${PLAY_ICON}</span>
         </div>`
      : `<div class="episode-thumb is-placeholder">
           ${PLAY_ICON}
           <span class="ph-label">Add YouTube video ID</span>
         </div>`;

    const href = ep.youtubeId
      ? `https://www.youtube.com/watch?v=${ep.youtubeId}`
      : "episodes.html";

    return `
      <a class="episode-card" href="${href}" ${ep.youtubeId ? 'target="_blank" rel="noopener"' : ""} data-topic="${ep.topic}">
        ${thumb}
        <div class="episode-body">
          <span class="episode-meta">
            <span class="topic-tag t-${ep.topic}">${topic.tag}</span>
            <span class="ep-num">Ep. ${ep.number}</span>
          </span>
          <h3>${ep.title}</h3>
          <p>${ep.description}</p>
          <div class="episode-foot">
            <span>${formatDate(ep.date)}</span>
            <span>${ep.duration}</span>
          </div>
        </div>
      </a>`;
  }

  function byDate(list) {
    return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function renderHomeList() {
    const homeList = document.querySelector('[data-episode-list="home"]');
    if (!homeList) return;

    const sorted = byDate(EPISODES);
    const featured = sorted.filter((e) => e.featured).slice(0, 3);
    const list = featured.length ? featured : sorted.slice(0, 3);

    homeList.innerHTML = list.length
      ? list.map(episodeCard).join("")
      : `<p class="empty-state"><strong>No episodes yet.</strong>Stay tuned.</p>`;
  }

  function renderCoverList() {
    const coverList = document.querySelector("[data-cover-list]");
    if (!coverList) return;

    coverList.innerHTML = Object.entries(TOPICS)
      .map(([key, topic]) => {
        const count = EPISODES.filter((e) => e.topic === key).length;
        return `
          <a class="cover-row" href="episodes.html?topic=${key}">
            <span class="topic-tag t-${key}">${topic.tag}</span>
            <h3>${topic.label}</h3>
            <p>${topic.description}</p>
            <span class="count">${count} episode${count === 1 ? "" : "s"}</span>
          </a>`;
      })
      .join("");
  }

  function renderTopicsGrid() {
    const grid = document.querySelector("[data-topics-grid]");
    if (!grid) return;

    grid.innerHTML = Object.entries(TOPICS)
      .map(([key, topic]) => {
        const count = EPISODES.filter((e) => e.topic === key).length;
        return `
          <div class="topic-card">
            <span class="bar-${key}" style="position:absolute;top:0;left:0;width:100%;height:4px;"></span>
            <h3>${topic.label}</h3>
            <p>${topic.description}</p>
            <div class="topic-card-foot">
              <span class="topic-count topic-tag t-${key}">${count} episode${count === 1 ? "" : "s"}</span>
              <a class="topic-browse" href="episodes.html?topic=${key}">Browse &rarr;</a>
            </div>
          </div>`;
      })
      .join("");
  }

  function renderAllList() {
    const allList = document.querySelector('[data-episode-list="all"]');
    if (!allList) return;

    const sorted = byDate(EPISODES);
    const filterBar = document.querySelector("[data-filter-bar]");
    const searchInput = document.getElementById("episode-search");
    const emptyState = document.getElementById("episode-empty");
    const countEl = document.getElementById("result-count");

    const params = new URLSearchParams(window.location.search);
    let activeTopic = params.get("topic") && TOPICS[params.get("topic")] ? params.get("topic") : "all";

    function applyFilters() {
      const q = (searchInput && searchInput.value.trim().toLowerCase()) || "";
      const filtered = sorted.filter((e) => {
        const matchesTopic = activeTopic === "all" || e.topic === activeTopic;
        const matchesQuery =
          !q ||
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q);
        return matchesTopic && matchesQuery;
      });

      allList.innerHTML = filtered.map(episodeCard).join("");
      if (emptyState) emptyState.hidden = filtered.length !== 0;
      if (countEl) countEl.textContent = `${filtered.length} episode${filtered.length === 1 ? "" : "s"}`;

      if (filterBar) {
        filterBar.querySelectorAll(".filter-tab").forEach((tab) => {
          tab.classList.toggle("is-active", tab.dataset.topic === activeTopic);
        });
      }
    }

    if (filterBar) {
      filterBar.querySelectorAll(".filter-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          activeTopic = tab.dataset.topic;
          applyFilters();
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    applyFilters();
  }

  function render() {
    renderHomeList();
    renderCoverList();
    renderTopicsGrid();
    renderAllList();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
