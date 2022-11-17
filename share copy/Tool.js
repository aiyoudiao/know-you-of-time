const random = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const bezier = (cp, t) => {
  var p1 = cp[0].mul((1 - t) * (1 - t));
  var p2 = cp[1].mul(2 * t * (1 - t));
  var p3 = cp[2].mul(t * t);
  return p1.add(p2).add(p3);
};

const inheart = (x, y, r) => {
  // x^2+(y-(x^2)^(1/3))^2 = 1
  // http://www.wolframalpha.com/input/?i=x%5E2%2B%28y-%28x%5E2%29%5E%281%2F3%29%29%5E2+%3D+1
  const z =
    ((x / r) * (x / r) + (y / r) * (y / r) - 1) *
      ((x / r) * (x / r) + (y / r) * (y / r) - 1) *
      ((x / r) * (x / r) + (y / r) * (y / r) - 1) -
    (x / r) * (x / r) * (y / r) * (y / r) * (y / r);

  return z < 0;
};

const timeElapse = (date) => {
  var current = Date();
  var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
  var days = Math.floor(seconds / (3600 * 24));
  seconds = seconds % (3600 * 24);
  var hours = Math.floor(seconds / 3600);
  if (hours < 10) {
    hours = "0" + hours;
  }
  seconds = seconds % 3600;
  var minutes = Math.floor(seconds / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  seconds = seconds % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var result =
    '第 <span class="digit">' +
    days +
    '</span> 天 <span class="digit">' +
    hours +
    '</span> 小时 <span class="digit">' +
    minutes +
    '</span> 分钟 <span class="digit">' +
    seconds +
    "</span> 秒";
  $("#clock").html(result);
};

export { random, bezier, inheart, timeElapse };
