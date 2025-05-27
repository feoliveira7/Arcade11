// Letras do teclado
const cLinha1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const cLinha2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç']
const cLinha3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
const letras = [...cLinha1, ...cLinha2, ...cLinha3]

// Perguntas
const perguntas = [
    ["CARAMBOLA", "FRUTA"],
    ["JABOTICABA", "FRUTA"],
    ["MORANGO", "FRUTA"],
    ["LARANJA", "FRUTA"],
    ["ABACAXI", "FRUTA"],
    ["MELANCIA", "FRUTA"],
    ["TANGERINA", "FRUTA"],
    ["LIMAO", "FRUTA"],
    ["GOIABA", "FRUTA"],
    ["PITAYA", "FRUTA EXÓTICA"],
    ["ACEROLA", "FRUTA"],
    ["GRAVIOLA", "FRUTA EXÓTICA"],
  
    // CORPO
    ["CABELO", "CORPO"],
    ["BRAÇO", "CORPO"],
    ["PERNA", "CORPO"],
    ["PEITO", "CORPO"],
    ["COSTELA", "CORPO"],
    ["JOELHO", "CORPO"],
    ["PÉ", "CORPO"],
    ["COTOVELO", "CORPO"],
    ["CABEÇA", "CORPO"],
    ["TORNOZELO", "CORPO"],
    ["SOBRANCELHA", "CORPO"],
    ["OMBRO", "CORPO"],
  
    // INSTRUMENTOS E OBJETOS
    ["VIOLINO", "INSTRUMENTO"],
    ["PIANO", "INSTRUMENTO"],
    ["FLAUTA", "INSTRUMENTO"],
    ["TAMBOR", "INSTRUMENTO"],
    ["VIOLA", "INSTRUMENTO"],
    ["TAMBORETE", "MÓVEL"],
    ["CADEIRA", "MÓVEL"],
    ["FUSCA", "VEÍCULO"],
    ["TREM", "VEÍCULO"],
    ["NAVIO", "VEÍCULO"],
  
    // MITOLOGIA E FANTASIA
    ["UNICÓRNIO", "MITOLOGIA"],
    ["HIDRA", "MITOLOGIA"],
    ["MINOTAURO", "MITOLOGIA"],
    ["GRIFO", "MITOLOGIA"],
    ["DRAGÃO", "MITOLOGIA"],
    ["EXCALIBUR", "OBJETO MÁGICO"],
    ["VARINHA", "OBJETO MÁGICO"],
    ["POÇÃO", "OBJETO MÁGICO"],
  
    // TECNOLOGIA
    ["TECLADO", "TECNOLOGIA"],
    ["SATÉLITE", "TECNOLOGIA"],
    ["ROTEADOR", "TECNOLOGIA"],
    ["SMARTPHONE", "TECNOLOGIA"],
    ["DRONE", "TECNOLOGIA"],
  
    // ANIMAIS
    ["ORNITORRINCO", "ANIMAL"],
    ["TAMANDUÁ", "ANIMAL"],
    ["BALEIA", "ANIMAL"],
    ["CORUJA", "ANIMAL"],
    ["LAGARTIXA", "ANIMAL"],
    ["MORCEGO", "ANIMAL"],
  
    // PLANETAS
    ["JÚPITER", "PLANETA"],
    ["SATURNO", "PLANETA"],
    ["MARTE", "PLANETA"],
    ["VÊNUS", "PLANETA"],
    ["URANO", "PLANETA"],
  
    // SENTIMENTOS
    ["ALEGRIA", "SENTIMENTO"],
    ["RAIVA", "SENTIMENTO"],
    ["TRISTEZA", "SENTIMENTO"],
    ["ESPANTO", "SENTIMENTO"],
    ["CIÚMES", "SENTIMENTO"],
  
    // LUGARES
    ["SERTÃO", "LUGAR"],
    ["PRAIA", "LUGAR"],
    ["DESERTO", "LUGAR"],
    ["ILHA", "LUGAR"],
    ["FLORESTA", "LUGAR"],
  
    // LÍNGUAS E PROFISSÕES
    ["PORTUGUÊS", "LÍNGUA"],
    ["JAPONÊS", "LÍNGUA"],
    ["MÉDICO", "PROFISSÃO"],
    ["ENGENHEIRO", "PROFISSÃO"],
    ["PADEIRO", "PROFISSÃO"]
]

