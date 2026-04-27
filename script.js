
    // ── Data ──────────────────────────────────────────────────────
    const quotes = [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", cat: "motivation" },
      { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", cat: "wisdom" },
      { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", cat: "perseverance" },
      { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", cat: "life" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", cat: "motivation" },
      { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa", cat: "life" },
      { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt", cat: "perseverance" },
      { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead", cat: "wisdom" },
      { text: "Do not go where the path may lead; go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson", cat: "motivation" },
      { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou", cat: "perseverance" },
      { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", cat: "perseverance" },
      { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", cat: "life" },
      { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth", cat: "motivation" },
      { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller", cat: "life" },
      { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison", cat: "perseverance" },
      { text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.", author: "Dr. Seuss", cat: "wisdom" },
      { text: "If life were predictable it would cease to be life and be without flavor.", author: "Eleanor Roosevelt", cat: "life" },
      { text: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey", cat: "wisdom" },
      { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein", cat: "motivation" },
      { text: "The mind is everything. What you think you become.", author: "Buddha", cat: "wisdom" },
    ];

    const categories = ["all", "motivation", "wisdom", "perseverance", "life"];

    // ── State ─────────────────────────────────────────────────────
    let activeCat = "all";
    let lastIndex = -1;

    // ── Helpers ───────────────────────────────────────────────────

    /** Returns the quotes matching the active category filter */
    function getPool() {
      return activeCat === "all"
        ? quotes
        : quotes.filter(q => q.cat === activeCat);
    }

    /** Pick a random index that is different from the last one */
    function randomIndex(pool) {
      if (pool.length === 1) return 0;
      let idx;
      do {
        idx = Math.floor(Math.random() * pool.length);
      } while (idx === lastIndex);
      return idx;
    }

    // ── Render quote ──────────────────────────────────────────────
    function nextQuote() {
      const pool = getPool();
      const idx  = randomIndex(pool);
      lastIndex  = idx;
      const q    = pool[idx];

      const card = document.getElementById("quoteCard");

      // fade out → update → fade in
      card.classList.add("fade");
      setTimeout(() => {
        document.getElementById("quoteText").textContent   = q.text;
        document.getElementById("quoteAuthor").textContent = q.author;
        document.getElementById("cardTag").textContent     = q.cat;
        document.getElementById("counter").textContent     =
          `${idx + 1} of ${pool.length} quotes`;
        card.classList.remove("fade");
      }, 350);
    }

    // ── Category filter ───────────────────────────────────────────
    function renderCategories() {
      const container = document.getElementById("categories");
      container.innerHTML = categories
        .map(c => `
          <button
            class="cat-btn${activeCat === c ? " active" : ""}"
            onclick="selectCategory('${c}')">
            ${c}
          </button>`)
        .join("");
    }

    function selectCategory(cat) {
      activeCat = cat;
      lastIndex = -1;          // reset so we don't skip the first card
      renderCategories();
      nextQuote();
    }

    // ── Copy to clipboard ─────────────────────────────────────────
    function copyQuote() {
      const text   = document.getElementById("quoteText").textContent;
      const author = document.getElementById("quoteAuthor").textContent;
      const full   = `"${text}" — ${author}`;

      navigator.clipboard.writeText(full).then(() => {
        const btn = document.getElementById("copyBtn");
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = "Copy"; }, 1800);
      }).catch(() => {
        // fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = full;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      });
    }

    // ── Init ──────────────────────────────────────────────────────
    renderCategories();
    nextQuote();