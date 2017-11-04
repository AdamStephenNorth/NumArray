(() => {
// BEGIN IIFE
// It is my firm belief that every JavaScript programmer should try to
// make some part of JavaScript behave as though it is more strongly
// typed. While somewhat futile, it makes for a great learning experience.
// NumArrays will be arrays containing only numbers or other NumArrays as
// elements. They will be subtyped off of the built-in Array.prototype.
// This is the constructor/casting function. It takes in an Array, number or
// NumArray and returns a NumArray.
function NumArray(arr) {
  if ( arr === Number( arr ) ) {
    return new NumArray([arr])
  }

  if (!Array.isArray(arr)) {
    return new NumArray([])
  }

  return Object.create( NumArray.prototype,
    arr
    .filter( x => ( x === Number( x ) || Array.isArray( x ) ) )
    .map( x => {
      if ( Array.isArray( x ) ) {
        return NumArray( x )
      }
      if ( x === Number( x ) ) {
        return x
      }
    })
  )
}

NumArray.prototype = (Object.assign([], {
  fill(...args) {
    if (args[0] === Number(args[0])) {
      Array.prototype.fill(...args)
    }
  }

  pop() {
    let popped = Array.prototype.pop.bind(this)
    if (popped === Number(popped)) {
      return popped
    }
    if (Array.isArray(popped)) {
      return NumArray(popped)
    }
    return NaN
  }

  push(...args) {
    if (args[0] === Number(args[0])) {
      Array.prototype.push.bind(...args)
    }
  }

  // only output if output is a number, NaN otherwise
  shift() {
    return Number(Array.prototype.shift.bind())
  }

  // Check both input and output for numericity.
  splice() {}

  // only output if output is a number, NaN otherwise
  unshift() {}
})

let a = [ "sand", 5, [ 6, 12, "five" ], { value: 6 }, [ [ [ 1 ], true ], [ null ] ] ]

let b = NumArray( a )

console.log( b )
// END IIFE
})()
