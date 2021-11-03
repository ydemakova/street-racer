const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

// background
const background = new Image()
background.src = '../assets/background.jpg'

// lanes
const laneYs = {
	left: canvas.height - 210,
	right: canvas.height - 170,
}
let laneObstacles = []
const laneImages = [
	'../assets/trash.png',
	'../assets/boy.png',
	'../assets/girl.png',
]

const audios = {
	crash: new Audio('../assets/crash.wav'),
	breaking: new Audio('../assets/breaking.wav'),
}

// car
const carImage = '../assets/car.png'
const car = new Car(ctx, carImage, 100, canvas.height - 165, 200, 100, laneYs)

let isGameRunning = false
let isGameOver = false
let intervalId
let score = 0
showScore(score)

function main() {
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

	laneObstacles
		.filter((obstacle) => obstacle.lane === 'left')
		.forEach((obstacle) => obstacle.draw())
	car.draw()
	laneObstacles
		.filter((obstacle) => obstacle.lane === 'right')
		.forEach((obstacle) => obstacle.draw())

	addObstacle()
	controlCollition()
	removeObstacles()
	intervalId = requestAnimationFrame(main)

	if (!isGameRunning) {
		return cancelAnimationFrame(intervalId)
	}
}

function controlCollition() {
	laneObstacles.forEach((obstacle) => {
		const isBeforeCar = car.x + car.width < obstacle.x + 10
		const isBehindCar = car.x > obstacle.x + 10
		const isWihinCar = !isBeforeCar && !isBehindCar

		if (obstacle.lane === car.lane && isWihinCar) {
			gameOver()
		} else if (car.x + car.width === obstacle.x) {
			new Audio('../assets/passing-by.wav').play()
		}
	})
}

function addObstacle(lane) {
	lane = lane || randomNumber(0, 1) === 0 ? 'left' : 'right'

	if (laneObstacles.length > 0) {
		const lastObstacle = laneObstacles[laneObstacles.length - 1]
		const lastObstacleX = lastObstacle.x
		const randomCardWidthMult =
			lastObstacle.randomCarWidthsToNext * car.width
		const randomDistanceFull = lastObstacleX + randomCardWidthMult

		if (randomDistanceFull > canvas.width) {
			return
		}
	}

	const randomImg = laneImages[randomNumber(0, laneImages.length - 1)]
	const obstacle = new Obstacle(
		ctx,
		randomImg,
		canvas.width - 100,
		0,
		80,
		100,
		laneYs,
	)
	laneObstacles.push(obstacle)
}

let obstacleCounter = 0
function removeObstacles() {
	laneObstacles = laneObstacles.filter((obstacle) => {
		if (obstacle.x + obstacle.width < 0) {
			score += obstacle.speed
			obstacleCounter++
			showScore(score)
			return false
		}
		return true
	})
}

function showScore(score) {
	document.getElementById('actual-score').innerText = score
}

function gameOver() {
	isGameRunning = false
	document.body.classList.add('game-over')
	document.getElementById('final-score').innerText = score
	audios.crash.play()
}

window.addEventListener('load', () => {
	main()

	const startButton = document.getElementById('start-button')
	startButton.addEventListener('click', () => {
		new Audio('../assets/texasradiofish_-_Rockin_Joe.mp3').play()
		new Audio('../assets/ignition.wav').play()
		document.body.classList.add('running')
		isGameRunning = true
		main()
	})
})
