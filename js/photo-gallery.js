// ===== PHOTO-GALLERY.JS - GALERÍA DE RECUERDOS =====

class PhotoGallery {
    constructor() {
        this.photos = [
            { emoji: '💕', title: 'Nuestro primer encuentro', description: 'El día que cambió mi vida para siempre' },
            { emoji: '🌹', title: 'Primera cita', description: 'Nervios, sonrisas y magia en el aire' },
            { emoji: '💖', title: 'Primer beso', description: 'Cuando las estrellas se alinearon' },
            { emoji: '🎂', title: 'Tu cumpleaños', description: 'Celebrando a la persona más especial' },
            { emoji: '🌙', title: 'Noche de estrellas', description: 'Viendo el cielo, soñando juntos' },
            { emoji: '🏖️', title: 'Día en la playa', description: 'Arena, sol y tu sonrisa radiante' },
            { emoji: '🎡', title: 'Parque de diversiones', description: 'Gritando de emoción, riendo sin parar' },
            { emoji: '🍰', title: 'Cocinando juntos', description: 'Desastres deliciosos en la cocina' },
            { emoji: '🌸', title: 'Primavera juntos', description: 'Flores nuevas, amor floreciente' }
        ];
        
        this.currentPhotoIndex = 0;
        this.init();
    }

    init() {
        this.renderGallery();
        this.setupEventListeners();
    }

    renderGallery() {
        const photoGrid = document.getElementById('photo-grid');
        photoGrid.innerHTML = '';

        this.photos.forEach((photo, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.dataset.index = index;
            
            photoItem.innerHTML = `
                <div class="photo-emoji">${photo.emoji}</div>
                <div class="photo-overlay">
                    <h3>${photo.title}</h3>
                    <p>${photo.description}</p>
                </div>
            `;
            
            photoGrid.appendChild(photoItem);
            
            // Animación de entrada escalonada
            gsap.fromTo(photoItem,
                { scale: 0, rotation: 180, opacity: 0 },
                { 
                    scale: 1, 
                    rotation: 0, 
                    opacity: 1, 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "back.out(1.7)"
                }
            );
        });
    }

    setupEventListeners() {
        const photoGrid = document.getElementById('photo-grid');
        
        photoGrid.addEventListener('click', (e) => {
            const photoItem = e.target.closest('.photo-item');
            if (photoItem) {
                const index = parseInt(photoItem.dataset.index);
                this.openPhotoModal(index);
            }
        });
    }

