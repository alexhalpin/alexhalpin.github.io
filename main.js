var player;
window.addEventListener("load", (event) => {
  let width = event.currentTarget.innerWidth;
  let height = event.currentTarget.innerHeight;

  player = videojs("surfcam");
  updateDims(width, height);
});

window.addEventListener("resize", (event) => {
  let width = event.target.innerWidth;
  let height = event.target.innerHeight;
  updateDims(width, height);
});

window.addEventListener("click", (event) => {
  player.play();
});

function setStreamSize(width, height) {
  if (player == undefined) {
    return;
  }
  surfcam = document.getElementById("surfcam");
  //   console.log(width / height > 16 / 9);

  var top;
  var left;

  // portrait
  if (width / height < 16 / 9) {
    console.log("portrait");
    top = 0;
    let streamWidth = (height * 16) / 9;
    left = 0.5 * (width - streamWidth);
    // left = 0;

    left = Math.ceil(left);
    streamWidth = Math.ceil(streamWidth);

    surfcam.style.top = `${top}px`;
    surfcam.style.left = `${left}px`;
    player.width(`${streamWidth}px`);
    player.height(`${height}px`);
  }

  // landscape
  else {
    console.log("landscape");
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
}

function setNameSize(width, height) {
  nameElement = document.getElementById("name");
  nameElement.style.fontSize = `${0.035 * height}px`;
}

function updateDims(width, height) {
  setStreamSize(width, height);
  setNameSize(width, height);
}

// function debug(bruh) {
//   debugElement = document.getElementById("debug");
//   debugElement.innerText = bruh;
// }
