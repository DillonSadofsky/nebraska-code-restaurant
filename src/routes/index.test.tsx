import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createRouter, createMemoryHistory } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'

async function renderAt(url: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [url] }),
  })
  // Route components are code-split; load the matched route (and its module)
  // before rendering so assertions don't race the pending state.
  await router.load()
  render(<RouterProvider router={router} />)
  return router
}

describe('menu route (URL-driven filter + search)', () => {
  it('shows the whole menu with no params', async () => {
    await renderAt('/')
    expect(await screen.findByText('Showing 21 of 21 dishes')).toBeInTheDocument()
  })

  it('filters by a tag from the URL', async () => {
    await renderAt('/?tags=Dessert')
    expect(await screen.findByText('Showing 3 of 21 dishes')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Raspberry Cheesecake' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Burger' })).not.toBeInTheDocument()
  })

  it('searches description text from the URL', async () => {
    await renderAt('/?q=chocolate')
    expect(await screen.findByText('Showing 1 of 21 dishes')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Death by Chocolate' })).toBeInTheDocument()
  })

  it('coerces bad params and still renders the full menu', async () => {
    await renderAt('/?tags=Bogus')
    expect(await screen.findByText('Showing 21 of 21 dishes')).toBeInTheDocument()
  })

  it('writes tag selection back to the URL when a pill is clicked', async () => {
    const router = await renderAt('/')
    await screen.findByText('Showing 21 of 21 dishes')

    await userEvent.click(screen.getByRole('button', { name: 'Vegetarian' }))

    await waitFor(() => {
      expect(router.state.location.search).toEqual({ tags: ['Vegetarian'] })
    })
    expect(await screen.findByText('Showing 2 of 21 dishes')).toBeInTheDocument()
  })
})
