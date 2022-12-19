const main = () => {
	const player = createPlayer();
	const controls = createControls(player);
};

const createPlayer = () => {
	const htmlElement = document.getElementById("playerContainer");
	const tracks = [
		createTrack("green"),
		createTrack("cyan"),
		createTrack("orange"),
	];

	tracks.forEach((track) => {
		htmlElement.appendChild(track);
	});

	let currentBeatIndex = -1;

	return Object.assign(htmlElement, {
		play() {
			tracks.forEach((track) => {
				track.muteBeat(currentBeatIndex);
			});

			currentBeatIndex = currentBeatIndex === tracks.length
				? 0
				: currentBeatIndex + 1;

			tracks.forEach((track) => {
				track.playBeat(currentBeatIndex);
			});
		},

		stop() {
			tracks.forEach((track) => {
				track.muteAll();
			});
			currentBeatIndex = -1;
		},
	});
};



const createControls = (player) => {
	const beatLength = 706; // 85bpm
	let tickInterval = null;

	const playButton = document.getElementById("playButton");
	playButton.addEventListener("click", () => {
		if (!tickInterval) {
			tickInterval = setInterval(player.play, beatLength);
		} else {
			clearInterval(tickInterval);
			tickInterval = null;
			player.stop();
		}
	})
};



window.onload = main();