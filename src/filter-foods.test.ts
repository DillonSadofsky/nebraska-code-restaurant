import { describe, expect, it } from 'vitest'
import { filterFoods } from './filter-foods'
import { foods } from './food'

const names = (result: ReturnType<typeof filterFoods>) => result.map((food) => food.name)

describe('filterFoods', () => {
	it('returns every food when there is no query and no tags', () => {
		expect(filterFoods(foods, { q: '', tags: [] })).toHaveLength(foods.length)
	})

	it('treats whitespace-only queries as empty', () => {
		expect(filterFoods(foods, { q: '   ', tags: [] })).toHaveLength(foods.length)
	})

	it('combines multiple tags as a union (OR)', () => {
		const result = filterFoods(foods, { q: '', tags: ['Breakfast', 'Alcoholic'] })
		// Breakfast: Banana Blueberry French Toast. Alcoholic: Mojito, Old Fashioned.
		expect(names(result)).toEqual(
			expect.arrayContaining(['Banana Blueberry French Toast', 'Mojito', 'Old Fashioned']),
		)
		// A Dessert-only item must not appear.
		expect(names(result)).not.toContain('Raspberry Cheesecake')
	})

	it('matches the query against the name (case-insensitive)', () => {
		expect(names(filterFoods(foods, { q: 'burger', tags: [] }))).toContain('Burger')
		expect(names(filterFoods(foods, { q: 'BURGER', tags: [] }))).toContain('Burger')
	})

	it('matches the query against the description', () => {
		// "chocolate" only appears in descriptions, not names.
		expect(names(filterFoods(foods, { q: 'chocolate', tags: [] }))).toContain('Death by Chocolate')
	})

	it('matches the query against tag text', () => {
		const result = filterFoods(foods, { q: 'vegetarian', tags: [] })
		expect(names(result)).toEqual(expect.arrayContaining(['Salmon Salad', 'Veggie Sammy']))
	})

	it('intersects the query with the selected tags (search AND tags)', () => {
		// Query "salmon" alone matches Salmon Salad + Salmon Steak, but only
		// Salmon Salad carries the Vegetarian tag.
		const result = filterFoods(foods, { q: 'salmon', tags: ['Vegetarian'] })
		expect(names(result)).toEqual(['Salmon Salad'])
	})

	it('returns an empty array when nothing matches', () => {
		expect(filterFoods(foods, { q: 'zzzznope', tags: [] })).toEqual([])
	})
})
