import { z } from 'zod'
import { foodTags } from './food'
import type { FoodTag } from './food'

const knownTags = new Set<string>(foodTags)

function isFoodTag(value: unknown): value is FoodTag {
  return typeof value === 'string' && knownTags.has(value)
}

/**
 * Validates the menu's URL search params.
 *
 * Bad input is coerced and stripped rather than rejected: unknown tags are
 * dropped, malformed values fall back to defaults, and parsing never throws.
 * This keeps shared/bookmarked links rendering the menu even when they rot.
 */
export const menuSearchSchema = z.object({
  // Empty/blank queries and empty tag lists resolve to undefined so they are
  // stripped from the URL rather than left as ?q=&tags= noise.
  q: z.string().trim().min(1).optional().catch(undefined),
  tags: z
    .preprocess((value) => {
      const list = Array.isArray(value) ? value : value == null ? [] : [value]
      const filtered = list.filter(isFoodTag)
      return filtered.length > 0 ? filtered : undefined
    }, z.array(z.enum(foodTags)).optional())
    .catch(undefined),
})

export type MenuSearch = z.infer<typeof menuSearchSchema>
