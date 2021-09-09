export default {
  defaultList: {
    type: Array,
    default: () => []
  },
  maxSize: {
    type: Number,
    default: 2048
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxLen: {
    type: Number,
    default: 1
  },
  accpetType: {
    type: Array,
    default() {
      return ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
    }
  },
  limitRect: Boolean,
  widthRange: {
    type: Array,
    default() {
      return [0, 1000]
    }
  },
  heightRange: {
    type: Array,
    default() {
      return [0, 1000]
    }
  },
  url: {
    type: String,
    default: `http://test.yuxisoft.cn:7999/common/upload?appId=cloud_counter_test`
  },
  objectFit: {
    type: String,
    default: 'contain'
  }
}
