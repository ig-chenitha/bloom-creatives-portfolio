/* Secure client-side moderation. RLS on the database is the security boundary. */
(() => {
  const API = "https://zkxtlbvgurziniicpdyg.supabase.co";
  const KEY = "sb_publishable_Q3IBH3JE1e6fGoqFQNUoig_FLufny0b";
  const OWNER = "chenithakodithuwakku999@gmail.com";
  let accessToken = "";
  let rows = [];
  let filter = "pending";
  const $ = (id) => document.getElementById(id);
  const headers = () => ({ apikey: KEY, Authorization: "Bearer " + accessToken, "Content-Type": "application/json" });
  const message = (id, text) => { $(id).textContent = text; };

  async function request(path, options = {}) {
    const response = await fetch(API + path, { ...options, headers: { apikey: KEY, Authorization: "Bearer " + accessToken, "Content-Type": "application/json", ...options.headers } });
    if (!response.ok) {
      let detail = "";
      try { const body = await response.json(); detail = body.msg || body.message || body.error_description || body.error || ""; } catch (_) {}
      throw new Error(detail || "Request failed (" + response.status + ").");
    }
    if (response.status === 204) return null;
    return response.json();
  }

  $("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = $("adminEmail").value.trim().toLowerCase();
    const password = $("adminPassword").value;
    if (email !== OWNER) { message("loginStatus", "This email is not authorised for the portfolio admin."); return; }
    const button = $("loginForm").querySelector("button[type=submit]");
    button.disabled = true; message("loginStatus", "Signing in…");
    try {
      const response = await fetch(API + "/auth/v1/token?grant_type=password", {
        method: "POST",
        headers: { apikey: KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok || !data.access_token) throw new Error(data.msg || data.message || "Sign-in failed. Check your email and password.");
      accessToken = data.access_token;
      $("loginPanel").hidden = true; $("dashboard").hidden = false;
      await loadReviews();
    } catch (error) { message("loginStatus", error.message); }
    finally { button.disabled = false; }
  });

  async function loadReviews() {
    message("dashboardStatus", "Loading reviews…");
    try {
      rows = await request("/rest/v1/client_feedback?select=id,name,email,rating,feedback,approved,created_at&order=created_at.desc&limit=200");
      render();
      message("dashboardStatus", rows.length + " review(s) loaded.");
    } catch (error) {
      message("dashboardStatus", error.message + " Make sure the supplied Supabase migration has been applied and this admin email has a confirmed Auth account.");
      $("reviews").replaceChildren();
    }
  }

  function render() {
    const host = $("reviews");
    host.replaceChildren();
    const visible = rows.filter((row) => filter === "all" || (filter === "approved" ? row.approved : !row.approved));
    if (!visible.length) { const empty = document.createElement("div"); empty.className = "empty"; empty.textContent = "No " + (filter === "all" ? "" : filter + " ") + "reviews found."; host.append(empty); return; }
    visible.forEach((row) => {
      const card = document.createElement("article"); card.className = "review";
      const head = document.createElement("div"); head.className = "review-head";
      const identity = document.createElement("div");
      const name = document.createElement("strong"); name.textContent = row.name;
      const meta = document.createElement("div"); meta.className = "meta"; meta.textContent = row.email + " · " + new Date(row.created_at).toLocaleString();
      identity.append(name, meta);
      const stars = document.createElement("span"); stars.className = "stars"; stars.textContent = "★".repeat(row.rating) + "☆".repeat(5 - row.rating);
      head.append(identity, stars);
      const body = document.createElement("p"); body.textContent = row.feedback;
      const state = document.createElement("div"); state.className = "meta"; state.textContent = row.approved ? "Published" : "Pending approval";
      const actions = document.createElement("div"); actions.className = "actions";
      const toggle = document.createElement("button"); toggle.className = "btn"; toggle.textContent = row.approved ? "Unpublish" : "Approve & publish";
      toggle.addEventListener("click", () => moderate(row, !row.approved, toggle));
      actions.append(toggle); card.append(head, body, state, actions); host.append(card);
    });
  }

  async function moderate(row, approved, button) {
    button.disabled = true;
    try {
      await request("/rest/v1/client_feedback?id=eq." + encodeURIComponent(row.id), { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ approved }) });
      row.approved = approved; render(); message("dashboardStatus", approved ? "Review published." : "Review unpublished.");
    } catch (error) { message("dashboardStatus", error.message); button.disabled = false; }
  }


  document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
    filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((tab) => tab.classList.toggle("active", tab === button));
    render();
  }));
  $("signOut").addEventListener("click", () => {
    accessToken = ""; rows = []; $("dashboard").hidden = true; $("loginPanel").hidden = false; $("loginForm").reset(); message("loginStatus", "Signed out.");
  });
})();
