/** Собирает адрес файла из папки public с учётом базового пути сайта. */
export function assetUrl(fileName) {
  return `${import.meta.env.BASE_URL}${encodeURI(fileName)}`
}
