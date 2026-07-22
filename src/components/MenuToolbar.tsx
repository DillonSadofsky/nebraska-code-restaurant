import { useId } from 'react'
import { foodTags } from '../food'
import type { FoodTag } from '../food'
import { t, tagLabel } from '../content/strings'

type MenuToolbarProps = {
  q: string
  selectedTags: Array<FoodTag>
  resultCount: number
  totalCount: number
  onSearchChange: (value: string) => void
  onToggleTag: (tag: FoodTag) => void
  onClear: () => void
}

export default function MenuToolbar({
  q,
  selectedTags,
  resultCount,
  totalCount,
  onSearchChange,
  onToggleTag,
  onClear,
}: MenuToolbarProps) {
  const searchId = useId()
  const hasActiveFilters = q.trim() !== '' || selectedTags.length > 0

  return (
    <div className="flex flex-col gap-4 p-6 pb-0">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={searchId} className="text-text-h text-sm font-medium">
          {t('searchLabel')}
        </label>
        <input
          id={searchId}
          type="search"
          value={q}
          placeholder={t('searchPlaceholder')}
          onChange={(event) => onSearchChange(event.target.value)}
          className="border-border bg-bg text-text focus:border-accent focus:ring-accent w-full rounded-lg border px-3 py-2 focus:ring-1 focus:outline-none"
        />
      </div>

      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-text-h mb-1.5 text-sm font-medium">{t('tagsLabel')}</legend>
        <ul className="flex flex-wrap gap-2">
          {foodTags.map((tag) => {
            const active = selectedTags.includes(tag)
            return (
              <li key={tag}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggleTag(tag)}
                  className={
                    active
                      ? 'bg-accent border-accent rounded-full border px-3 py-1 text-sm text-white'
                      : 'border-border bg-bg text-text hover:border-accent rounded-full border px-3 py-1 text-sm'
                  }
                >
                  {tagLabel(tag)}
                </button>
              </li>
            )
          })}
        </ul>
      </fieldset>

      <div className="flex items-center justify-between gap-4">
        <p className="text-text text-sm" role="status" aria-live="polite">
          {t('resultCount', { count: resultCount, total: totalCount })}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-accent text-sm font-medium hover:underline"
          >
            {t('clearFilters')}
          </button>
        )}
      </div>
    </div>
  )
}
