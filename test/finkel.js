//@flow
import { finkel, unfinkel } from "../src"
import assert from "assert"

describe("schönfinkel", () => {
	it("should always give the same result given two arguments", () => {
		//helper functions
		const multiply = (a: number, b: number) => a * b
		const multiply_prime = finkel(multiply)

		const modulo = (a: number, b: number) => a % b
		const modulo_prime = finkel(modulo)

		const concat = (a: number, b: number) => `${a}${b}`
		const concat_prime = finkel(concat)

		for(let i = 1; i < 10; ++i) {
			for(let j = 1; j < 10; ++j) {
				//perform basic arithmatics
				assert(multiply(i, j) === multiply_prime(i)(j),
					`multiply for ${i}, ${j} failed.`)
				assert(modulo(i, j) === modulo_prime(i)(j),
					`modulo for ${i}, ${j} failed.`)

				//check if arguments are passed in the correct order
				assert(concat(i, j) === concat_prime(i)(j),
					`modulo for ${i}, ${j} failed.`)
			}
		}
	})
	//it("check 3 arguments", () => {
	//	const concat = (a: number, b: number, c: number) => `${a}${b}${c}`
	//	const concat_prime = finkel(concat, 3)

	//	for(let a = 1; a < 10; ++a) {
	//		for(let b = 1; b < 10; ++b) {
	//			for(let c = 1; c < 10; ++c) {
	//				assert(concat(a, b, c) === concat_prime(a)(b)(c),
	//					`concat for ${a}, ${b} and ${c} failed.`)
	//			}
	//		}
	//	}
	//})
})
