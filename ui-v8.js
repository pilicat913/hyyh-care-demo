'use strict';
// Exact rules shown here use the same constants as activity and job settlement.
$('#level-button').onclick=()=>{
 const familyNames={bed:'床',chair:'椅子',sofa:'沙发',cabinet:'柜子',wardrobe:'衣柜',shelf:'书架',desk:'书桌',coffee:'茶几',table:'桌子',lamp:'灯具',plant:'绿植',rug:'地毯',board:'挂画',collectible:'小物',mirror:'镜子',rack:'置物架'};
 const reason=e=>e.reason.startsWith('首次购入')?'首次购入'+(familyNames[e.reason.slice(4)]||e.reason.slice(4)):e.reason;
 modal('等级与经验',`<div class="row"><span>等级 ${level()}</span><b>${data.xp%100} / 100</b></div><p>每攒满 100 点升一级。还差 ${100-data.xp%100} 点。</p><h3>日常活动</h3>${DAILY.map(a=>`<div class="row"><span>${a.name}</span><b>+${a.xp}</b></div>`).join('')}<p class="muted">每种活动第一次完成，另加 12 点。每种活动累计完成前三次按上面的经验结算，从第四次起：吃饭 +7，电影、桌游、音乐 +6，院子休息 +4。这个次数不会每天重置。</p><h3>员工赚钱项目</h3>${JOBS.map(j=>`<div class="row"><span>${j.name}</span><b>+${j.xp}</b></div>`).join('')}<p class="muted">查看结果并结算后获得经验。同一笔结果只结算一次。</p><h3>添置家具</h3><p>第一次买入一种家具类别 +4，比如第一次买床、第一次买椅子。以后再买同类或换样式不重复加经验，摆放和移动也不加。</p><h3>升一级会怎样</h3><p>运营拨款每小时增加 120。第一次升级还可免费添上桌面生活小物；之后不会反复堆叠。等级 2～8 还各有一件小家具，在顶部等级入口的「升级奖励」里预览和领取。整件家具的新样式在商城里挑。</p>${data.freeDecor&&!data.decorated?'<button class="wide red" id="apply-free-decor">免费添上生活小物</button>':data.decorated?'<p class="muted">生活小物已经添好了，重复升级不会往同一桌面无限堆叠。</p>':''}<div class="row"><span>当前运营拨款</span><b>每小时 ${hourly()}</b></div><p class="muted">离线最多累计八小时，只获得资金，不增加经验。</p><h3>最近经验记录</h3>${data.xpEvents.length?data.xpEvents.slice(0,12).map(e=>`<div class="row"><span>${escapeHtml(reason(e))}</span><b>+${e.n}</b></div>`).join(''):'<p class="muted">还没有获得经验。完成一次活动后会记录在这里。</p>'}`);
 if($('#apply-free-decor'))$('#apply-free-decor').onclick=()=>{data.decorated=true;data.freeDecor=false;save();closeModal();navigate('home');toast('桌面添上了小物，家具仍由你自己选')};
};
const COMPLETE8=completeActivity;
completeActivity=function(a){const before=data.xp;COMPLETE8(a);if(data.xp>before)toast('活动结束了 · +'+(data.xp-before)+'经验');};
engine.cb.completeActivity=completeActivity;
// New pieces stay easy to find without a tall promotional block.
const SHOP_MATCH8=shopMatches;
shopMatches=function(g){if(shopStyle!=='new8')return SHOP_MATCH8(g);const old=shopStyle;shopStyle='all';try{return g.id.startsWith('single8-')&&SHOP_MATCH8(g);}finally{shopStyle=old;}};
const SHOP_RENDER8=renderShopV4;
renderShopV4=function(){SHOP_RENDER8();const strip=$('#style-strip');if(!strip)return;const b=document.createElement('button');b.textContent='新到单品 · 32';b.dataset.styleSix='new8';b.className=shopStyle==='new8'?'active':'';b.setAttribute('aria-pressed',String(shopStyle==='new8'));strip.insertBefore(b,strip.children[1]);b.onclick=()=>{shopStyle='new8';shopSource='all';shopCategory='all';renderShopV4();$('#other').scrollTop=0;};};
const PRODUCT8=previewProduct;let productRequest8=0;
previewProduct=async function(id){const request=++productRequest8,key=GOODS_MAP.get(id)?.views7?.[0];if(key&&!engine.v3art[key]){const art=await engine.ensureAtlas7(key);if(!art){toast('图片没有载入，稍后再试一下');return;}}if(request===productRequest8)PRODUCT8(id);};
