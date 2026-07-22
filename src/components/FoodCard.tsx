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
    <article className="border-border bg-bg flex h-full flex-col overflow-hidden rounded-lg border text-left shadow-sm">
      <div className="bg-accent-bg aspect-[4/3] w-full overflow-hidden">
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
          <h2 className="text-text-h text-lg font-medium">{food.name}</h2>
          <span className="text-text-h font-mono whitespace-nowrap">{formatPrice(food.price)}</span>
        </div>
        <p className="text-text flex-1 text-sm">{food.description}</p>
        <ul className="flex flex-wrap gap-1.5">
          {food.tags.map((tag) => (
            <li key={tag} className="bg-accent-bg text-accent rounded-full px-2 py-0.5 text-xs">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
