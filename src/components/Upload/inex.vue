<template>
  <div style="display: flex">
    <VueDraggableNext :list="fileList" :sort="!disabled" style="display: flex" @end="endAction">
      <div v-for="(file, index) in fileList" :key="index">
        <div :key="index">
          <a-tooltip :title="file.status === 'error' ? file.name + '：' + file.response : ''">
            <div class="upload-list-picture-card-container">
              <div class="upload-list-item-info">
                <a-progress v-if="file.status === 'uploading'" :percent="100" status="active" :strokeWidth="6" :showInfo="false" />
                <template v-else>
                  <template v-if="file.status === 'error'">
                    <FileImageOutlined :style="{ fontSize: '30px' }" />
                    <span style="color: red; font-size: 14px">上传错误</span>
                  </template>
                  <template v-else>
                    <video
                      v-if="(file.type && file.type.includes('video')) || (file.url && file.url.includes('.mp4'))"
                      :src="file.url"
                      :style="`width: 100%; height: 100%; border-radius: 4px;object-fit:${objectFit}`"
                    ></video>
                    <img
                      v-else
                      :key="index"
                      :src="file.url"
                      :style="`width: 100%; height: 100%; border-radius: 4px;object-fit:${objectFit}`"
                    />
                  </template>
                  <div class="mask">
                    <span class="mask-icon">
                      <EyeTwoTone
                        :style="{ color: 'white', fontSize: '18px', opacity: file.status === 'error' ? '0.5' : '1' }"
                        @click.stop.prevent="_preview(index)"
                      />
                      <DeleteTwoTone v-if="!disabled" style="margin-left: 10px" @click.stop.prevent="_remove(index)" />
                    </span>
                  </div>
                </template>
              </div>
            </div>
          </a-tooltip>
        </div>
      </div>
    </VueDraggableNext>
    <a-upload
      :fileList="fileList"
      :customRequest="_customRequest"
      :beforeUpload="_beforeUpload"
      :multiple="true"
      listType="picture-card"
      :disabled="disabled"
      :showUploadList="false"
      @change="handleChange"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < maxLen">
        <PlusOutlined />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img v-if="checkMediaType(1)" alt="example" style="width: 100%" :src="previewImage" />
      <video v-if="checkMediaType(2)" :src="previewImage" controls style="width: 100%"></video>
    </a-modal>
  </div>
</template>

// todo 按文件顺序上传，fileList本身即可（即时接口完成时间不同） // todo 拖拽 已使用vue-draggable-next // todo
<script setup lang="ts">
// 使用vue3.2 setup script & ant-design 重写上传组件等常规通用组件
import { VueDraggableNext } from 'vue-draggable-next'
import SProps from './types'
import { ref, reactive, toRefs, watch, watchEffect, onMounted } from 'vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import axios from 'axios'
import { retry } from 'rxjs'
// hooks 文件引用
const { globalProperties: appData, proxy: ctx } = useCurrentInstance()
// $ame等 通过添加全局定义
const { $ame, $ams } = appData
// emits 也需要预先定义
const emits = defineEmits(['update:modelValue'])

const hasInit = ref<boolean>(false)
const previewVisible = ref<boolean>(false)
const previewImage = ref<string>('')
const fileList = ref<Array<any>>([])
const headers = ref({
  authorization:
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1bmlvbklkIjoiIiwibWNoSWQiOiJjbG91ZF9jb3VudGVyX3Rlc3QiLCJjb3JwSWQiOiIiLCJkZXB0U3RyIjoiIiwiZ2VuZGVyIjowLCJsb2dpblR5cGUiOiJjbXMiLCJvcGVuSWQiOiIiLCJ0YWdJZHMiOltdLCJkZXB0SWQiOiJudWxsIiwicmVhbE5hbWUiOiJhZG1pbiIsImhlYWRJbWdVcmwiOiIiLCJwaG9uZSI6IiIsImFwcElkIjoiY2xvdWRfY291bnRlcl90ZXN0IiwibmFtZSI6ImFkbWluIiwic2Vzc2lvbl9rZXkiOiIiLCJpZCI6IjEwOCIsInN1YkFwcElkIjoiIiwiZXhwIjoxNjMxODQ4NTQ0fQ.1nXySOfn7fjyveHoYaP_8tgn1rp2oSanJPLT4ilSU0_V5YGikP6oX_Q3NoNaKg5iBpDR-TdE-MF3UVpquDnCxQ'
})
const props = defineProps(SProps)
const { defaultList, objectFit } = toRefs(props)

