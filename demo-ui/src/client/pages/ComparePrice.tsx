import { Link, useLocation, useParams } from 'react-router-dom'
import PharmacyComparison from '../components/PharmacyCompare'
import '../styles/ComparePrice.css'
import '../styles/Loading.css'
import { useEffect, useState } from 'react'
import { apiClient } from '../api'
import type { Medication } from '../../types'

type MedicationPreview = Pick<Medication, 'name' | 'strength' | 'daysSupply' | 'currentPrice'>

function isMedicationPreview(value: unknown): value is MedicationPreview {
  return typeof value === 'object'
    && value !== null
    && 'name' in value
    && typeof value.name === 'string'
    && 'strength' in value
    && typeof value.strength === 'string'
    && 'daysSupply' in value
    && typeof value.daysSupply === 'number'
    && 'currentPrice' in value
    && typeof value.currentPrice === 'number'
}

function ComparePrice() {
  const { id } = useParams()
  const { state } = useLocation()
  const previewMedication = isMedicationPreview(state) ? state : null
  const [requestResult, setRequestResult] = useState<{
    id: string
    medication: Medication | null
  } | null>(null)

  useEffect(() => {
    if (!id) return

    const medicationId = id
    let isCurrentRequest = true

    async function runData() {
      try {
        const res = await apiClient.get<Medication>(`/med/${medicationId}`)
        if (isCurrentRequest) {
          setRequestResult({ id: medicationId, medication: res.data })
        }
      } catch (error) {
        console.error('Failed to fetch medication:', error)
        if (isCurrentRequest) {
          setRequestResult({ id: medicationId, medication: null })
        }
      }
    }

    runData()

    return () => {
      isCurrentRequest = false
    }
  }, [id])

  const isLoading = id !== undefined && requestResult?.id !== id //dangerous but neat, relies on setState to ensure load
  const medication = requestResult && requestResult.id === id ? requestResult.medication : null
  const displayedMedication = medication ?? previewMedication
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
      {displayedMedication ? (
        <section>
          <h2>{displayedMedication.name}</h2>
          <h3>Details:</h3>
          <p><strong>Strength:</strong> {displayedMedication.strength}</p>
          <p><strong>Days supply:</strong> {displayedMedication.daysSupply}</p>
          <p><strong>Current price:</strong> ${displayedMedication.currentPrice.toFixed(2)}</p>
        </section>
      ) : isLoading ? (
        <section className="compare-loading" aria-label="Loading medication">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
        </section>
      ) : (
        <p>Could Not Find Medication. Please Try Again.</p>
      )}

      <section>
        <h3>Pharmacy Prices:</h3>
        {isLoading ? (
          <div className="compare-loading" aria-label="Loading pharmacy prices">
            <div className="skeleton skeleton-pharmacy" />
            <div className="skeleton skeleton-pharmacy" />
            <div className="skeleton skeleton-pharmacy" />
          </div>
        ) : medication && sortedPharmacies ? (
          sortedPharmacies.map((pharmacy) => (
            <PharmacyComparison
              key={pharmacy.id}
              pharmacy={pharmacy}
              currentPrice={medication.currentPrice}
            />
          ))
        ) : previewMedication ? (
          <p>Could not load pharmacy prices. Please try again.</p>
        ) : null}
      </section>
    </main>
  )
}

export default ComparePrice
