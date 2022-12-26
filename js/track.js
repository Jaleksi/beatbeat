const createTrack = (iconPath, soundPath, beatCount) => {
  const beats = [];
  const htmlElement = document.createElement("div");
  const sound = new Howl({
    src: [soundPath],
    volume: 0.5,
  });
  htmlElement.className = "track";

  // add icon
  const iconElement = document.createElement("img");
  iconElement.src = iconPath;
  iconElement.className = "trackIcon";
  htmlElement.appendChild(iconElement);



  for (let i = 0; i < beatCount; ++i) {
    const beat = createBeat();
    beats.push(beat);
    htmlElement.appendChild(beat);
  }


  return Object.assign(htmlElement, {
    playBeat(beatIndex) {
      if (beatIndex < 0 || beatIndex > beats.length - 1) {
        return;
      }
      if (beats[beatIndex].isToggled()) {
        sound.play();
      }
      beats[beatIndex].highlight();
    },

    muteBeat(beatIndex) {
      if (beatIndex < 0 || beatIndex > beats.length - 1) {
        return;
      }
      beats[beatIndex].unhighlight();
    },

    unhighlightAll() {
      beats.forEach((beat) => {
        beat.unhighlight();
      });
    },

    clear() {
      beats.forEach((beat) => {
        beat.untoggle();
      });
    },

    setBeats(binBeats) {
      // assumes 16 beats
      for (let i = 0; i < binBeats.length; ++i) {
        beats[i].setToggle(binBeats[i]);
      }
    },

    asBinary() {
      let binaryString = "";
      beats.forEach((beat) => {
        binaryString += Number(beat.isToggled()).toString();
      });
      return binaryString;
    },
  });
};