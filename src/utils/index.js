const isEmptyObj = obj => {
  assertObj(obj)

  return Object.keys(obj).length === 0
}

const filterObj = (obj, predicate = () => true) => {
  assertObj(obj)

  return Object.keys(obj)
  .filter((e) => predicate(obj[e], e, obj))
  .reduce((accu, curr) => {
    accu[curr] = obj[curr]
    return accu
  }, {})
}

const assertObj = obj => {
  if (obj == null) {
    throw new Error("obj must be not null.")
  }
  if (typeof obj !== "object") {
    throw new Error(`obj must be object; obj: ${obj}`)
  }
}

const queryFrom = (obj) => {
  obj = filterObj(obj, v => v)
  return obj ? 
    Object.keys(obj)
    .map(key => 
      Array.isArray(obj[key]) ? 
      obj[key].map(e => `${key}=${e}`).join('&')
      :`${key}=${obj[key]}`
    ).join('&') 
    : 
    ''
}

export { isEmptyObj, filterObj, queryFrom }
