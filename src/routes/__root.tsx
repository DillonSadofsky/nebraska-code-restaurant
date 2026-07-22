import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { FoodStoreProvider } from '../food-store'
import { t } from '../content/strings'

export const Route = createRootRoute({
	component: () => (
		<FoodStoreProvider>
			<main>
				<Outlet />
			</main>
			<footer className="border-border text-text mt-8 border-t px-6 py-4 text-xs">
				<Link to="/admin" className="hover:text-accent hover:underline">
					{t('adminLink')}
				</Link>
			</footer>
		</FoodStoreProvider>
	),
})
