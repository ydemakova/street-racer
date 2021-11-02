const OBSTACLE_TYPES = ['trash', 'boy', 'girl']

class Obstacle extends Item {
	constructor() {
		super()
		const randomIndex = this.randomNumber(0, OBSTACLE_TYPES.length - 1)
		this.type = OBSTACLE_TYPES[randomIndex]
	}

	randomNumber(fromNumber, toNumber) {
		return Math.round(Math.random() * (toNumber - fromNumber)) + fromNumber
	}
}
