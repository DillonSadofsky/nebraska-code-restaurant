import { DEFAULT_LOCALE } from '../locale'
import type { FoodTag } from '../food'

type MessageKey =
	| 'menuHeading'
	| 'searchLabel'
	| 'searchPlaceholder'
	| 'tagsLabel'
	| 'resultCount'
	| 'noResults'
	| 'clearFilters'
	| 'adminLink'

const messages: Record<string, Record<MessageKey, string>> = {
	en: {
		menuHeading: 'Our Menu',
		searchLabel: 'Search the menu',
		searchPlaceholder: 'Search dishes, ingredients, or tags…',
		tagsLabel: 'Filter by tag',
		resultCount: 'Showing {count} of {total} dishes',
		noResults: 'No dishes match your search. Try clearing a filter.',
		clearFilters: 'Clear filters',
		adminLink: 'Admin',
	},
}

// Display labels for tags are kept separate from the tag values in food.ts so
// the data stays stable while the visible text can be localized.
const tagLabels: Record<string, Record<FoodTag, string>> = {
	en: {
		Breakfast: 'Breakfast',
		Lunch: 'Lunch',
		Dinner: 'Dinner',
		Dessert: 'Dessert',
		Drink: 'Drink',
		Appetizer: 'Appetizer',
		Spicy: 'Spicy',
		Vegetarian: 'Vegetarian',
		Alcoholic: 'Alcoholic',
	},
}

function language(): string {
	return DEFAULT_LOCALE.split('-')[0]
}

export function t(key: MessageKey, params?: Record<string, string | number>): string {
	const dictionary = messages[language()] ?? messages.en
	let text = dictionary[key]

	if (params) {
		for (const [name, value] of Object.entries(params)) {
			text = text.replace(`{${name}}`, String(value))
		}
	}

	return text
}

export function tagLabel(tag: FoodTag): string {
	const dictionary = tagLabels[language()] ?? tagLabels.en
	return dictionary[tag]
}
