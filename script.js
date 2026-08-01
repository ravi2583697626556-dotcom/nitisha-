/* ── MUSIC & LOADING ───────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.getElementById('enter-btn');
  const loadingScreen = document.getElementById('loading-screen');
  const bgMusic = document.getElementById('bg-music');
  
  // Prevent scrolling while loading screen is active
  document.body.style.overflow = 'hidden';

  enterBtn.addEventListener('click', () => {
    // Play music
    bgMusic.play().catch(e => console.log('Audio play failed:', e));
    
    // Hide loading screen
    loadingScreen.classList.add('hidden');
    
    // Restore scrolling after fade out
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 800);
  });
});

/* ── PETAL RAIN ────────────────────────────── */
(function(){
  const box = document.getElementById('pbox');
  const petals = ['🌸','🌺','🌼','🌷','💮','🏵️'];
  const colors = ['#fda4af','#c4b5fd','#fdba74','#a7f3d0','#fde68a','#f9a8d4'];
  for(let i=0;i<24;i++){
    const el = document.createElement('div');
    el.className = 'pt';
    const useSvg = Math.random() > .5;
    if(useSvg){
      el.style.cssText = `
        left:${Math.random()*100}vw;
        width:${12+Math.random()*12}px;height:${12+Math.random()*12}px;
        border-radius:50% 0 50% 0;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        animation-duration:${6+Math.random()*7}s;
        animation-delay:${Math.random()*8}s;
      `;
    } else {
      el.innerHTML = petals[Math.floor(Math.random()*petals.length)];
      el.style.cssText = `
        left:${Math.random()*100}vw;
        font-size:${14+Math.random()*14}px;
        background:transparent;width:auto;height:auto;
        animation-duration:${6+Math.random()*7}s;
        animation-delay:${Math.random()*8}s;
      `;
    }
    box.appendChild(el);
  }
})();

/* ── NAV DOTS ──────────────────────────────── */
const pgs = Array.from({length:6},(_,i)=>document.getElementById('p'+(i+1)));
const dts = Array.from(document.querySelectorAll('.side-nav a'));
function goTo(n){pgs[n-1].scrollIntoView({behavior:'smooth'})}

const obs = new IntersectionObserver(ent=>{
  ent.forEach(e=>{
    if(e.isIntersecting){
      dts.forEach(d=>d.classList.remove('on'));
      const i = pgs.indexOf(e.target);
      if(dts[i]) dts[i].classList.add('on');
    }
  });
},{threshold:.5});
pgs.forEach(p=>obs.observe(p));

/* ── SCROLL REVEAL ─────────────────────────── */
const rObs = new IntersectionObserver(ent=>{
  ent.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');rObs.unobserve(e.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>rObs.observe(el));

/* ── KEYBOARD ──────────────────────────────── */
let cur=0;
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'||e.key==='PageDown'){cur=Math.min(5,cur+1);goTo(cur+1);}
  if(e.key==='ArrowUp'||e.key==='PageUp'){   cur=Math.max(0,cur-1);goTo(cur+1);}
});