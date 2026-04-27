export class Food {
  constructor (x = canvas.x/2, y = canvas.y/2) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.fillStyle = "#48b55e";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}