const charCodeOfDot = '.'.charCodeAt(0)
const reEscapeChar = /\\(\\)?/g
const rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  '[^.[\\]]+' + '|' +
  // Or match property names within brackets.
  '\\[(?:' +
    // Match a non-string expression.
    '([^"\'][^[]*)' + '|' +
    // Or match strings (supports escaping characters).
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  ')\\]'+ '|' +
  // Or match "" as the space between consecutive dots or empty brackets.
  '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
  , 'g')

const stringToPath = (string) => {
  const result = []
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('')
  }
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match
    if (quote) {
      key = subString.replace(reEscapeChar, '$1')
    }
    else if (expression) {
      key = expression.trim()
    }
    result.push(key)
  })
  return result
}

function baseGet(object, path) {
  path = stringToPath(path)

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[path[index++]]
  }
  return (index && index == length) ? object : undefined
}

export function get(object, path, defaultValue) {
  const result = object == null ? undefined : baseGet(object, path)
  return result === undefined ? defaultValue : result
}

function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

const MAX_SAFE_INTEGER = 9007199254740991

const reIsUint = /^(?:0|[1-9]\d*)$/

function isIndex(value, length) {
  const type = typeof value
  length = length == null ? MAX_SAFE_INTEGER : length

  return !!length &&
    (type === 'number' ||
      (type !== 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length)
}


function baseSet(object, path, value) {
  if (!isObject(object)) {
    return object
  }
  path = stringToPath(path)

  const length = path.length
  const lastIndex = length - 1

  let index = -1
  let nested = object

  while (nested != null && ++index < length) {
    const key = path[index]
    let newValue = value

    if (index != lastIndex) {
      const objValue = nested[key]
      newValue = isObject(objValue)
        ? objValue
        : (isIndex(path[index + 1]) ? [] : {})
    }

    nested[key] = newValue
    nested = nested[key]
  }
  return object
}

export function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value)
}