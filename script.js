const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");

// silly constants i guess
const EAT_DISTANCE = 30;

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
function distanceDelta(object1, object2) {
  const dx = object1.x - object2.x
  const dy = object1.y - object2.y
  return Math.hypot(dx, dy);
}

class Circle {
  constructor({ x, y, r = 20, speed = 300, color = "#6cf", target, minDistance = 0 }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;
    this.color = color;
    this.target = target;
    this.minDistance = minDistance;
  }

  move(dt) {
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist <= this.minDistance) return;

    const step = Math.min(this.speed * dt, dist - this.minDistance);
    this.x += (dx / dist) * step;
    this.y += (dy / dist) * step;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Food {
  constructor (x = canvas.x/2, y = canvas.y/2) {
    this.x = x;
    this.y = y;
    food.push(this);
  }

  eat() {
    food.splice(food.indexOf(this), 1);
  }

  draw(ctx) {
    ctx.fillStyle = "#48b55e";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --------

const leader = new Circle({ x: 0, y: 0, target: mouse });
const follower = new Circle({ x: 0, y: 0, r: 16, color: "#fc6", target: leader, minDistance: 40 });
const follower2 = new Circle({ x: 0, y: 0, r: 16, color: "#fc6", target: follower, minDistance: 36 });
const tail = new Circle({ x: 0, y: 0, r: 12, color: "#fc6", target: follower2, minDistance: 32 });

const circles = [leader, follower, follower2, tail];

const food = [];
const firstFood = new Food(500, 500);


let lastTime = performance.now();

function frame(now) {
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  for (const c of circles) c.move(dt);

  for (const f of food) {
    if (EAT_DISTANCE > distanceDelta(f, leader)) {
      f.eat();
      //const tail = new Circle({ x: circles.at(-1).x, y: circles.at(-1).y, r: 12, color: "#fc6", target: circles.at(-1), minDistance: 28 });
      //circles.push(tail);
      //#  this was fun but i dont need it anymore

      const newFood = new Food(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const c of circles) c.draw(ctx);
  for (const f of food) f.draw(ctx);

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
