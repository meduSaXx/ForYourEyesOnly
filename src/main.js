const $=s=>document.querySelector(s), au=$('#au');
// stars
for(let i=0;i<90;i++){const e=document.createElement('i');e.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;--s:${1+Math.random()*2.5}px;--d:${2+Math.random()*5}s;animation-delay:-${Math.random()*6}s`;$('#stars').appendChild(e)}
// music
const mb=$('#music');let started=false;
function setM(){mb.textContent=au.paused?'♪̸':'♪';mb.classList.toggle('paused',au.paused)}
function startMusic(){if(started)return;started=true;au.volume=.7;au.play().catch(()=>{started=false});mb.classList.add('on');setM()}
document.addEventListener('pointerdown',()=>{if(introDone)startMusic()});
mb.onclick=e=>{e.stopPropagation();au.paused?au.play():au.pause();setM()};au.onplay=au.onpause=setM;
function show(id){document.querySelectorAll('.scene').forEach(s=>s.classList.toggle('on',s.id===id));document.body.classList.toggle('wine',id==='s-letter');if(id==='s-letter')setTimeout(fit,50)}
// calendar
const MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
let Y=2026,M=10;
function render(){$('#ml').textContent=MN[M]+' '+Y;const g=$('#grid');g.innerHTML='';
 'SMTWTFS'.split('').forEach(d=>{const s=document.createElement('span');s.textContent=d;g.appendChild(s)});
 const f=new Date(Y,M,1).getDay(),n=new Date(Y,M+1,0).getDate();
 for(let i=0;i<f;i++)g.appendChild(document.createElement('div'));
 for(let d=1;d<=n;d++){const b=document.createElement('button');b.textContent=d;if(Y===2026&&M===10&&d===25)b.className='bday';b.onclick=()=>pick(Y,M,d);g.appendChild(b)}}
function pick(y,m,d){const msg=$('#msg');let t;
 if(y===2026&&m===10&&d===25){msg.textContent='';return openPin()}
 if(y===2025&&m===10&&d===25)t='Not the correct year, baby.';
 else if(y===2027&&m===10&&d===25)t='Too early for this, baby.';
 else if(new Date(y,m,d)<new Date(2026,10,25))t='Not time yet, babu… that night is still waiting for you. ✨';
 else t='This page of the story isn’t written yet, baby. 🌙';
 msg.style.opacity=0;setTimeout(()=>{msg.textContent=t;msg.style.opacity=1},120)}
$('#msg').style.transition='opacity .4s';
$('#pm').onclick=()=>{M--;if(M<0){M=11;Y--}render()};$('#nm').onclick=()=>{M++;if(M>11){M=0;Y++}render()};
$('#py').onclick=()=>{Y--;render()};$('#ny').onclick=()=>{Y++;render()};render();
// pin
const H='b783c7593a7a6c0edb8a8088359a6dfb98e6b082b1fd41af938559e58352a196',pin=$('#pin');
function openPin(){pin.value='';$('#pmsg').textContent='';show('s-pin');setTimeout(()=>pin.focus({preventScroll:true}),900)}
$('#back').onclick=()=>show('s-cal');
[1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].forEach(k=>{const b=document.createElement('button');b.textContent=k;b.onclick=()=>{if(k==='⌫')pin.value=pin.value.slice(0,-1);else if(k==='✓')check();else if(pin.value.length<4)pin.value+=k;if(pin.value.length===4&&k!=='⌫'&&k!=='✓')check()};$('#keys').appendChild(b)});
pin.oninput=()=>{pin.value=pin.value.replace(/\D/g,'').slice(0,4);if(pin.value.length===4)check()};
pin.onkeydown=e=>{if(e.key==='Enter')check()};
async function check(){const v=pin.value;if(v.length<4){$('#pmsg').textContent='Four digits, baby. 💫';return}
 const h=[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode('sammie26-'+v)))].map(x=>x.toString(16).padStart(2,'0')).join('');
 if(h===H){pin.value='';buildBook();show('s-letter')}
 else{const w=['Hmm, not that one, babu. Think harder, you know me. 🥺','Cute try! One more time, baby. ✨','Nope nope nope. Close your eyes and remember… 🌙'];$('#pmsg').textContent=w[Math.random()*w.length|0];pin.value='';pin.classList.remove('shake');void pin.offsetWidth;pin.classList.add('shake')}}
// letter book
const paras=JSON.parse($('#letter').textContent),FRONT='assets/postcard-front.jpg',BACK='assets/postcard-back.jpg';
let leaves=[],cur=0,built=false;
function paginate(paras,fi=true){const m=document.createElement('div');m.className='txt';m.style.visibility='hidden';$('#book').appendChild(m);const pages=[];let page=[];
 const fits=()=>m.scrollHeight<=m.clientHeight+1;
 const flush=()=>{pages.push(page);page=[];m.innerHTML=''};
 paras.forEach((p,i)=>{let words=p.split(' '),rest=words;
  while(rest.length){const el=document.createElement('p');if(i===0&&fi)el.className='first';m.appendChild(el);let n=0;
   while(n<rest.length){el.textContent=rest.slice(0,n+1).join(' ');if(!fits())break;n++}
   if(n===0){m.removeChild(el);if(!page.length&&!m.children.length){n=1}else{flush();continue}}
   const chunk=rest.slice(0,n).join(' ');page.push({t:chunk,first:i===0&&fi});rest=rest.slice(n);
   if(rest.length){flush()}}});
 if(page.length)pages.push(page);m.remove();return pages}
function buildBook(){if(built){goto(0);return}built=true;const b=$('#book'),base=paginate(paras),extra=paginate(["Do you know how much I admire you?", "Not because you are perfect, but because there's something about you that my heart simply can't ignore.", "I love the way you smiles. The way the smallest things can make you genuinely happy. I don't even remember when did your smile started becoming too important to me, but now every time I see it, I smile too..", "You probably have no idea how closely I notice you.", "The little expressions on your face when you mimic me, the sleepy voice of yours, the way you retend to be okay when you are not and the happiness you show when you are truly happy.", "They're such ordinary moments, yet somehow they mean everything to me.", "I admire you because you feel soo real,you came into my life when i needed someone,you were there in my all lowest times supporting me and trying to make me happy with all the silly things you do and being around you brings a kind of peace I can't explain.", "You are the feeling that quitely grows in the heart, asking for nothing except the chance to exist. And maybe that's what it is.", "Your happiness has slowly become something I care about as much as my own. Seeing you smile makes my day lighter, my heart calmer, and for a moment, everything feels okay.", "I don't know about anything but  I only know that if you are smiling, a part of me is smiling  too."],false),pages=[...base.slice(0,4),...extra,...base.slice(4)];
 const mk=h=>{const d=document.createElement('div');d.className='leaf';d.innerHTML=h;b.appendChild(d);leaves.push(d)};
 mk(`<div class="card" style="position:absolute;inset:0"><img src="${FRONT}" alt="Birthday postcard front"><div class="cap">for Sammie,<br>who just turned twenty<small>tap to open ›</small></div></div>`);
 pages.forEach((pg,i)=>{let k=0;const h=pg.map(p=>`<p${p.first?' class="first"':''}>${p.t.replace(/&/g,'&amp;').replace(/</g,'&lt;').split(' ').map(w=>`<span class="w" style="--i:${k++}">${w}</span>`).join(' ')}</p>`).join('');mk(`<div class="txt">${h}</div><div class="pn">${i+1} / ${pages.length}</div>`)});
 mk(`<div class="card" style="position:absolute;inset:0"><div class="cap">always yours,<br>from a little corner of the internet<small>✦</small></div><img class="back" src="${BACK}" alt="Postcard back"></div>`);
 deco(pages.length);goto(0)}
let wt;
function deco(n){const add=(leaf,name,css,cls,h)=>{const d=document.createElement('div');d.className='ls '+cls;d.style.cssText=css;d.innerHTML=`<img src="${IMG[name]}" alt=""${h?` style="height:${h}px;width:auto"`:''}>`;leaf.appendChild(d)};
 const C={0:['ystar','top:8px;right:8px;width:42px;--r:12deg','tw2'],2:['cher','bottom:8px;left:8px;width:46px;--r:-8deg','fl3'],4:['star2','top:8px;right:8px;width:44px;--r:10deg','tw2'],7:['tai','bottom:10px;right:8px;width:50px;--r:-6deg','fl3']};
 for(const i in C)if(+i<n)add(leaves[+i+1],C[i][0],C[i][1],C[i][2]);
 const fr=[];for(let i=0;i<n;i++){const tx=leaves[i+1].querySelector('.txt'),l=tx.lastElementChild;fr.push([tx.clientHeight-(l.offsetTop+l.offsetHeight),i])}
 fr.sort((a,b)=>b[0]-a[0]).slice(0,2).filter(f=>f[0]>70).forEach(([f,i],k)=>add(leaves[i+1],['bear','heart'][k],`bottom:52px;right:66px;--r:${k?6:-5}deg`,k?'hb2':'fl3',Math.min(f-12,100)))}
function goto(n){cur=Math.max(0,Math.min(leaves.length-1,n));leaves.forEach((l,i)=>{const t=i<cur;l.classList.toggle('turned',t);setTimeout(()=>{l.style.zIndex=t?i:leaves.length-i},t?550:0);l.style.zIndex=l.style.zIndex||leaves.length-i});
 {const L=leaves[cur];if(!L.classList.contains('write')){void L.offsetWidth;L.classList.add('write')}clearTimeout(wt);wt=setTimeout(()=>leaves.forEach((l,i)=>{if(i!==cur)l.classList.remove('write')}),1300)}$('#prev').disabled=cur===0;$('#next').disabled=cur===leaves.length-1}
$('#next').onclick=()=>goto(cur+1);$('#prev').onclick=()=>goto(cur-1);
$('#book').addEventListener('click',e=>{const r=$('#book').getBoundingClientRect(),portrait=innerWidth<innerHeight;
 const pos=portrait?(e.clientY-r.top)/r.height:(e.clientX-r.left)/r.width;
 const frac=portrait?(r.height?pos:0):pos;
 // in rotated mode, screen-y maps to book-x reversed (rotate 90deg clockwise: top = left)
 if(frac>.7)goto(cur+1);else if(frac<.3)goto(cur-1)});
document.addEventListener('keydown',e=>{if(!$('#s-letter').classList.contains('on'))return;if(e.key==='ArrowRight')goto(cur+1);if(e.key==='ArrowLeft')goto(cur-1)});
let sx=null;document.addEventListener('touchstart',e=>sx=e.touches[0]);document.addEventListener('touchend',e=>{if(!sx||!$('#s-letter').classList.contains('on'))return;const t=e.changedTouches[0],p=innerWidth<innerHeight,d=p?(t.clientY-sx.clientY):(t.clientX-sx.clientX);if(Math.abs(d)>50)goto(cur+(d<0?1:-1));sx=null});
// fit: landscape stage, rotated on portrait phones
function fit(){const p=innerWidth<innerHeight,W=p?innerHeight:innerWidth,Hh=p?innerWidth:innerHeight;
 const s=Math.min((W-(p?20:130))/760,(Hh-30)/460);$('#fit').style.transform=`translate(-50%,-50%) ${p?'rotate(90deg)':''} scale(${s})`;
 $('#fit').style.width='760px';$('#fit').style.height='460px';document.body.classList.toggle('portrait',p);
 if(p){$('#prev').style.left='6px';$('#next').style.right='6px'}else{$('#prev').style.left='';$('#next').style.right=''}}
addEventListener('resize',fit);


// ---- intro prologue (original animation built from supplied stickers) ----
const IMG={"penguins": "assets/stickers/penguins.webp", "straw": "assets/stickers/straw.webp", "s3": "assets/stickers/s3.webp", "toast": "assets/stickers/toast.webp", "croi": "assets/stickers/croi.webp", "cup": "assets/stickers/cup.webp", "hat": "assets/stickers/hat.webp", "cats": "assets/stickers/cats.webp", "lips": "assets/stickers/lips.webp", "s2": "assets/stickers/s2.webp", "hedge": "assets/stickers/hedge.webp", "pup": "assets/stickers/pup.webp", "d5": "assets/stickers/d5.webp", "paint": "assets/stickers/paint.webp", "bal": "assets/stickers/bal.webp", "s4": "assets/stickers/s4.webp", "pstar": "assets/stickers/pstar.webp", "heart": "assets/stickers/heart.webp", "hb": "assets/stickers/hb.webp", "label": "assets/stickers/label.webp", "star2": "assets/stickers/star2.webp", "cake": "assets/stickers/cake.webp", "cher": "assets/stickers/cher.webp", "tai": "assets/stickers/tai.webp", "d1": "assets/stickers/d1.webp", "s1": "assets/stickers/s1.webp", "ystar": "assets/stickers/ystar.webp", "mel": "assets/stickers/mel.webp", "shoot": "assets/stickers/shoot.webp", "mouse": "assets/stickers/mouse.webp", "bstar": "assets/stickers/bstar.webp", "d4": "assets/stickers/d4.webp", "d3": "assets/stickers/d3.webp", "snB": "assets/stickers/snB.webp", "d2": "assets/stickers/d2.webp", "bear": "assets/stickers/bear.webp", "choc": "assets/stickers/choc.webp", "snA": "assets/stickers/snA.webp", "star1": "assets/stickers/star1.webp", "yak": "assets/stickers/yak.webp", "kit": "assets/stickers/kit.webp"};
let introDone=false,playing=false,fading=false,ei=0;
const ia=$('#ia'),intro=$('#s-intro'),tap=$('#tap'),stage=$('#stage'),word=$('#word'),lbl=$('#lbl');
const canVol=(()=>{au.volume=.5;const ok=Math.abs(au.volume-.5)<.01;au.volume=ok?0:1;return ok})();
function lay(){const w=stage.clientWidth,h=stage.clientHeight,U=Math.min(w,h*.5625);stage.style.setProperty('--u',U/100+'px');stage.style.setProperty('--sp',Math.max(1,w/U*.72))}
lay();addEventListener('resize',lay);
const AN={s1:'tw',s2:'tw',s3:'tw',s4:'tw',ystar:'tw',bstar:'tw',pstar:'tw',star1:'tw',star2:'tw',shoot:'tw',heart:'hbt',lips:'hbt',hb:'fl2',bal:'fl2',paint:'fl2',hat:'wob',snA:'wig',snB:'wig',bear:'wig',pup:'wig',mouse:'wig',hedge:'wig',mel:'wig',kit:'wig',toast:'wig',penguins:'sway',cats:'sway',label:'rev'};
function S(n,x,y,w,r=0,o={}){const d=document.createElement('div');d.className='st'+(o.c?' '+o.c:'');d.style.cssText=`--x:${x};--y:${y};--w:${w};--r:${r}deg;z-index:${o.z||2}`;
 if(o.dx!==undefined){d.style.setProperty('--dx',o.dx);d.style.setProperty('--dy',o.dy)}
 d.innerHTML=`<img src="${IMG[n]}" alt="">`;stage.appendChild(d);{const a=AN[n]||'bob',im=d.firstChild;im.style.animation=a==='rev'?'rev 1.2s .35s ease both':`${a} ${(2.4+Math.random()*1.8).toFixed(1)}s ease-in-out -${(Math.random()*2).toFixed(1)}s infinite alternate`}
 if(o.life){setTimeout(()=>d.classList.add('gone'),o.life-1500);setTimeout(()=>d.remove(),o.life)}return d}
function B(n,x,w,del){const d=document.createElement('div');d.className='ball';d.style.cssText=`--x:${x};--w:${w};animation-delay:${del}s`;d.innerHTML=`<div class="sw"><i></i><img src="${IMG[n]}" alt=""></div>`;stage.appendChild(d)}
function W(t,num){word.className=num?'num':'';word.innerHTML=t?`<span class="wp">${t}</span>`:''}
let peng,cake;
const T=t=>t<5?t:t+3, Q=t=>10+(t-7)*.85, L=4500;
const P=(t,n,x,y,w,r,z)=>[Q(t),()=>S(n,x,y,w,r,{z:z||2,life:L})];
const EV=[
[.1,()=>{lbl.innerHTML='<span class="wp">Sammie’s birthday in…</span>';cake=S('cake',50,52,66,0,{z:3,c:'still'});
  [[14.7,27],[27.2,11],[43.6,4],[60.6,5.8],[77.2,13]].forEach(([x,y])=>{const f=document.createElement('i');f.className='fl';f.style.cssText=`left:${x}%;top:${y}%`;cake.appendChild(f)})}],
[.2,()=>W('4',1)],[1.2,()=>W('3',1)],[2.2,()=>W('2',1)],[3.2,()=>W('1',1)],
[4.1,()=>{W('');lbl.innerHTML='<span class="wp">make a wish…</span>'}],
[5.6,()=>{lbl.innerHTML='<span class="wp">close your eyes…</span>'}],
[7.1,()=>{lbl.innerHTML='<span class="wp">now blow!</span>'}],
[7.5,()=>{cake.querySelectorAll('.fl').forEach((f,i)=>{f.classList.add('out');const s=document.createElement('i');s.className='sm';s.style.cssText=`left:${f.style.left};top:${f.style.top};--sx:${(i-2)*30}%;animation-delay:${i*.08}s`;cake.appendChild(s)});lbl.innerHTML='';intro.style.background='#d4d3dc'}],
[8.2,()=>{cake.classList.add('gone');for(let i=0;i<9;i++){const a=i/9*6.283;S('s'+(i%4+1),50,52,13,0,{c:'bst',dx:Math.cos(a)*55,dy:Math.sin(a)*45,z:6,life:1600})}}],
[T(6.4),()=>{intro.style.background='#fff';B('d1',20,26,0);B('d2',52,31,.15);B('d4',84,24,.3);peng=S('penguins',50,57,74,0,{z:3})}],
[9.9,()=>W('Happy')],[10.4,()=>W('birthday')],[11.1,()=>W('to')],[11.55,()=>W('you')],
[13.45,()=>W('Happy')],[13.9,()=>W('birthday')],[14.55,()=>W('to')],[15.05,()=>W('you')],
[17.2,()=>W('birthdayyyy')],
P(7,'cup',13,82,22,-8),P(7.6,'label',14,36,24,-5),P(8,'cher',87,82,19,8),P(8.6,'star2',88,38,15,12),
P(9,'toast',10,60,19,-6),P(9.5,'tai',50,93,18,4),P(10.1,'mel',90,60,21,7),P(10.7,'hedge',12,76,24,-4),
P(11,'heart',30,93,19,-5),P(11.6,'star1',89,20,16,-10),P(12,'pup',70,93,20,5),P(12.9,'kit',8,42,17,-8),
P(13,'ystar',91,76,12,12),P(13.2,'bstar',10,24,12,-12),P(13.6,'mouse',88,48,18,7),P(14,'bear',13,64,24,-6),P(14.4,'croi',84,66,17,10),
[16.8,()=>{W('Happy');const p=peng;p.style.animation='none';p.style.transform='translate(-50%,-50%) scale(1)';void p.offsetWidth;p.style.transition='transform 1s cubic-bezier(.5,0,.2,1)';p.style.transform='translate(-50%,-50%) scale(2.1)'}],
[18.2,()=>{S('hb',20,118,30,0,{c:'rise',z:5});S('paint',80,118,26,0,{c:'rise',z:5})}],
[18,()=>{W('Sammie!');peng.classList.add('gone');S('cats',50,60,96,0,{z:4})}],
[18.5,()=>S('s1',12,18,15,-12,{z:6})],[18.7,()=>S('s2',88,24,12,14,{z:6})],[18.9,()=>S('snA',15,86,25,-4,{z:6})],[19.1,()=>S('snB',85,85,21,4,{z:6})],[19.3,()=>S('hat',86,42,16,18,{z:6})],
[20.2,()=>{intro.style.background='';intro.classList.add('night');stage.classList.add('fade')}]
].sort((a,b)=>a[0]-b[0]);
let endT=0;
function loop(){const t=endT?ia.duration+(performance.now()-endT)/1000:ia.currentTime;while(ei<EV.length&&EV[ei][0]<=t){EV[ei][1]();ei++}if(t>=22.3&&!introDone)finish();if(!introDone)requestAnimationFrame(loop)}
function go(){if(playing)return;playing=true;tap.classList.add('hide');
 if(canVol){au.volume=0;au.play().then(()=>{au.pause();au.currentTime=0}).catch(()=>{})}
 ia.volume=1;ia.play().catch(()=>{playing=false;tap.classList.remove('hide')})}
function crossfade(){if(fading)return;fading=true;au.currentTime=0;au.volume=canVol?0:.7;au.play().catch(()=>{});
 if(!canVol)return;const t0=performance.now();(function s(){const k=Math.min(1,(performance.now()-t0)/3200);au.volume=.7*k;ia.volume=Math.max(0,1-k*2.2);if(k<1)requestAnimationFrame(s)})()}
function finish(){if(introDone)return;introDone=true;if(!fading)crossfade();started=true;mb.classList.add('on');setM();
 intro.classList.add('out');setTimeout(()=>intro.remove(),2400)}
ia.addEventListener('timeupdate',()=>{if(canVol&&ia.duration&&ia.currentTime>=ia.duration-1.5)crossfade()});
ia.addEventListener('ended',()=>{crossfade();endT=performance.now()});
ia.addEventListener('error',()=>{introDone=true;intro.remove()});
ia.addEventListener('playing',()=>{tap.classList.add('hide');playing=true;loop()},{once:true});
intro.addEventListener('pointerdown',go);
ia.play().catch(()=>tap.classList.remove('hide'));
