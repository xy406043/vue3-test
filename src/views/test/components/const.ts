export const columns = [
  {
    title: '作者昵称',
    dataIndex: 'nickname',
    width: 150
  },
  {
    title: '作者小红书ID',
    dataIndex: 'userCode',
    width: 150
  },
  {
    title: '作者地理位置',
    dataIndex: 'place',
    slots: { customRender: 'place' },
    width: 150
  }
]

export const map = {
  nickname: '昵称',
  userCode: 'ID',
  userIn: '',
  place: '地址位置'
}

export const testData = [
  { id: 0, userCode: 12121, nickname: '是卡莎', place: '该卡号就撒' },
  { id: 1, userCode: 121, nickname: '是卡slas莎', place: '该卡号索马里思考力我怕就撒' },
  { id: 2, userCode: 1212123, nickname: '是卡了萨卡洛斯莎', place: '该卡号就撒' }
]
