import { Link, useParams } from 'react-router-dom'
import PharmacyComparison from '../components/PharmacyCompare'
import '../styles/ComparePrice.css'
import '../styles/Loading.css'
import { useEffect, useState } from 'react'
import { apiClient } from '../api'
import type { Medication } from '../../types'

function ComparePrice() {
  const { id } = useParams()
  console.log("the id", id)
  const [isLoading, setIsLoading] = useState(true)
  const [medication, setMedication] = useState<Medication | null>(null)

useEffect(() => {
  async function runData() {
    try {
      const res = await apiClient.get<Medication>(`/med/${id}`)
      setMedication(res.data)
    } catch (error) {
      console.error('Failed to fetch medication:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (id) {
    setIsLoading(true)
    runData()
  }
}, [id])

  const sortedPharmacies = medication ? [...medication.pharmacies].sort((a, b) => {
    if (a.price === null) return 1
    if (b.price === null) return -1
    return a.price - b.price
  }) : null
  return (
    <main>
      <Link to={`/`}
          className='compare-price-return-button'>
          My Medication
      </Link>
      {isLoading ? (
  <section className="compare-loading" aria-label="Loading medication">
    <div className="skeleton skeleton-title" />
    <div className="skeleton skeleton-line" />
    <div className="skeleton skeleton-line" />
    <h3>Pharmacy prices</h3>
    <div className="skeleton skeleton-pharmacy" />
    <div className="skeleton skeleton-pharmacy" />
    <div className="skeleton skeleton-pharmacy" />
  </section>
) : (medication === null || sortedPharmacies === null) ? "Could Not Find Medication. Please Try Again." :
      <section>
         
      <h2>{medication.name}</h2>
      <h3>Details: </h3>
      <p><strong>Strength:</strong> {medication.strength}</p>
      <p><strong>Days supply:</strong> {medication.daysSupply}</p>
      <p><strong>Current price:</strong> ${medication.currentPrice.toFixed(2)}</p>

      <h3>Pharmacy Prices:</h3>

        {sortedPharmacies.map((pharmacy) => (
            <PharmacyComparison
              key={pharmacy.id}
              pharmacy={pharmacy}
              currentPrice={medication.currentPrice}
            />
        ))}

    </section>
    }

    </main>
  )
}

export default ComparePrice
