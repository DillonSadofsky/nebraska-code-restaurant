export const DEFAULT_LOCALE = 'en-US'

const currencyFormatter = new Intl.NumberFormat(DEFAULT_LOCALE, {
  style: 'currency',
  currency: 'USD',
})

export function formatPrice(price: number): string {
  return currencyFormatter.format(price)
}
