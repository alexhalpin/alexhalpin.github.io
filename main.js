document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("Canvas");
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  function resizeCanvas() {
    tmp = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.putImageData(tmp, 0, 0);
  }

  const guide = document.getElementById("Guide");

  // Show Guide
  function showGuide() {
    guide.style.color = "rgb(74, 74, 74)";
  }
  guideRevealTimer = setTimeout(showGuide, 3000);

  //Remove Guide
  function removeGuide() {
    clearTimeout(guideRevealTimer);
    guide.style.color = "black";
  }

  // Prevent on Clickable click
  document.querySelectorAll(".Clickable").forEach((element) => {
    element.addEventListener("mouseover", () => {
      document.removeEventListener("mousedown", startStroke);
    });
    element.addEventListener("mouseleave", () => {
      document.addEventListener("mousedown", startStroke);
    });
  });

  // Resize Canvas
  window.addEventListener("resize", resizeCanvas);

  // Reset Button
  const resetButton = document.getElementById("Reset");
  resetButton.addEventListener("click", () => {
    guideRevealTimer = setTimeout(showGuide, 5000);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resetButton.style.display = "none";
  });

  // Drawing functions
  function drawStroke(event) {
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
  }

  function startStroke(event) {
    removeGuide();
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
    resetButton.style.display = "flex";
    document.addEventListener("mousemove", drawStroke);
  }

  // Drawing Event Listeners
  document.addEventListener("mousedown", startStroke);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", drawStroke);
  });
});
