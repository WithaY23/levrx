export function formatDateAfterDays(daysToAdd: number): string {
    const date = new Date()
    date.setHours(12, 0, 0, 0)
    date.setDate(date.getDate() + daysToAdd)

    const day = date.getDate()
    const ordinal = day % 100 >= 11 && day % 100 <= 13
        ? 'th'
        : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[day % 10] ?? 'th'

    const month = date.toLocaleDateString('en-US', { month: 'long' })

    return `${month} ${day}${ordinal} ${date.getFullYear()}`
}