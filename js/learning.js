import{storage,profile}from'./storage.js';
const initial={lessons:{},scores:{Programming:0,Networking:0,Cybersecurity:0,Linux:0,'Web Development':0,'Artificial Intelligence':0,Mathematics:0,Science:0,'Digital Literacy':0,'General Technology':0},attempts:{},revisions:[],paths:[]};
export const state=()=>{const s=storage.get('engine',{});return{...initial,...s,lessons:{...(s.lessons||{})},scores:{...initial.scores,...(s.scores||{})},attempts:{...(s.attempts||{})},revisions:Array.isArray(s.revisions)?s.revisions:[],paths:Array.isArray(s.paths)?s.paths:[]}};
const save=s=>storage.set('engine',s);
export function completeLesson(lesson){
  if(!lesson)return false;
  const s=state();
  if(s.lessons[lesson.id])return false;
  s.lessons[lesson.id]={done:true,at:Date.now()};
  s.scores[lesson.topic]=Math.min(100,(s.scores[lesson.topic]||0)+15);
  schedule(s,lesson.topic,'lesson');
  save(s);activity(lesson.minutes||10);return true
}
export function quiz(topic,correct,total){
  const s=state(),safeTotal=Math.max(1,Number(total)||1),safeCorrect=Math.max(0,Math.min(Number(correct)||0,safeTotal)),percent=Math.round(safeCorrect/safeTotal*100);
  s.attempts[topic]=[{percent,at:Date.now()},...(s.attempts[topic]||[])].slice(0,20);
  s.scores[topic]=Math.round((s.scores[topic]||0)*.5+percent*.5);
  if(percent<70)schedule(s,topic,'quiz');
  save(s);activity(7);return percent
}
function schedule(s,topic,source){
  const score=s.scores[topic]||0,days=score<45?1:score<70?3:7,item={topic,source,due:Date.now()+days*864e5,days};
  const i=s.revisions.findIndex(x=>x.topic===topic);
  if(i>=0)s.revisions[i]=item;else s.revisions.push(item)
}
export const weak=()=>Object.entries(state().scores).filter(([,v])=>v<65).sort((a,b)=>a[1]-b[1]);
export const nextTopic=()=>weak()[0]?.[0]||'Programming';
export const due=()=>state().revisions.filter(x=>x.due<=Date.now());
export function revise(topic){
  const s=state(),x=s.revisions.find(x=>x.topic===topic);
  if(x){x.days=Math.min(Math.max(1,x.days||1)*2,21);x.due=Date.now()+x.days*864e5}
  s.scores[topic]=Math.min(100,(s.scores[topic]||0)+5);
  save(s);activity(5)
}
function activity(minutes){
  const p=profile(),today=new Date().toISOString().slice(0,10),yesterday=new Date(Date.now()-864e5).toISOString().slice(0,10);
  p.activity.minutes=Math.max(0,(Number(p.activity.minutes)||0)+Math.max(0,Number(minutes)||0));
  if(p.activity.lastDate!==today){p.activity.streak=p.activity.lastDate===yesterday?(Number(p.activity.streak)||0)+1:1;p.activity.lastDate=today}
  storage.set('profile',p)
}
