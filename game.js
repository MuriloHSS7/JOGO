//conjiguração do jogo
const canvas = document.getElementyById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
let player = {
    x:50,
    y:180,
    width:50,
    height:5,
    speed:5,
    image: new Image()
};
let obstacles = [];
let keys = {};

// Carregar imagem do nosso jogador (bitmap)
player.image.src = 'player.png';
// Criar obstáculos (vetores)
function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Match.Random() * 16)];
    }
    return color;
}
// Atualizar posição dos obstáculos
function updateObstacles(){
    for(let i = 0; i < obstacles.length; i++){
        obstacles[i].x -= obstacles[i].speed;
        if(obstacles[i].x + obstacles[i].width < 0){
            obstacles.splice(i, 1);
            1--;
        }
    }
}

// Detecção de colisão
function detectCollision(player, obstacle){
    return(
        player.x < obstacle + obstacle.witdh &&
        player.x < player.width > obstacle.x &&
        player.y < obstacle + obstacle.height &&
        player.y + player.height > obstacle.y
    );
}
// Movimentos do jogador
function moveplayer(){
    if(keys['ArrowUp'] && player.y > 0){
        player.y -= player.speed;
    }
    if(keys['ArrowDown'] && player.y + player.height < canvas.height){
        player.y += player.speed;
    }
}
// Atualizar jogo
function ipdateGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
    // Desenhar obstáculos (vetores)
    for(let i = 0; i < obstacles.length; i++){
        ctx.fillstyle = obstacles[i].color;
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        if(detectCollision(player, obstacles[i])){
            alert('GAME OVER');
            document.location.reload();
            break;
        }
    }
    movePlayer();
    updateObstacles();
}

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

setInterval(() =>{
    updateGame();
}, 1000 / 60);

setInterval(() => {
    createObstacles();
}, 2000);
