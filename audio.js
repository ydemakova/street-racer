class GameAudio {
	constructor(fileName, volume = 0.1) {
		const src = `./assets/${fileName}`
		this.audio = new Audio(src)
		this.audio.volume = volume
	}

	play() {
		this.audio.play()
	}

	stop() {
		this.audio.pause()
	}
}
