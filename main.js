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

  document.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  });

  function drawStroke(event) {
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
  }

  function startStroke(event) {
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
    document.addEventListener("mousemove", drawStroke);
  }

  document.addEventListener("mousedown", startStroke);

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", drawStroke);
  });
});
