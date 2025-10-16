// ===== LOVE-CALENDAR.JS - CALENDARIO DE AMOR =====

class LoveCalendar {
    constructor() {
        this.specialDates = {
            '2024-02-14': { title: 'San Valentín', description: 'El día del amor y la amistad 💕', emoji: '💝' },
            '2024-03-15': { title: 'Nuestro primer encuentro', description: 'El día que cambió todo', emoji: '💖' },
            '2024-04-20': { title: 'Primera cita', description: 'Mariposas en el estómago', emoji: '🦋' },
            '2024-05-10': { title: 'Primer beso', description: 'Momento mágico bajo las estrellas', emoji: '💋' },
            '2024-06-01': { title: 'Día especial', description: 'Una fecha para recordar', emoji: '🌟' },
            '2024-07-15': { title: 'Cumpleaños de Rebe', description: '¡Feliz cumpleaños mi amor!', emoji: '🎂' },
            '2024-08-12': { title: 'Aniversario', description: 'Celebrando nuestro amor', emoji: '💍' },
            '2024-09-22': { title: 'Primer viaje juntos', description: 'Aventuras compartidas', emoji: '✈️' },
            '2024-10-31': { title: 'Halloween juntos', description: 'Disfraces y diversión', emoji: '🎃' },
            '2024-12-25': { title: 'Navidad en pareja', description: 'Primera Navidad juntos', emoji: '🎄' }
        };
        
        this.currentDate = new Date();
        this.init();
    }

    init() {
        this.renderCalendar();
        this.setupEventListeners();
    }

    renderCalendar() {
        const calendarEl = document.getElementById('love-calendar');
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        calendarEl.innerHTML = `
            <div class="calendar-header">
                <button class="calendar-nav prev-month">❮</button>
                <h3 class="calendar-month">${this.getMonthName(month)} ${year}</h3>
                <button class="calendar-nav next-month">❯</button>
            </div>
            <div class="calendar-grid">
                ${this.generateCalendarDays()}
            </div>
        `;
        
        this.addCalendarStyles();
    }

    addCalendarStyles() {
        if (document.getElementById('calendar-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'calendar-styles';
        style.textContent = `
            .calendar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding: 0 10px;
            }
            .calendar-nav {
                background: linear-gradient(45deg, #ff6b9d, #ff8fab);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                color: white;
                cursor: pointer;
                font-size: 18px;
                transition: all 0.3s ease;
            }
            .calendar-nav:hover {
                transform: scale(1.1);
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
            .calendar-month {
                font-family: 'Great Vibes', cursive;
                font-size: 2rem;
                color: #ff6b9d;
                margin: 0;
            }
            .calendar-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 5px;
            }
            .calendar-day {
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                font-family: 'Dancing Script', cursive;
                font-size: 1.1rem;
                background: #f8f9fa;
            }
            .calendar-day:hover {
                background: #e9ecef;
                transform: scale(1.1);
            }
            .calendar-day.special {
                background: linear-gradient(45deg, #ff6b9d, #ff8fab);
                color: white;
                font-weight: bold;
                animation: heartBeat 2s ease-in-out infinite;
            }
            .calendar-day.special::after {
                content: '💖';
                position: absolute;
                top: -5px;
                right: -5px;
                font-size: 12px;
            }
            .calendar-day.other-month {
                color: #ccc;
                background: #f1f2f6;
            }
            .calendar-day.today {
                border: 3px solid #ff6b9d;
                box-shadow: 0 0 10px rgba(255,107,157,0.5);
            }
            .event-details {
                min-height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            .event-emoji {
                font-size: 4rem;
                margin-bottom: 20px;
                animation: bounce 2s ease-in-out infinite;
            }
            .event-title {
                font-family: 'Great Vibes', cursive;
                font-size: 2rem;
                color: #ff6b9d;
                margin-bottom: 15px;
            }
            .event-description {
                font-family: 'Dancing Script', cursive;
                font-size: 1.3rem;
                color: #333;
                line-height: 1.6;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }

    generateCalendarDays() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        let html = '';
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        
        // Encabezados de días
        dayNames.forEach(day => {
            html += `<div class="calendar-day-header">${day}</div>`;
        });
        
        // Días del calendario
        const current = new Date(startDate);
        for (let i = 0; i < 42; i++) {
            const dateStr = current.toISOString().split('T')[0];
            const isCurrentMonth = current.getMonth() === month;
            const isToday = this.isToday(current);
            const isSpecial = this.specialDates[dateStr];
            
            let classes = 'calendar-day';
            if (!isCurrentMonth) classes += ' other-month';
            if (isToday) classes += ' today';
            if (isSpecial) classes += ' special';
            
            html += `
                <div class="${classes}" data-date="${dateStr}">
                    ${current.getDate()}
                </div>
            `;
            
            current.setDate(current.getDate() + 1);
        }
        
        return html;
    }

    setupEventListeners() {
        const calendar = document.getElementById('love-calendar');
        
        calendar.addEventListener('click', (e) => {
            const day = e.target.closest('.calendar-day');
            const prevBtn = e.target.closest('.prev-month');
            const nextBtn = e.target.closest('.next-month');
            
            if (day && !day.classList.contains('other-month')) {
                this.selectDate(day.dataset.date);
            } else if (prevBtn) {
                this.changeMonth(-1);
            } else if (nextBtn) {
                this.changeMonth(1);
            }
        });
    }

    selectDate(dateStr) {
        const eventDetails = document.getElementById('event-details');
        const specialEvent = this.specialDates[dateStr];
        
        if (specialEvent) {
            eventDetails.innerHTML = `
                <div class="event-emoji">${specialEvent.emoji}</div>
                <h3 class="event-title">${specialEvent.title}</h3>
                <p class="event-description">${specialEvent.description}</p>
                <button class="action-btn" onclick="window.currentCalendar.addReminder('${dateStr}')">
                    🔔 Agregar recordatorio
                </button>
            `;
            
            // Efectos especiales
            window.ParticleEffects?.heartExplosion(
                window.innerWidth / 2,
                window.innerHeight / 2
            );
        } else {
            const date = new Date(dateStr);
            eventDetails.innerHTML = `
                <div class="event-emoji">📅</div>
                <h3 class="event-title">${this.formatDate(date)}</h3>
                <p class="event-description">Un día perfecto para crear nuevos recuerdos juntos ✨</p>
                <button class="action-btn" onclick="window.currentCalendar.createEvent('${dateStr}')">
                    ➕ Crear evento especial
                </button>
            `;
        }
        
        // Resaltar fecha seleccionada
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('selected');
        });
        document.querySelector(`[data-date="${dateStr}"]`).classList.add('selected');
        
        window.currentCalendar = this;
    }

    changeMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.renderCalendar();
    }

    addReminder(dateStr) {
        window.LoveUtils?.showNotification('¡Recordatorio agregado! 🔔');
        // Aquí podrías integrar con APIs de calendario
    }

    createEvent(dateStr) {
        const eventName = prompt('¿Qué evento especial quieres crear para esta fecha?');
        if (eventName) {
            const emoji = prompt('¿Qué emoji representa mejor este evento? (opcional)') || '💕';
            this.specialDates[dateStr] = {
                title: eventName,
                description: 'Evento creado con amor 💖',
                emoji: emoji
            };
            this.renderCalendar();
            window.LoveUtils?.showNotification('¡Evento creado! 🎉');
        }
    }

    getMonthName(month) {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return months[month];
    }

    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    formatDate(date) {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

window.LoveCalendar = LoveCalendar;