import axios from 'axios'
import { message } from 'ant-design-vue'

export const submit = () => {
  let file = document.getElementById('uploadfile')
  file?.dispatchEvent(new MouseEvent('click'))
}

export const fileChoose = () => {
  let doms: any = document.getElementById('uploadfile')
  let file = doms.files[0]
  let fileReader = new FileReader()
  fileReader.onload = (e: any) => {
    // 模拟 以base64格式获取到/捕获到 了 图片等文件格式
    let base64 = e?.currentTarget?.result
    readyToUpload(base64)
  }
  fileReader.readAsDataURL(file)
}

// 准备转换为File/Blob 进行上传
function readyToUpload(base64: string) {
  let newForm = new FormData()
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
  var arr = dataurl.split(','),
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
  var arr = urlData.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
