import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MenuToolbar from './MenuToolbar'

function setup(overrides: Partial<Parameters<typeof MenuToolbar>[0]> = {}) {
  const props = {
    q: '',
    selectedTags: [],
    resultCount: 21,
    totalCount: 21,
    onSearchChange: vi.fn(),
    onToggleTag: vi.fn(),
    onClear: vi.fn(),
    ...overrides,
  }
  render(<MenuToolbar {...props} />)
  return props
}

describe('MenuToolbar', () => {
  it('renders a labeled search box with the current query', () => {
    setup({ q: 'mango' })
    expect(screen.getByRole('searchbox', { name: /search the menu/i })).toHaveValue('mango')
  })

  it('renders a toggle pill per tag', () => {
    setup()
    // 9 tags defined in food.ts
    expect(screen.getAllByRole('button', { pressed: false })).toHaveLength(9)
  })

  it('marks selected tags as pressed', () => {
    setup({ selectedTags: ['Spicy'] })
    expect(screen.getByRole('button', { name: 'Spicy', pressed: true })).toBeInTheDocument()
  })

  it('emits each typed character through onSearchChange', async () => {
    const { onSearchChange } = setup()
    await userEvent.type(screen.getByRole('searchbox'), 'ab')
    expect(onSearchChange).toHaveBeenCalledWith('a')
    expect(onSearchChange).toHaveBeenCalledWith('b')
  })

  it('toggles a tag when its pill is clicked', async () => {
    const { onToggleTag } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Dessert' }))
    expect(onToggleTag).toHaveBeenCalledWith('Dessert')
  })

  it('hides the clear button when no filters are active', () => {
    setup()
    expect(screen.queryByRole('button', { name: /clear filters/i })).not.toBeInTheDocument()
  })

  it('shows and fires the clear button when filters are active', async () => {
    const { onClear } = setup({ selectedTags: ['Lunch'] })
    await userEvent.click(screen.getByRole('button', { name: /clear filters/i }))
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('reports the result count', () => {
    setup({ resultCount: 3, totalCount: 21 })
    expect(screen.getByText('Showing 3 of 21 dishes')).toBeInTheDocument()
  })
})
