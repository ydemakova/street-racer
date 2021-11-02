const OBSTACLE_TYPES = ['trash', 'boy', 'girl']

class Obstacle extends Item {
	speed = 1

	constructor(ctx, imageSrc, x, y, width, height) {
		super(ctx, imageSrc, x, y, width, height)

		const randomIndex = randomNumber(0, OBSTACLE_TYPES.length - 1)
		this.type = OBSTACLE_TYPES[randomIndex]
	}

	move() {
		this.x -= this.speed
	}

	draw() {
		this.move()
		super.draw()
	}
}
