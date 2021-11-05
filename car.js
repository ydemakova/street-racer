class Car extends Item {
	lane = 'right'

	constructor(ctx, imageSrc, x, y, width, height, laneYs) {
		super(ctx, imageSrc, x, y, width, height, laneYs)
		this.listenToTheEvent()
	}

	switchLane() {
		if (this.lane === 'right') {
			this.lane = 'left'
			this.y = this.laneYs.left
		} else {
			this.lane = 'right'
			this.y = this.laneYs.right
		}
	}

	listenToTheEvent() {
		document.addEventListener('keydown', (event) => {
			if (event.code === 'spacebar' || event.code === 'Space') {
				this.switchLane()
				new GameAudio('breaking.wav').play()
			}
		})
	}
}
