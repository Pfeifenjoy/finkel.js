//@flow
import assert from "assert"

export const map = (f: (*) => *) => (array: Array<*>) => array.map(f)

export const fold_r = (f: * => * => *) => (start: *) => ([ a, ...rest ]: Array<*>) =>
	a === undefined ? start : fold_r(f)(f(start)(a))(rest)

export const fold_l = (f: * => * => *) => (start: *) => ([ a, ...rest ]: Array<*>) =>
	a === undefined ? start : fold_l(f)(f(a)(start))(rest)

/**
 * Select elements of an array which match a certain condition c.
 */
export const filter = (c: * => * => *) => ([ a, ...rest ]: Array<*>) =>
	a === undefined ? [] : c(a) ? [ a, ...filter(c)(rest) ] : filter(c)(rest)

/**
 * Generate a random integer.
 *
 * Note:
 * Sadly function overloading is only for typed languages.
 */
export const random_i = (min: number) => (max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min

/**
 * Get an element from an array.
 * at :: Int -> Array<a> -> a
 */
export const at = (i: number) => <T>(array: Array<T>): T => {
	//not every language has the luxury of integers
	assert((typeof i === "number") && Math.floor(i) === i)
	return array[i]
}

/**
 * Get an arbitrary item from an array.
 *
 * @important This function has a side effect
 */
export const arb = (array: Array<*>) => at(random_i(0)(array.length - 1))(array)

/**
 * Generate a range from x to y.
 *
 * Note:
 * Too bad operator overload is not part of JS!!!
 * Otherwise this would be generic.
 */
export const range = (start: number, next: ?number) => (end: number) => {
	next = typeof next === "number" ? next : start + 1 //small mutation for readability
	return start === end ? [ start ] : [ start, ...range(next, next + Math.abs(next - start))(end) ]
}

