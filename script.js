document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DEL SLIDER ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentSlide = 0;
    let slideInterval;

    // Función para mostrar un slide específico
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    if (slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        function startTimer() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetTimer() {
            clearInterval(slideInterval);
            startTimer();
        }

        startTimer();
    }

    // --- 2. LÓGICA DE PESTAÑAS (TABS) ---
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const navTriggers = document.querySelectorAll('.nav-trigger');

    function switchTab(targetId) {
        // Ocultar todas las secciones
        tabContents.forEach(section => {
            section.classList.remove('active-tab');
        });

        // Quitar clase activa del menú
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Mostrar sección objetivo
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-tab');
        }

        // Activar enlace en el menú
        navItems.forEach(item => {
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            }
        });

        // Scroll suave al tope (por si el contenido anterior era muy largo)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Listeners para el menú principal
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // Listeners para botones internos (ej. "Ver Colección")
    navTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Si es un botón dentro de un form, prevenimos el submit si no es el objetivo
            if(trigger.tagName !== 'BUTTON' || trigger.type !== 'submit') {
                e.preventDefault(); 
            }
            const targetId = trigger.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // --- 3. MENÚ MOBILE (Placeholder básico) ---
    const menuToggle = document.querySelector('.menu-toggle');
    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
           // Aquí podrías alternar una clase 'show' en .nav-links
           // Para este ejemplo, mostramos una alerta o podrías expandir el menú
           alert('Menú móvil: Implementar expansión aquí');
        });
    }
});