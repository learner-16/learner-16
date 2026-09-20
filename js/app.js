import{route}from'./router.js';import{profile,storage}from'./storage.js';import{completeLesson,nextTopic,state}from'./learning.js';import{loadLibrary,libraryView,renderLibrary}from'./library.js';import{notesView,renderNotes,editor,saveNote,remove,exportNote}from'./notes.js';import{loadLabs,labsView,openLab}from'./labs.js';import{analyticsView,finishRevision}from'./analytics.js';import{mentorView,reply}from'./ai.js';import{questions,quizMarkup,submit}from'./quiz.js';import{mapView}from'./knowledge-map.js';import{projectsView,generate,saveProject}from'./projects.js';
const nav=[['home','⌂','Home'],['mentor','◉','AI Mentor'],['paths','⌁','Learning Paths'],['library','▤','Library'],['notes','✎','Smart Notes'],['labs','⚗','Labs'],['challenges','★','Challenges'],['projects','◇','Projects'],['map','◎','Knowledge Map'],['passport','▣','Skill Passport'],['analytics','↗','Analytics'],['discovery','⌕','Discovery'],['community','♧','Community'],['settings','⚙','Settings'],['about','i','About']];let courses=[];const main=document.querySelector('#main');
function home(){const p=profile();return `<section class="content"><section class="hero"><span class="eyebrow">Your free learning universe</span><h1>Learn anything. Build real confidence.</h1><p>Follow paths, practice safely, test understanding, and build a skill record — all without an account.</p><a class="button secondary" href="#paths">Choose a path</a></section><div class="grid four section"><article class="card stat"><strong>${p.activity.minutes}m</strong><span>Learning time</span></article><article class="card stat"><strong>${Object.keys(state().lessons).length}</strong><span>Lessons complete</span></article><article class="card stat"><strong>${p.activity.streak}</strong><span>Day streak</span></article><article class="card stat"><strong>${nextTopic()}</strong><span>Recommended focus</span></article></div><div class="grid two section"><article class="card"><span class="pill warn">Daily mission</span><h2>Explain one concept simply</h2><p>Write a three-sentence beginner explanation for something you learned today.</p><a class="button" href="#notes">Open notes</a></article><article class="card"><span class="pill">Nova AI Mentor</span><h2>Plan your next session</h2><p>Get a safe, private learning prompt from your robot mentor.</p><a class="button secondary" href="#mentor">Talk to Nova</a></article></div></section>`}function paths(){return `<section class="content"><div class="heading"><div><p class="eyebrow">Adaptive learning paths</p><h1>Learning Paths</h1><p class="muted">Next recommendation: ${nextTopic()}.</p></div></div>${courses.map(c=>`<article class="card section"><span class="pill">${c.level}</span><h2>${c.title}</h2><p>${c.prerequisites} · Outcome: ${c.outcome}</p>${c.lessons.map(l=>{const done=state().lessons[l.id];return `<div class="lesson"><span class="icon">${done?'✓':'○'}</span><div class="grow"><strong>${l.title}</strong><br><small>${l.practice} · assessment: ${l.assessment}</small></div><button type="button" class="button ${done?'secondary':''}" data-lesson="${l.id}" ${done?'disabled':''}>${done?'Complete':'Start'}</button></div>`}).join('')}<p class="muted">Project: ${c.project}</p></article>`}).join('')}</section>`}function challenges(){return `<section class="content"><p class="eyebrow">Consistent practice</p><h1>Challenges & quizzes</h1><article class="card"><span class="pill warn">Daily challenge</span><h2>Explain one recent lesson</h2><p>Use your notes to explain a concept without looking at the source.</p><button type="button" class="button" data-action="daily">Mark complete</button></article><div class="grid three section">${Object.keys(questions).map(t=>`<article class="card"><span class="pill">${t}</span><h3>Quick quiz</h3><p>Two questions; lower results schedule revision.</p><button type="button" class="button" data-quiz="${t}">Take quiz</button></article>`).join('')}</div><div id="quiz"></div></section>`}function passport(){const p=profile(),s=state();return `<section class="content"><p class="eyebrow">Professional learning record</p><h1>Skill Passport</h1><div class="grid three section"><article class="card"><h3>Lessons</h3><strong>${Object.keys(s.lessons).length}</strong><p>Completed learning evidence</p></article><article class="card"><h3>Challenges</h3><strong>${p.completedChallenges.length}</strong><p>Practice achievements</p></article><article class="card"><h3>Projects</h3><strong>${p.projects.length}</strong><p>Portfolio artifacts</p></article></div><article class="card section"><h2>Achievement badges</h2><span class="pill done">Offline learner</span> <span class="pill">Path explorer</span> <span class="pill">Safe practitioner</span></article></section>`}function simple(title,text){return `<section class="content"><p class="eyebrow">LEARNER 16</p><h1>${title}</h1><article class="card section"><p>${text}</p></article></section>`}const views={home,mentor:mentorView,paths,library:libraryView,notes:notesView,labs:labsView,challenges,projects:projectsView,map:mapView,passport,analytics:analyticsView,discovery:()=>simple('Discovery','Explore new free paths, resources, and study prompts.'),community:()=>simple('Community','A future moderated community space for respectful learner collaboration.'),settings:()=>simple('Settings','Preferences are stored locally on this device.'),about:()=>simple('About LEARNER 16','A free, offline-first learning universe built around practice, reflection, and demonstrated skills.')};function render(){const r=route();document.querySelector('#nav').innerHTML=nav.map(([x,i,n])=>`<a class="nav-link ${x===r?'active':''}" href="#${x}"><i>${i}</i>${n}</a>`).join('');main.innerHTML=(views[r]||home)();document.body.classList.remove('nav-open');if(r==='library')renderLibrary();if(r==='notes')renderNotes();document.querySelector('#streak').textContent=`${profile().activity.streak} day streak`}
function toast(x){const t=document.querySelector('#toast');t.textContent=x;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.action==='theme'){const p=profile();p.theme=p.theme==='dark'?'light':'dark';storage.set('profile',p);document.documentElement.dataset.theme=p.theme}if(b.dataset.action==='new-note')editor();if(b.dataset.action==='note-ai')toast('AI tools are ready for a future secure backend.');if(b.dataset.edit)editor(profile().notes.find(n=>n.id===b.dataset.edit));if(b.dataset.delete)remove(b.dataset.delete);if(b.dataset.export)exportNote(b.dataset.export);if(b.dataset.lesson){const l=courses.flatMap(c=>c.lessons).find(l=>l.id===b.dataset.lesson);completeLesson(l);toast('Lesson completed; revision scheduled.');render()}if(b.dataset.quiz){const q=document.querySelector('#quiz');if(q)q.innerHTML=quizMarkup(b.dataset.quiz)}if(b.dataset.lab)openLab(b.dataset.lab);if(b.dataset.action==='complete-lab'){const p=profile(),id=b.dataset.labId;if(id&&!p.labs.includes(id))p.labs.push(id);storage.set('profile',p);toast('Safe lab completion saved.')}if(b.dataset.action==='daily'){const p=profile(),id='daily-'+new Date().toISOString().slice(0,10);if(!p.completedChallenges.includes(id))p.completedChallenges.push(id);storage.set('profile',p);toast('Daily challenge saved.')}if(b.dataset.revise){finishRevision(b.dataset.revise);toast('Revision complete.');render()}if(b.dataset.prompt)reply(b.dataset.prompt);if(b.dataset.saveProject){saveProject(b.dataset.saveProject);toast('Project saved to portfolio.')}});document.addEventListener('input',e=>{if(e.target.id==='note-search')renderNotes();if(e.target.id==='library-search')renderLibrary()});document.addEventListener('change',e=>{if(e.target.id==='library-category')renderLibrary()});document.addEventListener('submit',e=>{if(e.target.id==='note-form'){e.preventDefault();saveNote(e.target);toast('Note saved locally.')}if(e.target.id==='quiz-form'){e.preventDefault();submit(e.target)}if(e.target.id==='project-form'){e.preventDefault();generate(e.target)}if(e.target.id==='chat-form'){e.preventDefault();const i=e.target.querySelector('input');reply(i.value);i.value=''}});document.querySelector('#menu').onclick=()=>document.body.classList.toggle('nav-open');
window.onhashchange=render;

