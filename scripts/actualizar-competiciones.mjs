// Actualiza competiciones.json y competiciones.ics: añade torneos nuevos de Smoothcomp (España)
// y quita los que ya han pasado. Sin dependencias: Node 20+.
import fs from 'node:fs';
const LOG=[]; const _log=console.log; console.log=(...a)=>{ LOG.push(a.join(' ')); _log(...a); };

const UA = { 'user-agent': 'Mozilla/5.0 (FirstSip-bot; +https://github.com/Serrasan/first-zip)', 'accept-language': 'es,en;q=0.8' };
const LISTS = [
  'https://smoothcomp.com/en/events/upcoming?country=ES',
  'https://smoothcomp.com/es/events/upcoming?country=ES',
  'https://smoothcomp.com/en/events/upcoming',
];
const SPORT = /(jiu|bjj|grappl|submission|no[\s-]?gi|adcc|luta|sambo)/i;
const SPAIN = /^(es|esp|spain|españa|espanya)$/i;
const today = new Date().toISOString().slice(0, 10);

const data = JSON.parse(fs.readFileSync('competiciones.json', 'utf8'));
let comps = data.comps || [];
const known = new Set(comps.map(c => c.id));

async function get(url) {
  const r = await fetch(url, { headers: UA, redirect: 'follow' });
  if (!r.ok) throw new Error(r.status + ' ' + url);
  return r.text();
}
const meta = (html, prop) => (html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)`, 'i')) || [])[1];
const dec = s => (s || '').replace(/&amp;/g, '&').replace(/&#039;|&apos;/g, "'").replace(/&quot;/g, '"').trim();

function ldEvent(html) {
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      let j = JSON.parse(m[1]); j = Array.isArray(j) ? j : (j['@graph'] || [j]);
      const e = j.find(x => /Event/i.test([].concat(x['@type'] || '').join(' ')));
      if (e) return e;
    } catch {}
  }
  return null;
}

async function main() {
  // 1) Smoothcomp trae todos los torneos próximos en "var events = [...]"
  let events = [];
  for (const u of LISTS) {
    try {
      const html = await get(u);
      const m = html.match(/var events = (\[[\s\S]*?\])\s*\n/);
      if (m) { events = JSON.parse(m[1]); console.log('lista', u, '→', events.length, 'eventos'); break; }
      console.log('lista sin datos', u);
    } catch (e) { console.log('lista falla', u, e.message); }
  }
  // 2) torneos de BJJ/grappling en España que aún no tenemos
  let added = 0, es = 0;
  const shortCity = s => { const parts = String(s || '').split(',').map(x => x.replace(/\b\d{4,5}\b/g, '').trim()).filter(Boolean); return parts.length ? parts[parts.length - 1] : ''; };
  for (const e of events) {
    if (e.location_country !== 'ES' || e.eventEnded) continue;
    es++;
    const id = 'sc-' + e.id;
    if (known.has(id) || !e.startdate || e.startdate < today) continue;
    const name = dec(e.title);
    if (!SPORT.test(name) && !(e.categoryGroups || []).includes('1')) { console.log('omitido (no es BJJ)', e.id, name); continue; }
    const t = name.toLowerCase();
    const gi = /\bgi\b|kimono/.test(t.replace(/no[\s-]?gi/g, '')), nogi = /no[\s-]?gi|grappling|submission|adcc/.test(t);
    comps.push({ id, name, date: e.startdate, end: e.enddate || e.startdate, city: shortCity(e.location_city), country: 'España', org: 'Smoothcomp',
      mods: gi || nogi ? [gi && 'gi', nogi && 'nogi'].filter(Boolean) : ['gi', 'nogi'], cat: '', deadline: '', url: e.url,
      posterUrl: /^https?:/.test(e.cover_image || '') ? e.cover_image : '', src: 'smoothcomp' });
    known.add(id); added++;
    console.log('añadido', e.id, name, e.startdate, shortCity(e.location_city));
  }
  console.log('eventos en España:', es);
  // 3) quitar pasados, ordenar y guardar
  const before = comps.length;
  comps = comps.filter(c => (c.end || c.date) >= today).sort((a, b) => a.date < b.date ? -1 : 1);
  console.log(`añadidos ${added}, quitados ${before - comps.length}, total ${comps.length}`);
  fs.writeFileSync('competiciones.json', JSON.stringify({ updated: new Date().toISOString(), comps }, null, 1));
  // 4) calendario .ics
  const esc = s => String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  const d8 = s => s.replace(/-/g, ''), next = s => { const d = new Date(s + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10).replace(/-/g, ''); };
  const fold = l => { let o = ''; while (l.length > 73) { o += l.slice(0, 73) + '\r\n '; l = l.slice(73); } return o + l; };
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//First Sip//Competiciones//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:First Sip · Competiciones', 'X-WR-TIMEZONE:Europe/Madrid', 'REFRESH-INTERVAL;VALUE=DURATION:PT12H'];
  for (const c of comps) L.push('BEGIN:VEVENT', 'UID:' + c.id + '@first-sip', 'DTSTAMP:' + now, 'DTSTART;VALUE=DATE:' + d8(c.date), 'DTEND;VALUE=DATE:' + next(c.end || c.date),
    'SUMMARY:' + esc(c.name), 'LOCATION:' + esc([c.city, c.country].filter(Boolean).join(', ')), 'DESCRIPTION:' + esc([c.org, (c.mods || []).map(m => m === 'gi' ? 'Gi' : 'No-Gi').join('/'), c.url].filter(Boolean).join('\n')), c.url ? 'URL:' + c.url : '', 'END:VEVENT');
  L.push('END:VCALENDAR');
  fs.writeFileSync('competiciones.ics', L.filter(Boolean).map(fold).join('\r\n') + '\r\n');
}
main().catch(e => { console.log('ERROR', e.message); }).finally(() => fs.writeFileSync('actualizacion.log', LOG.join('\n') + '\n'));
