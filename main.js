import { getStreamLink, initLiveUI, setStreamSize } from "./helpers.js";

console.log("🐸 who do you know here?");

getStreamLink().then((link) => {
  var player = videojs("surfcam");
  player.src(link);
  player.on("loadeddata", () => {
    console.log("video loaded starting stream");
    player.play();
    initLiveUI();
  });

  setStreamSize(player, window.innerHeight, window.innerWidth);
  window.addEventListener("resize", () => {
    let height = window.innerHeight;
    let width = window.innerWidth;
    setStreamSize(player, height, width);
  });
});
