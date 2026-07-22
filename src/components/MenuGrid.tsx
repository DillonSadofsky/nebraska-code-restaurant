import type { Food } from '../food'
import FoodCard from './FoodCard'

type MenuGridProps = {
	foods: Array<Food>
}

const EAGER_LOAD_COUNT = 3

export default function MenuGrid({ foods }: MenuGridProps) {
	return (
		<ul className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
			{foods.map((food, index) => (
				<li key={food.id}>
					<FoodCard food={food} priority={index < EAGER_LOAD_COUNT} />
				</li>
			))}
		</ul>
	)
}
