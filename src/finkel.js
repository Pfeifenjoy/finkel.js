//@flow

/**
 * Changes a function of multiple arguments to a
 * function which only takes one argument and
 * returns a function that takes a second argument
 * until the original function is executed.
 *
 * This process is called currying or schönfinkeln
 * TODO add type dependence
 */
export const finkel = (f: (*, *) => *) => (a: *) => (b: *) => f(a, b)

/**
 * The opposite of finkel.
 *
 * This process is called uncurrying.
 */
export const unfinkel = (f: ((*) => (*) => *)) => (a: *, b: *) => f(a)(b)
