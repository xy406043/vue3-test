export const updateHtmlStyle = () => {
  const htmlNode = document.querySelector('html')
  htmlNode.style.overflow = 'auto'
  htmlNode.style.height = 'auto'
}

export const hideVditorTextarea = () => {
  const exportVditorNode = document.getElementById('khaleesi')
  const option = {
    childList: true, // 子节点的变动（新增、删除或者更改）
    attributes: true, // 属性的变动
    characterData: true, // 节点内容或节点文本的变动

    subtree: true, // 是否将观察器应用于该节点的所有后代节点
    attributeFilter: ['class', 'style'], // 观察特定属性
    attributeOldValue: true, // 观察 attributes 变动时，是否需要记录变动前的属性值
    characterDataOldValue: true // 观察 characterData 变动，是否需要记录变动前的值
  }
  const mutationObserver = new MutationObserver(() => {
    const vditorTextarea = document.getElementsByClassName('vditor-textarea')
    if (vditorTextarea && vditorTextarea[0]) {
      vditorTextarea[0].style.display = 'none'
      mutationObserver.disconnect()
    }
  })
  mutationObserver.observe(exportVditorNode, option)
}
