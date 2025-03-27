// Espera a que el DOM este completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona los elementos principales del carrusel
    const container = document.querySelector('.carousel-container'); 
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    // Selecciona elementos para el cambio de tema
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    // Selecciona elementos para el modal de imagen
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-contenido img');
    const cerrar = document.querySelector('.cerrar');
    const carouselImages = document.querySelectorAll('.carousel-slide img');

    // Variables para controlar el estado del carrusel
    let currentIndex = 0;
    let autoSlideInterval;

    // Función para mover el carrusel a la posición actual
    function moveCarousel() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualiza los indicadores de posicion
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        moveCarousel();
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        moveCarousel();
    }

    // Inicia el cambio automático de slides
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3500);
    }

    // Detiene el cambio automatico de slides
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Funcion para cambiar entre modos claro y oscuro
    function toggleTheme() {
        if (htmlElement.classList.contains('light-mode')) {
            htmlElement.classList.remove('light-mode');
            htmlElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark-mode');
            htmlElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    // Añade evento de click a todas las imagenes del carrusel para abrir modal
    carouselImages.forEach(img => {
        img.addEventListener('click', () => {
            // Muestra el modal
            modal.style.display = 'flex';
            
            // Configura la imagen del modal
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });

    // Cierra el modal al hacer click en el boton de cerrar
    cerrar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cierra el modal si se hace click fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Restaura el tema guardado en el almacenamiento local
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.classList.remove('light-mode', 'dark-mode');
        htmlElement.classList.add(`${savedTheme}-mode`);
    }

    // Eventos para los botones de navegacion
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    // Evento para cambiar de tema
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Eventos para los indicadores de slide
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            moveCarousel();
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Inicia el cambio automatico de slides
    startAutoSlide();

    // Detiene el cambio automático al pasar el ratón sobre el carrusel
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);
});