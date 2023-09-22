function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function eleccion(jugada) {
    let resultado = ""
    if (jugada == 1) {
        resultado = "Piedra 🪨"
    } else if (jugada == 2) {
        resultado = "Papel 🧻"
    } else if (jugada == 3) {
        resultado = "Tijera ✂️"
    } else {
        resultado = "MAL ELEGIDO ✖️"
    }
    return resultado
}

function marcador(params) {
    if (params == 0) {
        alert("PERDISTE 😞")
        perdidas = perdidas + 1
    } else if (params == 1) {
        alert("GANASTE 🥳")
        triunfos = triunfos + 1
    } else if (params == 2) {
        alert("EMPATE 🤜🏼🤛🏼")
        empates = empates + 1
    }
    return 0
}

// 1 es piedra, 2 es papel, 3 es tijera
let jugador = 0
let pc = 0
let perdidas = 0
let triunfos = 0
let empates = 0

while (triunfos < 3 && perdidas < 3) {
    pc = aleatorio(1, 3)
    jugador = prompt("Elige: \n1 Piedra 🪨 \n2 Papel 🧻 \n3 Tijera ✂️")
    alert("Jugador elige " + eleccion(jugador))
    alert("PC elige " + eleccion(pc))

    // COMBATE
    if (pc == jugador) {
        marcador(2)
    } else if (jugador == 1 && pc == 3) {
        marcador(1)
    } else if (jugador == 2 && pc == 1) {
        marcador(1)
    } else if (jugador == 3 && pc == 2) {
        marcador(1)
    } else {
        marcador(0)
    }
}

alert("🥳 Ganados: " + triunfos + "\n😞 Perdidos: " + perdidas + "\n🤜🏼🤛🏼Empates: " + empates)