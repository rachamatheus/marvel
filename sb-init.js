// Shared Supabase initializer for Marvel Tour.
// Reads config saved from the admin Settings page (localStorage) or from
// optional hardcoded constants below. Exposes window.__mtSupabase when ready,
// so the public site (offer views, inquiries) and the admin panel can use it.
//
// To hardcode keys for all visitors (the anon key is public/safe for client code),
// fill these two constants. Otherwise enter them in Admin → Настройки.
window.MT_SB_URL = window.MT_SB_URL || 'https://ulmnmaxekfqmhseuyqtj.supabase.co';
window.MT_SB_KEY = window.MT_SB_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbW5tYXhla2ZxbWhzZXV5cXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTA0MzYsImV4cCI6MjA5NjQyNjQzNn0.baAJ3k3F3rbD_ymq6TyyHvtT1YpAoQ9qdBZIan_cdrg';

(function () {
  function read(k) {
    try { var v = localStorage.getItem(k); return (v && v.trim()) ? v.trim() : ''; } catch (e) { return ''; }
  }
  var url = read('mt_sb_url') || window.MT_SB_URL;
  var key = read('mt_sb_key') || window.MT_SB_KEY;
  window.__mtSupabaseReady = false;
  if (url && key && /^https:\/\/.+\.supabase\.co/.test(url) && typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    try {
      window.__mtSupabase = window.supabase.createClient(url, key);
      window.__mtSupabaseReady = true;
    } catch (e) {
      window.__mtSupabase = null;
    }
  }
})();
