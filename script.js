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
        btn.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];

    if (selected === q.answer) {
        progress[q.index] = selected;
        updateFooter();
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

    // Remove o rodapé com gabarito
    document.getElementById("footer-progress").style.display = "none";

    // Atualiza a data e hora no final
    const finalDateText = `${progress[0]}/${progress[1]}/${progress[2]} às ${progress[3]}:${progress[4]}`;
    document.getElementById("final-date").innerText = finalDateText;
}
// Botão SEGUINTE revela a parte final da mensagem
document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.getElementById("next-button");
    const step1 = document.getElementById("final-message-step1");
    const step2 = document.getElementById("final-message-step2");

    nextButton.addEventListener("click", () => {
        step1.classList.add("hidden");
        step2.classList.remove("hidden");
        step2.classList.add("fade-in");
    });
});

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

        // Desenha um coração clássico usando curvas de Bézier
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
