// ===== Помощники =====
const $ = s => document.querySelector(s);

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}
function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function shuffle(a) {
  return a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
}

// ===== Данные о людях (заполните: день рождения, увлечение, девиз) =====
const INFO = {
  'Кенешбекова Айпери': { birthday: '', hobby: '', motto: '' },
  'Касымбекова Нурайым': { birthday: '', hobby: '', motto: '' },
  'Кутбидинова Айназик': { birthday: '', hobby: '', motto: '' },
  'Мажитов Илияз': { birthday: '18.07.10', hobby: 'Футбол', motto: 'Идиназуй' },
  'Маматова Айганыш': { birthday: '23.03.2010', hobby: 'Рисовать, петь', motto: 'Ребята, че то не вайб сегодня на пары идти' },
  'Мырзабекова Асема': { birthday: '', hobby: '', motto: '' },
  'Наватов Нуртилек': { birthday: ')30.11.2009', hobby: 'Электротехника,схемотехника, программирование,робототехника,прикладная физика', motto: 'Не комментируем легаси😉' },
  'Сализов Ханиф': { birthday: '', hobby: '', motto: '' },
  'Самакова Сауле': { birthday: '23.03.10', hobby: 'музыка, корейская индустрия, изучение языков, фильмы', motto: 'Дорогу, которую ты выбрал, нужно пройти до конца' },
  'Самыйбеков Шабдан': { birthday: ' 22.06.09', hobby: 'перспективное', motto: 'хорош не тот замок который может открыть все ключи а хорош тот ключ который может открыть все замки' },
  'Талантбекова Аделина': { birthday: '', hobby: '', motto: '' },
  'Тердикбаева Назик': { birthday: '20.10.09', hobby: 'Танцы и рисование', motto: 'Born to die' },
  'Токтомушов Адахан': { birthday: '30.09.2008', hobby: 'Футбол, кино, аниме, рисование', motto: 'живи сейчас остaльное потом' },
  'Туншансин Амир': { birthday: '29.10.2009', hobby: 'ПК', motto: 'Работает не трогай' },
  'Тургунбеков Тенирберди': { birthday: '22.12.09', hobby: 'игры, кодинг, рисование', motto: 'только вперёд!!!' },
  'Шабидинов Нурэл': { birthday: '', hobby: '', motto: '' },
};

// ===== Звук «поп» =====
let audioCtx;
function playPop() {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600 + Math.random() * 300, t);
  osc.frequency.exponentialRampToValueAtTime(120, t + 0.12);
  gain.gain.setValueAtTime(0.3, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.13);
}

// ===== Брызги =====
function splash(x, y, color) {
  const count = 10;
  for (let i = 0; i < count; i++) {
    const d = el('div', 'drop');
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 40 + Math.random() * 50;
    d.style.left = x + 'px';
    d.style.top = y + 'px';
    d.style.background = color;
    d.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    d.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 500);
  }
}

// ===== Конфетти =====
const colors = ['#9036b9', '#ff2aad', '#0ab86f', '#d37a07', '#76a30c', '#b40a2f'];
const confettiColors = [...colors, '#ffd23f', '#3bc9ff'];

function confetti(x, y, count = 40) {
  for (let i = 0; i < count; i++) {
    const c = el('div', 'confetti');
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 160;
    c.style.left = x + 'px';
    c.style.top = y + 'px';
    c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    c.style.animationDuration = 0.9 + Math.random() * 0.7 + 's';
    c.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    c.style.setProperty('--dy', Math.sin(angle) * dist - 80 + 'px');
    c.style.setProperty('--rot', Math.random() * 720 + 'deg');
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1700);
  }
}

