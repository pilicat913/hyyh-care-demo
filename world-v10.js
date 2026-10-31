'use strict';
// Sitting follows the actual seat/task direction, including the native rear view.
// Do not turn residents or redraw their chairs merely to show their faces.
P.seatView10=function(){return null;};
P.seatedDirection10=function(p){return p.dir;};
const FRAME10=P.characterFrame;P.characterFrame=function(p){const dir=this.seatedDirection10(p);return FRAME10.call(this,dir===p.dir?p:{...p,dir});};
const DISPLAY10=P.displayRect;P.displayRect=function(o){const r=DISPLAY10.call(this,o),dir=this.seatView10(o),g=this.catalog(o.type);if(!r||dir===null||!g.views7)return r;const im=this.v3art?.[g.views7[0]]?.[g.views7[1]*3+(dir===1||dir===2?1:0)];if(!im)return r;const w=im.width/im.height*r.h;return{...r,x:r.x+r.w/2-w/2,w,image:im};};
const ANCHOR10=P.seatAnchor;P.seatAnchor=function(o,slot){const dir=this.seatView10(o);if(dir!==1&&dir!==2)return ANCHOR10.call(this,o,slot);const r=this.displayRect(o),g=this.catalog(o.type);if(!r)return ANCHOR10.call(this,o,slot);const y=g.family==='stool'?.22:o.type==='single8-a-11'?.76:o.type==='single8-a-0'?.69:.64;return{x:r.x+r.w*(dir===2?.60:.40),y:r.y+r.h*y};};
const SEATED10=P.seatedRect;P.seatedRect=function(p){const dir=this.seatedDirection10(p);return SEATED10.call(this,dir===p.dir?p:{...p,dir});};
// A selected standing member wins a drag hit even when another sitter overlaps him.
const HIT10=P.hitPerson;P.hitPerson=function(point){if(this.person!==null){const p=this.people[this.person];if(p&&(p.floor||1)===(this.floor||1)){const f=this.characterFrame(p),r=this.restingRect(p)||this.seatedRect(p)||{x:p.x-(f?.w||55)/2,y:p.y-(f?.h||108),w:f?.w||55,h:f?.h||108};if(this.inside(point,r,-5))return p;}}return HIT10.call(this,point);};
