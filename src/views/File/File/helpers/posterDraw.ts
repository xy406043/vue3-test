import { Item } from 'ant-design-vue/lib/menu'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { blob } from 'stream/consumers'

const commonBg = 'https://tcbj-tmpp.oss-cn-shenzhen.aliyuncs.com/97446f90f1494c8592e381d7efc7afc9.png'
const posterUrl = 'https://easystock.oss-cn-hangzhou.aliyuncs.com/52ec702e20f44f2babc153e8b0621686.png'

// 通过canvas 批量绘制海报
// todo 其它需要使用变量的地方
let posterCreateNum = 0
let localNum = 0
let fileList = []

interface staffItem {
  storeName: string
  storeNo: string
  storeId: string
  posterName: string
}

export const posterDraw = (list: Array) => {
  console.time('posterDownload')
  const ls = 33

  // 初始化
  localNum = 0
  posterCreateNum = list.length
  fileList = []

  // 开始绘制
  list.forEach((item: staffItem) => {
    // 创建画布
    const canvas = document.createElement('canvas')
    canvas.height = 1334
    canvas.width = 750
    const ctx = canvas.getContext('2d')

    // 绘制 图形 注意绘制顺序，不要被遮挡了
    const promise1 = new Promise((rs, rj) => {
      const img = new Image()
      img.setAttribute('crossOrigin', 'anonymous')
      img.src = posterUrl
      img.onload = () => {
        const width = 750
        const height = (img.height * 750) / img.width
        ctx?.drawImage(img, 0, 0, width, height)
        rs(true)
      }
      img.onerror = e => {
        console.log(`mobile:${item.mobile}海报图---绘制失败`, e)
        item.posterName = '异常绘制_' + item.posterName
        rs()
      }
    })

    promise1.then(res => {
      const promise2 = new Promise((rs, rj) => {
        const img2 = new Image()
        img2.setAttribute('crossOrigin', 'anonymous')
        img2.src = commonBg //底图
        img2.onload = () => {
          ctx.drawImage(img2, 0, 984, 750, 350)
          rs(true)
        }
        img2.onerror = e => {
          console.log(`mobile:${item.mobile}遮罩图---绘制失败`, e)
          item.posterName = '异常绘制_' + item.posterName
          rs()
        }
      })

      promise2.then(res => {
        const promise3 = new Promise((rs, rj) => {
          const img3 = new Image()
          img3.setAttribute('crossOrigin', 'anonymous')
          img3.src = item.posterUrl // 小程序码
          img3.onload = async () => {
            ctx.drawImage(img3, 508, 1094, 188, 188)
            rs(true)
          }
          img3.onerror = e => {
            console.log(`mobile:${item.mobile}小程序码---绘制失败`, e)
            item.posterName = '异常绘制_' + item.posterName
            rs()
          }
        })

        Promise.all([promise3]).then(s => {
          const contentSub = JSON.parse(JSON.stringify(item))
          const p = Object.assign({ storeName: item.storeName }, contentSub)
          getCanvas2(p, ctx, canvas)
        })
      })
    })
  })
}

function getCanvas2(item, ctx, canvasEl) {
  // 绘制文字
  ctx.font = '500 36px PingFangSC-Medium, PingFang SC'
  ctx.textAlign = 'left'
  ctx.fillStyle = '#ff577c'

  // 文字断点
  const result = breakLinesForCanvas(ctx, item.storeName, 453)
  let showStr = ''
  if (result.length > 1) {
    //需要多行展示
    // let rel = result[0].split("");
    // rel.pop();
    // rel.pop();
    // rel.push("...");
    // showStr = rel.join("");

    ctx.font = '500 28px PingFangSC-Medium, PingFang SC'
    result.forEach((item, index) => {
      ctx.fillText(item, 109, 1138 + 34 * (index + 1))
    })
  } else {
    showStr = result[0]
    ctx.fillText(showStr, 109, 1154 + 36)
  }

  canvasEl.toBlob(async blob => {
    fileList.push({
      name: item.posterName,
      url: blob
    })

    localNum += 1
    if (localNum === posterCreateNum) {
      console.log('%c 全部绘制完毕------准备合并压缩下载-----', 'color:forestGreen')
      const zip = new JSZip()
      downLoadZip(zip)
    }
  })
}

function downLoadZip(zip) {
  if (fileList.length == 1) {
    downLoadImg(fileList[0])
    return
  }

  fileList.forEach((item, i) => {
    zip.file(item.name + '.png', item.url, { binary: true })
  })

  zip.generateAsync({ type: 'blob' }).then(async content => {
    const zipFileName = '海报集.zip'
    await FileSaver.saveAs(content, zipFileName)
    console.timeEnd('posterDownload')
  })
}

function downLoadImg(row) {
  const url = URL.createObjectURL(row.url)
  const eleLink = document.createElement('a')
  eleLink.download = row.name
  eleLink.href = url
  eleLink.click()
  eleLink.remove()
  URL.revokeObjectURL(url)
}

function findBreakPoint(text, width, context) {
  let min = 0
  let max = text.length - 1

  while (min <= max) {
    const middle = Math.floor((min + max) / 2)
    const middleWidth = context.measureText(text.substr(0, middle)).width
    const oneCharWiderThanMiddleWidth = context.measureText(text.substr(0, middle + 1)).width
    if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
      return middle
    }
    if (middleWidth < width) {
      min = middle + 1
    } else {
      max = middle - 1
    }
  }
  return -1
}

function breakLinesForCanvas(ctx, text, width, font) {
  const context = ctx
  const result = []
  let breakPoint = 0
  if (font) {
    context.font = font
  }
  while ((breakPoint = findBreakPoint(text, width, context)) !== -1) {
    result.push(text.substr(0, breakPoint))
    text = text.substr(breakPoint)
  }
  if (text) {
    result.push(text)
  }
  return result
}
