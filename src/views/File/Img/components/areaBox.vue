<template>
  <div
    :class="`areaBox ${isChoose ? 'areaBox-selected' : ''}`"
    :style="{
      width: areaInit.areaWidth + 'px',
      height: areaInit.areaHeight + 'px',
      left: areaInit.starX + 'px',
      top: areaInit.starY + 'px'
    }"
    @mousedown.left.stop="mouseDown($event)"
    @mouseup.left.stop="mouseUp()"
  >
    <!-- // 左上数字标记 -->
    <div class="number">{{ index + 1 }}</div>
    <!-- // 右上删除点 -->
    <DeleteTwoTone class="del" @click.stop="del()" />

    <!-- // 左上形变点 -->
    <div class="shape shape0" @mousedown.left.stop="shapeDown($event, 0, 0)" @mouseup.left.stop="mouseUp()" />
    <!-- // 右上形变点 -->
    <div class="shape shape1" @mousedown.left.stop="shapeDown($event, 1, 0)" @mouseup.left.stop="mouseUp()" />
    <!-- // 右下形变点 -->
    <div class="shape shape2" @mousedown.left.stop="shapeDown($event, 1, 1)" @mouseup.left.stop="mouseUp()" />
    <!-- // 左下形变点 -->
    <div class="shape shape3" @mousedown.left.stop="shapeDown($event, 0, 1)" @mouseup.left.stop="mouseUp()" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps } from 'vue'
import { checkHasInteraction } from '../helpers/utils'
import useCurrentInstance from '@/hooks/useCurrentInstance'

const { globalProperties: global, proxy: ctx } = useCurrentInstance()

