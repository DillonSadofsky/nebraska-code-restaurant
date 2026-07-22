import { describe, expect, it } from 'vitest'
import { foods } from './food'
import { foodImages } from './food-images'

describe('foodImages', () => {
  it('has an entry for every food referenced in food.ts', () => {
    for (const food of foods) {
      expect(foodImages[food.image]).toBeDefined()
    }
  })

  it('provides a non-empty src and srcSet for each entry', () => {
    for (const image of Object.values(foodImages)) {
      expect(image.src).toBeTruthy()
      expect(image.srcSet).toBeTruthy()
    }
  })
})
