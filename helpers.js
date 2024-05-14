import { streamLinks } from "./links.js";

export function setStreamSize(player, height, width) {
  if (player == undefined) {
    return;
  }

  var surfcam = document.getElementById("surfcam");
  var streamTag = document.getElementById("streamTag");
  var poster = document.getElementById("poster");
  //   console.log(width / height > 16 / 9);

  var top, left;
  var streamHeight, streamWidth;

  // portrait
  if (width / height < 16 / 9) {
    // console.log("portrait");
    streamHeight = height;
    streamWidth = Math.ceil((height * 16) / 9);

    top = 0;
    left = Math.ceil(0.5 * (width - streamWidth));
  }

  // landscape
  else {
    // console.log("landscape");
    streamHeight = Math.ceil((width * 9) / 16);
    streamWidth = width;

    top = Math.ceil((1 / 2) * (height - streamHeight));
    left = 0;
  }

  player.height(`${streamHeight}px`);
  player.width(`${streamWidth}px`);

  surfcam.style.top = `${top}px`;
  surfcam.style.left = `${left}px`;

  poster.style.height = `${streamHeight}px`;
  poster.style.width = `${streamWidth}px`;
  poster.style.top = `${top}px`;
  poster.style.left = `${left}px`;

  if (width / height < 1) {
    streamTag.style.right = "";
  } else {
    streamTag.style.right = "0px";
  }
}

export async function getStreamLink() {
  // get a valid stream link
  let validStreamLink;
  for (const [site, links] of Object.entries(streamLinks)) {
    if (validStreamLink != undefined) {
      break;
    }
    for (const link of links) {
      if (await checkStreamLink(link)) {
        validStreamLink = link;
        console.log(`using ${site} : ${link}`);
        break;
      }
    }
  }

  return validStreamLink;
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
