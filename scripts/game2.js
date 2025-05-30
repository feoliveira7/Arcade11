
var casas = [9, 9, 9, 9, 9, 9, 9, 9, 9];


var vez = 1;

var contaClique = 0;

var iPontosX = 0;
var iPontosO = 0;
var iPontosV = 0;
var sResposta = "";

function verifica(casa){

    if(casas[casa]==9){
        casas[casa]=vez;

        if(vez==1){
            document.getElementById("img"+casa).src="assets/pacman.png";
            document.getElementById('imgVez').src="assets/ghost1.png";
        }else{
            document.getElementById("img"+casa).src="assets/ghost1.png";
            document.getElementById('imgVez').src="assets/pacman.png";
        }

        vez*=-1;
        contaClique++;
        confere()
    } 
}

function confere(){
    var i;
    var lGanhou = false;
    var lAcabou = true;

    for(i=0;i<casas.length;i++){
        if(casas[i]==9){
            lAcabou = false;
        }
    }

    if(contaClique==9){
        lAcabou = true;
    }

    var soma = [];
    soma[0]=casas[0]+casas[1]+casas[2];
    soma[1]=casas[3]+casas[4]+casas[5];
    soma[2]=casas[6]+casas[7]+casas[8];
    soma[3]=casas[0]+casas[3]+casas[6];
    soma[4]=casas[1]+casas[4]+casas[7];
    soma[5]=casas[2]+casas[5]+casas[8];
    soma[6]=casas[0]+casas[4]+casas[8];
    soma[7]=casas[2]+casas[4]+casas[6];

    for(i=0;i<soma.length;i++){

        if(soma[i]==-3){
            lGanhou = true;
            iPontosO++;
            sResposta = "O Fantasma venceu!";
            document.getElementById("bola").innerHTML = "<img class='imgResultados' src='assets/ghost1.png'> Pontuação: "+iPontosO;
            break

        }else if(soma[i]==3){
            lGanhou = true;
            iPontosX++;
            sResposta = "O Pac-Man venceu!";
            document.getElementById("xis").innerHTML = "<img class='imgResultados' src='assets/pacman.png'> Pontuação: "+iPontosX;
            break
        }
        
    }

    if(lGanhou==false && lAcabou==true){
        sResposta = "EMPATE!";
        iPontosV++;
        document.getElementById("velha").innerHTML = "Empate: "+iPontosV;
    }

    if(lGanhou || lAcabou){
        for(i=0;i<casas.length;i++){
            document.getElementById("casa"+i).disable = true;
            casas[i]=0;
        }

        document.getElementById("resposta").innerHTML = sResposta;
        document.getElementById("resposta").style.color = "#ffc400";
    
    }

}

function recomeca(){
    for(i=0;i<casas.length;i++){
        document.getElementById("img"+i).ondragstart = function(){return false;};
        document.getElementById("casa"+i).disable = false;
        document.getElementById("img"+i).src="assets/pacbubble.png";

        document.getElementById("resposta").innerHTML = "AGURDANDO VENCEDOR:";
        casas[i]=9;
        lGanhou=false;
        lAcabou=true;
        contaClique=0
        vez=1;
    }

    document.getElementById('imgVez').src="assets/ghost1.png";
}

// function animacao(){

//  pacman = document.getElementById("pacmanAnimation");
//  ghost = document.getElementById("ghostAnimation");

//  pacman.style.marginLeft = "560px";
//  ghost.style.marginTop = "260px";


//     setInterval(function(){
//         ghost.style.display = "none";
//     }, 6000);


// }

// setInterval(function(){

//     animacao();

// }, 1000);
