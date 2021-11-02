const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

// background
const background = new Image()
background.src =
	'/Users/yuliademakova/Desktop/street-racer/assets/background.jpg'

// car
const carImage = '/Users/yuliademakova/Desktop/street-racer/assets/car.png'
const car = new Car(ctx, carImage, 100, canvas.height - 165, 200, 100)

// lanes
const laneYs = {
	left: canvas.height - 210,
	right: canvas.height - 170,
}
const laneObstacles = {
	left: [],
	right: [],
}
const laneImages = [
	'/Users/yuliademakova/Desktop/street-racer/assets/trash.png',
	'/Users/yuliademakova/Desktop/street-racer/assets/boy.png',
	'/Users/yuliademakova/Desktop/street-racer/assets/girl.png',
]

let isGameOver = false
let intervalId

function main() {
	// draws
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
	laneObstacles.left.forEach((obstacle) => obstacle.draw())
	car.draw()
	laneObstacles.right.forEach((obstacle) => obstacle.draw())

	addObstacle()
	controlCollition()

	if (isGameOver) {
		cancelAnimationFrame(intervalId)
	} else {
		intervalId = requestAnimationFrame(main)
	}
}

function controlCollition() {
	laneObstacles.left.forEach((obstacle) => {
		if (car.x + car.width > obstacle.x + 10) {
			isGameOver = true
		}
	})
}

function addObstacle(lane) {
	lane = lane || randomNumber(0, 1) === 0 ? 'left' : 'right'

	if (laneObstacles[lane].length > 0) {
		const lastObstacle = laneObstacles[lane][laneObstacles[lane].length - 1]
		const lastObstacleX = lastObstacle.x
		const randomCardWidthMult =
			lastObstacle.randomCarWidthsToNext * car.width
		const randomDistanceFull = lastObstacleX + randomCardWidthMult

		if (randomDistanceFull > canvas.width) {
			return
		}
	}

	const laneY = laneYs[lane]
	const randomImg = laneImages[randomNumber(0, laneImages.length - 1)]
	const obstacle = new Obstacle(
		ctx,
		randomImg,
		canvas.width - 100,
		laneY,
		80,
		100,
	)
	laneObstacles[lane].push(obstacle)
}

function removeObstacle() {}

window.addEventListener('load', () => {
	main()
})
