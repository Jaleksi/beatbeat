const main = () => {
  const player = createPlayer();
  const controls = createControls(player);
};

const createPlayer = () => {
  const htmlElement = document.getElementById("playerContainer");
  const beatCount = 16; // 4, 8 or 16
  const tracks = [
    createTrack(
      "./assets/icons/snare.png",
      "./assets/sounds/snare.wav",
      beatCount,
    ),
    createTrack(
      "./assets/icons/kick.png",
      "./assets/sounds/kick.wav",
      beatCount,
    ),
    createTrack(
      "./assets/icons/hihat.png",
      "./assets/sounds/hihat.wav",
      beatCount,
    ),
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

      currentBeatIndex = currentBeatIndex === beatCount - 1 ?
        0 :
        currentBeatIndex + 1;

      tracks.forEach((track) => {
        track.playBeat(currentBeatIndex);
      });
    },

    stop() {
      tracks.forEach((track) => {
        track.unhighlightAll();
      });
      currentBeatIndex = -1;
    },

    clearTracks() {
      tracks.forEach((track) => {
        track.clear();
      });
    },

    getTracksAsBinary() {
      return tracks.map(t => t.asBinary()).flat().join("");
    },

    setTracksFromBinary(tracksBeats) {
      // assumes 3 tracks with 16 beats
      for (let i = 0; i < tracksBeats.length; ++i) {
        tracks[i].setBeats(tracksBeats[i]);
      }
    },

    getBeatCount() {
      return beatCount;
    },
  });
};



const createControls = (player) => {
  const beatLength = 200;
  let tickInterval = null;
  // PdNeiJVd
  const binaryInput = document.getElementById("beatBinaryInput");
  binaryInput.addEventListener("beatsChanged", () => {
    binaryInput.value = beatBinaryToChars(player.getTracksAsBinary());
  });
  binaryInput.addEventListener("input", () => {
    if (validateBeatCharInput(binaryInput.value)) {
      const beatBinary = charsToBeats(binaryInput.value);
      player.setTracksFromBinary(beatBinary);
    }
  });

  const playButton = document.getElementById("playButton");
  playButton.addEventListener("click", () => {
    if (!tickInterval) {
      playButton.innerHTML = "◼";
      tickInterval = setInterval(player.play, beatLength);
    } else {
      clearInterval(tickInterval);
      tickInterval = null;
      player.stop();
      playButton.innerHTML = "▶";

    }
  });

  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", () => {
    player.clearTracks();
    binaryInput.dispatchEvent(new Event("beatsChanged"));
  });

  return {
    binaryInput,
    playButton,
    clearButton,
  };
};


window.onload = main();