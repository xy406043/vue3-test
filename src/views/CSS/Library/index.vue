<template>
  <div class="css-library">
    <!--// css-doodle制作复杂图纹  https://css-doodle.com/ -->
    <div class="css-library-item">
      <SAlert title="css-doodle图纹" />
      <css-doodle seed="2020">
        :doodle { @grid: 5 / 8em; } background: linear-gradient( @pick-d(45deg, -45deg), @pick(#60569e, #e6437d), rgba(255, 255, 255, 0),
        @last-pick() );
      </css-doodle>
    </div>

    <!-- //  fancy-components 图片波浪 web-compnents组件，类似HTML原生 （实现” -webkit-mask） -->
    <div class="css-library-item">
      <SAlert title="波纹web-components" />

      <fc-wave-filter color="#045EB8"> </fc-wave-filter>
    </div>

    <!-- //  windicss https://cn.windicss.org/ -->
    <div class="css-library-item">
      <SAlert title="windicss" />
      <div class="bg-green-500">撒手锏</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
</script>

<style lang="less" scoped>
css-doodle {
  //   height: 120px !important;
}
fc-wave-filter {
  --width: 60px;
  --height: 60px;
}
fc-bubbles {
  --color: #f7ef66;
}

.css-library {
  display: grid;
  min-height: 600px;
  min-width: 1000px;
  overflow: scroll;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 10px;
  &-item {
    background-color: white;
    border-radius: 5px;
    padding: 0 5px 10px 5px;
  }
}
</style>
