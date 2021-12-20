import saveAs from 'file-saver'
import Excel from 'exceljs'

// ~~ https://gitee.com/mirrors/exceljs#exceljs

// 仅用于通用导出， 如需其它则要额外配置
// 调用示例
// this.$doExportByExcel(exportInfo, [], filename, {
//   custom: false,
//   customMap: GROUP_DATA_MAP,
//   freeze: { x: 2, y: 1 }
// })

/**
 *
 * @param ExcelData       源数据
 * @param exportColumns   已定义好的columns,为空时通过config 里的customMap 自动配置
 * @param filename        文件名
 * @param config
 */
export default function (excelData, exportColumns, filename, config) {
  // 初始化文件信息
  const workbook = new Excel.Workbook()
  workbook.created = new Date()
  workbook.modified = new Date()

  // 添加工作簿，需要几个就添加几个，分别进行配置
  const worksheet = workbook.addWorksheet(filename, {
    properties: {
      tabColor: { argb: 'CC1FF3' }, //标签样式
      defaultRowHeight: 20 //默认行高
    }
  })

  // 设置columns
  if (config && config.custom) {
    // 表示已经是自定义的 exportColumns
  } else {
    exportColumns = []
    const rowMap = config.customMap
    const keys = Object.keys(rowMap)
    keys.forEach((item, index) => {
      exportColumns.push({
        title: rowMap[item],
        header: rowMap[item],
        key: item,
        types: 'text',
        width: 15
      })
    })
  }
  // 注意: 第一行必须是表头
  worksheet.columns = exportColumns

  // 设置表头高度、背景样式 （argb颜色结构）
  const row = worksheet.lastRow
  row.height = 40
  row.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: '1DA2AA' },
      bgColor: { argb: '1DA2AA' } // 只有bgColor时 是 点栅背景
    }
    cell.font = {
      name: 'Calibri',
      color: { argb: 'FFFFFF' },
      family: 2,
      scheme: 'major',
      size: 14,
      bold: true,
      outline: true
    }
  })
  row.commit()

  // 添加数据项 exceljs 有多种 数据类型 ,exportColumns 中的types不太对标这些类型，只对部分特殊类型做下处理
  // !! 测试数据
  excelData.unshift({ id: '英俊', userCode: '', place: '', useIn: '沙拉酱卡' })
  excelData.unshift({ id: 0, userCode: '直爽', place: '' })
  // !! 测试数据
  excelData.forEach((x, xi) => {
    const list = []
    const rowData = {}
    exportColumns.forEach((y, yi) => {
      if (y.types === 'text') {
        rowData[y.key] = x[y.key]
      } else if (y.types === 'image' && x[y.key]) {
        const imageId2 = workbook.addImage({
          buffer: x[y.key], // 二进制流的形式
          extension: 'jpeg'
        })
        worksheet.addImage(imageId2, {
          tl: { col: 0.5 + b, row: 1.5 + a },
          ext: { width: 80, height: 80 } //todo 需要图片时再设置
        })
      }
    })
    list.push(rowData)
    worksheet.addRows(list)
    //控制行高
    const row = worksheet.lastRow
    row.height = 20
    row.commit()
  })

  // 控制单元格宽度， 特定列表可以直接写死
  exportColumns.forEach((y, yi) => {
    let localWidth =
      y.title.toString().charCodeAt(0) > 255
        ? y.title.toString().length * 3 // 系数按 字👌 /12
        : y.title.toString().length * 2
    excelData.forEach((x, xi) => {
      const local = x[y.key] || ''
      let width
      if (local && local.toString().charCodeAt(0) > 255) {
        width = local.toString().length * 2.4
      } else {
        width = local.toString().length * 1.3
      }
      if (width > localWidth) {
        localWidth = width
      }
    })
    y.width = localWidth > 13 ? Math.ceil(localWidth) : 13
  })

  // 单元格样式处理
  worksheet.columns = exportColumns

  // !! 测试数据 --- 手动控制表头 =====================================
  // todo 指定单元格设置样式
  worksheet.mergeCells('B1', 'C1')
  worksheet.mergeCells('C2', 'C3')
  const toUseList = ['B2', 'A3', 'D3']
  toUseList.forEach(element => {
    worksheet.getCell(element).font = {
      name: 'Arial Black',
      color: { argb: 'FF00FF00' },
      family: 2,
      size: 14,
      italic: true
    }
    worksheet.getCell(element).fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: '9DA2AA' },
      bgColor: { argb: '9DA2AA' } // 只有bgColor时 是 点栅背景
    }
  })

  // !! 测试数据 ==================================================

  exportColumns.forEach((y, index) => {
    const dobCol = worksheet.getColumn(index + 1)
    dobCol.eachCell((cell, rowNumber) => {
      console.log('cell', cell)
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
      // !! 测试数据
      if (rowNumber <= 3) return
      // !! 测试数据
      //   if (rowNumber <= 1) return
      cell.font = {
        scheme: 'major',
        size: 12,
        bold: true,
        color: { argb: '3E3F3C' }
      }
    })
  })

  // 冻结行、列
  const p = { state: 'frozen', xSplit: 1, ySplit: 1 }
  //   if (config.freeze) {
  //     p.xSplit = config.freeze.x || 0
  //     p.ySplit = config.freeze.y || 0
  //   }
  //   worksheet.views = [p]

  console.log('最终的处理', worksheet, workbook, worksheet.getRow(2))

  // 导出文件
  workbook.xlsx.writeBuffer().then(buffer => {
    saveAs(
      new Blob([buffer], {
        type: 'application/octet-stream'
      }),
      filename + '.' + 'xlsx'
    )
  })
}
