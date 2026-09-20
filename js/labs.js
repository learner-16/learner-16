let labs=[];
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function loadLabs(){
  try{const r=await fetch('data/labs.json',{cache:'no-store'});if(!r.ok)throw new Error('labs.json returned '+r.status);const data=await r.json();labs=Array.isArray(data)?data:[]}
  catch(error){console.error('LEARNER 16 labs load failed:',error);labs=[]}
  return labs
}
export function labsView(){return `<section class="content"><p class="eyebrow">Safe practice only</p><h1>Practice Labs</h1><p class="muted">Educational exercises — never connected to real systems.</p><div class="grid three section">${labs.length?labs.map(l=>`<article class="card"><span class="pill">${esc(l.difficulty)}</span><h3>${esc(l.title)}</h3><p><strong>Objective:</strong> ${esc(l.objective)}</p><p>${esc(l.instructions)}</p><button type="button" class="button" data-lab="${esc(l.id)}">Open task</button></article>`).join(''):'<article class="card empty">Labs are unavailable right now. Refresh when online so the app can cache them for offline use.</article>'}</div><div id="lab-task"></div></section>`}
export function openLab(id){const l=labs.find(x=>x.id===id),host=document.querySelector('#lab-task');if(!l||!host)return;host.innerHTML=`<article class="card section"><h2>${esc(l.title)}</h2><p><strong>Task:</strong> ${esc(l.task)}</p><p><strong>Hint:</strong> ${esc(l.hint)}</p><textarea maxlength="5000" aria-label="Safe lab response" placeholder="Write your safe learning response"></textarea><div class="actions"><button type="button" class="button" data-action="complete-lab" data-lab-id="${esc(l.id)}">Complete · ${Number(l.score)||0} points</button></div></article>`}
