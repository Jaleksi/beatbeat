const createBeat = (color) => {
	const htmlElement = document.createElement("div");
	htmlElement.className = "beatButton";
	htmlElement.style.backgroundColor = color;
	let toggled = false;


	htmlElement.addEventListener("click", () => {
		if (toggled) {
			htmlElement.classList.remove("toggledBeat");
			toggled = false;
		} else {
			htmlElement.classList.add("toggledBeat");
			toggled = true;
		}
	});



	return Object.assign(htmlElement, {
		play() {
			htmlElement.classList.add("highlightedBeat");
		},

		mute() {
			htmlElement.classList.remove("highlightedBeat");
		},
	});
};