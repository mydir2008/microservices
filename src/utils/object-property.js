function objectProperty(obj, keys, defaultValue){
    let r = obj;
    const p = keys.split('\.')
    if (!r || typeof r !== 'object'){
      return defaultValue
    }
    for (let index = 0; index < p.length; index++) {
      const element = p[index];
      if (index < p.length - 1){
        r = r[element]
        if (!r){
          return defaultValue
        }
        continue
      }
      return typeof r[element] !== 'undefined' ? r[element] : defaultValue 
    }
    return obj
}

export default objectProperty;