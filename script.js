// Referencias a elementos del DOM
const startBtn = document.getElementById('start-btn');
const landingScreen = document.getElementById('landing-screen');
const interactionScreen = document.getElementById('interaction-screen');
const draggableChar = document.getElementById('draggable-char');
const instructionText = document.querySelector('#interaction-screen h2');
// --- NUEVA REFERENCIA ---
const hiddenNote = document.getElementById('hidden-note');

// --- FUNCIONALIDAD 1: CAMBIO DE PANTALLA ---
startBtn.addEventListener('click', () => {
  // Deslizamos la landing hacia la izquierda
  landingScreen.style.transform = 'translateX(-100%)';
  // Traemos la pantalla de interacción desde la derecha
  interactionScreen.style.transform = 'translateX(0)';
});


// --- FUNCIONALIDAD 2: DRAG & DROP TÁCTIL ---

let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;
// Umbral: cuánto debe moverlo para que cuente como "revelado"
const moveThreshold = 100;

// 1. Inicio del toque
draggableChar.addEventListener('touchstart', (e) => {
  if (draggableChar.classList.contains('char-moved')) return; // Si ya terminó, no hacer nada

  isDragging = true;
  // Obtenemos la posición inicial del primer dedo que toca
  startX = e.touches[0].clientX - currentX;
  startY = e.touches[0].clientY - currentY;

  // Pequeño efecto visual para indicar que se agarró
  draggableChar.style.scale = "1.1";
}, { passive: false });


// 2. Mover el dedo
draggableChar.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  // Previene el scroll de la pantalla mientras arrastramos el muñeco
  e.preventDefault();

  // Calcular nueva posición
  currentX = e.touches[0].clientX - startX;
  currentY = e.touches[0].clientY - startY;

  // Aplicar el movimiento al personaje
  draggableChar.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1)`;
}, { passive: false });


// 3. Soltar el dedo (ACTUALIZADO)
draggableChar.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  draggableChar.style.scale = "1"; // Vuelve a tamaño normal

  // Calcular distancia total movida desde el centro
  let distance = Math.sqrt(currentX * currentX + currentY * currentY);

  // Si movió el personaje lo suficiente lejos del centro...
  if (distance > moveThreshold) {
    // ¡Éxito!
    // 1. El personaje desaparece (gracias al nuevo CSS de .char-moved)
    draggableChar.classList.add('char-moved');

    // 2. Cambiamos el texto superior
    instructionText.textContent = "¡Felices Fiestas!";
    instructionText.style.color = "#fef9c7";

    // 3. --- NUEVO: Hacemos aparecer la nota ---
    // Usamos un pequeño retraso (setTimeout) de 300ms para que primero
    // empiece a desaparecer el personaje y luego aparezca la nota.
    setTimeout(() => {
      hiddenNote.classList.add('note-revealed');
    }, 300);

  } else {
    // Si no lo movió lo suficiente, el personaje regresa al centro
    currentX = 0;
    currentY = 0;
    draggableChar.style.transform = `translate(0px, 0px)`;
  }
});