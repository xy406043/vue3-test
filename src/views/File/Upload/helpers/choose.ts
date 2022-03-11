import axios from 'axios'
import { message } from 'ant-design-vue'

export const submit = () => {
  const file = document.getElementById('uploadfile')
  file.value = ''
  file?.dispatchEvent(new MouseEvent('click'))
}

// 选择文件处理
export const fileChoose = () => {
  const doms: any = document.getElementById('uploadfile')
  const file = doms.files[0]
  const fileReader = new FileReader()
  fileReader.onload = (e: any) => {
    // 模拟 以base64格式获取到/捕获到 了 图片等文件格式
    const base64 = e?.currentTarget?.result
    // let base64 = fileReader.result
    readyToUpload(base64)
  }
  fileReader.readAsDataURL(file)
}

// 网图解析 再重新上传
export const fetchUpload = () => {
  // https://juejin.cn/post/7007306583231168526
  const type = 3
  switch (type) {
    // 1. onload && canvas
    // 2. ajax
    case 2:
      // 需引用jquery
      $.ajax('https://easystock.oss-cn-hangzhou.aliyuncs.com/db9c89b7f4064d9ebb2673580a41a400.png', {
        xhrFields: { responseType: 'blob' }
      }).then(blob => {
        const reader = new FileReader()
        reader.onload = e => {
          readyToUpload(reader.result)
        }
        reader.readAsDataURL(blob)
      })
      break

    // 3. fetch
    case 3:
      fetch('https://easystock.oss-cn-hangzhou.aliyuncs.com/db9c89b7f4064d9ebb2673580a41a400.png')
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader()
          reader.onload = e => {
            readyToUpload(reader.result)
          }
          reader.readAsDataURL(blob)
        })
      break
    default:
      break
  }
}

// 截取视频第一帧
export const videoFirstFrame = () => {
  const video = document.createElement('video')
  video.setAttribute('crossOrigin', 'anonymous')
  video.src = 'https://easystock.oss-cn-hangzhou.aliyuncs.com/76b1011e01244e94893ccf1965fa9c78.mp4'
  video.currentTime = 0.2
  video.addEventListener('loadeddata', function () {
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
    console.log('截图第一帧', canvas.toDataURL())
    message.success('截图成功！')
  })
}

// 准备转换为File/Blob 进行上传
function readyToUpload(base64: string) {
  const newForm = new FormData()
  newForm.append('files', dataUrlToFile(base64, 'sas.png'))

  axios
    .request({
      method: 'post',
      url: 'http://test.yuxisoft.cn:7999/common/upload?appId=cloud_counter_test',
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1bmlvbklkIjoiIiwibWNoSWQiOiJjbG91ZF9jb3VudGVyX3Rlc3QiLCJjb3JwSWQiOiIiLCJkZXB0U3RyIjoiIiwiZ2VuZGVyIjowLCJsb2dpblR5cGUiOiJjbXMiLCJvcGVuSWQiOiIiLCJ0YWdJZHMiOltdLCJkZXB0SWQiOiJudWxsIiwicmVhbE5hbWUiOiJhZG1pbiIsImhlYWRJbWdVcmwiOiIiLCJwaG9uZSI6IiIsImFwcElkIjoiY2xvdWRfY291bnRlcl90ZXN0IiwibmFtZSI6ImFkbWluIiwic2Vzc2lvbl9rZXkiOiIiLCJpZCI6IjEwOCIsInN1YkFwcElkIjoiIiwiZXhwIjoxNjMxODQ4NTQ0fQ.1nXySOfn7fjyveHoYaP_8tgn1rp2oSanJPLT4ilSU0_V5YGikP6oX_Q3NoNaKg5iBpDR-TdE-MF3UVpquDnCxQ'
      },
      data: newForm
    })
    .then(res => {
      message.success('上传成功！！')
    })
}

function dataUrlToFile(dataurl: any, filename: string) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

function dataUrlToBlob(urlData: any, filename: string) {
  let arr = urlData.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