function setBoot(message, error=false){
  const el=document.querySelector('#boot-status');
  if(!el)return;
  el.textContent=message;
  el.className=error?'boot-error':'boot-loading';
}

async function loadJson(url, fallback, label){
  try{
    const r=await fetch(url,{cache:'no-store'});
    if(!r.ok)throw new Error(label+' returned '+r.status);
    const data=await r.json();
    return data;
  }catch(error){
    console.error('LEARNER 16 data load failed:',url,error);
    return fallback;
  }
}

async function boot(){
  setBoot('Starting LEARNER 16…');

  const defaultCourses=[
    {id:'programming',title:'Programming Foundations',level:'Beginner',prerequisites:'No prior experience',outcome:'Write and explain small programs',project:'Build a study timer',lessons:[
      {id:'prog-logic',title:'Logic and decisions',topic:'Programming',minutes:12,practice:'Write pseudocode',assessment:'Logic quiz'},
      {id:'prog-functions',title:'Functions',topic:'Programming',minutes:15,practice:'Refactor a task',assessment:'Function quiz'}
    ]}
  ];

  try{
    const [courseData]=await Promise.all([
      loadJson('data/courses.json',defaultCourses,'courses.json'),
      loadLibrary().catch(error=>console.error('Library load failed:',error)),
      loadLabs().catch(error=>console.error('Labs load failed:',error))
    ]);

    courses=Array.isArray(courseData)&&courseData.length?courseData:defaultCourses;
    document.documentElement.dataset.theme=profile().theme||'light';
    render();
    setBoot('');
    const status=document.querySelector('#boot-status');
    if(status)status.remove();
  }catch(error){
    console.error('LEARNER 16 startup error:',error);
    setBoot('LEARNER 16 started with a safe fallback. Some content may be unavailable.',true);
    try{document.documentElement.dataset.theme=profile().theme||'light';render()}catch(renderError){console.error(renderError)}
  }
}

boot().catch(error=>{
  console.error('Fatal LEARNER 16 startup error:',error);
  setBoot('LEARNER 16 could not start. Please refresh the page.',true);
});
