import { describe, expect, it } from 'vitest'
import { foods, foodTags } from './food'
import { foodImages } from './food-images'

const tagSet = new Set<string>(foodTags)

describe('foods data', () => {
	it('has at least one menu item', () => {
		expect(foods.length).toBeGreaterThan(0)
	})

	it('uses unique ids', () => {
		const ids = foods.map((food) => food.id)
		expect(new Set(ids).size).toBe(ids.length)
	})

	it('gives every item a non-empty name and description', () => {
		for (const food of foods) {
			expect(food.name.trim(), `food #${food.id} name`).not.toBe('')
			expect(food.description.trim(), `food #${food.id} description`).not.toBe('')
		}
	})

	it('prices every item as a positive number', () => {
		for (const food of foods) {
			expect(food.price, `food #${food.id} price`).toBeGreaterThan(0)
			expect(Number.isFinite(food.price), `food #${food.id} price is finite`).toBe(true)
		}
	})

	it('gives every item at least one tag drawn from foodTags', () => {
		for (const food of foods) {
			expect(food.tags.length, `food #${food.id} tag count`).toBeGreaterThan(0)
			for (const tag of food.tags) {
				expect(tagSet.has(tag), `food #${food.id} tag "${tag}"`).toBe(true)
			}
		}
	})

	it('does not repeat a tag within a single item', () => {
		for (const food of foods) {
			expect(new Set(food.tags).size, `food #${food.id} tags`).toBe(food.tags.length)
		}
	})

	it('points every item at an image registered in foodImages', () => {
		for (const food of foods) {
			expect(foodImages, `food #${food.id} image "${food.image}"`).toHaveProperty(food.image)
		}
	})
})
