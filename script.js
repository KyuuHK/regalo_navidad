const startBtn = document.getElementById('start-btn');
const landing = document.getElementById('landing-screen');
const interaction = document.getElementById('interaction-screen');
const character = document.getElementById('among-char');
const note = document.getElementById('hidden-note');
const title = document.getElementById('main-title');
const instruction = document.getElementById('instruction-text');

// Cambio de pantalla
startBtn.addEventListener('click', () => {
    landing.classList.remove('active');
    // landing.style.transform = 'translateX(-100%)'; // Ya no es necesario con las clases
    interaction.classList.remove('hidden');
    interaction.classList.add('active');
});

// Variables para el movimiento táctil
let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;

// Inicio del toque
character.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX - currentX;
    startY = e.touches[0].clientY - currentY;
    character.style.transition = "none";
}, { passive: false });

// Movimiento
character.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    currentX = e.touches[0].clientX - startX;
    currentY = e.touches[0].clientY - startY;

    character.style.transform = `translate(${currentX}px, ${currentY}px)`;
}, { passive: false });

// Final del toque
character.addEventListener('touchend', () => {
    isDragging = false;
    
    const distance = Math.sqrt(currentX * currentX + currentY * currentY);

    if (distance > 100) {
        character.style.transition = "all 0.6s ease-out";
        character.style.opacity = "0";
        character.style.transform = `translate(${currentX * 2}px, ${currentY * 2}px) scale(0)`;
        
        setTimeout(() => {
            note.classList.add('note-revealed');
            title.textContent = "¡Sorpresa Lograda!";
            instruction.style.opacity = "0";
            character.style.display = "none";
        }, 300);
    } else {
        character.style.transition = "transform 0.3s ease";
        currentX = 0;
        currentY = 0;
        character.style.transform = `translate(0,0)`;
    }
});
