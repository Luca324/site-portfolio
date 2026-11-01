export function assetUrl(fileName) {
  return `${import.meta.env.BASE_URL}${encodeURI(fileName)}`
}
