// ===== SURPRISE.JS - SORPRESA ESPECIAL =====

class Surprise {
    constructor() {
        this.surprises = [
            {
                title: "💖 Promesa de Amor Eterno",
                content: "Rebe, prometo amarte cada día más que el anterior, ser tu apoyo en los momentos difíciles y tu compañero en todas las aventuras. Eres mi sol, mi luna y todas mis estrellas. 🌟",
                type: "promise"
            },
            {
                title: "🎁 Cupones de Amor",
                content: "¡Has ganado cupones especiales! 🎟️ 1 Masaje relajante, 1 Cena romántica cocinada por mí, 1 Día de películas en pijama, 1 Paseo bajo las estrellas, 1 Desayuno en la cama.",
                type: "coupons"
            },
            {
                title: "📝 Carta del Futuro",
                content: "Querida Rebe del futuro: Espero que cuando leas esto, todavía recuerdes lo mucho que te amo hoy. Que nuestro amor haya crecido como un hermoso jardín y que sigamos siendo tan felices como en este momento. Con amor, Tu yo del pasado 💕",
                type: "future-letter"
            },
            {
                title: "🌈 Razones para Sonreír",
                content: "1. Tu risa es contagiosa 😄 2. Haces que cada día sea especial ✨ 3. Eres increíblemente inteligente 🧠 4. Tu bondad inspira a otros 💝 5. Tienes los ojos más hermosos 👀 6. Tu abrazo es mi lugar favorito 🤗 7. ¡Simplemente por ser TÚ! 🦋",
                type: "reasons"
            },
            {
                title: "🎵 Canción Dedicada",
                content: "He creado una playlist especial para ti con todas las canciones que me recuerdan a tu sonrisa, tu risa y los momentos que hemos compartido. Cada melodía lleva un pedacito de mi corazón para ti. 🎶💕",
                type: "music"
            }
        ];
        
        this.isOpened = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createFloatingHearts();
    }

