const btnPet = document.getElementById('btn-pet')
const btnRestart = document.getElementById('btn-restart')
const selectAttack = document.getElementById('select-atack')
const restart = document.getElementById('restart')
const selectPet = document.getElementById('select-pet')
const inputPydos = document.getElementById('pydos')
const spanPlayerPetName = document.getElementById('player-pet-name')
const spanEnemyPetName = document.getElementById('enemy-pet-name')
const result = document.getElementById('result')
const playerAttackSection = document.getElementById('player-attack')
const enemyAttackSection = document.getElementById('enemy-attack')
const sectionMessage = document.getElementById('result')
const spanPlayerLives = document.getElementById('player-lives')
const spanEnemyLives = document.getElementById('enemy-lives')
const containerCards = document.getElementById('container-cards')
const containerAttacks = document.getElementById('container-attacks')
const sectionShowMap = document.getElementById('show-map')
const map = document.getElementById('map')

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
let petPlayerObj
let enemyVictories = 0
let playerVictories = 0
let playerAttack = []
let enemyAttack = []
let buttons = []
let mokepones = []

let lienzo = map.getContext('2d')
let intervalo
let backgroundMap = new Image()
backgroundMap.src = './assets/mokemap.png'

// Clase con todos los atributos por Mokepon
class Mokepon {
    constructor(name, img, lives, x = 50, y = 40) {
        this.name = name
        this.img = img
        this.lives = lives
        this.attacks = []
        this.x = x
        this.y = y
        this.width = 80
        this.height = 80
        this.mapPhoto = new Image()
        this.mapPhoto.src = img
        this.speedX = 0
        this.speedY = 0
    }