let sorteados = []
let jogada = 0
let palavraOriginal = ""
let palavraSorteada = ""
let acertos = 0
let erro = 0
let certas = 0
let erradas = 0
let palavraSorteadaLength = 0
let letrasCorretas = new Set()

// Cria os botões das letras
document.addEventListener("DOMContentLoaded", () => {
  criaTeclado(cLinha1, "letra1")
  criaTeclado(cLinha2, "letra2")
  criaTeclado(cLinha3, "letra3")
  prepararRodada()
})

function criaTeclado(letras, idLinha) {
  const linha = document.getElementById(idLinha)
  letras.forEach(letra => {
    const btn = document.createElement("input")
    btn.type = "button"
    btn.value = letra
    btn.id = letra
    btn.classList.add("tecla")
    btn.addEventListener("click", () => confere(letra))
    linha.appendChild(btn)
  })
}

function prepararRodada() {
  if (sorteados.length === 0) {
    sorteados = shuffleArray(perguntas.map((_, i) => i))
  }

  const index = sorteados[jogada % sorteados.length]
  palavraOriginal = perguntas[index][0]
  palavraSorteada = limpa(palavraOriginal.toUpperCase())
  const letrasUnicas = new Set(palavraSorteada.split(""))
  palavraSorteadaLength = letrasUnicas.size

  document.getElementById("tema").innerText = `Tema: ${perguntas[index][1]}`
  document.getElementById("tenta").innerHTML = ""
  criaLetras(palavraOriginal)

  letras.forEach(l => {
    const btn = document.getElementById(l)
    if (btn) btn.disabled = false
  })

  acertos = 0
  erro = 0
  letrasCorretas.clear()

  document.getElementById("acertos").innerText = `Acertos: ${acertos}`
  document.getElementById("imagem").src = `assets/forca1.png`
}

function criaLetras(palavra) {
  const container = document.getElementById("tenta")
  let j = 0
  for (let i = 0; i < palavra.length; i++) {
    if (palavra[i] !== " ") {
      const input = document.createElement("input")
      input.type = "text"
      input.id = `tenta${j}`
      input.maxLength = 1
      input.size = 1
      input.disabled = true
      container.appendChild(input)
      j++
    } else {
      const espaco = document.createElement("span")
      espaco.style.margin = "0 20px"
      container.appendChild(espaco)
    }
  }
}

function confere(letra) {
  let achou = false
  let indexInput = 0

  for (let i = 0; i < palavraOriginal.length; i++) {
    if (palavraOriginal[i] !== " ") {
      if (letra === limpa(palavraOriginal[i].toUpperCase())) {
        document.getElementById(`tenta${indexInput}`).value = palavraOriginal[i]
        achou = true
      }
      indexInput++
    }
  }

  document.getElementById(letra).disabled = true

  if (achou) {
    letrasCorretas.add(letra)
    acertos = letrasCorretas.size
    document.getElementById("acertos").innerText = `Acertos: ${acertos}`
    if (acertos === palavraSorteadaLength) fimDeJogo(true)
  } else {
    erro++
    if (erro <= 6) document.getElementById("imagem").src = `assets/forca${erro + 1}.png`
    if (erro === 6) fimDeJogo(false)
  }
}

function fimDeJogo(acertou) {
  if (acertou) {
    alert("Parabéns, você acertou!")
    certas++
  } else {
    alert(`Você foi enforcado!\nA palavra correta era: ${palavraOriginal}`)
    erradas++
  }

  document.getElementById("palavrasCertas").innerHTML = `Vitórias: ${certas} <br> Derrotas: ${erradas}`

  jogada++
  setTimeout(prepararRodada, 1000)
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function limpa(str) {
  return str.normalize("NFD").replace(/[^\w]/g, "").toUpperCase()
}
