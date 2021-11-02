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

addObstacle()
addObstacle()

function main() {
	// draws
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
	car.draw()
	laneObstacles.left.forEach((obstacle) => obstacle.draw())
	laneObstacles.right.forEach((obstacle) => obstacle.draw())

	if (
		laneObstacles.left[laneObstacles.left.length - 1].x + 2 * car.width <
		canvas.width
	) {
		addObstacle('left')
	}

	if (isGameOver) {
		cancelAnimationFrame(intervalId)
	} else {
		intervalId = requestAnimationFrame(main)
	}
}

function addObstacle(lane) {
	lane = lane || randomNumber(0, 1) === 0 ? 'left' : 'right'
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