const props = defineProps({
  areaInit: {
    type: Object,
    default: () => {}
  },
  isChoose: Boolean,
  index: null,
  id: null,
  areaData: {
    type: Array,
    default() {
      return []
    }
  },
  minRect: null,
  limitWidth: {
    type: Number,
    default: 0
  },
  limitHeight: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['DelAreaBox'])

// box操作初始点
const pa = reactive({
  // 拖动
  startX: 0,
  starY: 0,
  // 形变
  star1X: 0,
  star1Y: 0
})

// 删除
const del = () => {
  emits('DelAreaBox', props.id)
}
// 开始拖动
const mouseDown = (e: any) => {
  const { limitWidth, limitHeight } = props
  // console.log('图片宽高2', limitWidth, limitHeight)
  pa.star1X = e.clientX
  pa.star1Y = e.clientY
  if (!document.onmousemove) {
    const { starX, starY, areaWidth, areaHeight } = props.areaInit
    document.onmousemove = ev => {
      const starXSub = starX + ev.clientX - pa.star1X
      const starYSub = starY + ev.clientY - pa.star1Y
      const checkIntersection = checkHasInteraction(props, ev, starXSub, starYSub, areaWidth, areaHeight)
      if (checkIntersection) {
        console.log('%c 单独热区内-拖动-触及其他元素', 'color: #2e62cd')
        mouseUp()
        return
      }

      // 超过了背景图区域
      const checkOverRegion =
        starX + ev.clientX - pa.star1X + areaWidth > props.limitWidth ||
        starX + ev.clientX - pa.star1X < 0 ||
        starY + ev.clientY - pa.star1Y + areaHeight > props.limitHeight ||
        starY + ev.clientY - pa.star1Y < 0
      if (checkOverRegion) {
        console.log(
          '%c 单独热区内-拖动-超过背景区域',
          '#2e62cd',
          ev.clientX - pa.star1X + starX + areaWidth,
          ev.clientX - pa.star1X + starX,
          ev.clientY - pa.star1Y + starY + areaHeight,
          ev.clientY - pa.star1Y + starY
        )
        mouseUp()
        return
      }
      props.areaInit.starX = starX + ev.clientX - pa.star1X
      props.areaInit.starY = starY + ev.clientY - pa.star1Y
    }
  }
}
// 结束拖动/变形
const mouseUp = () => {
  document.onmousemove = null
}
// 形变开始
// 基准坐标 方向为 1,1
// todo 需要解决 形变不够流畅的问题
const shapeDown = (e: any, dX: number, dY: number) => {
  pa.star1X = e.clientX
  pa.star1Y = e.clientY
  if (!document.onmousemove) {
    const { areaData, limitWidth, limitHeight, minRect } = props
    const { starX, starY, areaWidth, areaHeight } = props.areaInit
    document.onmousemove = ev => {
      const starXSub = dX ? starX : starX + ev.clientX - pa.star1X
      const starYSub = dY ? starY : starY + ev.clientY - pa.star1Y
      const areaWidthSub = dX ? areaWidth + ev.clientX - pa.star1X : areaWidth - ev.clientX + pa.star1X
      const areaHeightSub = dY ? areaHeight + ev.clientY - pa.star1Y : areaHeight - ev.clientY + pa.star1Y

      // todo 是否与其它热区产生了交集 -- 还需要判断四个角？？？？？ 好多种情况 ？？。。。。。
      const checkIntersection = checkHasInteraction(ctx, ev, starXSub, starYSub, areaWidthSub, areaHeightSub)
      if (checkIntersection) {
        console.log('%c 单独热区内-形变-触及其他元素', 'color: #c9780c')
        mouseUp()
        return
      }

      // 是否超过了热区背景图区域
      const checkOverRegion =
        (dX ? starX + ev.clientX - pa.star1X + areaWidth > limitWidth : starX + ev.clientX - pa.star1X < 0) ||
        (dY ? starY + ev.clientY - pa.star1Y + areaHeight > limitHeight : starY + ev.clientY - pa.star1Y < 0)
      if (checkOverRegion) {
        console.log(
          '%c 单独热区内-形变-超出图片区域',
          'color: #405742',
          limitWidth,
          limitHeight,
          dX,
          dY,
          ev.clientX - pa.star1X + starX + areaWidth,
          ev.clientX - pa.star1X + starX,
          ev.clientY - pa.star1Y + starY + areaHeight,
          ev.clientY - pa.star1Y + starY
        )
        mouseUp()
        return
      }

      // 是否达到最小热区限制
      if (areaWidthSub < props.minRect[0] || areaHeightSub < props.minRect[1]) {
        console.log('%c 单独热区内-形变-达到最小宽高', 'color: #c9780c')
        mouseUp()
        return
      }
      props.areaInit.starX = starXSub
      props.areaInit.starY = starYSub
      props.areaInit.areaWidth = areaWidthSub
      props.areaInit.areaHeight = areaHeightSub
    }
  }
}
</script>

<style scoped lang="less">
.areaBox {
  position: absolute;
  background: rgba(#676869, 0.3);
  border: 0.7px dashed #34495e;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #34495e;
  font-size: 14px;
  cursor: move;
  &-selected {
    background: rgba(#48a3ff, 0.6);
  }

  .number {
    user-select: none;
    background: white;
    position: absolute;
    top: 3px;
    left: 3px;
    color: black;
    padding: 0 1px;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid black;
  }

  .del {
    color: white;
    border-radius: 50%;
    position: absolute;
    right: 3px;
    top: 3px;
    font-size: 16px;
    cursor: pointer;
  }

  .shape {
    position: absolute;
    width: 7px;
    height: 7px;
    background: transparent;
    &0 {
      left: 0;
      top: 0;
      cursor: nwse-resize;
      transform: translate3d(-50%, -50%, 0);
    }
    &1 {
      right: 0;
      top: 0;
      cursor: nesw-resize;
      transform: translate3d(50%, -50%, 0);
    }
    &2 {
      right: 0;
      bottom: 0;
      cursor: nwse-resize;
      transform: translate3d(50%, 50%, 0);
    }
    &3 {
      left: 0;
      bottom: 0;
      cursor: nesw-resize;
      transform: translate3d(-50%, 50%, 0);
    }
  }
}
</style>
