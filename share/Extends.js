import $ from "jquery";

$.fn.typewriter = function () {
  this.each(function () {
    let $ele = $(this),
      str = $ele.html(),
      progress = 0;
    $ele.html("");
    const timer = setInterval(function () {
      const current = str.substring(progress, progress + 1);
      if (current == "<") {
        progress = str.indexOf(">", progress) + 1;
      } else {
        progress++;
      }
      $ele.html(str.substring(0, progress) + (progress & 1 ? "_" : ""));
      if (progress >= str.length) {
        clearInterval(timer);
      }
    }, 75);
  });
  return this;
};

export default $;
