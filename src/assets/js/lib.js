
const imgUrl = 'http://ip-22-lide-1.coralcodes.com'
export const getImage = (src) => {
  if (!src) return ''
  if (src.indexOf('http' === -1 && src.indexOf('https') === -1)) {
    return imgUrl + src
  }
  return src
}
