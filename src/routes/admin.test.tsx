import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createRouter, createMemoryHistory } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'

async function renderAt(url: string) {
	const router = createRouter({
		routeTree,
		history: createMemoryHistory({ initialEntries: [url] }),
	})
	await router.load()
	render(<RouterProvider router={router} />)
	return router
}

describe('admin add-item form', () => {
	it('renders the add-item heading', async () => {
		await renderAt('/admin')
		expect(await screen.findByRole('heading', { name: 'Add a Menu Item' })).toBeInTheDocument()
	})

	it('blocks submission and shows errors when required fields are empty', async () => {
		const router = await renderAt('/admin')
		await screen.findByRole('heading', { name: 'Add a Menu Item' })

		await userEvent.click(screen.getByRole('button', { name: 'Add item' }))

		expect(screen.getByText('Please enter a name.')).toBeInTheDocument()
		expect(screen.getByText('Please enter a price greater than 0.')).toBeInTheDocument()
		expect(screen.getByText('Please enter a description.')).toBeInTheDocument()
		expect(router.state.location.pathname).toBe('/admin')
	})

	it('adds a valid item and shows it on the menu', async () => {
		await renderAt('/admin')
		await screen.findByRole('heading', { name: 'Add a Menu Item' })

		await userEvent.type(screen.getByLabelText('Name'), 'Nebraska Runza')
		await userEvent.type(screen.getByLabelText('Price'), '7.5')
		await userEvent.type(screen.getByLabelText('Description'), 'Regional favorite')
		await userEvent.click(screen.getByRole('button', { name: 'Dinner' }))
		await userEvent.click(screen.getByRole('button', { name: 'Add item' }))

		// The '/' route is code-split; navigating to it here triggers its first
		// dynamic import (plus per-dish image processing), which can take longer
		// than the default findBy timeout on a cold run — so we wait longer here.
		expect(
			await screen.findByRole('heading', { name: 'Nebraska Runza' }, { timeout: 5000 }),
		).toBeInTheDocument()
		expect(
			await screen.findByText('Showing 22 of 22 dishes', {}, { timeout: 5000 }),
		).toBeInTheDocument()
	})
})
