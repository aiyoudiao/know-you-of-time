import Heart from "./Heart";

class Seed {
  constructor(tree, point, scale = 1, color = "#FF0000") {
    this.tree = tree;

    this.heart = {
      point: point,
      scale: scale,
      color: color,
      figure: new Heart(),
    };

    this.circle = {
      point: point,
      scale: scale,
      color: color,
      radius: 5,
    };
  }

  draw() {
    this.drawHeart();
    this.drawText();
  }
  addPosition(x, y) {
    this.circle.point = this.circle.point.add(new Point(x, y));
  }
  canMove() {
    return this.circle.point.y < this.tree.height + 20;
  }
  move(x, y) {
    this.clear();
    this.drawCircle();
    this.addPosition(x, y);
  }
  canScale() {
    return this.heart.scale > 0.2;
  }
  setHeartScale(scale) {
    this.heart.scale *= scale;
  }
  scale(scale) {
    this.clear();
    this.drawCircle();
    this.drawHeart();
    this.setHeartScale(scale);
  }
  drawHeart() {
    const ctx = this.tree.ctx,
      heart = this.heart;
    const point = heart.point,
      color = heart.color,
      scale = heart.scale;
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(point.x, point.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let i = 0; i < heart.figure.length; i++) {
      const p = heart.figure.get(i, scale);
      ctx.lineTo(p.x, -p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  drawCircle() {
    const ctx = this.tree.ctx,
      circle = this.circle;
    const point = circle.point,
      color = circle.color,
      scale = circle.scale,
      radius = circle.radius;
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(point.x, point.y);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  drawText() {
    const ctx = this.tree.ctx,
      heart = this.heart;
    const point = heart.point,
      color = heart.color,
      scale = heart.scale;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(point.x, point.y);
    ctx.scale(scale, scale);
    ctx.moveTo(0, 0);
    ctx.lineTo(15, 15);
    ctx.lineTo(60, 15);
    ctx.stroke();

    ctx.moveTo(0, 0);
    ctx.scale(0.75, 0.75);
    ctx.font = "12px 微软雅黑,Verdana"; // 字号肿么没有用? (ˉ(∞)ˉ)
    ctx.fillText("click here", 23, 16);
    ctx.restore();
  }
  clear() {
    const ctx = this.tree.ctx,
      circle = this.circle;
    const point = circle.point,
      scale = circle.scale,
      radius = 26;
    const h = radius * scale;
    const w = h;
    ctx.clearRect(point.x - w, point.y - h, 4 * w, 4 * h);
  }
  hover(x, y) {
    const ctx = this.tree.ctx;
    const pixel = ctx.getImageData(x, y, 1, 1);
    return pixel.data[3] == 255;
  }
}

export default Seed;
