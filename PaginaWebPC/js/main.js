/**
 * NEXUS BUILDS - Main JavaScript
 * Funcionalidades generales, animaciones y efectos visuales
 */

// ============================================
// EFECTO DE PARTÍCULAS EN EL FONDO
// ============================================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 50;
        this.connectionDistance = 100;
        this.maxConnections = 3;

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#00d4ff' : '#b829dd'
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Actualizar y dibujar partículas
        this.particles.forEach((particle, i) => {
            // Actualizar posición
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Rebote en bordes
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Dibujar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // Conexiones con partículas cercanas
            let connections = 0;
            for (let j = i + 1; j < this.particles.length; j++) {
                if (connections >= this.maxConnections) break;

                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = 1 - (distance / this.connectionDistance);
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                    connections++;
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// HEADER STICKY Y SCROLL EFFECTS
// ============================================
class HeaderController {
    constructor() {
        this.header = document.getElementById('header');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.dropdowns = document.querySelectorAll('.dropdown');

        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Dropdowns en móvil
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });

        // Cerrar menú al hacer click en un link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.navMenu.classList.remove('active');
                }
            });
        });
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');

        // Animar el icono
        const spans = this.navToggle.querySelectorAll('span');
        if (this.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal, .build-card, .component-section, .game-card, .section-header');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Animar barras de progreso
                    const progressBars = entry.target.querySelectorAll('.metric-fill, .chart-bar, .meter-fill');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }
            });
        }, this.observerOptions);

        this.elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// SMOOTH SCROLL PARA ANCLAS
// ============================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ============================================
// CONTADOR ANIMADO PARA ESTADÍSTICAS
// ============================================
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.]/g, '');
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = number * easeOutQuart;

            if (text.includes('.')) {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.round(current) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

// ============================================
// EFECTO PARALLAX EN HERO
// ============================================
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroContent = document.querySelector('.hero-content');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                const speed = 0.5;
                this.heroContent.style.transform = `translateY(${scrolled * speed}px)`;
                this.heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }
}

// ============================================
// EFECTO GLOW EN BOTONES
// ============================================
class ButtonGlow {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-primary');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                btn.style.setProperty('--glow-x', `${x}px`);
                btn.style.setProperty('--glow-y', `${y}px`);
            });
        });
    }
}

// ============================================
// TILT EFFECT EN TARJETAS
// ============================================
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('.build-card, .game-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    }

    handleMouseLeave(e, card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
}

// ============================================
// CURSOR PERSONALIZADO (OPCIONAL)
// ============================================
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;

        if (!this.isTouch) {
            this.init();
        }
    }

    init() {
        // Crear elementos del cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';

        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'custom-cursor-dot';

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);

        // Agregar estilos
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                width: 40px;
                height: 40px;
                border: 2px solid var(--neon-cyan);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease, opacity 0.3s ease;
                mix-blend-mode: difference;
            }
            .custom-cursor-dot {
                position: fixed;
                width: 8px;
                height: 8px;
                background: var(--neon-cyan);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
            }
            .custom-cursor.hover {
                transform: scale(1.5);
                border-color: var(--neon-purple);
            }
        `;
        document.head.appendChild(style);

        // Event listeners
        document.addEventListener('mousemove', (e) => this.moveCursor(e));

        // Efecto hover en elementos interactivos
        document.querySelectorAll('a, button, .component-option').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
    }

    moveCursor(e) {
        if (this.cursor && this.cursorDot) {
            this.cursor.style.left = `${e.clientX - 20}px`;
            this.cursor.style.top = `${e.clientY - 20}px`;
            this.cursorDot.style.left = `${e.clientX - 4}px`;
            this.cursorDot.style.top = `${e.clientY - 4}px`;
        }
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
class KeyboardShortcuts {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // ESC para cerrar modales
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal.active');
                if (modal) {
                    modal.classList.remove('active');
                }
            }

            // Ctrl/Cmd + K para focus en chat
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const chatInput = document.getElementById('chat-input');
                if (chatInput) {
                    chatInput.focus();
                    document.getElementById('soporte').scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
}

// ============================================
// PERFORMANCE MONITOR
// ============================================
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frames = 0;

        // Solo en desarrollo
        if (location.hostname === 'localhost') {
            this.init();
        }
    }

    init() {
        const measure = () => {
            this.frames++;
            const currentTime = performance.now();

            if (currentTime >= this.lastTime + 1000) {
                this.fps = this.frames;
                this.frames = 0;
                this.lastTime = currentTime;

                if (this.fps < 30) {
                    console.warn(`FPS bajo: ${this.fps}`);
                }
            }

            requestAnimationFrame(measure);
        };

        requestAnimationFrame(measure);
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los sistemas
    new ParticleSystem();
    new HeaderController();
    new ScrollReveal();
    new SmoothScroll();
    new AnimatedCounter();
    new ParallaxEffect();
    new ButtonGlow();
    new TiltEffect();
    new CustomCursor();
    new KeyboardShortcuts();
    new PerformanceMonitor();

    // Agregar clase loaded al body para animaciones iniciales
    document.body.classList.add('loaded');

    // Console easter egg
    console.log('%c🔧 NEXUS BUILDS', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
    console.log('%c¿Buscando un PC potente? Visita nexusbuilds.com', 'font-size: 14px; color: #b829dd;');
});

// ============================================
// UTILIDADES GLOBALES
// ============================================

// Debounce para eventos frecuentes
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Detectar preferencia de reducción de movimiento
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}
