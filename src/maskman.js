/* eslint-disable no-extend-native, func-names */
function isArray(obj) {
  if (obj && typeof obj === 'object' && Array.isArray(obj)) return true
  return false
}

function isObject(obj) {
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) return true
  return false
}

function convertObject(data, convertCase) {
  return Object.keys(data).reduce((newObject, key) => {
    const temp = newObject
    temp[convertCase(key)] = isObject(data[key]) ? convertObject(data[key], convertCase) : data[key]
    if (isArray(data[key])) {
      temp[convertCase(key)] = data[key].map(element => convertObject(element, convertCase))
    }
    return temp
  }, {})
}

/**
 * Converts [snake case](https://en.wikipedia.org/wiki/snake_case) `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 */
function camelCase(string = '') {
  return string.replace(/_\w/g, matches => {
    return matches[1].toUpperCase()
  })
}

/**
 * Converts [camel case](https://en.wikipedia.org/wiki/CamelCase) `string` to [snake case](https://en.wikipedia.org/wiki/snake_case).
 *
 * @static
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the snake cased string.
 */
// eslint-disable-next-line camelcase
function snake_case(string = '') {
  const upperChars = string.match(/([A-Z])/g)
  if (!upperChars) {
    return string
  }

  let str = string.toString()
  for (let i = 0, n = upperChars.length; i < n; i++) {
    str = str.replace(new RegExp(upperChars[i]), '_' + upperChars[i].toLowerCase())
  }

  if (str.slice(0, 1) === '_') {
    str = str.slice(1)
  }

  return str
}

/**
 * MaskMan Class
 */
class MaskMan {
  /**
   * Create a MaskMan instance.
   * @param {any} [data=null] array or object you want to convert.
   * @returns {any} converted array or object.
   */
  constructor(data = null) {
    this.data = data
  }

  /**
   * Create a MaskMan instance.
   * @static
   * @param {any} [data=null] array or object you want to convert.
   * @returns {MaskMan} MaskMan instance.
   */
  static convert(data = null) {
    return new MaskMan(data)
  }

  /**
   * Set new data and return a MaskMan instance.
   * @param {any} [data=null] array or object you want to convert.
   * @returns {MaskMan} MaskMan instance.
   */
  convert(data = null) {
    this.data = data
    return this
  }

  /**
   * Convert all key in an object by converter.
   * @param {converterCallback} converter callback function convert keys to the case style you want.
   * @returns {any} converted array or object.
   */
  to(converter) {
    if (isObject(this.data)) {
      return convertObject(this.data, converter)
    } if (isArray(this.data)) {
      return this.data.map(element => convertObject(element, converter))
    }
    return this.data
  }

  /**
   * This callback is displayed as part of the Requester class.
   * @callback converterCallback
   * @param {string} string original string.
   * @returns {string} converted string.
   */
}

const properties = { MaskMan, camelCase, snake_case }
module.exports = properties
