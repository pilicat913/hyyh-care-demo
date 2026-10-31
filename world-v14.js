'use strict';
// Demo audit: only native, usable orientations are exposed. Owned items are retained.
function demoTurns14(g){
 if(g.flat)return[0,1,2,3];
 if(!g.views7)return[0];
 if(g.family==='bed')return[0,1,3]; // rear sheets include incompatible pillow/foot-board geometry
 if(g.wall||g.tabletop)return[0];
 return[0,1,2,3];
}
const ROTATE14=P.rotateDraft7;
P.rotateDraft7=function(){const o=this.draft;if(!o)return;const turns=demoTurns14(this.catalog(o.type));if(turns.length===1){this.cb.toast('这件家具在体验版中使用正面摆放');return;}const b=this.box(o),cx=b.x+b.w/2,cy=b.y+b.h/2;o.rot=turns[(Math.max(0,turns.indexOf(yaw7(o)))+1)%turns.length];const n=this.box(o);o.x=Math.round((o.x+cx-n.x-n.w/2)/GRID)*GRID;o.y=Math.round((o.y+cy-n.y-n.h/2)/GRID)*GRID;this.snapToRoomEdge7(o,60);this.cb.itemTools();};
// Real image aspect ratios, one body height per posture, all seven residents.
const FRAME14=P.characterFrame;
P.characterFrame=function(p){const f=FRAME14.call(this,p);if(!f)return f;const h=(p.pose==='sit'?90:108)*(p.i===2?.95:1),k=h/f.image.height;return{...f,w:f.image.width*k,h};};
// Old, badly matched novelty views stay owned, but are not sold in the demo.
for(const id of ['single8-a-0','single8-a-1','single8-a-2','single8-b-7','novelty-v7-0']){const g=GOODS_MAP.get(id);if(g)g.hiddenFromShop=true;}
// Activity overlays belong to furniture, rather than a hard-coded point on the map.
P.drawActivity=function(){const a=this.data.activity,c=this.ctx;if(a?.phase==='cooking'){
 const o=this.data.furniture.find(o=>this.catalog(o.type).family==='kitchen'),s=o&&this.tableSurface(o),im=this.food?.[6];if(s&&im){const w=Math.min(28,s.w*.3),h=w*im.height/im.width;c.drawImage(im,s.x+s.w*.6,s.y+s.h*.5-h/2,w,h);}}
 if(a?.phase==='doing'&&a.id==='game'){
 const room=ROOMS.find(r=>r.id==='common'),o=this.data.furniture.find(o=>['table','coffee','desk'].includes(this.catalog(o.type).family)&&this.inside(o,room)),s=o&&this.tableSurface(o);if(s){c.save();c.translate(s.x+s.w/2,s.y+s.h/2);const k=Math.min(1,s.w/80,s.h/32);c.scale(k,k);c.fillStyle='#e7d4ad';c.fillRect(-34,-13,68,26);for(let i=0;i<6;i++){c.fillStyle=i%2?'#995346':'#627f77';c.fillRect(-28+i*10,-7,8,14);}c.restore();}}
 if(a?.phase==='doing'&&a.id==='film'){
 const room=ROOMS.find(r=>r.id==='common'),tv=this.data.furniture.find(o=>this.catalog(o.type).family==='tv'&&this.inside(o,room)),r=tv&&this.displayRect(tv);if(r&&yaw7(tv)===0){const screen={x:r.x+r.w*.20,y:r.y+r.h*.10,w:r.w*.58,h:r.h*.38};c.save();c.beginPath();c.rect(screen.x,screen.y,screen.w,screen.h);c.clip();c.fillStyle='#9fb9bb';c.fillRect(screen.x,screen.y,screen.w,screen.h);c.fillStyle='#708c71';c.fillRect(screen.x+(Math.sin(this.time*.7)*.2+.2)*screen.w,screen.y+screen.h*.5,screen.w*.6,screen.h*.6);c.restore();}}
 this.drawTutorialFocus();};
const PLAN14=P.planGroup;
P.planGroup=function(a){const plan=PLAN14.call(this,a);if(plan.error||a.id!=='film')return plan;const tv=this.data.furniture.find(o=>this.catalog(o.type).family==='tv'&&this.inside(o,plan.room));if(!tv)return plan;const b=this.box(tv);for(const s of plan.seats){const dx=b.x+b.w/2-s.x,dy=b.y+b.h/2-s.y;s.dir=Math.abs(dx)>Math.abs(dy)?dx<0?1:2:dy<0?3:0;}return plan;};
// The obsolete room-selection tutorial is removed; focus now follows the member.
P.drawTutorialFocus=function(){if(!this.data.intro||this.data.tutorial!==1||this.edit||this.photoMode14)return;const p=this.people[2];if(!p||!this.personOnFloor(p))return;const c=this.ctx;c.save();c.strokeStyle='#ffe18b';c.lineWidth=3;c.beginPath();c.ellipse(p.x,p.y-48,43,65,0,0,Math.PI*2);c.stroke();c.restore();};
// A new warehouse item starts on nearby usable floor, rather than inside the corridor wall.
const STARTDRAFT14=P.startDraft;
P.startDraft=function(...args){const result=STARTDRAFT14.apply(this,args),o=this.draft;if(!o?.new||!this.placeReason(o))return result;const g=this.catalog(o.type);if(g.wall||g.tabletop)return result;const b=this.box(o),candidates=[],snap=v=>Math.round(v/GRID)*GRID;for(const r of ROOMS){if(b.w>r.w||b.h>r.h)continue;const xs=[r.x,r.x+r.w-b.w,this.cam.x-b.w/2],ys=[r.y,r.y+r.h-b.h,this.cam.y-b.h/2];for(const f of this.data.furniture){const q=this.box(f);xs.push(q.x-b.w-GRID,q.x+q.w+GRID);ys.push(q.y-b.h-GRID,q.y+q.h+GRID);}for(const x of new Set(xs.map(snap)))for(const y of new Set(ys.map(snap)))if(x>=r.x&&y>=r.y&&x+b.w<=r.x+r.w&&y+b.h<=r.y+r.h)candidates.push({x,y});}candidates.sort((a,b)=>Math.hypot(a.x-this.cam.x,a.y-this.cam.y)-Math.hypot(b.x-this.cam.x,b.y-this.cam.y));const original={x:o.x,y:o.y};for(const q of candidates){o.x=q.x;o.y=q.y;if(!this.placeReason(o)&&!this.placeReason(o,true)){this.cb.itemTools();return result;}}Object.assign(o,original);return result;};
