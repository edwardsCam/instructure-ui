export default function debounce (func, wait = 0, options = {}) {
  // lodash doesn't work well with sinon fakeTimers so this is pulled from the lodash source:
  // https://github.com/lodash/lodash/blob/master/debounce.js
  // Note: Modified from the original to check for cancelled boolean before invoking func to prevent React setState
  // on unmounted components.

  let lastArgs, lastThis, result, lastCallTime
  let lastInvokeTime = 0

  let timers = []

  let cancelled = false

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  const leading = !!options.leading
  const maxing = 'maxWait' in options
  const trailing = 'trailing' in options ? !!options.trailing : true

  const maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : 0

  function invokeFunc (time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    if (cancelled !== true) {
      result = func.apply(thisArg, args)
      return result
    }
  }

  function leadingEdge (time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timers.push(setTimeout(timerExpired, wait))
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait (time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const result = wait - timeSinceLastCall

    return maxing ? Math.min(result, maxWait - timeSinceLastInvoke) : result
  }

  function shouldInvoke (time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  function timerExpired () {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timers.push(setTimeout(timerExpired, remainingWait(time)))
  }

  function trailingEdge (time) {
    clearAllTimers()

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }

    lastArgs = lastThis = undefined
    return result
  }

  function cancel () {
    cancelled = true
    clearAllTimers()
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = undefined
  }

  function flush () {
    return timers.length === 0 ? result : trailingEdge(Date.now())
  }

  function clearAllTimers () {
    timers.forEach(timerId => clearTimeout(timerId))
    timers = []
  }

  function debounced (...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timers.length === 0) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timers.push(setTimeout(timerExpired, wait))
        return invokeFunc(lastCallTime)
      }
    }
    if (timers.length === 0) {
      timers.push(setTimeout(timerExpired, wait))
    }
    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush

  return debounced
}
