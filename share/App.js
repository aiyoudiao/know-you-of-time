import Tree from "./Tree";
import { timeOut, timeElapse, $ } from "./Tool";

class App {
  constructor() {
    const $win = $(window);
    const clientWidth = $win.width();
    const clientHeight = $win.height();

    $(window).on("resize", function () {
      var newWidth = $win.width();
      var newHeight = $win.height();
      if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
      }
    });
  }

  async mount() {
    var canvas = $("#canvas");

    if (!canvas[0].getContext) {
      $("#error").show();
      return false;
    }

    var width = canvas.width();
    var height = canvas.height();

    canvas.attr("width", width);
    canvas.attr("height", height);

    var opts = {
      seed: {
        x: width / 2 - 20,
        color: "rgb(190, 26, 37)",
        scale: 2,
      },
      branch: [
        [
          535,
          680,
          570,
          250,
          500,
          200,
          30,
          100,
          [
            [
              540,
              500,
              455,
              417,
              340,
              400,
              13,
              100,
              [[450, 435, 434, 430, 394, 395, 2, 40]],
            ],
            [
              550,
              445,
              600,
              356,
              680,
              345,
              12,
              100,
              [[578, 400, 648, 409, 661, 426, 3, 80]],
            ],
            [539, 281, 537, 248, 534, 217, 3, 40],
            [
              546,
              397,
              413,
              247,
              328,
              244,
              9,
              80,
              [
                [427, 286, 383, 253, 371, 205, 2, 40],
                [498, 345, 435, 315, 395, 330, 4, 60],
              ],
            ],
            [
              546,
              357,
              608,
              252,
              678,
              221,
              6,
              100,
              [[590, 293, 646, 277, 648, 271, 2, 80]],
            ],
          ],
        ],
      ],
      bloom: {
        num: 700,
        width: 1080,
        height: 650,
      },
      footer: {
        width: 1200,
        height: 5,
        speed: 10,
      },
    };

    var tree = new Tree(canvas[0], width, height, opts);
    var seed = tree.seed;
    var foot = tree.footer;
    var hold = 1;

    canvas
      .on("click", function (e) {
        var offset = canvas.offset(),
          x,
          y;
        x = e.pageX - offset.left;
        y = e.pageY - offset.top;
        if (seed.hover(x, y)) {
          hold = 0;
          canvas.off("click");
          canvas.off("mousemove");
          canvas.removeClass("hand");
        }
      })
      .on("mousemove", function (e) {
        var offset = canvas.offset(),
          x,
          y;
        x = e.pageX - offset.left;
        y = e.pageY - offset.top;
        canvas.toggleClass("hand", seed.hover(x, y));
      });

    const seedAnimate = async () => {
      seed.draw();

      await timeOut(10, () => hold);

      await timeOut(
        10,
        () => seed.canScale(),
        () => {
          seed.scale(0.95);
        }
      );

      await timeOut(
        10,
        () => seed.canMove(),
        () => {
          seed.move(0, 2);
          foot.draw();
        }
      );
    };

    const growAnimate = async () => {
      tree.grow();
      await timeOut(
        10,
        () => tree.canGrow(),
        () => {
          tree.grow();
        }
      );
    };

    const flowAnimate = async () => {
      tree.flower(2);
      await timeOut(
        10,
        () => tree.canFlower(),
        () => {
          tree.flower(2);
        }
      );
    };

    const moveAnimate = async () => {
      tree.snapshot("p1", 240, 0, 610, 680);
      await timeOut(
        10,
        () => tree.move("p1", 500, 0),
        () => {
          foot.draw();
        }
      );

      foot.draw();
      tree.snapshot("p2", 500, 0, 610, 680);
      // 会有闪烁不得意这样做, (＞﹏＜)
      canvas
        .parent()
        .css("background", "url(" + tree.toDataURL("image/png") + ")");
      canvas.css("background", "#fee6ec");
      await timeOut(300);
      canvas.css("background", "none");
    };

    let jumpNowTime = 0,
      jumpLastTime = Date.now(),
      jumpOutTime = 500;
    const jumpAnimate = () => {
      //   setInterval(() => {
      //     tree.ctx.clearRect(0, 0, width, height);
      //     tree.jump();
      //     foot.draw();
      //   }, 1000);
      jumpNowTime = Date.now();
      if (jumpNowTime - jumpLastTime > jumpOutTime) {
        tree.ctx.clearRect(0, 0, width, height);
        tree.jump();
        foot.draw();
      }

      requestAnimationFrame(jumpAnimate);
    };

    const textAnimate = () => {
      const together = new Date();
      together.setFullYear(2022, 7, 5);
      together.setHours(14);
      together.setMinutes(36);
      together.setSeconds(0);
      together.setMilliseconds(0);

      $("#code").show().typewriter();
      $("#clock-box").fadeIn(500);
      //   setInterval(async () => {
      //     await timeElapse(together);
      //   }, 1000);
      //   timeElapse(together);
      //   requestAnimationFrame(jumpAnimate);
      let nowTime = 0,
        lastTime = Date.now(),
        outTime = 500;
      const timeShow = () => {
        nowTime = Date.now();
        if (nowTime - lastTime > outTime) {
          timeElapse(together);
        }
        requestAnimationFrame(timeShow);
      };
      timeShow();
    };

    // await seedAnimate();
    await growAnimate();
    // console.log("x");
    await flowAnimate();
    await moveAnimate();
    jumpAnimate();
    textAnimate();
  }
}

export default async () => {
  const app = new App();
  await app.mount();
};
