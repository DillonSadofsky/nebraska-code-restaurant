import { describe, expect, it } from 'vitest'
import { t } from './strings'

describe('t', () => {
	it('returns the menu heading copy', () => {
		expect(t('menuHeading')).toBe('Our Menu')
	})
})
