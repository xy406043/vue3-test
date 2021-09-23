<template>
  <div>
    <button @click="toReset" class="test-btn">重置</button>
    <div class="container">
      <img id="image" alt="" />
    </div>
    <div class="log"></div>
  </div>
</template>

<!-- 以鼠标位置为中心实现滚轮展示图片 -->
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// TODO wheel 的scale 变化 会根据原位置进行变化， html只图片没有问题。此处由header并且会滚动，则不行

// 获取dom
let container = <any>document.querySelector('.container')
let image = <any>document.getElementById('image')
let log = <any>document.querySelector('.log')
let outer = <any>document.getElementsByClassName('ant-layout-content ant-pro-basicLayout-content ant-pro-basicLayout-has-header')[0]

// 全局变量
let result: any,
  x: number,
  y: number,
  scale = 1,
  isPointerdown = false, // 按下标识
  point = { x: 0, y: 0 }, // 第一个点坐标
  diff = { x: 0, y: 0 }, // 相对于上一次pointermove移动差值
  lastPointermove = { x: 0, y: 0 } // 用于计算diff

onMounted(() => {
  container = <any>document.querySelector('.container')
  image = <any>document.getElementById('image')
  log = <any>document.querySelector('.log')
  outer = <any>document.getElementsByClassName('ant-layout-content ant-pro-basicLayout-content ant-pro-basicLayout-has-header')[0]

  loadImage()
})

const toReset = () => {
  loadImage()
}

const loadImage = () => {
  // 图片加载完成后再绑定事件
  image.addEventListener('load', function () {
    console.log('sasa', outer)
    result = getImgSize(image.naturalWidth, image.naturalHeight, window.innerWidth, window.innerHeight)
    image.style.width = result.width + 'px'
    image.style.height = result.height + 'px'
    // x = (window.innerWidth - result.width) * 0.5
    // y = (window.innerHeight - result.height) * 0.5
    x = 0
    y = 0
    image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(1)'

    // 拖拽查看
    drag()
    // 滚轮缩放
    wheelZoom()
  })
  image.src = 'https://easystock.oss-cn-hangzhou.aliyuncs.com/4810250c47fb4772a76bef45015dc355.jpeg'
}
/**
 * 获取图片缩放尺寸
 * @param {number} naturalWidth
 * @param {number} naturalHeight
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @returns
 */
function getImgSize(naturalWidth: number, naturalHeight: number, maxWidth: number, maxHeight: number) {
  const imgRatio = naturalWidth / naturalHeight
  const maxRatio = maxWidth / maxHeight
  let width, height
  // 如果图片实际宽高比例 >= 显示宽高比例
  if (imgRatio >= maxRatio) {
    if (naturalWidth > maxWidth) {
      width = maxWidth
      height = (maxWidth / naturalWidth) * naturalHeight
    } else {
      width = naturalWidth
      height = naturalHeight
    }
  } else {
    if (naturalHeight > maxHeight) {
      width = (maxHeight / naturalHeight) * naturalWidth
      height = maxHeight
    } else {
      width = naturalWidth
      height = naturalHeight
    }
  }
  return { width: width / 3, height: height / 3 }
}

// 拖拽查看
const drag = () => {
  // 绑定 pointerdown
  image.addEventListener('pointerdown', function (e: any) {
    isPointerdown = true
    image.setPointerCapture(e.pointerId)
    point = { x: e.clientX, y: e.clientY }
    lastPointermove = { x: e.clientX, y: e.clientY }
  })
  // 绑定 pointermove
  image.addEventListener('pointermove', function (e: any) {
    if (isPointerdown) {
      const current1 = { x: e.clientX, y: e.clientY }
      diff.x = current1.x - lastPointermove.x
      diff.y = current1.y - lastPointermove.y
      lastPointermove = { x: current1.x, y: current1.y }
      x += diff.x
      y += diff.y
      image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ')'
      log.innerHTML = `x = ${x.toFixed(0)}<br>y = ${y.toFixed(0)}<br>scale = ${scale.toFixed(5)}`
    }
    e.preventDefault()
  })
  // 绑定 pointerup
  image.addEventListener('pointerup', function (e: any) {
    if (isPointerdown) {
      isPointerdown = false
    }
  })
  // 绑定 pointercancel
  image.addEventListener('pointercancel', function (e: any) {
    if (isPointerdown) {
      isPointerdown = false
    }
  })
}

// 滚轮缩放
const wheelZoom = () => {
  container.addEventListener('wheel', function (e: any) {
    console.log('wheel Change', e)
    let ratio = 1.1
    // 缩小
    if (e.deltaY > 0) {
      ratio = 0.9
    }
    // 目标元素是img说明鼠标在img上，以鼠标位置为缩放中心，否则默认以图片中心点为缩放中心
    if (e.target.tagName === 'IMG') {
      //  ?? 原来是 clientX 但是由于有header产生异常；转变为offsetX 后，只有一开始可以；后来就不行了,使用layerX 则可以
      // 计算偏移量  -- 相当于中心点发生变化 -- 需保证是以鼠标位置为缩放中心，无论原图位置在哪里，抽离出数学函数方法
      // todo 这个偏移值怎么就能够对上的？？
      x -= (ratio - 1) * (e.layerX - x - result.width / 2)
      y -= (ratio - 1) * (e.layerY - y - result.height / 2)
    }
    scale *= ratio
    image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ')'
    // log.innerHTML = `x = ${x.toFixed(0)}<br>y = ${y.toFixed(0)}<br>scale = ${scale.toFixed(5)}`
    e.preventDefault()
  })
}
</script>

<style lang="less">
.test-btn {
  position: absolute;
}
</style>
