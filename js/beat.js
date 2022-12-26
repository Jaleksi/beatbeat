const createBeat = () => {
  const htmlElement = document.createElement("div");
  htmlElement.className = "beatButton";

  const binaryInput = document.getElementById("beatBinaryInput");
  const beatChangeEvent = new Event("beatsChanged");
  let toggled = false;


  htmlElement.addEventListener("click", () => {
    if (toggled) {
      htmlElement.classList.remove("toggledBeat");
      toggled = false;
    } else {
      htmlElement.classList.add("toggledBeat");
      toggled = true;
    }
    binaryInput.dispatchEvent(beatChangeEvent);
  });


  return Object.assign(htmlElement, {
    highlight() {
      htmlElement.classList.add("highlightedBeat");
    },

    unhighlight() {
      htmlElement.classList.remove("highlightedBeat");
    },

    isToggled() {
      return toggled;
    },

    untoggle() {
      toggled = false;
      htmlElement.classList.remove("toggledBeat");
    },

    setToggle(value) {
      toggled = value;
      if (toggled) {
        htmlElement.classList.add("toggledBeat");
      } else {
        htmlElement.classList.remove("toggledBeat");
      }
    },
  });
};