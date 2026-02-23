
/* Mobile Nav */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

/* Year */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

/* Hero Slideshow */
const slides = Array.from(document.querySelectorAll('.hero__slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
let i = 0;
function setSlide(idx){
  slides.forEach((s, n) => s.classList.toggle('is-active', n === idx));
  dots.forEach((d, n) => d.classList.toggle('is-active', n === idx));
  i = idx;
}
dots.forEach(d => d.addEventListener('click', () => setSlide(parseInt(d.dataset.i, 10))));

setInterval(() => {
  const next = (i + 1) % slides.length;
  setSlide(next);
}, 4500);

/* Gallery Slider */
const track = document.getElementById('galleryTrack');
const gPrev = document.getElementById('gPrev');
const gNext = document.getElementById('gNext');

let gIndex = 0;
function galleryStep(dir){
  if (!track) return;
  const imgs = Array.from(track.querySelectorAll('img'));
  if (imgs.length === 0) return;

  gIndex = Math.max(0, Math.min(imgs.length - 1, gIndex + dir));
  const item = imgs[gIndex];
  // Move so that selected image is aligned to left padding (approx)
  const left = item.offsetLeft;
  track.style.transform = `translateX(${-left}px)`;
}
if (gPrev) gPrev.addEventListener('click', () => galleryStep(-1));
if (gNext) gNext.addEventListener('click', () => galleryStep(1));

/* WhatsApp Form -> prefilled message */
const waBtn = document.getElementById('waSend');
if (waBtn){
  waBtn.addEventListener('click', () => {
    const name = (document.getElementById('fName')?.value || '').trim();
    const phone = (document.getElementById('fPhone')?.value || '').trim();
    const service = (document.getElementById('fService')?.value || '').trim();
    const msg = (document.getElementById('fMsg')?.value || '').trim();

    const lines = [
      'Hallo A.K Performance,',
      'ich möchte einen Termin anfragen.',
      '',
      `Name: ${name || '-'}`,
      `Telefon: ${phone || '-'}`,
      `Leistung: ${service || '-'}`,
      `Nachricht: ${msg || '-'}`
    ];
    const text = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/4917620930543?text=${text}`;
    window.open(url, '_blank');
  });
}
