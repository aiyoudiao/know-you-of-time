import mount from "./share/App";
import "./self.css";

document.querySelector("#app").innerHTML = `
<div id="main">
  <div id="wrap">
    <div id="text">
      <div id="code">
        <span class="say">散发着醉人的浓香</span
        ><br />
        <span class="say">却还隔着深深的栅栏</span
        ><br />
        <span class="say">世间无上的美丽</span><br />
        <span class="say">却还带着扎手的尖刺</span><br />
        <span class="say">多少生命 为她凋零</span><br />
        <span class="say">你这掌管宇宙的女神</span><br />
        <span class="say">陪你闹看你笑</span><br />
        <span class="say">多少梦想 为她点燃</span><br />
        <span class="say">你这主宰万物的魔鬼</span><br />
        <span class="say">毁灭与重生、未来和过去</span><br />
        <span class="say">都逃不过你的手心</span><br />
        <span class="say">你颠覆着善与恶、美和丑</span><br />
        <span class="say">你演绎着人世鼓吹着奋进</span><br />
        <span class="say">你将最美好的撕毁</span><br />
        <span class="say">爱，可以忘记一切</span><br />
        <span class="say">恨，可以消灭一切</span><br />
        <span class="say">玫瑰散发着醉人的浓香</span><br />
        <span class="say">我种下一棵火热的爱情</span><br />
        <span class="say">看她生根发芽开花</span><br />
        <span class="say">玫瑰虽美，却还有凋谢的时候</span><br />
        <br />
        <span class="say"
          ><span class="space"></span> -- 《爱情玫瑰花》</span
        >
      </div>
    </div>
    <div id="clock-box">
      <div id="title"></div>
      <div id="clock"></div>
    </div>
    <canvas id="canvas" width="1100" height="680"></canvas>
  </div>
  <audio src="love.mp3" autoplay="autoplay"></audio>
</div>

`;

window.onload = async () => {
  await mount();
};
