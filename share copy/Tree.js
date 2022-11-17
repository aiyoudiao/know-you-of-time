import Point from "./Point";
import Seed from "./Seed";
import Footer from "./Footer";
import Branch from "./Branch";
import Bloom from "./Bloom";
import { random, inheart } from "./Tool";

class Tree {
  constructor(canvas, width, height, opt) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.opt = opt || {};

    this.record = {};

    this.initSeed();
    this.initFooter();
    this.initBranch();
    this.initBloom();
  }

  initSeed() {
    var seed = this.opt.seed || {};
    var x = seed.x || this.width / 2;
    var y = seed.y || this.height / 2;
    var point = new Point(x, y);
    var color = seed.color || "#FF0000";
    var scale = seed.scale || 1;

    this.seed = new Seed(this, point, scale, color);
  }

  initFooter() {
    var footer = this.opt.footer || {};
    var width = footer.width || this.width;
    var height = footer.height || 5;
    var speed = footer.speed || 2;
    this.footer = new Footer(this, width, height, speed);
  }

  initBranch() {
    var branches = this.opt.branch || [];
    this.branches = [];
    this.addBranches(branches);
  }

  initBloom() {
    var bloom = this.opt.bloom || {};
    var cache = [],
      num = bloom.num || 500,
      width = bloom.width || this.width,
      height = bloom.height || this.height,
      figure = this.seed.heart.figure;
    var r = 240,
      x,
      y;
    for (let i = 0; i < num; i++) {
      cache.push(this.createBloom(width, height, r, figure));
    }
    this.blooms = [];
    this.bloomsCache = cache;
  }

  toDataURL(type) {
    return this.canvas.toDataURL(type);
  }

  draw(k) {
    var s = this,
      ctx = s.ctx;
    var rec = s.record[k];
    if (!rec) {
      return;
    }
    var point = rec.point,
      image = rec.image;

    ctx.save();
    ctx.putImageData(image, point.x, point.y);
    ctx.restore();
  }

  addBranch(branch) {
    this.branches.push(branch);
  }

  addBranches(branches) {
    var s = this,
      b,
      p1,
      p2,
      p3,
      r,
      l,
      c;
    for (var i = 0; i < branches.length; i++) {
      b = branches[i];
      p1 = new Point(b[0], b[1]);
      p2 = new Point(b[2], b[3]);
      p3 = new Point(b[4], b[5]);
      r = b[6];
      l = b[7];
      c = b[8];
      s.addBranch(new Branch(s, p1, p2, p3, r, l, c));
    }
  }

  removeBranch(branch) {
    var branches = this.branches;
    for (var i = 0; i < branches.length; i++) {
      if (branches[i] === branch) {
        branches.splice(i, 1);
      }
    }
  }

  canGrow() {
    return !!this.branches.length;
  }
  grow() {
    var branches = this.branches;
    for (var i = 0; i < branches.length; i++) {
      var branch = branches[i];
      if (branch) {
        branch.grow();
      }
    }
  }

  addBloom(bloom) {
    this.blooms.push(bloom);
  }

  removeBloom(bloom) {
    var blooms = this.blooms;
    for (var i = 0; i < blooms.length; i++) {
      if (blooms[i] === bloom) {
        blooms.splice(i, 1);
      }
    }
  }

  createBloom(
    width,
    height,
    radius,
    figure,
    color,
    alpha,
    angle,
    scale,
    place,
    speed
  ) {
    var x, y;
    while (true) {
      x = random(20, width - 20);
      y = random(20, height - 20);
      if (inheart(x - width / 2, height - (height - 40) / 2 - y, radius)) {
        return new Bloom(
          this,
          new Point(x, y),
          figure,
          color,
          alpha,
          angle,
          scale,
          place,
          speed
        );
      }
    }
  }

  canFlower() {
    return !!this.blooms.length;
  }
  flower(num) {
    var s = this,
      blooms = s.bloomsCache.splice(0, num);
    for (var i = 0; i < blooms.length; i++) {
      s.addBloom(blooms[i]);
    }
    blooms = s.blooms;
    for (var j = 0; j < blooms.length; j++) {
      blooms[j].flower();
    }
  }

  snapshot(k, x, y, width, height) {
    var ctx = this.ctx;
    var image = ctx.getImageData(x, y, width, height);
    this.record[k] = {
      image: image,
      point: new Point(x, y),
      width: width,
      height: height,
    };
  }
  setSpeed(k, speed) {
    this.record[k || "move"].speed = speed;
  }
  move(k, x, y) {
    var s = this,
      ctx = s.ctx;
    var rec = s.record[k || "move"];
    var point = rec.point,
      image = rec.image,
      speed = rec.speed || 10,
      width = rec.width,
      height = rec.height;

    const i = point.x + speed < x ? point.x + speed : x;
    const j = point.y + speed < y ? point.y + speed : y;

    ctx.save();
    ctx.clearRect(point.x, point.y, width, height);
    ctx.putImageData(image, i, j);
    ctx.restore();

    rec.point = new Point(i, j);
    rec.speed = speed * 0.95;

    if (rec.speed < 2) {
      rec.speed = 2;
    }
    return i < x || j < y;
  }

  jump() {
    var s = this,
      blooms = s.blooms;
    if (blooms.length) {
      for (var i = 0; i < blooms.length; i++) {
        blooms[i].jump();
      }
    }
    if ((blooms.length && blooms.length < 3) || !blooms.length) {
      var bloom = this.opt.bloom || {},
        width = bloom.width || this.width,
        height = bloom.height || this.height,
        figure = this.seed.heart.figure;
      var r = 240,
        x,
        y;
      for (var i = 0; i < random(1, 2); i++) {
        blooms.push(
          this.createBloom(
            width / 2 + width,
            height,
            r,
            figure,
            null,
            1,
            null,
            1,
            new Point(random(-100, 600), 720),
            random(200, 300)
          )
        );
      }
    }
  }
}

export default Tree;
