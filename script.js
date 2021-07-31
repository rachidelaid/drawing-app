const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

function resizeWindow() {
  c.width = document.querySelector(".canvasWrap").clientWidth;
  c.height = document.querySelector(".canvasWrap").clientHeight;
}
resizeWindow();

const DefaultPos = { x: 0, y: 0 };
let colour = "black";
let stroke = 1;

window.addEventListener("resize", resizeWindow);

document
  .querySelector("input[type='number']")
  .addEventListener("input", (e) => (stroke = parseInt(e.target.value)));

document.querySelector("#incr").addEventListener("click", () => {
  if (stroke == 20) {
    return;
  }
  stroke++;
  document.querySelector("input[type='number']").value = stroke;
});
document.querySelector("#decr").addEventListener("click", () => {
  if (stroke == 1) {
    return;
  }
  stroke--;
  document.querySelector("input[type='number']").value = stroke;
});

document
  .querySelector("input[type='color']")
  .addEventListener("input", (e) => (colour = e.target.value));

c.addEventListener("mousemove", ev_canvas, false);
c.addEventListener("mouseup", (e) => {
  DefaultPos.x = 0;
  DefaultPos.y = 0;
});
c.addEventListener("mousedown", (e) => {
  DefaultPos.x =
    e.clientX - 0.031 * document.querySelector(".canvasWrap").clientWidth;
  DefaultPos.y =
    e.clientY - 0.0166 * document.querySelector(".canvasWrap").clientHeight;
});

function ev_canvas(e) {
  if (DefaultPos.x == 0 || DefaultPos.y == 0) {
    return;
  }

  ctx.beginPath(DefaultPos.x, DefaultPos.y);
  ctx.lineWidth = stroke;
  ctx.lineCap = "round";
  ctx.strokeStyle = colour;

  ctx.moveTo(DefaultPos.x, DefaultPos.y);
  DefaultPos.x =
    e.clientX - 0.031 * document.querySelector(".canvasWrap").clientWidth;
  DefaultPos.y =
    e.clientY - 0.0166 * document.querySelector(".canvasWrap").clientHeight;
  ctx.lineTo(DefaultPos.x, DefaultPos.y);

  ctx.stroke();
}

document.querySelector("#save").addEventListener("click", () => {
  let html = " ";
  html += "<img src='" + c.toDataURL() + "' alt='from canvas'/>";
  const pageStyle = "<style>body{margin:0; padding: 0;}</style>";
  const tab = window.open();
  tab.document.write(html + pageStyle);
});

document.querySelector("#clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();
  ctx.rect(0, 0, c.width, c.height);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
});
