<template>
  <div class="about">

    <canvas id="canvasId">
      <p>您的系统不支持此程序!</p>
    </canvas>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import image from "./../../assets/bg_logo.jpg"

@Component({
  name: 'SecondStep',
})
export default class extends Vue {
  mounted() {

    this.initCanvas()
    // 当调整窗口大小时重绘canvas
    window.onresize = () => {
      this.initCanvas()
    }
  }

  private initCanvas() {
    const canvas = document.getElementById('canvasId') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.addImage(ctx)
  }


  private addImage(ctx: CanvasRenderingContext2D){
    const img = new Image()
    img.src = image
    img.onload = () => {
      const w = img.width
      const h = img.height
      const dw = 300/w          //canvas与图片的宽高比
      const dh = 200/h
      let ratio
      // 裁剪图片中间部分
      if(w > 300 && h > 200 || w < 300 && h < 200){
        if (dw > dh) {
          ctx.drawImage(img, 0, (h - 200/dw)/2, w, 200/dw, 0, 0, 300, 200)
        } else {
          ctx.drawImage(img, (w - 300/dh)/2, 0, 300/dh, h, 0, 0, 300, 200)
        }
      }
      // 拉伸图片
      else{
        if(w < 300){
          ctx.drawImage(img, 0, (h - 200/dw)/2, w, 200/dw, 0, 0, 300, 200)
        }else {
          ctx.drawImage(img, (w - 300/dh)/2, 0, 300/dh, h, 0, 0, 300, 200)
        }
      }
    }
  }


  /**
   * 笑脸
   * */

  private drawSmile(ctx: CanvasRenderingContext2D) {

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false); // 口(顺时针)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
    ctx.stroke();
  }

}
</script>
