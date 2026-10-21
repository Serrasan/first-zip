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
  // 1) ids de eventos próximos
  const ids = new Set();
  for (const u of LISTS) {
    try {
      const html = await get(u);
      for (const m of html.matchAll(/\/event\/(\d{4,6})/g)) ids.add(m[1]);
      console.log('html', html.length, 'bytes; muestra:', html.slice(0,300).replace(/\s+/g,' '));
      { const m2 = html.match(/var events = (\[[\s\S]*?\])\s*\n/); if (m2) { try { const ev = JSON.parse(m2[1]); console.log('EVENTS', ev.length, 'keys:', Object.keys(ev[0]).join(',')); console.log('SAMPLE', JSON.stringify(ev.find(x=>/jiu|bjj/i.test(x.title))||ev[1])); } catch(e){ console.log('parse falla', e.message, m2[1].slice(-200)); } } else console.log('sin var events'); }
      for (const needle of [] || ['32650','33194','window.__','var events','"events"','events:','eventUrl','"title"']) { const i = html.indexOf(needle); console.log('ctx', needle, i, i>=0 ? html.slice(Math.max(0,i-200), i+300).replace(/\s+/g,' ') : ''); }
      console.log('enlaces api/json:', [...new Set([...html.matchAll(/["'](\/?(?:api|en\/api)[^"']{0,80})["']/g)].map(m=>m[1]))].slice(0,15).join(' | '));
      console.log('lista', u, '→', ids.size, 'eventos');
      if (ids.size) break;
      break;
    } catch (e) { console.log('lista falla', u, e.message); }
  }
  // 2) detalles de los nuevos
  let added = 0;
  for (const id of ids) {
    if (known.has('sc-' + id)) continue;
    const url = `https://smoothcomp.com/en/event/${id}`;
    try {
      const html = await get(url);
      const e = ldEvent(html);
      const name = dec(e?.name || meta(html, 'og:title'));
      const start = (e?.startDate || '').slice(0, 10), end = (e?.endDate || start).slice(0, 10);
      const addr = e?.location?.address || {};
      const country = (typeof addr === 'string' ? '' : (addr.addressCountry?.name || addr.addressCountry || '')) + '';
      const city = dec(typeof addr === 'string' ? addr : [addr.addressLocality, addr.addressRegion].filter(Boolean).join(', ')) || dec(e?.location?.name);
      const img = [].concat(e?.image || [])[0] || meta(html, 'og:image');
      const okSpain = SPAIN.test(country.trim()) || /españa|spain/i.test(JSON.stringify(e?.location || ''));
      if (!name || !start || start < today) { console.log('omitido (sin fecha o pasado)', id, name, start); continue; }
      if (!okSpain) { console.log('omitido (fuera de España)', id, name, country); continue; }
      if (!SPORT.test(name + ' ' + (e?.description || ''))) { console.log('omitido (no es BJJ)', id, name); continue; }
      const txt = (name + ' ' + (e?.description || '')).toLowerCase();
      const mods = [/(\bgi\b|kimono)/.test(txt) ? 'gi' : null, /no[\s-]?gi|grappling|submission/.test(txt) ? 'nogi' : null].filter(Boolean);
      comps.push({ id: 'sc-' + id, name, date: start, end, city, country: 'España', org: 'Smoothcomp', mods: mods.length ? mods : ['gi', 'nogi'],
        cat: '', deadline: '', url, posterUrl: typeof img === 'string' ? img : img?.url, src: 'smoothcomp' });
      known.add('sc-' + id); added++;
      console.log('añadido', id, name, start, city);
    } catch (err) { console.log('evento falla', id, err.message); }
  }
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
