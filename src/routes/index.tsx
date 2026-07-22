import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { FoodTag } from '../food'
import { filterFoods } from '../filter-foods'
import { menuSearchSchema } from '../search-schema'
import { t } from '../content/strings'
import { useFoodStore } from '../food-store'
import MenuGrid from '../components/MenuGrid'
import MenuToolbar from '../components/MenuToolbar'

export const Route = createFileRoute('/')({
	validateSearch: menuSearchSchema,
	component: MenuPage,
})

function MenuPage() {
	const { foods } = useFoodStore()
	const { q = '', tags = [] } = Route.useSearch()
	const navigate = useNavigate({ from: Route.fullPath })

	const visibleFoods = filterFoods(foods, { q, tags })

	// Empty values are omitted so the URL stays clean (no ?q=&tags=); the schema
	// fills them back in as defaults when they are absent.
	function updateSearch(next: { q?: string; tags?: Array<FoodTag> }, replace: boolean) {
		navigate({
			to: '.',
			search: (prev) => {
				const merged = { ...prev, ...next }
				return {
					q: merged.q ? merged.q : undefined,
					tags: merged.tags && merged.tags.length > 0 ? merged.tags : undefined,
				}
			},
			replace,
		})
	}

	function handleSearchChange(value: string) {
		// Immediate + replace: keystrokes update the URL without flooding history.
		updateSearch({ q: value }, true)
	}

	function handleToggleTag(tag: FoodTag) {
		const nextTags = tags.includes(tag) ? tags.filter((current) => current !== tag) : [...tags, tag]
		// Push: toggling a pill is a discrete, intentional action worth a history entry.
		updateSearch({ tags: nextTags }, false)
	}

	function handleClear() {
		updateSearch({ q: '', tags: [] }, false)
	}

	return (
		<>
			<h1 className="text-text-h px-6 pt-6 text-3xl font-semibold">{t('menuHeading')}</h1>
			<MenuToolbar
				q={q}
				selectedTags={tags}
				resultCount={visibleFoods.length}
				totalCount={foods.length}
				onSearchChange={handleSearchChange}
				onToggleTag={handleToggleTag}
				onClear={handleClear}
			/>
			{visibleFoods.length > 0 ? (
				<MenuGrid foods={visibleFoods} />
			) : (
				<p className="text-text p-6">{t('noResults')}</p>
			)}
		</>
	)
}
