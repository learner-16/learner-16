let books=[];
const esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const safeUrl=url=>{try{const u=new URL(url,location.href);return /^https?:$/.test(u.protocol)?u.href:'#'}catch{return '#'}};
export async function loadLibrary(){
  try{const r=await fetch('data/books.json',{cache:'no-store'});if(!r.ok)throw new Error('books.json returned '+r.status);const data=await r.json();books=Array.isArray(data)?data:[]}
  catch(error){console.error('LEARNER 16 library load failed:',error);books=[]}
  return books
}
export function libraryView(){return `<section class="content"><p class="eyebrow">Legal free resources</p><h1>Knowledge Library</h1><div class="filters section"><input id="library-search" maxlength="100" aria-label="Search resources" placeholder="Search resources"><select id="library-category" aria-label="Filter resources"><option value="">All categories</option>${['Cybersecurity','Programming','Networking','Mathematics','Science','Technology','General Learning'].map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select></div><div id="library" class="grid three"></div></section>`}
export function renderLibrary(){
  const h=document.querySelector('#library'),input=document.querySelector('#library-search');if(!h||!input)return;
  const q=input.value.toLowerCase(),c=document.querySelector('#library-category')?.value||'',r=books.filter(b=>(!c||b.category===c)&&JSON.stringify(b).toLowerCase().includes(q));
  h.innerHTML=r.length?r.map(b=>`<article class="card"><span class="pill">${esc(b.category)}</span><h3>${esc(b.title)}</h3><p>${esc(b.description)}</p><a class="button secondary" target="_blank" rel="noopener noreferrer" href="${safeUrl(b.url)}">Open resource ↗</a></article>`).join(''):'<div class="card empty">No resources match.</div>'
}