    setupEventListeners() {
        const giftBox = document.getElementById('gift-box');
        
        giftBox.addEventListener('click', () => {
            if (!this.isOpened) {
                this.openGift();
            }
        });
        
        // Efectos de hover
        giftBox.addEventListener('mouseenter', () => {
            if (!this.isOpened) {
                gsap.to(giftBox, {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        giftBox.addEventListener('mouseleave', () => {
            if (!this.isOpened) {
                gsap.to(giftBox, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            }
        });
    }

    openGift() {
        const giftLid = document.querySelector('.gift-lid');
        const surpriseMessage = document.getElementById('surprise-message');
        const giftBox = document.getElementById('gift-box');
        
        this.isOpened = true;
        
        // Animar apertura de la tapa
        gsap.to(giftLid, {
            rotateX: -120,
            duration: 1,
            ease: "back.out(1.7)"
        });
        
        // Efectos especiales
        setTimeout(() => {
            // Explosión de partículas
            const rect = giftBox.getBoundingClientRect();
            window.ParticleEffects?.heartExplosion(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
            
            // Lluvia de estrellas
            window.ParticleEffects?.starRain(3000);
            
            // Confeti
            window.LoveUtils?.createConfetti();
        }, 500);
        
        // Mostrar sorpresa
        setTimeout(() => {
            this.showRandomSurprise();
            surpriseMessage.classList.remove('hidden');
            surpriseMessage.classList.add('visible');
        }, 1000);
        
        // Cambiar texto de instrucción
        document.querySelector('.surprise-content p').textContent = '¡Sorpresa abierta! 🎉';
    }

    showRandomSurprise() {
        const randomSurprise = this.surprises[Math.floor(Math.random() * this.surprises.length)];
        const surpriseMessage = document.getElementById('surprise-message');
        
        surpriseMessage.innerHTML = `
            <div class="surprise-header">
                <h3>${randomSurprise.title}</h3>
            </div>
            <div class="surprise-body">
                <p>${randomSurprise.content}</p>
            </div>
            <div class="surprise-actions">
                <button class="action-btn" onclick="window.currentSurprise.showAnotherSurprise()">
                    🎁 Otra sorpresa
                </button>
                <button class="action-btn" onclick="window.currentSurprise.saveToFavorites('${randomSurprise.type}')">
                    💾 Guardar favorita
                </button>
                <button class="action-btn" onclick="window.currentSurprise.shareSurprise('${randomSurprise.title}')">
                    📱 Compartir
                </button>
            </div>
        `;
        
        // Agregar estilos para la sorpresa
        this.addSurpriseStyles();
        
        // Efectos de entrada
        gsap.fromTo(surpriseMessage.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" }
        );
        
        window.currentSurprise = this;
    }

    addSurpriseStyles() {
        if (document.getElementById('surprise-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'surprise-styles';
        style.textContent = `
            .surprise-header h3 {
                font-family: 'Great Vibes', cursive;
                font-size: 2.2rem;
                color: #ff6b9d;
                text-align: center;
                margin-bottom: 20px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            }
            .surprise-body p {
                font-family: 'Dancing Script', cursive;
                font-size: 1.3rem;
                line-height: 1.6;
                color: #333;
                text-align: center;
                margin-bottom: 25px;
                padding: 20px;
                background: linear-gradient(45deg, #ffeaa7, #fdcb6e);
                border-radius: 15px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            .surprise-actions {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            .action-btn {
                background: linear-gradient(45deg, #ff6b9d, #ff8fab);
                border: none;
                border-radius: 25px;
                padding: 10px 20px;
                color: white;
                font-family: 'Dancing Script', cursive;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                margin: 5px;
            }
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
        `;
        document.head.appendChild(style);
    }

    showAnotherSurprise() {
        const surpriseMessage = document.getElementById('surprise-message');
        
        // Animación de salida
        gsap.to(surpriseMessage, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                this.showRandomSurprise();
                gsap.to(surpriseMessage, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3
                });
            }
        });
        
        // Efecto especial
        window.ParticleEffects?.butterflySpiral(window.innerWidth / 2, window.innerHeight / 2);
    }

    saveToFavorites(type) {
        // Guardar en localStorage
        const favorites = JSON.parse(localStorage.getItem('favoriteSurprises') || '[]');
        const surprise = this.surprises.find(s => s.type === type);
        
        if (surprise && !favorites.find(f => f.type === type)) {
            favorites.push(surprise);
            localStorage.setItem('favoriteSurprises', JSON.stringify(favorites));
            window.LoveUtils?.showNotification('¡Sorpresa guardada en favoritos! 💖');
        } else {
            window.LoveUtils?.showNotification('Esta sorpresa ya está en favoritos 😊');
        }
    }

    shareSurprise(title) {
        const text = `¡Acabo de recibir una sorpresa especial: "${title}"! 💕`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Sorpresa Especial',
                text: text,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(text).then(() => {
                window.LoveUtils?.showNotification('¡Sorpresa copiada al portapapeles! 📋');
            });
        }
    }

    createFloatingHearts() {
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% de probabilidad
                this.createFloatingHeart();
            }
        }, 2000);
    }

    createFloatingHeart() {
        const heart = document.createElement('div');
        const hearts = ['💖', '💕', '💗', '💓', '❤️', '💝'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '999';
        
        document.body.appendChild(heart);
        
        gsap.to(heart, {
            y: -window.innerHeight - 50,
            x: (Math.random() - 0.5) * 100,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: Math.random() * 3 + 2,
            ease: "power2.out",
            onComplete: () => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }
        });
    }

    // Función especial para crear una sorpresa personalizada
    createCustomSurprise() {
        const title = prompt('Título de tu sorpresa personalizada:');
        const content = prompt('Contenido de la sorpresa:');
        
        if (title && content) {
            const customSurprise = {
                title: `💝 ${title}`,
                content: content,
                type: 'custom'
            };
            
            this.surprises.push(customSurprise);
            
            const surpriseMessage = document.getElementById('surprise-message');
            surpriseMessage.innerHTML = `
                <div class="surprise-header">
                    <h3>${customSurprise.title}</h3>
                </div>
                <div class="surprise-body">
                    <p>${customSurprise.content}</p>
                </div>
                <div class="surprise-actions">
                    <button class="action-btn" onclick="window.currentSurprise.showAnotherSurprise()">
                        🎁 Otra sorpresa
                    </button>
                </div>
            `;
            
            window.LoveUtils?.showNotification('¡Sorpresa personalizada creada! 🎨');
            window.ParticleEffects?.heartExplosion(window.innerWidth / 2, window.innerHeight / 2);
        }
    }

    // Reset para poder abrir el regalo de nuevo
    resetGift() {
        this.isOpened = false;
        const giftLid = document.querySelector('.gift-lid');
        const surpriseMessage = document.getElementById('surprise-message');
        
        gsap.to(giftLid, {
            rotateX: 0,
            duration: 0.5
        });
        
        surpriseMessage.classList.add('hidden');
        surpriseMessage.classList.remove('visible');
        
        document.querySelector('.surprise-content p').textContent = '¡Haz clic en el regalo para abrirlo!';
    }
}

window.Surprise = Surprise;