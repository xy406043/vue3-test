/* eslint-disable */
import XLSX from 'xlsx'

function auto_width(ws: any, data: any) {
  /*set worksheet max width per col*/
  const colWidth = data.map((row: any) =>
    row.map((val: any) => {
      /*if null/undefined*/
      if (val == null) {
        return { wch: 10 }
      } else if (val.toString().charCodeAt(0) > 255) {
        /*if chinese*/
        return { wch: val.toString().length * 2 }
      } else {
        return { wch: val.toString().length }
      }
    })
  )
  /*start in the first row*/
  let result = colWidth[0]
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch']
      }
    }
  }
  ws['!cols'] = result
}

function json_to_array(key: any, jsonData: any) {
  return jsonData.map((v: any) =>
    key.map((j: any) => {
      return v[j]
    })
  )
}

// get head from excel file,return array
function get_header_row(sheet: any) {
  const headers: Array<string> = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
    var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

export const export_table_to_excel = (id: any, filename: any) => {
  const table = document.getElementById(id)
  const wb = XLSX.utils.table_to_book(table)
  XLSX.writeFile(wb, filename)

  /* the second way */
  // const table = document.getElementById(id);
  // const wb = XLSX.utils.book_new();
  // const ws = XLSX.utils.table_to_sheet(table);
  // XLSX.utils.book_append_sheet(wb, ws, filename);
  // XLSX.writeFile(wb, filename);
}

export const export_json_to_excel = ({ data, key, title, filename, autoWidth }: any) => {
  const wb = XLSX.utils.book_new()
  data.unshift(title)
  const ws = XLSX.utils.json_to_sheet(data, { header: key, skipHeader: true })
  if (autoWidth) {
    const arr = json_to_array(key, data)
    auto_width(ws, arr)
  }
  XLSX.utils.book_append_sheet(wb, ws, filename)
  XLSX.writeFile(wb, filename + '.xlsx')
}

export const export_array_to_excel = ({ key, data, title, filename, autoWidth }: any) => {
  const wb = XLSX.utils.book_new()
  const arr = json_to_array(key, data)
  arr.unshift(title)
  const ws = XLSX.utils.aoa_to_sheet(arr)
  if (autoWidth) {
    auto_width(ws, arr)
  }
  XLSX.utils.book_append_sheet(wb, ws, filename)
  XLSX.writeFile(wb, filename + '.xlsx')
}

export const read = (data: any, readSettings: any, toJsonSetting = {}) => {
  /* if type == 'base64' must fix data first */
  // const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
  const workbook = XLSX.read(data, readSettings)
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[firstSheetName]
  const header = get_header_row(worksheet)
  const results = XLSX.utils.sheet_to_json(worksheet, toJsonSetting)
  return { header, results }
}

export default {
  export_table_to_excel,
  export_array_to_excel,
  export_json_to_excel,
  read
}
