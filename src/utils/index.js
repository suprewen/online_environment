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

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}