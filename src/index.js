const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const background = new Image()
const carImage = new Image()

background.src =
	'/Users/yuliademakova/Desktop/street-racer/assets/background.jpg'
carImage.src = '/Users/yuliademakova/Desktop/street-racer/assets/car.png'

function main() {
	const lanes = {
		right: canvas.height - 130,
		left: canvas.height - 200,
	}
	const car = new Car(100, canvas.height - 165, 200, 100)

	ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
	ctx.drawImage(carImage, car.x, car.y, car.width, car.height)
}

window.addEventListener('load', () => main())
