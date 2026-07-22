import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { foods as builtInFoods } from './food'
import type { Food, FoodTag } from './food'

export type NewFoodInput = {
	name: string
	price: number
	description: string
	tags: Array<FoodTag>
	imageSrc?: string
}

type FoodStore = {
	foods: Array<Food>
	addFood: (input: NewFoodInput) => Food
}

const FoodStoreContext = createContext<FoodStore | null>(null)

function nextId(foods: Array<Food>): number {
	return foods.reduce((max, food) => Math.max(max, food.id), 0) + 1
}

export function FoodStoreProvider({ children }: { children: ReactNode }) {
	const [addedFoods, setAddedFoods] = useState<Array<Food>>([])
	// Monotonic id source so ids never collide even if addFood is called
	// multiple times before a re-render. Seeded just past the built-in ids.
	const nextIdRef = useRef(nextId(builtInFoods))

	const store = useMemo<FoodStore>(() => {
		const foods = [...builtInFoods, ...addedFoods]
		return {
			foods,
			addFood(input) {
				const food: Food = { id: nextIdRef.current, image: '', ...input }
				nextIdRef.current += 1
				setAddedFoods((previous) => [...previous, food])
				return food
			},
		}
	}, [addedFoods])

	return <FoodStoreContext.Provider value={store}>{children}</FoodStoreContext.Provider>
}

export function useFoodStore(): FoodStore {
	const store = useContext(FoodStoreContext)
	if (!store) {
		throw new Error('useFoodStore must be used within a FoodStoreProvider')
	}
	return store
}
