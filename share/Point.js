class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  add(o) {
    const p = this.clone();
    p.x += o.x;
    p.y += o.y;
    return p;
  }

  sub(o) {
    const p = this.clone();
    p.x -= o.x;
    p.y -= o.y;
    return p;
  }

  div(n) {
    const p = this.clone();
    p.x /= n;
    p.y /= n;
    return p;
  }

  mul(n) {
    const p = this.clone();
    p.x *= n;
    p.y *= n;
    return p;
  }
}

export default Point;
