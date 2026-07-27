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
      musicText.innerText = 'Corazón Sin Cara';
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
      musicText.innerText = 'Corazón Sin Cara';
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
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerText = ['❤️', '💖', '💕', '🌸'][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 2 + 3 + 's';
  heart.style.fontSize = Math.random() * 15 + 15 + 'px';
  
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 400);

function createBurstHearts() {
  for(let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 50);
  }
}