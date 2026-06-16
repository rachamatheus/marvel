# Marvel Tour — Push нотификации (Фаза 2)

Праща известия („нова оферта", „промоция") до клиентите, които са инсталирали
приложението и са разрешили известия. Безплатно на Cloudflare.

```
Клиент (pwa.js) ──subscribe──▶ Push Worker ──▶ Cloudflare KV (абонати)
Админ (Изпрати известие) ──/send──▶ Push Worker ──Web Push──▶ телефоните на клиентите
```

## Стъпки за пускане

### 1. Генерирай VAPID ключове
```bash
npx web-push generate-vapid-keys
```
Записва **Public Key** и **Private Key** (base64url).

### 2. Настрой Worker-а
```bash
cd push
npx wrangler login

# KV хранилище за абонатите
npx wrangler kv namespace create SUBS
#   → копирай id-то в wrangler.toml (kv_namespaces → id)
```
В `wrangler.toml` попълни:
- `VAPID_PUBLIC_KEY` = публичния ключ
- `VAPID_SUBJECT` = `mailto:твоят-имейл`
- `id` на KV namespace-а

Тайните:
```bash
npx wrangler secret put VAPID_PRIVATE_KEY    # приватния VAPID ключ
npx wrangler secret put ADMIN_TOKEN          # измисли таен код (за бутона в админа)
npx wrangler deploy
```
Worker-ът ти дава адрес, напр. `https://marveltour-push.ТВОЙ.workers.dev`.

### 3. Свържи сайта (3 места — един и същ адрес + публичен ключ)
- `../pwa.js` → `PUSH_ENDPOINT` и `VAPID_PUBLIC_KEY`
- `../sw.js` → `PUSH_ENDPOINT`
- `../admin/admin.js` → `PUSH_ENDPOINT`
После вдигни версиите (`pwa.js?v=`, `app.js`/`sw` кеш) и пушни.

### 4. Изпращане
Админ панел → **Настройки → 🔔 Изпрати известие** → въведи `ADMIN_TOKEN` (пази се локално),
заглавие и текст → „Изпрати". Отива до всички абонати.

## Бележки
- **iPhone:** известията работят само ако приложението е **инсталирано** (Add to Home Screen), iOS 16.4+.
- Клиентът трябва сам да натисне **„🔔 Получавай оферти"** и да разреши.
- Известията са **payload-less**: Worker-ът пази последното съобщение в KV (`/latest`),
  а service worker-ът го дърпа при получаване — затова не е нужно сложно шифроване.
- Безплатните лимити на Cloudflare (Workers + KV) са предостатъчни за това.
