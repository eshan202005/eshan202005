import { mkdirSync, writeFileSync } from 'node:fs';
mkdirSync('assets', { recursive: true });
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
function card(file, color, num, title, subtitle, lines, stack, art) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="560" viewBox="0 0 600 560" role="img" aria-label="${esc(title)}">
<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#111a35"/><stop offset="1" stop-color="#090d1e"/></linearGradient><radialGradient id="halo"><stop stop-color="${color}" stop-opacity=".18"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs>
<rect x="2" y="2" width="596" height="556" rx="22" fill="url(#bg)" stroke="${color}" stroke-opacity=".65" stroke-width="2"/>
<circle cx="430" cy="180" r="190" fill="url(#halo)"/>
<g stroke="#273254" stroke-width="1" opacity=".5">${Array.from({length:12},(_,i)=>`<path d="M${i*55} 85V290M24 ${90+i*18}H576"/>`).join('')}</g>
<g font-family="monospace"><text x="32" y="48" fill="${color}" font-size="17" letter-spacing="3">PROJECT / ${num}</text><circle cx="555" cy="42" r="5" fill="${color}"/>${art}
<path d="M32 295H568" stroke="${color}" stroke-opacity=".3"/>
<text x="32" y="342" fill="#f0f3ff" font-size="31" font-weight="700">${title}</text>
<text x="32" y="376" fill="${color}" font-size="16" letter-spacing="2">${subtitle}</text>
${lines.map((line,i)=>`<text x="32" y="${418+i*27}" fill="#b7c2dc" font-size="19">${esc(line)}</text>`).join('')}
<text x="32" y="510" fill="#899bbf" font-size="16">${esc(stack)}</text><text x="550" y="515" text-anchor="end" fill="${color}" font-size="26">↗</text></g></svg>`;
  writeFileSync(`assets/${file}.svg`, svg);
}
card('ryujin','#56e8ff','01','RYUJIN AI','AGENTIC WORKSPACE',['Specialized agents.','One connected workspace.'],'FastAPI / LangGraph / Postgres',`<g stroke="#56e8ff" fill="#0d1830" stroke-width="3"><path d="M300 176L190 120M300 176L410 120M300 176L190 240M300 176L410 240"/><circle cx="300" cy="176" r="42"/><rect x="165" y="95" width="50" height="50" rx="12"/><rect x="385" y="95" width="50" height="50" rx="12"/><rect x="165" y="215" width="50" height="50" rx="12"/><rect x="385" y="215" width="50" height="50" rx="12"/></g><text x="300" y="186" fill="#56e8ff" text-anchor="middle" font-size="28">AI</text>`);
card('research','#ce9aff','02','RESEARCH ASSISTANT','DOCUMENT INTELLIGENCE',['Your PDFs. Connected.','Ask across your knowledge.'],'LangChain / ChromaDB / Streamlit',`<g fill="#12172e" stroke="#ce9aff" stroke-width="3"><rect x="190" y="103" width="125" height="157" rx="10" transform="rotate(-10 250 180)"/><rect x="242" y="91" width="125" height="157" rx="10"/><path d="M266 123H342M266 147H342M266 171H316"/><circle cx="361" cy="211" r="36"/><path d="M388 238L420 270" stroke-width="10"/></g>`);
card('interviewer','#ff80ce','03','MOCK INTERVIEWER','PRACTICE WITH AI',['Questions. Voice. Feedback.','Build interview confidence.'],'React / FastAPI / Python',`<g stroke="#ff80ce" stroke-width="3" fill="none"><rect x="180" y="95" width="240" height="147" rx="18"/><path d="M220 242L212 270L260 242"/>${[30,50,78,103,62,35,70,95,50].map((h,i)=>`<path d="M${220+i*20} ${169-h/2}V${169+h/2}" stroke-width="8" stroke-linecap="round"/>`).join('')}</g>`);
await import('./build-toolkit.mjs');
let skyline = '';
for (let i=0;i<42;i++) { const x=i*30, h=20+((i*37+11)%74); skyline+=`<rect x="${x}" y="${137-h}" width="24" height="${h}" fill="#131d38" stroke="#283554"/>`; for(let y=147-h;y<129;y+=13) skyline+=`<path d="M${x+5} ${y}h4m5 0h4" stroke="${i%3===0?'#ff80ce':'#56e8ff'}" opacity=".45"/>`; }
writeFileSync('assets/city-signal.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="180" viewBox="0 0 1200 180"><defs><linearGradient id="line"><stop stop-color="#56e8ff"/><stop offset=".5" stop-color="#ce9aff"/><stop offset="1" stop-color="#ff80ce"/></linearGradient></defs><rect width="1200" height="180" rx="16" fill="#090e20"/>${skyline}<rect y="137" width="1200" height="2" fill="url(#line)"/><rect x="322" y="43" width="556" height="43" rx="10" fill="#090e20"/><text x="600" y="72" text-anchor="middle" fill="#e3eaff" font-family="monospace" font-size="22" letter-spacing="4">KEEP BUILDING. KEEP EXPLORING.</text><circle cx="30" cy="160" r="4" fill="#56e8ff"><animate attributeName="opacity" values="1;.35;1" dur="4s" repeatCount="indefinite"/></circle><text x="47" y="165" fill="#91a1c4" font-family="monospace" font-size="12" letter-spacing="2">ESHAN202005 / NEON CITY</text></svg>`);
console.log('Built 5 local SVG assets.');
