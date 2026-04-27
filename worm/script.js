import { Circle } from "./circle.js"
import { Lizard } from "./lizard.js"
import { Food } from "./food.js"

const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");

// some silly constants
const EAT_DISTANCE = 30;
const ANGULAR_CONSTRAINT = 90;

// resize the canvas when the window size changes
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// update the mouse position when the mouse moves
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// helper functions or something
function distanceBetween(object1, object2) {
  const dx = object1.x - object2.x
  const dy = object1.y - object2.y
  return Math.hypot(dx, dy);
}

// --------

const leader = new Circle({ x: 0, y: 0, r: 20});
const follower = new Circle({ x: 0, y: 0, r: 24, color: "#fc6", minDistance: 20 });
const follower2 = new Circle({ x: 0, y: 0, r: 24, color: "#fc6", minDistance: 20 });
const tail = new Circle({ x: 0, y: 0, r: 16, color: "#fc6", minDistance: 20 });

const circles = [leader, follower, follower2, tail];
const lizard = new Lizard(mouse, circles)
lizard.addSegment(20, 16, 16);

const food = [];
food.push(new Food(500, 500));


let lastTime = performance.now();

function frame(now) {
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  lizard.move(dt);

  for (const f of food) {
    if (EAT_DISTANCE > distanceBetween(f, leader)) {
      food.splice(food.indexOf(f), 1);
      food.push(new Food(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lizard.draw(ctx);
  for (const f of food) f.draw(ctx);

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
