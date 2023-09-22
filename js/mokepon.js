const btnPet = document.getElementById("btn-pet")
const btnRestart = document.getElementById("btn-restart")
const selectAttack = document.getElementById("select-atack")
const restart = document.getElementById("restart")
const selectPet = document.getElementById("select-pet")
const inputPydos = document.getElementById("pydos")
const spanPlayerPetName = document.getElementById("player-pet-name")
const spanEnemyPetName = document.getElementById("enemy-pet-name")
const result = document.getElementById("result")
const playerAttackSection = document.getElementById("player-attack")
const enemyAttackSection = document.getElementById("enemy-attack")
const sectionMessage = document.getElementById("result")
const spanPlayerLives = document.getElementById("player-lives")
const spanEnemyLives = document.getElementById("enemy-lives")
const containerCards = document.getElementById("container-cards")
const containerAttacks = document.getElementById("container-attacks")

let checkPlayer
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let btnFire
let btnWater
let btnSoil
let attacksMokepon
let mokeponesOptions
let playerAttackIndex
let enemyAttackIndex
let enemyVictories = 0
let playerVictories = 0
let playerAttack = []
let enemyAttack = []
let buttons = []
let mokepones = []

class Mokepon {
    constructor(name, img, lives) {
        this.name = name
        this.img = img
        this.lives = lives
        this.attacks = []
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepon_hipodoge_attack.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/mokepon_capipepo_attack.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepon_ratigueya_attack.png", 5)
let langostelvis = new Mokepon("Langostelvis", "./assets/mokepon_langostelvis_attack.png", 5)
let tucapalma = new Mokepon("Tucapalma", "./assets/mokepon_tucapalma_attack.png", 5)
let pydos = new Mokepon("Pydos", "./assets/mokepon_pydos_attack.png", 5)

hipodoge.attacks.push(
    { name: "💧", id: "btn-water" },
    { name: "💧", id: "btn-water" },
    { name: "💧", id: "btn-water" },
    { name: "🔥", id: "btn-fire" },
    { name: "🌱", id: "btn-soil" },
)

capipepo.attacks.push(
    { name: "🌱", id: "btn-soil" },
    { name: "🌱", id: "btn-soil" },
    { name: "🌱", id: "btn-soil" },
    { name: "💧", id: "btn-water" },
    { name: "🔥", id: "btn-fire" },
)

ratigueya.attacks.push(
    { name: "🔥", id: "btn-fire" },
    { name: "🔥", id: "btn-fire" },
    { name: "🔥", id: "btn-fire" },
    { name: "💧", id: "btn-water" },
    { name: "🌱", id: "btn-soil" },
)

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)

function startGame() {
    selectAttack.style.display = "none"
    restart.style.display = "none"

    mokepones.forEach((mokepon) => {
        mokeponesOptions = `
        <input type="radio" name="pet" id="${mokepon.name}">
        <label class = "cardsMokepon" for="${mokepon.name}">
            <p>${mokepon.name} </p>
            <img src="${mokepon.img}" alt="${mokepon.name}">
        </label>
        `

        containerCards.innerHTML += mokeponesOptions

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
        inputLangostelvis = document.getElementById("Langostelvis")
        inputTucapalma = document.getElementById("Tucapalma")
    })

    btnPet.addEventListener("click", selectPetPlayer)
    btnRestart.addEventListener("click", reload)
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function reload() {
    location.reload()
}

function selectPetPlayer() {
    selectAttack.style.display = "flex"
    selectPet.style.display = "none"

    if (inputHipodoge.checked) {
        spanPlayerPetName.innerHTML = inputHipodoge.id
        checkPlayer = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanPlayerPetName.innerHTML = inputCapipepo.id
        checkPlayer = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanPlayerPetName.innerHTML = inputRatigueya.id
        checkPlayer = inputRatigueya.id
    } else if (inputLangostelvis.checked) {
        spanPlayerPetName.innerHTML = inputLangostelvis.id
        checkPlayer = inputLangostelvis.id
    } else if (inputTucapalma.checked) {
        spanPlayerPetName.innerHTML = inputTucapalma.id
        checkPlayer = inputTucapalma.id
    } else if (inputPydos.checked) {
        spanPlayerPetName.innerHTML = inputPydos.id
        checkPlayer = inputPydos.id
    } else {
        alert("Por favor, selecciona una mascota...")
    }

    searchMokepon(checkPlayer)
    selectPetEnemy()
}

function searchMokepon(checkPlayer) {
    let attacks
    for (let i = 0; i < mokepones.length; i++) {
        if (checkPlayer === mokepones[i].name) {
            attacks = mokepones[i].attacks
        }
    }
    showAttacks(attacks)
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        attacksMokepon = `
        <button id="${attack.id}" class="btn-attack buttons">${attack.name}</button>
        `

        containerAttacks.innerHTML += attacksMokepon

        btnFire = document.getElementById("btn-fire")
        btnWater = document.getElementById("btn-water")
        btnSoil = document.getElementById("btn-soil")
        buttons = document.querySelectorAll(".buttons")
    })
}

