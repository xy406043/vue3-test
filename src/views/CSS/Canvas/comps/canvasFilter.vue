<template>
  <a-button class="mb-10px" type="primary" @click="changeImg">切换图片</a-button>
  <a-radio-group name="radiogroup" :default-value="filterType" @change="filterChange" class="mb-10px">
    <a-radio v-for="(value, key) in TypesZnOptions" :key="value" :value="value">
      {{ value }}
    </a-radio>
  </a-radio-group>
  <canvas id="my-canvas"></canvas>
</template>

<script setup lang="ts">
// canvas 滤镜效果
import { ref, reactive, onMounted } from 'vue'
import { Types, TypesZn, imgList } from '../types/filter'

let filterType = ref<string>('默认')
let chooseImgIndex = ref<number>(0)
let TypesZnOptions = reactive(TypesZn)
let imageList = reactive<Array<string>>(imgList)

onMounted(() => {
  dealWidthCanvas()
})

const changeImg = () => {
  let length = imageList.length
  chooseImgIndex.value = chooseImgIndex.value + 1 >= length ? 0 : chooseImgIndex.value + 1
  dealWidthCanvas()
}

const filterChange = (el: any) => {
  filterType.value = el.target.value
  dealWidthCanvas()
}

const dealWidthCanvas = () => {
  let myCanvas = <any>document.getElementById('my-canvas')
  let cxt = myCanvas.getContext('2d')
  const natuImage = new Image()

  natuImage.src = imageList[chooseImgIndex.value]
  natuImage.crossOrigin = 'anonymous'
  natuImage.onload = (ev: any) => {
    let { height: oh, width: ow } = ev.path[0]
    let width = 200
    let height = (width * oh) / ow

    natuImage.width = width
    natuImage.height = height
    myCanvas.width = width
    myCanvas.height = height
    cxt.clearRect(0, 0, width, height)
    cxt.drawImage(natuImage, 0, 0, width, height)
    // 获取canvas图像的 像素数据 unit8ClampedArray  width * height * 4    (r,g,b,a)
    let imageData = cxt.getImageData(0, 0, width, height).data
    tryDealType(imageData, cxt, width, height)
  }
}

