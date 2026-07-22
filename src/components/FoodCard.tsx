import type { Food } from '../food'
import { foodImages } from '../food-images'
import { formatPrice } from '../locale'

type FoodCardProps = {
  food: Food
  priority?: boolean
}

export default function FoodCard({ food, priority = false }: FoodCardProps) {
  const image = foodImages[food.image]

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg text-left shadow-sm">
      <div className="aspect-[4/3] w-full overflow-hidden bg-accent-bg">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 90vw"
          width={640}
          height={480}
          alt={food.name}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-medium text-text-h">{food.name}</h2>
          <span className="whitespace-nowrap font-mono text-text-h">
            {formatPrice(food.price)}
          </span>
        </div>
        <p className="flex-1 text-sm text-text">{food.description}</p>
        <ul className="flex flex-wrap gap-1.5">
          {food.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-accent-bg px-2 py-0.5 text-xs text-accent">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
