// ===== ANIMATIONS.JS - ANIMACIONES Y EFECTOS ESPECIALES =====

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlobalAnimations();
        this.createBackgroundEffects();
        this.setupScrollAnimations();
        this.initializeSpecialEffects();
    }

    setupGlobalAnimations() {
        // Animaciones de entrada para elementos cuando aparecen
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    this.animateElementIn(element);
                }
            });
        }, observerOptions);

        // Observar elementos que necesitan animación
        document.querySelectorAll('.menu-btn, .letter-paper, .photo-item, .question-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateElementIn(element) {
        if (element.classList.contains('menu-btn')) {
            gsap.fromTo(element,
                { scale: 0, rotation: 180, opacity: 0 },
                { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
            );
        } else if (element.classList.contains('letter-paper')) {
            gsap.fromTo(element,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
        } else if (element.classList.contains('photo-item')) {
            gsap.fromTo(element,
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: "bounce.out" }
            );
        }
    }

    createBackgroundEffects() {
        // Crear burbujas flotantes de amor
        this.createLoveBubbles();
        
        // Crear ondas de amor periódicas
        setInterval(() => {
            this.createLoveWave();
        }, 15000);
        
        // Crear efectos de temporada
        this.createSeasonalBackground();
    }

    createLoveBubbles() {
        setInterval(() => {
            if (Math.random() < 0.7) {
                this.createBubble();
            }
        }, 3000);
    }

    createBubble() {
        const bubble = document.createElement('div');
        const emojis = ['💕', '💖', '💗', '💝', '🌸', '🌺', '🦋', '✨'];
        bubble.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        
        bubble.style.position = 'fixed';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.bottom = '-20px';
        bubble.style.fontSize = Math.random() * 15 + 10 + 'px';
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = '1';
        bubble.style.opacity = '0.7';
        
        document.body.appendChild(bubble);
        
        gsap.to(bubble, {
            y: -window.innerHeight - 50,
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 5 + 5,
            ease: "none",
            onComplete: () => {
                if (document.body.contains(bubble)) {
                    document.body.removeChild(bubble);
                }
            }
        });
    }

    createLoveWave() {
        const wave = document.createElement('div');
        wave.style.position = 'fixed';
        wave.style.left = '50%';
        wave.style.top = '50%';
        wave.style.width = '20px';
        wave.style.height = '20px';
        wave.style.border = '2px solid rgba(255,107,157,0.3)';
        wave.style.borderRadius = '50%';
        wave.style.pointerEvents = 'none';
        wave.style.zIndex = '1';
        wave.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(wave);
        
        gsap.to(wave, {
            width: '1000px',
            height: '1000px',
            opacity: 0,
            duration: 3,
            ease: "power2.out",
            onComplete: () => {
                if (document.body.contains(wave)) {
                    document.body.removeChild(wave);
                }
            }
        });
    }

    createSeasonalBackground() {
        const now = new Date();
        const month = now.getMonth() + 1;
        
        if (month === 2) { // Febrero - San Valentín
            this.createValentineBackground();
        } else if (month >= 3 && month <= 5) { // Primavera
            this.createSpringBackground();
        } else if (month >= 6 && month <= 8) { // Verano
            this.createSummerBackground();
        } else if (month >= 9 && month <= 11) { // Otoño
            this.createAutumnBackground();
        } else { // Invierno
            this.createWinterBackground();
        }
    }

    createValentineBackground() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-20px';
            heart.style.fontSize = '25px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1';
            heart.style.opacity = '0.8';
            
            document.body.appendChild(heart);
            
            gsap.to(heart, {
                y: window.innerHeight + 20,
                rotation: 360,
                duration: 4,
                ease: "none",
                onComplete: () => {
                    if (document.body.contains(heart)) {
                        document.body.removeChild(heart);
                    }
                }
            });
        }, 2000);
    }

    createSpringBackground() {
        const flowers = ['🌸', '🌺', '🌻', '🌼', '🌷'];
        setInterval(() => {
            this.createFloatingElement(flowers);
        }, 4000);
    }

    createSummerBackground() {
        const summer = ['☀️', '🌞', '🦋', '🌴'];
        setInterval(() => {
            this.createFloatingElement(summer);
        }, 5000);
    }

    createAutumnBackground() {
        const autumn = ['🍂', '🍁', '🌰', '🎃'];
        setInterval(() => {
            this.createFloatingElement(autumn);
        }, 3000);
    }

    createWinterBackground() {
        const winter = ['❄️', '⛄', '🌟', '✨'];
        setInterval(() => {
            this.createFloatingElement(winter);
        }, 2500);
    }

    createFloatingElement(elements) {
        const element = document.createElement('div');
        element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        element.style.position = 'fixed';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = '-20px';
        element.style.fontSize = Math.random() * 10 + 15 + 'px';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1';
        element.style.opacity = '0.6';
        
        document.body.appendChild(element);
        
        gsap.to(element, {
            y: window.innerHeight + 20,
            x: (Math.random() - 0.5) * 100,
            rotation: Math.random() * 360,
            duration: Math.random() * 3 + 4,
            ease: "none",
            onComplete: () => {
                if (document.body.contains(element)) {
                    document.body.removeChild(element);
                }
            }
        });
    }

    setupScrollAnimations() {
        // Parallax effect para elementos de fondo
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.parallax');
            
            parallax.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                gsap.to(element, {
                    y: scrolled * speed,
                    duration: 0.1
                });
            });
        });
    }

    initializeSpecialEffects() {
        // Efecto de typing para textos especiales
        this.setupTypingEffect();
        
        // Efecto de hover para botones
        this.setupHoverEffects();
        
        // Efectos de sonido visual
        this.setupSoundEffects();
    }

    setupTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #ff6b9d';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    element.style.borderRight = 'none';
                }
            }, 50);
        });
    }

    setupHoverEffects() {
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('hover-glow')) {
                gsap.to(e.target, {
                    boxShadow: '0 0 20px rgba(255,107,157,0.8)',
                    duration: 0.3
                });
            }
            
            if (e.target.classList.contains('hover-bounce')) {
                gsap.to(e.target, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "bounce.out"
                });
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('hover-glow')) {
                gsap.to(e.target, {
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    duration: 0.3
                });
            }
            
            if (e.target.classList.contains('hover-bounce')) {
                gsap.to(e.target, {
                    scale: 1,
                    duration: 0.3,
                    ease: "bounce.out"
                });
            }
        });
    }

    setupSoundEffects() {
        // Efecto visual cuando se reproduce música
        document.addEventListener('play', () => {
            this.createMusicVisualization();
        }, true);
    }

    createMusicVisualization() {
        const bars = 20;
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.bottom = '100px';
        container.style.right = '20px';
        container.style.display = 'flex';
        container.style.alignItems = 'end';
        container.style.gap = '2px';
        container.style.zIndex = '999';
        container.id = 'music-visualizer';
        
        for (let i = 0; i < bars; i++) {
            const bar = document.createElement('div');
            bar.style.width = '3px';
            bar.style.height = '10px';
            bar.style.background = 'linear-gradient(45deg, #ff6b9d, #ff8fab)';
            bar.style.borderRadius = '2px';
            container.appendChild(bar);
            
            // Animar barras
            gsap.to(bar, {
                height: Math.random() * 30 + 10 + 'px',
                duration: 0.3,
                repeat: -1,
                yoyo: true,
                delay: i * 0.1
            });
        }
        
        document.body.appendChild(container);
        
        // Remover después de 10 segundos
        setTimeout(() => {
            if (document.body.contains(container)) {
                document.body.removeChild(container);
            }
        }, 10000);
    }

    // Funciones especiales para eventos
    celebrateSuccess() {
        // Confeti + fuegos artificiales + música
        window.LoveUtils?.createConfetti();
        this.createFireworks();
        this.createSuccessMessage();
    }

    createFireworks() {
        const colors = ['#ff6b9d', '#ff8fab', '#ffeaa7', '#fd79a8', '#fdcb6e'];
        const fireworkCount = 5;
        
        for (let i = 0; i < fireworkCount; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.5;
                
                for (let j = 0; j < 12; j++) {
                    const spark = document.createElement('div');
                    spark.style.position = 'fixed';
                    spark.style.left = x + 'px';
                    spark.style.top = y + 'px';
                    spark.style.width = '4px';
                    spark.style.height = '4px';
                    spark.style.background = colors[Math.floor(Math.random() * colors.length)];
                    spark.style.borderRadius = '50%';
                    spark.style.pointerEvents = 'none';
                    spark.style.zIndex = '1000';
                    
                    document.body.appendChild(spark);
                    
                    const angle = (Math.PI * 2 * j) / 12;
                    const distance = 100 + Math.random() * 50;
                    
                    gsap.to(spark, {
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                        opacity: 0,
                        duration: 1.5,
                        ease: "power2.out",
                        onComplete: () => {
                            if (document.body.contains(spark)) {
                                document.body.removeChild(spark);
                            }
                        }
                    });
                }
            }, i * 500);
        }
    }

    createSuccessMessage() {
        const messages = [
            '¡Increíble! 🌟',
            '¡Eres maravillosa! 💖',
            '¡Perfecto! ✨',
            '¡Fantástico! 🎉',
            '¡Eres la mejor! 👑'
        ];
        
        const message = document.createElement('div');
        message.textContent = messages[Math.floor(Math.random() * messages.length)];
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.fontSize = '3rem';
        message.style.fontFamily = "'Great Vibes', cursive";
        message.style.color = '#ff6b9d';
        message.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
        message.style.zIndex = '1001';
        message.style.pointerEvents = 'none';
        
        document.body.appendChild(message);
        
        gsap.fromTo(message,
            { scale: 0, opacity: 0, rotation: -180 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
        );
        
        gsap.to(message, {
            scale: 0,
            opacity: 0,
            rotation: 180,
            duration: 0.5,
            delay: 2,
            ease: "back.in(1.7)",
            onComplete: () => {
                if (document.body.contains(message)) {
                    document.body.removeChild(message);
                }
            }
        });
    }

    // Función para crear efectos personalizados
    createCustomEffect(type, options = {}) {
        switch (type) {
            case 'hearts':
                window.ParticleEffects?.heartExplosion(
                    options.x || window.innerWidth / 2,
                    options.y || window.innerHeight / 2
                );
                break;
            case 'stars':
                window.ParticleEffects?.starRain(options.duration || 3000);
                break;
            case 'butterflies':
                window.ParticleEffects?.butterflySpiral(
                    options.x || window.innerWidth / 2,
                    options.y || window.innerHeight / 2
                );
                break;
            case 'waves':
                window.ParticleEffects?.loveWaves(
                    options.x || window.innerWidth / 2,
                    options.y || window.innerHeight / 2
                );
                break;
            case 'celebration':
                this.celebrateSuccess();
                break;
        }
    }
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Exponer globalmente para uso fácil
window.AnimationController = AnimationController;