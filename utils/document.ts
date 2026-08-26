import type { DocumentData } from '@/types/document'

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0)
}

export function formatDate(value: string) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  const day = date.getDate()
  const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th'
  return `${day}${suffix} ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
}

export function itemAmount(quantity: number, price: number) { return (Number(quantity) || 0) * (Number(price) || 0) }
export function documentTotal(data: DocumentData) { return data.items.reduce((total, item) => total + itemAmount(item.quantity, item.price), 0) }
