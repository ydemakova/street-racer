const OBSTACLE_TYPES = ['trash', 'boy', 'girl']
const LANES = ['left', 'right']

class Obstacle extends Item {
	speed = 5

	constructor(ctx, imageSrc, x, y, width, height, laneYs) {
		super(ctx, imageSrc, x, y, width, height, laneYs)

		const randomIndex = randomNumber(0, OBSTACLE_TYPES.length - 1)
		this.type = OBSTACLE_TYPES[randomIndex]
		this.lane = LANES[randomNumber(0, 1)]
		this.y = this.laneYs[this.lane]
		this.randomCarWidthsToNext = randomNumber(3, 4)
	}

	move() {
		this.x -= this.speed
	}

	draw() {
		this.move()
		super.draw()
	}
}
