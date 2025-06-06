
let personagemComprado = [
    true, 
    false, false, false, false, false
];

let valorPersonagem = [0, 100, 140, 170, 200, 250];

function buyPersonagem(n) {
    if (personagemComprado[n - 1]) {
        equipped(n);
    } else {
        if (coins >= valorPersonagem[n - 1]) {
            personagemComprado[n - 1] = true;
            coins -= valorPersonagem[n - 1];
            document.getElementById(`buttonShop${n}`).innerHTML = "EQUIPAR";

        } else {
            alert('Você não tem anéis suficientes para comprar este personagem.');
        }
    }
}


function equipped(n) {
    for (let i = 1; i <= 6; i++) {
        if (personagemComprado[i - 1]) {
            document.getElementById(`buttonShop${i}`).innerHTML = (i === n) ? "EQUIPADO" : "EQUIPAR";
        }
    }
    localStorage.setItem('personagemEquipado', `personagem${n}`);
}


document.getElementById('buttonShop1').addEventListener('click', () => buyPersonagem(1));
document.getElementById('buttonShop2').addEventListener('click', () => buyPersonagem(2));
document.getElementById('buttonShop3').addEventListener('click', () => buyPersonagem(3));
document.getElementById('buttonShop4').addEventListener('click', () => buyPersonagem(4));
document.getElementById('buttonShop5').addEventListener('click', () => buyPersonagem(5));
document.getElementById('buttonShop6').addEventListener('click', () => buyPersonagem(6));


window.onload = function() {
    let equipado = localStorage.getItem('personagemEquipado');
    
    if (equipado) {
        let num = parseInt(equipado.replace('personagem', ''));
        equipped(num);
    } else {
        equipped(1); 
        localStorage.setItem('personagemEquipado', 'personagem1');
    }
};

function returnShop(){
    document.getElementById('lojaContainer').style.display = 'none';
}

function openShop(){
    document.getElementById('lojaContainer').style.display = 'flex';
}