// ===== Пузырьки =====
function createBubble(initial = false) {
  const b = el('div', 'bubble');
  const size = 30 + Math.random() * 90;
  b.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random() * 100}vw;
    background:${colors[Math.floor(Math.random() * colors.length)]};
    animation-duration:${10 + Math.random() * 15}s;
    animation-delay:${initial ? -Math.random() * 20 : 0}s;`;

  b.addEventListener('pointerdown', () => {
    const r = b.getBoundingClientRect();
    splash(r.left + r.width / 2, r.top + r.height / 2, b.style.background);
    playPop();
    b.classList.add('pop');
    setTimeout(() => { b.remove(); createBubble(); }, 250);
  });

  document.body.appendChild(b);
}
for (let i = 0; i < 14; i++) createBubble(true);

// ===== Ночная тема =====
const root = document.documentElement;
const themeBtn = $('#themeBtn');

function setTheme(t) {
  root.dataset.theme = t;
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
  save('theme', t);
}
setTheme(load('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

// ===== Карточки =====
const swiper = new Swiper('.mySwiper', {
  effect: 'cards',
  grabCursor: true,
  perSlideRotate: 2,
  perSlideOffset: 8,
});

const slides = [...document.querySelectorAll('.swiper-slide')];
const counter = $('#counter');

// Номер карточки
function updateCounter() {
  counter.textContent = (swiper.activeIndex + 1) + ' из ' + slides.length;
}
updateCounter();
swiper.on ('slideChange', () => {
  updateCounter();
  slides.forEach(s => s.classList.remove('flipped'));  
  });
function backRow(icon, label, value) {
  const p = el('p');
  p.append(el('b', '', icon + ' ' + label), el('span', '', value || 'пока не заполнено'));
  return p;
};

slides.forEach(slide => {
  const name = slide.querySelector('h2').textContent.trim();
  const info = INFO[name] || {};

  const back = el('div', 'card-back');
  back.append(
    el('h3', '', name),
    backRow('🎂', 'День рождения', info.birthday),
    backRow('⭐', 'Увлечение', info.hobby),
    backRow('💬', 'Девиз', info.motto)
  );
  slide.append(back);

  slide.addEventListener('click', () => {
    if (!slide.classList.contains('swiper-slide-active')) return;
    if (slide.classList.contains('flipping')) return;
    slide.classList.add('flipping');
    setTimeout(() => slide.classList.toggle('flipped'), 200);   // на середине — меняем сторону
    setTimeout(() => slide.classList.remove('flipping'), 250);
  });
});

// Кнопка «Случайный человек» + конфетти
$('#randomBtn').addEventListener('click', () => {
  let next;
  do {
    next = Math.floor(Math.random() * slides.length);
  } while (next === swiper.activeIndex);
  swiper.slideTo(next, 600);

  const r = $('.mySwiper').getBoundingClientRect();
  confetti(r.left + r.width / 2, r.top + r.height / 2, 50);
});

// ===== Викторина «Кто это?» =====
const quiz = $('#quiz');
const quizBody = $('#quizBody');
let questions = [], qi = 0, score = 0, locked = false, session = 0;

function startQuiz() {
  const all = slides.map(s => ({
    name: s.querySelector('h2').textContent.trim(),
    src: s.querySelector('img').getAttribute('src'),
  }));
  questions = shuffle(all).slice(0, Math.min(10, all.length)).map(p => ({
    ...p,
    options: shuffle([p, ...shuffle(all.filter(o => o !== p)).slice(0, 3)]).map(o => o.name),
  }));
  qi = 0; score = 0; locked = false; session++;
  quiz.classList.add('open');
  renderQuestion();
}

function renderQuestion() {
  const q = questions[qi];
  quizBody.replaceChildren();

  const img = el('img', 'quiz-photo');
  img.src = q.src;
  img.alt = '';

  const list = el('div', 'quiz-options');
  q.options.forEach(name => {
    const b = el('button', 'quiz-option', name);
    b.addEventListener('click', () => answer(b, name, q, list));
    list.append(b);
  });

  quizBody.append(
    el('div', 'quiz-meta', `Вопрос ${qi + 1} из ${questions.length} · Очки: ${score}`),
    img,
    el('h3', 'quiz-title', 'Кто это?'),
    list
  );
}

function answer(btn, name, q, list) {
  if (locked) return;
  locked = true;
  const mySession = session;

  if (name === q.name) {
    score++;
    btn.classList.add('correct');
    const r = btn.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top, 24);
  } else {
    btn.classList.add('wrong');
    [...list.children].forEach(b => { if (b.textContent === q.name) b.classList.add('correct'); });
  }

  setTimeout(() => {
    if (mySession !== session) return;  
    locked = false;
    qi++;
    if (qi < questions.length) renderQuestion(); else finishQuiz();
  }, 1000);
}

function finishQuiz() {
  const best = Math.max(score, Number(load('quizBest')) || 0);
  save('quizBest', best);

  quizBody.replaceChildren();
  const again = el('button', 'icon-btn', 'Играть ещё');
  const close = el('button', 'icon-btn', 'Закрыть');
  again.addEventListener('click', startQuiz);
  close.addEventListener('click', closeQuiz);

  const actions = el('div', 'quiz-actions');
  actions.append(again, close);

  quizBody.append(
    el('div', 'quiz-result', score === questions.length ? '🏆' : '🎉'),
    el('h3', 'quiz-title', `Результат: ${score} из ${questions.length}`),
    el('div', 'quiz-meta', `Рекорд: ${best}`),
    actions
  );

  if (score === questions.length) {
    confetti(innerWidth / 2, innerHeight / 3, 80);
  } else if (score >= questions.length / 2) {
    confetti(innerWidth / 2, innerHeight / 3, 40);
  }
}

function closeQuiz() {
  quiz.classList.remove('open');
  session++;
  locked = false;
}

$('#quizBtn').addEventListener('click', startQuiz);
$('#quizClose').addEventListener('click', closeQuiz);
quiz.addEventListener('click', e => { if (e.target === quiz) closeQuiz(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuiz(); });