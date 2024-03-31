import { streamLinks } from "./links.js";

console.log("hi :)");

var validStreamLink;

// get a valid stream link
for (const [site, links] of Object.entries(streamLinks)) {
  if (validStreamLink != undefined) {
    break;
  }
  for (const link of links) {
    if (checkStreamLink(link)) {
      validStreamLink = link;
      console.log(`Using ${site} : ${link}`);
      break;
    }
  }
}

let width = window.innerWidth;
let height = window.innerHeight;

var player = videojs("surfcam");
player.src(validStreamLink);
player.on("loadeddata", () => {
  console.log("video loaded");

  player.play();
  showLiveTag();
});

updateStreamDims(width, height);

window.addEventListener("resize", (event) => {
  let width = event.target.innerWidth;
  let height = event.target.innerHeight;
  updateStreamDims(width, height);
});

function setStreamSize(width, height) {
  if (player == undefined) {
    return;
  }
  var surfcam = document.getElementById("surfcam");
  var streamTag = document.getElementById("streamTag");
  //   console.log(width / height > 16 / 9);

  var top;
  var left;

  // portrait
  if (width / height < 16 / 9) {
    // console.log("portrait");
    top = 0;
    let streamWidth = (height * 16) / 9;
    left = 0.5 * (width - streamWidth);

    left = Math.ceil(left);
    streamWidth = Math.ceil(streamWidth);

    surfcam.style.top = `${top}px`;
    surfcam.style.left = `${left}px`;
    player.width(`${streamWidth}px`);
    player.height(`${height}px`);
  }

  // landscape
  else {
    // console.log("landscape");
    left = 0;
    let streamHeight = (width * 9) / 16;
    top = (1 / 2) * (height - streamHeight);

    top = Math.ceil(top);
    streamHeight = Math.ceil(streamHeight);

    player.width(`${width}px`);
    player.height(`${streamHeight}px`);
    surfcam.style.top = `${top}px`;
    surfcam.style.left = `${left}px`;
  }

  if (width / height < 1) {
    streamTag.style.right = "";
  } else {
    streamTag.style.right = "0px";
  }
}

function updateStreamDims(width, height) {
  setStreamSize(width, height);
}

function showLiveTag() {
  var liveIcon = document.querySelector("#liveIcon");
  liveIcon.classList.remove("hidden");
}

// function debug(text) {
//   debugElement = document.getElementById("debug");
//   debugElement.innerText = text;
// }

async function checkStreamLink(streamLink) {
  const resp = await fetch(streamLink, { method: "HEAD" });
  return resp.ok;
}
