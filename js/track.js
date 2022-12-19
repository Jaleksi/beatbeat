const createTrack = (beatColor) => {
	const count = 4;
	const beats = [];
	const htmlElement = document.createElement("div");
	htmlElement.className = "track"


	for (let i = 0; i < count; ++i) {
		const beat = createBeat(beatColor);
		beats.push(beat);
		htmlElement.appendChild(beat);
	}

	
	return Object.assign(htmlElement, {
		playBeat(beatIndex) {
			if (beatIndex < 0 || beatIndex > beats.length -1) {
				return;
			}
			beats[beatIndex].play();
		},

		muteBeat(beatIndex) {
			if (beatIndex < 0 || beatIndex > beats.length -1) {
				return;
			}
			beats[beatIndex].mute();
		},

		muteAll() {
			beats.forEach((beat) => {
				beat.mute();
			});
		}
	});
};