/**
 * throttle 节流
 * @param {function} fn 
 * @param {number} delay 
 */
export function throttle (fn, delay) {
  let prev = 0
  let timer = null

  return function (...args) {
    let now = Date.now()
    let context = this
    // console.log(now - prev)
    if (now - prev < delay) {
      clearTimeout(timer)

      timer = setTimeout(function () {
        prev = now
        fn.apply(context, args)
      }, delay)

    } else {
      prev = now
      fn.apply(context, args)
    }
  }
}