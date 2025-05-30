document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault(); 
    }
});

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const ring = document.querySelector('.ring');

let score = 0;
let coins = 0;
let coinsAtual = 0;

let loop;  
let scoreInterval; 
let isGameOver = false;  






const jump = () => {
    if (!isGameOver) {  
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 700);
    }
};

const gameover = () => {
    isGameOver = true;  
    document.getElementById('gameoverContainer').style.display = 'flex';
    pipe.style.animation = 'none';
    pipe.style.left = `${pipe.offsetLeft}px`;

    ring.style.animation = 'none';
    ring.style.left = `${ring.offsetLeft}px`;

    mario.style.animation = 'none';
    mario.style.bottom = window.getComputedStyle(mario).bottom;

    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    document.getElementById('goScore').innerHTML='PONTUAÇÃO: ' + score;
    document.getElementById('goRings').innerHTML='ANÉIS OBTIDOS: +' + coinsAtual;

    ganhosRodada = score / 4
    coins += Number(ganhosRodada.toFixed())
    coinsAtual = 0;
    score = 0;

    clearInterval(loop);  
    clearInterval(scoreInterval);  
};

const coletar = () => {
    ring.style.display = 'none';
    ring.style.animation = 'none';
    coins++;
    coinsAtual++;

    setTimeout(() => {
        ring.style.display = 'block';
        ring.style.left = '100%';
        void ring.offsetWidth;
        ring.style.animation = 'ring-animation 4s linear infinite';
    }, 3000);
};

function startGame(){

    document.getElementById('startScreen').style.display='none'


    setTimeout(() => {
        iniciarJogo()
    }, 1000);






}

const iniciarJogo = () => {

    document.getElementById('startScreen').style.display='none'
    pipe.style.animation = 'pipe-animation 2s infinite linear';  
    pipe.style.left = '';  



    isGameOver = false;
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const ringPosition = ring.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 180) {
            gameover();
        }

        if (ring.style.display !== 'none' && ringPosition < 140 && ringPosition > 0 && marioPosition > 230) {
            coletar();
        }
    }, 10);

    

    scoreInterval = setInterval(() => {
        if (!isGameOver) {  
            document.getElementById('pontuacao').innerText = `PONTUAÇÃO: ${score}`;
            document.getElementById('ringsShow').innerText = `${coins}`;
            
            score++;
        }
    }, 150);
};

setInterval(() => {
document.getElementById('ringsShop').innerText = `${coins}`;
}, 10);


function playAgain() {
carregarPersonagem();
    document.getElementById('gameoverContainer').style.display = 'none';

    pipe.style.animation = 'pipe-animation 1.5s infinite linear';  
    pipe.style.left = '';  

    ring.style.animation = 'ring-animation 4s linear infinite';
    ring.style.left = '100%';
    ring.style.display = 'block';

    mario.style.animation = '';  
    mario.style.bottom = '';     
    mario.style.width = '150px'; 
    mario.style.marginLeft = '0'; 

    iniciarJogo();  
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});


let personagemAtual = localStorage.getItem('personagemEquipado') || 'personagem1';

// trocar personagem
function trocarPersonagem(novoPersonagem) {
    const personagem = document.getElementById('personagemPrincipal');
    
    switch (novoPersonagem) {
        case 'personagem1':
            personagem.src = 'assets/sonicPersonagem.gif'; 
            break;
        case 'personagem2':
            personagem.src = 'assets/tailsPersonagem.gif'; 
            break;
        case 'personagem3':
            personagem.src = 'assets/knucklesPersonagem.gif';  
            break;
        case 'personagem4':
            personagem.src = 'assets/mightyPersonagem.gif'; 
            break;
        case 'personagem5':
            personagem.src = 'assets/metalsonicPersonagem.gif';  
            break;
        case 'personagem6':
            personagem.src = 'assets/supersonicPersonagem.gif';
            break;
        default:
            console.warn('Personagem não reconhecido:', novoPersonagem);
            return;  // Não atualiza se inválido
    }

}

function carregarPersonagem() {
    let personagemAtual = localStorage.getItem('personagemEquipado') || 'personagem1';
    trocarPersonagem(personagemAtual);
}

window.onload = function() {
    localStorage.setItem('personagemEquipado', 'personagem1');
}
