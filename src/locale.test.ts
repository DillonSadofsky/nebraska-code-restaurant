import { describe, expect, it } from 'vitest'
import { formatPrice } from './locale'

describe('formatPrice', () => {
  it('formats a price with cents as USD currency', () => {
    expect(formatPrice(8.99)).toBe('$8.99')
  })

  it('pads whole-dollar prices to two decimal places', () => {
    expect(formatPrice(10)).toBe('$10.00')
  })
})
