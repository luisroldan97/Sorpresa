const music = document.getElementById('bgMusic');
const musicText = document.getElementById('musicText');
const musicIcon = document.getElementById('musicIcon');
const albumCover = document.getElementById('albumCover');
const equalizer = document.getElementById('equalizer');
const bars = document.querySelectorAll('.equalizer .bar');

let isPlaying = false;
let eqInterval = null;

// Simulación de ritmo orgánico en vivo para las barras
function startEqualizerAnimation() {
  if (eqInterval) clearInterval(eqInterval);
  
  eqInterval = setInterval(() => {
    if (!isPlaying) return;
    
    bars.forEach((bar) => {
      // Genera alturas aleatorias continuas entre 20% y 100%
      const randomHeight = Math.floor(Math.random() * 80) + 20;
      bar.style.height = `${randomHeight}%`;
    });
  }, 100); // Se actualiza cada 100ms para dar la sensación de cuarteto en vivo
}

function stopEqualizerAnimation() {
  if (eqInterval) clearInterval(eqInterval);
  bars.forEach((bar) => {
    bar.style.height = '15%'; // Vuelve a su estado mínimo
  });
}

// Control de reproducción de música
function toggleMusic() {
  if (isPlaying) {
    music.pause();
    musicText.innerText = 'Pausado';
    musicIcon.style.display = 'inline';
    albumCover.classList.add('hidden');
    albumCover.classList.remove('playing');
    equalizer.classList.add('hidden');
    stopEqualizerAnimation();
  } else {
    music.play().then(() => {
      musicText.innerText = 'Plan A, Plan B, Plan C';
      musicIcon.style.display = 'none';
      albumCover.classList.remove('hidden');
      albumCover.classList.add('playing');
      equalizer.classList.remove('hidden');
      startEqualizerAnimation();
    }).catch((err) => {
      console.log("Error al reproducir audio:", err);
    });
  }
  isPlaying = !isPlaying;
}

                        // Iniciar música al primer toque en la pantalla
document.body.addEventListener('click', function startAudioOnInteraction() {
  if (!isPlaying) {
    music.play().then(() => {
      isPlaying = true;
      musicText.innerText = 'Plan A, Plan B, Plan C';
      musicIcon.style.display = 'none';
      albumCover.classList.remove('hidden');
      albumCover.classList.add('playing');
      equalizer.classList.remove('hidden');
      startEqualizerAnimation();
    }).catch(() => {
      // Bloqueo de inicio automático del navegador
    });
  }
}, { once: true });

// Mostrar/ocultar el texto de las razones
function toggleReason(element) {
  const text = element.querySelector('.reason-text');
  const isVisible = text.style.display === 'block';
  text.style.display = isVisible ? 'none' : 'block';
}

// Control del Modal final
function openModal() {
  document.getElementById('myModal').style.display = 'flex';
  createBurstHearts();
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}

// Animación de corazones flotantes de fondo
// Función para crear el corazón flotante
// Función para crear el corazón flotante GRANDE y RÁPIDO
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerText = ['❤️', '💖', '💕', '🌸'][Math.floor(Math.random() * 4)];
  
  // Posición horizontal aleatoria
  heart.style.left = Math.random() * 100 + 'vw';
  
  // --- CAMBIO 1: DURACIÓN MÁS CORTA (Más rápido) ---
  // Antes era (Math.random() * 3 + 4) -> entre 4s y 7s.
  // Ahora: (Math.random() * 2 + 2) -> entre 2s y 4s.
  const duration = Math.random() * 2 + 2;
  heart.style.animationDuration = duration + 's';
  
  // --- CAMBIO 2: TAMAÑO MÁS GRANDE ---
  // Antes era (Math.random() * 12 + 14) -> entre 14px y 26px.
  // Ahora: (Math.random() * 15 + 25) -> entre 25px y 40px.
  heart.style.fontSize = Math.random() * 15 + 25 + 'px';
  
  document.body.appendChild(heart);

  // Se elimina automáticamente al terminar la animación
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// --- CAMBIO 3: GENERACIÓN MÁS FRECUENTE ---
// Al ser más rápidos, necesitamos crear más seguido para que no se vea vacío.
// De 800ms bajamos a 400ms.
setInterval(createHeart, 400);

