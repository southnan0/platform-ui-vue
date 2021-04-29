const SPLIT = '|'

export const parseMulKeyName = (arrKey) => {
  const obj = {
    key: [],
    name: []
  }

  arrKey.forEach(key => {
    obj.key.push(parseKeyName(key)[0])
    obj.name.push(parseKeyName(key)[1])
  })

  return [obj.key.join(','), obj.name.join(',')]
}

export const formatMulKeyName = (arrKey, arrLabel) => {
  return arrKey.map((item, index) => {
    return formatKeyName(item, arrLabel[index])
  })
}

export const formatKeyName = (key, label) => {
  return `${key}${SPLIT}${label}`
}

export const parseKeyName = (key) => {
  if (!key) return []
  return key.split(SPLIT) || []
}

