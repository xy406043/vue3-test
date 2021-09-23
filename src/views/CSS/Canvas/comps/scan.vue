<template>
  <canvas id="my-canvas"></canvas>
</template>

<script setup lang="ts">
// canvas 从左到右、从右到扫描 图片，复绘为黑白图片   
// 颜色值突变 or 解决黑色  绘制为黑色
// 源： https://juejin.cn/post/7010548756487602183#comment
import { onMounted } from 'vue'

onMounted(() => {
  let myCanvas = <any>document.getElementById('my-canvas')
  let cxt = myCanvas.getContext('2d')
  const natuImage = new Image()
  natuImage.src = 'https://easystock.oss-cn-hangzhou.aliyuncs.com/4810250c47fb4772a76bef45015dc355.jpeg'
  natuImage.crossOrigin ="anonymous"
  natuImage.onload = (ev: any) => {
    let { height, width } = ev.path[0]
    natuImage.width = width
    natuImage.height = height
    myCanvas.width = width
    myCanvas.height = height
    cxt.drawImage(natuImage, 0, 0)
    let imageData = cxt.getImageData(0, 0, width, height).data
    cxt.fillStyle = '#ffffff'
    cxt.fillRect(0, 0, width, height)
    let currentR, currentG, currentB
    for (let h = 0; h < height; h += 1) {
      for (let w = 0; w < width; w += 1) {
        let position = (width * h + w) * 4
        let r = imageData[position],
          g = imageData[position + 1],
          b = imageData[position + 2],
          a = imageData[position + 3]
        if (Math.abs(r + g + b - (currentR + currentG + currentB)) > 65 || r + g + b < 95) {
          cxt.fillStyle = `rgba(0, 0, 0, 1)`
          cxt.fillRect(w, h, 1, 1)
        }
        currentR = r
        currentG = g
        currentB = b
      }
    }
    for (let w = 0; w < width; w += 1) {
      for (let h = 0; h < height; h += 1) {
        let position = (width * h + w) * 4
        let r = imageData[position],
          g = imageData[position + 1],
          b = imageData[position + 2],
          a = imageData[position + 3]
        if (Math.abs(r + g + b - (currentR + currentG + currentB)) > 65 || r + g + b < 95) {
          cxt.fillStyle = `rgba(0, 0, 0, 1)`
          cxt.fillRect(w, h, 1, 1)
        }
        currentR = r
        currentG = g
        currentB = b
      }
    }
  }
})
</script>

<style lang="ts"></style>
