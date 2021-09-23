<template>
  <div class="cropper-wrapper">
    <div class="img-box">
      <img class="cropper-image" id="cropper12" alt="" />
    </div>
    <div class="right-con">
      <div v-if="preview" class="preview-box" id="cropper_preview12"></div>
      <div class="button-box">
        <slot>
          <!-- <input type="file" ref="typefile" id="typefile" @change="filechange" /> -->
        </slot>
        <div v-show="insideSrc" style="display: flex; flex-wrap: wrap">
          <a-button type="primary" @click="rotate">
            <ClockCircleTwoTone :size="18" />
          </a-button>
          <a-button type="primary" @click="shrink">
            <MinusSquareTwoTone :size="18" />
          </a-button>
          <a-button type="primary" @click="magnify">
            <PlusSquareTwoTone :size="18" />
          </a-button>
          <a-button type="primary" @click="scale('X')">
            <LeftSquareTwoTone :size="18" />
          </a-button>
          <a-button type="primary" @click="scale('Y')">
            <UpSquareTwoTone :size="18" />
          </a-button>
          <a-button type="primary" @click="move(0, -moveStep)">
            <UpCircleTwoTone :size="18" />
          </a-button>
          <a-button type="primary" @click="move(-moveStep, 0)">
            <LeftCircleTwoTone :size="18" />
          </a-button>
          <a-button type="primary" @click="move(0, moveStep)">
            <DownCircleTwoTone :size="18" />
          </a-button>
          <a-button type="primary" @click="move(moveStep, 0)">
            <RightCircleTwoTone :size="18" />
          </a-button>
          <a-button style="width: 150px; margin-top: 10px" type="primary" @click="crop">{{ buttonText }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

const preview = ref(true)
const moveStep = ref(4)
const buttonText = ref('裁剪')
let _uid = ref<any>(null)
let cropper = ref<any>(null)
let insideSrc = ref<any>('https://easystock.oss-cn-hangzhou.aliyuncs.com/db9c89b7f4064d9ebb2673580a41a400.png')

watch(insideSrc, (src: string) => {
  replace(src)
})

const filechange = (e: any) => {}

const replace = (src: string) => {
  cropper.value.replace(src)
  insideSrc = src
}
const rotate = () => {
  cropper.value.rotate(90)
}

const shrink = () => {
  cropper.value.zoom(-0.1)
}
const magnify = () => {
  cropper.value.zoom(0.1)
}
// TODO 翻转
const scale = (d: string) => {
  cropper[`scale${d}`](-cropper.value.getData()[`scale${d}`])
}
const move = (...argu: any) => {
  cropper.value.move(...argu)
}
const crop = () => {
  //   cropper.value.getCroppedCanvas().toBlob(blob => {
  //     $emit('on-crop', blob)
  //   })
}

onMounted(async () => {
  const dom = <any>document.getElementById('cropper12')
  cropper.value = await new Cropper(dom, {
    preview: `#cropper_preview12`,
    checkCrossOrigin: true
  })
  setTimeout(() => {
    cropper.value.replace('https://easystock.oss-cn-hangzhou.aliyuncs.com/db9c89b7f4064d9ebb2673580a41a400.png')
  }, 600)
})
</script>

<style lang="less" scoped>
.bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}
.cropper-wrapper {
  //   width: 600px;
  height: 340px;
  .img-box {
    height: 340px;
    width: 430px;
    border: 1px solid #ebebeb;
    display: inline-block;
    .bg;
    img {
      max-width: 100%;
      display: block;
    }
  }
  .right-con {
    display: inline-block;
    width: 170px;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 10px;
    .preview-box {
      height: 150px !important;
      width: 100% !important;
      overflow: hidden;
      border: 1px solid #ebebeb;
      .bg;
    }
    .button-box {
      padding: 10px 0 0;
    }
  }
}
</style>
