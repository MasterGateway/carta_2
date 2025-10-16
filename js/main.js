// ===== MAIN.JS - CONTROLADOR PRINCIPAL =====

class LoveApp {
    constructor() {
        this.currentSection = 'loading';
        this.bgMusic = document.getElementById('bg-music');
        this.isMusicPlaying = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startLoadingSequence();
        this.initParticles();
        this.createStarfield();
    }

    setupEventListeners() {
        // Botones del menú principal
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.navigateToSection(action);
            });
        });

        // Botones de volver
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const backTo = e.currentTarget.dataset.back;
                this.navigateToSection(backTo);
            });
        });

        // Control de música de fondo
        document.getElementById('bg-music-toggle').addEventListener('click', () => {
            this.toggleBackgroundMusic();
        });

        document.getElementById('volume-control').addEventListener('input', (e) => {
            this.bgMusic.volume = e.target.value / 100;
        });

        // Efectos especiales al mover el mouse
        document.addEventListener('mousemove', (e) => {
            this.createMouseTrail(e);
        });
    }

    startLoadingSequence() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainMenu = document.getElementById('main-menu');
        
        // Simular carga con progreso
        let progress = 0;
        const progressBar = document.querySelector('.loading-progress');
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                // Finalizar carga después de un momento
                setTimeout(() => {
                    gsap.to(loadingScreen, {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.inOut",
                        onComplete: () => {
                            loadingScreen.style.display = 'none';
                            mainMenu.classList.remove('hidden');
                            this.animateMenuEntrance();
                            this.currentSection = 'main-menu';
                        }
                    });
                }, 1000);
            }
            progressBar.style.width = progress + '%';
        }, 100);
    }

    animateMenuEntrance() {
        const title = document.querySelector('.main-title');
        const buttons = document.querySelectorAll('.menu-btn');
        
        gsap.fromTo(title, 
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }
        );
        
        gsap.fromTo(buttons,
            { scale: 0, rotation: 180 },
            { 
                scale: 1, 
                rotation: 0, 
                duration: 0.8, 
                stagger: 0.1, 
                ease: "back.out(1.7)",
                delay: 0.5
            }
        );
    }

    navigateToSection(sectionName) {
        const currentEl = document.getElementById(`${this.currentSection}-section`) || 
                         document.getElementById(this.currentSection);
        const targetEl = document.getElementById(`${sectionName}-section`) || 
                        document.getElementById(sectionName);

        if (!targetEl) return;

        // Ocultar sección actual
        gsap.to(currentEl, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                currentEl.classList.add('hidden');
                
                // Mostrar nueva sección
                targetEl.classList.remove('hidden');
                gsap.fromTo(targetEl,
                    { opacity: 0, scale: 1.2 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
                );
                
                this.currentSection = sectionName;
                this.initSectionSpecificFeatures(sectionName);
            }
        });
    }

    initSectionSpecificFeatures(sectionName) {
        switch(sectionName) {
            case 'love-letter':
                if (window.LoveLetter) {
                    new LoveLetter();
                }
                break;
            case 'photo-gallery':
                if (window.PhotoGallery) {
                    new PhotoGallery();
                }
                break;
            case 'love-quiz':
                if (window.LoveQuiz) {
                    new LoveQuiz();
                }
                break;
            case 'music-box':
                if (window.MusicBox) {
                    new MusicBox();
                }
                break;
            case 'love-calendar':
                if (window.LoveCalendar) {
                    new LoveCalendar();
                }
                break;
            case 'surprise':
                if (window.Surprise) {
                    new Surprise();
                }
                break;
        }
    }

    toggleBackgroundMusic() {
        const toggleBtn = document.getElementById('bg-music-toggle');
        
        if (this.isMusicPlaying) {
            this.bgMusic.pause();
            toggleBtn.textContent = '🔇';
            this.isMusicPlaying = false;
        } else {
            this.bgMusic.play().catch(e => console.log('Error playing music:', e));
            toggleBtn.textContent = '🎵';
            this.isMusicPlaying = true;
        }
    }

    createMouseTrail(e) {
        // Crear estela de corazones al mover el mouse
        if (Math.random() < 0.1) { // Solo ocasionalmente
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.fontSize = '12px';
            heart.style.zIndex = '1000';
            
            document.body.appendChild(heart);
            
            gsap.to(heart, {
                y: -50,
                opacity: 0,
                duration: 2,
                ease: "power2.out",
                onComplete: () => {
                    document.body.removeChild(heart);
                }
            });
        }
    }

    initParticles() {
        if (window.particlesJS) {
            particlesJS.load('particles-js', 'js/particles-config.json', () => {
                console.log('Particles loaded successfully');
            });
        }
    }

    createStarfield() {
        const starsContainer = document.getElementById('stars-container');
        const numStars = 100;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.innerHTML = '✨';
            star.style.position = 'absolute';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.fontSize = Math.random() * 10 + 5 + 'px';
            star.style.opacity = Math.random() * 0.8 + 0.2;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
            
            starsContainer.appendChild(star);
        }
        
        // Agregar keyframes para el efecto twinkle
        const style = document.createElement('style');
        style.textContent = `
            @keyframes twinkle {
                from { opacity: 0.2; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }

    // Función para crear efectos especiales de temporada
    createSeasonalEffects() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        
        // San Valentín (14 de febrero)
        if (month === 2 && day === 14) {
            this.createValentinesEffect();
        }
        // Navidad
        else if (month === 12 && day >= 20) {
            this.createChristmasEffect();
        }
        // Año nuevo
        else if (month === 1 && day === 1) {
            this.createNewYearEffect();
        }
    }

    createValentinesEffect() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💓'][Math.floor(Math.random() * 4)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.pointerEvents = 'none';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.zIndex = '999';
            
            document.body.appendChild(heart);
            
            gsap.to(heart, {
                y: -window.innerHeight - 50,
                x: (Math.random() - 0.5) * 100,
                rotation: Math.random() * 360,
                duration: Math.random() * 3 + 2,
                ease: "none",
                onComplete: () => {
                    if (document.body.contains(heart)) {
                        document.body.removeChild(heart);
                    }
                }
            });
        }, 3000);
    }

    // Función para guardar mensajes personalizados
    saveCustomMessage(message, section) {
        const customMessages = JSON.parse(localStorage.getItem('loveMessages') || '{}');
        customMessages[section] = message;
        localStorage.setItem('loveMessages', JSON.stringify(customMessages));
    }

    getCustomMessage(section) {
        const customMessages = JSON.parse(localStorage.getItem('loveMessages') || '{}');
        return customMessages[section];
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.loveApp = new LoveApp();
    
    // Agregar algunos efectos especiales al cargar
    setTimeout(() => {
        window.loveApp.createSeasonalEffects();
    }, 2000);
});

// Prevenir que la música se pause cuando se cambia de pestaña
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.loveApp && window.loveApp.isMusicPlaying) {
        window.loveApp.bgMusic.play().catch(e => console.log('Error resuming music:', e));
    }
});

// Funciones de utilidad global
window.LoveUtils = {
    // Función para crear efectos de confeti
    createConfetti: function() {
        const colors = ['#ff6b9d', '#ff8fab', '#ffeaa7', '#fd79a8', '#fdcb6e'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            
            document.body.appendChild(confetti);
            
            gsap.to(confetti, {
                y: window.innerHeight + 10,
                x: (Math.random() - 0.5) * 200,
                rotation: Math.random() * 360,
                duration: Math.random() * 2 + 1,
                ease: "power2.out",
                onComplete: () => {
                    if (document.body.contains(confetti)) {
                        document.body.removeChild(confetti);
                    }
                }
            });
        }
    },

    // Función para mostrar notificaciones lindas
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '💖' : '⚠️'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 15px;
                padding: 15px 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 1001;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification.success {
                border-left: 4px solid #ff6b9d;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                font-family: 'Dancing Script', cursive;
                font-size: 1.1rem;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animar salida después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    },

    // Función para formatear fechas en español
    formatDate: function(date) {
        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    },

    // Función para generar colores aleatorios suaves
    generateSoftColor: function() {
        const colors = [
            '#ff6b9d', '#ff8fab', '#ffeaa7', '#fd79a8', '#fdcb6e',
            '#e17055', '#81ecec', '#74b9ff', '#a29bfe', '#fd79a8'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};