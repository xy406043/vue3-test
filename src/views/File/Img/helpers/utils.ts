

// 应当只考虑边际碰撞
export const checkHasInteraction = (vm, ev, ox, oy, ow, oh) => {
    const { areaData, index } = vm
    for (let i = 0; i < areaData.length; i++) {
      if (i === index) continue
      const { starX: cx, starY: cy, areaWidth: cw, areaHeight: ch } = areaData[i]
      // console.log('数据坐标', ox, oy, ow, oh, '当前坐标', cx, cy, cw, ch)
      // 1 左上在其他元素内
      let leftTopOver = ox >= cx && ox <= cx + cw && oy >= cy && oy <= cy + ch
      // 2 右下在其他元素内
      let rightBottomOver = ox + ow >= cx && ox + ow <= cx + cw && oy + oh >= cy && oy + oh <= cy + ch
      // 3 右上在其他元素内
      let rightTopOver = ox + ow >= cx && ox + ow <= cx + cw && oy >= cy && oy <= cy + ch
      // 4 左下在其他元素内
      let leftBottomOver = ox >= cx && ox <= cx + cw && oy + oh >= cy && oy + oh <= cy + ch
      // 5 __ 十字交叉重叠
      let centerCenterOver =
        (ox <= cx && ox + ow >= cx + cw && oy >= cy && oy + oh < cy + ch) || // 纯粹交叉
        (ox <= cx && oy >= cy && ox + ow >= cx + cw && oy <= cy + ch) || // 下碰上
        (ox >= cx && oy <= cy && ox <= cx + cw && oy + oh >= cy + ch) || // 右碰左
        (ox <= cx && oy <= cy && oy + oh >= cy && ox + ow >= cx + cw) || // 上碰下
        (ox <= cx && oy <= cy && ox + ow >= cx && oy + oh >= cy + ch) //   左碰右
      // 6 覆盖重叠
      let containOver = ox >= cx && ox + ow <= cx + cw && oy >= cy && oy + oh <= cy + ch
      if (leftTopOver || rightBottomOver || rightTopOver || leftBottomOver || centerCenterOver || containOver) {
        return true
      }
    }
    return false
  }
  