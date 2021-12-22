import XLSX from 'xlsx'
import { ref } from 'vue'
// import { Form, message } from 'ant-design-vue'
import axios from 'axios'

// TODO Vue3如何获取原生标签？？？ 组件需要defineExpose
export const toImport = () => {
  // 只能使用原生？？
  const doFileDom: any = document.getElementById('importFile')
  doFileDom.value = ''
  doFileDom.dispatchEvent(new MouseEvent('click'))
}

export const valueChange = () => {
  const doFileDom: any = document.getElementById('importFile')
  const file = doFileDom.files[0]
  try {
    const fileReader = new FileReader()
    fileReader.onload = (e: any) => {
      const fileData = e?.currentTarget?.result
      const wb = XLSX.read(fileData, { type: 'buffer' })
      const j_data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
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
  const file = document.getElementById('importFile2').files[0]
  const newFrom = new FormData()
  newFrom.append('files', file)
}