// Fecha y hora actual
/*const now = new Date();

// Fecha objetivo: El 31 de este mes a las 00:00:00 hs
const targetDate = new Date(now.getFullYear(), now.getMonth(), 31, 0, 0, 0).getTime();

function updateCountdown() {
  const currentTime = new Date().getTime();
  const distance = targetDate - currentTime;

  const countdownElement = document.getElementById('countdown-container');
  const surpriseElement = document.getElementById('surprise-box');
  const reasonsSection = document.getElementById('section-reasons'); // ID corregido
  const musicPlayer = document.getElementById('musicBtn');
  const saludo = document.getElementById('saludo');

  // SI YA LLEGÓ EL DÍA 31 A LAS 00:00 HS:
  if (distance <= 0) {
    if (countdownElement) countdownElement.classList.add('oculto');    // Oculta el reloj
    if (surpriseElement) surpriseElement.classList.remove('oculto');  // Muestra la sorpresa
    if (reasonsSection) reasonsSection.classList.remove('oculto');    // Muestra las razones
    if (musicPlayer) musicPlayer.classList.remove('oculto');          // Muestra la música
    if (saludo) saludo.classList.remove('oculto');                    // Muestra el saludo
    return;
  }

  // MIENTRAS NO SEA LA FECHA:
  if (countdownElement) countdownElement.classList.remove('oculto');
  if (surpriseElement) surpriseElement.classList.add('oculto');
  if (reasonsSection) reasonsSection.classList.add('oculto');
  if (musicPlayer) musicPlayer.classList.add('oculto');

  // Cálculos de tiempo
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  // Asignación de valores
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (daysEl) daysEl.innerText = d < 10 ? '0' + d : d;
  if (hoursEl) hoursEl.innerText = h < 10 ? '0' + h : h;
  if (minutesEl) minutesEl.innerText = m < 10 ? '0' + m : m;
  if (secondsEl) secondsEl.innerText = s < 10 ? '0' + s : s;
}

// Ejecutar cada 1 segundo
setInterval(updateCountdown, 1000);
updateCountdown(); 
*/

// Configuración: El 31 de este mes a las 00:00:00 hs
const nowDevice = new Date();
const targetDate = new Date(nowDevice.getFullYear(), nowDevice.getMonth(), 4, 0, 0, 0).getTime();

// Variable para guardar la hora real de internet
let realNow = null;

// Función para obtener la hora real desde internet (Servidor)
async function fetchRealTime() {
  try {
    // Consultamos la hora oficial
    const response = await fetch('https://worldtimeapi.org/api/ip');
    const data = await response.json();
    realNow = new Date(data.datetime).getTime();
  } catch (error) {
    // Si no hay internet o falla la API, usamos la del dispositivo como respaldo
    realNow = new Date().getTime();
  }
}

async function updateCountdown() {
  // Si todavía no tenemos la hora del servidor, la pedimos
  if (!realNow) {
    await fetchRealTime();
  } else {
    // Avanzamos 1 segundo el tiempo real
    realNow += 1000;
  }

  const distance = targetDate - realNow;

  const countdownElement = document.getElementById('countdown-container');
  const surpriseElement = document.getElementById('surprise-box');
  const reasonsSection = document.getElementById('section-reasons');
  const musicPlayer = document.getElementById('musicBtn');
  const saludo = document.getElementById('saludo');

  // SI YA LLEGÓ EL DÍA 31 A LAS 00:00 HS REALES:
  if (distance <= 0) {
    if (countdownElement) countdownElement.classList.add('oculto');    // Oculta el reloj
    if (surpriseElement) surpriseElement.classList.remove('oculto');  // Muestra la sorpresa
    if (reasonsSection) reasonsSection.classList.remove('oculto');    // Muestra las razones
    if (musicPlayer) musicPlayer.classList.remove('oculto');  
    if (saludo) saludo.classList.remove('oculto');
    return;
  }

  // MIENTRAS NO SEA LA FECHA REAL:
  if (countdownElement) countdownElement.classList.remove('oculto');
  if (surpriseElement) surpriseElement.classList.add('oculto');
  if (reasonsSection) reasonsSection.classList.add('oculto');
  if (musicPlayer) musicPlayer.classList.add('oculto');

  // Cálculos matemáticos de tiempo
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  // Formato de 2 dígitos
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (daysEl) daysEl.innerText = d < 10 ? '0' + d : d;
  if (hoursEl) hoursEl.innerText = h < 10 ? '0' + h : h;
  if (minutesEl) minutesEl.innerText = m < 10 ? '0' + m : m;
  if (secondsEl) secondsEl.innerText = s < 10 ? '0' + s : s;
}

// Sincronizar hora cada 5 minutos por precisión extra
setInterval(fetchRealTime, 300000);

// Actualizar reloj en pantalla cada 1 segundo
setInterval(updateCountdown, 1000);
updateCountdown();