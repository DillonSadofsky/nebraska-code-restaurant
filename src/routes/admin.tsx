import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { z } from 'zod'
import { foodTags } from '../food'
import type { FoodTag } from '../food'
import { useFoodStore } from '../food-store'
import { t, tagLabel } from '../content/strings'

export const Route = createFileRoute('/admin')({
	component: AdminPage,
})

const formSchema = z.object({
	name: z.string().trim().min(1),
	price: z.coerce.number().positive(),
	description: z.string().trim().min(1),
})

type FieldName = 'name' | 'price' | 'description'
type FieldErrors = Partial<Record<FieldName, string>>

const errorStringByField: Record<FieldName, () => string> = {
	name: () => t('errorNameRequired'),
	price: () => t('errorPricePositive'),
	description: () => t('errorDescriptionRequired'),
}

function AdminPage() {
	const navigate = useNavigate()
	const { addFood } = useFoodStore()
	const nameId = useId()
	const priceId = useId()
	const descriptionId = useId()

	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [tags, setTags] = useState<Array<FoodTag>>([])
	const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)
	const [errors, setErrors] = useState<FieldErrors>({})

	function toggleTag(tag: FoodTag) {
		setTags((previous) =>
			previous.includes(tag) ? previous.filter((current) => current !== tag) : [...previous, tag],
		)
	}

	function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]
		// Release the previous preview before minting a new one so repeatedly picking
		// different files doesn't orphan blob URLs. We only revoke the *pending* preview
		// here — once a URL is submitted it's handed to the store and reused as the menu
		// item's image, so it must outlive this component and is intentionally not revoked.
		if (imageSrc) {
			URL.revokeObjectURL(imageSrc)
		}
		setImageSrc(file ? URL.createObjectURL(file) : undefined)
	}

	function handleSubmit(event: FormEvent) {
		event.preventDefault()
		const parsed = formSchema.safeParse({ name, price, description })
		if (!parsed.success) {
			const next: FieldErrors = {}
			for (const issue of parsed.error.issues) {
				const field = issue.path[0] as FieldName
				if (field in errorStringByField) {
					next[field] = errorStringByField[field]()
				}
			}
			setErrors(next)
			return
		}

		addFood({
			name: parsed.data.name,
			price: parsed.data.price,
			description: parsed.data.description,
			tags,
			imageSrc,
		})
		navigate({ to: '/' })
	}

	const inputClass =
		'border-border bg-bg text-text focus:border-accent focus:ring-accent w-full rounded-lg border px-3 py-2 focus:ring-1 focus:outline-none'

	return (
		<div className="flex flex-col gap-4 p-6">
			<div className="flex items-baseline justify-between gap-4">
				<h1 className="text-text-h text-3xl font-semibold">{t('adminHeading')}</h1>
				<Link to="/" className="text-accent text-sm font-medium hover:underline">
					{t('adminBackLink')}
				</Link>
			</div>

			<form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4" noValidate>
				<div className="flex flex-col gap-1.5">
					<label htmlFor={nameId} className="text-text-h text-sm font-medium">
						{t('fieldName')}
					</label>
					<input
						id={nameId}
						type="text"
						value={name}
						onChange={(event) => setName(event.target.value)}
						className={inputClass}
					/>
					{errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
				</div>

				<div className="flex flex-col gap-1.5">
					<label htmlFor={priceId} className="text-text-h text-sm font-medium">
						{t('fieldPrice')}
					</label>
					<input
						id={priceId}
						type="number"
						step="0.01"
						min="0"
						value={price}
						onChange={(event) => setPrice(event.target.value)}
						className={inputClass}
					/>
					{errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
				</div>

				<div className="flex flex-col gap-1.5">
					<label htmlFor={descriptionId} className="text-text-h text-sm font-medium">
						{t('fieldDescription')}
					</label>
					<textarea
						id={descriptionId}
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						rows={3}
						className={inputClass}
					/>
					{errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
				</div>

				<fieldset className="flex flex-col gap-1.5">
					<legend className="text-text-h mb-1.5 text-sm font-medium">{t('fieldTags')}</legend>
					<ul className="flex flex-wrap gap-2">
						{foodTags.map((tag) => {
							const active = tags.includes(tag)
							return (
								<li key={tag}>
									<button
										type="button"
										aria-pressed={active}
										onClick={() => toggleTag(tag)}
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

				<div className="flex flex-col gap-1.5">
					<label className="text-text-h text-sm font-medium">
						{t('fieldImage')}
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="text-text mt-1.5 block w-full text-sm"
						/>
					</label>
					{imageSrc && (
						<img
							src={imageSrc}
							alt=""
							className="border-border mt-2 h-40 w-full rounded-lg border object-cover"
						/>
					)}
				</div>

				<button
					type="submit"
					className="bg-accent hover:bg-accent/90 self-start rounded-lg px-4 py-2 font-medium text-white"
				>
					{t('adminSubmit')}
				</button>
			</form>
		</div>
	)
}
