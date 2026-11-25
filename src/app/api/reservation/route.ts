import { NextResponse } from 'next/server';

/*
 * Reservation requests.
 * When TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are configured, the request is
 * delivered to the restaurant's Telegram chat through the Bot API and the
 * response reports success only after Telegram confirms delivery.
 * Without them the endpoint answers 503 and the site falls back to the
 * "send it yourself in Telegram" flow — it never pretends a request was sent.
 */

type Body = Partial<Record<'lang' | 'date' | 'time' | 'guests' | 'occasion' | 'name' | 'phone' | 'email' | 'notes' | 'website', string>>;

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Best-effort, per-instance throttle against accidental double submits and floods.
const recent = new Map<string, number[]>();
function throttled(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) || []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > 5;
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const r = {
    lang: ['en', 'ru', 'uz'].includes(String(body.lang)) ? String(body.lang) : 'en',
    date: str(body.date, 10),
    time: str(body.time, 5),
    guests: str(body.guests, 3),
    occasion: str(body.occasion, 40),
    name: str(body.name, 80),
    phone: str(body.phone, 32),
    email: str(body.email, 120),
    notes: str(body.notes, 1000),
  };

  const digits = r.phone.replace(/\D/g, '');
  const errors: string[] = [];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date) || Number.isNaN(Date.parse(r.date))) errors.push('date');
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(r.time)) errors.push('time');
  if (!r.name) errors.push('name');
  if (digits.length < 7 || digits.length > 15) errors.push('phone');
  if (r.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) errors.push('email');
  if (!/^(?:[1-6]|7\+)$/.test(r.guests)) errors.push('guests');
  // Allow one day of slack for time zones; Tashkent is UTC+5.
  if (!errors.includes('date') && Date.parse(r.date) < Date.now() - 36 * 3600_000) errors.push('date');
  if (errors.length) return NextResponse.json({ ok: false, error: 'invalid', fields: errors }, { status: 422 });

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (throttled(ip)) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });

  const lines = ['<b>New table request — ORA website</b>', `Date: ${esc(r.date)}`, `Time: ${esc(r.time)}`, `Guests: ${esc(r.guests)}`];
  if (r.occasion) lines.push(`Occasion: ${esc(r.occasion)}`);
  lines.push(`Name: ${esc(r.name)}`, `Phone: ${esc(r.phone)}`);
  if (r.email) lines.push(`Email: ${esc(r.email)}`);
  if (r.notes) lines.push(`Notes: ${esc(r.notes)}`);
  lines.push(`Site language: ${r.lang.toUpperCase()}`, '', '<i>Not confirmed yet: please contact the guest to confirm.</i>');
  const text = lines.join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
    if (!res.ok || !data.ok) {
      console.error('reservation: telegram rejected the message', res.status);
      return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
    }
  } catch (err) {
    console.error('reservation: telegram unreachable', err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
