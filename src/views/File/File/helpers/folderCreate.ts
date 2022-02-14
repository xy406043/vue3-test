import JSZip from 'jszip'
import FileSaver from 'file-saver'

export const folderCreate = (list: Array, totalNum: number, vm: any, documentSub: any) => {
  list.forEach(item => {
    toExport(item, totalNum, vm, documentSub)
  })
}

async function toExport(friendItem, totalNum, vm, documentSub) {
  // ~~ 通过JSZIP  folder/file 的形式生成文件夹放入文件    应该 可以做到此种处理

  const { id, copy, type, coverUrl, subUrls: urls, name } = friendItem
  //   let urls = subUrls.map(item => item.url)

  const promiseList = []
  const fileList = [] // 处理结果添加进入 fileList

  //todo 处置文本 ___  是否需要添加进去 点击图片跳转的链接
  // ~~ 输入富文本编辑器内部的数据含有网图 无法在txt文件中进行展示

  // let div = document.createElement('div')
  const divName = `showText${friendItem.id}`
  const div = documentSub.getElementById(divName)
  // div.innerHTML = copy
  let textCopy = ''
  try {
    textCopy = new Blob([div.innerText])
    console.log('转换后文本', ToText(copy), divName, documentSub, div, div.innerText)
  } catch (e) {
    console.log('报错', e)
    textCopy = new Blob([ToText(copy)])
  }

  fileList.push({
    type: 'txt',
    url: textCopy
  })
  // 处置视频
  if (type === 2) {
    promiseList.push(
      new Promise((resolve, reject) => {
        // let video = document.createElement('video')
        // video.src = urls[0]
        // video.addEventListener("loadedmetadata", () => {
        // })

        fetch(urls[0])
          .then(res => res.blob())
          .then(blob => {
            fileList.push({
              type: 'video',
              url: blob
            })
            resolve()
          })
          .catch(e => {
            console.log('视频加载失败', e)
            fileList.push({
              type: 'txt',
              name: '视频加载失败',
              url: ''
            })
            resolve()
          })
        // 视频加载失败处理
      })
    )
  }

  // 处理图片、 封面图片
  if (type !== 3) {
    const showUrls = type === 2 ? [coverUrl] : urls

    showUrls.map((item, index) => {
      promiseList.push(
        new Promise((resolve, reject) => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          const img = new Image()
          img.setAttribute('crossOrigin', 'anonymous')
          img.src = item
          img.onload = () => {
            const width = img.width
            const height = img.height
            canvas.height = height
            canvas.width = width
            ctx.drawImage(img, 0, 0, width, height)
            canvas.toBlob(async blob => {
              fileList.push({
                type: 'img',
                url: blob
              })
              resolve(true)
            })
          }
          img.onerror = () => {
            canvas.height = 100
            canvas.width = 100
            ctx.fillStyle = '#ffffff'
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(100, 0)
            ctx.lineTo(100, 100)
            ctx.lineTo(0, 100)
            ctx.lineTo(0, 0)
            ctx.fill()
            ctx.closePath()
            canvas.toBlob(async blob => {
              fileList.push({
                type: 'img',
                name: '此图片绘制失败',
                url: blob
              })
              resolve()
            })
          }
        })
      )
    })
  }

  // 完毕处理
  Promise.all(promiseList).then(() => {
    vm.initTimes += 1
    console.log('本朋友圈素材长度', promiseList.length)
    // return
    const appendData = {
      soureName: name,
      id,
      name: name + (type === 1 ? '_普通' : '_明星'),
      data: fileList
    }
    vm.folderFileList.push(appendData)
    if (vm.initTimes === totalNum) {
      console.log('全部绘制完毕----准备合并导出')
      finallyDownload(vm)
    }
  })
}

function finallyDownload(vm) {
  const zip = new JSZip()

  const { folderFileList } = vm
  // 对各个 朋友圈创建文件夹 并放入文件
  folderFileList.forEach((item, index) => {
    const folder = zip.folder(item.name)
    item.data.forEach(async (cs, b) => {
      let name = ''
      switch (cs.type) {
        case 'txt':
          name = `${item.soureName}_文字${item.id}.txt`
          break
        case 'img':
          name = `${b}图片${new Date().valueOf()}.png` // 文字名称相同 会无法 下载
          break
        case 'video':
          name = `视频.mp4`
          break
        default:
          name = '文本.txt'
      }
      folder.file(name, cs.url, { binary: true })
    })
  })

  console.log('文件夹与文件处理完毕----准备合并')

  // 将 所有文件夹打包压缩

  zip.generateAsync({ type: 'blob' }).then(async content => {
    console.log('合并压缩成功--------进行下载')
    const zipFileName = '导出朋友圈素材.zip'
    vm.exportLoading = false
    await FileSaver.saveAs(content, zipFileName)
    console.log('下载成功。。。')
  })
}

function ToText(HTML) {
  const input = HTML
  return input
    .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
    .replace(/<[^>]+?>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ /g, ' ')
    .replace(/>/g, ' ')
}
