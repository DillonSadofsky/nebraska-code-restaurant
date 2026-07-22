import { describe, expect, it } from 'vitest'
import { menuSearchSchema } from './search-schema'

describe('menuSearchSchema', () => {
  it('resolves absent params to nothing (defaults applied downstream)', () => {
    expect(menuSearchSchema.parse({})).toEqual({})
  })

  it('keeps a valid query and known tags', () => {
    expect(menuSearchSchema.parse({ q: 'mango', tags: ['Spicy', 'Vegetarian'] })).toEqual({
      q: 'mango',
      tags: ['Spicy', 'Vegetarian'],
    })
  })

  it('strips empty and blank queries', () => {
    expect(menuSearchSchema.parse({ q: '' })).toEqual({})
    expect(menuSearchSchema.parse({ q: '   ' })).toEqual({})
  })

  it('strips unknown tags instead of throwing', () => {
    expect(menuSearchSchema.parse({ tags: ['Spicy', 'Bogus', 'Dessert'] })).toEqual({
      tags: ['Spicy', 'Dessert'],
    })
  })

  it('drops an all-unknown tag list entirely', () => {
    expect(menuSearchSchema.parse({ tags: ['Bogus', 'Nope'] })).toEqual({})
  })

  it('coerces a single tag string into an array', () => {
    expect(menuSearchSchema.parse({ tags: 'Dinner' })).toEqual({ tags: ['Dinner'] })
  })

  it('falls back to defaults for malformed types', () => {
    expect(menuSearchSchema.parse({ q: ['not', 'a', 'string'], tags: 42 })).toEqual({})
  })

  it('never throws on arbitrary junk', () => {
    expect(() => menuSearchSchema.parse({ q: null, tags: { nope: true }, extra: 'x' })).not.toThrow()
  })
})
