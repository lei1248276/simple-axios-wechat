export function isExternal(url: string) {
  return /^(https?:)/.test(url)
}

export function extend(context: object, target: { [key: string]: any }) {
  const exclude = ['constructor']
  const keys = Object.getOwnPropertyNames(target).filter((v) => !exclude.includes(v))
  const res: { [key: string]: Function } = {}

  keys.forEach((key) => {
    if (typeof target[key] !== 'function') return
    res[key] = target[key].bind(context)
  })

  return res
}
