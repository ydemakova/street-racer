const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

// background
const background = new Image()
background.src =
	'/Users/yuliademakova/Desktop/street-racer/assets/background.jpg'

// lanes
const laneYs = {
	left: canvas.height - 210,
	right: canvas.height - 170,
}
let laneObstacles = []
const laneImages = [
	'/Users/yuliademakova/Desktop/street-racer/assets/trash.png',
	'/Users/yuliademakova/Desktop/street-racer/assets/boy.png',
	'/Users/yuliademakova/Desktop/street-racer/assets/girl.png',
]

// car
const carImage = '/Users/yuliademakova/Desktop/street-racer/assets/car.png'
const car = new Car(ctx, carImage, 100, canvas.height - 165, 200, 100, laneYs)

let isGameOver = false
let intervalId
let score = 0

function main() {
	// draws
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

	if (isGameOver) {
		cancelAnimationFrame(intervalId)
	} else {
		intervalId = requestAnimationFrame(main)
	}
}

function controlCollition() {
	laneObstacles.forEach((obstacle) => {
		const isBeforeCar = car.x + car.width < obstacle.x + 10
		const isBehindCar = car.x > obstacle.x + 10
		const isWihinCar = !isBeforeCar && !isBehindCar
		if (obstacle.lane === car.lane && isWihinCar) {
			isGameOver = true
		}
		// console.log('isGameOver: ', isGameOver)
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

			if (obstacleCounter % 2 === 0) {
				console.log(obstacleCounter)
				Obstacle.prototype.speed += 1 // TODO: repair!
			}

			console.log(score)
			return false
		}
		return true
	})
}

window.addEventListener('load', () => {
	main()
})
