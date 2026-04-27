export class Circle {
  constructor({ x, y, r = 20, color = "#6cf", minDistance = 0 }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.minDistance = minDistance;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}