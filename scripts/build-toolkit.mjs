import { writeFileSync } from 'node:fs';

const groups = [
  { title: 'AGENTIC + GENERATIVE AI', label: '01 / ORCHESTRATE', color: '#79c0ff', icon: 'nodes', rows: [['LangChain', 'LangGraph', 'LangSmith'], ['RAG pipelines', 'Tool calling'], ['Multi-agent workflows']] },
  { title: 'LLM APIs + MODELS', label: '02 / CONNECT', color: '#b8a1d9', icon: 'spark', rows: [['OpenAI API', 'Claude', 'Groq API'], ['Gemini', 'Hugging Face', 'Whisper']] },
  { title: 'LANGUAGES + BACKEND', label: '03 / BUILD', color: '#8fbc8f', icon: 'code', rows: [['Python', 'SQL', 'FastAPI'], ['REST APIs', 'Streamlit']] },
  { title: 'DATABASES + RETRIEVAL', label: '04 / REMEMBER', color: '#79c0ff', icon: 'data', rows: [['PostgreSQL', 'MySQL', 'SQLite'], ['ChromaDB', 'FAISS']] },
  { title: 'DEVELOPER TOOLBOX', label: '05 / ITERATE', color: '#b8a1d9', icon: 'terminal', rows: [['Git', 'GitHub', 'Jupyter'], ['VS Code', 'Codex']] },
  { title: 'DEPLOYMENT + CLOUD', label: '06 / SHIP', color: '#8fbc8f', icon: 'cloud', rows: [['Render', 'Vercel', 'Neon']] },
];
const icons = {
  nodes: '<path d="M10 10L34 10M10 10L22 32M34 10L22 32"/><circle cx="10" cy="10" r="5"/><circle cx="34" cy="10" r="5"/><circle cx="22" cy="32" r="5"/>',
  spark: '<path d="M22 2L28 16L42 22L28 28L22 42L16 28L2 22L16 16Z"/>',
  code: '<path d="M14 10L2 22L14 34M30 10L42 22L30 34M25 5L19 39"/>',
  data: '<ellipse cx="22" cy="9" rx="18" ry="7"/><path d="M4 9V33C4 42 40 42 40 33V9M4 21C4 30 40 30 40 21"/>',
  terminal: '<rect x="1" y="4" width="42" height="34" rx="5"/><path d="M9 14L16 21L9 28M23 28H33"/>',
  cloud: '<path d="M10 34H34C47 34 46 17 35 16C31 0 9 3 10 18C-2 17-2 34 10 34Z"/>',
};
const cards = groups.map((g,i) => {
  const x= i%2*610+1, y=Math.floor(i/2)*268+1;
  let chips='';
  g.rows.forEach((row,r)=>{
    let offset=27;
    row.forEach(text=>{
      const w=text.length*12.1+28;
      chips+=`<rect x="${offset}" y="${113+r*42}" width="${w}" height="33" rx="7" fill="${g.color}" fill-opacity=".07" stroke="${g.color}" stroke-opacity=".24"/><text x="${offset+14}" y="${136+r*42}" fill="#c9d1d9" font-size="20">${text}</text>`;
      offset+=w+9;
    });
  });
  return `<g transform="translate(${x} ${y})"><rect width="588" height="248" rx="10" fill="url(#panel)" stroke="${g.color}" stroke-opacity=".38"/><path d="M20 1H140" stroke="${g.color}" stroke-width="2"/><text x="27" y="32" fill="${g.color}" font-size="13" letter-spacing="2">${g.label}</text><text x="27" y="76" fill="#e6edf3" font-family="Consolas,Liberation Mono,monospace" font-size="24" font-weight="700">${g.title}</text><g transform="translate(514 26)" stroke="${g.color}" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${icons[g.icon]}</g>${chips}<path d="M27 229H562" stroke="${g.color}" stroke-opacity=".12"/></g>`;
}).join('');
writeFileSync('assets/profile-toolkit.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="786" viewBox="0 0 1200 786" role="img" aria-labelledby="title desc"><title id="title">Eshan's AI engineering toolkit</title><desc id="desc">Six skill groups: agentic AI, LLM APIs, backend development, databases, developer tools, and deployment.</desc><defs><linearGradient id="panel" x2="1" y2="1"><stop stop-color="#161b22"/><stop offset="1" stop-color="#161b22"/></linearGradient></defs><g font-family="Consolas,Liberation Mono,monospace">${cards}</g></svg>`);
console.log('Built six resume-based toolkit cards.');
