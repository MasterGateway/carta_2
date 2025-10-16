// ===== PARTICLES-CONFIG.JS - CONFIGURACIÓN DE PARTÍCULAS =====

// Configuración para particles.js - efectos de fondo mágicos
window.particlesConfig = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#ff6b9d", "#ff8fab", "#ffeaa7", "#fd79a8", "#fdcb6e"]
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ff6b9d",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 100,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
};

// Función para inicializar las partículas
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', window.particlesConfig);
    } else {
        // Si particles.js no está cargado, usar configuración manual
        console.log('particles.js no disponible, usando efectos alternativos');
        createAlternativeParticles();
    }
}

// Efectos de partículas alternativos (sin librería externa)
function createAlternativeParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;

    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = getRandomColor();
        particle.style.pointerEvents = 'none';
        
        // Posición inicial aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        container.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            opacity: Math.random() * 0.5 + 0.3
        });
    }

    // Animar partículas
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebotar en los bordes
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -1;
            }
            
            // Mantener dentro de los límites
            particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
            
            // Actualizar posición
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = particle.opacity;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

function getRandomColor() {
    const colors = ['#ff6b9d', '#ff8fab', '#ffeaa7', '#fd79a8', '#fdcb6e'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Efectos especiales de partículas para eventos
window.ParticleEffects = {
    // Explosión de corazones
    heartExplosion: function(x, y) {
        const hearts = ['💖', '💕', '💗', '💓', '❤️'];
        const heartCount = 15;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.fontSize = '16px';
            heart.style.zIndex = '1000';
            
            document.body.appendChild(heart);
            
            const angle = (Math.PI * 2 * i) / heartCount;
            const velocity = 100 + Math.random() * 50;
            const endX = x + Math.cos(angle) * velocity;
            const endY = y + Math.sin(angle) * velocity;
            
            gsap.to(heart, {
                x: endX - x,
                y: endY - y,
                rotation: Math.random() * 360,
                opacity: 0,
                scale: 0.5,
                duration: 1.5,
                ease: "power2.out",
                onComplete: () => {
                    if (document.body.contains(heart)) {
                        document.body.removeChild(heart);
                    }
                }
            });
        }
    },

    // Lluvia de estrellas
    starRain: function(duration = 5000) {
        const interval = setInterval(() => {
            const star = document.createElement('div');
            star.innerHTML = '⭐';
            star.style.position = 'fixed';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = '-20px';
            star.style.pointerEvents = 'none';
            star.style.fontSize = '20px';
            star.style.zIndex = '999';
            
            document.body.appendChild(star);
            
            gsap.to(star, {
                y: window.innerHeight + 20,
                rotation: 360,
                duration: Math.random() * 2 + 2,
                ease: "none",
                onComplete: () => {
                    if (document.body.contains(star)) {
                        document.body.removeChild(star);
                    }
                }
            });
        }, 200);
        
        setTimeout(() => {
            clearInterval(interval);
        }, duration);
    },

    // Espiral de mariposas
    butterflySpiral: function(centerX, centerY) {
        const butterflies = ['🦋', '🌸', '🌺', '🌼', '🌻'];
        const count = 12;
        
        for (let i = 0; i < count; i++) {
            const butterfly = document.createElement('div');
            butterfly.innerHTML = butterflies[Math.floor(Math.random() * butterflies.length)];
            butterfly.style.position = 'fixed';
            butterfly.style.left = centerX + 'px';
            butterfly.style.top = centerY + 'px';
            butterfly.style.pointerEvents = 'none';
            butterfly.style.fontSize = '18px';
            butterfly.style.zIndex = '1000';
            
            document.body.appendChild(butterfly);
            
            const delay = i * 0.1;
            const radius = 100;
            const rotations = 3;
            
            gsap.to(butterfly, {
                rotation: 360 * rotations,
                duration: 3,
                delay: delay,
                ease: "none"
            });
            
            gsap.to(butterfly, {
                x: Math.cos((i / count) * Math.PI * 2) * radius,
                y: Math.sin((i / count) * Math.PI * 2) * radius,
                scale: 0,
                opacity: 0,
                duration: 3,
                delay: delay,
                ease: "power2.out",
                onComplete: () => {
                    if (document.body.contains(butterfly)) {
                        document.body.removeChild(butterfly);
                    }
                }
            });
        }
    },

    // Ondas de amor
    loveWaves: function(centerX, centerY) {
        const waveCount = 5;
        
        for (let i = 0; i < waveCount; i++) {
            const wave = document.createElement('div');
            wave.style.position = 'fixed';
            wave.style.left = centerX + 'px';
            wave.style.top = centerY + 'px';
            wave.style.width = '20px';
            wave.style.height = '20px';
            wave.style.border = '2px solid #ff6b9d';
            wave.style.borderRadius = '50%';
            wave.style.pointerEvents = 'none';
            wave.style.zIndex = '999';
            wave.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(wave);
            
            gsap.to(wave, {
                width: '200px',
                height: '200px',
                opacity: 0,
                duration: 2,
                delay: i * 0.3,
                ease: "power2.out",
                onComplete: () => {
                    if (document.body.contains(wave)) {
                        document.body.removeChild(wave);
                    }
                }
            });
        }
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeParticles, 1000);
});