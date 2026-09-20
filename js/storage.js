const prefix='learner16:';
const defaults={theme:'light',notes:[],projects:[],completedChallenges:[],labs:[],activity:{minutes:0,streak:0,lastDate:null}};
export const storage={
  get:(key,fallback)=>{try{const v=localStorage.getItem(prefix+key);return v?JSON.parse(v):fallback}catch{return fallback}},
  set:(key,value)=>{try{localStorage.setItem(prefix+key,JSON.stringify(value));return true}catch{return false}},
  remove:key=>{try{localStorage.removeItem(prefix+key);return true}catch{return false}},
  clear:()=>{try{Object.keys(localStorage).filter(k=>k.startsWith(prefix)).forEach(k=>localStorage.removeItem(k));return true}catch{return false}}
};
export const profile=()=>{const p=storage.get('profile',{});return{...defaults,...p,notes:Array.isArray(p.notes)?p.notes:[],projects:Array.isArray(p.projects)?p.projects:[],completedChallenges:Array.isArray(p.completedChallenges)?p.completedChallenges:[],labs:Array.isArray(p.labs)?p.labs:[],activity:{...defaults.activity,...(p.activity||{})}}};
