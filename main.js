document.addEventListener("DOMContentLoaded", () => {
  // Canvas Init
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("Canvas");
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

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
  document.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  });

  // Reset Button
  const resetButton = document.getElementById("Reset");
  resetButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Drawing functions
  function drawStroke(event) {
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
  }

  function startStroke(event) {
    if (hoveringButton) return;
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
    document.addEventListener("mousemove", drawStroke);
  }

  // Drawing Event Listeners
  document.addEventListener("mousedown", startStroke);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", drawStroke);
  });
});
