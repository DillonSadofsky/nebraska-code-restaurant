import type { Food, FoodTag } from './food'

export type FoodFilter = {
  q: string
  tags: Array<FoodTag>
}

/**
 * Filters the menu by a free-text query and a set of tags.
 *
 * - Tags combine as a union (OR): a food matches if it carries ANY selected tag.
 * - The query is a case-insensitive substring match across name, description,
 *   and tag text.
 * - The two mechanisms intersect (AND): a food must satisfy the tag filter and
 *   the query filter to appear.
 */
export function filterFoods(foods: Array<Food>, { q, tags }: FoodFilter): Array<Food> {
  const query = q.trim().toLowerCase()

  return foods.filter((food) => {
    const matchesTags = tags.length === 0 || tags.some((tag) => food.tags.includes(tag))
    if (!matchesTags) return false

    if (query === '') return true

    const haystack = [food.name, food.description, ...food.tags].join(' ').toLowerCase()
    return haystack.includes(query)
  })
}
