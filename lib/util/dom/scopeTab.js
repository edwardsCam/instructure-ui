import findDOMNode from './findDOMNode'
import findTabbable from './findTabbable'

export default function scopeTab (element, event) {
  const node = findDOMNode(element)
  const tabbable = findTabbable(node)

  if (!tabbable.length) {
    event.preventDefault()
    return
  }

  const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1]
  const leavingFinalTabbable = (
    finalTabbable === document.activeElement ||
    // handle immediate shift+tab after opening with mouse
    node === document.activeElement
  )

  if (!leavingFinalTabbable) return

  event.preventDefault()
  const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0]
  target.focus()
}