const tryDealType = (imageData: any, cxt: any, width: number, height: number) => {
  switch (filterType.value) {
    // 线条
    case TypesZn.LINE:
      tryBlackWhite(imageData, cxt, width, height)
      break

    // 毛玻璃
    case TypesZn.GROUPCLASS:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number) => {
        let rand = Math.floor(Math.random() * 10) % 5 // 最后这个参数越大，效果越离谱
        let key2 = idx + rand * 4 * (width + 1)
        let s = {
          r: imageData[key2] || 0,
          g: imageData[key2 + 1] || 0,
          b: imageData[key2 + 2] || 0
        }
        return s
      })
      break

    // 连环画
    case TypesZn.PICTURESTORY:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number) => {
        return {
          r: (Math.abs(g - b + g + r) * r) / 256,
          g: (Math.abs(b - g + b + r) * r) / 256,
          b: (Math.abs(b - g + b + r) * g) / 256
        }
      })
      break

    // 浮雕滤镜 凹（基于当前像素的前一个像素RGB 值与它的后一个像素的RGB之差再加上128）
    case TypesZn.RELIEVO:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number, bidx: number, aidx: number) => {
        // 把相邻像素的同个通道进行差值运算，再加上中性灰的色值
        r = Math.abs(imageData[bidx] - imageData[idx] + 128)
        g = Math.abs(imageData[bidx + 1] - imageData[idx + 1] + 128)
        b = Math.abs(imageData[bidx + 2] - imageData[idx + 2] + 128)
        // 把结果通道的值进行求和并按券平均作为最终通道的值
        let val = r * 0.3 + g * 0.59 + b * 0.11
        return {
          r: val,
          g: val,
          b: val
        }
      })
      break

    // 雕刻滤镜 凸（基于当前像素的后一个像素RGB 值与它的前一个像素的RGB之差再加上128）
    case TypesZn.SCULPTURE:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number, bidx: number, aidx: number) => {
        // 把相邻像素的同个通道进行差值运算，再加上中性灰的色值
        r = Math.abs(imageData[aidx] - imageData[idx] + 128)
        g = Math.abs(imageData[aidx + 1] - imageData[idx + 1] + 128)
        b = Math.abs(imageData[aidx + 2] - imageData[idx + 2] + 128)
        // 把结果通道的值进行求和并按券平均作为最终通道的值
        let val = r * 0.3 + g * 0.59 + b * 0.11
        return {
          r: val,
          g: val,
          b: val
        }
      })
      break

    // 灰色
    case TypesZn.GRAYL:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number) => {
        // let average = (r + g + b) / 3
        let average = r * 0.312 + g * 0.654 + b * 0.12
        return {
          r: average,
          g: average,
          b: average
        }
      })
      break

    //怀旧
    case TypesZn.REMINISCENCE:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number) => {
        r = 0.393 * r + 0.769 * g + 0.19 * b
        b = 0.349 * r + 0.686 * g + 0.168 * b
        b = 0.327 * r + 0.534 * g + 0.131 * b
        return {
          r: r < 0 ? 0 : r > 255 ? 255 : r,
          g: g < 0 ? 0 : g > 255 ? 255 : g,
          b: b < 0 ? 0 : b > 255 ? 255 : b
        }
      })
      break

    // 黑白
    case TypesZn.BW:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number) => {
        let calcGray = 0.299 * r + 0.587 * g + 0.114 * b
        return {
          r: calcGray > 100 ? 255 : 0,
          g: calcGray > 100 ? 255 : 0,
          b: calcGray > 100 ? 255 : 0
        }
      })
      break

    // 底片
    case TypesZn.FILM:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number) => {
        return {
          r: 255 - r,
          g: 255 - g,
          b: 255 - b
        }
      })
      break

    // 明亮度
    case TypesZn.BRIGHTNESS:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number) => {
        let br = 50
        return {
          r: br + r > 255 ? 255 : br + r < 0 ? 0 : br + r,
          g: br + g > 255 ? 255 : br + g < 0 ? 0 : br + g,
          b: br + g > 255 ? 255 : br + g < 0 ? 0 : br + g
        }
      })
      break

    // 熔铸
    case TypesZn.FUSE:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number) => {
        return {
          r: (r * 128) / (g + b + 1),
          g: (g * 128) / (r + b + 2),
          b: (b * 128) / (g + r + 3)
        }
      })
      break

    // 冰冻
    case TypesZn.FROZEN:
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number) => {
        return {
          // r: ((r - g - b) * 3) / 2,
          // g: ((g - r - b) * 3) / 2,
          // b: ((b - g - r) * 3) / 2
          r: ((r - g - b) * 3) / 1,
          g: ((g - r - b) * 3) / 2,
          b: ((b - g - r) * 3) / 3
        }
      })
      break

    // TODO 高斯滤镜
    case TypesZn.BLUR:
      // https://www.cnblogs.com/fsjohnhuang/p/4127888.html#a2
      // http://www.ruanyifeng.com/blog/2012/11/gaussian_blur.html
      loopData(imageData, cxt, width, height, (r: number, g: number, b: number, midx: number, idx: number) => {})
      break

    // 默认
    case 'init':
    default:
      //   let some = cxt.getImageData(0, 0, width, height)
      //   cxt.putImageData(some, 0, 0)
      break
  }
}

// 处理点绘滤镜
// canvas 从左到右、从右到扫描 图片，复绘为黑白图片
// 颜色值突变 or 解决黑色  绘制为黑色
// 源：   https://juejin.cn/post/7010548756487602183#comment
// 参考： https://segmentfault.com/a/1190000011880686
const tryBlackWhite = (imageData: any, cxt: any, width: number, height: number) => {
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

// 通用滤镜处理方法
const loopData = (imageData: any, cxt: any, width: number, height: number, fn: any) => {
  let output = cxt.createImageData(width, height)
  for (let h = 0; h < height; h += 1) {
    for (let w = 0; w < width; w += 1) {
      let idx = (width * h + w) * 4 // 当前索引
      let bidx = (width * h + (w - 1 < 0 ? 0 : w - 1)) * 4 // 前一个索引
      let aidx = (width * h + (w + 1 > width ? width : w + 1)) * 4 // 后一个索引
      let midx = (width * h + (width - w)) * 4 // 跟当前镜像位置索引

      let r = imageData[idx]
      let g = imageData[idx + 1]
      let b = imageData[idx + 2]

      let D = fn(r, g, b, midx, idx, bidx, aidx)

      output.data[idx] = D.r
      output.data[idx + 1] = D.g
      output.data[idx + 2] = D.b
      output.data[idx + 3] = 255

      // gif 图可能需要， 不放置gift图
      // switch (filterType.value) {
      //   case TypesZn.GRAYL:
      //   case TypesZn.FUSE:
      //   // case TypesZn.FROZEN:
      //   case TypesZn.REMINISCENCE:
      //   case TypesZn.GROUPCLASS:
      //     // 透明度应该根据 rgb 进行 额外处理
      //     output.data[idx + 3] = D.r + D.g + D.b == 0 ? 0 : 255
      // }
    }
  }
  cxt.clearRect(0, 0, width, height)
  cxt.putImageData(output, 0, 0)
}
</script>

<style lang="ts"></style>
