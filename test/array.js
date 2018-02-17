//@flow

import "babel-polyfill"
import { range, at } from "../src/array"
import assert from "assert"

describe("array", () => {
	describe("range", () => {
		it("simple from y to x", () => {
			let data = []
			for(let i = 0; i <= 100; ++i) {
				data[i] = i - 50
			}
			assert.deepEqual(data, range(-50)(50))
		})
		it("custom incrementer", () => {
			let data = []
			for(let i = 0; i <= 100; ++i) {
				data[i] = i / 2 - 25
			}
			assert.deepEqual(data, range(-25, -24.5)(25))
		})
	})
	describe("at", () => {
		let data = range(-100)(100)
		it("extract item from array", () => {
			for(let i of range(0)(200)) {
				assert(at(i)(data) == data[i])
			}
		})
	})
	describe("filter", () => {

	})
})
