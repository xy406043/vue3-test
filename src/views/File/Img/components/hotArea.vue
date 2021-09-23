<template>
  <div class="hot" @mouseup.left.stop="changeStop()">
    <div class="container">
      <!-- 展示图形 -->
      <img
        id="hotareaindex"
        ref="hotareaImg"
        class="show-image"
        :src="pa.img"
        ondragstart="return false;"
        oncontextmenu="return false;"
        onselect="document.selection.empty();"
        @load="caculateImg"
        alt=""
        @mousedown.left.stop="mouseDown($event)"
      />

      <!-- 当前绘制的热区 -->
      <div
        v-show="pa.caseShow"
        class="area"
        :style="{ width: pa.areaWidth + 'px', height: pa.areaHeight + 'px', left: pa.starX + 'px', top: pa.starY + 'px' }"
      />

      <!-- 已有的热区 -->
      <AreaBox
        v-for="(item, index) in pa.areaData"
        :id="index"
        :key="index"
        :index="index"
        :isChoose="pa.chooseIndex == index"
        :areaData="pa.areaData"
        :minRect="pa.minRect"
        :limitHeight="pa.imgHeight"
        :limitWidth="pa.imgWidth"
        :area-init="item"
        @DelAreaBox="DelAreaBox"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import AreaBox from './areaBox.vue'
import { checkHasInteraction } from '../helpers/utils'

// const props = defineProps({})
// TODO 解决本页面的 typescript报错
const pa = reactive<any>({
  img: 'https://easystock.oss-cn-hangzhou.aliyuncs.com/db9c89b7f4064d9ebb2673580a41a400.png',
  minRect: [44, 44],
  starX: 0,
  starY: 0,
  star1X: 0,
  star1Y: 0,
  areaWidth: 0,
  areaHeight: 0,
  caseShow: false,
  chooseIndex: null,
  nowImgWidth: null,
  areaData: [],
  imgWidth: 0,
  imgHeight: 0
})

const hotareaImg = ref<any>(null)

onMounted(() => {
  pa.areaData = [
    {
      starX: 60,
      starY: 60,
      areaWidth: 200,
      areaHeight: 100,
      jumpType: '1',
      jumpAppId: '',
      jumpTarget: ''
    }
  ]
})

// 计算图片宽高
const caculateImg = () => {
  if (hotareaImg.value) {
    pa.imgWidth = hotareaImg.value?.width
    pa.imgHeight = hotareaImg.value?.height
  }
}

//  绘制热区开始
const mouseDown = (e: any) => {
  const { imgWidth, imgHeight } = pa
  const { clientX: baseX, clientY: baseY } = e
  pa.caseShow = true
  // 记录滑动的初始值
  pa.starX = e.layerX
  pa.starY = e.layerY
  pa.star1X = e.clientX
  pa.star1Y = e.clientY

  // 鼠标滑动的过程
  if (!document.onmousemove) {
    document.onmousemove = ev => {
      const { clientX, clientY } = ev
      // console.log('ev', clientX, clientY, clientX - baseX + pa.starX, clientY - baseY + pa.starY)
      // 触碰其它热区
      const areaWidthSub = ev.clientX - pa.star1X
      const areaHeightSub = ev.clientY - pa.star1Y

      // !?  加入以下代码后 ev 的layer、offset 属性基准 变成starX.Y 了，只能变更为使用clientX进行计算
      const checkIntersection = checkHasInteraction(pa, ev, pa.starX, pa.starY, areaWidthSub, areaHeightSub)
      if (checkIntersection) {
        console.log('%c 新热区创建-触及其他元素', 'color: #c9780c', ev)
        changeStop()
        return
      }

      // 超过背景区域
      if (clientX - baseX + pa.starX > imgWidth || clientY - baseY + pa.starY > imgHeight) {
        console.log('新热区创建-超过图片区域', ev)
        changeStop()
        return
      }
      pa.areaWidth = areaWidthSub
      pa.areaHeight = areaHeightSub
    }
  }
}

// 绘制热区结束
const changeStop = () => {
  document.onmousemove = null
  const { minRect } = pa
  if (pa.caseShow && pa.areaWidth > minRect[0] / 2 && pa.areaHeight > minRect[1] / 2) {
    const data = {
      starX: pa.starX,
      starY: pa.starY,
      areaWidth: pa.areaWidth,
      areaHeight: pa.areaHeight,
      jumpType: '1', // 热区图不支持配置不跳转
      jumpAppId: '',
      jumpTarget: ''
    }
    pa.areaData.push(data)
  }
  // 初始化绘图
  pa.caseShow = false
  pa.starX = 0
  pa.starY = 0
  pa.areaWidth = 0
  pa.areaHeight = 0
}

const DelAreaBox = (index: number) => {
  pa.areaData.splice(index, 1)
}
</script>

<style lang="less" scoped>
.hot {
  position: relative;
  user-select: none;

  .container {
    position: relative;
    overflow: hidden;
  }
  .show-image {
    width: 375px;
    display: block;
  }
  img {
    cursor: crosshair;
  }
  .area {
    position: absolute;
    width: 200px;
    height: 200px;
    left: 200px;
    top: 300px;
    background: rgba(#2980b9, 0.3);
    border: 1px dashed #5e5b34;
  }
}
</style>
