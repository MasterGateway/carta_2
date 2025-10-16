// ===== LOVE-LETTER.JS - MÓDULO DE CARTA DE AMOR =====

class LoveLetter {
    constructor() {
        this.messages = [
            {
                title: "Mi amor eterno para Rebe 💖",
                content: `Mi querida Rebe,

Cada día que pasa me doy cuenta de lo afortunado que soy de tenerte en mi vida. Eres la luz que ilumina mis días más oscuros y la razón por la que sonrío cada mañana.

Tu sonrisa es como el sol que derrite la nieve de mi corazón, y tus ojos son las estrellas que guían mi camino cuando me siento perdido. Contigo he aprendido lo que significa amar de verdad.

No hay palabras suficientes para expresar todo lo que significas para mí, pero quiero que sepas que mi amor por ti crece cada día como las flores en primavera.

Prometo estar a tu lado en cada aventura, celebrar contigo cada victoria y ser tu refugio en los momentos difíciles.

Eres mi sueño hecho realidad, mi mejor amiga, mi confidente y el amor de mi vida.

Con todo mi amor,
Tu admirador eterno 💕`
            },
            {
                title: "Razones por las que te amo 💝",
                content: `Querida Rebe,

Déjame contarte algunas de las infinitas razones por las que te amo:

🌟 Por tu risa contagiosa que puede alegrar cualquier día
💫 Por tu bondad infinita hacia todos los seres vivos
✨ Por la forma en que tus ojos brillan cuando hablas de tus sueños
🌸 Por tu fuerza y determinación ante cualquier desafío
🦋 Por cómo haces que me sienta especial con pequeños gestos
🌙 Por nuestras conversaciones hasta altas horas de la noche
☀️ Por cómo conviertes momentos ordinarios en extraordinarios
💎 Por tu inteligencia y sabiduría que me inspiran cada día
🌺 Por tu forma única de ver el mundo con optimismo
❤️ Por ser simplemente tú, perfecta e imperfecta a la vez

Cada día descubro nuevas razones para amarte más.

Para siempre tuyo 💖`
            },
            {
                title: "Nuestro futuro juntos 🌈",
                content: `Mi bella Rebe,

Cuando pienso en nuestro futuro, veo un camino lleno de aventuras, risas y amor incondicional. Imagino:

🏡 Una casa llena de amor y risas
🌍 Viajes a lugares que solo hemos soñado
👶 Pequeños pies corriendo por la casa
🎓 Celebrando cada logro juntos
🌅 Despertares perezosos los domingos
🍽️ Cenas románticas bajo las estrellas
🎂 Cumpleaños llenos de sorpresas
🎄 Navidades mágicas en familia
🌊 Paseos por la playa tomados de la mano
👴👵 Envejeciendo juntos, siempre enamorados

Cada sueño que tengo incluye tu hermosa sonrisa. Quiero construir contigo una historia de amor que inspire a otros.

¿Te gustaría escribir esta historia conmigo?

Con amor infinito 💕`
            }
        ];
        
        this.currentMessageIndex = 0;
        this.isEnvelopeOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadRandomMessage();
    }

    setupEventListeners() {
        const envelope = document.getElementById('envelope');
        const letterPaper = document.getElementById('letter-paper');
        
        envelope.addEventListener('click', () => {
            this.openEnvelope();
        });

        // Añadir botones para cambiar mensaje
        this.createNavigationButtons();
        
        // Añadir efecto de escribir
        letterPaper.addEventListener('click', (e) => {
            if (e.target.closest('.letter-content')) {
                this.typeWriterEffect();
            }
        });
    }

