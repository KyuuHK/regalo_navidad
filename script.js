const startBtn = document.getElementById('start-btn');
const landing = document.getElementById('landing-screen');
const interaction = document.getElementById('interaction-screen');
const character = document.getElementById('among-char');
const note = document.getElementById('hidden-note');

// Cambio de pantalla corregido
startBtn.addEventListener('click', () => {
    landing.classList.add('fade-out'); // Usa la nueva clase que desactiva eventos
    interaction.classList.remove('hidden');
    interaction.classList.add('active');
    
    // Opcional: Eliminar del DOM tras la animación para seguridad total
    setTimeout(() => {
        landing.style.display = 'none';
    }, 700);
});

let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;

character.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX - currentX;
    startY = e.touches[0].clientY - currentY;
    character.style.transition = "none";
}, { passive: false });

character.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.touches[0].clientX - startX;
    currentY = e.touches[0].clientY - startY;
    character.style.transform = `translate(${currentX}px, ${currentY}px)`;
}, { passive: false });

character.addEventListener('touchend', () => {
    isDragging = false;
    const distance = Math.sqrt(currentX * currentX + currentY * currentY);

    if (distance > 120) {
        character.style.transition = "all 0.5s ease-out";
        character.style.opacity = "0";
        character.style.transform = `translate(${currentX * 1.5}px, ${currentY * 1.5}px) scale(0)`;
        
        setTimeout(() => {
            note.classList.add('note-revealed');
            character.style.display = "none";
        }, 300);
    } else {
        character.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        currentX = 0; currentY = 0;
        character.style.transform = `translate(0,0)`;
    }
});
