/**
 * Marvel Tour — AI чат-бот посредник (Cloudflare Worker).
 *
 * Пази ANTHROPIC_API_KEY като secret и говори с Claude API.
 * Браузърът (chat.js) праща историята на разговора; Worker-ът добавя
 * системния промпт с контекст за Marvel Tour и връща отговора.
 *
 * Secrets/vars, които се задават при деплой:
 *   ANTHROPIC_API_KEY  (secret)  — ключът от console.anthropic.com
 *   ALLOWED_ORIGIN     (var)     — напр. https://rachamatheus.github.io  (по избор; иначе '*')
 *   MODEL              (var)     — по избор; default claude-opus-4-8
 */

const SYSTEM_PROMPT = `Ти си виртуалният асистент на туристическа агенция „Marvel Tour" от Пловдив, България. Говориш на български, топло, кратко и услужливо — като любезен служител на рецепцията.

ЗА АГЕНЦИЯТА:
- Над 20 години опит в туризма. Офис: ул. „Карловска" 22А, 4000 Пловдив.
- Предлага: почивки, екскурзии и екзотични пътувания по цял свят (над 60 дестинации).
- На сайта има и оферти „на живо" с реални цени и наличности: Хотели в Гърция, Хотели в Турция и Яхтен туризъм.
- Полезни страници: Общи условия, Политика за поверителност, Застраховки, Трансфери, Подаръчен ваучер, Индивидуални екскурзии.

КАК ПОМАГАШ:
- Отговаряй на въпроси за дестинации, видове пътувания, услуги, организация, документи, застраховки, трансфери, ваучери.
- Насочвай клиента към правилното място в сайта: „Разгледайте офертите в раздел Почивки/Екскурзии/Екзотика", „За реални цени и наличности вижте Хотели в Гърция/Турция на живо", „За индивидуална програма се свържете с нас".

ВАЖНИ ПРАВИЛА:
- НЕ измисляй конкретни цени, дати, наличности или номера на оферти. Ако те питат за точна цена/наличност, кажи честно, че те се променят, и насочи към съответната оферта на сайта или към контакт с офиса.
- За резервация или индивидуална оферта насочвай към страница „Контакти" или телефон/имейл на офиса.
- Бъди кратък: 2–4 изречения по подразбиране. Без излишни въведения. Дай директно полезния отговор.
- Ако въпросът не е свързан с пътувания или Marvel Tour, любезно върни разговора към туризма.`;

const CORS = (origin) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
});

export default {
  async fetch(request, env) {
    const allowed = env.ALLOWED_ORIGIN || '*';
    const origin = request.headers.get('Origin') || '';
    const corsOrigin = (allowed === '*' || origin === allowed) ? (allowed === '*' ? '*' : allowed) : allowed;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS(corsOrigin) });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, corsOrigin);
    }

    let body;
    try { body = await request.json(); } catch { return json({ error: 'Bad JSON' }, 400, corsOrigin); }

    // Валидирай и ограничи историята: само user/assistant, текстово съдържание.
    const incoming = Array.isArray(body.messages) ? body.messages : [];
    const messages = incoming
      .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-20) // максимум последните 20 реплики
      .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));

    if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
      return json({ error: 'Очаква се поне едно потребителско съобщение.' }, 400, corsOrigin);
    }

    const apiResp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: env.MODEL || 'claude-opus-4-8',
        max_tokens: 1024,
        system: [
          { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
        ],
        messages,
      }),
    });

    if (!apiResp.ok) {
      const detail = await apiResp.text().catch(() => '');
      return json({ error: 'Грешка от Claude API', status: apiResp.status, detail: detail.slice(0, 500) }, 502, corsOrigin);
    }

    const data = await apiResp.json();
    const reply = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim() || 'Извинявам се, нещо се обърка. Опитайте отново.';

    return json({ reply }, 200, corsOrigin);
  },
};

function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS(origin) },
  });
}
