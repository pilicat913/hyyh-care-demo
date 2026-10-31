'use strict';
// Each bed view has a measured pillow contact point and a safe mattress endpoint.
// Coordinates are normalized to the opaque sprite, not the ground footprint.
const BED_REST8=[
 [.18,.83,.18,.50,.90,.81,.14], [.20,.82,.18,.50,.91,.81,.14],
 [.25,.82,.18,.50,.91,.80,.15], [.27,.82,.18,.50,.92,.80,.15],
 [.22,.79,.18,.50,.91,.81,.14], [.27,.78,.18,.49,.92,.81,.15],
 [.18,.82,.18,.50,.93,.81,.14], [.20,.81,.18,.50,.93,.80,.15],
 [.20,.80,.18,.50,.92,.80,.15], [.28,.74,.22,.53,.88,.80,.17],
 [.33,.86,.22,.52,.93,.80,.15], [.29,.82,.18,.51,.92,.80,.15],
 [.20,.82,.18,.51,.93,.81,.15], [.19,.82,.18,.51,.94,.81,.14]
];
const HEAD_CONTACT8=[.25,.25,.25,.25,.26,.25,.25];
for(const g of CATALOG)if(g.family==='bed'){const index=g.views7?.[1]||0,[head,foot]=BED_REST8[index];g.bedFrameLength8=Math.max(160,Math.ceil((108*.75+3)/(foot-head)/5)*5);}
P.bedRestRect=function(o,i){const r=this.displayRect(o)||this.box(o),image=this.v3art?.['lying-v5']?.[i]||this.personArts[i],index=this.catalog(o.type).restIndex12??(this.catalog(o.type).views7?.[1]||0),[fy,ff,sx,sy,sf,by,bf]=BED_REST8[index],yaw=yaw7(o),side=yaw%2,headRatio=HEAD_CONTACT8[i],s=o.scale||1,angle=yaw===1?-Math.PI/2:yaw===2?Math.PI:yaw===3?Math.PI/2:0;
 const head={x:r.x+r.w*(yaw===1?sx:yaw===3?1-sx:.5),y:r.y+r.h*(side?sy:yaw===2?by:fy)};
 const footLimit=side?r.x+r.w*(yaw===1?sf:1-sf):r.y+r.h*(yaw===2?bf:ff),span=side?Math.abs(footLimit-head.x):Math.abs(footLimit-head.y),k=Math.min(108*s/image.height,Math.max(1,span-3*s)/((1-headRatio)*image.height),(side?r.h:r.w)*.94/image.width),w=image.width*k,h=image.height*k;
 const localHead=(headRatio-.5)*h,cx=head.x+localHead*Math.sin(angle),cy=head.y-localHead*Math.cos(angle),bw=side?h:w,bh=side?w:h,sole={x:cx-h*.5*Math.sin(angle),y:cy+h*.5*Math.cos(angle)};
 return{x:cx-bw/2,y:cy-bh/2,w:bw,h:bh,image,drawW:w,drawH:h,angle,headPoint:head,headRatio,solePoint:sole,footLimit,bedRect:r,mattress:{x:r.x+r.w*.05,y:r.y+r.h*.05,w:r.w*.9,h:r.h*.9}};
};
const SINGLES8={
 a:[
 ['弧木吊床椅','chair',80,48,90,150,1680],['透明泡泡吊椅','chair',75,48,90,145,1780],['红绒影院连排椅','chair',145,48,155,95,1580],['藤篮收纳长凳','sofa',160,48,165,90,1280],['三角转角书柜','shelf',100,35,105,110,980],['圆柱旋转书塔','shelf',60,35,68,110,1080],['彩虹亚克力储物柜','cabinet',140,35,145,95,1480],['脚轮旅行箱柜','cabinet',95,40,105,90,980],['卷帘秘书书桌','desk',140,58,145,115,1680],['弧形玻璃矮茶几','coffee',125,50,130,70,1080],['贝壳绒面扶手椅','chair',65,45,75,90,980],['孔雀藤编靠背椅','chair',65,45,85,130,1480],['折叠木纹边柜','cabinet',105,35,110,88,1180],['黄铜书房梯','rack',40,32,48,125,880],['复古泡面展示机','collectible',60,35,68,115,1380],['墨绿拨号电话摆件','collectible',38,22,48,43,380]
 ],
 b:[
 ['棋盘王冠边几','cabinet',42,28,50,70,680],['蜗牛壳阅读椅','chair',65,48,85,100,1280],['纸飞机吊灯','lamp',55,8,68,78,680],['萤火玻璃罐灯','lamp',26,20,36,58,380],['彩绘玻璃落地灯','lamp',30,25,58,115,880],['之字形书架','shelf',65,32,78,112,980],['地球仪饮品柜','cabinet',65,40,80,110,1480],['蓝白遮阳小圆桌','coffee',85,45,125,140,1280],['星月拱门落地镜','mirror',50,28,62,118,980],['蔷薇花园邮筒','collectible',40,30,50,108,780],['微缩火车场景','collectible',85,35,110,60,880],['木框工具洞洞板','collectible',110,8,120,82,780],['游鱼竹框画','board',65,8,75,78,480],['螺旋造型盆景','plant',38,28,55,100,480],['旅行箱双人小沙发','sofa',145,48,155,95,1480],['几何透明折纸椅','chair',50,38,62,88,980]
 ]
};
for(const [key,list]of Object.entries(SINGLES8))list.forEach(([name,family,w,h,renderW,renderMaxH,price],n)=>{const id='single8-'+key+'-'+n,g={id,name,family,w,h,renderW,renderMaxH,dh:renderMaxH,price,kind:['lamp','collectible','board','plant'].includes(family)?'decor':'chain',series:'奇趣单品',views7:['views-oddities-'+key+'-v7',n],quarterTurn:false,wall:key==='b'&&[2,11,12].includes(n),tabletop:key==='a'&&n===15||key==='b'&&[3,10].includes(n),light:family==='lamp',noDrink8:family==='coffee'};CATALOG.push(g);GOODS_MAP.set(id,g);});
const ANCHOR8=P.seatAnchor;P.seatAnchor=function(o,slot){const g=this.catalog(o.type),r=this.displayRect(o);if(!r||!o.type.startsWith('single8-'))return ANCHOR8.call(this,o,slot);const yaw=yaw7(o),ratio=o.type==='single8-a-0'?.69:o.type==='single8-a-1'?.63:o.type==='single8-a-11'?.76:.59;return{x:r.x+r.w*(yaw===1?.44:yaw===3?.56:o.type==='single8-a-2'?.27:slot===undefined?.5:slot===0?.27:.73),y:r.y+r.h*(yaw===2?.72:yaw%2?Math.max(.64,ratio):ratio)};};
const SURFACE8=P.tableSurface;P.tableSurface=function(o){if(o.type==='single8-b-0')return null;if(o.type==='single8-b-7'){const r=this.displayRect(o);return r?{x:r.x+r.w*.2,y:r.y+r.h*.66,w:r.w*.6,h:r.h*.18}:null;}return SURFACE8.call(this,o);};
const USE8=P.useObject;P.useObject=function(p,o,mode){if(this.catalog(o.type).noDrink8)return false;return USE8.call(this,p,o,mode);};
