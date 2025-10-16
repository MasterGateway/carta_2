// ===== LOVE-QUIZ.JS - QUIZ DEL AMOR =====

class LoveQuiz {
    constructor() {
        this.questions = [
            {
                question: "¿Cuál es la comida favorita de Rebe?",
                options: ["Pizza", "Sushi", "Pasta", "Tacos"],
                correct: 0,
                explanation: "¡Exacto! A Rebe le encanta la pizza 🍕"
            },
            {
                question: "¿Qué le gusta hacer a Rebe en su tiempo libre?",
                options: ["Leer", "Ver películas", "Bailar", "Todas las anteriores"],
                correct: 3,
                explanation: "¡Correcto! Rebe es muy versátil en sus gustos 💃"
            },
            {
                question: "¿Cuál es el color favorito de Rebe?",
                options: ["Rosa", "Azul", "Verde", "Morado"],
                correct: 0,
                explanation: "¡Sí! El rosa es perfecto para ella 💗"
            },
            {
                question: "¿Qué tipo de música le gusta más a Rebe?",
                options: ["Pop", "Rock", "Baladas románticas", "De todo un poco"],
                correct: 3,
                explanation: "¡Perfecto! Rebe tiene gustos musicales muy variados 🎵"
            },
            {
                question: "¿Cuál es el lugar ideal para una cita con Rebe?",
                options: ["Restaurante elegante", "Playa al atardecer", "Cine", "Un picnic bajo las estrellas"],
                correct: 3,
                explanation: "¡Increíble! Un picnic bajo las estrellas es súper romántico ⭐"
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.init();
    }

    init() {
        this.renderQuestion();
        this.setupEventListeners();
    }

    renderQuestion() {
        const quizContent = document.getElementById('quiz-content');
        
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }
        
        const question = this.questions[this.currentQuestion];
        
        quizContent.innerHTML = `
            <div class="question-card active">
                <div class="question-header">
                    <span class="question-number">Pregunta ${this.currentQuestion + 1} de ${this.questions.length}</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(this.currentQuestion / this.questions.length) * 100}%"></div>
                    </div>
                </div>
                <h3 class="question-text">${question.question}</h3>
                <div class="answer-options">
                    ${question.options.map((option, index) => `
                        <button class="answer-btn" data-answer="${index}">
                            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-footer">
                    <div class="score-display">Puntuación: ${this.score}/${this.currentQuestion}</div>
                </div>
            </div>
        `;
        
        // Agregar estilos si no existen
        this.addQuizStyles();
    }

    addQuizStyles() {
        if (document.getElementById('quiz-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'quiz-styles';
        style.textContent = `
            .question-card {
                background: white;
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                max-width: 600px;
                margin: 0 auto;
            }
            .question-header {
                margin-bottom: 25px;
            }
            .question-number {
                font-family: 'Dancing Script', cursive;
                font-size: 1.2rem;
                color: #ff6b9d;
                font-weight: 600;
            }
            .progress-bar {
                width: 100%;
                height: 8px;
                background: #f1f2f6;
                border-radius: 4px;
                margin-top: 10px;
                overflow: hidden;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #ff6b9d, #ff8fab);
                border-radius: 4px;
                transition: width 0.5s ease;
            }
            .question-text {
                font-family: 'Dancing Script', cursive;
                font-size: 1.8rem;
                color: #333;
                text-align: center;
                margin-bottom: 30px;
                line-height: 1.4;
            }
            .answer-options {
                display: grid;
                gap: 15px;
                margin-bottom: 25px;
            }
            .answer-btn {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px 20px;
                background: #f8f9fa;
                border: 2px solid transparent;
                border-radius: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Dancing Script', cursive;
                font-size: 1.2rem;
                text-align: left;
            }
            .answer-btn:hover {
                background: #e9ecef;
                border-color: #ff6b9d;
                transform: translateX(5px);
            }
            .answer-btn.correct {
                background: linear-gradient(45deg, #00b894, #00cec9);
                color: white;
                border-color: #00b894;
            }
            .answer-btn.incorrect {
                background: linear-gradient(45deg, #e17055, #d63031);
                color: white;
                border-color: #d63031;
            }
            .option-letter {
                width: 30px;
                height: 30px;
                background: #ff6b9d;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                flex-shrink: 0;
            }
            .quiz-footer {
                text-align: center;
                padding-top: 20px;
                border-top: 2px solid #f1f2f6;
            }
            .score-display {
                font-family: 'Dancing Script', cursive;
                font-size: 1.3rem;
                color: #666;
            }
            .results-card {
                text-align: center;
                padding: 40px;
            }
            .results-score {
                font-size: 4rem;
                margin-bottom: 20px;
            }
            .results-title {
                font-family: 'Great Vibes', cursive;
                font-size: 2.5rem;
                color: #ff6b9d;
                margin-bottom: 20px;
            }
            .results-message {
                font-family: 'Dancing Script', cursive;
                font-size: 1.4rem;
                line-height: 1.6;
                color: #333;
                margin-bottom: 30px;
            }
            .quiz-actions {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
            }
            .action-btn {
                background: linear-gradient(45deg, #ff6b9d, #ff8fab);
                border: none;
                border-radius: 25px;
                padding: 12px 25px;
                color: white;
                font-family: 'Dancing Script', cursive;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        const quizContent = document.getElementById('quiz-content');
        
        quizContent.addEventListener('click', (e) => {
            const answerBtn = e.target.closest('.answer-btn');
            if (answerBtn && !answerBtn.classList.contains('answered')) {
                this.handleAnswer(answerBtn);
            }
        });
    }

    handleAnswer(selectedBtn) {
        const answerIndex = parseInt(selectedBtn.dataset.answer);
        const question = this.questions[this.currentQuestion];
        const allBtns = document.querySelectorAll('.answer-btn');
        
        // Deshabilitar todos los botones
        allBtns.forEach(btn => btn.classList.add('answered'));
        
        // Mostrar respuesta correcta
        allBtns.forEach((btn, index) => {
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === answerIndex && index !== question.correct) {
                btn.classList.add('incorrect');
            }
        });
        
        // Guardar respuesta del usuario
        this.userAnswers.push(answerIndex);
        
        // Actualizar puntuación
        if (answerIndex === question.correct) {
            this.score++;
            // Efectos de respuesta correcta
            window.ParticleEffects?.heartExplosion(
                selectedBtn.getBoundingClientRect().left + selectedBtn.offsetWidth / 2,
                selectedBtn.getBoundingClientRect().top + selectedBtn.offsetHeight / 2
            );
            window.LoveUtils?.showNotification('¡Correcto! 💖');
        } else {
            window.LoveUtils?.showNotification('Casi... ¡inténtalo de nuevo! 💪');
        }
        
        // Mostrar explicación
        setTimeout(() => {
            this.showExplanation(question.explanation);
        }, 1000);
        
        // Continuar a la siguiente pregunta
        setTimeout(() => {
            this.currentQuestion++;
            this.renderQuestion();
        }, 3000);
    }

    showExplanation(explanation) {
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'explanation';
        explanationDiv.innerHTML = `
            <div class="explanation-content">
                <span class="explanation-icon">💡</span>
                <span class="explanation-text">${explanation}</span>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .explanation {
                margin-top: 20px;
                padding: 15px;
                background: linear-gradient(45deg, #ffeaa7, #fdcb6e);
                border-radius: 10px;
                animation: slideInUp 0.5s ease;
            }
            .explanation-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .explanation-icon {
                font-size: 1.5rem;
            }
            .explanation-text {
                font-family: 'Dancing Script', cursive;
                font-size: 1.2rem;
                color: #333;
            }
            @keyframes slideInUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.querySelector('.question-card').appendChild(explanationDiv);
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        let emoji, title, message;
        
        if (percentage >= 90) {
            emoji = '🏆';
            title = '¡Eres un experto en el amor!';
            message = 'Conoces perfectamente a Rebe. ¡Definitivamente hay una conexión especial entre ustedes! 💕';
        } else if (percentage >= 70) {
            emoji = '⭐';
            title = '¡Muy bien!';
            message = 'Tienes un buen conocimiento sobre Rebe. ¡Sigue conociendo más sobre ella! 😊';
        } else if (percentage >= 50) {
            emoji = '💪';
            title = '¡Buen intento!';
            message = 'Estás en el camino correcto. ¡Sigue aprendiendo sobre lo que le gusta a Rebe! 🌟';
        } else {
            emoji = '💖';
            title = '¡Hay mucho por descubrir!';
            message = 'El amor verdadero se trata de conocerse cada día más. ¡Sigue preguntando y descubriendo! 💕';
        }
        
        const quizContent = document.getElementById('quiz-content');
        quizContent.innerHTML = `
            <div class="question-card results-card">
                <div class="results-score">${emoji}</div>
                <h2 class="results-title">${title}</h2>
                <div class="score-details">
                    <div class="score-number">${this.score}/${this.questions.length}</div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <p class="results-message">${message}</p>
                <div class="quiz-actions">
                    <button class="action-btn" onclick="window.currentQuiz.restartQuiz()">
                        🔄 Intentar de nuevo
                    </button>
                    <button class="action-btn" onclick="window.currentQuiz.reviewAnswers()">
                        📋 Ver respuestas
                    </button>
                    <button class="action-btn" onclick="window.currentQuiz.shareResults()">
                        📱 Compartir resultado
                    </button>
                </div>
            </div>
        `;
        
        // Efectos especiales según el resultado
        if (percentage >= 90) {
            window.LoveUtils?.createConfetti();
            window.ParticleEffects?.starRain(3000);
        } else if (percentage >= 70) {
            window.ParticleEffects?.heartExplosion(window.innerWidth / 2, window.innerHeight / 2);
        }
        
        // Guardar el quiz actual para las funciones
        window.currentQuiz = this;
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.renderQuestion();
    }

    reviewAnswers() {
        const quizContent = document.getElementById('quiz-content');
        let reviewHTML = `
            <div class="question-card">
                <h2 class="results-title">📋 Revisión de Respuestas</h2>
                <div class="review-content">
        `;
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            reviewHTML += `
                <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <h4>Pregunta ${index + 1}: ${question.question}</h4>
                    <p><strong>Tu respuesta:</strong> ${question.options[userAnswer]} ${isCorrect ? '✅' : '❌'}</p>
                    ${!isCorrect ? `<p><strong>Respuesta correcta:</strong> ${question.options[question.correct]} ✅</p>` : ''}
                    <p class="explanation">${question.explanation}</p>
                </div>
            `;
        });
        
        reviewHTML += `
                </div>
                <div class="quiz-actions">
                    <button class="action-btn" onclick="window.currentQuiz.restartQuiz()">
                        🔄 Intentar de nuevo
                    </button>
                </div>
            </div>
        `;
        
        quizContent.innerHTML = reviewHTML;
    }

    shareResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const text = `¡Hice el Quiz del Amor para Rebe y obtuve ${this.score}/${this.questions.length} (${percentage}%)! 💕`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Quiz del Amor - Resultados',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback - copiar al portapapeles
            navigator.clipboard.writeText(text).then(() => {
                window.LoveUtils?.showNotification('¡Resultado copiado al portapapeles! 📋');
            });
        }
    }
}

window.LoveQuiz = LoveQuiz;