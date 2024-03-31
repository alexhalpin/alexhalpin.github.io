import { getStreamLink, initLiveUI, setStreamSize } from "./helpers.js";

console.log("🐸");

var player = videojs("surfcam");
player.src(getStreamLink());
player.on("loadeddata", () => {
  console.log("video loaded");

  player.play();
  initLiveUI();
});

setStreamSize(player, window.innerHeight, window.innerWidth);
window.addEventListener("resize", () => {
  let height = window.innerHeight;
  let width = window.innerWidth;
  setStreamSize(player, height, width);
});
