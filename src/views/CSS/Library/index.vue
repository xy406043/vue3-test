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

      <fc-wave-filter color="#045EB8">
        <img
          delay=".3"
          class="file-wave-img"
          src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgc3R5bGU9IndpZHRoOjFlbTtoZWlnaHQ6MWVtO3ZlcnRpY2FsLWFsaWduOm1pZGRsZSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJjdXJyZW50Q29sb3IiIG92ZXJmbG93PSJoaWRkZW4iPjxwYXRoIGQ9Ik0yNjQuMTI5IDI2MS4yNjJjNS4wMjUtNS45NCA0LjI4NS0xNS4yNS0zLjAwOS0yMS40MS02LjQ3NS01LjQzNS0xNi4wODUtMy45MzgtMjAuMzU0IDEuMTk4bC0zOC4wNzcgNDUuMzIzIDIzLjY2MiAxOS44NjYgMzcuNzc4LTQ0Ljk3N3ptLTQzLjkzNy01MC4wMTljLTYuMTQ0LTUuMTA0LTE1LjU2NS01LjI3Ny0xOS43ODctLjMxNWwtMzYuMjAzIDQzLjE2NiAyMi40MDIgMTguNzk0IDM1Ljc5My00Mi42NjFjNC41MzctNS4zNTcgNC41MDYtMTMuMzQ0LTIuMjA1LTE4Ljk4NHptNTY2LjQxMyAxMzUuODE0bC0yMi40NDktMjcuOTE2IDQ0LjcyNS02NS4zNzgtLjI4My0uMzE1LTczLjIwOCAzMC4xMjEtMjIuNjg2LTI3Ljc1OCA3Ny40OTMtOTkuNzIyIDE5LjEyNSAyMy42My00OC41MjIgNjMuNTA1IDc0LjE4NS0zMS44NyAyMC41MTIgMjUuMzYzLTQ2LjU2OSA2NS45MyA3Mi4yLTM0LjI4IDE5LjEyNiAyMy41OTktMTEzLjY0OSA1NS4wOTF6TTUwNy4xNjQgODA3LjAzOGMtMTY1LjYwNSAwLTI5OS44NzUtMTM0LjI1NC0yOTkuODc1LTI5OS44NzQgMC0xNjUuNTczIDEzNC4yNy0yOTkuODQzIDI5OS44NzUtMjk5Ljg0MyAxNjUuNjIgMCAyOTkuODc0IDEzNC4yNTQgMjk5Ljg3NCAyOTkuODQzIDAgMTY1LjYyLTEzNC4yNTQgMjk5Ljg3NC0yOTkuODc0IDI5OS44NzR6TTEyNi45MjkgMjY0Ljk4bDYwLjI5LTcxLjgyMmMxMi41MDgtMTQuODg3IDI5Ljk2NC0yNi43ODIgNDYuNTUyLTEyLjg0IDUuMTA1IDQuMjcgNy4yOTQgNS42ODggMTMuNTAxIDE3LjA0NiAxLjQ2NSA0LjAwMiAyLjU4NCAxMS4yOTYtLjE4OSAxOC40NDggMTQuNDE1LTguOTY0IDI5Ljc5LTYuMDM0IDM5LjcxNiAzLjYyMyAxNS4yODEgMTQuODU2IDEzLjA2IDMxLjk5Ni0xLjQ2NSA0OS4zMjZsLTYzLjU4MyA3NS43NzYtOTQuODIyLTc5LjU1N3ptMzExLjYxLTIwMy4yNTZoMzcuMjI3bDMzLjYxOSA4OCAzMy42MTktODhoMzcuMTYzdjEyMy41NzNoLTI0LjczNHYtODYuM2wtMzIuNTQ3IDg2LjNoLTI3LjA1bC0zMi40ODQtODYuM3Y4Ni4zSDQzOC41NFY2MS43MjR6bTY4LjYyNS0yMy45OTRDMjQ3LjkxOCAzNy43MyAzNy43MyAyNDcuOTE4IDM3LjczIDUwNy4xNjRjMCAyNTkuMjc2IDIxMC4xODggNDY5LjQ4IDQ2OS40MzQgNDY5LjQ4IDI1OS4zMDggMCA0NjkuNDgtMjEwLjIwNCA0NjkuNDgtNDY5LjQ2NVM3NjYuNDcyIDM3LjcxNSA1MDcuMTY0IDM3LjcxNXptMCA3NDkuOTk0YzE1NC45ODYgMCAyODAuNjA3LTEyNS41OSAyODAuNjA3LTI4MC41Nkg1MDcuMTY0Vjc4Ny43NHptLTI4MC41NzYtMjgwLjU2aDI4MC41NzZWMjI2LjYxOWMtMTU0Ljk3MSAwLTI4MC41NzYgMTI1LjYwNS0yODAuNTc2IDI4MC41NDV6bTI4MC41NzYgNDg5LjYzYy0yNjkuOTU4IDAtNDg5LjY0Ni0yMTkuNjU3LTQ4OS42NDYtNDg5LjYzIDAtMjY5Ljk1OCAyMTkuNjg4LTQ4OS42MyA0ODkuNjQ2LTQ4OS42MyAyNzAuMDA1IDAgNDg5LjY0NSAyMTkuNjcyIDQ4OS42NDUgNDg5LjYzIDAgMjY5Ljk3My0yMTkuNjQgNDg5LjYzLTQ4OS42NDUgNDg5LjYzem0wLTk5Ni43OTRDMjI3LjUgMCAwIDIyNy41MDEgMCA1MDcuMTY0YzAgMjc5LjY2MiAyMjcuNTAxIDUwNy4xOTUgNTA3LjE2NCA1MDcuMTk1IDI3OS42OTMgMCA1MDcuMTc5LTIyNy41MzMgNTA3LjE3OS01MDcuMTk1QzEwMTQuMzQzIDIyNy41IDc4Ni44NTcgMCA1MDcuMTYzIDB6IiBmaWxsPSIjQjlCRUMzIi8+PC9zdmc+"
        />
      </fc-wave-filter>
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
import SAlert from '@/components/SAlert'
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
