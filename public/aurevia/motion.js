/* Shared motion + nav for all Aurevia pages */
gsap.registerPlugin(ScrollTrigger);

// 1. Smooth Scroll (Lenis) - Sirf ek baar banega
if (!window.aureviaLenis) {
  window.aureviaLenis = new Lenis({ duration: 1.05, easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t)) });
  function raf(t){ window.aureviaLenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  window.aureviaLenis.on('scroll', ScrollTrigger.update);
}

// 💥 HAR PAGE CHANGE PAR YE SAFE FUNCTION CHALEGA 💥
window.refreshAureviaAnimations = function() {
  
  // A. Purane triggers saaf karo taaki naye me gadbad na ho
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
  
  if (window.aureviaLenis) window.aureviaLenis.resize();

  // B. SAFE SPLIT WORDS - Ye check karega ki text pehle se toota hua toh nahi hai!
  function splitWords(el){
    // Agar pehle se split hai toh dobara mat todo (Isse layout nahi tootega)
    if(el.dataset.splitted) return Array.from(el.querySelectorAll('span'));
    
    const text = el.textContent;
    el.textContent = '';
    const words = [];
    text.split(/(\s+)/).forEach(part => {
      if(/^\s+$/.test(part)){ el.appendChild(document.createTextNode(part)); return; }
      if(!part) return;
      const w = document.createElement('span');
      w.style.display = 'inline-block';
      w.style.willChange = 'transform';
      w.textContent = part;
      el.appendChild(w);
      words.push(w);
    });
    el.dataset.splitted = "true"; // Mark kar diya
    return words;
  }

  // C. Reveal on scroll
  const reveals = gsap.utils.toArray('.js-reveal');
  if (reveals.length > 0) {
    reveals.forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  }

  // D. Split Text Reveal
  const splits = gsap.utils.toArray('.js-split');
  if (splits.length > 0) {
    splits.forEach(el => {
      const words = splitWords(el);
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.to(words, {
        yPercent: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  }

  // E. Magnetic Buttons
  document.querySelectorAll('.magnetic').forEach(btn => {
    const newBtn = btn.cloneNode(true);
    if(btn.parentNode) btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('mousemove', e => {
      const r = newBtn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      gsap.to(newBtn, { x: x*0.25, y: y*0.4, duration: 0.4, ease: 'power3.out' });
    });
    newBtn.addEventListener('mouseleave', () => gsap.to(newBtn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.4)' }));
  });

  // F. Number Counters (Ab 0 0 0 pe nahi atkega)
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const numSpan = el.querySelector('.n');
    if(!numSpan) return;
    
    numSpan.textContent = "0"; // Reset counter
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, { v: target, duration: 1.8, ease: 'power2.out', onUpdate: () => {
          numSpan.textContent = Math.round(obj.v);
        }});
      }
    });
  });

  // G. Homepage Hero Animations (NULL SAFE - Agar element page par nahi hai toh crash nahi hoga)
  if (document.querySelector('.hero-headline')) {
    const lines = document.querySelectorAll('.hero-headline .line span');
    if(lines.length > 0) gsap.set(lines, { yPercent: 110 });
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    const eyebrow = document.getElementById('heroEyebrow');
    if(eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8 });
    
    if(lines.length > 0) tl.to(lines, { yPercent: 0, duration: 1.1, stagger: 0.12 }, '-=0.4');
    
    const tag = document.getElementById('heroTag');
    if(tag) tl.to(tag, { opacity: 1, duration: 0.8 }, '-=0.6');
    
    const sub = document.getElementById('heroSub');
    if(sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.9 }, '-=0.6');
    
    const acts = document.getElementById('heroActions');
    if(acts) tl.to(acts, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7');
    
    const vis = document.getElementById('heroVisual');
    if(vis) tl.to(vis, { opacity: 1, y: 0, duration: 1.1 }, '-=1');

    const fls = document.querySelectorAll('.float-label');
    if(fls.length > 0) {
      gsap.fromTo(fls, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 1.5 });
      if(document.querySelector('.fl-1')) gsap.to('.fl-1', { y: -8, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      if(document.querySelector('.fl-2')) gsap.to('.fl-2', { y: 10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3 });
      if(document.querySelector('.fl-3')) gsap.to('.fl-3', { y: -6, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.6 });
    }
    if(document.querySelector('.doctor-card')) {
      gsap.to('.doctor-card', { y: -12, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }
  }

  // H. Doctor Card Tilt
  const lc = document.getElementById('doctorCard');
  const hv = document.querySelector('.hero-visual');
  if(lc && hv){
    hv.addEventListener('mousemove', e => {
      const r = lc.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) / r.width;
      const y = (e.clientY - r.top - r.height/2) / r.height;
      gsap.to(lc, { rotateY: x*8, rotateX: -y*8, duration: 0.6, ease: 'power3.out', transformPerspective: 800 });
    });
    hv.addEventListener('mouseleave', () => {
      gsap.to(lc, { rotateY: 0, rotateX: 0, duration: 0.9, ease: 'elastic.out(1,0.4)' });
    });
  }

  // I. Treatment Rows
  const treats = document.querySelectorAll('.treat-row');
  if(treats.length > 0) {
    gsap.fromTo('.treat-row', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.treat-list', start: 'top 75%' }});
  }

  // J. Process Steps
  gsap.utils.toArray('.step').forEach((s,i) => {
    const knob = s.querySelector('.knob');
    if(knob) {
      gsap.fromTo(knob, { scale: 0 }, { scale: 1, duration: 0.6, delay: i*0.1, ease: 'back.out(2)', scrollTrigger: { trigger: s, start: 'top 80%' }});
    }
  });

  // Halka sa delay dekar refresh, taaki page properly load ho jaye
  setTimeout(() => { 
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); 
  }, 200);
};

// Pehli baar website khulte hi chalao
window.refreshAureviaAnimations();