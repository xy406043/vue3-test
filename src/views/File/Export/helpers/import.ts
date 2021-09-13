import XLSX from 'xlsx'
import { ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import axios from 'axios'

// TODO Vue3如何获取原生标签？？？ 组件需要defineExpose
export const toImport = () => {
  // 只能使用原生？？
  let doFileDom: any = document.getElementById('importFile')
  doFileDom.value = ''
  doFileDom.dispatchEvent(new MouseEvent('click'))
}

export const valueChange = () => {
  let doFileDom: any = document.getElementById('importFile')
  let file = doFileDom.files[0]
  try {
    let fileReader = new FileReader()
    fileReader.onload = (e: any) => {
      let fileData = e?.currentTarget?.result
      let wb = XLSX.read(fileData, { type: 'buffer' })
      let j_data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      console.log('捕获到数据并进行展示', j_data)
      message.success('读取文件成功！')
    }

    fileReader.readAsArrayBuffer(file)
  } catch (e) {
    $ame('上传文件失败')
  }
}

// 注意  可以通过FormData.get(key) 获取到值，但是直接打印newForm 是不行的
export const valueChange2 = () => {
  let file = document.getElementById('importFile2').files[0]
  let newFrom = new FormData()
  newFrom.append('files', file)
}
