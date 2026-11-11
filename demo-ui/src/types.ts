export type Pharmacy = {
  id: string
  name: string
  address: string
  price: number | null
}

export type Medication = {
  id: string
  name: string
  strength: string
  form: string
  quantity: number
  daysSupply: number
  currentPrice: number
  pharmacies: Pharmacy[]
}