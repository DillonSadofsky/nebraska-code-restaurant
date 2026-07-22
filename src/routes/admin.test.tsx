import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
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

describe('admin route', () => {
	it('renders the add-item heading', async () => {
		await renderAt('/admin')
		expect(await screen.findByRole('heading', { name: 'Add a Menu Item' })).toBeInTheDocument()
	})
})
