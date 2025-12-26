const startBtn = document.getElementById('start-btn');
const landing = document.getElementById('landing-screen');
const interaction = document.getElementById('interaction-screen');
const char = document.getElementById('among-char');
const note = document.getElementById('hidden-note');

// Cambio de pantalla sin errores
startBtn.addEventListener('click', () => {
    landing.classList.add('exit');
    setTimeout(() => {
        landing.style.display = 'none';
        interaction.classList.remove('hidden');
        interaction.classList.add('active');
    }, 600);
});

// Lógica de arrastre (Touch)
let isDragging = false;
let startX, startY, currentX = 0, currentY = 0;

char.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX - currentX;
    startY = e.touches[0].clientY - currentY;
    char.style.transition = "none";
}, { passive: false });

char.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.touches[0].clientX - startX;
    currentY = e.touches[0].clientY - startY;
    char.style.transform = `translate(${currentX}px, ${currentY}px)`;
}, { passive: false });

char.addEventListener('touchend', () => {
    isDragging = false;
    const distance = Math.sqrt(currentX * currentX + currentY * currentY);

    if (distance > 100) {
        char.style.transition = "all 0.6s ease-out";
        char.style.opacity = "0";
        char.style.transform = `translate(${currentX * 1.5}px, ${currentY * 1.5}px) scale(0)`;
        setTimeout(() => {
            note.classList.add('revealed');
            char.style.display = 'none';
        }, 300);
    } else {
        char.style.transition = "transform 0.3s ease";
        currentX = 0; currentY = 0;
        char.style.transform = `translate(0,0)`;
    }
});
