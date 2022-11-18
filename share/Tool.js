import $ from "./Extends";

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

const i_and_you_title = `小胖胖和大宝贝相识的`;
const i_and_you_colors = [
  "rgb(0, 255, 25)",
  "rgb(0, 255, 143)",
  "rgb(0, 250, 255)",
  "rgb(0, 132, 255)",
  "rgb(0, 14, 255)",
  "rgb(103, 0, 255)",
  "rgb(221, 0, 255)",
  "rgb(255, 0, 171)",
  "rgb(255, 0, 53)",
  "rgb(255, 64, 0)",
  "rgb(255, 182, 0)",
  "rgb(210, 255, 0)",
  "rgb(93, 255, 0)",
];

const know_you_of_time_colors = [
  "rgb(255, 153, 0)",
  "rgb(255, 205, 0)",
  "rgb(252, 255, 0)",
  "rgb(199, 255, 0)",
  "rgb(146, 255, 0)",
  "rgb(94, 255, 0)",
  "rgb(41, 255, 0)",
  "rgb(0, 255, 12)",
  "rgb(0, 255, 65)",
  "rgb(0, 255, 117)",
  "rgb(0, 255, 170)",
  "rgb(0, 255, 223)",
  "rgb(0, 234, 255)",
  "rgb(0, 182, 255)",
  "rgb(0, 129, 255)",
  "rgb(0, 76, 255)",
  "rgb(0, 23, 255)",
  "rgb(29, 0, 255)",
  "rgb(82, 0, 255)",
  "rgb(135, 0, 255)",
  "rgb(188, 0, 255)",
  "rgb(240, 0, 255)",
  "rgb(255, 0, 217)",
  "rgb(255, 0, 164)",
  "rgb(255, 0, 111)",
  "rgb(255, 0, 59)",
  "rgb(255, 0, 6)",
  "rgb(255, 47, 0)",
  "rgb(255, 100, 0)",
];

let title = "";
const createTitle = () => {
  if (title) return title;

  const result = i_and_you_title
    .split("")
    .map((content, index) => {
      return `<span style="color: ${i_and_you_colors[index]}">${content}</span>`;
    })
    .join("");

  title = result;
  // title = i_and_you_title;
  // const result = title;
  return result;
};

const createTime = (date) => {
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

  let result = `第${days}天${hours}小时${minutes}分钟${seconds}秒`;
  result = result
    .split("")
    .map((content, index) => {
      return `<span style="color: ${know_you_of_time_colors[index]}">${content}</span>`;
    })
    .join("");

  return result;
};

const timeElapse = (date) => {
  let time = createTime(date);
  time = time.replace(/>\s*?(\d{1})\s*?</g, (...[, $1]) => {
    return `><span class="digit">${$1}</span><`;
  });
  $("#clock").html(time);

  const title = createTitle();
  $("#title").html(title);
};

// const timeElapse = (date) => {
//   var current = Date();
//   var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
//   var days = Math.floor(seconds / (3600 * 24));
//   seconds = seconds % (3600 * 24);
//   var hours = Math.floor(seconds / 3600);
//   if (hours < 10) {
//     hours = "0" + hours;
//   }
//   seconds = seconds % 3600;
//   var minutes = Math.floor(seconds / 60);
//   if (minutes < 10) {
//     minutes = "0" + minutes;
//   }
//   seconds = seconds % 60;
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }
//   var result =
//     '第 <span class="digit">' +
//     days +
//     '</span> 天 <span class="digit">' +
//     hours +
//     '</span> 小时 <span class="digit">' +
//     minutes +
//     '</span> 分钟 <span class="digit">' +
//     seconds +
//     "</span> 秒";
//   $("#clock").html(result);
//   const title = createTitle();
//   $("#title").html(title);
// };

const timeOut = async (time, condition, action) =>
  new Promise((r, j) => {
    let timer = setInterval(() => {
      try {
        const result = condition && condition();
        if (!result) {
          clearInterval(timer);
          r();
        } else {
          action && action();
        }
      } catch (error) {
        j(error);
      }
    }, time);
  });

export { random, bezier, inheart, timeElapse, timeOut, $ };