    drawMokepon() {
        lienzo.drawImage(
            this.mapPhoto,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}
// Objetos de la clase Mokepon con algunos valores de los atributos
let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5)

let langostelvis = new Mokepon('Langostelvis', './assets/langostelvis.png', 5, 75, 320)
let tucapalma = new Mokepon('Tucapalma', './assets/tucapalma.png', 5, 380, 5)
let pydos = new Mokepon('Pydos', './assets/pydos.png', 5, 300, 230)

hipodoge.attacks.push(
    { name: '💧', id: 'btn-water' },
    { name: '💧', id: 'btn-water' },
    { name: '💧', id: 'btn-water' },
    { name: '🔥', id: 'btn-fire' },
    { name: '🌱', id: 'btn-soil' },
)

capipepo.attacks.push(
    { name: '🌱', id: 'btn-soil' },
    { name: '🌱', id: 'btn-soil' },
    { name: '🌱', id: 'btn-soil' },
    { name: '💧', id: 'btn-water' },
    { name: '🔥', id: 'btn-fire' },
)

ratigueya.attacks.push(
    { name: '🔥', id: 'btn-fire' },
    { name: '🔥', id: 'btn-fire' },
    { name: '🔥', id: 'btn-fire' },
    { name: '💧', id: 'btn-water' },
    { name: '🌱', id: 'btn-soil' },
)
// Se insertan los objetos de la clase Mokepon a un array
mokepones.push(hipodoge, capipepo, ratigueya)
// Se cargan todos los Mokepones del objeto y ocultando las secciones de la página
function startGame() {
    selectAttack.style.display = 'none'
    restart.style.display = 'none'
    sectionShowMap.style.display = 'none'

    mokepones.forEach((mokepon) => {
        mokeponesOptions = `
        <input type='radio' name='pet' id='${mokepon.name}'>
        <label class = 'cardsMokepon' for='${mokepon.name}'>
            <p>${mokepon.name} </p>
            <img src='${mokepon.img}' alt='${mokepon.name}'>
        </label>
        `

        containerCards.innerHTML += mokeponesOptions

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputTucapalma = document.getElementById('Tucapalma')
    })

    btnPet.addEventListener('click', selectPetPlayer)
    btnRestart.addEventListener('click', reload)
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function reload() {
    location.reload()
}

function selectPetPlayer() {
    // selectAttack.style.display = 'flex'
    selectPet.style.display = 'none'

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
        alert('Por favor, selecciona una mascota...')
    }
    intervalo = setInterval(drawCanvas, 50);
    searchMokepon(checkPlayer)
    sectionShowMap.style.display = 'flex'
    startMap()
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
        <button id='${attack.id}' class='btn-attack buttons'>${attack.name}</button>
        `

        containerAttacks.innerHTML += attacksMokepon

        btnFire = document.getElementById('btn-fire')
        btnWater = document.getElementById('btn-water')
        btnSoil = document.getElementById('btn-soil')
        buttons = document.querySelectorAll('.buttons')
    })
}

function attacksSequence() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                playerAttack.push('FUEGO')
                button.style.background = '#777'
                button.disabled = 'true'
                console.log(playerAttack)
            } else if (e.target.textContent === '💧') {
                playerAttack.push('AGUA')
                button.style.background = '#777'
                button.disabled = 'true'
                console.log(playerAttack)
            } else {
                playerAttack.push('TIERRA')
                button.style.background = '#777'
                button.disabled = 'true'
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
}

// RETOOO utilizar los ataques uno a uno del enemigo para ir comparando con el jugador
function enemyAttackRandom() {
    let randomAttack = randomNumber(0, enemyMokeponAttacks.length - 1)

    if (randomAttack == 0 || randomAttack == 1) {
        enemyAttack.push('FUEGO')
    } else if (randomAttack == 3 || randomAttack == 4) {
        enemyAttack.push('AGUA')
    } else {
        enemyAttack.push('TIERRA')
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
            createMessage('EMPATE')
        } else if (playerAttack[i] == 'FUEGO' && enemyAttack[i] == 'TIERRA') {
            opponentsIndex(i, i)
            createMessage('GANASTE')
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
        } else if (playerAttack[i] == 'AGUA' && enemyAttack[i] == 'FUEGO') {
            opponentsIndex(i, i)
            createMessage('GANASTE')
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
        } else if (playerAttack[i] == 'TIERRA' && enemyAttack[i] == 'AGUA') {
            opponentsIndex(i, i)
            createMessage('GANASTE')
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
        } else {
            opponentsIndex(i, i)
            createMessage('PERDISTE')
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
        createFinalMessage('EMPATE :|')
    } else if (playerVictories > enemyVictories) {
        createFinalMessage('GANASTE :)')
    } else {
        createFinalMessage('PERDISTE :(')
    }
}

function createMessage(resultAttack) {
    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    result.innerHTML = resultAttack
    newPlayerAttack.innerHTML = playerAttackIndex
    newEnemyAttack.innerHTML = enemyAttackIndex

    playerAttackSection.appendChild(newPlayerAttack)
    enemyAttackSection.appendChild(newEnemyAttack)
}

function createFinalMessage(resultFinal) {
    sectionMessage.innerHTML = resultFinal
    restart.style.display = 'flex'
}

function drawCanvas() {
    petPlayerObj.x += petPlayerObj.speedX
    petPlayerObj.y += petPlayerObj.speedY
    lienzo.clearRect(0, 0, map.width, map.height)
    lienzo.drawImage(
        backgroundMap, 0, 0, map.width, map.height
    )
    petPlayerObj.drawMokepon()
    langostelvis.drawMokepon()
    pydos.drawMokepon()
    tucapalma.drawMokepon()
    if(
        petPlayerObj.speedX !== 0 ||
        petPlayerObj.speedY !== 0
    ){
        checkCollision(langostelvis)
        checkCollision(pydos)
        checkCollision(tucapalma)
    }
}

function moveRight() {
    petPlayerObj.speedX = 5
}

function moveLeft() {
    petPlayerObj.speedX = -5
}

function moveUp() {
    petPlayerObj.speedY = -5
}

function moveDown() {
    petPlayerObj.speedY = 5
}

function stopMove() {
    petPlayerObj.speedX = 0
    petPlayerObj.speedY = 0
}

function keyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowRight':
            moveRight()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        default:
            break
    }
}

function startMap() {
    map.width = 500
    map.height = 400
    petPlayerObj = getObjPet(checkPlayer);
    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', stopMove)
}

function getObjPet() {
    for (let i = 0; i < mokepones.length; i++) {
        if (checkPlayer === mokepones[i].name) {
            return mokepones[i]
        }
    }
}

function checkCollision(enemy) {
    const topEnemy = enemy.y
    const bottomEnemy = enemy.y + enemy.height
    const rightEnemy = enemy.x + enemy.width
    const leftEnemy = enemy.x

    const topPet = petPlayerObj.y
    const bottomPet = petPlayerObj.y + petPlayerObj.height
    const rightPet = petPlayerObj.x + petPlayerObj.width
    const leftPet = petPlayerObj.x

    if(
        bottomPet < topEnemy ||
        topPet > bottomEnemy ||
        rightPet < leftEnemy ||
        leftPet > rightEnemy
    ){
        return
    }
    stopMove()
    alert("Hay Colisión!!!")
}

window.addEventListener('load', startGame)