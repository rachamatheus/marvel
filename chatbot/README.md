# Marvel Tour — AI чат-бот (с Claude)

Чат-бот за сайта, който говори с твоя тон и знае за Marvel Tour. Понеже сайтът е
статичен (GitHub Pages), API ключът **не може** да стои в браузъра — пази го
малък безплатен Cloudflare Worker, който е посредник към Claude.

```
Браузър (chat.js)  →  Cloudflare Worker (worker.js, пази ключа)  →  Claude API
```

## Какво ти трябва (еднократно)
1. **Anthropic API ключ** — от https://console.anthropic.com → Settings → API Keys.
   (Това е платено по употреба — всеки разговор струва малко. Виж „Цена" по-долу.)
2. **Безплатен Cloudflare акаунт** — https://dash.cloudflare.com/sign-up
3. **Node.js** — за командата `npx wrangler` (https://nodejs.org).

## Стъпки за деплой

```bash
# 1. Влез в папката
cd chatbot

# 2. Влез в Cloudflare (отваря браузър за вход)
npx wrangler login

# 3. Качи API ключа като secret (НЕ се пише в код)
npx wrangler secret put ANTHROPIC_API_KEY
#   → постави ключа, когато попита

# 4. Деплойни Worker-а
npx wrangler deploy
#   → ще ти даде адрес, напр.:
#     https://marveltour-chat.ТВОЯ-АКАУНТ.workers.dev
```

## Свържи сайта с Worker-а
Отвори `../chat.js` и смени реда:
```js
var CHAT_ENDPOINT = 'https://marveltour-chat.YOUR-SUBDOMAIN.workers.dev';
```
с адреса от стъпка 4. После вдигни версията на `chat.js?v=` в страниците и пушни.

## По-сигурно (по избор)
В `wrangler.toml` смени `ALLOWED_ORIGIN = "*"` с твоя адрес, напр.
`ALLOWED_ORIGIN = "https://rachamatheus.github.io"`, и пусни `npx wrangler deploy` пак.
Така само твоят сайт може да вика бота.

## Смяна на модела / цена
- В `wrangler.toml`: `MODEL` контролира кой Claude модел се ползва.
  - `claude-opus-4-8` — най-умен (по-скъп). Default.
  - `claude-haiku-4-5` — бърз и евтин, подходящ за прост FAQ бот → най-ниска цена.
  - `claude-sonnet-4-6` — баланс.
- За туристически FAQ бот **Haiku** обикновено е напълно достатъчен и в пъти по-евтин.
  Смени реда на `MODEL = "claude-haiku-4-5"` и деплойни пак.

## Промяна на личността/знанието на бота
Редактирай `SYSTEM_PROMPT` най-горе в `worker.js` (тон, какво знае, правила),
после `npx wrangler deploy`. Ботът е инструктиран да **не измисля** конкретни
цени/наличности, а да насочва към офертите и контакта — за да не подвежда клиенти.

## Локален тест
```bash
cd chatbot
npx wrangler dev   # пуска Worker локално; chat.js → сложи адреса от конзолата
```
