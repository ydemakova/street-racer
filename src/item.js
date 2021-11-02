class Item {
	image = new Image()

	constructor(ctx, imageSrc, x, y, width, height) {
		this.ctx = ctx
		this.image.src = imageSrc

		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}

	draw() {
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
	}

	update() {
		this.draw()
	}
}

function randomNumber(fromNumber, toNumber) {
	return Math.round(Math.random() * (toNumber - fromNumber)) + fromNumber
}
