const prefix='learner16:';
const defaults={theme:'light',notes:[],projects:[],completedChallenges:[],labs:[],activity:{minutes:0,streak:0,lastDate:null}};
export const storage={
  get:(key,fallback)=>{try{const v=localStorage.getItem(prefix+key);return v===null?fallback:JSON.parse(v)}catch(error){console.error('LEARNER 16 storage read failed:',error);return fallback}},
  set:(key,value)=>{try{localStorage.setItem(prefix+key,JSON.stringify(value));return true}catch(error){console.error('LEARNER 16 storage write failed:',error);return false}},
  remove:(key)=>{try{localStorage.removeItem(prefix+key);return true}catch(error){console.error('LEARNER 16 storage remove failed:',error);return false}}
};
export const profile=()=>{
  const p=storage.get('profile',{});
  return{
    ...defaults,...p,
    notes:Array.isArray(p.notes)?p.notes:[],
    projects:Array.isArray(p.projects)?p.projects:[],
    completedChallenges:Array.isArray(p.completedChallenges)?p.completedChallenges:[],
    labs:Array.isArray(p.labs)?p.labs:[],
    activity:{...defaults.activity,...(p.activity||{})}
  }
};
