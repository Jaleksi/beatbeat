const VALID_BEAT_CHARS = "?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

const beatBinaryToChars = (beatBinary) => {
  const binToChar = (bin) => {
      // replace empty char with questionmark
      if (bin === "01111111") {
        return "?";
      }
      return bin.split(" ").map((i) => {
        return String.fromCharCode(parseInt(i, 2)).toString(10);
      }).join("");
    }
    // split binary into 8 characters.
    // where first 2 values are constant "01" to set
    // them into favourable ascii characters.
  let chars = "";
  let charBin = "";
  for (let i = 0; i < beatBinary.length; ++i) {
    charBin += beatBinary[i];
    if (charBin.length === 6) {
      chars += binToChar("01" + charBin);
      charBin = "";
    }
  }

  return chars;
};

const charsToBeats = (chars) => {
  const beats = [];
  const binaryResult = chars.split("").map((char) => {
    return char.charCodeAt().toString(2).slice(1);
  }).join("");

  let trackBeats = [];
  for (let i = 0; i < binaryResult.length; ++i) {
    trackBeats.push(Boolean(Number(binaryResult[i])));
    if (trackBeats.length === 16) {
      beats.push([...trackBeats]);
      trackBeats = [];
    }
  }

  return beats;
};

const validateBeatCharInput = (chars) => {
  if (chars.length !== 8) {
    return false;
  }

  for (let i = 0; i < chars.length; ++i) {
    if (VALID_BEAT_CHARS.indexOf(chars[i]) === -1) {
      return false;
    }
  }

  return true;
};