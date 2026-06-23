/* ==========================================================================
   DUALIA — Premium Interactions & Logic (index.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- STICKY HEADER & SCROLL TRACKING ---
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        // Toggle header scrolled class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active section tracking in navbar
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- MOBILE MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('mobile-open');
            navMenu.classList.toggle('mobile-open');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', !isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden'; // Lock body scroll when menu open
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
    const animationElements = document.querySelectorAll('.fade-in-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animationElements.forEach(el => revealObserver.observe(el));

    // --- TOAST NOTIFICATION SYSTEM ---
    const toast = document.getElementById('toast');
    
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // --- COPY TO CLIPBOARD ---
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-copy');
            if (email) {
                navigator.clipboard.writeText(email)
                    .then(() => {
                        showToast(`Copiado: ${email}`);
                        btn.textContent = 'Copiado';
                        btn.style.backgroundColor = 'var(--text-white)';
                        btn.style.color = 'var(--bg-dark)';
                        
                        setTimeout(() => {
                            btn.textContent = 'Copiar';
                            btn.style.backgroundColor = 'transparent';
                            btn.style.color = 'var(--text-white)';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Error al copiar el mail: ', err);
                        showToast('Error al copiar el mail. Por favor escríbalo manualmente.');
                    });
            }
        });
    });



    // --- BACKGROUND SLIDESHOW (HERO ONLY) ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const totalSlides = heroSlides.length;
    const slideInterval = 5000; // Cambiar imagen cada 5 segundos

    function nextSlide() {
        if (totalSlides <= 1) return;
        
        // Quitar clase activa del slide actual
        if (heroSlides[currentSlide]) {
            heroSlides[currentSlide].classList.remove('active');
        }
        
        // Avanzar al siguiente índice
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // Agregar clase activa al siguiente slide
        if (heroSlides[currentSlide]) {
            heroSlides[currentSlide].classList.add('active');
        }
    }

    if (totalSlides > 1) {
        setInterval(nextSlide, slideInterval);
    }

    // --- SMOOTH PARALLAX SCROLL EFFECT (PROGRESSIVE ENHANCEMENT) ---
    const scrollytellBg = document.querySelector('.scrollytell-bg');
    if (scrollytellBg) {
        window.addEventListener('scroll', () => {
            const rect = scrollytellBg.parentElement.getBoundingClientRect();
            const scrolledIntoView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (scrolledIntoView) {
                const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                // Traducir el fondo lentamente relativo al scrollport
                scrollytellBg.style.transform = `translateY(${scrollPercent * 80 - 40}px) scale(1.15)`;
            }
        });
    }
});
