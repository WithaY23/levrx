import { useEffect, useState } from 'react'
import MedicationItem from '../components/MedicationItem'
import '../styles/HomePage.css'
import '../styles/Loading.css'

import { apiClient } from '../api'
import type { Medication } from '../../types'


function HomePage() {
    const [medicationName, setMedicationName] = useState("")
    const [medications, setMedications] = useState<Medication[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const medicationsInView = medicationName !== '' && medications.length > 0
  ? medications.filter((med) => med.name.toLowerCase().includes(medicationName.toLowerCase()))
  : medications;

    useEffect(() => {
    async function runData() {
        try {
        const res = await apiClient.get('/meds/preview');
        setMedications(res.data);
        } catch (error) {
        console.error('Failed to fetch medications:', error);
        } finally {
        setIsLoading(false)
        }
    }

    runData();
    }, []);
  return (
    <main className="medication-list-page">
      <h1> My Medication</h1>
      <label htmlFor='medication-filter' className="home-page--filter">
        <input
            type="text"
            value={medicationName}
            id='medication-filter'
            onChange={(event) => setMedicationName(event.currentTarget.value)}
            placeholder="Search by Medication Name"
        />
        </label>
      <div className="medication-list">
          {isLoading ? Array.from({ length: 3 }, (_, index) => (
            <div className="medication-item-container" key={`skeleton-${index}`} aria-hidden="true">
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
            </div>
          )) : medicationsInView.length ? medicationsInView.map((item) => (
            <MedicationItem key={item.name} {...item} />
          )) : "No matches found, try broadening your search"}
        </div>
    </main>
  )
}

export default HomePage
