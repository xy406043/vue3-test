<template>
  <div id="app">
    <!-- <XyTools></XyTools> -->
    <div>
      <button @click="save">Save</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const signaturePad = ref<any>(null)

const save = () => {
  const { isEmpty, data } = signaturePad.value.saveSignature()
  console.log(isEmpty)
  console.log(data)
}
</script>
