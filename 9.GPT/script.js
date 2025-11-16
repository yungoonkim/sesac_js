const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreLevelDisplay = document.getElementById('score-level');
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlay-text');
const startBtn = document.getElementById('start');
const nicknameInput = document.getElementById('nickname');
const leaderboardDiv = document.getElementById('leaderboard');

let score = 0;
let level = 1;
let playerPos = { x: 375, y: 550 };
const step = 50;
let gameOver = false;
let cars = [];
const laneYPositions = [100, 200, 300, 400];
const baseSpeed = 2;
const carColors = ['#333', '#ffcc00', '#00cc00', '#0066ff', '#cc00cc'];
let nickname = "";

// 점수 기록
let leaderboard = [];

// 키 입력
document.addEventListener('keydown', (e) => {
    if (gameOver || overlay.style.display === 'flex') return;

    switch(e.key) {
        case 'ArrowUp':
            if (playerPos.y > 0) {
                playerPos.y -= step;
                score++;
                updateScoreLevel();
                if (playerPos.y <= 0) nextLevel();
            }
            break;
        case 'ArrowDown':
            if (playerPos.y < 550) playerPos.y += step;
            break;
        case 'ArrowLeft':
            if (playerPos.x > 0) playerPos.x -= step;
            break;
        case 'ArrowRight':
            if (playerPos.x < 750) playerPos.x += step;
            break;
    }
    updatePlayerPosition();
});

function updatePlayerPosition() {
    player.style.top = playerPos.y + "px";
    player.style.left = playerPos.x + "px";
}

function updateScoreLevel() {
    scoreLevelDisplay.textContent = `점수: ${score} | 레벨: ${level}`;
}

function createCars() {
    cars.forEach(car => gameContainer.removeChild(car));
    cars = [];

    for (let i = 0; i < level + 2; i++) {
        const car = document.createElement('div');
        car.classList.add('car');
        car.style.backgroundColor = carColors[Math.floor(Math.random() * carColors.length)];
        car.direction = Math.random() < 0.5 ? 'left' : 'right';
        car.speed = baseSpeed + level + Math.random() * 2;

        const lane = laneYPositions[Math.floor(Math.random() * laneYPositions.length)];
        car.style.top = lane + "px";

        if (car.direction === 'left') {
            car.style.left = (800 + Math.random() * 200) + "px";
        } else {
            car.style.left = (-100 - Math.random() * 200) + "px";
        }

        gameContainer.appendChild(car);
        cars.push(car);
    }
}

function moveCars() {
    cars.forEach(car => {
        let carX = parseFloat(car.style.left);
        if (car.direction === 'left') {
            carX -= car.speed;
            if (carX < -100) carX = 800;
        } else {
            carX += car.speed;
            if (carX > 800) carX = -100;
        }
        car.style.left = carX + "px";

        if (!gameOver && isCollision(player, car)) endGame();
    });
}

function isCollision(rect1, rect2) {
    const r1 = rect1.getBoundingClientRect();
    const r2 = rect2.getBoundingClientRect();
    return !(r1.top > r2.bottom || r1.bottom < r2.top || r1.right < r2.left || r1.left > r2.right);
}

function endGame() {
    gameOver = true;
    overlayText.textContent = "Game Over";
    startBtn.textContent = "다시 하기";
    overlay.style.display = 'flex';

    if (nickname) {
        leaderboard.push({ name: nickname, score: score });
        displayLeaderboard();
    }
}

function nextLevel() {
    level++;
    playerPos.y = 550;
    playerPos.x = 375;
    updatePlayerPosition();
    createCars();
    updateScoreLevel();
}

function gameLoop() {
    if (!gameOver && overlay.style.display !== 'flex') moveCars();
    requestAnimationFrame(gameLoop);
}

function displayLeaderboard() {
    leaderboardDiv.innerHTML = "<strong>리더보드:</strong><br>";
    
    // 점수 내림차순 정렬
    const sorted = leaderboard.slice().sort((a,b) => b.score - a.score);

    // 최대 10위까지만 표시
    sorted.slice(0, 10).forEach((entry, idx) => {
        leaderboardDiv.innerHTML += `${idx+1}. ${entry.name}: ${entry.score}점<br>`;
    });
}

startBtn.addEventListener('click', () => {
    if (!nicknameInput.value.trim()) {
        alert("닉네임을 입력해주세요!");
        return;
    }

    nickname = nicknameInput.value.trim();

    // 항상 새 게임 시작 시 초기화
    score = 0;
    level = 1;
    playerPos = { x: 375, y: 550 };
    gameOver = false;

    updatePlayerPosition();
    createCars();
    updateScoreLevel();

    overlay.style.display = 'none';
});

updatePlayerPosition();
updateScoreLevel();
gameLoop();
