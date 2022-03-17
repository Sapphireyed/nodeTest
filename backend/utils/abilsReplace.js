const replaceMulti = (abil, num, replace) => {
  if (num === 1) {
    return { [replace]: abil.multi1 }
  }
  if (num === 2) {
    return { [replace]: abil.multi2 }
  }
  if (num === 3) {
    return { [replace]: abil.multi3 }
  }
  if (num === 4) {
    return { [replace]: abil.multi4 }
  }
}

const replaceMultiplier = (abil, num, replace) => {
  if (num === 1) {
    return { [replace]: abil.multiplier1 }
  }
  if (num === 2) {
    return { [replace]: abil.multiplier2 }
  }
  if (num === 3) {
    return { [replace]: abil.multiplier3 }
  }
  if (num === 4) {
    return { [replace]: abil.multiplier4 }
  }
}

const getDescUnit = (obj, desc, abil) => {
  for (let k in obj) {
    desc[k] = typeof obj[k] == 'string' ? obj[k].replace(/\{0\}/g, 'hhhhhhhhhhhh') : ''
  }
  abil[desc] = desc
}

module.exports = {replaceMulti, replaceMultiplier, getDescUnit}