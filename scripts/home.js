function switchSound() {
    const audio = document.getElementById('bg-music');
    const icon = document.getElementById('iconSoundButton');

    audio.muted = !audio.muted;


    if (audio.muted) {
      icon.src = 'assets/mute.png';
      icon.alt = 'Som Desligado';
    } else {
      icon.src = 'assets/soundUp.png';
      icon.alt = 'Som Ligado';
    }
  }

function PlayCard1(){
    document.getElementById('fundoCard1').style.opacity = "90%"
}

function removePlayCard1(){
  document.getElementById('fundoCard1').style.opacity = "0%"
}

function PlayCard2(){
  document.getElementById('fundoCard2').style.opacity = "90%"
}

function removePlayCard2(){
document.getElementById('fundoCard2').style.opacity = "0%"
}

function PlayCard3(){
  document.getElementById('fundoCard3').style.opacity = "90%"
}

function removePlayCard3(){
document.getElementById('fundoCard3').style.opacity = "0%"
}

function PlayCard4(){
  document.getElementById('fundoCard4').style.opacity = "90%"
}

function removePlayCard4(){
document.getElementById('fundoCard4').style.opacity = "0%"
}