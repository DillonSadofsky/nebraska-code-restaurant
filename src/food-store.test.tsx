import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { FoodStoreProvider, useFoodStore } from './food-store'
import { foods as builtInFoods } from './food'

function wrapper({ children }: { children: ReactNode }) {
	return <FoodStoreProvider>{children}</FoodStoreProvider>
}

describe('useFoodStore', () => {
	it('starts with exactly the built-in foods', () => {
		const { result } = renderHook(() => useFoodStore(), { wrapper })

		expect(result.current.foods).toHaveLength(builtInFoods.length)
	})

	it('addFood appends an item with a fresh, non-colliding id', () => {
		const { result } = renderHook(() => useFoodStore(), { wrapper })

		let created: ReturnType<typeof result.current.addFood> | undefined
		act(() => {
			created = result.current.addFood({
				name: 'Test Dish',
				price: 5,
				description: 'Tasty',
				tags: ['Lunch'],
			})
		})

		const maxBuiltInId = Math.max(...builtInFoods.map((food) => food.id))
		expect(created?.id).toBe(maxBuiltInId + 1)
		expect(result.current.foods).toHaveLength(builtInFoods.length + 1)
		expect(result.current.foods.at(-1)).toMatchObject({ name: 'Test Dish', id: maxBuiltInId + 1 })
	})

	it('throws when used outside a provider', () => {
		expect(() => renderHook(() => useFoodStore())).toThrow(/FoodStoreProvider/)
	})
})
