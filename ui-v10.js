'use strict';
// One confirmation starts the real gathering. Charge only after routes are accepted.
function startActivity10(config,alreadyPaid=false){
 if(!engine.ready){toast('地图还在加载，请稍等一下');return false;}
 if(data.activity&&(!alreadyPaid||data.activity!==config)){toast('先结束当前活动，再安排下一项');return false;}
 if(alreadyPaid&&config.phase!=='prepared')return false;
 if(!config.participants?.length){toast('至少选一位参加的人');return false;}
 if((engine.floor||1)!==1)engine.switchFloor(1);
 const cost=Math.max(0,Number(config.cost)||0),refund=message=>{if(alreadyPaid){data.activity=null;if(cost){data.money+=cost;record('原活动无法开始，退回预算',cost);}save();render();}toast(message);return false;};
 if(!alreadyPaid&&data.money<cost){toast('预算还不够');return false;}
 if(engine.edit)setEdit(false);
 const activity=alreadyPaid?config:{...config,cost,phase:'prepared',start:Date.now(),end:Date.now()};
 activity.end=Date.now();data.activity=activity;
 const error=engine.beginGroup(activity);if(error){data.activity=null;return refund(error);}
 if(!alreadyPaid&&cost){data.money-=cost;record((DAILY.find(a=>a.id===config.id)?.name||'活动')+'预算',-cost);}
 if(!alreadyPaid)closeModal();
 navigate('home');const yard=config.id==='walk'||ACT9[config.id]?.room==='yard';engine.cam={x:config.id==='meal'?1090:750,y:yard?850:config.id==='meal'?600:450,z:Math.max(.5,Math.min(.7,engine.cam.z))};engine.clampCam();save();updateLiveBar();toast('大家开始集合，到齐后会自动进行');return true;
}
function resumeActivity10(){if(engine.ready&&data.activity?.phase==='prepared'&&!engine.edit)startActivity10(data.activity,true);}
beginActivity=function(){if(data.activity?.phase==='prepared')resumeActivity10();else if(data.activity)navigate('home');};
const ASSETS10=engine.cb.assets;engine.cb.assets=()=>{ASSETS10?.();resumeActivity10();};
if(engine.ready)resumeActivity10();
