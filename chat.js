/* Marvel Tour — AI чат-бот widget.
 * Самостоятелен: инжектира си стиловете и HTML-а на всяка страница.
 * Праща разговора към Cloudflare Worker-а (виж chatbot/), който говори с Claude.
 *
 * НАСТРОЙКА: смени CHAT_ENDPOINT с адреса на твоя деплойнат Worker.
 */
(function () {
  if (window.__mtChatInit) return;
  window.__mtChatInit = true;

  // ⬇⬇⬇ СМЕНИ ТОВА с адреса на Worker-а след деплой ⬇⬇⬇
  var CHAT_ENDPOINT = 'https://marveltour-chat.YOUR-SUBDOMAIN.workers.dev';
  // ⬆⬆⬆ напр. https://marveltour-chat.ivan.workers.dev ⬆⬆⬆

  var GREETING = 'Здравейте! 👋 Аз съм виртуалният асистент на Marvel Tour. С какво да помогна — почивка, екскурзия или нещо екзотично?';

  var history = []; // [{role, content}]

  // ---------- Стилове ----------
  var css = `
  .mt-chat-btn{position:fixed;right:22px;bottom:22px;z-index:9998;width:60px;height:60px;border:0;border-radius:50%;
    background:linear-gradient(135deg,#1e3a8a,#2563eb);color:#fff;font-size:26px;cursor:pointer;
    box-shadow:0 10px 30px rgba(8,20,50,.35);transition:transform .15s, box-shadow .15s;display:flex;align-items:center;justify-content:center;}
  .mt-chat-btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 38px rgba(8,20,50,.45);}
  .mt-chat-panel{position:fixed;right:22px;bottom:94px;z-index:9999;width:360px;max-width:calc(100vw - 28px);height:520px;max-height:calc(100vh - 130px);
    background:#fff;border-radius:18px;box-shadow:0 24px 70px rgba(8,20,50,.3);display:none;flex-direction:column;overflow:hidden;
    font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;}
  .mt-chat-panel.open{display:flex;animation:mtChatIn .18s ease-out;}
  @keyframes mtChatIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .mt-chat-head{background:linear-gradient(135deg,#1e3a8a,#2563eb);color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px;}
  .mt-chat-head .mt-ava{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:18px;}
  .mt-chat-head .mt-t{font-weight:700;font-size:.98rem;line-height:1.1;}
  .mt-chat-head .mt-s{font-size:.72rem;opacity:.85;}
  .mt-chat-head .mt-x{margin-left:auto;background:none;border:0;color:#fff;font-size:22px;cursor:pointer;opacity:.85;line-height:1;}
  .mt-chat-body{flex:1;overflow-y:auto;padding:14px;background:#f5f8fc;display:flex;flex-direction:column;gap:10px;}
  .mt-msg{max-width:84%;padding:9px 13px;border-radius:14px;font-size:.9rem;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;}
  .mt-msg.bot{align-self:flex-start;background:#fff;color:#1f2937;border:1px solid #e5e7eb;border-bottom-left-radius:4px;}
  .mt-msg.user{align-self:flex-end;background:#2563eb;color:#fff;border-bottom-right-radius:4px;}
  .mt-typing{align-self:flex-start;color:#6b7280;font-size:.85rem;padding:4px 6px;}
  .mt-typing span{display:inline-block;width:6px;height:6px;margin:0 1px;border-radius:50%;background:#9ca3af;animation:mtBlink 1.2s infinite both;}
  .mt-typing span:nth-child(2){animation-delay:.2s}.mt-typing span:nth-child(3){animation-delay:.4s}
  @keyframes mtBlink{0%,80%,100%{opacity:.3}40%{opacity:1}}
  .mt-chat-foot{display:flex;gap:8px;padding:10px;border-top:1px solid #eef0f4;background:#fff;}
  .mt-chat-foot textarea{flex:1;resize:none;border:1px solid #d8dee9;border-radius:12px;padding:9px 12px;font-size:.9rem;font-family:inherit;max-height:90px;outline:none;}
  .mt-chat-foot textarea:focus{border-color:#2563eb;}
  .mt-chat-foot button{border:0;border-radius:12px;background:#2563eb;color:#fff;width:42px;font-size:18px;cursor:pointer;transition:background .15s;}
  .mt-chat-foot button:hover{background:#1d4ed8;}
  .mt-chat-foot button:disabled{opacity:.5;cursor:default;}
  `;
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- HTML ----------
  var btn = document.createElement('button');
  btn.className = 'mt-chat-btn';
  btn.setAttribute('aria-label', 'Чат с Marvel Tour');
  btn.innerHTML = '💬';

  var panel = document.createElement('div');
  panel.className = 'mt-chat-panel';
  panel.innerHTML =
    '<div class="mt-chat-head">' +
      '<div class="mt-ava">✈️</div>' +
      '<div><div class="mt-t">Marvel Tour асистент</div><div class="mt-s">Обикновено отговаря веднага</div></div>' +
      '<button class="mt-x" aria-label="Затвори">×</button>' +
    '</div>' +
    '<div class="mt-chat-body" id="mtChatBody"></div>' +
    '<div class="mt-chat-foot">' +
      '<textarea id="mtChatInput" rows="1" placeholder="Напишете съобщение…"></textarea>' +
      '<button id="mtChatSend" aria-label="Изпрати">➤</button>' +
    '</div>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var body = panel.querySelector('#mtChatBody');
  var input = panel.querySelector('#mtChatInput');
  var sendBtn = panel.querySelector('#mtChatSend');
  var greeted = false;

  function addMsg(text, who) {
    var d = document.createElement('div');
    d.className = 'mt-msg ' + who;
    d.textContent = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }

  function openPanel() {
    panel.classList.add('open');
    if (!greeted) { addMsg(GREETING, 'bot'); greeted = true; }
    input.focus();
  }
  function closePanel() { panel.classList.remove('open'); }

  btn.addEventListener('click', function () {
    panel.classList.contains('open') ? closePanel() : openPanel();
  });
  panel.querySelector('.mt-x').addEventListener('click', closePanel);

  function autoGrow() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 90) + 'px'; }
  input.addEventListener('input', autoGrow);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  sendBtn.addEventListener('click', send);

  function send() {
    var text = input.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    history.push({ role: 'user', content: text });
    input.value = ''; autoGrow();
    sendBtn.disabled = true;

    var typing = document.createElement('div');
    typing.className = 'mt-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        typing.remove();
        var reply = (data && data.reply) ? data.reply
          : 'Извинявам се, в момента не мога да отговоря. Свържете се с нас от страница „Контакти".';
        addMsg(reply, 'bot');
        history.push({ role: 'assistant', content: reply });
      })
      .catch(function () {
        typing.remove();
        addMsg('Възникна проблем с връзката. Опитайте отново или ни пишете от „Контакти".', 'bot');
      })
      .finally(function () { sendBtn.disabled = false; input.focus(); });
  }
})();