    openPhotoModal(index) {
        const photo = this.photos[index];
        this.currentPhotoIndex = index;
        
        // Crear modal
        const modal = document.createElement('div');
        modal.className = 'photo-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-photo">
                    <div class="modal-emoji">${photo.emoji}</div>
                </div>
                <div class="modal-info">
                    <h2>${photo.title}</h2>
                    <p>${photo.description}</p>
                    <div class="modal-navigation">
                        <button class="modal-nav prev-photo">❮ Anterior</button>
                        <span class="photo-counter">${index + 1} de ${this.photos.length}</span>
                        <button class="modal-nav next-photo">Siguiente ❯</button>
                    </div>
                </div>
            </div>
        `;
        
        // Estilos del modal
        this.addModalStyles();
        
        document.body.appendChild(modal);
        
        // Animación de entrada
        gsap.fromTo(modal.querySelector('.modal-content'),
            { scale: 0, rotation: 180 },
            { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
        
        // Event listeners del modal
        this.setupModalListeners(modal);
        
        // Efectos especiales
        setTimeout(() => {
            window.ParticleEffects?.heartExplosion(
                window.innerWidth / 2,
                window.innerHeight / 2
            );
        }, 300);
    }

    addModalStyles() {
        if (document.getElementById('photo-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'photo-modal-styles';
        style.textContent = `
            .photo-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                backdrop-filter: blur(10px);
            }
            .modal-content {
                position: relative;
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            }
            .modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 30px;
                cursor: pointer;
                color: #666;
                z-index: 1001;
            }
            .modal-photo {
                text-align: center;
                margin-bottom: 20px;
            }
            .modal-emoji {
                font-size: 120px;
                margin-bottom: 20px;
                animation: photoFloat 3s ease-in-out infinite;
            }
            @keyframes photoFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            .modal-info h2 {
                font-family: 'Great Vibes', cursive;
                font-size: 2rem;
                color: #ff6b9d;
                text-align: center;
                margin-bottom: 15px;
            }
            .modal-info p {
                font-family: 'Dancing Script', cursive;
                font-size: 1.3rem;
                text-align: center;
                color: #333;
                margin-bottom: 25px;
                line-height: 1.6;
            }
            .modal-navigation {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 15px;
            }
            .modal-nav {
                background: linear-gradient(45deg, #ff6b9d, #ff8fab);
                border: none;
                border-radius: 25px;
                padding: 10px 20px;
                color: white;
                cursor: pointer;
                font-family: 'Dancing Script', cursive;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            .modal-nav:hover {
                transform: scale(1.05);
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
            .photo-counter {
                background: rgba(255,107,157,0.1);
                padding: 8px 15px;
                border-radius: 20px;
                font-family: 'Dancing Script', cursive;
                color: #333;
            }
        `;
        document.head.appendChild(style);
    }

    setupModalListeners(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        const prevBtn = modal.querySelector('.prev-photo');
        const nextBtn = modal.querySelector('.next-photo');
        
        const closeModal = () => {
            gsap.to(modal.querySelector('.modal-content'), {
                scale: 0,
                rotation: -180,
                duration: 0.3,
                ease: "back.in(1.7)",
                onComplete: () => {
                    document.body.removeChild(modal);
                }
            });
        };
        
        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        
        prevBtn.addEventListener('click', () => {
            this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
            this.updateModalContent(modal);
        });
        
        nextBtn.addEventListener('click', () => {
            this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
            this.updateModalContent(modal);
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        });
    }

    updateModalContent(modal) {
        const photo = this.photos[this.currentPhotoIndex];
        const emoji = modal.querySelector('.modal-emoji');
        const title = modal.querySelector('.modal-info h2');
        const description = modal.querySelector('.modal-info p');
        const counter = modal.querySelector('.photo-counter');
        
        // Animación de cambio
        gsap.to([emoji, title, description], {
            opacity: 0,
            x: -30,
            duration: 0.2,
            onComplete: () => {
                emoji.textContent = photo.emoji;
                title.textContent = photo.title;
                description.textContent = photo.description;
                counter.textContent = `${this.currentPhotoIndex + 1} de ${this.photos.length}`;
                
                gsap.fromTo([emoji, title, description],
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }
                );
            }
        });
        
        // Efectos especiales
        window.ParticleEffects?.loveWaves(
            window.innerWidth / 2,
            window.innerHeight / 2
        );
    }

    // Función para agregar nuevas fotos
    addPhoto(emoji, title, description) {
        this.photos.push({ emoji, title, description });
        this.renderGallery();
        window.LoveUtils?.showNotification('¡Nueva foto agregada! 📸');
    }

    // Función para crear slideshow automático
    startSlideshow() {
        if (this.photos.length === 0) return;
        
        let currentIndex = 0;
        const slideshowModal = document.createElement('div');
        slideshowModal.className = 'slideshow-modal';
        slideshowModal.innerHTML = `
            <div class="slideshow-backdrop"></div>
            <div class="slideshow-content">
                <button class="slideshow-close">&times;</button>
                <div class="slideshow-photo">
                    <div class="slideshow-emoji">${this.photos[0].emoji}</div>
                    <h2>${this.photos[0].title}</h2>
                    <p>${this.photos[0].description}</p>
                </div>
                <div class="slideshow-progress">
                    <div class="progress-bar"></div>
                </div>
                <div class="slideshow-controls">
                    <button class="control-btn pause-btn">⏸️</button>
                    <button class="control-btn play-btn hidden">▶️</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(slideshowModal);
        
        let interval;
        let isPaused = false;
        
        const startInterval = () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % this.photos.length;
                this.updateSlideshowContent(slideshowModal, currentIndex);
            }, 3000);
        };
        
        startInterval();
        
        // Event listeners para controles
        slideshowModal.querySelector('.slideshow-close').addEventListener('click', () => {
            clearInterval(interval);
            document.body.removeChild(slideshowModal);
        });
        
        slideshowModal.querySelector('.pause-btn').addEventListener('click', () => {
            clearInterval(interval);
            isPaused = true;
            slideshowModal.querySelector('.pause-btn').classList.add('hidden');
            slideshowModal.querySelector('.play-btn').classList.remove('hidden');
        });
        
        slideshowModal.querySelector('.play-btn').addEventListener('click', () => {
            startInterval();
            isPaused = false;
            slideshowModal.querySelector('.play-btn').classList.add('hidden');
            slideshowModal.querySelector('.pause-btn').classList.remove('hidden');
        });
    }

    updateSlideshowContent(modal, index) {
        const photo = this.photos[index];
        const emoji = modal.querySelector('.slideshow-emoji');
        const title = modal.querySelector('.slideshow-content h2');
        const description = modal.querySelector('.slideshow-content p');
        
        gsap.to([emoji, title, description], {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => {
                emoji.textContent = photo.emoji;
                title.textContent = photo.title;
                description.textContent = photo.description;
                
                gsap.to([emoji, title, description], {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                });
            }
        });
    }
}

window.PhotoGallery = PhotoGallery;