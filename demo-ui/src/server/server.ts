import cors from 'cors'
import express from 'express'
import dummyData from './dummy.json' with { type: 'json' }

type Medication = (typeof dummyData.medications)[number]

const app = express()
app.use(cors())
app.use(express.json())

let medications: Medication[] = []

app.get('/', (_request, response) => {
  response.send('Medication API is running')
})

app.get('/meds', (_request, response) => {
  response.status(200).json(medications)
})

app.get('/meds/preview', (_request, response) => {
  const preview = medications.map((medication) => {
    const { pharmacies, ...medicationPreview } = medication
    void pharmacies
    return medicationPreview
  })
  response.status(200).json(preview)
})

app.get('/med/:medID', (request, response) => {
  const medication = medications.find(({ id }) => id === request.params.medID)

  if (!medication) {
    response.status(404).json({ error: 'Medication not found' })
    return
  }

  response.status(200).json(medication)
})

export function startServer(port = 3001) {
  medications = dummyData.medications
  return app.listen(port, () => {
    console.log(`Medication API listening on http://localhost:${port}`)
  })
}

startServer()
