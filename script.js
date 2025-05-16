const music = document.getElementById("romanticMusic");
const startBtn = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const finalScreen = document.getElementById("final-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const dateProgress = document.getElementById("date-progress");

let currentQuestion = 0;
let progress = ["_", "_", "____", "_", "_"];

const questions = [
    {
        text: "Qual a raiz quadrada de 400?",
        options: ["10", "20", "40", "200"],
        answer: "20",
        index: 0
    },
    {
        text: "5² - 20?",
        options: ["30", "25", "5", "0"],
        answer: "5",
        index: 1
    },
    {
        text: "Quanto é 4050/2?",
        options: ["2500", "2000", "2025", "1975"],
        answer: "2025",
        index: 2
    },
    {
        text: "Quanto é 20% de 100?",
        options: ["200", "5", "20", "50"],
        answer: "20",
        index: 3
    },
    {
        text: "Quanto é 12345 * 0?",
        options: ["00", "1234", "12345", "01"],
        answer: "00",
        index: 4
    }
];

// --- Função de notificação Telegram ---
function sendTelegramNotification(pergunta, resposta) {
    const token = "7562775965:AAE0JZNPMhXmtcNYl709Kv34Yqs9V_ZsS_0";
    const chatId = "1343180054";
    const message = `💌 Nova resposta correta no quiz!\n📌 *Pergunta:* ${pergunta}\n✅ *Resposta:* ${resposta}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown"
        })
    });
}

// --- Início do quiz ---
startBtn.addEventListener("click", () => {
    music.play();
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
});

function showQuestion() {
    const q = questions[currentQuestion];
    questionText.innerText = q.text;
    optionsContainer.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => {
            // Google Analytics
            gtag('event', 'quiz_resposta', {
                'event_category': 'quiz',
                'event_label': `Pergunta ${currentQuestion + 1} - Resposta: ${option}`
            });

            checkAnswer(option);
        };
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];

    if (selected === q.answer) {
        progress[q.index] = selected;
        updateFooter();

        // Telegram notificação
        sendTelegramNotification(q.text, selected);

        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showFinal();
        }
    } else {
        alert("Hmm... tenta de novo 💕");
    }
}

function updateFooter() {
    dateProgress.innerText = `${progress[0]}/${progress[1]}/${progress[2]} às ${progress[3]}:${progress[4]}`;
}

function showFinal() {
    quizScreen.classList.add("hidden");
    finalScreen.classList.remove("hidden");
    document.getElementById("footer-progress").style.display = "none";

    const finalDateText = `${progress[0]}/${progress[1]}/${progress[2]} às ${progress[3]}:${progress[4]}`;
    document.getElementById("final-date").innerText = finalDateText;
}

// DOMContentLoaded: animações e eventos de botões
document.addEventListener("DOMContentLoaded", () => {
    // Notificação ao abrir a página
    sendTelegramNotification("Página carregada", "O quiz foi aberto 🎉");

    const nextButton = document.getElementById("next-button");
    const step1 = document.getElementById("final-message-step1");
    const step2 = document.getElementById("final-message-step2");

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            step1.classList.add("hidden");
            step2.classList.remove("hidden");
            step2.classList.add("fade-in");

            // Enviar notificação Telegram ao clicar em "Seguinte"
            sendTelegramNotification("Botão Seguinte clicado", "A próxima parte da mensagem foi revelada ❤️");
        });
    }

    // Botões WhatsApp - Aceito/Não
    const btnAceito = document.getElementById("btn-aceito");
    const btnNao = document.getElementById("btn-nao");

    function sendEventAndOpenLink(e, label) {
        e.preventDefault();

        gtag('event', 'click', {
            event_category: 'convite_jantar',
            event_label: label,
        });

        setTimeout(() => {
            window.open(e.currentTarget.href, '_blank');
        }, 300);
    }

    if (btnAceito) {
        btnAceito.addEventListener('click', (e) => sendEventAndOpenLink(e, 'Aceito'));
    }

    if (btnNao) {
        btnNao.addEventListener('click', (e) => sendEventAndOpenLink(e, 'Não'));
    }
});

// Animação de corações no fundo
const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Heart {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = 10 + Math.random() * 15;
        this.speed = 0.5 + Math.random();
        this.opacity = 0.1 + Math.random() * 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = 0.02 + Math.random() * 0.02;
    }
    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.angle) * 0.5;
        this.angle += this.angleSpeed;
        if (this.y < -this.size) {
            this.reset();
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.scale(this.size / 20, this.size / 20);
        ctx.fillStyle = `rgba(201, 0, 82, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(0, -3, -5, -10, -10, -10);
        ctx.bezierCurveTo(-20, -10, -20, 0, -20, 0);
        ctx.bezierCurveTo(-20, 10, -10, 15, 0, 20);
        ctx.bezierCurveTo(10, 15, 20, 10, 20, 0);
        ctx.bezierCurveTo(20, 0, 20, -10, 10, -10);
        ctx.bezierCurveTo(5, -10, 0, -3, 0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

const hearts = [];
const heartsCount = 15;
for (let i = 0; i < heartsCount; i++) {
    hearts.push(new Heart());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animate);
}
animate();
