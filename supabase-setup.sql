-- Marvel Tour — Supabase Setup
-- Изпълнете тези команди в Supabase SQL Editor

-- 1. Таблица за запитвания
create table if not exists inquiries (
  id          bigint generated always as identity primary key,
  offer_id    integer,
  offer_title text,
  name        text not null,
  phone       text not null,
  email       text,
  people      text,
  preferred_date text,
  message     text,
  status      text default 'new',
  created_at  timestamptz default now()
);

-- 2. Таблица за прегледи на оферти
create table if not exists offer_views (
  id          bigint generated always as identity primary key,
  offer_id    integer,
  offer_title text,
  created_at  timestamptz default now()
);

-- 3. Таблица за посещения на страници
create table if not exists page_views (
  id          bigint generated always as identity primary key,
  page        text,
  created_at  timestamptz default now()
);

-- 4. Row Level Security — разрешете вмъкване от анонимни потребители
alter table inquiries enable row level security;
alter table offer_views enable row level security;
alter table page_views enable row level security;

-- Политики за INSERT (всеки може да вмъква)
create policy "Allow insert inquiries" on inquiries for insert with check (true);
create policy "Allow insert offer_views" on offer_views for insert with check (true);
create policy "Allow insert page_views" on page_views for insert with check (true);

-- Политики за SELECT
-- Прегледите/посещенията НЕ съдържат лични данни → четими с anon ключа (за статистиката в админа).
create policy "Allow anon select offer_views" on offer_views for select to anon using (true);
create policy "Allow anon select page_views"  on page_views  for select to anon using (true);
-- Запитванията съдържат ЛИЧНИ ДАННИ (имена, телефони) → четими само от authenticated (Supabase login),
-- за да не са публично достъпни през anon ключа, който е вграден в сайта.
create policy "Allow select inquiries" on inquiries for select using (auth.role() = 'authenticated');

-- Политики за UPDATE/DELETE (само admin)
create policy "Allow update inquiries" on inquiries for update using (auth.role() = 'authenticated');
create policy "Allow delete inquiries" on inquiries for delete using (auth.role() = 'authenticated');
