<template>
  <a-button class="mb-10px" type="primary" @click="changeImg">切换图片</a-button>

  <div class="flex">
    <span class="mr-10px">链接：</span>
    <a class="mr-10px" href="https://github.com/chokcoco/iCSS">icss</a>
    <a class="mr-10px" href="https://angrytools.com/">anrytools </a>
  </div>

  <div></div>
  <a-radio-group name="radiogroup" :default-value="filterType" @change="filterChange" class="mb-10px">
    <a-radio v-for="(value, key) in TypesZnCssOptions" :key="value" :value="value">
      {{ value }}
    </a-radio>
  </a-radio-group>

  <img :src="showImg" />
</template>

<script setup lang="ts">
// CSS 滤镜效果
// 参考：  https://www.cnblogs.com/fsjohnhuang/p/4127888.html#a2
import { file } from 'jszip'
import { ref, reactive, onMounted } from 'vue'
import { Types, TypesZnCss, imgList } from '../types/filter'

const showImg = ref<string>('')
const chooseImgIndex = ref<number>(0)
const filter = ref<string>('') // img Fiilter 效果

let filterType = ref<string>('默认')
let TypesZnCssOptions = reactive(TypesZnCss)

onMounted(() => {
  showImg.value = imgList[chooseImgIndex.value]
})

const changeImg = () => {
  let length = imgList.length
  chooseImgIndex.value = chooseImgIndex.value + 1 >= length ? 0 : chooseImgIndex.value + 1
  showImg.value = imgList[chooseImgIndex.value]
  dealWidthCssFilter()
}

const filterChange = (el: any) => {
  filterType.value = el.target.value
  dealWidthCssFilter()
}

const dealWidthCssFilter = () => {
  switch (filterType.value) {
    case TypesZnCss.GRAYL:
      filter.value = 'grayScale(1)'
      break

    case TypesZnCss.FILM:
      filter.value = 'invert()'
      break

    case TypesZnCss.BRIGHTNESS:
      filter.value = 'brightness(1.5)'
      break

    // 怀旧
    case Types.REMINISCENCE:
      filter.value = 'sepia(100%)'
      break

    case TypesZnCss.BLUR:
      filter.value = 'blur(3px)'
      break

    case TypesZnCss.HUEROTATE:
      filter.value = 'hue-rotate(180deg)' // rgb 为0时，不会变化
      break

    case TypesZnCss.SHADOW:
      filter.value = 'drop-shadow(1px 2px 3px #333)'
      break

    case TypesZnCss.CONTRACT:
      filter.value = 'contrast(2)'
      break

    case TypesZnCss.INIT:
    default:
      filter.value = ''
      break
  }
}
</script>

<style lang="less" scoped>
img {
  width: 200px;
  filter: v-bind(filter);
}
</style>
