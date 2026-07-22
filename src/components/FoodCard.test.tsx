import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import FoodCard from './FoodCard'
import type { Food } from '../food'

const sampleFood: Food = {
  id: 1,
  name: 'Burger',
  image: 'burger.jpg',
  price: 8.99,
  description: "This ain't your average burger.",
  tags: ['Lunch', 'Dinner'],
}

describe('FoodCard', () => {
  it('renders the name, formatted price, description, and tags', () => {
    render(<FoodCard food={sampleFood} />)

    expect(screen.getByRole('heading', { name: 'Burger' })).toBeInTheDocument()
    expect(screen.getByText('$8.99')).toBeInTheDocument()
    expect(screen.getByText(sampleFood.description)).toBeInTheDocument()
    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.getByText('Dinner')).toBeInTheDocument()
  })

  it('sets the image alt text to the food name', () => {
    render(<FoodCard food={sampleFood} />)

    expect(screen.getByAltText('Burger')).toBeInTheDocument()
  })
})
