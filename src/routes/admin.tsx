import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
	component: AdminPage,
})

function AdminPage() {
	return <h1 className="text-text-h px-6 pt-6 text-3xl font-semibold">Add a Menu Item</h1>
}
