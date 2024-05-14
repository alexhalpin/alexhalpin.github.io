import { streamLinks } from "./links.js";

export function setPlayerSize(player) {
  let { height, width, top, left } = getStreamSize();

  player.height(height);
  player.width(width);

  // console.log("S: ", height, width);
  // console.log("P: ", player.height(), player.width());
}

export function setTagPosition() {
  var streamTag = document.getElementById("streamTag");

  if (window.innerWidth < window.innerHeight) {
    streamTag.style.right = "";
  } else {
    streamTag.style.right = "0px";
  }
}

export function getStreamSize() {
  let height = window.innerHeight;
  let width = window.innerWidth;

  // var top, left;
  var streamHeight, streamWidth;

  // portrait
  if (width / height < 16 / 9) {
    // console.log("portrait");
    streamHeight = height;
    streamWidth = Math.ceil((16 / 9) * height);

    // top = 0;
    // left = Math.ceil(0.5 * (width - streamWidth));
  }

  // landscape
  else {
    // console.log("landscape");
    streamHeight = Math.ceil((9 / 16) * width);
    streamWidth = width;

    // top = Math.ceil(0.5 * (height - streamHeight));
    // left = 0;
  }

  return {
    height: streamHeight,
    width: streamWidth,
    // top: top,
    // left: left,
  };
}

export async function getStreamLink() {
  for (const [site, links] of Object.entries(streamLinks)) {
    for (const link of links) {
      if (await checkStreamLink(link)) {
        console.log(`using ${site} : ${link}`);
        return link;
      }
    }
  }
  return null;
}

async function checkStreamLink(streamLink) {
  const resp = await fetch(streamLink, { method: "HEAD" });
  return resp.ok;
}

export function initLiveUI() {
  var liveIcon = document.querySelector("#liveIcon");
  liveIcon.classList.remove("hidden");

  var poster = document.getElementById("poster");
  poster.style.opacity = 0;
}