onMounted(() => {})

const _beforeUpload = (file: File, files: FileList) => {
  console.log('fil', file)
  if (fileList.value.length + files.length > props.maxLen) {
    $ame('超出最大上传数量！')
    return false
  }
  if (props.accpetType.length > 0 && !props.accpetType.includes(file.type)) {
    $ame('上传失败：格式错误')
    return false
  }
  if (typeof props.maxSize === 'number' && file.size / 1024 / 1024 > props.maxSize) {
    $ame(`上传失败：请上传${props.maxSize}KB以内的文件`)
    return false
  }

  return checkFileWH(file)
}

const _customRequest = (options: any) => {
  const { onSuccess, onError, file, onProgress } = options
  const formdata = new FormData()
  formdata.append('files', file)
  axios
    .request({
      url: props.url,
      headers: headers.value,
      method: 'post',
      data: formdata
    })
    .then(res => {
      if (res.data.code === 0) {
        const urlList = res.data.result
        for (let i = 0; i < urlList.length; i++) {
          const detail = urlList[i]
          onSuccess(detail)
        }
      } else {
        $ame('上传错误请重试')
        onError()
      }
    })
    .catch(err => {
      console.error(err)
      onError()
    })
}

const handleChange = (data: any) => {
  const { fileList: newList } = data
  fileList.value = newList.filter((f: any) => f.status !== undefined)
  fileList.value.forEach((item: any) => {
    item.url = item?.response?.url
  })
  const returnFileList = fileList.value.map((f: any) => ({ ...f, ...(f.response || {}) }))
  emits('update:modelValue', fmtReturnImgList(returnFileList))
}

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    if (file.thumbUrl) resolve(file.thumbUrl)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj)
  }
  previewImage.value = file.url || file.preview
  previewVisible.value = true
}

const handleCancel = () => {
  previewVisible.value = false
  setTimeout(() => {
    previewImage.value = ''
  }, 200)
}
const fmtReturnImgList = (list: any) => {
  return list.map((item: any) => item.response)
}

const checkFileWH = (file: File) => {
  return true
}

const endAction = (index: number) => {
  emits('update:modelValue', fmtReturnImgList(fileList.value))
}

const _preview = (index: number) => {
  const target = fileList.value[index]
  if (target.status === 'error' || !target.url) return
  previewImage.value = target.url
  previewVisible.value = true
}
const _remove = (index: number) => {
  fileList.value.splice(index, 1)
  emits('update:modelValue', fmtReturnImgList(fileList.value))
}

const checkMediaType = (number: number) => {
  const url = previewImage.value
  let type
  const imgCatch = new RegExp(/(.img|.png|.gif|.jpeg)/)
  const videoCatch = new RegExp(/(.mp4|.flv)/)
  if (imgCatch.test(url)) return number == 1
  if (videoCatch.test(url)) return number == 2
}

watch(
  defaultList,
  () => {
    if (hasInit.value) return
    fileList.value = props.defaultList.map((item: any) => {
      const ct = typeof item === 'string'
      return {
        uid: ct ? item : item.url,
        status: 'finished',
        name: ct ? item : item.name,
        response: ct ? { name: item, type: item, url: item } : item,
        url: ct ? item : item.url
      }
    })
    hasInit.value = true
  },
  { immediate: true }
)
watch(fileList, () => {}, { immediate: true })
</script>

<style lang="less" scoped>
/deep/ .ant-upload.ant-upload-select-picture-card {
  margin: 0;
}

.upload-list-picture-card-container {
  float: left;
  width: 104px;
  height: 104px;
  position: relative;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin: 0 8px 8px 0;
  .upload-list-item-info {
    position: relative;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .mask {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: all 0.3s;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .mask-icon {
      display: inline-block;
      cursor: pointer;
    }
  }
  &:hover {
    .mask {
      z-index: 1;
      opacity: 1;
    }
  }
}
</style>
