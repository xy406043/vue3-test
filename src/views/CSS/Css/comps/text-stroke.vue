<template>
  <!-- 字体子集化 -->
  <a href="http://ecomfe.github.io/fontmin/#app" class="text-pink-500"
    >字体子集化，部分需要特殊字体的只需要字体文件的一部分，减少体积，提高加载速度</a
  >

  <!-- 文字渐变 -->
  <div class="text-gran mt-20px">
    <div class="text">为你定制 发现精彩</div>

    <svg>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFCF02" />
          <stop offset="100%" stop-color="#FF7352" />
        </linearGradient>
      </defs>
      <text class="text2" x="50%" y="50%">为你定制 发现精彩</text>
    </svg>
  </div>

  <!-- 文字描边 -->
  <div class="text-stroke">
    <p class="text" data-title="为你定制 发现精彩">为你定制 发现精彩</p>

    <svg>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFCF02" />
          <stop offset="100%" stop-color="#FF7352" />
        </linearGradient>
      </defs>
      <text class="text2" x="50%" y="50%">为你定制 发现精彩</text>
    </svg>
  </div>

  <!-- 文字投影 -->
  <div class="text-proj">
    <p class="text" data-title="为你定制 发现精彩">为你定制 发现精彩</p>

    <svg>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFCF02" />
          <stop offset="100%" stop-color="#FF7352" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="0" flood-color="#333" />
        </filter>
      </defs>
      <text class="text2" x="50%" y="50%">为你定制 发现精彩</text>
    </svg>
  </div>
</template>
<script setup lang="ts">
// 参考： https://juejin.cn/post/7010944239609577508
// 字体子集化： http://ecomfe.github.io/fontmin/#source
</script>

<style lang="less" scoped>
.text-gran {
  .text {
    background-image: linear-gradient(#ffcf02, #ff7352);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  svg {
    width: 230px;
    height: 26px;
  }
  .text2 {
    fill: url(#gradient);
    text-anchor: middle;
    dominant-baseline: middle;
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

  svg {
    width: 230px;
    height: 26px;
  }
  .text2 {
    fill: url(#gradient);
    text-anchor: middle;
    dominant-baseline: middle;
    stroke-width: 4px;
    stroke: #333;
    paint-order: stroke; /**先 描边 */
    stroke-linejoin: round; /*路径转角为圆角         miter   round bevel*/
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

  svg {
    width: 230px;
    height: 26px;
  }
  .text2 {
    fill: url(#gradient);
    text-shadow: 0 4px 0 #333;
    // filter: url(#shadow);
    text-anchor: middle;
    dominant-baseline: middle;
    stroke-width: 4px;
    stroke: #333;
    paint-order: stroke; /**先 描边 */
    stroke-linejoin: round; /*路径转角为圆角         miter   round bevel*/
  }
}
</style>