    openEnvelope() {
        if (this.isEnvelopeOpen) return;
        
        const envelopeFlap = document.querySelector('.envelope-flap');
        const letterPaper = document.getElementById('letter-paper');
        const envelope = document.getElementById('envelope');
        
        // Animación de apertura
        envelopeFlap.classList.add('open');
        this.isEnvelopeOpen = true;
        
        // Sonido de apertura (si está disponible)
        this.playSound('open');
        
        // Efectos visuales
        setTimeout(() => {
            const rect = envelope.getBoundingClientRect();
            window.ParticleEffects?.heartExplosion(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }, 500);
        
        // Mostrar carta con animación
        setTimeout(() => {
            letterPaper.classList.add('visible');
            this.typeWriterEffect();
        }, 800);
        
        // Notificación
        setTimeout(() => {
            window.LoveUtils?.showNotification('¡Carta abierta con amor! 💖');
        }, 1000);
    }

    loadRandomMessage() {
        // Cargar mensaje personalizado si existe
        const customMessage = window.loveApp?.getCustomMessage('love-letter');
        if (customMessage) {
            this.displayMessage(customMessage);
        } else {
            const randomIndex = Math.floor(Math.random() * this.messages.length);
            this.currentMessageIndex = randomIndex;
            this.displayMessage(this.messages[randomIndex]);
        }
    }

    displayMessage(message) {
        const letterContent = document.getElementById('letter-content');
        const letterHeader = document.querySelector('.letter-header h2');
        
        letterHeader.textContent = message.title;
        letterContent.innerHTML = '';
        letterContent.dataset.fullText = message.content;
    }

    typeWriterEffect() {
        const letterContent = document.getElementById('letter-content');
        const fullText = letterContent.dataset.fullText;
        
        if (!fullText || letterContent.textContent.length > 0) return;
        
        let index = 0;
        const speed = 30;
        
        function typeChar() {
            if (index < fullText.length) {
                letterContent.textContent += fullText.charAt(index);
                index++;
                setTimeout(typeChar, speed);
                
                // Scroll suave mientras se escribe
                letterContent.scrollTop = letterContent.scrollHeight;
            } else {
                // Efectos al completar
                window.ParticleEffects?.starRain(2000);
                window.LoveUtils?.showNotification('Mensaje completado ✨');
            }
        }
        
        typeChar();
    }

    createNavigationButtons() {
        const letterContainer = document.querySelector('.letter-container');
        
        const navContainer = document.createElement('div');
        navContainer.className = 'letter-navigation';
        navContainer.innerHTML = `
            <button class="nav-btn prev-msg" title="Mensaje anterior">❮</button>
            <span class="message-counter">1 de ${this.messages.length}</span>
            <button class="nav-btn next-msg" title="Siguiente mensaje">❯</button>
            <button class="nav-btn random-msg" title="Mensaje aleatorio">🎲</button>
            <button class="nav-btn save-msg" title="Guardar como favorito">💾</button>
        `;
        
        // Estilos para los botones
        const style = document.createElement('style');
        style.textContent = `
            .letter-navigation {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 15px;
                margin-top: 20px;
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            .letter-navigation.visible {
                opacity: 1;
            }
            .nav-btn {
                background: linear-gradient(45deg, #ff6b9d, #ff8fab);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .nav-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
            .message-counter {
                background: rgba(255,255,255,0.9);
                padding: 8px 15px;
                border-radius: 20px;
                font-family: 'Dancing Script', cursive;
                font-size: 14px;
                color: #333;
            }
        `;
        document.head.appendChild(style);
        
        letterContainer.appendChild(navContainer);
        
        // Event listeners para navegación
        navContainer.querySelector('.prev-msg').addEventListener('click', () => {
            this.showPreviousMessage();
        });
        
        navContainer.querySelector('.next-msg').addEventListener('click', () => {
            this.showNextMessage();
        });
        
        navContainer.querySelector('.random-msg').addEventListener('click', () => {
            this.showRandomMessage();
        });
        
        navContainer.querySelector('.save-msg').addEventListener('click', () => {
            this.saveFavoriteMessage();
        });
        
        // Mostrar navegación cuando la carta esté abierta
        setTimeout(() => {
            if (this.isEnvelopeOpen) {
                navContainer.classList.add('visible');
            }
        }, 2000);
    }

    showPreviousMessage() {
        this.currentMessageIndex = (this.currentMessageIndex - 1 + this.messages.length) % this.messages.length;
        this.switchMessage();
    }

    showNextMessage() {
        this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
        this.switchMessage();
    }

    showRandomMessage() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.messages.length);
        } while (randomIndex === this.currentMessageIndex && this.messages.length > 1);
        
        this.currentMessageIndex = randomIndex;
        this.switchMessage();
    }

    switchMessage() {
        const letterContent = document.getElementById('letter-content');
        const counter = document.querySelector('.message-counter');
        
        // Animación de salida
        gsap.to(letterContent, {
            opacity: 0,
            x: -50,
            duration: 0.3,
            onComplete: () => {
                this.displayMessage(this.messages[this.currentMessageIndex]);
                counter.textContent = `${this.currentMessageIndex + 1} de ${this.messages.length}`;
                
                // Animación de entrada
                gsap.fromTo(letterContent, 
                    { opacity: 0, x: 50 },
                    { opacity: 1, x: 0, duration: 0.3 }
                );
                
                // Reiniciar efecto de escritura
                setTimeout(() => {
                    this.typeWriterEffect();
                }, 300);
            }
        });
        
        // Efectos especiales
        const envelope = document.getElementById('envelope');
        const rect = envelope.getBoundingClientRect();
        window.ParticleEffects?.butterflySpiral(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
        );
    }

    saveFavoriteMessage() {
        const currentMessage = this.messages[this.currentMessageIndex];
        window.loveApp?.saveCustomMessage(currentMessage, 'love-letter');
        window.LoveUtils?.showNotification('¡Mensaje guardado como favorito! 💖');
        
        // Efectos visuales
        window.LoveUtils?.createConfetti();
    }

    playSound(type) {
        // Intentar reproducir sonidos si están disponibles
        const audio = document.getElementById(`${type}Sound`);
        if (audio) {
            audio.play().catch(e => console.log('Error playing sound:', e));
        }
    }

    // Función para agregar mensajes personalizados
    addCustomMessage(title, content) {
        this.messages.push({ title, content });
        this.updateMessageCounter();
    }

    updateMessageCounter() {
        const counter = document.querySelector('.message-counter');
        if (counter) {
            counter.textContent = `${this.currentMessageIndex + 1} de ${this.messages.length}`;
        }
    }

    // Función para exportar la carta como imagen
    exportAsImage() {
        const letterPaper = document.getElementById('letter-paper');
        
        // Usar html2canvas si está disponible
        if (window.html2canvas) {
            html2canvas(letterPaper).then(canvas => {
                const link = document.createElement('a');
                link.download = `carta-de-amor-para-rebe-${Date.now()}.png`;
                link.href = canvas.toDataURL();
                link.click();
                
                window.LoveUtils?.showNotification('¡Carta descargada! 📸');
            });
        } else {
            window.LoveUtils?.showNotification('Función de descarga no disponible 📱');
        }
    }
}

// Exponer la clase globalmente
window.LoveLetter = LoveLetter;