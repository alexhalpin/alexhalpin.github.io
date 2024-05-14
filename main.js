import {
  getStreamLink,
  initLiveUI,
  setTagPosition,
  setPlayerSize,
} from "./helpers.js";

console.log("🐸 who do you know here?");

setTagPosition();
window.addEventListener("resize", () => {
  setTagPosition();
});

getStreamLink().then((link) => {
  if (link == null) {
    console.error("no valid stream link found");
    return;
  }

  let player = videojs("surfcam");
  player.src(link);
  player.on("loadeddata", () => {
    console.log("video loaded starting stream");
    player.play();
    initLiveUI();
  });

  setPlayerSize(player);
  window.addEventListener("resize", () => {
    setPlayerSize(player);
  });
});