function attacksSequence() {
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                playerAttack.push("FUEGO")
                button.style.background = "#777"
                button.disabled = "true"
                console.log(playerAttack)
            } else if (e.target.textContent === "💧") {
                playerAttack.push("AGUA")
                button.style.background = "#777"
                button.disabled = "true"
                console.log(playerAttack)
            } else {
                playerAttack.push("TIERRA")
                button.style.background = "#777"
                button.disabled = "true"
                console.log(playerAttack)
            }
            enemyAttackRandom()
        })
    })
}

function selectPetEnemy() {
    let randomMokepon = randomNumber(0, mokepones.length - 1)
    spanEnemyPetName.innerHTML = mokepones[randomMokepon].name
    enemyMokeponAttacks = mokepones[randomMokepon].attacks
    attacksSequence()

    console.log(enemyMokeponAttacks)
}

// RETOOO utilizar los ataques uno a uno del enemigo para ir comparando con el jugador
function enemyAttackRandom() {
    let randomAttack = randomNumber(0, enemyMokeponAttacks.length - 1)

    if (randomAttack == 0 || randomAttack == 1) {
        enemyAttack.push("FUEGO")
    } else if (randomAttack == 3 || randomAttack == 4) {
        enemyAttack.push("AGUA")
    } else {
        enemyAttack.push("TIERRA")
    }
    console.log(enemyAttack)
    startFight()
}

function startFight() {
    if (enemyAttack.length === 5) {
        fight()
    }
}

function opponentsIndex(player, enemy) {
    playerAttackIndex = playerAttack[player]
    enemyAttackIndex = enemyAttack[enemy]
}

function fight() {
    for (let i = 0; i < enemyAttack.length; i++) {
        if (enemyAttack[i] == playerAttack[i]) {
            opponentsIndex(i, i)
            createMessage("EMPATE")
        } else if (playerAttack[i] == "FUEGO" && enemyAttack[i] == "TIERRA") {
            opponentsIndex(i, i)
            createMessage("GANASTE")
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
        } else if (playerAttack[i] == "AGUA" && enemyAttack[i] == "FUEGO") {
            opponentsIndex(i, i)
            createMessage("GANASTE")
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
        } else if (playerAttack[i] == "TIERRA" && enemyAttack[i] == "AGUA") {
            opponentsIndex(i, i)
            createMessage("GANASTE")
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
        } else {
            opponentsIndex(i, i)
            createMessage("PERDISTE")
            enemyVictories++
            spanEnemyLives.innerHTML = enemyVictories
        }
        checkVictories()
        console.log(enemyVictories)
        console.log(playerVictories)
    }
}

function checkVictories() {
    if (playerVictories == enemyVictories) {
        createFinalMessage("EMPATE :|")
    } else if (playerVictories > enemyVictories) {
        createFinalMessage("GANASTE :)")
    } else {
        createFinalMessage("PERDISTE :(")
    }
}

function createMessage(resultAttack) {
    let newPlayerAttack = document.createElement("p")
    let newEnemyAttack = document.createElement("p")

    result.innerHTML = resultAttack
    newPlayerAttack.innerHTML = playerAttackIndex
    newEnemyAttack.innerHTML = enemyAttackIndex

    playerAttackSection.appendChild(newPlayerAttack)
    enemyAttackSection.appendChild(newEnemyAttack)
}

function createFinalMessage(resultFinal) {
    sectionMessage.innerHTML = resultFinal
    restart.style.display = "flex"
}

window.addEventListener("load", startGame)