import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import MenuGrid from './MenuGrid'
import { foods } from '../food'

describe('MenuGrid', () => {
  it('renders one list item per food', () => {
    const { container } = render(<MenuGrid foods={foods} />)

    // Scoped to the grid's direct <li> children: FoodCard renders its own
    // nested <li> elements for tags, so an unscoped getAllByRole('listitem')
    // would also match those and overcount.
    expect(container.querySelectorAll(':scope > ul > li')).toHaveLength(foods.length)
  })

  it('renders each food name as a heading', () => {
    render(<MenuGrid foods={foods} />)

    expect(screen.getByRole('heading', { name: 'Burger' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Veggie Sammy' })).toBeInTheDocument()
  })
})
