//@flow
import assert from "assert"

/**
 * Changes a function of multiple arguments to a
 * function which only takes one argument and
 * returns a function that takes a second argument
 * until the original function is executed.
 *
 * This process is called currying or schönfinkeln
 */
export const finkel = (f: Function, i: number = 2, args: Array<any> = []) =>
	(arg: *) => i === 0 ? f(...args) : finkel(f, i - 1, [...args, arg])

/**
 * The opposite of finkel.
 *
 * This process is called uncurrying.
 */
export const unfinkel = (f: Function) => (...args: Array<any>) => {
	const [arg, ...rest] = args

	if(rest.length === 0) {
		return f(arg)
	} else {
		const next = unfinkel(f(arg))(rest)
		assert(typeof next === "function")
		return next
	}
}
