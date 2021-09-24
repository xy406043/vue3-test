<!-- TODO 因为此处的 template  内存在svg的代码，影响到了pro-layout 的样式？？？？ -->
<template>
  <div>
    <!-- 字体子集化 -->
    <a href="http://ecomfe.github.io/fontmin/#app" class="text-pink-500" target="_blank"
      >字体子集化，部分需要特殊字体的只需要字体文件的一部分，减少体积，提高加载速度</a
    >

    <!-- 文字渐变 -->
    <div class="text-gran mt-20px">
      <div class="text">为你定制 发现精彩</div>
    </div>

    <!-- 文字描边 -->
    <div class="text-stroke-neee">
      <p class="text" data-title="为你定制 发现精彩">为你定制 发现精彩</p>
    </div>

    <!-- 文字投影 -->
    <div class="text-proj">
      <p class="text" data-title="为你定制 发现精彩">为你定制 发现精彩</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 参考： https://juejin.cn/post/7010944239609577508
// 字体子集化： http://ecomfe.github.io/fontmin/#source
import { ref } from 'vue'
</script>

<style lang="less" scoped>
.text-gran {
  .text {
    background-image: linear-gradient(#ffcf02, #ff7352);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.text-stroke {
  .text::before {
    content: attr(data-title);
    position: absolute;
    background-image: linear-gradient(#ffcf02, #ff7352);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0;
  }
  .text {
    -webkit-text-stroke: 5px #333; // 文字内描边
  }
}

.text-proj {
  .text::before {
    content: attr(data-title);
    position: absolute;
    background-image: linear-gradient(#ffcf02, #ff7352);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0;
  }
  .text {
    -webkit-text-stroke: 5px #333; // 文字内描边

    // -webkit-text-stroke: 6px #333;
    filter: drop-shadow(0 4px 0 #333); // 阴影
  }
}
</style>
